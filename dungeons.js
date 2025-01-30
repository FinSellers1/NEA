const tileSize = 48
let goingThroughDoor = false
let movementActive = true
let camy = 169
let camx = 216
let whichLevel = 0
let countR = 0, countL = 0, countU = 0, countD = 0
let floorImg, wallImg, stairsImg
let walls, Wall, floors, brickFloor, stairs, Doors, rightDoor, leftDoor, upDoor, downDoor, tileMap, leftLimiter, rightLimiter, upLimiter, downLimiter
let countdownTime = 0.15; // Countdown time in seconds
let startTime;
let isCountingDown = false;
let swing = false
let swordLeft = false
let timerOver = true
let idleHorizontal = true
let idleVertical = true
let swordBoundary = 111
let sLeft = false
let sRight = false
const levels = [
  [
    "======================================================================..............................",
    "=________==________==________==________==________==________==________=..............................",
    "=________==________==________==________==________==________==________=..............................",
    "=________><________><________><________==________><________><________=..............................",
    "=________><________><________><________==________><________><________=..............................",
    "=_S______==________==________==________==________==________==________=..............................",
    "=________==________==________==________==________==________==________=..............................",
    "==============vv========vv============================vv========vv====..............................",
    "..........====^^========^^============================^^========^^==================================",
    "..........=________==________==________==________==________==________==________==________==________=",
    "..........=________==________==________==________==________==________==________==________==________=",
    "..........=________==________><________><________><________==________><________><________><________=",
    "..........=________==________><________><________><________==________><________><________><________=",
    "..........=________==________==________==________==________==________==________==________==________=",
    "..........=________==________==________==________==________==________==________==________==________=",
    "..........====vv==================vv================================================================",
    "==============^^====..........====^^====....................====================....................",
    "=________==________=..........=________=....................=__________________=....................",
    "=________==________=..........=________=....................=__________________=....................",
    "=________><________=..........=________=....................=__________________=....................",
    "=________><________=..........=________=....................=__________________=....................",
    "=________==________=..........=________=....................=__________________=....................",
    "=________==________=..........=________=....................=__________________=....................",
    "====vv==============..........====vv====....................=__________________=....................",
    "====^^====..........==============^^====....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "=________=..........=________==________=....................=__________________=....................",
    "====vv====..........====vv==============....................====vv==============....................",
    "====^^==================^^======================================^^====..............................",
    "=________==________==________==________==________==________==________=..............................",
    "=________==________==________==________==________==________==________=..............................",
    "=________><________><________><________><________==________><________=..............................",
    "=________><________><________><________><________==________><________=..............................",
    "=________==________==________==________==________==________==________=..............................",
    "=________==________==________==________==________==________==________=..............................",
    "============================================vv========vv==============..............................",
    "........................................====^^========^^========================....................",
    "........................................=________==________==________==________=....................",
    "........................................=________==________==________==________=....................",
    "........................................=________><________><________><________=....................",
    "........................................=________><________><________><________=....................",
    "........................................=________==________==________==______S_=....................",
    "........................................=________==________==________==________=....................",
    "........................................========================================....................",


  ]
]

function preload() {

  floorImg = loadImage('ZeldaTileMap.png')
  wallImg = loadImage('ZeldaWall.png')
  stairsImg = loadImage('stairsPic2.png')
  swordImg = loadImage('sword2.png')
  spriteImg = loadImage('spriteSheet.png')
  shieldImg = loadImage('sheild.png')
}


function guySetup(){
  guy = new Sprite(216,240,58,58,'d')
  guy.rotationLock = true
  guy.layer = 2
  guy.spriteSheet = spriteImg
  guy.anis.frameDelay = 4
  guy.addAnis({
    moveDown: {row:0, frames:4},
    moveUp: {row:1, frames:4},
    moveLeft: {row:2, frames:4},
    moveRight: {row:3, frames:4},
    idle:{row:0, frames:1}
  })
  guy.scale = 0.7
}

function swordSetup(){
  startTime = millis(); // Record the start time
  sword = new Sprite(342,351,220,1240,'d')
  rotationSensor = new Sprite(342,351,8,30,'d')
  sword.img = swordImg
  sword.scale = 0.025
  sword.layer = 3
  rotationSensor.scale = 0.025
  sword.offset.y = -12
  rotationSensor.offset.y = (-((50/350)*100)) + 3
  sword.img.offset.y = -450
  rotationSensor.visible = false
  sword.mass = 0

  //sword.debug = true
  //rotationSensor.debug = true
  //allSprites.debug = true
}

function shieldSetup(){
  shield = new Sprite(358,351,17.4,21.8,'d')
  shield.rotationLock = true
  shield.layer = 2
  shield.img = shieldImg
  shield.scale = 0.025/2.1
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
  stairLimits()
  guySetup()
  swordSetup()
  shieldSetup()
  tileMap.layer = 1

  sword.overlaps(guy)
  rotationSensor.overlaps(guy)
  shield.overlaps(guy)
  sword.overlaps(rotationSensor)
  shield.overlaps(rotationSensor)
  sword.overlaps(shield)

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
  swordDraw()
}


function swordDraw(){
  swordSwing()  // Function for swinging the sword 
  rotationSensor.rotateMinTo(mouse, 10, 90);  // Locks rotationSensor to orientate to the mouse 
  swordRotation()  // Function for moving the sword 
  swordMirroring()  // Function for turning the sword image left and right 
}

function swordRotation(){
  if((rotationSensor.rotation >= swordBoundary || rotationSensor.rotation <= -swordBoundary) && swing == false){
    if(rotationSensor.rotation >= swordBoundary){
      sword.rotation = swordBoundary
    }
    else if(rotationSensor.rotation <= -swordBoundary){
      sword.rotation = -swordBoundary
    }
  }
  else if (rotationSensor.rotation < swordBoundary || rotationSensor.rotation > -swordBoundary){
      if (swing == false) sword.rotation = rotationSensor.rotation
  }
}


function swordMirroring(){
  if(rotationSensor.rotation >=0 && swing == false && swordLeft == true){
    sword.mirror.x = false
    swordLeft = false
  }
  else if(rotationSensor.rotation <0 && swing == false && swordLeft == false){
    sword.mirror.x = true
    swordLeft = true
  }
  else{
    if(swordLeft == true){
      sword.mirror.x = true
    }
    else{
      sword.mirror.x = false
    }
  }
}


function swordSwing(){
  if(mouse.presses() && timerOver == true && sLeft == false && sRight == false){
    startTime = millis();
    isCountingDown = true;
    swing = true
    if(swordLeft == true){
      if(sword.rotation <=0 && sword.rotation >-10) sword.rotateMinTo(sword.rotation - 90, 20);
      if(sword.rotation <=-10 && sword.rotation >-20) sword.rotateMinTo(sword.rotation - 80, 20);
      if(sword.rotation <=-20 && sword.rotation >-30) sword.rotateMinTo(sword.rotation - 70, 20);
      if(sword.rotation <=-30 && sword.rotation >-40) sword.rotateMinTo(sword.rotation - 65, 20);
      if(sword.rotation <=-40 && sword.rotation >-50) sword.rotateMinTo(sword.rotation - 60, 20);
      if(sword.rotation <=-50 && sword.rotation >-60) sword.rotateMinTo(sword.rotation - 55, 20);
      if(sword.rotation <=-60 && sword.rotation >-70) sword.rotateMinTo(sword.rotation - 50, 20);
      if(sword.rotation <=-70 && sword.rotation >-80) sword.rotateMinTo(sword.rotation - 40, 20);
      if(sword.rotation <=-80 && sword.rotation >-90) sword.rotateMinTo(sword.rotation - 30, 20);
      if(sword.rotation <=-90 && sword.rotation >-100) sword.rotateMinTo(sword.rotation - 20, 20);
      if(sword.rotation <=-100 && sword.rotation >-110) sword.rotateMinTo(sword.rotation - 10, 20);
      if(sword.rotation <=-110) sword.rotateMinTo(sword.rotation - 10, 20);
    }
    else{
      if(sword.rotation >=0 && sword.rotation <10) sword.rotateMinTo(sword.rotation + 90, 20);
      if(sword.rotation >=10 && sword.rotation <20) sword.rotateMinTo(sword.rotation + 80, 20);
      if(sword.rotation >=20 && sword.rotation <30) sword.rotateMinTo(sword.rotation + 70, 20);
      if(sword.rotation >=30 && sword.rotation <40) sword.rotateMinTo(sword.rotation + 65, 20);
      if(sword.rotation >=40 && sword.rotation <50) sword.rotateMinTo(sword.rotation + 60, 20);
      if(sword.rotation >=50 && sword.rotation <60) sword.rotateMinTo(sword.rotation + 55, 20);
      if(sword.rotation >=60 && sword.rotation <70) sword.rotateMinTo(sword.rotation + 50, 20);
      if(sword.rotation >=70 && sword.rotation <80) sword.rotateMinTo(sword.rotation + 40, 20);
      if(sword.rotation >=80 && sword.rotation <90) sword.rotateMinTo(sword.rotation + 30, 20);
      if(sword.rotation >=90 && sword.rotation <100) sword.rotateMinTo(sword.rotation + 20, 20);
      if(sword.rotation >=100 && sword.rotation <110) sword.rotateMinTo(sword.rotation + 10, 20);
      if(sword.rotation >=110) sword.rotateMinTo(sword.rotation + 10, 20);
    }
    timerOver = false
  }
  else if(mouse.presses() && timerOver == true && sLeft == true && sRight == false){
    startTime = millis();
    isCountingDown = true;
    swing = true
    if(sword.rotation <=0 && sword.rotation >-10) sword.rotateMinTo(sword.rotation - 90, 20);
    if(sword.rotation <=-10 && sword.rotation >-20) sword.rotateMinTo(sword.rotation - 80, 20);
    if(sword.rotation <=-20 && sword.rotation >-30) sword.rotateMinTo(sword.rotation - 70, 20);
    if(sword.rotation <=-30 && sword.rotation >-40) sword.rotateMinTo(sword.rotation - 65, 20);
    if(sword.rotation <=-40 && sword.rotation >-50) sword.rotateMinTo(sword.rotation - 60, 20);
    if(sword.rotation <=-50 && sword.rotation >-60) sword.rotateMinTo(sword.rotation - 55, 20);
    if(sword.rotation <=-60 && sword.rotation >-70) sword.rotateMinTo(sword.rotation - 50, 20);
    if(sword.rotation <=-70 && sword.rotation >-80) sword.rotateMinTo(sword.rotation - 40, 20);
    if(sword.rotation <=-80 && sword.rotation >-90) sword.rotateMinTo(sword.rotation - 30, 20);
    if(sword.rotation <=-90 && sword.rotation >-100) sword.rotateMinTo(sword.rotation - 20, 20);
    if(sword.rotation <=-100 && sword.rotation >-110) sword.rotateMinTo(sword.rotation - 10, 20);
    if(sword.rotation <=-110 && sword.rotation >-112) sword.rotateMinTo(sword.rotation - 10, 20);
    timerOver = false
  }
  else if(mouse.presses() && timerOver == true && sLeft == false && sRight == true){
    startTime = millis();
    isCountingDown = true;
    swing = true
    if(sword.rotation >=0 && sword.rotation <10) sword.rotateMinTo(sword.rotation + 90, 20);
    if(sword.rotation >=10 && sword.rotation <20) sword.rotateMinTo(sword.rotation + 80, 20);
    if(sword.rotation >=20 && sword.rotation <30) sword.rotateMinTo(sword.rotation + 70, 20);
    if(sword.rotation >=30 && sword.rotation <40) sword.rotateMinTo(sword.rotation + 65, 20);
    if(sword.rotation >=40 && sword.rotation <50) sword.rotateMinTo(sword.rotation + 60, 20);
    if(sword.rotation >=50 && sword.rotation <60) sword.rotateMinTo(sword.rotation + 55, 20);
    if(sword.rotation >=60 && sword.rotation <70) sword.rotateMinTo(sword.rotation + 50, 20);
    if(sword.rotation >=70 && sword.rotation <80) sword.rotateMinTo(sword.rotation + 40, 20);
    if(sword.rotation >=80 && sword.rotation <90) sword.rotateMinTo(sword.rotation + 30, 20);
    if(sword.rotation >=90 && sword.rotation <100) sword.rotateMinTo(sword.rotation + 20, 20);
    if(sword.rotation >=100 && sword.rotation <110) sword.rotateMinTo(sword.rotation + 10, 20);
    if(sword.rotation >=110 && sword.rotation <112) sword.rotateMinTo(sword.rotation + 10, 20);
    timerOver = false
  }
  if (isCountingDown) {
    let elapsedTime = millis() - startTime;
    let remainingTime = countdownTime * 1000 - elapsedTime; // Convert to milliseconds
    
    if (remainingTime <= ((countdownTime/2)+20) && remainingTime >= ((countdownTime/2)-20)) {
      if(swordLeft == true){
        sword.rotateMinTo(sword.rotation + 10, 10);
      }
      else{
        sword.rotateMinTo(sword.rotation - 10, 10);
      }
    }

    if (remainingTime <= 0) {
      remainingTime = 0;
      isCountingDown = false; // Stop the countdown when it reaches zero
      swing = false
      timerOver = true
    }
    //console.log(remainingTime)
  } 
}


function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}


function Movement() {
  if (movementActive == true){
    if (kb.pressing('a')) {
      guy.vel.x = -3
      //sword.vel.x = -3
      //rotationSensor.vel.x = -3
      idleHorizontal = false
      GuyAnimation(1)
    }
    else if (kb.pressing('d')) {
      guy.vel.x = 3
      //sword.vel.x = 3
      //rotationSensor.vel.x = 3
      idleHorizontal = false
      GuyAnimation(2)
    }

    else {
      guy.vel.x = 0
      //sword.vel.x = 0
      //rotationSensor.vel.x = 0
      idleHorizontal = true
      GuyAnimation(5)
    }
    if (kb.pressing('s')) {
      guy.vel.y = 3
      //sword.vel.y = 3
      //rotationSensor.vel.y = 3
      idleVertical = false
      GuyAnimation(3)
    }
    else if (kb.pressing('w')) {
      guy.vel.y = -3
      //sword.vel.y = -3
      //rotationSensor.vel.y = -3
      idleVertical = false
      GuyAnimation(4)
    }
    else {
      guy.vel.y = 0
      //sword.vel.y = 0
      //rotationSensor.vel.y = 0
      idleVertical = true
      GuyAnimation(5)
    }
  }
}


function GuyAnimation(pMovement){
  let movement = pMovement 
  if (movement == 1 && idleHorizontal == false){
    guy.ani = 'moveLeft'
    goingLeft = true
    goingRight = false
    guy.layer = 3
    sword.layer = 2
    shield.layer = 4
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x - 5)
    shield.y = (guy.y + 2)
  }
  if (movement == 2 && idleHorizontal == false){
    guy.ani = 'moveRight'
    goingLeft = false
    goingRight = true
    guy.layer = 3
    sword.layer = 4
    shield.layer = 2
    sword.x = (guy.x + 5 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x + 5 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 3 && idleVertical == false){
    guy.ani = 'moveDown'
    goingLeft = false
    goingRight = false
    guy.layer = 2
    sword.layer = 4
    shield.layer = 3
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 4 && idleVertical == false){
    guy.ani = 'moveUp'
    goingLeft = false
    goingRight = false
    guy.layer = 4
    sword.layer = 2
    shield.layer = 3
    sword.x = (guy.x + 5 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x + 5 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x - 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 5 && idleVertical == true && idleHorizontal == true){
    guy.ani = 'idle'
    goingLeft = false
    goingRight = false
    guy.layer = 2
    sword.layer = 3
    shield.layer = 2
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
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