const suits = ["C","D","S","H"];
const colors = {"C":"black","S":"black","D":"red","H":"red"};
let deck = [];
let piles = [[],[],[],[],[],[],[]];

// Construction function das cartas
function Card(number,suit) {
    this.value = number,
    this.suit = suit,
    this.color = colors[suit],
    this.fliped = false,
    this.back = `./imgs/cards/02.png`,
    this.front = `./imgs/cards/${number + suit}.svg`,
    this.flip = function () {
        this.fliped = !this.fliped;
    }
}

// Cria o baralho
function createDeck() {
    // Loop entre os nipes e os numeros e criação das cartao com a construction function
    for(s = 0;s < suits.length;s++){  
        for(n = 1;n <= 13;n++){

            deck.push(new Card(n,suits[s]));
        }
    }
}

// Embaralhar arrays | Array.suffle()
Array.prototype.shuffle = function () {
        // Loop em todos os elementos
        for (let i = this.length - 1; i > 0; i--) {
        // Escolhendo elemento aleatório
        const j = Math.floor(Math.random() * (i + 1));
        // Reposicionando elemento
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}

// Da as cartas para as fileiras e sobra o deck
function giveCards() {
    for(i = 0;i < piles.length;i++){
        piles[i].push(deck.splice(1, i+1));
    }
}



createDeck();
deck.shuffle();
giveCards()

console.log(deck,piles);
