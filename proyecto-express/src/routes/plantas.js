const { Router } = require('express');
const plantasController = require('../controllers/plantas.controller');
const verificarToken = require('../middlewares/auth.middleware');
const routerplantas = Router();

routerplantas.get('/plantas', verificarToken,plantasController.getAllPlantas);
routerplantas.get('/plantas/:id',verificarToken, plantasController.getPlantaUni);


module.exports = routerplantas;
