'use strict';

var mongoose = require('mongoose');
var Driver = mongoose.model('pokemons');

var Pokedex = require('pokedex-promise-v2');
var P = new Pokedex();

exports.getPokemonsList = function(req, res) {
    console.log("=== Requesting pokemon list from poke api ===")
    P.getPokemonsList().then(response => {
        res.json(response)
    })
}

exports.getPokemons = function(req, res) {
    console.log("=== Requesting pokemon list from database ===")
    Driver.find().exec((err, pokemons) => {
        if (err) {
            res.send(err)
        }
        res.json(pokemons)
    })
}

exports.findByName = function(req, res) {
    console.log("=== Requesting pokemon by name ===")
    P.getPokemonByName(req.params.pokemon_name)
        .then(pokemon_api_response => {
            Driver.find({ id: pokemon_api_response.id }).then(driver_response => {
                if (driver_response[0] == undefined) {
                    let pokemon = new Driver(pokemon_api_response);
                    pokemon.save(function(err, mongo_save_result) {
                        if (err) {
                            res.send(err);
                        }
                        console.log(mongo_save_result.name + " saved sucessfully");
                        res.json(driver_response)
                    });
                } else {
                    res.json(driver_response)
                }
            })
        })
        .catch(function(status, body) {
            res.status(status).send(body)
        });
}

exports.createNegociation = function(req, res) {
    console.log("=== Creating new negociation ===")
    Driver.replaceOne({ id: req.params.pokemon_id }, function(err, pokemon) {
        if (pokemon.negociations == undefined || pokemon.negociations[0] == undefined) {
            pokemon.negociations = []
        }

        pokemon.negociations.push({ type: req.body.kind, value: req.body.value, status: 'ongoing' })
        console.log(pokemon.negociations)
    }).then(_ => {
        res.json("Negociation created sucesfully");
    })
}

exports.getNegociations = function(req, res) {
    console.log("=== Listing all negociations for a pokemon ===")
    Driver.find({ id: req.params.pokemon_id }, 'negociations').exec((err, result) => {
        if (err) {
            res.send(err)
        }
        console.log(result)
        res.json(result)
    })
}

exports.insertData = function(req, res) {
    console.log("=== Iniciando inserções ===")
    console.time("timer")
    let array = create()
    Pokemon.collection.insertMany(array, function(err, docs) {
        if (err) {
            console.log("first")
            res.send(err)
        } else {
            console.timeEnd("timer");
            console.log("=== Inserções finalizadas ===");
            console.info('%d pokemons were successfully stored.', docs.length);
            res.send(Pokemon.collection.countDocuments)
                /*
                Pokemon.collection.insertMany(array, function(err, docs) {
                    if (err) {
                        console.log("second")
                        res.send(err)
                    } else {
                        console.timeEnd("timer");
                        console.log("=== Inserções finalizadas ===");
                        console.info('%d pokemons were successfully stored.', docs.length);
                        res.send(Pokemon.collection.countDocuments)
                    }
                })
                /**/
        }
    })
}

function create() {
    let array = []
    for (let index = 0; index < 500000; index++) {
        array.push(new Pokemon({ val1: Math.floor(Math.random() * 101), val2: Math.floor(Math.random() * 101) }))
    }
    return array
}

exports.getAllBetweenInterval = function(req, res) {
    let minValue = 0;
    let maxValue = 5;
    Pokemon.find({ val1: { $gte: minValue, $lte: maxValue } }, function(err, Pokemon) {
        if (err) {
            res.send(err);
        }
        res.json(Pokemon);
    });
};
/*
exports.listOngoingGames = function(req, res) {
    Game.find({ status: 'ongoing' }, function(err, Game) {
        if (err) {
            res.send(err);
        }
        res.json(Game);
    });
};

exports.listFinishedGames = function(req, res) {
    Game.find({ status: 'completed' }, function(err, Game) {
        if (err) {
            res.send(err);
        }
        res.json(Game);
    });
};

exports.createNewGame = function(req, res) {
    let newGame = new Game(req.body);
    newGame.save(function(err, Game) {
        if (err) {
            res.send(err);
        }
        res.json(Game);
    });
};

exports.findGame = function(req, res) {
    Game.findById(req.params.gameId, function(err, Game) {
        if (err) {
            res.send(err);
        }
        res.json(Game);
    });
};


exports.makeAPlay = function(req, res) {
    Game.findById(req.params.gameId).exec((err, game) => {
        game.currentPoints += Math.floor(Math.random() * (11)) + 1;
        game.status = game.currentPoints >= 21 ? 'completed' : 'ongoing';
        game.save()

        if (err) {
            res.send(err);
        }
        res.json(game);
    })
};

exports.deleteGame = function(req, res) {
    Game.remove({
        _id: req.params.gameId
    }, function(err, Game) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Game successfully deleted' });
    });
};

Driver.findById(req.params.pokemon_id).exec((err, game) => {
    game.currentPoints += Math.floor(Math.random() * (11)) + 1;
    game.status = game.currentPoints >= 21 ? 'completed' : 'ongoing';
    game.save()

    if (err) {
        res.send(err);
    }
    res.json(game);
})
};
/**/