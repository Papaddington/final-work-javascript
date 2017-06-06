/**
 * Created by 圆圈 on 2017-06-06.
 */
var game = null;
var size = 5;

function initGame() {
    game = Array(size * size).fill(null); // 5 x 5 grid, represented as an array
}

function drawBackground() {
    var tileContainer = document.getElementById('tile-container');
    tileContainer.innerHTML = '';
    for (var i = 0; i < game.length; i++) {
        var tile = game[i];
        var tileDiv = document.createElement('div');
        var x = i % size;
        var y = Math.floor(i / size);
        tileDiv.style.top = y * 100 + 'px';
        tileDiv.style.left = x * 100 + 'px';
        tileDiv.classList.add("background");
        tileContainer.appendChild(tileDiv);
    }
}
function newGameStart() {
    document.getElementById('tile-container').innerHTML = '';
    initGame();
    drawBackground();
}
newGameStart();