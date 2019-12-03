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
    servers: [{
            url: 'http://localhost:3000/',
            description: 'Local server'
        },
        {
            url: 'https://pokeshop-nosql.herokuapp.com/',
            description: 'Development server'
        },
    ],
    paths: {
        '/pokeapi': {
            get: {
                description: 'Get all items from poke api',
                operationId: 'getPokemonsList',
                responses: {
                    '200': {
                        description: 'List of all poke api items',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    description: 'Pokemon',
                                    properties: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            example: {
                                                id: {
                                                    type: 'number',
                                                    example: 25
                                                },
                                                name: {
                                                    type: 'string',
                                                    example: 'pikachu'
                                                },
                                                is_default: {
                                                    type: 'bool',
                                                    example: true
                                                },
                                            }
                                        }
                                    }
                                },
                            }
                        }
                    },
                }
            }
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
                                    type: 'object',
                                    description: 'Known pokemons',
                                    properties: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            example: {
                                                id: {
                                                    type: 'number',
                                                    example: 25
                                                },
                                                name: {
                                                    type: 'string',
                                                    example: 'pikachu'
                                                },
                                                is_default: {
                                                    type: 'bool',
                                                    example: true
                                                },
                                                transactions: {
                                                    type: 'array',
                                                    items: {
                                                        type: 'object',
                                                        example: {
                                                            type: {
                                                                type: 'string',
                                                                enum: ['to_buy', 'to_sell'],
                                                                default: 'to_buy'
                                                            },
                                                            value: {
                                                                type: 'number',
                                                                example: 50
                                                            },
                                                            status: {
                                                                type: 'string',
                                                                enum: ['ongoing', 'done'],
                                                                default: 'ongoing'
                                                            },
                                                        }
                                                    }
                                                },
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                }
                            }
                        }
                    }
                },
            }
        },
        '/{pokemon_name}': {
            get: {
                description: 'Get information about one pokemon',
                operationId: 'findByName',
                responses: {
                    '200': {
                        description: 'List of all poke api items',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    description: 'Pokemon',
                                    properties: {
                                        id: {
                                            type: 'number',
                                            example: 25
                                        },
                                        name: {
                                            type: 'string',
                                            example: 'pikachu'
                                        },
                                        is_default: {
                                            type: 'bool',
                                            example: true
                                        },
                                        transactions: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                example: {
                                                    type: {
                                                        type: 'string',
                                                        enum: ['to_buy', 'to_sell'],
                                                        default: 'to_buy'
                                                    },
                                                    value: {
                                                        type: 'number',
                                                        example: 50
                                                    },
                                                    status: {
                                                        type: 'string',
                                                        enum: ['ongoing', 'done'],
                                                        default: 'ongoing'
                                                    },
                                                }
                                            }
                                        },
                                    }
                                },
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                }
                            }
                        }
                    }
                },
                parameters: [{
                    name: 'pokemon_name',
                    in: 'path',
                    schema: {
                        type: 'string',
                        example: 'ditto'
                    },
                    required: true,
                    description: 'Pokemon name'
                }]
            },
            put: {
                description: 'Create a new transaction to this pokemon',
                operationId: 'createTransaction',
                parameters: [{
                    name: 'pokemon_name',
                    in: 'path',
                    schema: {
                        type: 'string',
                        example: 'ditto'
                    },
                    required: true,
                    description: 'Pokemon name'
                }],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                description: 'Transaction body example',
                                properties: {
                                    type: {
                                        type: 'string',
                                        enum: ['to_buy', 'to_sell'],
                                        default: 'to_buy'
                                    },
                                    value: {
                                        type: 'number',
                                        example: 50
                                    },
                                    status: {
                                        type: 'string',
                                        enum: ['ongoing', 'done'],
                                        default: 'ongoing'
                                    }
                                }
                            },
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
                                    type: 'object'
                                },
                            }
                        }
                    }
                }
            }
        },
        '/{pokemon_name}/transactions': {
            get: {
                description: 'Get transactions about this pokemon',
                operationId: 'getTransactions',
                responses: {
                    '200': {
                        description: 'List of all transactions of this pokemon',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    description: 'Transaction body example',
                                    items: {
                                        transactions: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                example: {
                                                    type: {
                                                        type: 'string',
                                                        enum: ['to_buy', 'to_sell'],
                                                        default: 'to_buy'
                                                    },
                                                    value: {
                                                        type: 'number',
                                                        example: 50
                                                    },
                                                    status: {
                                                        type: 'string',
                                                        enum: ['ongoing', 'done'],
                                                        default: 'ongoing'
                                                    },
                                                }
                                            }
                                        },
                                    }
                                },
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                }
                            }
                        }
                    }
                },
                parameters: [{
                    name: 'pokemon_name',
                    in: 'path',
                    schema: {
                        type: 'string',
                        example: 'ditto'
                    },
                    required: true,
                    description: 'Pokemon name'
                }],
            }
        },
        '/{pokemon_name}/transactions/{transaction_id}': {
            put: {
                description: 'Complete this transaction',
                operationId: 'finishTransaction',
                responses: {
                    '200': {
                        description: 'Complete the transaction',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    description: 'Transaction body example',
                                    properties: {
                                        type: {
                                            type: 'string',
                                            enum: ['to_buy', 'to_sell'],
                                            default: 'to_buy'
                                        },
                                        value: {
                                            type: 'number',
                                            example: 50
                                        },
                                        status: {
                                            type: 'string',
                                            enum: ['ongoing', 'done'],
                                            default: 'ongoing'
                                        }
                                    }
                                },
                            }
                        }
                    },
                    '500': {
                        description: 'Internal request error',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object'
                                }
                            }
                        }
                    }
                },
                parameters: [{
                        name: 'pokemon_name',
                        in: 'path',
                        schema: {
                            type: 'string',
                            example: 'ditto'
                        },
                        required: true,
                        description: 'Pokemon name'
                    },
                    {
                        name: 'transaction_id',
                        in: 'path',
                        schema: {
                            type: 'string'
                        },
                        required: true,
                        description: 'Transaction id'
                    }
                ],
            },
        }
    }
}