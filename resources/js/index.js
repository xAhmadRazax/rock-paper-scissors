let humanScore = 0,
  computerScore = 0,
  matchTie = 0,
  round = 0;

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

const getHumanChoice = (e) => {
  return e?.target?.closest("[data-player-select]").dataset.playerSelect;
};

const playRound = (computerSelection, humanSelection, logsEl) => {
  if (computerSelection === humanSelection) {
    matchTie++;
    printTiedMatchScore(matchTie);
    roundResultLogger(
      logsEl,
      `Round: ${round} - Its a tie, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
    console.log(
      `Its a tie, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
  } else if (
    (humanSelection === "rock" && computerSelection === "scissors") ||
    (humanSelection === "paper" && computerSelection === "rock") ||
    (humanSelection === "scissors" && computerSelection === "paper")
  ) {
    humanScore++;
    printHumanScore(humanScore);
    roundResultLogger(
      logsEl,
      `Round: ${round} - You WIN, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
    console.log(
      `You WIN, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
  } else {
    computerScore++;
    printComputerScore(computerScore);
    roundResultLogger(
      logsEl,
      `Round: ${round} - You LOSE, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
    console.log(
      `You LOSE, You selected: ${humanSelection}, computer selected: ${computerSelection} `
    );
  }
};

function toggleElementVisibility(els) {
  console.log(els);
  els.forEach((el) => {
    el.classList.toggle(`slide-to-${el.dataset?.slide}`);
    el.classList.toggle("hide-element");
  });
}
function resetElementVisibility(els) {
  els.forEach((el) =>
    el.classList.remove("slide-to-left", "slide-to-right", "hide-element")
  );
}
function slideElementOutWindow(el, direction = "left") {
  // const classes = ["hide-element","scale-zero"]

  el.classList.add(
    `${
      direction.toLowerCase() === "left" ? "slide-to-left" : "slide-to-right"
    }`,
    "hide-element"
  );
}
function startGameHandler(e, gameMenuEl, playerChoicesEl, logsEl, menuBtn) {
  slideElementOutWindow(gameMenuEl);
  resetElementVisibility([playerChoicesEl, logsEl, menuBtn]);
}
function menuBtnClickHandler(
  e,
  startBtn,
  gameMenuEl,
  playerChoicesEl,
  logsEl,
  menuBtn
) {
  startBtn.textContent = "Resume";
  toggleElementVisibility([gameMenuEl, playerChoicesEl, logsEl, menuBtn]);
}

function playerChoicesClickHandler(
  e,

  logsEl
) {
  if (!e?.target?.closest("[data-player-select]")) {
    return;
  }
  const humanSelection = getHumanChoice(e);
  const computerSelection = getComputerChoice();

  // console.log(computerSelection, humanSelection);

  playRound(computerSelection, humanSelection, logsEl);

  console.log(
    `Current Score:\nplayer: ${humanScore} | computer: ${computerScore} | match tied: ${matchTie}`
  );
}

function roundResultLogger(logsEl, logMsg) {
  const logMsgTime = `${new Date().getHours()}:${new Date().getMinutes()} | ${logMsg}`;
  const newLogEl = document.createElement("p");
  newLogEl.textContent = logMsgTime;
  logsEl.append(newLogEl);
}

function printRound(round) {
  document.querySelector("[data-round]").textContent = round;
}
function printHumanScore(score) {
  document.querySelector("[data-player-score]").textContent = score;
}
function printComputerScore(score) {
  document.querySelector("[data-computer-score]").textContent = score;
}
function printTiedMatchScore(score) {
  document.querySelector("[data-tied-score]").textContent = score;
}

function GameOver(startBtn, menuBtn, gameMenuEl, playerChoicesEl, logsEl) {
  const overlay = document.querySelector("[data-overlay]");
  const model = document.querySelector("[data-model]");

  overlay.classList.add("open");

  const modelText = document.createElement("p");
  modelText.textContent =
    humanScore === 5
      ? "You Won Congratulation Play Again?"
      : "You lose Play Again";

  const resetBtn = document.createElement("button");
  resetBtn.textContent = "Play Again!";

  resetBtn.addEventListener(
    "click",
    () => {
      toggleElementVisibility([menuBtn, gameMenuEl, playerChoicesEl, logsEl]);
      ResetGame(startBtn, menuBtn, gameMenuEl, playerChoicesEl, logsEl);
      overlay.classList.remove("open");
      model.replaceChildren();
    },
    { once: true }
  );

  model.append(modelText);
  model.append(resetBtn);
}

function ResetGame(startBtn, menuBtn, gameMenuEl, playerChoicesEl, logsEl) {
  humanScore = 0;
  computerScore = 0;
  round = 0;
  matchTie = 0;
  startBtn.textContent = "Start";

  logsEl.replaceChildren();
  console.log(logsEl);
  printComputerScore(computerScore);
  printHumanScore(humanScore);
  printTiedMatchScore(matchTie);
  printRound(round);

  // toggleElementVisibility([menuBtn, gameMenuEl, playerChoicesEl, logsEl]);
}
const init = () => {
  const startBtn = document.querySelector("[data-game-start-button]");
  const resetBtn = document.querySelector("[data-game-reset-button]");
  const menuBtn = document.querySelector("[data-menu-button]");
  const gameMenuEl = document.querySelector("[data-game-menu]");
  const playerChoicesEl = document.querySelector("[data-player-choices]");
  const logsEl = document.querySelector("[data-game-logs]");

  // basic function

  startBtn.addEventListener("click", (e) => {
    startGameHandler(e, gameMenuEl, playerChoicesEl, logsEl, menuBtn);
  });
  resetBtn.addEventListener("click", () =>
    ResetGame(startBtn, menuBtn, gameMenuEl, playerChoicesEl, logsEl)
  );
  menuBtn.addEventListener("click", (e) =>
    menuBtnClickHandler(
      e,
      startBtn,
      gameMenuEl,
      playerChoicesEl,
      logsEl,
      menuBtn
    )
  );

  playerChoicesEl.addEventListener("click", (e) => {
    round++;
    printRound(round);
    playerChoicesClickHandler(e, logsEl);
    if (humanScore === 5 || computerScore == 5) {
      return GameOver(startBtn, menuBtn, gameMenuEl, playerChoicesEl, logsEl);
    }
  });
};

document.addEventListener("DOMContentLoaded", init);
