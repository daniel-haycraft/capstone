
const form = document.querySelector('form')
const pokemonContainer = document.querySelector('#pokemon-container')
const yourPoke = document.getElementById('your-pokemon')
const compPoke = document.getElementById('comp-pokemon')
const reset = document.getElementById('reset')

// const  = document.getElementById('')

let baseUrl = `/api/pokemo`
const pokemonCallback = ({ data: pokemon }) => displayPokemon(pokemon)
const errCb = err => console.log(err)
const getAllPokemon = () => axios.get(`${baseUrl}`).then(pokemonCallback).catch(errCb)
const createPokemon = body => axios.post(baseUrl, body).then(pokemonCallback).catch(errCb)
// const updatePokemon = (id) => axios.put(`${baseUrl}/${id}`).then(pokemonCallback).catch(errCb)
let allPoke = []
let battler = []
let playersPoke = []

async function myTables(){
    let result = await axios.get("/api/get/")
    allPoke = result.data
    // displayPokemon(allPoke)
}
myTables()
reset.addEventListener('click',  () => {
    allPoke = []
    myTables()
})

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
    pokeCard.addEventListener('click', () => {
        choosenCard(poke) 
    })
    
    pokeCard.innerHTML = `<div class='pokemon-outline'>
    <h1 class='card-name'> ${poke.name}</h1>
    <img alt='pokemon cover image'src= ${poke.imgURL} class="pokemon-image"/>
    <h4 class='stats'>${poke.name}'s Stats</h4>
  <p class='pokemon-health'>${poke.health}HP</p>
  <p class='pokemon-attack'>Attack Power ${poke.attack}</p>
  </div> 
    `
    pokemonContainer.appendChild(pokeCard)
    // chosen.appendChild(pokeCard)
}

function choosenCard(poke){
    if(playersPoke.length === 1){
        return alert("don't be so greedy")
    }
    let index = allPoke.findIndex(mons => mons.name === poke.name)
    playersPoke.push(allPoke[index])
    allPoke.splice(index, 1)
    let wild = allPoke[Math.floor(Math.random()*allPoke.length)]

    
    
    ///////////////////////////////////////////

    let pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')
        
        
    pokeCard.innerHTML = `
    <div class="pokemon-outline" >
    <p>Your Pokemon: </p>
    <h1 class='card-name' > ${poke.name}</h1>
    <img alt='pokemon cover image'src='${poke.imgURL}' class="pokemon-image"/>
    <h4 class='stats'>${poke.name}'s Stats</h4>
  <p class='pokemon-health'>${poke.health}HP</p>
  <p class='pokemon-attack'>Attack Power ${poke.attack}</p>
  <button class="attack!" onclick="location.href = './battle.html';">Attack Mode</button>
  </div> 
    `

    displayPokemon(allPoke)

    yourPoke.appendChild(pokeCard)
    pokeCard.addEventListener('click', ()=> {
        getBack(poke)
    })
    // yours.removeAttribute("hidden")
    // vs.removeAttribute('hidden')
    // computer.removeAttribute('hidden')
    getRandomPokemon(wild)
}
function getRandomPokemon(ra){
// RA === RANDOM :)
    battler.push(ra)
let pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')
        
        
    pokeCard.innerHTML = `
    <div class="pokemon-outline"> 
    <p>Your Opponent: </p>
    <h1 class='card-name' > ${ra.name}</h1>
    <img alt='pokemon cover image'src='${ra.imgURL}' class="pokemon-image"/>
    <h4 class='stats'>${ra.name}'s Stats</h4>
  <p class='pokemon-health'>${ra.health}HP</p>
  <p class='pokemon-attack'>Attack Power ${ra.attack}</p>
  </div> 
    `
    compPoke.appendChild(pokeCard)

}


function getBack(poke){
    yourPoke.innerHTML = ``
    let index = playersPoke.findIndex(mans => mans.name === poke.name)
    allPoke.push(playersPoke[index])
    playersPoke.splice(index, 1)
    displayPokemon(allPoke)
    //i could add more function ality but i can only have one pokemon for now
}


function displayPokemon(arr){
    pokemonContainer.innerHTML = ``
    yourPoke.innerHTML = ``
        for(let i= 0; arr.length > i; i++){
            createPokemonCard(arr[i]) 
        }
}

form.addEventListener('submit', submitHandler)
getAllPokemon()

// updatePokemon()