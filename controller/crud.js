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
    const idUsuario = req.body.idUsuario;
    const nombre = req.body.nombre;
    const apellidoPaterno = req.body.apellidoPaterno;
    const apellidoMaterno = req.body.apellidoMaterno;
    const correo = req.body.correo;
    const estado = req.body.estado;
    conexion.query('UPDATE usuario SET ? WHERE idUsuario = ?',[{nombre:nombre, apellidoPaterno:apellidoPaterno, apellidoMaterno:apellidoMaterno,
        correo:correo, estado:estado}, idUsuario], (error, result)=>{
        if (error){
            console.log(error);
        }else {
            console.log(idUsuario);
            res.redirect('/consultaUsuario');
        }
    })
}

exports.saveProducto = (req,res)=>{
    const nombreProducto = req.body.nombreProducto;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const cantidad = req.body.cantidad;
    conexion.query('INSERT INTO producto1_v SET ?',{nombreProducto:nombreProducto, precio:precio}, (error, result1)=>{
        if (error){
            console.log(error);
        }else {
            const idProducto = result1.insertId;
            conexion.query('INSERT INTO producto2_v SET ?',{idProducto:idProducto, marca: marca, cantidad:cantidad }, (error, result1)=> {
                if (error)
                    throw error;
                else
                    res.redirect('/consultaProducto');
            });}
    });
}

exports.editProducto = (req,res)=>{
    const idProducto = req.body.idProducto;
    const nombreProducto = req.body.nombreProducto;
    const precio = req.body.precio;
    const marca = req.body.marca;
    const cantidad = req.body.cantidad;
    conexion.query('UPDATE producto1_v SET ? WHERE idProducto = ?',[{nombreProducto:nombreProducto, precio:precio}, idProducto], (error, result)=>{
        if (error)
            console.log(error);
        else {
            console.log(result);
            conexion.query('UPDATE producto2_v SET ? WHERE idProducto = ?',[{marca:marca, cantidad:cantidad}, idProducto], (error, result)=> {
                if(error)
                    throw error;
                else
                    console.log(result);
                    res.redirect('/consultaProducto');
            });
        }
    });
}

exports.savePedido = (req,res)=> {
    const fecha_pedido = req.body.fecha_pedido;
    const cantidad = req.body.cantidad;
    const idUsuario = req.body.idUsuario;
    const idProducto = req.body.idProducto;
    console.log(idProducto);

    if (cantidad < 3) {
        conexion.query('INSERT INTO pedido1_h SET ?', {
            fecha_pedido: fecha_pedido,
            cantidad: cantidad
        }, (err, result) => {
            if (err)
                console.log(err);
            else {
                const idPedido1 = result.insertId;
                conexion.query('INSERT INTO pedido_usuario SET ?', {idPedido1: idPedido1, idUsuario: idUsuario}, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        conexion.query('INSERT INTO pedido_producto SET ?', {idPedido1: idPedido1, idProducto: idProducto}, (err, result) => {
                            if (err)
                                console.log(err);
                            else {
                                conexion.query('SELECT cantidad FROM producto2_v WHERE idProducto = ?', [idProducto], (err, result4) => {
                                    if (err)
                                        console.log(err)
                                    else {
                                        stock = result4[0].cantidad;
                                        console.log(stock);
                                        stock = stock - cantidad;
                                        console.log(stock);
                                        conexion.query('UPDATE producto2_v SET cantidad = ? WHERE idProducto = ?', [stock, idProducto], (err, result) => {
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
    } else {
        conexion.query('INSERT INTO pedido2_h SET ?', {
            fecha_pedido: fecha_pedido,
            cantidad: cantidad
        }, (err, result) => {
            if (err)
                console.log(err);
            else {
                const idPedido2 = result.insertId;
                conexion.query('INSERT INTO pedido_usuario SET ?', {
                    idPedido2: idPedido2,
                    idUsuario: idUsuario
                }, (err, result) => {
                    if (err)
                        console.log(err);
                    else {
                        conexion.query('INSERT INTO pedido_producto SET ?', {
                            idPedido2: idPedido2,
                            idProducto: idProducto
                        }, (err, result) => {
                            if (err)
                                console.log(err);
                            else {
                                conexion.query('SELECT cantidad FROM producto2_v WHERE idProducto = ?', [idProducto], (err, result4) => {
                                    if (err)
                                        console.log(err)
                                    else {
                                        stock = result4[0].cantidad;
                                        console.log(stock);
                                        stock = stock - cantidad;
                                        console.log(stock);
                                        conexion.query('UPDATE producto2_v SET cantidad = ? WHERE idProducto = ?', [stock, idProducto], (err, result) => {
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
}