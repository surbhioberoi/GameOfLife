var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
context.fillStyle = "#FF00AA";
context.strokeStyle = "gray";

var cells = [];
var size = 20;
var columns = canvas.height/size;
var rows = canvas.width/size;



function updateCells() {
	function _test(x, y) {
		if (!(cells[x] === undefined) && cells[x][y] === 1) {
			return 1;
		}
		return 0;

	}

	function liveNeighboursCount(x, y) {
		return _test(x-1, y-1) + _test(x, y-1) + _test(x+1, y-1) + 
		_test(x-1, y) + _test(x+1, y) + _test(x-1, y+1) +_test(x, y+1) + _test(x+1, y+1);
	}

	var newCells = [];

	for (var i = 0; i<rows; i++) {
		newCells[i] = [];
		for (var j = 0; j<columns; j++) {
			var count = liveNeighboursCount(i, j);
			if (cells[i][j] ===1 && count < 2) {
				newCells[i][j] = 0;
			}
			if (cells[i][j] ===1 && (count === 2 || count === 3)) {
				newCells[i][j] = 1;
			} 
			if (cells[i][j] ===1 && count > 3) {
				newCells[i][j] = 0;
			}
			if (cells[i][j] ===0 && count === 3) {
				newCells[i][j] = 1;
			}

		}
	}

	return newCells;

}


function renderGame() {
	context.clearRect(0,0,canvas.height, canvas.width);
	for (var i = 0; i<rows; i++) {
		for (var j = 0; j<columns; j++) {

			if (cells[i][j] === 1 ) {
				context.fillRect(i*size, j*size, size, size);
			} else {
				context.strokeRect(i*size, j*size, size, size);
			}

		}
	}

	 
}


function draw() {
	cells = updateCells();
	renderGame();
}

function init() {
	for (var i = 0; i<rows; i++) {
		cells[i] = [];
		for (var j = 0; j<columns; j++) {
			cells[i][j] = 0;
		}
	}
	cells[25][13] = 1;
	cells[25][14] = 1;
	cells[25][15] = 1;

	renderGame();
}

init();


var interval;

function startGame() {
	interval = setInterval(draw, 500);

}


function stopGame() {
	clearInterval(interval);
}


function clearGame() {
	stopGame();
	init();
}

var stopButton = document.getElementById("stop");
stopButton.addEventListener("click", stopGame);

var startButton = document.getElementById("start");
startButton.addEventListener("click", startGame);

var clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearGame);

canvas.addEventListener("click", toggleCell);

function toggleCell(event) {

	var x = Math.floor(event.offsetX/20);
	var y = Math.floor(event.offsetY/20);

	cells[x][y] = cells[x][y]?0:1;
	renderGame();
}








