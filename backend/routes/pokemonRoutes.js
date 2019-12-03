'use strict';

module.exports = function(app) {
    var pokemon = require('../controllers/pokemonControllers');

    app.get('/favicon.ico', (req, res) => res.status(204));

    app.route('/').get(pokemon.getPokemonsList);

    app.route('/registered').get(pokemon.getPokemons);

    app.route('/:pokemon_name').get(pokemon.findByName)
        .put(pokemon.createNegociation);

    app.route('/:pokemon_name/negociations').get(pokemon.getNegociations)


    /*
    app.route('/finishedGames/')
        .get(game.listFinishedGames)

    app.route('/ongoingGames/')
        .get(game.listOngoingGames)


    app.route('/games/:gameId')
        .get(game.findGame)
        .put(game.makeAPlay)
        .delete(game.deleteGame);
    /**/
};