const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const livesSpan = document.querySelector('#lives');
const timeSpan = document.querySelector('#time');
const recordSpan = document.querySelector('#record');

let canvasSize;
let elementSize;
let level = 0;
let lives = 3;

let timeStart= 0 ;
let timePlayer;
let timeInterval;

const playesPosition ={
    x: undefined,
    y: undefined
}

const  giftPosition = {
    x: undefined,
    y: undefined
}



let enemyPositions = []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function setCanvasSize(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    }else{
        canvasSize = window.innerHeight * 0.7;
    }

    canvas.setAttribute('Width', canvasSize);
    canvas.setAttribute('Height', canvasSize);


    elementSize = canvasSize / 10; 

    playesPosition.x = undefined
    playesPosition.y = undefined
    startGame();

}

function startGame(){
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    

    const mapper = maps[level]    
    if(!mapper){
        gameWin();
        return;
    }


    if (!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
    }

    recordSpan.innerHTML = localStorage.record;           
    const map = mapper.match(/[IXO\-]+/g).map(x => x.split(""));



    game.clearRect(0, 0, canvasSize, canvasSize,)
    enemyPositions = [];
    map.forEach((row, y) => {
        row.forEach((col, x)  => {
            const emoji = emojis[col];
            const posX = elementSize *(x+1);
            const posY = elementSize *(y+1);
            
            
            if (col == 'O') {
                if (!playesPosition.x && !playesPosition.y) {
                  playesPosition.x = posX;
                  playesPosition.y = posY;
                  console.log({playesPosition});
                }
              } else if (col == 'I') {
                giftPosition.x = posX;
                giftPosition.y = posY;
              } else if (col == 'X'){
                enemyPositions.push({
                    x: posX,
                    y: posY,
                }); 
              }
            game.fillText(emoji, posX, posY);
        });
        
    });
    showLives();
    movePlayer();
    
}


function movePlayer (){
    const xCollision = playesPosition.x.toFixed(1) == giftPosition.x.toFixed(1);
    const yCollision = playesPosition.y.toFixed(1) == giftPosition.y.toFixed(1);
    const giftCollision = xCollision && yCollision;
    
    if (giftCollision) {
          levelWin();
      }

    const enemyCollision = enemyPositions.find( enemy => {
        const enemyCollisionX = enemy.x.toFixed(1) == playesPosition.x.toFixed(1);
        const enemyCollisionY = enemy.y.toFixed(1) == playesPosition.y.toFixed(1);
        return enemyCollisionX && enemyCollisionY;
    })

    if (enemyCollision){
        levelFail();
    }

    game.fillText(emojis['PLAYER'], playesPosition.x, playesPosition.y);
}

function levelWin () {
    //alert("pasaste de nivel");
    level++;
    startGame();
}

function gameWin(){
    showRecord();
    clearInterval(timeInterval);
    //startGame();
    
}

function showLives(){
    livesSpan.innerHTML = emojis['HEART'].repeat(lives)
}

function levelFail(){
    lives --;
    


    if(lives <= 0){
        level = 0;
        lives = 3;
        timeStart = undefined;
   
    }else{
        
    }playesPosition.x = undefined;
    playesPosition.y = undefined;
    startGame(); 

}

function showTime(){
    timePlayer = Date.now() - timeStart;
    timeSpan.innerHTML = timePlayer;
}

function showRecord(){
    
    if(timePlayer < localStorage.getItem('record')){
        localStorage.setItem('record', timePlayer);

        alert('sos la mera tos con flema superaste a tu tata')
    }else{
        alert('No superaste el tiempo :(');
    }
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight') moveRight();
  else if (event.key == 'ArrowDown') moveDown();
}

function moveUp (){
    if ((playesPosition.y - (elementSize-1)) < elementSize){
        console.log('OUT');
    }else{
    playesPosition.y -= elementSize;
    startGame();
    }
}
function moveDown (){
    if ((playesPosition.y + elementSize) > canvasSize){
        console.log('OUT');
    }else{
    playesPosition.y += elementSize;
    startGame();
    }
}
function moveLeft (){
    if ((playesPosition.x - (elementSize-1)) < elementSize){
        console.log('OUT');
    }else{
    playesPosition.x -= elementSize;
    startGame();
    }
}
function moveRight (){
    if ((playesPosition.x + (elementSize-1)) > canvasSize){
        console.log('OUT');
    }else{
    playesPosition.x += elementSize;
    startGame();
    }
}
