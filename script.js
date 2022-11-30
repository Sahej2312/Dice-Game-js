'use strict';
//selecting elemnts
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePLayer, playing;
const initialization = function () {
  scores = [0, 0];
  currentScore = 0;
  activePLayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  // diceEl.classList.remove('hidden');
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initialization();

const switchPlayer = function () {
  document.getElementById(`current--${activePLayer}`).textContent = 0;
  activePLayer = activePLayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //toggle will add the class if its not there and if it is there it will remove the class
};
//rolling dice funtionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // console.log(dice);
    //2.display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.check for rolled 1,
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePLayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.add currnt score to active player's score
    scores[activePLayer] += currentScore;
    document.getElementById(`score--${activePLayer}`).textContent =
      scores[activePLayer];
    //2.check if score>=100
    //finish game
    if (scores[activePLayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePLayer}`)
        .classList.remove('player--active');
    }
    //switch player
    else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);
