/*
 * Create a list that holds all of your cards
 */


 const parentOfCards = document.getElementById('deck');
 const cards = document.getElementsByClassName('card');
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
    var currentIndex = array.length, temporaryValue, randomIndex;

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

 function checkMatch(){
     console.log(listOfOpenCards[0].firstElementChild.classList[1], listOfOpenCards[1].firstElementChild.classList[1]);
     if (listOfOpenCards[0].firstElementChild.classList[1] === listOfOpenCards[1].firstElementChild.classList[1]){
        listOfOpenCards[0].className += ' match';
        listOfOpenCards[1].className += ' match';
        listOfOpenCards.length = 0;
     }
 }


 function showCard(e){
     console.log(e);
    listOfOpenCards.push(e.target);
    e.target.className += ' open show';
    console.log(listOfOpenCards.length);
    if (listOfOpenCards.length === 2){
        checkMatch();
    }
 }

for (i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", showCard);
}
