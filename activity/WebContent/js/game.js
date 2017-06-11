/**
 * Created by 圆圈 on 2017-06-06.
 */
var game = null;
var size = 5;
var score = 0;
function initGame() {
    game = [];
    for(var i = 0;i < size; i++) {
        game[i] = [];
        for(var j = 0; j < size; j++) {
            game[i][j] = 0;
        }
    }

}
function drawBackground() {
    var tileContainer = document.getElementById('tile-container');
    tileContainer.innerHTML = '';
    for (var i = 0; i < size * size; i++) {
        var tileDiv = document.createElement('div');
        var x = i % size;
        var y = Math.floor(i / size);
        tileDiv.style.top = y * 100 + 'px';
        tileDiv.style.left = x * 100 + 'px';
        tileDiv.classList.add("background");
        tileContainer.appendChild(tileDiv);
    }
}
function canGenerate(i, j) {
    if(game[i][j] != 0) {
        return false;
    }
    return true;
}
function createRandomTile() {
    var tileContainer = document.getElementById('tile-container');
    var randomX = Math.random() * 5;
    randomX = parseInt(randomX, 10);
    var randomY = Math.random() * 5;
    randomY = parseInt(randomY, 10);
    while(!canGenerate(randomY,randomX)) {
        randomX = Math.random() * 5;
        randomX = parseInt(randomX, 10);
        randomY = Math.random() * 5;
        randomY = parseInt(randomY, 10);
    }
    var value = generateRandom();
    var tileDiv = document.createElement('div');
    tileDiv.classList.add('tile','tile--' + value);
    setTimeout(function () {
        tileDiv.classList.add("tile--pop");
    }, 100);
    tileDiv.innerHTML = '<p>' + value + '</p>';
    tileDiv.style.left = randomX * 100 + 'px';
    tileDiv.style.top = randomY * 100 + 'px';
    tileDiv.id = (randomY) + "" + (randomX);
    tileContainer.appendChild(tileDiv);
    game[randomY][randomX] = value;
}
function generateRandom() {
    return Math.random()>0.5 ? 2 : 4;
}

function newGameStart() {
    document.getElementById('tile-container').innerHTML = '';
    initGame();
    drawBackground();
    for(var i = 0 ;i< 2;i++) {
        var tileContainer = document.getElementById('tile-container');
        var randomX = Math.random() * 5;
        randomX = parseInt(randomX, 10);
        var randomY = Math.random() * 5;
        randomY = parseInt(randomY, 10);
        while(!canGenerate(randomY,randomX)) {
            randomX = Math.random() * 5;
            randomX = parseInt(randomX, 10);
            randomY = Math.random() * 5;
            randomY = parseInt(randomY, 10);
        }
        var tileDiv = document.createElement('div');
        tileDiv.classList.add('tile','tile--2');
        tileDiv.innerHTML = '<p>' + 2 + '</p>';
        tileDiv.style.left = randomX * 100 + 'px';
        tileDiv.style.top = randomY * 100 + 'px';
        tileDiv.id = (randomY) + "" + (randomX);
        tileContainer.appendChild(tileDiv);
        game[randomY][randomX] = 2;
    }
}
function no_block_horizontal(i, k, j) {
    k++;
    for( ;k<j; k++) {
        if(game[i][k] !== 0)
            return false;
    };
    return true;
}
function no_block_vertical(i, k, j) {
    k++;
    for(; k<j; k++) {
        if(game[k][i] !== 0) {
            return false;
        };
    };
    return true;
}
function shiftRight() {
    var result = [];
    for(var i=0; i<game.length; i++ ) {
        for(var j=game[i].length-2; j>=0; j--) {
            if (game[i][j] != 0) {
                for (var k = game[i].length-1; k>j; k--) {
                    //当前的是data[i][j], 如果最左边的是0， 而且之间的全部是0
                    if (game[i][k] === 0 && this.no_block_horizontal(i, k, j)) {
                        result.push( {form : {y:i,x:j}, to :{y:i,x:k}} );
                        game[i][k] = game[i][j];
                        game[i][j] = 0;
                        break;
                    }else if(game[i][k]!==0 && game[i][j] === game[i][k] && this.no_block_horizontal(i, j, k)){
                        result.push( {form : {y:i,x:j}, to :{y:i,x:k}} );
                        game[i][k] += game[i][j];
                        score += game[i][k];
                        game[i][j] = 0;
                        break;
                    };
                };
            };
        };
    };
    return result;
}
function shiftLeft() {
    var result = [];
    for(var i = 0; i < game.length; i++) {
        for(var j = 1;j < game[i].length; j++) {
            if(game[i][j] != 0) {
                for (var k = 0; k < j; k++) {
                    if(game[i][k] == 0 && no_block_horizontal(i,k,j)) {
                        result.push( {form : {y:i,x:j}, to :{y:i,x:k}} );
                        game[i][k] = game[i][j];
                        game[i][j] = 0;
                        break;
                    }
                    else if(game[i][j]!==0 && game[i][j] === game[i][k] && no_block_horizontal(i, k, j)) {
                        result.push( {form : {y:i,x:j}, to :{y:i,x:k}} );
                        game[i][k] += game[i][j];
                        score += game[i][k];
                        game[i][j] = 0;
                        break;
                    }
                }
            }
        }
    }
    return result;
}
function shiftUp() {
    var result = [];
    // 循环要检测的长度
    for(var i=0; i<game[0].length; i++ ) {
        // 循环要检测的高度
        for(var j=1; j<game.length; j++) {
            if (game[j][i] != 0) {
                //x是确定的, 循环y方向;
                for (var k = 0; k<j ; k++) {
                    //当前的是data[j][i], 如果最上面的是0， 而且之间的全部是0
                    if (game[k][i] === 0 && this.no_block_vertical(i, k, j)) {
                        result.push( {form : {y:j,x:i}, to :{y:k,x:i}} );
                        game[k][i] = game[j][i];
                        game[j][i] = 0;
                        break;
                    }else if(game[j][i]!==0 && game[k][i] === game[j][i] && this.no_block_vertical(i, k, j)){
                        result.push( {form : {y:j,x:i}, to :{y:k,x:i}} );
                        game[k][i] += game[j][i];
                        score += game[k][i];
                        game[j][i] = 0;
                        break;
                    };
                };
            };
        };
    };
    return result;
}
function shiftDown() {
    var result = [];
    // 循环要检测的长度
    for(var i=0; i<game[0].length; i++ ) {
        // 循环要检测的高度
        for(var j=game.length - 1; j>=0 ; j--) {
            if (game[j][i] != 0) {
                //x是确定的, 循环y方向;
                for (var k = game.length-1; k>j ; k--) {
                    if (game[k][i] === 0 && this.no_block_vertical(i, k, j)) {
                        result.push( {form : {y:j,x:i}, to :{y:k,x:i}} );
                        game[k][i] = game[j][i];
                        game[j][i] = 0;
                        break;
                    }else if(game[k][i]!==0 && game[k][i] === game[j][i] && this.no_block_vertical(i, j, k)){
                        result.push( {form : {y:j,x:i}, to :{y:k,x:i}} );
                        game[k][i] += game[j][i];
                        score += game[k][i];
                        game[j][i] = 0;
                        break;
                    };
                };
            };
        };
    };
    return result;
}
function handleKeypress(event) {
    var whichKey = event.which;
    var moveArray = [];
    switch (whichKey) {
        case 37:
            //←
            moveArray = shiftLeft();
            break;
        case 38:
            //↑
            moveArray = shiftUp();
            break;
        case 39:
            //→
            moveArray = shiftRight();
            break;
        case 40:
            //↓
            moveArray = shiftDown();
            break;
    }
    if(gameOver()) {
			$(".gameover").show();
    }
    console.log(moveArray);
    for(var i = 0;i < moveArray.length; i++) {
        var tile = document.getElementById(moveArray[i].form.y + "" + moveArray[i].form.x);
        var hastile = document.getElementById(moveArray[i].to.y + "" + moveArray[i].to.x);
        if(hastile != null) {
            hastile.parentNode.removeChild(hastile);
        }
        tile.id = moveArray[i].to.y + "" + moveArray[i].to.x;
        tile.innerHTML = '<p>' + game[moveArray[i].to.y][moveArray[i].to.x] + '</p>';
        tile.classList.add('tile--' + game[moveArray[i].to.y][moveArray[i].to.x]);
        tile.style.top = (moveArray[i].to.y) * 100 + 'px';
        tile.style.left = (moveArray[i].to.x) * 100 + 'px';
    }
    if(moveArray.length != 0) {
        createRandomTile();
    }
    var scorediv = document.getElementById("score");
    scorediv.innerHTML = "<p>" + score + "</p>";
}
function isFull() {
    for(var i = 0; i < size; i++)  {
        for(var j = 0;j < size;j++) {
            if(game[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
function gameOver() {
    if(isFull()) {
        var isRightSame;
        var isDownSame;
        for(var i = 0;i < size ;i++) {
            for(var j = 0;j < size; j++) {
                if(j != size-1 && game[i][j] === game[i][j+1]) {
                    isRightSame = true;
                }
                if(i != size-1 && game[i][j] === game[i+1][j]) {
                    isDownSame = true;
                }
            }
        }
        if(isRightSame || isDownSame) {
            return false;
        }
        else {
            return true;
        }
    }
}
document.addEventListener("keydown", handleKeypress);
newGameStart();