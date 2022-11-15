
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
    let imgURL = document.querySelector('#img')
    let name = document.querySelector('#name')

    let bodyObj = {
        attack: attack.value,
        health: health.value, 
        imgURL: imageURL.value,
        name: name.value
    }

    createPokemon(bodyObj)
    attack.value = ''
    health.value = ''
    name.value = ''
    imgURL.value = ''
}

function createPokemonCard(poke){
    let pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')

    pokeCard.innerHTML = `<div class='pokemon-outline'>
    <img alt='pokemon cover image'src=${poke.imgURL} class="pokemon-image"/>
    <h2 class='name'> ${poke.name}</h1>
  <h5 class='pokemon-health'>HP ${poke.health}</h5>
  <h5 class='pokemon-attack'> Attk ${poke.attack}</h5>
  </div>
  <div onclick="deletePokeman"(${poke.id})></div>
    
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