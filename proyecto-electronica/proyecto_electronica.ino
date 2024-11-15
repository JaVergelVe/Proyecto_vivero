#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <DHT.h>

// Pines definidos como constantes
const int pinHumiditySensor = 33;
const int MQ5_PIN = 14;
const int DHT11_PIN = 26;
const int PUMP_PIN = 13;

// Configuración del Punto de Acceso
const char* ssid = "ESP32_AP";
const char* password = "12345678"; // Puedes cambiar la contraseña

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
AsyncWebServer server(80);
AsyncWebSocket ws("/ws");

// Función para manejar eventos WebSocket
void onWsEvent(AsyncWebSocket *server, AsyncWebSocketClient *client, AwsEventType type, void *arg, uint8_t *data, size_t len) {
  if (type == WS_EVT_CONNECT) {
    Serial.println("Cliente WebSocket conectado");
  } else if (type == WS_EVT_DISCONNECT) {
    Serial.println("Cliente WebSocket desconectado");
  }
}

// Configuración inicial del sistema
void setup() { 
  Serial.begin(9600);
  Serial.println("Iniciando sensores...");

  // Configuración del ESP32 como punto de acceso
  WiFi.softAP(ssid, password);
  IPAddress IP = WiFi.softAPIP();
  Serial.print("Punto de acceso IP: ");
  Serial.println(IP);

  // Configurar el WebSocket
  ws.onEvent(onWsEvent);
  server.addHandler(&ws);

  // Iniciar el servidor HTTP
  server.begin();
  
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
    if (ws.count() > 0) { // Enviar solo si hay clientes conectados
      ws.textAll(mensaje);
      Serial.println("Enviando datos: " + mensaje);
    } else {
      Serial.println("Sin clientes conectados. Esperando...");
    }
    ultimoEnvio = millis();
  }
}