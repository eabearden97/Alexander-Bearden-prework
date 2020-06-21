// Variables
var numWins = 0;
var currentWord = "";
var nextWord = "";
var currentIndex = 0;
var currentGuess = "";
var guessesRemaining = 10;
var lettersGuessed = [];
var lastAnswer = "";
var imageArray = [];
const wordList = ["fastball","bullpen","catcher","homerun","curveball","shortstop"];

// References
var winsRef = document.querySelector('#numWins');
var wordRef = document.querySelector('#currWord');
var guessesRemainingRef = document.querySelector('#guesses');
var lettersRef = document.querySelector('#letters');
var answerRef = document.querySelector('#answer');
var answerImageRef = document.querySelector('#answerimage');
var goodAudioRef = document.querySelector('#goodaudio');
var badAudioRef = document.querySelector('#badaudio');

// Functions
const encrypt = function(word) {
    var encryptedWord = "";
    for (let i=0; i<word.length; i++) {
        encryptedWord += "_ ";
    }
    return encryptedWord;
}

const populateImageArray = function(words,images) {
    for (let i=0; i<words.length; i++) {
        var img = new Image();
        img.src = `assets/images/${words[i]}.jpg`;
        images.push(img);
    }
}

String.prototype.replaceAt = function(index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

const noSpaces = function(word) {
    word = word.replace(/\s/g,"");
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
        badAudioRef.play();
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        document.getElementById("answerimage").src=imageArray[currentIndex].src;
        currentIndex += 1;
        currentWord = wordList[currentIndex];
        nextWord = wordList[currentIndex+1];
        currentGuess = encrypt(wordList[currentIndex]);
        wordRef.innerText = currentGuess;
        guessesRemaining = 10;
        guessesRemainingRef.innerText = guessesRemaining;
        lettersGuessed = [];
        lettersRef.innerText = lettersGuessed;
    }
    if (guessesRemaining === 0 && nextWord === undefined) {
        badAudioRef.play();
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        document.getElementById("answerimage").src=imageArray[currentIndex].src;
        currentIndex += 1;
        if (numWins === 1 ) {
            currentGuess = `Game Over! You won ${numWins} time!`;
        }
        else {
            currentGuess = `Game Over! You won ${numWins} times`;
        }
        wordRef.innerText = currentGuess;
        lettersGuessed = [];
        lettersRef.innerText = lettersGuessed;
        document.removeEventListener('keydown',guessLetter);
        document.removeEventListener('keydown', updateBoard);
    }
    if (currentWord === noSpaces(currentGuess) && nextWord != undefined) {
        goodAudioRef.play();
        numWins += 1;
        winsRef.innerText = numWins;
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        document.getElementById("answerimage").src=imageArray[currentIndex].src;
        currentIndex += 1;
        currentWord = wordList[currentIndex];
        nextWord = wordList[currentIndex+1];
        currentGuess = encrypt(wordList[currentIndex]);
        wordRef.innerText = currentGuess;
        guessesRemaining = 10;
        guessesRemainingRef.innerText = guessesRemaining;
        lettersGuessed = [];
        lettersRef.innerText = lettersGuessed;
    }
    if (currentWord === noSpaces(currentGuess) && nextWord === undefined) {
        goodAudioRef.play();
        numWins += 1;
        winsRef.innerText = numWins;
        lastAnswer = currentWord;
        answerRef.innerText = `Last Answer: ${lastAnswer}`;
        document.getElementById("answerimage").src=imageArray[currentIndex].src;
        currentIndex += 1;
        if (numWins === 1 ) {
            currentGuess = `Game Over! You won ${numWins} time!`;
        }
        else {
            currentGuess = `Game Over! You won ${numWins} times`;
        }
        wordRef.innerText = currentGuess;
        lettersGuessed = [];
        lettersRef.innerText = lettersGuessed;
        document.removeEventListener('keydown',guessLetter);
        document.removeEventListener('keydown', updateBoard);
    }
}

// Code
currentWord = wordList[currentIndex];
nextWord = wordList[currentIndex+1];
currentGuess = encrypt(wordList[currentIndex]);
wordRef.innerText = currentGuess;
populateImageArray(wordList,imageArray);

// Event Listeners
document.addEventListener('keydown',guessLetter);
document.addEventListener('keydown', updateBoard);