const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'proyectobdd',
});

conexion.connect((error)=>{
    if(error){
        console.log('Error de Conexion: ' + error);
        return;
    }
    console.log('Conectado a la Base de Datos...');
});

module.exports = conexion;