const suits = ["C", "D", "S", "H"];
const colors = { "C": "black", "S": "black", "D": "red", "H": "red" };
let table = document.querySelector("#table");
let deck = [];
let piles = [[], [], [], [], [], [], []];

function start() {
    createDeck();

    //deck.shuffle();

    //giveCards();

    console.log(deck, piles);

}

// Construction function das cartas
function Card(number, suit) {
    this.fliped = true,
    this.id = number + suit,
    createCardOnHTML(this.id);
    this.html = document.getElementById(`${number + suit}`),
    this.number = number,
    this.suit = suit,
    this.color = colors[suit],
    this.back = `./imgs/cards/02.png`,
    this.front = `./imgs/cards/${this.number + this.suit}.svg`,
    this.flip = function () {
        this.fliped = !this.fliped;
        if(this.fliped) {
            this.html.querySelector("img").src = `./imgs/cards/02.png`;
        }
        else this.html.querySelector("img").src = `./imgs/cards/${this.number + this.suit}.svg`;
    }
    this.flip();
}
//adiciona a carta ao HTML
function createCardOnHTML(id) {
    table.innerHTML += `<div class="card" id="${id}"><img src="" alt="${id}"></div>`
}

// Cria o baralho
function createDeck() {
    // Loop entre os nipes e os numeros e criação das cartao com a construction function
    for (s = 0; s < suits.length; s++) {
        for (n = 1; n <= 13; n++) {

            deck.push(new Card(n, suits[s]));
        }
    }
    // Habilitar mover a carta na mesa
    var elements = document.querySelectorAll('.card');

    for (i = 0; i < elements.length; ++i) {
        dragElement(elements[i]);
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
    for (i = 0; i < piles.length; i++) {
        piles[i].push(deck.splice(1, i + 1));
    }
}
// Script mover carta pela mesa
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

    elmnt.onmousedown = dragMouseDown;


    function dragMouseDown(e) {
        e = e || window.event;
        
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

start();