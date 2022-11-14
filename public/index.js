// const { default: axios } = require("axios")

// const { default: axios } = require("axios")

// const { query } = require("express")


let baseUrl = `/api/pokemo`
const pokemonContainer = document.querySelector('#pokemon-container')
const pokemonCallback = ({ data: pokemon }) => displayPokemon(pokemon)
const errCb = err => console.log(err)

const getAllPokemon = () => axios.get(baseUrl).then(pokemonCallback).catch(errCb)

function submitHandler(e) {
    e.preventDefault()

    let attack = document.querySelector('#attack')
    let health = document.querySelector('#health')
    let imageURL = document.querySelector('#img')
    let name = document.querySelector('#name')

    let bodyObj = {
        attack: attack.value,
        health: health.value, 
        imageURL: imageURL.value,
        name: name.value
    }

    createPokemon(bodyObj)
    attack.value = ''
    health.value = ''
    imageURL.value = ''
    name.value = ''
}

function createPokemonCard(poke){
    const pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')

    pokeCard.innerHTML = `<img src=${poke.imageURL} class="pokemon-image"/>
    <p class='name'> ${poke.name}</p>
    <div class='pokemon-stats'>
    <p class='pokemon-health'>${poke.health}</p>
    <p class='pokemon-attack'>${poke.attack}</p>
    </div>`

    pokemonContainer.appendChild(pokeCard)
}



function displayPokemon(arr){
    pokemonContainer.innerHTML = ``
        for(let i= 0; arr.length > i; i++ ){
            createPokemonCard(arr[i])
        }
}


getAllPokemon()