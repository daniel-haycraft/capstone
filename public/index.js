
const form = document.querySelector('form')
const pokemonContainer = document.querySelector('#pokemon-container')
const yourPoke = document.getElementById('your-pokemon')
const compPoke = document.getElementById('comp-pokemon')
const win = document.getElementById('win')
win.volume = .02
const battleSection = document.getElementById('battle-section')
const character = document.getElementById('character')
const refreshBtn = document.getElementById('refreshes')
const battlesBtn = document.getElementById('battles')
const vs = document.getElementById('vs')

const bh = document.getElementById('bh')
// this is the div connected to the battle button so i could correctly hide it
const rh = document.getElementById('rh')
// same thing with this one ^^
const compDiv = document.getElementById('compDiv')
let one = document.getElementById('ball-one')
let two = document.getElementById('ball-two')
let three = document.getElementById('ball-three')
let four = document.getElementById('ball-four')
let hiddenPokeball = document.getElementById('hidden-pokeball')
let hiddenChars = document.getElementById('hidden-chars')

let baseUrl = `/api/pokemo`
const pokemonCallback = ({ data: pokemon }) => displayPokemon(pokemon)
const errCb = error => console.log(error)
const getAllPokemon = () => axios.get(`${baseUrl}`).then(pokemonCallback).catch(errCb)
const createPokemon = body => axios.post(`${baseUrl}`, body).then(pokemonCallback).catch(errCb)
// const updatePokemon = (id) => axios.put(`${baseUrl}/${id}`).then(pokemonCallback).catch(errCb)
let allPoke = []
let battler = []
let playersPoke = []
let wins = 0
let losses = 0
async function myTables(){
    let result = await axios.get("/api/get/")
    allPoke = result.data

    displayPokemon(allPoke)
}
myTables()

function reset() {
    
    rh.setAttribute('hidden', 'hidden')
    bh.setAttribute('hidden', 'hidden')
    vs.setAttribute('hidden', 'hidden')
    compDiv.setAttribute('hidden', 'hidden')
    hiddenChars.removeAttribute('hidden')
    character.textContent = 'Choose Your Character'
    win.pause();
    win.currentTime = 0;
    yourPoke.innerHTML = ``
    compPoke.innerHTML = ``
    battler = []
    playersPoke = []
    myTables()
}

function submitHandler(e) {
    e.preventDefault()

    let attack = document.querySelector('#attack')
    let health = document.querySelector('#health')
    let imgURL = document.querySelector('#img')
    let name = document.querySelector('#name');

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
    allPoke.push(bodyObj)
}

function createPokemonCard(poke){
    
    let pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')

    pokeCard.addEventListener('click', () => {
        choosenCard(poke) 
    })
    
    pokeCard.innerHTML = `<div class='pokemon-outline'>
    <img alt='pokemon cover image'src= ${poke.imgURL} class="pokemon-image"/>
    <h4 class='stats'>${poke.name}'s Stats</h4>
  <p class='pokemon-health'>${poke.health}HP</p>
  <p class='pokemon-attack'>Attack Power ${poke.attack}</p>
  </div> 
    `
    pokemonContainer.appendChild(pokeCard)
    // pokemonContainer.appendChild(form)
    
    pokemonContainer.appendChild(form)
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
    <img alt='pokemon cover image'src='${poke.imgURL}' class="pokemon-image"/>
    <h4 class='stats'>${poke.name}'s Stats</h4>
    <p>  <span class='pokemon-health'>${poke.health} </span><span>HP</span> </p>
    <p>Attack Power</p>
    <p class='pokemon-attack'> ${poke.attack} </p>
    </div> 
    `
    //   <button class="attack!" onclick="location.href = './battle.html';">Attack Mode</button>
    
    displayPokemon(allPoke)
    vs.removeAttribute('hidden')
    bh.removeAttribute('hidden')
    rh.removeAttribute('hidden')
    hiddenChars.setAttribute('hidden', 'hidden')
    
    yourPoke.appendChild(pokeCard)
    pokeCard.querySelector('img').addEventListener('click', ()=> {
        getBack(poke)
    })
    getRandomPokemon(wild)
    rh.setAttribute('hidden', 'hidden')
    hiddenPokeball.removeAttribute('hidden')
}
function getRandomPokemon(ra){
// RA === RANDOM :)
    battler.push(ra)
   

let pokeCard = document.createElement('div')
    pokeCard.classList.add('poke-card')
    
    
    pokeCard.innerHTML = `
    <div class="pokemon-outline"> 
    <img alt='pokemon cover image'src='${ra.imgURL}' class="pokemon-image"/>
    <h4 class='stats'>${ra.name}'s Stats</h4>
    <p> <span class='opp-health'>${ra.health} </span><span>HP</span> </p>
    <p>Attack Power</p>
  <p class='opp-attack'>${ra.attack}</p>
  </div> 
    `

    compPoke.appendChild(pokeCard)

}


function getBack(poke){
    yourPoke.innerHTML = ``
    compPoke.innerHTML = ``
    let index = playersPoke.findIndex(mans => mans.name === poke.name)
    allPoke.push(playersPoke[index])
    playersPoke.splice(index, 1)
    battler.splice(index, 1)
    displayPokemon(allPoke)
    rh.setAttribute('hidden', 'hidden')
    bh.setAttribute('hidden', 'hidden')
    vs.setAttribute('hidden', 'hidden')
    hiddenChars.removeAttribute('hidden')
    //i could add more function ality but i can only have one pokemon for now
}
function winner(){
    win.play()
    character.textContent = `Winner Winner Chicken Dinner`
    bh.setAttribute('hidden', 'hidden')
    vs.setAttribute('hidden', 'hidden')
    rh.removeAttribute('hidden')
    form.remove()
    let myHealth = document.querySelector('.pokemon-health')
    myHealth.textContent = 100
        if (wins === 1){
        return one.style.opacity = "0.4"
      }  else if(wins === 2){
          return two.style.opacity = "0.4"
      } else if (wins === 3){
          return three.style.opacity = "0.4"
      } else if(wins === 4){
          four.style.opacity = "0.4"
         return  alert("you've finished the elite four!")
      }

}

function displayPokemon(arr){
    pokemonContainer.innerHTML = ``
    yourPoke.innerHTML = ``
        for(let i= 0; arr.length > i; i++){
            createPokemonCard(arr[i]) 
        }
}


function battleMode(){
    compDiv.setAttribute('hidden', 'hidden')

    let oppHealth = document.querySelector('.opp-health')
    let oppAttack = document.querySelector('.opp-attack')
    let myHealth = document.querySelector('.pokemon-health')
    let myAttack = document.querySelector('.pokemon-attack')
    let battleButton = document.getElementById('battles')
    let pokeCard = document.querySelector('.poke-card')
    

    let userAttack = battler[0].health -= playersPoke[0].attack
    oppHealth.textContent = userAttack
    // updates the health
    // let compAttack = playersPoke[0].health -= battler[0].attack
    // myHealth.textContent = compAttack
        if (battler[0].health <= 0 ){
        compPoke.innerHTML = ``
        wins++
        console.log(wins)
        winner()
        } else {
        compDiv.removeAttribute('hidden', 'hidden')
        bh.setAttribute('hidden', 'hidden')
    }
}
    function compBattle(){
        let oppHealth = document.querySelector('.opp-health')
        let myHealth = document.querySelector('.pokemon-health')
        
        let compAttack = playersPoke[0].health -= battler[0].attack
        myHealth.textContent = compAttack
        
       
        if (compAttack <= 0){
           yourPoke.innerHTML = ``
           vs.setAttribute('hidden', 'hidden')
           bh.setAttribute('hidden', 'hidden')
           compDiv.setAttribute('hidden', 'hidden')
           rh.removeAttribute('hidden')


        } else{
        // if(playersPoke[0].heatlh <= 0 && battler[0].health > playersPoke[0].health){
        //     yourPoke.innerHTML = ``
        //     vs.setAttribute('hidden', 'hidden')
        //     bh.setAttribute('hidden', 'hidden')
        // } else {
            bh.removeAttribute('hidden', 'hidden')
            compDiv.setAttribute('hidden', 'hidden')
            
        }
    }

    
    
form.addEventListener('submit', submitHandler)
getAllPokemon()

// updatePokemon()