const suits = ["C", "D", "S", "H"];
const colors = { "C": "black", "S": "black", "D": "red", "H": "red" };
let table = document.querySelector("#table");
let deck = [];
let piles = [[], [], [], [], [], [], []];



function start() {
    createDeck();

    deck.shuffle();

    giveCards();

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

    this.posX = 16,
    this.posY = 40,
    this.zIndex = 2,

    this.setzIndex = function(zidx){
        this.zIndex = zidx;
        this.html.style.zIndex = 2+zidx; 
    },

    this.position = function(x = this.posX, y = this.posY) {
        this.posX = x;
        this.posY = y;
        this.html.style.top = y + "px";
        this.html.style.left = x + "px";
    }

    this.placeImg = function() {
        if(this.fliped) {
            this.html.querySelector("img").src = `./imgs/cards/${this.number + this.suit}.svg`;
        }
        else this.html.querySelector("img").src = `./imgs/cards/02.png`;
    },

    this.flip = function () {
        this.fliped = !this.fliped;
        this.placeImg();
    }

    this.position();
    this.placeImg();
}
//adiciona a carta ao HTML
function createCardOnHTML(id) {
    let carddiv = document.createElement("div");
    let cardimg = document.createElement("img");
        carddiv.setAttribute("class","card");
        carddiv.setAttribute("id", id);
        carddiv.appendChild(cardimg);
        table.append(carddiv);
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
        
        for(j = 0;j < piles[i][0].length;j++){
            console.log(j, j < piles[i][0].length)
            piles[i][0][j].position((16+(34+110)*i), (260+j*37));
            piles[i][0][j].setzIndex(2+j);
        }
    }
}
// Script mover carta pela mesa
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    var startZIndex = 2;
    elmnt.onmousedown = dragMouseDown;
    function dragMouseDown(e) {
        e = e || window.event;
        // get the mouse cursor position at startup:
        startZIndex = elmnt.style.zIndex;
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
        elmnt.style.zIndex = "30";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        
        elmnt.style.zIndex = startZIndex;
        console.log(elmnt)
        document.onmouseup = null;
        document.onmousemove = null;

    }
}

start();