
const { Router } = require('express');
const { loginEmpleado } = require('../controllers/auth.controller');
const router = Router();


router.post('/login', loginEmpleado);

module.exports = router;
