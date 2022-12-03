const pokemon = require('./db.json')

let pokemonId = 14 
const getAllPokemon = (req, res) => {
    res.status(200).send(pokemon)
}
const myTables = (req, res) => {
    let allPoke = pokemon
    res.status(200).send(allPoke)
}
const createPokemon = (req, res) => {
    const { name, health, attack, imgURL } = req.body;
    pokemon.push({
        name,
        health,
        attack,
        imgURL,
        id: pokemonId
    });
    pokemonId++
    res.status(200).send(pokemon);
}

// const randomAttackNum = (req, res)=>{
//     const { attack } = req.body
//     let min = 30;
//     let  max = 40;
//     let  random = Math.floor(Math.random() * (+max + 1 - +min)) + +min;
//     random = attack
//     res.status(200).send(attack);
// }

module.exports = { 
getAllPokemon,
myTables,
createPokemon,
// randomAttackNum
}