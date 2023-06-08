const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: '26.213.81.244',
    user: 'Kevin',
    password: 'rootroot',
    database: 'proyectobdd',
    port: 3306
});

conexion.connect((error)=>{
    if(error){
        console.log('Error de Conexion: ' + error);
        return;
    }
    console.log('Conectado a la Base de Datos...');
});

module.exports = conexion;