const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query('select * from tipousuario', (err, tpusuario) => {
            if (err) {
                res.json(err);
            }
            res.json(tpusuario);
        });
    });
};

controller.edit = (req, res) => {
    const { idtpusuario } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from tipousuario where idtpusuario = ?', [idtpusuario], (err, tpusuario) => {
            res.json(tpusuario[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into tipousuario set ?', [data], (err, tpusuario) => {
            res.json(tpusuario);
        });
    });
};

controller.update = (req, res) => {
    const { idtpusuario } = req.params;
    const nuevo_tpusuario = req.body;

    req.getConnection((err, conn) => {
        conn.query('update tipousuario set ? where idtpusuario = ?', [nuevo_tpusuario, idtpusuario], (err, rows) => {
            res.json({ message: "Registro Actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { idtpusuario } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE tipousuario SET estado = "INACTIVO" WHERE idtpusuario = ?', [idtpusuario], (err, rows) => {
            res.json({ message: "Registro Eliminado" });
        });
    });
};

module.exports = controller;
