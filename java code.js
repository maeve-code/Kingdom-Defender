// ------------------------------
// GET ELEMENTS FROM THE PAGE
// ------------------------------

const computerChoiceDisplay =
    document.getElementById("computer-choice");

const userChoiceDisplay =
    document.getElementById("user-choice");

const resultDisplay =
    document.getElementById("result");

const playerScoreDisplay =
    document.getElementById("player-score");

const computerScoreDisplay =
    document.getElementById("computer-score");

const highScoreDisplay =
    document.getElementById("high-score");

const likeButton =
    document.getElementById("like-button");

const likeCountDisplay =
    document.getElementById("like-count");

const resetButton =
    document.getElementById("reset-button");

const possibleChoices =
    document.querySelectorAll(".choice");


// ------------------------------
// GAME VARIABLES
// ------------------------------

let userChoice;

let computerChoice;

let playerScore = 0;

let computerScore = 0;

let gameOver = false;


// ------------------------------
// FIVE GAME CHOICES
// ------------------------------

const choices = [
    "knight",
    "archer",
    "wizard",
    "dragon",
    "king"
];


// ------------------------------
// WHAT EACH CHARACTER BEATS
// ------------------------------

const beats = {

    knight: ["archer", "wizard"],

    archer: ["dragon", "king"],

    wizard: ["knight", "dragon"],

    dragon: ["knight", "archer"],

    king: ["wizard", "dragon"]

};


// ------------------------------
// CHARACTER NAMES
// Makes the game display nice names
// ------------------------------

const names = {

    knight: "Knight",

    archer: "Archer",

    wizard: "Wizard",

    dragon: "Dragon",

    king: "King"

};


// ------------------------------
// PLAYER CHOOSES A CHARACTER
// ------------------------------

possibleChoices.forEach(choice => {

    choice.addEventListener("click", () => {

        // Don't allow choices after the game ends
        if (gameOver) {

            return;

        }

        userChoice = choice.id;

        userChoiceDisplay.textContent =
            names[userChoice];

        generateComputerChoice();

        getResult();

    });

});


// ------------------------------
// COMPUTER CHOOSES RANDOMLY
// ------------------------------

function generateComputerChoice() {

    const randomNumber =
        Math.floor(Math.random() * choices.length);

    computerChoice =
        choices[randomNumber];

    computerChoiceDisplay.textContent =
        names[computerChoice];

}


// ------------------------------
// WORK OUT WHO WINS
// ------------------------------

function getResult() {

    // Same character = draw
    if (userChoice === computerChoice) {

        resultDisplay.textContent =
            "Draw! Choose again.";

        return;

    }


    // Check if player's character
    // beats the computer's character
    if (beats[userChoice].includes(computerChoice)) {

        resultDisplay.textContent =
            "You Win! 🏰";

        playerScore++;

        playerScoreDisplay.textContent =
            playerScore;

    }

    else {

        resultDisplay.textContent =
            "You Lose!";

        computerScore++;

        computerScoreDisplay.textContent =
            computerScore;

    }


    // Check if someone reached 5
    checkWinner();

}


// ------------------------------
// CHECK FOR GAME WINNER
// ------------------------------

function checkWinner() {

    if (playerScore === 5) {

        resultDisplay.textContent =
            "🏆 You saved the kingdom! You win!";

        gameOver = true;

    }


    if (computerScore === 5) {

        resultDisplay.textContent =
            "💀 The kingdom has been defeated!";

        gameOver = true;

    }


    // Update high score
    updateHighScore();

}


// ------------------------------
// RESET THE GAME
// ------------------------------

resetButton.addEventListener("click", resetGame);


function resetGame() {

    userChoice = "";

    computerChoice = "";

    playerScore = 0;

    computerScore = 0;

    gameOver = false;

    userChoiceDisplay.textContent = "-";

    computerChoiceDisplay.textContent = "-";

    resultDisplay.textContent =
        "Choose a defender to battle!";

    playerScoreDisplay.textContent = "0";

    computerScoreDisplay.textContent = "0";

}


// ------------------------------
// HIGH SCORE
// Uses localStorage so it stays
// when the page is refreshed
// ------------------------------

function updateHighScore() {

    const oldHighScore =
        Number(localStorage.getItem("kingdomHighScore")) || 0;

    if (playerScore > oldHighScore) {

        localStorage.setItem(
            "kingdomHighScore",
            playerScore
        );

        highScoreDisplay.textContent =
            playerScore;

    }

}


// Show saved high score when page opens

const savedHighScore =
    Number(localStorage.getItem("kingdomHighScore")) || 0;

highScoreDisplay.textContent =
    savedHighScore;


// ------------------------------
// LIKE BUTTON
// ------------------------------

let likes =
    Number(localStorage.getItem("kingdomLikes")) || 0;

likeCountDisplay.textContent = likes;


likeButton.addEventListener("click", () => {

    likes++;

    localStorage.setItem(
        "kingdomLikes",
        likes
    );

    likeCountDisplay.textContent =
        likes;

});