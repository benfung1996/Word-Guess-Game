var word_list = ["Corgi", "French Bull", "Husky", "Beagle", "German Shepherd"]

var wins = 0;
var guesses_left = 5;

var random_word = [];
var blank = [];
var word_solved = [];
var current_word = [];
var remaining_guesses = [];
var letters_guessed = [];





function start() {
    random_word = words[Math.floor(Math.random() * words.length)];
    
    for (var i = 0; i < random_word.length; i++) {
        if (random_word[i] === " ") {
            blank.push(" ")
        } 
        else {
            blank.push("_")
        }
    }
    updateDisplay();
};

function reset() {
    if (word_solved.length === word_list.length) {
        word_solved = []
        wins = 0
    }
    else {
        document.getElementById("welcome");
        random_word = word_list[Math.floor(Math.random() * word_list.length)];
        console.log(random_word)
        if (word_solved.includes(random_word) === true) {
            reset();
        }

        current_word = [];
        letters_guessed_text = [];

        for (var i = 0; i < random_word.length; i++) {
            if (random_word[i] === " ") {
                blank.push(" ")
            } 
            else {
                blank.push("_")
            }
        }
        updateDisplay();
    }
};

function updateDisplay() {
  document.getElementById("wins-text").innerHTML = wins;
  document.getElementById("current_word").innerHTML = current-word.join("");
  document.getElementById("remaining_guesses").innerHTML = remaining-guesses;
  document.getElementById("letters_guessed").innerHTML = letters-guessed.join("");
};

document.onkeydown = function(event) {

    if (isLetter(event.key)) {
        checkForLetter(event.key.toLocaleUpperCase());
    }

    document.getElementById("welcome");
};


function checkForLetter(letter) {
    var foundLetter = false;
  
    for (var i=0; i < random_word.length; i++) {
      if (letter === random_word[i]) {
        current_word[i] = letter
        foundLetter = true
       
        if (current_word.join("") === random_word) {
          wins++
          word_solved.push(random_word)
          console.log(word_solved)
          updateDisplay();
        }
      }
    }

    if (foundLetter === false) {
    
      if (letters_guessed.includes(letter) === false) { 
        letters_guessed.push(letter)
        remaining_guesses--
      }

      if (remaining_guesses === 0) {
        word_solved.push(random_word);
        console.log(word_solved)
        current_word = random_word.split();
      }
    }
    updateDisplay();
  };
  
  start();