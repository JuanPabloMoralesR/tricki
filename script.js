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

allBox.forEach(item => {
    item.addEventListener('click', event => {
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
    console.log(freeSpots)
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