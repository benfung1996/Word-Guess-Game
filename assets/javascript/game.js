// create words to guess
var possibleWords = ["Corgi", "French Bull", "Husky", "Beagle", "German Shepherd"];

// create variables to store input
var guessedLetters = [];
var guessingWord = [];
var usedGuessingwWords = [];
var wordToMatch;
var numGuess = 7;
var wins = 0;

// when pause is ture, function will stop displaying letter pressed by user
var pause = false; 


// create function to start game
function initializeGame() {

  // choice random word from word list and turn to uppercase
  wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
 
  // set a for loop to replace each letter of the selected word with " " or " _ "
  for (var i=0; i < wordToMatch.length; i++){
  
    if (wordToMatch[i] === " ") {
      guessingWord.push(" ")
    } 
    else {
      guessingWord.push(" _ ");
    }
  }

  // refresh scores
  updateDisplay();
};

// function to reset game 
function resetGame() {

  // if all words from list have been guessed, reset data after 3 second
  if (usedGuessingwWords.length === possibleWords.length) {
    usedGuessingwWords = []
    wins = 0
    setTimeout(resetGame, 3000); 
  }

  // if not all words have been guessed, continue to pick new word and console.log it
  else {
    pause = false;
    wordToMatch = possibleWords[Math.floor(Math.random() * possibleWords.length)].toUpperCase();
    console.log(wordToMatch)

    // if the chosen word has been guessed, repeat reset function for another word
    if (usedGuessingwWords.includes(wordToMatch) === true) {
      resetGame();
    }
    
    // reset below variables for new word
    numGuess = 7;
    guessedLetters = [];
    guessingWord = [];


    // set a for loop to replace each letter of the selected word with " " or " _ "
    for (var i=0; i < wordToMatch.length; i++){
  
      if (wordToMatch[i] === " ") {
        guessingWord.push(" ")
      } 
      else {
        guessingWord.push("_");
      }
    }

    // refresh scores 
    updateDisplay();
  }
};

// function to refresh variables from html text
function updateDisplay () {
  document.getElementById("totalWins").innerText = wins;
  // .join("") allow letter to connect wihtout "," in between
  document.getElementById("currentWord").innerText = guessingWord.join("");
  document.getElementById("remainingGuesses").innerText = numGuess;
  document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ");
};

// when user pressed a key, function will trigger event
document.onkeydown = function(event) {

  // if user entered a letter
  if (isLetter(event.key) && pause === false) {

  // set letter to uppercase
  checkForLetter(event.key.toUpperCase());
  }
};

// function to check if the pressed key is a letter from a - z
var isLetter = function(ch){
  return typeof ch === "string" && ch.length === 1
  && (ch >= "a" && ch <= "z" || ch >= "A" && ch <= "Z");
};

//function that checks if letter is in the guessing word
function checkForLetter(letter) {
  var foundLetter = false;

// check if letter pressed matches with selected word
  for (var i=0; i < wordToMatch.length; i++) {
    if (letter === wordToMatch[i]) {
      guessingWord[i] = letter
      foundLetter = true
      // if all letters are guessed correctly, increase win and add it to guessed list
      if (guessingWord.join("") === wordToMatch) {
        wins++
        usedGuessingwWords.push(wordToMatch)
        console.log(usedGuessingwWords)
        pause = true;
        updateDisplay();
        setTimeout(resetGame, 2000);
      }
    }
  }

  if (foundLetter === false) {
    // Check if inccorrect guess is already on the list
    if (guessedLetters.includes(letter) === false) {
      // Add incorrect letter to guessed letter list
      guessedLetters.push(letter)
      // Decrease the number of remaining guesses
      numGuess--
    }
    if (numGuess === 0) {
      // Add word to usedGuessingWords array to not be repeated
      usedGuessingwWords.push(wordToMatch);
      console.log(usedGuessingwWords)
      // Display word before reseting game
      guessingWord = wordToMatch.split();
      pause = true;
      setTimeout(resetGame, 2000);
    }
  }
  updateDisplay();
};

initializeGame();
