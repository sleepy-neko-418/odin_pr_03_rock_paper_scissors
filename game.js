(function() {
  const pairwiseScore = {
    rock: {paper: 0, scissors: 1, rock: 0},
    paper: {scissors: 0, rock: 1, paper: 0},
    scissors: {rock: 0, paper: 1, scissors: 0},
  };

  const choicePool = ["rock", "paper", "scissors"];

  let generateComputerChoice = function() {
    let index = Math.ceil(Math.random() * 99) % 3;

    return choicePool[index];
  }

  let getPlayerChoice = function() {
    let choice = "";
    while (!choicePool.includes(choice)) {
      choice = prompt("Please enter your choice (rock | paper | scissors):");
    }

    return choice;
  } 

  let playerScore = 0;
  let computerScore = 0;

  for (let round = 0; round < 5; round+=1) {
    console.log(`---Round number ${round + 1}---`);

    let computerChoice = generateComputerChoice();
    let playerChoice = getPlayerChoice();

    playerScore += pairwiseScore[playerChoice][computerChoice];
    computerScore += pairwiseScore[computerChoice][playerChoice];

    console.log("Player chose:", playerChoice);
    console.log("Computer chose:", computerChoice);
    console.log("\n");
    console.log("Current score");
    console.log("Player:", playerScore);
    console.log("Computer", computerScore);
    console.log("\n\n");
  }

  console.log("---Final Result---");
  if (playerScore == computerScore) {
    console.log("DRAW");
  } else {
    let winner = playerScore > computerScore ? "PLAYER" : "COMPUTER"
    console.log(`${winner} WON`);
  }

})();
