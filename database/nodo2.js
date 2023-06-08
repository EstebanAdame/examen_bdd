const mysql = require('mysql');

const conexion2 = mysql.createConnection({
    host: '26.244.96.15',
    user: 'Esteban',
    password: 'rootroot',
    database: 'proyectobdd2',
});

conexion2.connect((error)=>{
    if(error){
        console.log('Error de Conexion: ' + error);
        return;
    }
    console.log('Conectado a la Base de Datos...');
});

module.exports = conexion2;