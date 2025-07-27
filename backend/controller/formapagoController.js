const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query('select * from formapago', (err, fpago) => {
            if (err) {
                res.json(err);
            }
            res.json(fpago);
        });
    });
};

controller.edit = (req, res) => {
    const { idfpago } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from formapago where idfpago = ?', [idfpago], (err, fpago) => {
            res.json(fpago[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into formapago set ?', [data], (err, fpago) => {
            res.json(fpago);
        });
    });
};

controller.update = (req, res) => {
    const { idfpago } = req.params;
    const nuevo_fpago = req.body;

    req.getConnection((err, conn) => {
        conn.query('update formapago set ? where idfpago = ?', [nuevo_fpago, idfpago], (err, rows) => {
            res.json({ message: "Registro Actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { idfpago } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE formapago SET estado = "INACTIVO" WHERE idfpago = ?', [idfpago], (err, rows) => {
            res.json({ message: "Registro Eliminado" });
        });
    });
};

module.exports = controller;
