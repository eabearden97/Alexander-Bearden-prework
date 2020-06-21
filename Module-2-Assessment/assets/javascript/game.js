// Variables
var numWins = 0;
var currentWord = "";
var nextWord = "";
var currentIndex = 0;
var currentGuess = "";
var noSpaceGuess = "";
var guessesRemaining = 10;
var lettersGuessed = [];
var lastAnswer = "";
var imageArray = [];
const wordList = ["fastball","curveball","slider"];

// References
var winsRef = document.querySelector('#numWins');
var wordRef = document.querySelector('#currWord');
var guessesRemainingRef = document.querySelector('#guesses');
var lettersRef = document.querySelector('#letters');
var answerRef = document.querySelector('#answer');
var answerImageRef = document.querySelector('#answerimage');


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

const noSpaces = function(word) {
    word = word.replace(/\s/g,'');
    return word;
}

const guessLetter = function(event) {
    const key = event.key;
    // Loop over every letter
    for (let i=0; i<26; i++) {
        const char = String.fromCharCode(97+i);
        // If the letter ISN'T in the lettersGuessed list and IS in the currentWord
        if (key === char && !lettersGuessed.includes(char) && currentWord.includes(char)) {
            lettersGuessed.push(char);
            console.log(char);
            console.log(lettersGuessed);
            lettersRef.innerText=lettersGuessed;
            for (let i=0; i<currentWord.length; i++) {
                if(currentWord.charAt(i) === key) {
                    const letter = key;
                    const index = currentWord.indexOf(letter,i);
                    currentGuess = currentGuess.replaceAt(2*index,currentWord[index]);
                }
            }
            wordRef.innerText=currentGuess;
        }
        if (key === char && !lettersGuessed.includes(char) && !currentWord.includes(char)) {
            lettersGuessed.push(char);
            lettersRef.innerText=lettersGuessed;
            guessesRemaining -= 1;
            console.log(nextWord);
            guessesRemainingRef.innerText=guessesRemaining;
        }
    }
}

const updateBoard = function(event) {
    if (guessesRemaining === 0 && nextWord!= undefined) {
        console.log("You lost this puzzle.");
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        // set image with an image reference
        currentIndex += 1;
        currentWord = wordList[currentIndex];
        nextWord = wordList[currentIndex+1];
        currentGuess = encrypt(wordList[currentIndex]);
        wordRef.innerText = currentGuess;
        guessesRemaining = 5;
        guessesRemainingRef.innerText = guessesRemaining;
        lettersGuessed = [];
        lettersRef.innerText = lettersGuessed;
    }
    if (guessesRemaining === 0 && nextWord === undefined) {
        console.log("The game is over.");
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        // set image with an image reference
        currentIndex += 1;
        if (numWins === 1 ) {
            currentGuess = `Game Over! You won ${numWins} time!`;
        }
        else {
            currentGuess = `Game Over! You won ${numWins} times`;
        }
        wordRef.innerText = currentGuess;
        document.removeEventListener('keydown',guessLetter);
        document.removeEventListener('keydown', updateBoard);
    }
    if (currentWord === noSpaces(currentGuess) && nextWord != undefined) {
        console.log("You won this puzzle.");
        numWins += 1;
        winsRef.innerText = numWins;
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        // set image with an image reference
        currentIndex += 1;
        currentWord = wordList[currentIndex];
        nextWord = wordList[currentIndex+1];
        currentGuess = encrypt(wordList[currentIndex]);
        wordRef.innerText = currentGuess;
        guessesRemaining = 5;
        guessesRemainingRef.innerText = guessesRemaining;
        lettersGuessed = [];
        lettersRef.innerText = lettersGuessed;
    }
    if (currentWord === noSpaces(currentGuess) && nextWord === undefined) {
        console.log("You won this puzzle.");
        numWins += 1;
        winsRef.innerText = numWins;
        console.log("The game is over.");
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        // set image with an image reference
        currentIndex += 1;
        if (numWins === 1 ) {
            currentGuess = `Game Over! You won ${numWins} time!`;
        }
        else {
            currentGuess = `Game Over! You won ${numWins} times`;
        }
        wordRef.innerText = currentGuess;
        document.removeEventListener('keydown',guessLetter);
        document.removeEventListener('keydown', updateBoard);
    }
}

// Code
currentWord = wordList[currentIndex];
console.log(currentWord)
nextWord = wordList[currentIndex+1];
console.log(nextWord);
currentGuess = encrypt(wordList[currentIndex]);
wordRef.innerText = currentGuess;
//populate imageArray

    // eventually, i'll loop over the whole word list and make
    // sure they either ran out of guesses or solved the
    // puzzle before moving onto the next word

// Event Listeners
document.addEventListener('keydown',guessLetter);
document.addEventListener('keydown', updateBoard);