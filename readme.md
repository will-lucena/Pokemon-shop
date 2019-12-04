# Pokeshop API

## [Heroku application](https://pokeshop-nosql.herokuapp.com/)

## Description

This is a repository of a node API connected with a mongo database to work like a pokemon market where the user can:

* Request pokemons infos from [pokeapi](https://pokeapi.co) by name
* Create buy and sell transactions to a specific pokemon by name
* List all transactions of a specific pokemon by name
* Finish a specific transaction using its _id and the pokemon name
* List all pokemons stored in the mongo database

this project was created to the final exam of the NoSql class from IMD - UFRN

## How to run

1. ``` npm install ```
1. ``` Setup your mongo on port 27017 and start it ```
1. ``` npm run start ```
1. ``` Access localhost:3000 on your browser to see the documenation ```
1. ``` Change the default server before trying access some endpoint through swagger ```