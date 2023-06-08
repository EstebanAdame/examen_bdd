const mysql = require('mysql');

const conexion1 = mysql.createConnection({
    host: '26.104.69.138',
    user: 'Esteban',
    password: 'rootroot',
    database: 'proyectobdd2',
});

conexion1.connect((error)=>{
    if(error){
        console.log('Error de Conexion: ' + error);
        return;
    }
    console.log('Conectado a la Base de Datos...');
});

module.exports = conexion1;