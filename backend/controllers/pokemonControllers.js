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
    Model.find({}, 'id name sprites negociations').exec((err, response) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(response)
    })
}

exports.findByName = async function(req, res) {
    console.log("=== Requesting pokemon by name ===")
    let pokemon = await Model.find({ name: req.params.pokemon_name }, 'id name sprites negociations')
    if (!pokemon || pokemon == undefined || pokemon[0] == undefined) {
        let response = await Pokemon_api.getPokemonByName(req.params.pokemon_name)
        pokemon = new Model(response);
        pokemon.save(function(err, mongo_save_result) {
            if (err) {
                return res.status(500).send(err)
            }
            return res.status(200).json(pokemon)
        })
    } else {
        return res.status(200).json(pokemon)
    }
}

exports.createNegociation = async function(req, res) {
    console.log("=== Creating new negociation ===")
    let pokemon = await Model.findOne({ name: req.params.pokemon_name })
    let array = []
    if (pokemon.negociations != undefined) {
        array = pokemon.negociations
    }
    array.push({ type: req.body.kind, value: req.body.value, status: 'ongoing' })
    pokemon.negociations = array
    pokemon.save(function(err, mongo_save_result) {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(mongo_save_result);
    })
}

exports.getNegociations = function(req, res) {
    console.log("=== Listing all negociations for a pokemon ===")
    Model.find({ name: req.params.pokemon_name }, 'negociations').exec((err, result) => {
        if (err) {
            return res.status(500).send(err)
        }
        return res.status(200).json(result);
    })
}