const express= require('express');
const morgan = require('morgan');
const path= require('path');
const mysql= require('mysql');
const cors = require('cors');
const myConnection= require('express-myconnection');
const app= express();

const config = {
    application: {
        cors: {
            server: [
                {
                    origin: "localhost:3000", 
                    credentials: true
                }
            ]
        }
}
};

app.use(cors(
    config.application.cors.server
  ));


// rutas backend
const areas_trabajoRoutes = require('./rutas/areas_trabajo');
const clientesRoutes = require('./rutas/clientes');
const empleadosRoutes = require('./rutas/empleados');
const empresaRoutes = require('./rutas/empresa');
const formapagoRoutes = require('./rutas/formapago');
const productoRoutes = require('./rutas/producto');
const proveedorRoutes = require('./rutas/proveedor');
const sucursalesRoutes = require('./rutas/sucursales');
const tipoproductoRoutes = require('./rutas/tipoproducto');
const tipousuarioRoutes = require('./rutas/tipousuario');
const usuarioRoutes = require('./rutas/usuario');
const authRoutes = require('./rutas/auth');

const userRoutes = require('./rutas/user');


app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'universum100',
    port:3306,
    database:'ventas'
}, 'single'));
app.use(express.urlencoded({extended: false}));

var bodyParser = require('body-parser');
 // create application/json parser
app.use(bodyParser.json());


// rutas frontend
app.use('/api/empresa', empresaRoutes);
app.use('/api/sucursales', sucursalesRoutes);
app.use('/api/proveedor', proveedorRoutes);
app.use('/api/areas_trabajo', areas_trabajoRoutes);
app.use('/api/empleados', empleadosRoutes);
app.use('/api/tipousuario', tipousuarioRoutes);
app.use('/api/usuario', usuarioRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/tipoproducto', tipoproductoRoutes);
app.use('/api/producto', productoRoutes);
app.use('/api/formapago', formapagoRoutes);
app.use('/api', authRoutes);

app.use('/api/user',userRoutes);

// archivos estaticos frontend
app.use(express.static(path.join(__dirname,'public')));


//inicializando el server
app.listen(app.get('port'), () =>{
    console.log("PUERTO 3000");
});
