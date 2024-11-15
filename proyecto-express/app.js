const express = require('express');
const app = express();
const cors = require('cors'); 
const port = 3000;

const routerEmpleados = require('../proyecto-express/src/routes/empleados.js'); 
const routerPlantas = require('../proyecto-express/src/routes/plantas.js'); 

const routerAuth = require('./src/routes/auth.js'); // Nueva ruta de autenticación
app.use(cors());
app.use(express.json()); 
app.use('/api', routerEmpleados); 
app.use('/api', routerPlantas); 
app.use('/api', routerAuth);

app.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});
