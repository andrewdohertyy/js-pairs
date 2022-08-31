const cards = document.querySelectorAll(".container__card");
const container = document.querySelector(".container");
const again = document.querySelector(".end__play-again");
const endGame = document.querySelector(".end");
const headingContainer = document.querySelector(".heading")
const startButton = document.querySelector(".heading__button");
const scoreTotal = document.querySelector(".heading__score");
const timeDisplay = document.querySelector(".heading__timer");
const timeStamp = document.querySelector('.end__timestamp');
const easterEggButton = document.querySelector('.heading__easter-egg');

let first;
let second;
let timer;
let matchCounter = 0;



//a timer for when the start game is clicked
const startTimer = () => {
    let sec = 0;
    timer = setInterval(() => {
        timeDisplay.innerHTML = sec;
        sec ++
    }, 1000)
}

//when the start button is clicked it will hide and generate a random order of the array
const randomStart = () => {
    container.classList.remove('display')
    startButton.classList.add('display')
    endGame.classList.add('display');
    timeDisplay.classList.remove('display')

    cards.forEach((card) => {
    let randomNum = Math.floor(Math.random() * 24);        
    card.style.order = randomNum;
    startTimer();
})}

//restarts game
const startAgain = () => {
    window.location = window.location
} 

//when two cards match when clicked one after the other this function will update the match counter
const cardsMatch = () => {
    if (first.innerHTML === second.innerHTML) {
        first = undefined;
        second = undefined;
        matchCounter ++;
        scoreTotal.innerHTML = "Pairs made: " + matchCounter;
    }
}

//when all matches have been achieved this function adds the end display 
const allMatches = () => {
    container.classList.add('display');
    endGame.classList.remove('display');
    timeDisplay.classList.add('display');
    headingContainer.classList.add('display');
    timeStamp.innerHTML = `You completed the puzzle in ${timeDisplay.innerHTML} seconds! Well done!`
}

// if all 12 matches havent been complete this function sets them back to their original state
const notAllMatches = () => {
    first.classList.add('hide');
    second.classList.add('hide');
    setTimeout(() => {
        first.classList.remove('show');
        second.classList.remove('show');
        first.classList.remove('hide');
        second.classList.remove('hide');
        first = undefined;
        second = undefined;
    }, 500);
}


//if you wanted to get a head start 
const helpMe = () => {
            cards.forEach((card) => {
            if (card.classList != 'match') {
                card.classList.add('show')
                setTimeout(() => {
                    if (card.classList != 'match'){
                        card.classList.remove('show');
                }},3000)
            }
        })
    }

//loops through the cards array to find matches.
cards.forEach((card) => {
    card.addEventListener('click', () => {
        if (!first && !second) {
            first = card;
            card.classList.add('show');
        } else if (first && !second) {
            second = card;
            card.classList.add('show');
        }   cardsMatch();
        if (matchCounter >= 12) {
            allMatches();
        } else {
            notAllMatches();
        }
    })
});


//event listeners for when the game starts, starts again and a surprise 
again.addEventListener("click", startAgain);
startButton.addEventListener("click", randomStart);
easterEggButton.addEventListener("click", helpMe);