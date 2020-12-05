const express = require('express');
const _ = require('underscore');
const Productos = require('../models/productos');
const app = express();

app.get('/productos', function(req, res) {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;

    Productos.find({ disponible: true })
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('productos', 'nombre precio')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de consular',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de productos obtenida con exito',
                conteo: productos.length,
                productos
            });
        });
});

app.post('/productos', function(req, res) {
    let prod = new Productos({
        nombre: req.body.nombre,
        precio: req.body.precio,
        usuario: req.body.usuario
    });

    prod.save((err, prodDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto insertado con exito',
            prodDB
        });
    });
});

app.put('/productos/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precio']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, prodDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Producto actualizado con exito',
                productos: prodDB
            });
        });
});

app.delete('/productos/:id', function(req, res) {
    let id = req.params.id;

    Productos.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, prodDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Producto eliminado con exito',
            prodDB
        });
    });
});

module.exports = app;