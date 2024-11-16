
const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Nueva conexión WebSocket establecida.');

    // Escuchar mensajes desde el ESP32
    ws.on('message', (message) => {
        console.log('Mensaje recibido:', message);
        // Enviar una respuesta opcional
        ws.send('Mensaje recibido en el servidor');
    });

    // Manejar la desconexión
    ws.on('close', () => {
        console.log('Conexión WebSocket cerrada.');
    });
});

// Iniciar el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://192.168.1.9:${PORT}`);
});