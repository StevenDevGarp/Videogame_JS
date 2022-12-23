const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnDown = document.querySelector('#down');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');

let canvasSize;
let elementSize;

const playesPosition ={
    x: undefined,
    y: undefined
}

const  giftPosition = {
    x: undefined,
    y: undefined
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function setCanvasSize(){

    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('Width', canvasSize);
    canvas.setAttribute('Height', canvasSize);


    elementSize = canvasSize / 10; 

    startGame();

}

function startGame(){
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    
    const mapper = maps[0].match(/[IXO\-]+/g).map(x => x.split(""));

    mapper.forEach((row, y) => {
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
              }

            movePlayer();
            game.fillText(emoji, posX, posY);
        });
        
    });

    
    
    
}

function renderMap(){
    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    const mapper = maps[0].match(/[IXO\-]+/g).map(x => x.split(""));

    mapper.forEach((row, y) => {
        row.forEach((col, x)  => {
            const emoji = emojis[col];
            const posX = elementSize *(x+1);
            const posY = elementSize *(y+1);
            game.fillText(emoji, posX, posY);
        });
        
    });
}

function movePlayer (){
    const giftCollisionX = playesPosition.x == giftPosition.x;
    const giftCollisionY = playesPosition.y == giftPosition.y;
    const giftCollision = giftCollisionX && giftCollisionY;
  
    if (giftCollision) {
        console.log('Subiste de nisvel!');
    }

    game.fillText(emojis['PLAYER'], playesPosition.x, playesPosition.y);
}

function clearMap(){
    game.clearRect(0, 0, canvasSize, canvasSize,)
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
    if ((playesPosition.y - elementSize) < elementSize){
        console.log('OUT');
    }else{
    clearMap();
    renderMap();
    playesPosition.y -= elementSize;
    movePlayer();
    }
}
function moveDown (){
    if ((playesPosition.y + elementSize) > canvasSize){
        console.log('OUT');
    }else{
    clearMap();
    renderMap();
    playesPosition.y += elementSize;
    movePlayer();
    }
}
function moveLeft (){
    if ((playesPosition.x - elementSize) < elementSize){
        console.log('OUT');
    }else{
    clearMap();
    renderMap();
    playesPosition.x -= elementSize;
    movePlayer();
    }
}
function moveRight (){
    if ((playesPosition.x + elementSize) > canvasSize){
        console.log('OUT');
    }else{
    clearMap();
    renderMap();
    playesPosition.x += elementSize;
    movePlayer();
    }
}

