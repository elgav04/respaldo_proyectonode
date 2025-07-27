const controller = {};

controller.list = (req, res) => {
    req.getConnection((error,conn) =>{
        conn.query('select *from sucursales',(err,sucursal) =>{
            if(err){
                res.json(err);
            }
            res.json(sucursal);
        });

    });

};



controller.edit = (req, res) => {

    const {idsuc}= req.params;
   
    req.getConnection((err,conn) =>{
        conn.query('select *from sucursales where idsuc=?', [idsuc], (err,sucursal) => {
            res.json(sucursal[0]);

        });

    });

};


controller.save = (req,res) =>{
    const data = req.body;
   req.getConnection((err,conn)=> {
       conn.query('insert into sucursales set?', [data], (err,sucursal) => {
        res.json(sucursal);
       });
   })
};



controller.update = (req,res) =>{

    const {idsuc}= req.params;
    const nuevo_sucursal = req.body;
  
    req.getConnection((err, conn) => {
        conn.query('update sucursales set ? where idsuc =?', [nuevo_sucursal, idsuc], (err,rows) =>{ 
            res.json({ message: "Registro Actualizado" }); 

        });
    });
};



controller.delete = (req,res) =>{
    const {idsuc}= req.params; 
  req.getConnection((err,conn) => {
      conn.query('UPDATE sucursales SET estado = "INACTIVO" WHERE idsuc = ?', [idsuc], (err, rows) => {
        res.json({ message: "Registro Eliminado" }); 
      });
  })
};

module.exports =controller;
