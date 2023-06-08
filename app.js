const express = require('express');
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', require('./router'));

app.get('/', (req,res)=> {
    res.send('Hola de Nuevo a Node JS + Express JS');
});

app.listen(1337, ()=> {
    console.log('Server corriendo en http://localhost:1337');
});
