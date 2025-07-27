const controller = {};

controller.list = (req, res) => {
    req.getConnection((error, conn) => {
        conn.query('select * from empleados', (err, empleado) => {
            if (err) {
                res.json(err);
            }
            res.json(empleado);
        });
    });
};

controller.edit = (req, res) => {
    const { idemp } = req.params;

    req.getConnection((err, conn) => {
        conn.query('select * from empleados where idemp = ?', [idemp], (err, empleado) => {
            res.json(empleado[0]);
        });
    });
};

controller.save = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) => {
        conn.query('insert into empleados set ?', [data], (err, empleado) => {
            res.json(empleado);
        });
    });
};

controller.update = (req, res) => {
    const { idemp } = req.params;
    const nuevo_empleado = req.body;

    req.getConnection((err, conn) => {
        conn.query('update empleados set ? where idemp = ?', [nuevo_empleado, idemp], (err, rows) => {
            res.json({ message: "Registro Actualizado" });
        });
    });
};

controller.delete = (req, res) => {
    const { idemp } = req.params;
    req.getConnection((err, conn) => {
        conn.query('UPDATE empleados SET estado = "INACTIVO" WHERE idemp = ?', [idemp], (err, rows) => {
            res.json({ message: "Registro Eliminado" });
        });
    });
};

module.exports = controller;
