const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query('select * from proveedor', (err, prov) => {
            if (err) {
                res.json(err);
            }
            res.json(prov);
        });
    });
};

controller.edit = (req, res) => {
    const { idprov } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from proveedor where idprov = ?', [idprov], (err, prov) => {
            res.json(prov[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into proveedor set ?', [data], (err, prov) => {
            res.json(prov);
        });
    });
};

controller.update = (req, res) => {
    const { idprov } = req.params;
    const nuevo_prov = req.body;

    req.getConnection((err, conn) => {
        conn.query('update proveedor set ? where idprov = ?', [nuevo_prov, idprov], (err, rows) => {
            res.json({ message: "Registro Actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { idprov } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE proveedor SET estado = "INACTIVO" WHERE idprov = ?', [idprov], (err, rows) => {
            res.json({ message: "Registro Eliminado" });
        });
    });
};

module.exports = controller;
