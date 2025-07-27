const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query('select * from tipoproducto', (err, tpprod) => {
            if (err) {
                res.json(err);
            }
            res.json(tpprod);
        });
    });
};

controller.edit = (req, res) => {
    const { idtpprod } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from tipoproducto where idtpprod = ?', [idtpprod], (err, tpprod) => {
            res.json(tpprod[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into tipoproducto set ?', [data], (err, tpprod) => {
            res.json(tpprod);
        });
    });
};

controller.update = (req, res) => {
    const { idtpprod } = req.params;
    const nuevo_tpprod = req.body;

    req.getConnection((err, conn) => {
        conn.query('update tipoproducto set ? where idtpprod = ?', [nuevo_tpprod, idtpprod], (err, rows) => {
            res.json({ message: "Registro Actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { idtpprod } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE tipoproducto SET estado = "INACTIVO" WHERE idtpprod = ?', [idtpprod], (err, rows) => {
            res.json({ message: "Registro Eliminado" });
        });
    });
};

module.exports = controller;
