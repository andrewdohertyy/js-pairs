const cards = document.querySelectorAll(".container__card");
const container = document.querySelector(".container");
const again = document.querySelector(".end__play-again");
const endGame = document.querySelector(".end");
const headingContainer = document.querySelector(".heading")
const startButton = document.querySelector(".heading__button");
const scoreTotal = document.querySelector(".heading__score");
const timeDisplay = document.querySelector(".heading__timer");
const timeStamp = document.querySelector('.end__timestamp')

let first;
let second;
let timer;
let matchCounter = 0;

//a timer for when the start game is clicked
const startTimer = () => {
    let sec = 0;
    timer = setInterval(() => {
        timeDisplay.innerHTML =  sec;
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

const startAgain = () => {
    location.reload();
}


//event listeners for when the game starts or starts again
again.addEventListener("click", startAgain);
startButton.addEventListener("click", randomStart);


//loops through the cards array to find matches.
cards.forEach((card) => {
    card.addEventListener('click', () => {
        if (!first && !second) {
            first = card;
            card.classList.add('show');
        } else if (first && !second) {
            second = card;
            card.classList.add('show');
        }
        if (first.innerHTML === second.innerHTML) {
            first.style.pointerEvents = 'none';
            second.style.pointerEvents = 'none';
            first = undefined;
            second = undefined;
            matchCounter ++;
        }

        if (matchCounter >= 12) {
            container.classList.add('display');
            endGame.classList.remove('display');
            timeDisplay.classList.add('display');
            headingContainer.classList.add('display');
            timeStamp.innerHTML = `You completed the puzzle in ${timeDisplay.innerHTML} seconds! Well done!`
        }  else {
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
    })
});