const 
    selectBox = document.querySelector(".select-box"), 
    selectXBtn = selectBox.querySelector(".playerX"), 
    selectOBtn = selectBox.querySelector(".playerO"), 
    playBoard = document.querySelector(".play-board"),
    allBox = document.querySelectorAll("section span"), 
    players = document.querySelector(".players"), 
    playerXIcon = "fas fa-times", 
    playerOIcon = "fas fa-circle";


var userIsPlayingAs = "X";
var userIcon = playerXIcon; 
var botIcon = playerOIcon;
var userTakenSpots = [];


searchForWinningCombinatios([ 1, 7, 8, 9 ]);

allBox.forEach(item => {
    item.addEventListener('click', event => {
        userTakenSpots.push(parseInt(item.className));
        clickedBox(item)
    })
})

selectXBtn.addEventListener('click', event => {
    selectBox.classList.add("hide")
    playBoard.classList.add("show");
})

selectOBtn.onclick = () =>{
    selectBox.classList.add("hide")
    playBoard.classList.add("show");
    players.setAttribute("class", "players active player");
    userIsPlayingAs = "O";
    userIcon = playerOIcon; 
    botIcon = playerXIcon;
}


async function clickedBox(element){
    playBoard.style.pointerEvents = "none";
    addIconToSpan(element);
    userTakenSpots.sort();
    if(userTakenSpots.length >= 3){
        if(searchForWinningCombinatios(userTakenSpots))
            console.log("El jugador: " + userIsPlayingAs + " Ha ganado.");
    }
    console.log(userTakenSpots);
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    await wait(randomDelayTime)
    bot();
    playBoard.style.pointerEvents = "auto";
}

async function wait(ms) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
}

function bot(){ 
    let freeSpots = []; 
    allBox.forEach((item, index)=> {
        if(item.childElementCount == 0)
            freeSpots.push(index);
    })
    let randomBox = freeSpots[Math.floor(Math.random() * freeSpots.length)];
    if(freeSpots.length > 0){
        addIconToSpan(allBox[randomBox], true);
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

function searchForWinningCombinatios(array){ 
    if(array.length === 3){
        return isWinningCombination(array);
    }

    for (let index = 0; index < 4; index++) {
        let tempArray = [...array] // En js, los arreglos son valores de referencia, por lo cual si se usa =, ambas variables estarán apuntando al mismo objeto
        tempArray.splice(index, 1);
        if(isWinningCombination(tempArray)){ 
            return true;
        }
    }

    return false;
}

function isWinningCombination(spots){
    return consecutive(spots) || consecutive(spots, 3) || consecutive(spots, 4) || isDiagonal(spots);
}

function consecutive(array, difference = 1) {
    var i = 2, d;
    while (i < array.length) {
        d = (array[i - 1]) - array[i - 2];
        if (Math.abs(d) === difference && d === array[i] - array[i - 1]) {
            return true;
        }
        i++;
    }
    return false;
}

function isDiagonal(array){ 
    return array.reduce((a,b) => a + b, 0) == 15;
}