'use strict';

module.exports = function(app) {
    var pokemon = require('../controllers/pokemonControllers');
    app.get('/favicon.ico', (req, res) => res.status(204));
    app.get('/', (req, res) => res.redirect('/docs'));

    app.route('/pokeapi').get(pokemon.getPokemonsList);
    app.route('/registered').get(pokemon.getPokemons);

    app.route('/:pokemon_name').get(pokemon.findByName)
        .put(pokemon.createTransaction);
    app.route('/:pokemon_name/transactions').get(pokemon.getTransactions)
    app.route('/:pokemon_name/transactions/:transaction_id').put(pokemon.finishTransaction)
};