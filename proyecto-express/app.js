const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors'); 

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const routerEmpleados = require('../proyecto-express/src/routes/empleados.js'); 
const routerPlantas = require('../proyecto-express/src/routes/plantas.js'); 
const routerAuth = require('./src/routes/auth.js'); // Nueva ruta de autenticación

app.use(cors());
app.use(express.json()); 
app.use('/api', routerEmpleados); 
app.use('/api', routerPlantas); 
app.use('/api', routerAuth);

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
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = app; // Exportar la aplicación para usarla en server.js
