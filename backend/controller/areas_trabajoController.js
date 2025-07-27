const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query('select * from areas_trabajo', (err, area) => {
            if (err) {
                res.json(err);
            }
            res.json(area);
        });
    });
};

controller.edit = (req, res) => {
    const { idarea } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from areas_trabajo where idarea = ?', [idarea], (err, area) => {
            res.json(area[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into areas_trabajo set ?', [data], (err, area) => {
            res.json(area);
        });
    });
};

controller.update = (req, res) => {
    const { idarea } = req.params;
    const nuevo_area = req.body;

    req.getConnection((err, conn) => {
        conn.query('update areas_trabajo set ? where idarea = ?', [nuevo_area, idarea], (err, rows) => {
            res.json({ message: "Registro Actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { idarea } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE areas_trabajo SET estado = "INACTIVO" WHERE idarea = ?', [idarea], (err, rows) => {
            res.json({ message: "Registro Eliminado" });
        });
    });
};

module.exports = controller;
