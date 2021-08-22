
// baralho completo =>
const starterDeck = ["AC","2C","3C","4C","5C","6C","7C","8C","9C","1C","JC","QC","KC","AD","2D","3D","4D","5D","6D","7D","8D","9D","1D","JD","QD","KD","AH","2H","3H","4H","5H","6H","7H","8H","9H","1H","JH","QH","KH","AS","2S","3S","4S","5S","6S","7S","8S","9S","1S","JS","QS","KS",];

let deck = [];
let piles = [[],[],[],[],[],[],[]] //variavel global


function startGame() {
    piles = [[],[],[],[],[],[],[]] //adicionar os 7 index e resetar toda vez que reiniciar
    deck = starterDeck.slice(); //clonar deck principal
    for(i = 1;i <= 7;i++){  //loopar entre os index dos piles
        for(i2 = 1;i2 <= i;i2++) {   //loop ate adicionar quantidade igual de cartas ao index
            piles[i-1].push((deck.splice(Math.floor(Math.random()*deck.length),1))[0])
        }
    }
}

startGame()