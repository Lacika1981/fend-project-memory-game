/*
 * Create a list that holds all of your cards
 */

const parentOfCards = document.getElementById('deck');
const cards = document.getElementsByClassName('card');
const counter = document.getElementsByClassName('moves');
const result = document.getElementsByClassName('result');
const reset = document.getElementsByClassName('restart');
const stars = document.getElementsByClassName('stars');
let cardsArray = Array.from(cards);
console.log(cardsArray);

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

cardsArray = shuffle(cardsArray);
cardsArray.map(e => parentOfCards.appendChild(e));

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

listOfOpenCards = [];
numberOfOpenCards = 16;
counter[0].textContent = 0;
let prevE = 0;

const showStars = (e) => {
    console.log(prevE);
    let nextE = e;
    if (prevE !== nextE) {
        prevE = nextE;
        stars[0].innerHTML = ''; //https://stackoverflow.com/questions/18795028/javascript-remove-li-without-removing-ul
        console.log(`prevE: ${prevE}, nextE: ${nextE}`);
        for (let i = 1; i <= nextE; i++) {
            const starLi = document.createElement('li');
            const starI = document.createElement('i');
            starI.setAttribute('class', 'fa fa-star');
            starLi.appendChild(starI);
            stars[0].appendChild(starLi);
        }
    }
}

showStars(3);

const resetGame = () => {
    numberOfOpenCards = 16;
    counter[0].textContent = 0;
    cardsArray.forEach(e => e.classList.remove('show', 'open', 'match'));
    listOfOpenCards.length = 0;
    cardsArray = shuffle(cardsArray);
    cardsArray.map(e => parentOfCards.appendChild(e));
    result[0].classList.add('hidden');
    showStars(3);
}

const cardLeftToOpen = () => {
    if (numberOfOpenCards === 0) {
        result[0]
            .classList
            .remove('hidden');
    }
}

const updateMovesCounter = () => {
    counter[0].textContent >= 36
        ? showStars(1)
        : counter[0].textContent >= 28 ? showStars(2) : showStars(3);
    if (numberOfOpenCards !== 0) {
        counter[0].textContent++;
    }
}

const cardsNotMatched = () => {
    setTimeout(() => {
        listOfOpenCards.forEach((e) => e.classList.remove('show', 'open')); // it prevents the event when user clciks too fast and put more than two card into the 'listOfOpenCards' Array
        listOfOpenCards.length = 0;
    }, 250);

}

const lockMatchedCards = (card1, card2) => {
    numberOfOpenCards -= 2;
    cardLeftToOpen();
    listOfOpenCards.forEach((e) => e.classList.add('match'));
    listOfOpenCards.length = 0;
}

const checkMatch = () => {
    if (listOfOpenCards[0].firstElementChild.classList[1] === listOfOpenCards[1].firstElementChild.classList[1]) {
        lockMatchedCards(listOfOpenCards[0], listOfOpenCards[1])
    } else {
        cardsNotMatched();
    }
}

const showCard = (e) => {
    if (e.target.className !== 'card open show') { //prevent to click the same element twice - simple but works
        updateMovesCounter();
        listOfOpenCards.push(e.target);
        e.target.classList.add('open', 'show');
        console.log(listOfOpenCards.length);
        if (listOfOpenCards.length === 2) {
            checkMatch();
        }
    }
}

for (i = 0; i < cardsArray.length; i++) {
    cardsArray[i].addEventListener("click", showCard);
}

reset[0].addEventListener('click', resetGame);
