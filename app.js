const div_board = document.getElementById("div_board");
const colors = ["blue", "red", "yellow", "green"];
const solution = ["red", "blue", "blue", "green", "yellow"];
const p_solution = document.getElementById("p_solution");
const p_good = document.getElementById("p_good");
const p_notgood = document.getElementById("p_notgood");
const div_proposition = document.getElementById("div_proposition");

let proposition = [];
let nbTry = 0;
let good = 0;
let notGood = 0;

function drawKeyboard(arr) {
  for (let i = 0; i < arr.length; i++) {
    let btn = document.createElement("button");
    btn.innerText = arr[i];
    btn.classList.add("btn");
    btn.style.backgroundColor = arr[i];
    btn.setAttribute("id", arr[i]);
    div_board.appendChild(btn);
  }
}

function propose(index) {
  if (proposition.length < 5) {
    proposition.push(index);
  }
}

function compare(solution) {
  good = 0;
  notGood = 0;
  for (let i = 0; i < solution.length; i++) {
    if (!solution.includes(proposition[i])) {
      return;
    }
    if (proposition[i] == solution[i]) {
      good += 1;
    } else {
      notGood += 1;
    }
  }
}

function resetProposition() {
  proposition = [];
}

function nextTry() {
  nbTry += 1;
  console.log("try", nbTry);
}

function isGameLost() {
  return nbTry >= 10;
}

function isGameWon() {
  return good == 5 && nbTry < 10;
}

function showProposition() {
  let p = document.createElement("p");
  for (let i = 0; i < proposition.length; i++) {
    p.innerText += proposition[i] + ", ";
    div_proposition.appendChild(p);
  }
}

function play(index) {
  propose(index);

  if (proposition.length == 5) {
    compare(solution);
    p_good.innerText = `Good: ${good}`;
    p_notgood.innerText = `Not good: ${notGood}`;
    nextTry();
    showProposition();
    resetProposition();
  }

  if (isGameLost()) {
    resetProposition();
    p_solution.innerText = `You have lost\r\nThe solution is:${solution}`;
    return;
  }

  if (isGameWon()) {
    resetProposition();
    p_solution.innerText = `You have won`;
    return;
  }
}

document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("btn")) {
    play(event.target.id);
  }
});

drawKeyboard(colors);
