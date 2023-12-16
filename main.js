const wrapper = document.querySelector('.wrapper')
const statusEl = document.getElementById("status");
const restartEl = document.getElementById("restart");
const cellEls = document.querySelectorAll(".cell");

// Get the modal
var modal = document.getElementById("modal");
const modalText = document.querySelector('.modal-text')
const showModal = (message) => {
    modalText.innerHTML = message
    modal.style.display = "flex"
    wrapper.style.filter = 'blur(4px)'
}
const closeModal = () => {
    modal.style.display = "none"
    wrapper.style.filter = 'blur(0px)'
}

let gameActive = true;
let currentPlayer = "X";
let Gameboard = ["", "", "", "", "", "", "", "", ""];
const winning = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
];

const currentPlayerTurn = () => `Player: ${currentPlayer}`;
statusEl.innerHTML = currentPlayerTurn();

const Play = (e) => {
  const cell = e.target;
  const index = parseInt(cell.dataset.cell);

  if (Gameboard[index] !== "" || !gameActive) return;
  Gameboard[index] = currentPlayer;
  cell.innerHTML = currentPlayer;
  Validate();
};

const Validate = () => {
  let roundWon = false;

  for (let i = 0; i <= 7; i++) {
    const winner = winning[i];
    const a = Gameboard[winner[0]],
      b = Gameboard[winner[1]],
      c = Gameboard[winner[2]];

    if (a === "" || b === "" || c === "") continue;
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }

  if (roundWon) {
    showModal(`${currentPlayer} wins!`)
    gameActive = false;
    return;
  }

  let roundDraw = !Gameboard.includes("");
  if (roundDraw) {
    showModal("Draw")
    gameActive = false;
    return;
  }

  currentPlayer === "X" ? (currentPlayer = "O") : (currentPlayer = "X");
  statusEl.innerHTML = currentPlayerTurn();
};

const Restart = () => {
  gameActive = true;
  currentPlayer = "X";
  Gameboard = ["", "", "", "", "", "", "", "", ""];
  statusEl.innerHTML = currentPlayerTurn();
  cellEls.forEach((cell) => (cell.innerHTML = ""));
  closeModal()
};


cellEls.forEach((cellEl) => (cellEl.onclick = Play));
restartEl.onclick = Restart;
