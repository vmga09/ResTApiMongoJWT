const express = require('express');
const cors = require('cors');
const { dbConnect } = require('../db/config');


class Server {

    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.usuariosPath = '/api/usuarios';
        this.usuariosAdmin = '/api/admin';
        this.authPath ='/api/auth';
        this.categorias = '/api/categorias';
        this.productos = '/api/productos';
        this.buscar = '/api/buscar';

        //Conexion a la base de datos
        this.connectDB();

        //Middlewares
        this.middleware();

        //Rutas de l aplicación
        this.routes();
    }

    async connectDB(){
        await dbConnect();
    }

    middleware(){
        //Cors
        this.app.use(cors());
        //Directorio Públicos
        this.app.use(express.static('public'));
        // Lectura y parseo del body
        this.app.use(express.json());
    }

    routes(){
        this.app.use(this.usuariosPath,require('../routes/user'));
        this.app.use(this.usuariosAdmin,require('../routes/admin'));
        this.app.use(this.authPath,require('../routes/auth'));
        this.app.use(this.categorias,require('../routes/categorias'));
        this.app.use(this.productos,require('../routes/productos'));
        this.app.use(this.buscar,require('../routes/buscar'));
    }
    
    listen(){
        this.app.listen(this.port,()=>{
            console.log('Servidor corrien en puerto',this.port);
        });
    }


}


module.exports = Server;