const gameBoard = document.querySelector("#gameboard");
const infoDisplay = document.querySelector("#info");
const startCells = ["", "","","", "","","", "",""];

let go = "martin";
let gameOver = false;
infoDisplay.textContent = "Frajer je na řadě";
infoDisplay.classList.add("turnText");

const martinImage = "martin_tic_tac_toe.jpg";
const rinaImage = "rina_tic_tac_toe.png";


function createBoards() {
	startCells.forEach((_cell, index) => {
		const cellElement = document.createElement("div");
		cellElement.classList.add("square");
		cellElement.id = index;
		cellElement.addEventListener("click", addGo);
		gameBoard.append(cellElement);
	})
}

createBoards();

function addGo(e) {
	if (gameOver) return;
	console.log("clicked", e);

	const goDisplay = document.createElement("img");
	goDisplay.src = go === "martin" ? martinImage : rinaImage;
	goDisplay.classList.add(go === "martin" ? "martinImage" : "rinaImage");
	goDisplay.classList.add("playerImage");
	
	e.target.append(goDisplay);
	go = go === "martin" ? "rina" : "martin";
	infoDisplay.textContent = go === "martin" ? "It's Martin's turn" : "It's Rina's turn";
	infoDisplay.classList.add("turnText");
	e.target.removeEventListener("click", addGo);
	checkScore();
}

function checkScore(){
	const allSqaures = document.querySelectorAll(".square");
	const winningCombos = [
		[0,1,2], [3,4,5], [6,7,8], //horizontal
		[0,3,6], [1,4,7], [2,5,8], //vertical
		[0,4,8], [2,4,6] //diagonal
	]

	winningCombos.forEach(array => {
		const martinWins = array.every(cell => allSqaures[cell].firstChild?.classList.contains("martinImage"));
		if (martinWins) {
			infoDisplay.textContent = "Martin je frajer!";
			infoDisplay.classList.add("winnerText");
			allSqaures.forEach(square => square.replaceWith(square.cloneNode(true)));
			gameOver = true;
			disableBoard();
		}
	});

	winningCombos.forEach(array => {
		const rinaWins = array.every(cell => allSqaures[cell].firstChild?.classList.contains("rinaImage"));
		if (rinaWins) {
			infoDisplay.textContent = "Rina je frajerka!";
			infoDisplay.classList.add("winnerText");
			allSqaures.forEach(square => square.replaceWith(square.cloneNode(true)));
			gameOver = true;
			disableBoard();
		}
	});
}

function disableBoard() {
	const allSqaures = document.querySelectorAll(".square");
	allSqaures.forEach(square => square.replaceWith(square.cloneNode(true)));
}