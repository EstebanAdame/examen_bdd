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
router.get('/editUsuario/:idUsuario', (req,res)=>{
    const idUsuario = req.params.idUsuario;
    conexion.query('SELECT * FROM usuario WHERE idUsuario=?',[idUsuario], (err, result)=>{
        if(err){
            throw err;
        } else{
            res.render('editUsuario.ejs', {usuario:result[0]});
        }
    })
})
router.get('/deleteUsuario/:idUsuario', (req,res)=>{
    const idUsuario = req.params.idUsuario;
    conexion.query('DELETE FROM usuario WHERE idUsuario = ?',[idUsuario], (err,result)=>{
        if(err){
            throw err;
        } else{
            res.redirect('/consultaUsuario');
        }
    });
});

//Productos
router.get('/consultaProducto', (req,res)=>{
    conexion.query('SELECT * from producto1_v', (err, result1)=>{
        if(err){
            throw err;
        } else{
            conexion.query('SELECT * from producto2_v', (err, result2)=> {
                if(err){
                    throw err;
                } else{
                    res.render('consultaProducto.ejs', {result1: result1, result2:result2});
                }
            });
        }
    });
});
router.get('/saveProducto', (req, res)=>{
    res.render('altaProducto');
});
router.post('/saveProducto', crud.saveProducto);
router.post('/editProducto', crud.editProducto);
router.get('/editProducto/:idProducto', (req,res)=>{
    const idProducto = req.params.idProducto;
    conexion.query('SELECT * FROM producto1_v WHERE idProducto=?',[idProducto], (err, result1)=>{
        if(err){
            throw err;
        } else{
            conexion.query('SELECT * FROM producto2_v WHERE idProducto=?',[idProducto], (err,result2)=>{
                if (err)
                    throw err;
                else {
                    res.render('editProducto.ejs', {producto1: result1[0], producto2: result2[0]});
                }
            });
        }
    })
});
router.get('/deleteProducto/:idProducto', (req,res)=>{
    const idProducto = req.params.idProducto;
    conexion.query('DELETE FROM producto1_v WHERE idProducto = ?',[idProducto], (err,result)=>{
        if(err){
            throw err;
        } else{
            conexion.query('DELETE FROM producto2_v WHERE idProducto = ?',[idProducto], (err,result)=>{
                if (err)
                    throw err;
                else
                    res.redirect('/consultaProducto');
            });
        }
    });
});

//Pedidos
router.get('/consultaPedido', (req,res)=>{
    const usuariosQuery = 'SELECT * FROM pedido_usuario'; // Consulta de usuarios
    const productosQuery = 'SELECT * FROM pedido_producto'; // Consulta de productos
    conexion.query('SELECT * from pedido1_h', (err, result1)=>{
        if(err){
            throw err;
        } else{
            conexion.query('SELECT * FROM pedido2_h', (err, result2)=>{
                conexion.query(usuariosQuery,(err,resultU)=>{
                    if (err)
                        throw err;
                    else{
                        conexion.query(productosQuery,(err,resultP)=>{
                            if(err)
                                throw err;
                            else
                                res.render('consultaPedido.ejs', {result1:result1, result2:result2, resultP:resultP, resultU:resultU});
                        });
                    }
                });
            });
        }
    });
});
router.get('/savePedido', (req, res) => {
    const usuariosQuery = 'SELECT * FROM usuario'; // Consulta de usuarios
    const productosQuery1 = 'SELECT * FROM producto1_v'; // Consulta de productos
    const productosQuery2 = 'SELECT * FROM producto2_v'; // Consulta de productos
    conexion.query(usuariosQuery, (err, resultU)=>{
        if (err){
            throw err;
        } else
            conexion.query(productosQuery1, (err, resultP1)=>{
                if (err){
                    throw err;
                } else{
                    conexion.query(productosQuery2, (err, resultP2)=>{
                        if (err)
                            throw err;
                        else
                            res.render('altaPedido.ejs', {resultU:resultU, resultP1:resultP1, resultP2:resultP2});
                    });
                }
            })
    });

});

router.post('/savePedido', crud.savePedido);



module.exports = router;