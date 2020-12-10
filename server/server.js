require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser');
const app = express();



// parse application/x-www-form-urlencoded
app.set('port', process.env.PORT || 4000);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// parse application/json
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send('<h1>Bienvenido a mi servidor REST</h1>');
});

app.use(require('./routes/usuario'));
app.use(require('./routes/categoria'));
app.use(require('./routes/productos'));


mongoose.connect('mongodb+srv://admin:4w0sutags@cluster0.t993c.mongodb.net/cafeteria', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('El servidor esta en linea por el puerto', process.env.PORT);
});