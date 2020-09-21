//Archivo pra crear todas las rutas de los usuarios

const express = require('express');

const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();
app.get('/usuario', function (req, res) {

    //Parametros opsionales caen req.query
    // en  para ejecutarlos en postman
    //se debe poner el signo ?localhost:3000/usuario?desde=10
    let desde = req.query.desde || 0;
    //variable se convierte en numero
    desde = Number(desde);

    // Variable para la paginacion
    //para agregr mas parametros se agrega &
    //localhost:3000/usuario?limite=10&desde=5
    let limite = req.query.limite || 5;

    //Se comvierte variable en  numero
    limite = Number(limite)
    //Metodo para bucar los registros en mongo
    Usuario.find({
        //Condiciones de busqueda
        estado: true
        //google:true
    },//Condicion especial eligiendo los campos ue se uieren mostrar
        'nombre  role estado email img')
        //Metodo para saltar 5 registros
        .skip(desde)
        //Metodo para mostrar limitar los registros a mostrar
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Usuario.count({
                estado:true
                //Condiciones 
                //google:true
            }, (err, conteo) => {
                res.json({
                    ok: true,
                    usuarios,
                    cuantos: conteo
                })
            })

        })
});

app.post('/usuario', function (req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 1),
        role: body.role,
        google: body.google
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });

        }
        usuarioDB.password = null;
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })






});
//MEtodo para actualizar un registro
app.put('/usuario/:id', function (req, res) {

    let id = req.params.id;
    //la funcion pick solo modificar las propiedades especificas en el arreglo
    //Del pauete underscore
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'estado', 'role']
    );


    //Tres parametros id, data,la palabra new es si uieres ue devuelba 
    //para retornar el nuevo objeto
   //Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
   
   Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, usuarioDB) => {
   if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    })


});

app.delete('/usuario/:id', function (req, res) {
    let id = req.params.id;
    let cambioEstado={
        estado : false
    }
    Usuario.findByIdAndUpdate(id, cambioEstado,{new : true},(err, usuarioBorrado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if (!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err :{
                    message :'Usuario no encontrado'
                }
            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        });
    });
});
//Exportar lo que se quiere compartir 
//o usar en otro archivo
module.exports = app;


//npm update actualiza todas las dependencias