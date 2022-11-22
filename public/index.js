
const form = document.querySelector('form')
const pokemonContainer = document.querySelector('#pokemon-container')
const chosen = document.querySelector('#chosen')

let baseUrl = `/api/pokemo`
const pokemonCallback = ({ data: pokemon }) => displayPokemon(pokemon)
const errCb = err => console.log(err)
const getAllPokemon = () => axios.get(`${baseUrl}`).then(pokemonCallback).catch(errCb)
const createPokemon = body => axios.post(baseUrl, body).then(pokemonCallback).catch(errCb)
// const updatePokemon = (id) => axios.put(`${baseUrl}/${id}`).then(pokemonCallback).catch(errCb)


function submitHandler(e) {
    e.preventDefault()

    let attack = document.querySelector('#attack')
    let health = document.querySelector('#health')
    let imgURL = document.querySelector('#img')
    let name = document.querySelector('#name')

    let bodyObj = {
        attack: attack.value,
        health: health.value, 
        imgURL: imgURL.value,
        name: name.value
    }

    createPokemon(bodyObj)
    attack.value = ''
    health.value = ''
    imgURL.value = ''
    name.value = ''
}

function createPokemonCard(poke){
    let pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')

    pokeCard.innerHTML = `<div class='pokemon-outline'>
    <h1 class='card-name'> ${poke.name}</h1>
    <img alt='pokemon cover image'src=${poke.imgURL} class="pokemon-image"/>
    <h4 class='stats'>${poke.name}'s Stats</h4>
  <p class='pokemon-health'>${poke.health}HP</p>
  <p class='pokemon-attack'>Attack Power ${poke.attack}</p>
  </div> 
    `
    pokemonContainer.appendChild(pokeCard)
    pokemonContainer.appendChild(form)
    
}


function displayPokemon(arr){
    pokemonContainer.innerHTML = ``
        for(let i= 0; arr.length > i; i++){
            createPokemonCard(arr[i])
        }

}
// Make a empty array choices []
/*
create a new place to put your choices
container.html = `` you can copy and past the outline already created but the name has to be different
then append it to the new container you just created
*/




form.addEventListener('submit', submitHandler)
getAllPokemon()


// updatePokemon()