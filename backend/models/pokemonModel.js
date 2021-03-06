'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var transactionSchema = new Schema({
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: 'transactions' },
    value: Number,
    type: String,
    status: String
})

var Pokemon = new Schema({
    abilities: [],
    base_experience: Number,
    forms: [],
    game_indices: [],
    height: Number,
    held_items: [],
    id: Number,
    is_default: Boolean,
    location_area_encounters: String,
    moves: [],
    name: String,
    order: Number,
    species: {},
    sprites: {},
    stats: [],
    types: [],
    weight: Number,
    transactions: [transactionSchema]
});
mongoose.model('transactions', transactionSchema)
module.exports = mongoose.model('pokemons', Pokemon);