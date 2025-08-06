const jwt = require('jsonwebtoken');
const db = require('../connection/connection');
const SECRET = 'Logistic';

exports.login = function (req, res) {
  const { usuario, clave } = req.body;

  const query = `
    SELECT u.cusuario, u.usuario, t.tipousuario AS role 
    FROM usuario u
    JOIN tipousuario t ON u.ctipousuario = t.ctipousuario
    WHERE u.usuario = ? AND u.clave = ?`;

  db.query(query, [usuario, clave], function (err, usuarios) {
    if (err) return res.status(500).send('Error DB');
    if (usuarios.length === 0) return res.status(401).send('Credenciales inválidas');

    
    const user = usuarios[0];

    if (user.logged_in) {
      return res.status(403).send('Usuario ya tiene una sesión activa');
    }

    db.query('UPDATE usuario SET logged_in = 1 WHERE cusuario = ?', [user.cusuario], function (err2) {
      if (err2) return res.status(500).send('Error al iniciar sesión');

      const token = jwt.sign(
        { cusuario: user.cusuario, usuario: user.usuario, role: user.role },
        SECRET,
        { expiresIn: '1h' }
      );

      res.json({ token, user });
      console.log(token);
      console.log(user);
    });
  });
};

exports.logout = function (req, res) {
  const cusuario = req.user.cusuario;
  db.query('UPDATE usuario SET logged_in = 0 WHERE cusuario = ?', [cusuario], function (err) {
    if (err) return res.status(500).send('Error cerrando sesión');
    res.send('Sesión cerrada');

  });
  console.log(query);
};
