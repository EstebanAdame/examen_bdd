const express = require('express');
const router = express.Router();
const conexion = require('./database/db');
const crud = require('./controller/crud');


router.get('/', (req,res)=>{
            res.render('index.ejs');
});

//Usuarios
router.get('/consultaUsuario', (req,res)=>{
    conexion.query('SELECT * from usuario', (err, result)=>{
        if(err){
            throw err;
        } else{
            res.render('consultaUsuario.ejs', {result:result});
        }
    });
});
router.get('/saveUsuario', (req, res)=>{
    res.render('altaUsuario');
});
router.post('/saveUsuario', crud.saveUsuario);
router.post('/editUsuario', crud.editUsuario);
router.get('/editUsuario/:idcliente', (req,res)=>{
    const idcliente = req.params.idcliente;
    conexion.query('SELECT * FROM usuario WHERE idcliente=?',[idcliente], (err, result)=>{
        if(err){
            throw err;
        } else{
            res.render('editUsuario.ejs', {usuario:result[0]});
        }
    })
})
router.get('/deleteUsuario/:idcliente', (req,res)=>{
    const idcliente = req.params.idcliente;
    conexion.query('DELETE FROM usuario WHERE idcliente = ?',[idcliente], (err,result)=>{
        if(err){
            throw err;
        } else{
            res.redirect('/consultaUsuario');
        }
    });
});

//Productos
router.get('/consultaProducto', (req,res)=>{
    conexion.query('SELECT * from producto', (err, result)=>{
        if(err){
            throw err;
        } else{
            res.render('consultaProducto.ejs', {result:result});
        }
    });
});
router.get('/saveProducto', (req, res)=>{
    res.render('altaProducto');
});
router.post('/saveProducto', crud.saveProducto);
router.post('/editProducto', crud.editProducto);
router.get('/editProducto/:idproducto', (req,res)=>{
    const idproducto = req.params.idproducto;
    conexion.query('SELECT * FROM producto WHERE idproducto=?',[idproducto], (err, result)=>{
        if(err){
            throw err;
        } else{
            res.render('editProducto.ejs', {producto:result[0]});
        }
    })
});
router.get('/deleteProducto/:idproducto', (req,res)=>{
    const idproducto = req.params.idproducto;
    conexion.query('DELETE FROM producto WHERE idproducto = ?',[idproducto], (err,result)=>{
        if(err){
            throw err;
        } else{
            res.redirect('/consultaProducto');
        }
    });
});

//Pedidos
router.get('/consultaPedido', (req,res)=>{
    const usuariosQuery = 'SELECT * FROM pedido_usuario'; // Consulta de usuarios
    const productosQuery = 'SELECT * FROM pedido_producto'; // Consulta de productos
    conexion.query('SELECT * from pedidos', (err, result)=>{
        if(err){
            throw err;
        } else{
            conexion.query(usuariosQuery,(err,resultU)=>{
                if (err)
                    throw err;
                else{
                    conexion.query(productosQuery,(err,resultP)=>{
                        if(err)
                            throw err;
                        else
                            res.render('consultaPedido.ejs', {result:result, resultP:resultP, resultU:resultU});
                    });
                }
            });
        }
    });
});
router.get('/savePedido', (req, res) => {
    const usuariosQuery = 'SELECT * FROM usuario'; // Consulta de usuarios
    const productosQuery = 'SELECT * FROM producto'; // Consulta de productos
    conexion.query(usuariosQuery, (err, resultU)=>{
        if (err){
            throw err;
        } else
            conexion.query(productosQuery, (err, resultP)=>{
                if (err){
                    throw err;
                } else
                    res.render('altaPedido.ejs', {resultU:resultU, resultP:resultP});
            })
    });

});

router.post('/savePedido', crud.savePedido);



module.exports = router;