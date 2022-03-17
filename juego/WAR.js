let deckId = ' '
let cardsRemaining = 0;
let cartasUno = [];
let cartasDos = [];



const urlSearchParams = new URLSearchParams(window.location.search);
const jugadores = Object.fromEntries(urlSearchParams.entries());
document.getElementById('nombrejugador1').innerText = jugadores.jugador1;
document.getElementById('nombrejugador2').innerText = jugadores.jugador2;




fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    .then(res=> res.json())
    .then (data => {
        deckId = data.deck_id
       
    })
    .catch(err => {
        console.log(`error ${err}`)
    });


document.querySelector('button').addEventListener('click', getFetch)



document.addEventListener("keydown",event => {

if ( event.keyCode == 32){
    getFetch();
}
return
;
});




function hayGuerra(){

    document.querySelector('h3').innerText = "GUERRA!"
    document.querySelector("#player1war").style.visibility = "visible";
    document.querySelector("#player2war").style.visibility = "visible";
    
}

function ganaUno () {
    document.querySelector('h3').innerText = `${jugadores.jugador1} gana la mano`
    document.querySelector('#punt1').innerText = punt1+1;
    punt1++
    document.querySelector("#player1war").style.visibility = "hidden";
    document.querySelector("#player2war").style.visibility = "hidden";
   
}

let punt1 = 0;
let punt2 = 0;


function ganaDos () {

    document.querySelector('h3').innerText = `${jugadores.jugador2} gana la mano`
    document.querySelector('#punt2').innerText = Number(punt2+1)
    punt2++
    document.querySelector("#player1war").style.visibility = "hidden";
    document.querySelector("#player2war").style.visibility = "hidden";
    

}

function middleGame () {

    let val1 = cartasUno[0].value;
    let val2 = cartasDos[0].value;
    document.querySelector("#player1").src = cartasUno[0].image
    document.querySelector("#player2").src = cartasDos[0].image
    if (val1>val2){ 
        ganaUno()
        cartasUno.push(cartasUno[0],cartasDos[0])
        
    } else if (val1<val2) {
        ganaDos()
        cartasDos.push(cartasUno[0],cartasDos[0])
       
   }   else {
    return hayGuerra()


}
cartasUno.shift();
cartasDos.shift();
}

function getFetch(){

    const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`;
  


fetch(url)
    .then (res => res.json())
    .then (data => {
        console.log(data)
        cardsRemaining = data.remaining;
        let val1 = Number(cardValue( data.cards[0].value ))
        let val2 = Number (cardValue( data.cards[1].value ))
        document.querySelector("#player1").src = data.cards[0].image
        document.querySelector("#player2").src = data.cards[1].image
       
        
        if (val1>val2){ 
             ganaUno()
             cartasUno.push(data.cards[0],data.cards[1])
         } else if (val1<val2) {
             ganaDos()
             cartasDos.push(data.cards[0],data.cards[1])
        }   else {
         return hayGuerra()
}
})
    .catch(err => {
        console.log('error${err}')
        return middleGame();
    });
}

function cardValue(val){

if (val === "ACE") {

    return 14;
} else if (val === "KING") {
    return 13;
} else if (val === "QUEEN"){
    return 12;
} else if (val ==="JACK"){
    return 11;
} else {
    return val;
}
} 


function endGame() {

if (punt1 > punt2) {

    document.querySelector('h3').innerText = `Termino el juego, GANO ${jugadores.jugador1}`

} else {
    document.querySelector('h3').innerText = `Termino el juego, GANO ${jugadores.jugador2}`
} 
}



