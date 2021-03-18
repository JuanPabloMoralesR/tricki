const 
    selectBox = document.querySelector(".select-box"), 
    selectXBtn = selectBox.querySelector(".playerX"), 
    selectOBtn = selectBox.querySelector(".playerO"), 
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"), 
    players = document.querySelector(".players"), 
    playerXIcon = "fas fa-times", 
    playerOIcon = "fas fa-circle",
    boardSize = 3;


var userIsPlayingAs = "X";
var userIcon = playerXIcon; 
var botIcon = playerOIcon;
var userTakenSpots = [];
var botTakenSpots = [];


const userTakenSpotsMatrix = {
    rows: [0,0,0], 
    columns: [0,0,0], 
    mainDiagonal: [0,0,0], 
    oppositeDiagonal: [0,0,0]
}

const botTakenSpotsMatrix = JSON.parse(JSON.stringify(userTakenSpotsMatrix))
    /*
        Posición cero = Filas 
        Posición uno = Columnas
        Posición dos = Diagonal principal 
        Posición tres = Diagonal secundaria 
    */

allBox.forEach(item => {
    item.addEventListener('click', event => {
        addMoveToMatrix(item.className, userTakenSpotsMatrix)
        clickedBox(item)
        if(checkForWinningCombination(userTakenSpotsMatrix)){
            console.log("EL usuario ha ganado");
        }
    })
})

selectXBtn.addEventListener('click', event => {
    showPlayBoard();
})

selectOBtn.onclick = () =>{
    showPlayBoard();
    players.setAttribute("class", "players active player");
    userIsPlayingAs = "O";
    userIcon = playerOIcon; 
    botIcon = playerXIcon;
}

function showPlayBoard(){ 
    selectBox.classList.add("hide")
    playBoard.classList.add("show");
}

async function clickedBox(element){
    playBoard.style.pointerEvents = "none";
    addIconToSpan(element);
    userTakenSpots.sort();
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    await wait(randomDelayTime)
    botMove();
    playBoard.style.pointerEvents = "auto";
}

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
}

function botMove(){ 
    let freeSpots = []; 
    allBox.forEach((item, index)=> {
        if(item.childElementCount == 0)
            freeSpots.push(index);
    })
    let randomBox = freeSpots[Math.floor(Math.random() * freeSpots.length)];
    if(freeSpots.length > 0){
        addIconToSpan(allBox[randomBox], true);
        addMoveToMatrix(allBox[randomBox].className, botTakenSpotsMatrix);
    }

    if(checkForWinningCombination(botTakenSpotsMatrix)){
        console.log("El bot ganó la partida!");
    }
}

function addIconToSpan(element, isBot = false){
    let icon = `<i class="${userIcon}"></i>`;
    if(isBot){
        icon = `<i class="${botIcon}"></i>`;
        players.classList.remove("active");
    }else{
        players.classList.add("active");
    }
    element.innerHTML = icon;
    element.style.pointerEvents = "none"; // Una vez que el usuario seleccione un casilla no puede ser selecionada de nuevo
}

function checkForWinningCombination(takenSpots){
    const {rows, columns, mainDiagonal, oppositeDiagonal} = takenSpots;
    const checkSum = (element) => element === boardSize;
    const sumOfArrElements = (a,b) => a + b;

    return rows.some(checkSum) || columns.some(checkSum) || mainDiagonal.reduce(sumOfArrElements,0) === boardSize 
        || oppositeDiagonal.reduce(sumOfArrElements,0) === boardSize;
}

function addMoveToMatrix(spotInMatrix, matrix){
    let spotInfo = (spotInMatrix).split("-")
    let row = parseInt(spotInfo[0])
    let column = parseInt(spotInfo[1])
    
    matrix.rows[row]++;
    matrix.columns[column]++;
    
    if(row === column){
        matrix.mainDiagonal[column]++;
    }

    if((row + column + 1) === boardSize){
        matrix.oppositeDiagonal[row]++;
    }
}


