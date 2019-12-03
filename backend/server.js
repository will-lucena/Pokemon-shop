require('dotenv').config()
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Pokemon = require('./models/pokemonModel'), //created model loading here
    bodyParser = require('body-parser');

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./docs');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pokemons');

//mongoose.connect('mongodb://localhost:27017/pokemons');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));


var routes = require('./routes/pokemonRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('A simple blackjack server using RESTful API started on: ' + port);