(function () {
  const pairwiseScore = {
    rock: { paper: 0, scissors: 1, rock: 0 },
    paper: { scissors: 0, rock: 1, paper: 0 },
    scissors: { rock: 0, paper: 1, scissors: 0 },
  };

  const choicePool = ["rock", "paper", "scissors"];

  let generateComputerChoice = function () {
    let index = Math.floor(Math.random() * 99) % 3;

    return choicePool[index];
  }

  let globalStates = {
    playerScore: 0,
    computerScore: 0,
    roundNumber: 0,
    winner: null,
  };

  let newGameButton = document.querySelector(".heading>button#new-game");
  newGameButton.addEventListener('click', newGame);

  function newGame() {
    initScoreBoard();
    initChoices();
    initGameResult();
    initRoundResult();
    initHandlers();
  }

  function initScoreBoard() {
    globalStates = {
      playerScore: 0,
      computerScore: 0,
      roundNumber: 0,
    };

    let scoreBoardDiv = document.querySelector("div.score-board");
    scoreBoardDiv.replaceChildren([]);

    let playerScoreP = document.createElement("p");
    playerScoreP.setAttribute("id", "player-score");
    playerScoreP.innerText = `Player Score: ${globalStates.playerScore}`;

    let computerScoreP = document.createElement("p");
    computerScoreP.setAttribute("id", "computer-score");
    computerScoreP.innerText = `Computer Score: ${globalStates.computerScore}`;

    scoreBoardDiv.appendChild(playerScoreP);
    scoreBoardDiv.appendChild(computerScoreP);
  }

  function initChoices() {
    let choiceDiv = document.querySelector("div.choices");
    choiceDiv.replaceChildren([]);

    let h3 = document.createElement("h3")
    h3.innerText = "Please choose a move";

    let buttonsDiv = document.createElement("div");

    let rockButton = document.createElement("button");
    rockButton.setAttribute("id", "rock");
    rockButton.innerText = "✊";

    let paperButton = document.createElement("button");
    paperButton.setAttribute("id", "paper");
    paperButton.innerText = "✋"
    let scissorsButton = document.createElement("button");
    scissorsButton.setAttribute("id", "scissors");
    scissorsButton.innerText = "🤞";

    buttonsDiv.appendChild(rockButton);
    buttonsDiv.appendChild(paperButton);
    buttonsDiv.appendChild(scissorsButton);

    choiceDiv.appendChild(h3);
    choiceDiv.appendChild(buttonsDiv);
  }

  function initGameResult() {
    let gameResultDiv = document.querySelector("div.game-result");
    gameResultDiv.replaceChildren([]);
  }

  function initRoundResult() {
    let roundResultDiv = document.querySelector("div.round-result");
    roundResultDiv.replaceChildren([]);
  }

  function initHandlers() {
    let buttons = document.querySelectorAll("div.choices button");
    buttons.forEach((button) => {
      button.addEventListener('click', playRound)
    });
  }

  function updateScoreBoard(playerRoundScore, computerRoundScore) {
    let playerScoreP = document.querySelector("div.score-board>p#player-score");
    playerScoreP.innerText = `Player Score: ${globalStates.playerScore}`;

    let computerScoreP = document.querySelector("div.score-board>p#computer-score");
    computerScoreP.innerText = `Computer Score: ${globalStates.computerScore}`;
  }

  function updateRoundResult(playerChoice, computerChoice, roundWinner) {
    let roundResultDiv = document.querySelector("div.round-result");
    roundResultDiv.replaceChildren([]);

    let roundNumberText = document.createElement("p");
    roundNumberText.innerText = `Round Number: ${globalStates.roundNumber}`;

    let choiceText = document.createElement("p");
    choiceText.innerText = `Player chose: ${playerChoice.toUpperCase()}. Computer chose: ${computerChoice.toUpperCase()}`;

    let winnerText = document.createElement("p");
    if (roundWinner === "Draw") {
      winnerText.innerText = `Draw`;
    } else {
      winnerText.innerText = `${roundWinner} Won!`
    }

    roundResultDiv.appendChild(roundNumberText);
    roundResultDiv.appendChild(choiceText);
    roundResultDiv.appendChild(winnerText);
  }

  function updateGameResult() {
    if (globalStates.playerScore === 5 || globalStates.computerScore === 5) {
      let gameResultDiv = document.querySelector("div.game-result");
      let winnerText = document.createElement("p");
      if (globalStates.playerScore === 5) {
        winnerText.innerText = "Congratulations! You Won!";
      } else {
        winnerText.innerHTML = "Sorry. You Lost!";
      }

      gameResultDiv.appendChild(winnerText);
      let buttons = document.querySelectorAll("div.choices button");
      buttons.forEach((button) => {
        button.disabled = true;
      });
    }
  }

  function playRound(e) {
    const button = e.target;
    const playerChoice = button.getAttribute("id");
    const computerChoice = generateComputerChoice();

    globalStates.roundNumber += 1;
    let playerRoundScore = pairwiseScore[playerChoice][computerChoice];
    let computerRoundScore = pairwiseScore[computerChoice][playerChoice];

    globalStates.playerScore += playerRoundScore;
    globalStates.computerScore += computerRoundScore;

    let roundWinner = null;
    if (playerRoundScore === computerRoundScore) {
      roundWinner = "Draw";
    } else if (playerRoundScore < computerRoundScore) {
      roundWinner = "Computer";
    } else {
      roundWinner = "Player";
    }

    updateScoreBoard(playerRoundScore, computerRoundScore);
    updateRoundResult(playerChoice, computerChoice, roundWinner);
    updateGameResult();
  }

})();
