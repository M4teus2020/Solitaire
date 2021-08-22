const numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
const suits = ["C","D","H","S"];
const colors = {"C":"black","S":"black","D":"red","H":"red"};

function CreateCard(number,suit) {
    this.value = number,
    this.suit = suit,
    this.color = colors[suit]
}

let AC = new CreateCard(numbers[3],suits[0])
function CreateDeck() {
    suits.forEach()
}