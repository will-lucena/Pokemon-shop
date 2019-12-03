'use strict';

module.exports = function(app) {
    var pokemon = require('../controllers/pokemonControllers');


    app.route('/').get(pokemon.getPokemonsList);
    app.route('/registered').get(pokemon.getPokemons);

    app.route('/:pokemon_name').get(pokemon.findByName);

    app.route('/:pokemon_id').post(pokemon.createNegociation);

    app.route('/:pokemon_id/negociations')
        .get(pokemon.getNegociations);

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