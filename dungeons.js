const tileSize = 48
let goingThroughDoor = false
let movementActive = true
let camy = 169
let camx = 216
let whichLevel = 0
let countR = 0, countL = 0, countU = 0, countD = 0
let floorImg, wallImg, stairsImg
let walls, Wall, floors, brickFloor, stairs, Doors, rightDoor, leftDoor, upDoor, downDoor, tileMap, leftLimiter, rightLimiter, upLimiter, downLimiter
const levels = [
  [
    "============================================================",
    "=________==________==________==________==________==________=",
    "=________==________==________==________==________==________=",
    "=________><________><________><________><________><________=",
    "=________><________><________><________><________><________=",
    "=_S______==________==________==________==________==________=",
    "=________==________==________==________==________==________=",
    "====vv========vv========vv========vv========vv========vv====",
    "====^^========^^========^^========^^========^^========^^====",
    "=________==________==________==________==________==________=",
    "=________==________==________==________==________==________=",
    "=________><________><________><________><________><________=",
    "=________><________><________><________><________><________=",
    "=________==________==________==________==________==________=",
    "=________==________==________==________==________==________=",
    "============================================================",
  ]
]

function preload() {

  floorImg = loadImage('ZeldaTileMap.png')
  wallImg = loadImage('ZeldaWall.png')
  stairsImg = loadImage('stairsPic2.png')

}


function guySetup(){
 guy = new Sprite(216,240,20,20)
 guy.rotationLock = true
}


function stairLimits(){
  leftLimiter = new Sprite(121, 240, 1, 50, 's');
  upLimiter = new Sprite(96, 265, 48, 1, 's');
  downLimiter = new Sprite(96, 215, 48, 1, 's');
  leftLimiter.visible = false;
  upLimiter.visible = false;
  downLimiter.visible = false;
}


function Map_Setup() {

  walls = new Group();
  walls.collider = 's'
  walls.w = tileSize
  walls.h = tileSize

  Wall = new walls.Group()
  Wall.tile = '='
  Wall.img = wallImg

  floors = new Group();
  floors.collider = 'none'
  floors.w = tileSize
  floors.h = tileSize

  brickFloor = new floors.Group()
  brickFloor.tile = '_'
  brickFloor.img = floorImg

  stairs = new floors.Group()
  stairs.tile = 'S'
  stairs.img = stairsImg

  Doors = new Group();
  Doors.collider = 'none'
  Doors.w = tileSize
  Doors.h = tileSize
  
  rightDoor = new Doors.Group()
  rightDoor.tile = '>'
  rightDoor.img = floorImg

  leftDoor = new Doors.Group()
  leftDoor.tile = '<'
  leftDoor.img = floorImg

  downDoor = new Doors.Group()
  downDoor.tile = 'v'
  downDoor.img = floorImg

  upDoor = new Doors.Group()
  upDoor.tile = '^'
  upDoor.img = floorImg

}

function dungeonCameraSetup() {
  camera.x = camx
  camera.y = camy
  camera.zoom = 1
}

function setup() {
  createCanvas(480, 384, 'pixelated');
  // createCanvas(480, 384);
  dungeonCameraSetup()
  Map_Setup()

  tileMap = new Tiles(levels[whichLevel],0, 0, tileSize, tileSize)
  guySetup()
  stairLimits()

  let sensors = new Group();
  topSensor = new sensors.Sprite(guy.x, guy.y - 8)
  bottomSensor = new sensors.Sprite(guy.x, guy.y + guy.h/2 - 1)
  leftSensor = new sensors.Sprite(guy.x - guy.w/2 + 1, guy.y)
  rightSensor = new sensors.Sprite(guy.x + guy.w/2 - 1, guy.y)
 
  topSensor.w = guy.w/3
  topSensor.h = 2
  bottomSensor.w = guy.w/1.5
  bottomSensor.h = 2
  leftSensor.w = 1;
  leftSensor.h = guy.h/2
  rightSensor.w = 1;
  rightSensor.h = guy.h/2
 
  bottomSensor.visible = false;
  topSensor.visible = false;
  leftSensor.visible = false;
  rightSensor.visible = false;
 
  bottomJoint = new GlueJoint(guy, bottomSensor)
  topJoint = new GlueJoint(guy, topSensor)
  leftJoint = new GlueJoint(guy, leftSensor)
  rightJoint = new GlueJoint(guy, rightSensor)
  topJoint.visible = false;
  bottomJoint.visible = false;
  leftJoint.visible = false;
  rightJoint.visible = false;


  leftSensor.overlaps(rightDoor, () => moveCamera(1, 0, 3))>0
  rightSensor.overlaps(leftDoor, () => moveCamera(-1, 0, 3))>0
  topSensor.overlaps(downDoor, () => moveCamera(0, 1, 3))>0
  bottomSensor.overlaps(upDoor, () => moveCamera(0, -1, 3))>0

}

function draw() {
  clear()
  if (goingThroughDoor == true){
    movementActive = false
  }
  else{
    movementActive = true
  }
  Movement()
  if (guy.overlaps(stairs)){
   exitDungeon()
 }
}


function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


function Movement() {
  if (movementActive == true){
    if (kb.pressing('a')) {
      guy.vel.x = -3
    }
    else if (kb.pressing('d')) {
    guy.vel.x = 3
  }
   else {
     guy.vel.x = 0
   }
   if (kb.pressing('s')) {
     guy.vel.y = 3
   }
   else if (kb.pressing('w')) {
     guy.vel.y = -3
   }
   else {
     guy.vel.y = 0
   }
  }
 else{
   if (kb.pressing('a')) {
    guy.vel.x = 0
   }
   else if (kb.pressing('d')) {
     guy.vel.x = 0
   }
   else {
     guy.vel.x = 0
   }
   if (kb.pressing('s')) {
     guy.vel.y = 0
   }
   else if (kb.pressing('w')) {
     guy.vel.y = 0
   }
   else {
     guy.vel.y = 0
   }
 }
}

async function moveCamera(dirX = 0, dirY = 0, speed = 1){
 console.log(dirX)
 console.log(dirY)
 dirX = Math.round(dirX)
 dirY = Math.round(dirY)
 dirX = Math.min(Math.max(dirX, -1), 1)
 dirY = Math.min(Math.max(dirY, -1), 1)
  if (!goingThroughDoor){
   goingThroughDoor = true;
   if(dirX){
     for(let i = 0;i < 480 / Math.abs(speed);i++){
       camera.x = camera.x + speed * dirX
       guy.x = guy.x + speed/4 * dirX
       await delay(0.5)
     }
   }
   if(dirY){
     for(let i = 0;i < 384 / Math.abs(speed);i++){
       camera.y = camera.y + speed * dirY
       guy.y = guy.y + speed/3 * dirY
       await delay(0.5)
     }
   }
   goingThroughDoor = false;
 }
}

function exitDungeon(){
    window.open("game.html", "_self")
}