

const form = document.querySelector('form')
const pokemonContainer = document.querySelector('#pokemon-container')

let baseUrl = `/api/pokemo`
const pokemonCallback = ({ data: pokemon }) => displayPokemon(pokemon)
const errCb = err => console.log(err)
const getAllPokemon = () => axios.get("/api/pokemo").then(pokemonCallback).catch(errCb)
// const addPokemon = () => axios.post({})
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

    pokeCard.innerHTML = `<div class='pokemon-outline'>
    <img alt='pokemon cover image'src=${poke.imageURL} class="pokemon-image"/>
    <div class='pokemon-stats'>
    <h2 class='name'> ${poke.name}</h1>
    <h3 class='pokemon-health'>Health ${poke.health}</h3>
    <h3 class='pokemon-attack'>Attack Power ${poke.attack}</h3>
    </div>
    `

    pokemonContainer.appendChild(pokeCard)
}



function displayPokemon(arr){
    pokemonContainer.innerHTML = ``
        for(let i= 0; arr.length > i; i++ ){
            createPokemonCard(arr[i])
        }
}

// form.addEventListener('submit', submitHandler)
getAllPokemon()