
const jwt = require('jsonwebtoken');
const pool = require('../db/connection'); 


const generarToken = (id) => {
  return jwt.sign({ id }, 'clave_secreta_jwt', { expiresIn: '1h' });
};


const loginEmpleado = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    
    const result = await pool.query(
      'SELECT * FROM vivero.employee WHERE email = $1 AND password = $2',
      [email, password]
    ); 
    
    const empleado = result.rows[0];

    if (!empleado) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    
    const token = generarToken(empleado.id_employee);
    res.status(200).json({ token });
  } catch (error) {
    console.error('Error en la consulta a la base de datos:', error); 
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

module.exports = { loginEmpleado };