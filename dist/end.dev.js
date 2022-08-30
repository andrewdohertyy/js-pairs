"use strict";

var username = document.getElementById('end__username');
var saveScoreButton = document.getElementById('saveScoreBtn');
var mostRecentScore = localStorage.getItem('mostRecentScore');
username.addEventListener('keyup', function () {
  saveScoreButton.disabled = !username.value;
});

saveHighScore = function saveHighScore(event) {
  endGame.preventDefault();
};