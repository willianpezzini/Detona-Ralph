const state = {
    view: {
        square: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values: {
        timerId: null,
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        curretTime:60,
    },
    actions: {
        conntDownTimeId: setInterval(countDown, 1000),
    }
};

function playSound(){
    let audio = new Audio("./src/audios/hit.m4a")
    audio.volume = 0.1;
    audio.play();
}

function countDown() {
    state.values.curretTime--;
    state.view.timeLeft.textContent = state.values.curretTime

    if (state.values.curretTime <= 0) {
        clearInterval(state.actions.conntDownTimeId)
        clearInterval(state.values.timerId)
        alert("Game Over! O seu resultado foi: " + state.values.result)
    }
}

function randomSquare(){
    state.view.square.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.square[randomNumber];
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id;

}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox() {
    state.view.square.forEach((square) => {
        square.addEventListener("mousedown", () =>{
            if(square.id === state.values.hitPosition) {
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound();

            }
        })    
    })
}
function initialize() {
    moveEnemy();
    addListenerHitBox();
}

initialize();