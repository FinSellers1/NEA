let newGameButton
let loadGameButton
let settingsButton

function preload() {

    backgroundImg = loadImage('backgroundImg11.png')
  
}

function setup() {
    createCanvas(480, 384, 'pixelated');
    // createCanvas(480, 384);
    background(backgroundImg)

    newGameButton = createButton("New Game")
    newGameButton.class("button")
    newGameButton.position(800,470)
    newGameButton.mousePressed(newGame)

    loadGameButton = createButton("Load Game")
    loadGameButton.class("button")
    loadGameButton.position(800,520)
    loadGameButton.mousePressed(loadGame)

    settingsButton = createButton("Settings")
    settingsButton.class("button")
    settingsButton.position(800,570)
    settingsButton.mousePressed(settings)

}

function draw() {

}


function newGame(){
    window.open("game.html", "_self")
}
function loadGame(){
    window.open("game.html", "_self")
}
function settings(){
    window.open("game.html", "_self")
}