const mysql = require('mysql');

const conexion3 = mysql.createConnection({
    host: '26.213.81.244',
    user: 'Esteban',
    password: 'rootroot',
    database: 'proyectobdd2',
    port: 3307
});

conexion3.connect((error)=>{
    if(error){
        console.log('Error de Conexion: ' + error);
        return;
    }
    console.log('Conectado a la Base de Datos...');
});

module.exports = conexion3;