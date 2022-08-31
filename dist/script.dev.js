"use strict";

var cards = document.querySelectorAll(".container__card");
var container = document.querySelector(".container");
var again = document.querySelector(".end__play-again");
var endGame = document.querySelector(".end");
var headingContainer = document.querySelector(".heading");
var startButton = document.querySelector(".heading__button");
var scoreTotal = document.querySelector(".heading__score");
var timeDisplay = document.querySelector(".heading__timer");
var timeStamp = document.querySelector('.end__timestamp');
var easterEggButton = document.querySelector('.heading__easter-egg');
var first;
var second;
var timer;
var matchCounter = 0; //a timer for when the start game is clicked

var startTimer = function startTimer() {
  var sec = 0;
  timer = setInterval(function () {
    timeDisplay.innerHTML = sec;
    sec++;
  }, 1000);
}; //when the start button is clicked it will hide and generate a random order of the array


var randomStart = function randomStart() {
  container.classList.remove('display');
  startButton.classList.add('display');
  endGame.classList.add('display');
  timeDisplay.classList.remove('display');
  cards.forEach(function (card) {
    var randomNum = Math.floor(Math.random() * 24);
    card.style.order = randomNum;
    startTimer();
  });
}; //restarts game


var startAgain = function startAgain() {
  window.location = window.location;
}; //when two cards match when clicked one after the other this function will update the match counter


var cardsMatch = function cardsMatch() {
  if (first.innerHTML === second.innerHTML) {
    first = undefined;
    second = undefined;
    matchCounter++;
    scoreTotal.innerHTML = "Pairs made: " + matchCounter;
  }
}; //when all matches have been achieved this function adds the end display 


var allMatches = function allMatches() {
  container.classList.add('display');
  endGame.classList.remove('display');
  timeDisplay.classList.add('display');
  headingContainer.classList.add('display');
  timeStamp.innerHTML = "You completed the puzzle in ".concat(timeDisplay.innerHTML, " seconds! Well done!");
}; // if all 12 matches havent been complete this function sets them back to their original state


var notAllMatches = function notAllMatches() {
  first.classList.add('hide');
  second.classList.add('hide');
  setTimeout(function () {
    first.classList.remove('show');
    second.classList.remove('show');
    first.classList.remove('hide');
    second.classList.remove('hide');
    first = undefined;
    second = undefined;
  }, 500);
}; //if you wanted to get a head start 


var helpMe = function helpMe() {
  cards.forEach(function (card) {
    if (card.classList != 'match') {
      card.classList.add('show');
      setTimeout(function () {
        if (card.classList != 'match') {
          card.classList.remove('show');
        }
      }, 2500);
    }
  });
}; //loops through the cards array to find matches.


cards.forEach(function (card) {
  card.addEventListener('click', function () {
    if (!first && !second) {
      first = card;
      card.classList.add('show');
    } else if (first && !second) {
      second = card;
      card.classList.add('show');
    }

    cardsMatch();

    if (matchCounter >= 12) {
      allMatches();
    } else {
      notAllMatches();
    }
  });
}); //event listeners for when the game starts, starts again and a surprise 

again.addEventListener("click", startAgain);
startButton.addEventListener("click", randomStart);
easterEggButton.addEventListener("click", helpMe);