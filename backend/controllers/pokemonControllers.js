'use strict';

var mongoose = require('mongoose');
var Model = mongoose.model('pokemons');

var Pokedex = require('pokedex-promise-v2');
var Pokemon_api = new Pokedex();

exports.getPokemonsList = function(req, res) {
    console.log("=== Requesting pokemon list from poke api ===")
    Pokemon_api.getPokemonsList().then(response => {
        return res.status(200).json(response)
    })
}

exports.getPokemons = function(req, res) {
    console.log("=== Requesting pokemon list from database ===")
    Model.find({}, 'id name sprites transactions').exec((err, response) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(response)
    })
}

exports.findByName = async function(req, res) {
    console.log("=== Requesting pokemon by name ===")
    let pokemon = await Model.find({ name: req.params.pokemon_name }, 'id name sprites transactions')
    if (!pokemon || pokemon == undefined || pokemon[0] == undefined) {
        let response = await Pokemon_api.getPokemonByName(req.params.pokemon_name)
        pokemon = new Model(response);
        pokemon.save(function(err, _) {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).json(pokemon)
        })
    } else {
        return res.status(200).json(pokemon)
    }
}

exports.createTransaction = async function(req, res) {
    console.log("=== Creating new transaction ===")
    let pokemon = await Model.findOne({ name: req.params.pokemon_name })
    let array = []
    if (pokemon.transactions != undefined) {
        array = pokemon.transactions
    }
    array.push({ type: req.body.kind, value: req.body.value, status: 'ongoing' })
    pokemon.transactions = array
    pokemon.save(function(err, _) {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(pokemon.transactions);
    })
}

exports.finishTransaction = async function(req, res) {
    console.log("=== Creating new transaction ===")
    let pokemon = await Model.findOne({ name: req.params.pokemon_name })
    let transaction = pokemon.transactions.id(req.params.transaction_id)
    if (transaction) {
        transaction.status = 'done'
    }
    pokemon.save(function(err, _) {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(pokemon.transactions);
    })
}

exports.getTransactions = function(req, res) {
    console.log("=== Listing all transactions for a pokemon ===")
    Model.find({ name: req.params.pokemon_name }, 'transactions').exec((err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(result);
    })
}