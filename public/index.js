
const form = document.querySelector('form')
const pokemonContainer = document.querySelector('#pokemon-container')
const yourPoke = document.getElementById('your-pokemon')
const compPoke = document.getElementById('comp-pokemon')
const win = document.getElementById('win')
win.volume = .1
const battleSection = document.getElementById('battle-section')
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

function reset() {
    yourPoke.innerHTML = ``
    compPoke.innerHTML = ``
    battler = []
    playersPoke = []
    myTables()
    displayPokemon(allPoke)
}

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
    pokemonContainer.appendChild(form)
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
    <p>  <span class='pokemon-health'>${poke.health} </span><span>HP</span> </p>
    <p>Attack Power</p>
    <p class='pokemon-attack'> ${poke.attack} </p>
    <button id='refreshes' class="hidden" onclick="reset()"> Go Again</button>
    <button id='battles' class="battle" onclick="battleMode()"> Battle Mode </button>
    </div> 
    `
    //   <button class="attack!" onclick="location.href = './battle.html';">Attack Mode</button>
    
    displayPokemon(allPoke)
    
    yourPoke.appendChild(pokeCard)
    pokeCard.querySelector('img').addEventListener('click', ()=> {
        getBack(poke)
    })
    
    
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
    <p>  <span class='opp-health'>${ra.health} </span><span>HP</span> </p>
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
    //i could add more function ality but i can only have one pokemon for now
}
function winner(){
   
    win.play()
}

function displayPokemon(arr){
    pokemonContainer.innerHTML = ``
    yourPoke.innerHTML = ``
        for(let i= 0; arr.length > i; i++){
            createPokemonCard(arr[i]) 
        }
}


function battleMode(){
    let oppHealth = document.querySelector('.opp-health')
    let oppAttack = document.querySelector('.opp-attack')
    let myHealth = document.querySelector('.pokemon-health')
    let myAttack = document.querySelector('.pokemon-attack')
    let battleButton = document.getElementById('battles')
    let pokeCard = document.querySelector('.poke-card')


    let userAttack = battler[0].health -= playersPoke[0].attack
    oppHealth.textContent = userAttack
    // updates the health
    let compAttack = playersPoke[0].health -= battler[0].attack
    myHealth.textContent = compAttack

    if(compAttack <= 0 && compAttack < userAttack){
        yourPoke.innerHTML = ``
    } else if (userAttack <= 0 && compAttack > userAttack){
        compPoke.innerHTML = ``
        winner()
        battleButton.remove()
        addEventListener
    }
    
}

    
    
   


    //     // console.log(`${computer[0].health}`) working
    //     let compAttack = yourPokemon[0].health -= computer[0].attack
    //     // compAttack = `${yourPokemon[0].health}`
    //     // userAttack = `${computer[0].health}`
    //     // console.log(`${yourPokemon[0].health}`)
    //     // health.textcontent = ${dummyData[0].health} soo it can be displayed :)
    //     //vice versa
    //     for (let i = 0; battles.length > i; i++){
    //         if (battles[i] <= 0 && yourPokemon[0].health > computer[0].health){
    //              return yourPokemon
    //         } else if(battles[i] <= 0 && `${yourPokemon[0].health}` < `${computer[0].health}`){ 
    //             return computer
    //         } 
    //     }
    // }


form.addEventListener('submit', submitHandler)
getAllPokemon()

// updatePokemon()