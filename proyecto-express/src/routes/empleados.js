const { Router } = require('express');
const empleadoController = require('../controllers/empleados.controller');
const verificarToken = require('../middlewares/auth.middleware');
const routerEmpleados = Router();

routerEmpleados.get('/empleados',verificarToken, empleadoController.getAllEmpleados);
routerEmpleados.get('/empleados/:id',verificarToken, empleadoController.getEmpleadoUni);
routerEmpleados.post('/empleados/', empleadoController.postEmpleado);
routerEmpleados.put('/empleados/:id', empleadoController.putEmpleado);
routerEmpleados.delete('/empleados/:id', empleadoController.deleteEmpleado);

module.exports = routerEmpleados;
