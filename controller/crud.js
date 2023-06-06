const conexion = require('../database/db');

exports.saveUsuario = (req,res)=>{
    const nombre = req.body.nombre;
    const apellidoPaterno = req.body.apellidoPaterno;
    const apellidoMaterno = req.body.apellidoMaterno;
    const correo = req.body.correo;
    const estado = req.body.estado;
    if(nombre!="" && apellidoPaterno!="" && apellidoMaterno!="" && correo!="" && estado!=""){
        conexion.query('INSERT INTO usuario SET ?',{nombre:nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno:apellidoMaterno,
            correo:correo, estado:estado}, (error, result)=>{
            if (error){
                console.log(error);
            }else {
                console.log(result)
                res.redirect('/consultaUsuario');
            }
        })
    } else {
        console.log("Datos incompletos");
        res.redirect('/consultaUsuario');
    }
}

exports.editUsuario = (req,res)=>{
    const idcliente = req.body.idcliente;
    const nombre = req.body.nombre;
    const apellidoPaterno = req.body.apellidoPaterno;
    const apellidoMaterno = req.body.apellidoMaterno;
    const correo = req.body.correo;
    const estado = req.body.estado;
    conexion.query('UPDATE usuario SET ? WHERE idcliente = ?',[{nombre:nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno:apellidoMaterno,
        correo:correo, estado:estado}, idcliente], (error, result)=>{
        if (error){
            console.log(error);
        }else {
            console.log(idcliente);
            res.redirect('/consultaUsuario');
        }
    })
}

exports.saveProducto = (req,res)=>{
    const nombreProducto = req.body.nombreProducto;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const cantidad = req.body.cantidad;
    conexion.query('INSERT INTO producto SET ?',{nombreProducto:nombreProducto, precio:precio, marca:marca, cantidad:cantidad},
        (error, result)=>{
        if (error){
            console.log(error);
        }else {
            res.redirect('/consultaProducto');
        }
    })
}

exports.editProducto = (req,res)=>{
    const idproducto = req.body.idproducto;
    const nombreProducto = req.body.nombreProducto;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const cantidad = req.body.cantidad;
    conexion.query('UPDATE producto SET ? WHERE idproducto = ?',[{nombreProducto:nombreProducto, precio:precio, marca:marca,
    cantidad:cantidad}, idproducto], (error, result)=>{
        if (error){
            console.log(error);
        }else {
            console.log(idproducto);
            res.redirect('/consultaProducto');
        }
    })
}

exports.savePedido = (req,res)=>{
    const fecha_pedido = req.body.fecha_pedido;
    const cantidad = req.body.cantidad;
    const idcliente = req.body.idcliente;
    const idproducto = req.body.idproducto;
    conexion.query('INSERT INTO pedidos SET ?',{fecha_pedido:fecha_pedido, cantidad:cantidad},
        (error, result1)=>{
            if (error){
                console.log(error);
            }else {
                const idpedidos = result1.insertId;
                conexion.query('INSERT INTO pedido_usuario SET ?',{idpedidos:idpedidos, idcliente:idcliente}, (err, result)=>{
                    if(error){
                        console.log(err);
                    } else{
                        conexion.query('INSERT INTO pedido_producto SET ?',{idpedidos:idpedidos, idproducto:idproducto}, (err, result)=>{
                            if(err)
                                console.log(err);
                            else {
                                conexion.query('SELECT cantidad FROM producto WHERE idproducto = ?',[idproducto],(err,result4)=>{
                                    if (err)
                                        console.log(err)
                                    else{
                                        console.log(result4);
                                        stock = result4[0].cantidad;
                                        console.log(stock);
                                        stock = stock - cantidad;
                                        console.log(stock);

                                        conexion.query('UPDATE producto SET cantidad = ? WHERE idproducto = ?',[stock, idproducto], (err,result)=>{
                                            if (err)
                                                console.log(err);
                                            else
                                                res.redirect('/consultaPedido');
                                        });
                                    }
                                });
                            }
                        });
                    }

                });
            }
        });
}
