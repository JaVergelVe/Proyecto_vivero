# Proyecto Vivero

Este proyecto es un sistema de monitoreo y gestión de datos para un vivero, desarrollado en **Angular** y **Express**. La aplicación permite visualizar en tiempo real la información de sensores conectados a un ESP32, así como consultar listas de empleados, plantas y zonas del vivero.

## Estructura del Proyecto

- **proyecto-vivero**: Contiene la aplicación web en Angular, que permite:
  - Ver una lista de **empleados** con detalles de cada uno.
  - Ver una lista de **plantas** con información adicional.
  - Monitorear las **zonas del vivero** en tiempo real, gracias a los datos de sensores de humedad, gas y temperatura, enviados desde el ESP32 a través de WebSocket.

- **proyecto-express**: Contiene el backend en Express.js, que:
  - Gestiona la conexión a una base de datos **PostgreSQL** con la información de empleados y plantas.
  - Recibe datos del ESP32 (configurado como Access Point) y los transmite en tiempo real a la aplicación de Angular.

- **proyecto-electronica**: Contiene el codigo de arduino
  - Recopila los datos en tiempo real de los sensores de humedad, gas y temperatura y los envia desde el ESP32 a través de WebSocket a la pagina.

## Configuración del Proyecto

### Requisitos Previos
- **Node.js** y **npm** instalados.
- **PostgreSQL** configurado con una base de datos `vivero`.
- **Arduino IDE** para cargar el código en el ESP32.

### Instrucciones de Configuración

1. **Backend (proyecto_express)**:
   - Navega a `proyecto_express` y ejecuta:
     ```bash
     npm install
     npm run dev
     ```
   - Configura la conexión a PostgreSQL en el archivo de configuración.

2. **Frontend (proyecto_vivero)**:
   - Navega a `proyecto_vivero` y ejecuta:
     ```bash
     npm install
     npm start
     ```

3. **ESP32**:
   - Carga el código del ESP32 desde **Arduino IDE**, configurado como Access Point para la comunicación WebSocket.

## Funcionalidades

- **Visualización en tiempo real** de las zonas del vivero mediante WebSocket.
- **Gestión de Empleados y Plantas**: Listado y detalles de los empleados y plantas almacenados en la base de datos PostgreSQL.
- **Monitoreo de sensores**: Información actualizada de humedad, temperatura y gases en las zonas del vivero.

## Tecnologías Utilizadas

- **Angular** y **TypeScript** para el frontend.
- **Node.js** y **Express** para el backend.
- **PostgreSQL** para la base de datos.
- **Arduino** para el microcontrolador ESP32 y los sensores.

## Autor

Proyecto desarrollado como una solución para monitoreo y gestión de información en viveros agrícolas.