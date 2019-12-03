module.exports = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'Pokeshop',
        description: 'User management API',
        contact: {
            name: 'Will',
            email: 'will.lucen4@gmail.com',
            url: 'https://will-lucena.github.io/'
        },
        license: {
            name: 'MIT License',
            url: 'https://opensource.org/licenses/MIT'
        }
    },
    paths: {
        '/': {
            get: {
                description: 'Get all items from poke api',
                operationId: 'getPokemonsList',
                responses: {
                    '200': {
                        description: 'List of all poke api items',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pokemon'
                                }
                            }
                        }
                    },
                }
            },
        },
        '/registered': {
            get: {
                description: 'Get information about pokemons in database',
                operationId: 'getPokemons',
                responses: {
                    '200': {
                        description: 'List of all pokemon already added to database',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pokemon'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/error'
                                }
                            }
                        }
                    }
                },
            }
        },
        '/:pokemon_name': {
            get: {
                description: 'Get information about one pokemon',
                operationId: 'findByName',
                responses: {
                    '200': {
                        description: 'List of all poke api items',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/Pokemon'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/error'
                                }
                            }
                        }
                    }
                },
                parameters: [{
                    name: 'pokemon_name',
                    in: 'path',
                    schema: {
                        $ref: '#/components/schemas/name'
                    },
                    required: true,
                    description: 'Pokemon name'
                }],
            },
            put: {
                description: 'Create a new transaction to this pokemon',
                operationId: 'createTransaction',
                parameters: [],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/TransactionBody'
                            }
                        }
                    },
                    required: true
                },
                responses: {
                    '200': {
                        description: 'New transaction creacted to this pokemon'
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/error'
                                },
                            }
                        }
                    }
                }
            }
        },
        '/:pokemon_name/transactions': {
            get: {
                description: 'Get transactions about this pokemon',
                operationId: 'getTransactions',
                responses: {
                    '200': {
                        description: 'List of all transactions of this pokemon',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/TransactionBody'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/error'
                                }
                            }
                        }
                    }
                },
                parameters: [{
                    name: 'pokemon_name',
                    in: 'path',
                    schema: {
                        $ref: '#/components/schemas/name'
                    },
                    required: true,
                    description: 'Pokemon name'
                }],
            }
        },
        '/:pokemon_name/transactions/:transaction_id': {
            put: {
                description: 'Complete this transaction',
                operationId: 'finishTransaction',
                responses: {
                    '200': {
                        description: 'Complete the transaction',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/TransactionBody'
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/error'
                                }
                            }
                        }
                    }
                },
                parameters: [{
                        name: 'pokemon_name',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/name'
                        },
                        required: true,
                        description: 'Pokemon name'
                    },
                    {
                        name: 'transaction_id',
                        in: 'path',
                        schema: {
                            $ref: '#/components/schemas/transaction_id'
                        },
                        required: true,
                        description: 'Transaction id'
                    }
                ],
            },
        },
        components: {
            schemas: {
                TransactionBody: {
                    type: 'object',
                    description: 'Transaction body example',
                    properties: {
                        type: {
                            $ref: '#/components/schemas/type'
                        },
                        value: {
                            $ref: '#/components/schemas/value'
                        },
                        status: {
                            $ref: '#/components/schemas/statu'
                        },
                    }
                },
                Pokemon: {
                    type: 'object',
                    description: 'Pokemon',
                    properties: {
                        abilities: {
                            $ref: '#/components/schemas/abilites'
                        },
                        base_experience: {
                            $ref: '#/components/schemas/base_experience'
                        },
                        forms: {
                            $ref: '#/components/schemas/forms'
                        },
                        game_indices: {
                            $ref: '#/components/schemas/game_indices'
                        },
                        height: {
                            $ref: '#/components/schemas/height'
                        },
                        held_items: {
                            $ref: '#/components/schemas/held_items'
                        },
                        id: {
                            $ref: '#/components/schemas/id'
                        },
                        is_default: {
                            $ref: '#/components/schemas/is_default'
                        },
                        location_area_encounters: {
                            $ref: '#/components/schemas/location_area_encounters'
                        },
                        moves: {
                            $ref: '#/components/schemas/moves'
                        },
                        name: {
                            $ref: '#/components/schemas/name'
                        },
                        order: {
                            $ref: '#/components/schemas/order'
                        },
                        species: {
                            $ref: '#/components/schemas/species'
                        },
                        sprites: {
                            $ref: '#/components/schemas/sprites'
                        },
                        stats: {
                            $ref: '#/components/schemas/stats'
                        },
                        types: {
                            $ref: '#/components/schemas/types'
                        },
                        weight: {
                            $ref: '#/components/schemas/weight'
                        },
                        transactions: {
                            $ref: '#/components/schemas/transactions'
                        },
                    }
                },
                type: {
                    type: 'string',
                    enum: ['to_buy', 'to_sell'],
                    default: 'to_buy'
                },
                status: {
                    type: 'string',
                    enum: ['ongoing', 'done'],
                    default: 'ongoing'
                },
                value: {
                    type: 'number'
                },
                error: {
                    type: 'object'
                },
                location_area_encounters: {
                    type: 'string'
                },
                name: {
                    type: 'string'
                },
                is_default: {
                    type: 'bool'
                },
                weight: {
                    type: 'number'
                },
                order: {
                    type: 'number'
                },
                id: {
                    type: 'number'
                },
                height: {
                    type: 'number'
                },
                base_experience: {
                    type: 'number'
                },
                species: {
                    type: 'object'
                },
                sprites: {
                    type: 'object'
                },
                abilites: {
                    type: 'array'
                },
                forms: {
                    type: 'array'
                },
                stats: {
                    type: 'array'
                },
                types: {
                    type: 'array'
                },
                moves: {
                    type: 'array'
                },
                held_items: {
                    type: 'array'
                },
                game_indices: {
                    type: 'array'
                },
                transactions: {
                    type: 'array'
                },
                transaction_id: {
                    type: 'number'
                }
            }
        }
    }
}