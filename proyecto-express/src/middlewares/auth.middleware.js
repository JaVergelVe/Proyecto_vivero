const jwt = require('jsonwebtoken');

const verificarToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, 'clave_secreta_jwt', (err, decoded) => {
    if (err) {
      const errorMessage = err.name === 'TokenExpiredError' ? 'Token expirado' : 'Token inválido';
      return res.status(401).json({ error: errorMessage });
    }

    req.userId = decoded.id;
    next();
  });
};

module.exports = verificarToken;
