/*
GAME FUNCTION
- PlAYER MUST GUESS A NUMBER BETWEEN A MIN AND MAX 
- PLAYER GETS A CERTAIN NUMBER OF GUESSES
- NOTIFY PLAYER OF GUESSES LEFT
- NOTIFY THE PLAYER OF THE CORRECT ANSWER IF PLAYER LOSES
- LET PLAYER CHOOSE TO PLAY AGAIN
*/

// Game values
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random()*(max-min+1)+min),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// PLay again event listener

game.addEventListener('mousedown', function(e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
});


// Listen for guess
guessBtn.addEventListener('click', function(){
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, 'red');
  }

  // Check if won
  if (guess === winningNum) {
    gameOver(true, `${guess} is correct, YOU WIN!`);
  } else {
    // reduce guess
    guessesLeft -= 1;
    // set message
    gameOver(false, `${guess} is wrong, you have ${guessesLeft} guesses left!`, guessesLeft)
    // change border color
  }
});

// game over
function gameOver(won, msg, left) {
  let color;

  if(won === true){
    color = 'green';
    guessInput.disabled=true;
    guessInput.style.borderColor = color;
    setMessage(msg, color);
    guessBtn.value = 'Play Again';
    guessBtn.className += 'play-again'
  } else {
    color = 'red';
    guessInput.value = '';
    // disable input
    guessInput.disabled = false;
    guessInput.style.borderColor = color;
    // set message
    setMessage(msg, color);
    if(left===0){
      guessInput.disabled=true;
      setMessage(`${msg}. The correct guess is ${winningNum}. Try again!`);
      // play again 
      guessBtn.value = 'Play Again';
      guessBtn.className += 'play-again'
    }
  }

  
}

// Set message 
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// random generator
