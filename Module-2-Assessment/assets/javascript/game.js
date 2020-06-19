// Variables
var numWins = 0;
var currentWord = "";
var currentGuess = "";
var guessesRemaining = 15;
var lettersGuessed = [];
var lastAnswer = "MLB";
const wordList = ["fastball","curveball","slider"];

// References
var winsRef = document.querySelector('#numWins');
var wordRef = document.querySelector('#currWord');
var guessesRemainingRef = document.querySelector('#guesses');
var lettersRef = document.querySelector('#letters');
var answerRef = document.querySelector('#answer');

// Functions
const encrypt = function(word) {
    var encryptedWord = "";
    for (let i=0; i<word.length; i++) {
        encryptedWord += "_ ";
    }
    return encryptedWord;
}
String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const guessLetter = function(event) {
    const key = event.key;

    // A
    if (key === 'a' && !lettersGuessed.includes('a') && currentWord.includes('a')) {
        lettersGuessed.push(' a');
        lettersRef.innerText=lettersGuessed;
        for (let i=0; i<currentWord.length; i++) {
            if(currentWord.charAt(i) === 'a') {
                const letter = 'a';
                const index = currentWord.indexOf(letter,i);
                currentGuess = currentGuess.replaceAt(2*index,currentWord[index]);
            }
        }
        wordRef.innerText=currentGuess;
    }
    if (key === 'a' && !lettersGuessed.includes('a') && !currentWord.includes('a')) {
        lettersGuessed.push(' a');
        lettersRef.innerText=lettersGuessed;
        guessesRemaining -= 1;
        console.log(guessesRemaining);
        guessesRemainingRef.innerText=guessesRemaining;
    }

    // B
    if (key === 'b' && !lettersGuessed.includes('b') && currentWord.includes('b')) {
        lettersGuessed.push(' b');
        lettersRef.innerText=lettersGuessed;
        for (let i=0; i<currentWord.length; i++) {
            if(currentWord.charAt(i) === 'b') {
                const letter = 'b';
                const index = currentWord.indexOf(letter,i);
                currentGuess = currentGuess.replaceAt(2*index,currentWord[index]);
            }
        }
        wordRef.innerText=currentGuess;
    }
    if (key === 'b' && !lettersGuessed.includes('b') && !currentWord.includes('b')) {
        lettersGuessed.push(' b');
        lettersRef.innerText=lettersGuessed;
        guessesRemaining -= 1;
        guessesRemainingRef.innerText=guessesRemaining;
    }

    // C
    if (key === 'c' && !lettersGuessed.includes('c') && currentWord.includes('c')) {
        lettersGuessed.push(' c');
        lettersRef.innerText=lettersGuessed;
        for (let i=0; i<currentWord.length; i++) {
            if(currentWord.charAt(i) === 'c') {
                const letter = 'c';
                const index = currentWord.indexOf(letter,i);
                currentGuess = currentGuess.replaceAt(2*index,currentWord[index]);
            }
        }
        wordRef.innerText=currentGuess;
    }
    if (key === 'c' && !lettersGuessed.includes('c') && !currentWord.includes('c')) {
        lettersGuessed.push(' c');
        lettersRef.innerText=lettersGuessed;
        guessesRemaining -= 1;
        guessesRemainingRef.innerText=guessesRemaining;
    }
    
}

// Code
currentWord = wordList[0];
currentGuess = encrypt(wordList[0]);
wordRef.innerText = currentGuess;

    // eventually, i'll loop over the whole word list and make
    // sure they either ran out of guesses or solved the
    // puzzle before moving onto the next word

// Event Listeners
document.addEventListener('keydown',guessLetter);