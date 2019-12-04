require('dotenv').config()
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Pokemon = require('./models/pokemonModel'),
    bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pokemons');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

var routes = require('./routes/pokemonRoutes');
routes(app);

app.listen(port);

console.log('A RESTful API to a pokemon market started on: ' + port);