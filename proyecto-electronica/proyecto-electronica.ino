#include <WiFi.h>
#include <SPI.h>
#include <WebSocketsClient.h>
#include <DHT.h>

// Pines definidos como constantes
const int pinHumiditySensor = 33;
const int MQ5_PIN = 14;
const int DHT11_PIN = 26;
const int PUMP_PIN = 13;

// Configuración del Punto de Acceso
const char* ssid = "FLIA-VERGEL";     //  your network SSID (name)
const char* pass = "Julian22";  // your network password

// Definición de constantes de tiempo
const unsigned long INTERVALO_ENVIO = 2000; // Intervalo de envío de datos en ms
const unsigned long TIEMPO_BOMBA = 4000;    // Tiempo que la bomba estará encendida en ms

// Variables de tiempo para controlar intervalos
unsigned long ultimoEnvio = 0;
unsigned long tiempoBombaActivada = 0;
bool bombaEncendida = false;

// Inicialización del sensor DHT
DHT dht(DHT11_PIN, DHT11);

// Inicializar el servidor WebSocket y el servidor HTTP
WebSocketsClient webSocket;

void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
    switch (type) {
        case WStype_TEXT:
            Serial.printf("Mensaje recibido: %s\n", payload);
            break;
        case WStype_DISCONNECTED:
            Serial.println("Desconectado del servidor WebSocket.");
            break;
        case WStype_CONNECTED:
            Serial.println("Conectado al servidor WebSocket.");
            webSocket.sendTXT("Hola desde ESP32!");
            break;
    }
}

void conectarWIFI(){
  WiFi.begin(ssid, pass);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print("Attempting to connect to WPA SSID: ");
    Serial.println(ssid);
    // Connect to WPA/WPA2 network:
    WiFi.begin(ssid, pass);
    //Serial.println(status);
    // wait 10 seconds for connection:
    delay(1000);
  }
}

void printWifiData() {
  // print your WiFi shield's IP address:
  IPAddress ip = WiFi.localIP();
  Serial.print("IP Address: ");
  Serial.println(ip);
  Serial.println(ip);

  // print your MAC address:
  byte mac[6];
  WiFi.macAddress(mac);
  Serial.print("MAC address: ");
  Serial.print(mac[5], HEX);
  Serial.print(":");
  Serial.print(mac[4], HEX);
  Serial.print(":");
  Serial.print(mac[3], HEX);
  Serial.print(":");
  Serial.print(mac[2], HEX);
  Serial.print(":");
  Serial.print(mac[1], HEX);
  Serial.print(":");
  Serial.println(mac[0], HEX);
}

// Configuración inicial del sistema
void setup() { 
  Serial.begin(9600);
  Serial.println("Iniciando sensores...");

  while (!Serial) {
    ; // wait for serial port to connect. Needed for native USB port only
  }
  // check for the presence of the shield:
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }

  // Configuración del ESP32 como punto de acceso
  if (WiFi.status() == WL_NO_SHIELD) {
    Serial.println("WiFi shield not present");
    // don't continue:
    while (true);
  }
  conectarWIFI();
  Serial.print("You're connected to the network");
  printWifiData();

  webSocket.begin("http://localhost:", 3000, "/");  // Cambia por la IP de tu servidor
  webSocket.onEvent(webSocketEvent);
  
  // Configuración de pines
  pinMode(pinHumiditySensor, INPUT);
  pinMode(MQ5_PIN, INPUT);
  pinMode(PUMP_PIN, OUTPUT);
  
  // Estado inicial de la bomba (apagada)
  digitalWrite(PUMP_PIN, LOW);

  // Inicializar sensor DHT
  dht.begin();
}

// Función para leer los datos del sensor DHT11
float obtenerTemperatura() {
  return dht.readTemperature();
}

// Función para manejar la bomba de agua
void controlarBomba(int humedadEstado) {
  if (humedadEstado == HIGH && !bombaEncendida) {
    Serial.println("---!! AGUA !!---");
    digitalWrite(PUMP_PIN, HIGH);
    bombaEncendida = true;
    tiempoBombaActivada = millis();
  } else if (bombaEncendida && (millis() - tiempoBombaActivada >= TIEMPO_BOMBA)) {
    digitalWrite(PUMP_PIN, LOW);
    bombaEncendida = false;
    Serial.println("Bomba apagada");
  }
}

// Función para detectar gas
String detectarGas(int gasEstado) {
  return (gasEstado == HIGH) ? "NO DETECTADO" : "DETECTADO";
}

// Función para crear mensaje JSON con datos de sensores
String crearMensajeJSON(float temperatura, int humedadEstado, int gasEstado) {
  String mensaje = "{";
  mensaje += "\"temperatura\":" + String(temperatura) + ",";
  mensaje += "\"humedadSuelo\":" + String(humedadEstado) + ",";
  mensaje += "\"gas\":\"" + detectarGas(gasEstado) + "\"";
  mensaje += "}";
  return mensaje;
}

// Bucle principal
void loop() {
  int humedadEstado = digitalRead(pinHumiditySensor);
  int gasEstado = digitalRead(MQ5_PIN);
  float temperatura = obtenerTemperatura();

  // Control de la bomba basado en humedad
  controlarBomba(humedadEstado);

  // Enviar datos a través del WebSocket solo si ha pasado el intervalo
  if (millis() - ultimoEnvio >= INTERVALO_ENVIO) {
    String mensaje = crearMensajeJSON(temperatura, humedadEstado, gasEstado);
    //if (ws.count() > 0) { // Enviar solo si hay clientes conectados
      //ws.textAll(mensaje);
      Serial.println("Enviando datos: " + mensaje);
    //} else {
      Serial.println("Sin clientes conectados. Esperando...");
    //}
    ultimoEnvio = millis();
  }
}