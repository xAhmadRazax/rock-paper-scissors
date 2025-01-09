let humanScore = 0,
  computerScore = 0,
  matchTie = 0,
  round = 1;

const getComputerChoice = () => {
  // const randomComputerChoice = Math.floor(Math.random() * 12);
  const randomComputerChoice = Math.floor(Math.random() * 3);

  // if (randomComputerChoice >= 0 && randomComputerChoice <= 3) {
  if (randomComputerChoice === 0) {
    return "rock";
    // } else if (randomComputerChoice > 3 && randomComputerChoice <= 7) {
  } else if (randomComputerChoice === 1) {
    return "paper";
  } else {
    return "scissors";
  }
};

const getHumanChoice = () => {
  let humanChoice = +prompt(
    "Press 1 to 3 (inclusive).\n1 for rock.\n2 for paper.\n3 for scissors."
  );

  while (humanChoice < 1 || humanChoice > 3) {
    console.log(
      "Invalid input: please Select \n1 for rock.\n2 for paper.\n3 for scissors."
    );
    humanChoice = +prompt(
      "Press 1 to 3 (inclusive).\n1 for rock.\n2 for paper.\n3 for scissors."
    );
  }

  if (humanChoice === 1) {
    return "rock";
  } else if (humanChoice === 2) {
    return "paper";
  } else {
    return "scissors";
  }
};

const playRound = (computerSelection, humanSelection) => {
  if (computerSelection === humanSelection) {
    matchTie++;
    console.log(
      `Its a tie, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
  } else if (
    (humanSelection === "rock" && computerSelection === "scissors") ||
    (humanSelection === "paper" && computerSelection === "rock") ||
    (humanSelection === "scissors" && computerSelection === "paper")
  ) {
    humanScore++;
    console.log(
      `You WIN, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
  } else {
    computerScore++;
    console.log(
      `You LOSE, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
  }
};

while (round <= 5) {
  const humanSelection = getHumanChoice();
  const computerSelection = getComputerChoice();

  // console.log(computerSelection, humanSelection);

  playRound(computerSelection, humanSelection);

  round++;
  console.log(
    `Current Score:\nplayer: ${humanScore} | computer: ${computerScore} | match tied: ${matchTie}`
  );
}
