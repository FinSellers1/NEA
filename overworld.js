const tileSize = 18
let movementActive = true
let walls, wall, floors, tileMap, grass, boundary, doors, trapDoorTL, trapDoorTR, trapDoorBL, trapDoorBR
let wallImg, grassImg, boundaryImg, trapDoorOpenTLImg, trapDoorOpenTRImg,trapDoorOpenBLImg, shieldImg, trapDoorOpenBRImg, trapDoorClosedTLImg, trapDoorClosedTRImg, trapDoorClosedBLImg, trapDoorClosedBRImg
let countdownTime = 0.15; // Countdown time in seconds
let countdownTime2 = 3
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
let lives = 5
let barInsideXPOS = 0 
let doSpinMove = false
let barFull = false
let swordStop = false
let bossFightArea = false
let shieldActive = false
let spinMoveActive = false
let weapon = 1
let countdownTime3 = 0.5
let bowStop = true
let bow, arrow
let arrowSpin = true
let arrowNeeded = true
let shootHugeArrow = false
let hugeArrowActive = false
let firstArrow = false

function preload() {

  grassImg = loadImage('zeldaGrass.png')
  sandImg = loadImage('sandImg.png')
  waterImg = loadImage('water2.png')
  wallUpperImg = loadImage('wallUpperImg.png')
  wallLowerImg = loadImage('wallLowerImg.png')
  wallMidImg = loadImage('wallMidImg.png')
  boundaryImg = loadImage('ZeldaWall.png')
  trapDoorClosedTLImg = loadImage('ClosedTrapDoorTL.png')
  trapDoorClosedTRImg = loadImage('ClosedTrapDoorTR.png')
  trapDoorClosedBLImg = loadImage('ClosedTrapDoorBL.png')
  trapDoorClosedBRImg = loadImage('ClosedTrapDoorBR.png')
  trapDoorOpenTLImg = loadImage('OpenTrapDoorTL.png')
  trapDoorOpenTRImg = loadImage('OpenTrapDoorTR.png')
  trapDoorOpenBLImg = loadImage('OpenTrapDoorBL.png')
  trapDoorOpenBRImg = loadImage('OpenTrapDoorBR.png')
  stairsImg = loadImage('stairsPic2.png')
  swordImg = loadImage('sword2.png')
  spriteImg = loadImage('spriteSheet.png')
  shieldImg = loadImage('sheild.png')
  heartsImg = loadImage('heartsSpritesheet3.png')
  //shieldImg3 = loadImage('sheild.png')
  bowImg = loadImage('bowImage2.png')
  arrowImg = loadImage('arrowImage3.png')

}


function testEnemySetup(){
  enemy = new Sprite(100,200,40,40,'d')
  enemy.layer = 2
}


function BowSetup(){
  bow = new Sprite(342,351,104,269,'d')
  bRotationSensor = new Sprite(342,351,8,30,'d')
  bow.img = bowImg
  bow.scale = 0.5/4
  bow.layer = 3
  bRotationSensor.visible = false
  
  //bow.debug = true
  //bRotationSensor.debug = true
  //allSprites.debug = true
  //arrow = new Sprite(342, 351, 280, 80, 'd');
  arrow = new Sprite(342, 351, 60, 10, 'd');
  arrow.bigArrow = false
  arrow.layer = 4
  arrow.img = arrowImg
  arrow.scale = 0.3/4
}


function guySetup(){
  guy = new Sprite(350,350,58,58,'d')
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

function lifeHeartsSetup(){
  hearts = new Sprite(100,100,547,(532/5),'n')
  hearts.rotationLock = true
  hearts.layer = 6
  hearts.spriteSheet = heartsImg
  hearts.addAnis({
    5: {row:0, frames:1},
    4: {row:1, frames:1},
    3: {row:2, frames:1},
    2: {row:3, frames:1},
    1: {row:4, frames:1},
  })
  hearts.scale = 0.2
}

function spinMoveSetup(){
  barOutline = new Sprite(guy.x - 50,guy.y - 165,100,20,'n')
  barInside = new Sprite(guy.x - 97,guy.y - 165,2,14,'n')
  barOutline.visible = false
  barInside.visible = false
  barOutline.color = 'black'
  barInside.color = 'red'
  barOutline.layer = 6
  barInside.layer = 7
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
  shieldIndicator = new Sprite(guy.x - 90,guy.y - 165,100,20,'n')
  shieldIndicator.img = shieldImg
  shieldIndicator.scale = 0.025/2.1
  shieldIndicator.visible = false
  shieldIndicator.layer = 7
}

function Map_Setup() {

  walls = new Group();
  walls.collider = 's'
  walls.w = tileSize
  walls.h = tileSize

  boundary = new walls.Group()
  boundary.tile = 't'
  boundary.img = boundaryImg

  // wall = new walls.Group()
  // wall.tile = 'w'
  // wall.img = wallImg


  wallLower = new walls.Group()
  wallLower.tile = 'z'
  //wallLower.img = wallLowerImg
  wallLower.color = 'gray'

  floors = new Group();
  floors.collider = 'none'
  floors.w = tileSize
  floors.h = tileSize

  grass = new floors.Group()
  grass.tile = 'g'
  //grass.img = grassImg
  grass.color = 'green'

  stairsWall = new floors.Group()
  stairsWall.tile = 'Z'
  //stasirsWallall.img = 
  stairsWall.color = 'gray'

  wallMid = new floors.Group()
  wallMid.tile = 'b'
  //wallMid.img = wallMidImg
  wallMid.color = 'black'

  water = new floors.Group()
  water.tile = 'W'
  //water.img = waterImg
  water.color = 'blue'

  sand = new floors.Group()
  sand.tile = 'S'
  //sand.img = sandImg
  sand.color = 'yellow'

  wallMidtunnel = new floors.Group()
  wallMidtunnel.tile = 'B'
  //wallMidtunnel.img = wallMidImg
  wallMidtunnel.color = 'black'

  wallLowertunnel = new floors.Group()
  wallLowertunnel.tile = 'q'
  //wallLowertunnel.img = wallMidImg
  wallLowertunnel.color = 'gray'

  trapDoorTL = new floors.Group()
  trapDoorTL.tile = 'L'
  trapDoorTL.img = trapDoorClosedTLImg
  trapDoorTL.scale = 0.4

  trapDoorTR = new floors.Group()
  trapDoorTR.tile = 'R'
  trapDoorTR.img = trapDoorClosedTRImg
  trapDoorTR.scale = 0.4

  trapDoorBL = new floors.Group()
  trapDoorBL.tile = 'l'
  trapDoorBL.img = trapDoorClosedBLImg
  trapDoorBL.scale = 0.4

  trapDoorBR = new floors.Group()
  trapDoorBR.tile = 'r'
  trapDoorBR.img = trapDoorClosedBRImg
  trapDoorBR.scale = 0.4

  doors = new Group();
  doors.collider = 's'
  doors.w = tileSize
  doors.h = tileSize

  stairs = new floors.Group()
  stairs.tile = 'n'
  //stairs.img = stairsImg
  stairs.color = '#686767'
}

function Camera_Setup() {
  if ((guy.x > 936 && guy.x < 1220) && (guy.y > 900 && guy.y < 1058)){
    if (camera.x > 1062 && camera.x < 1094){
      camera.x = 1080
    }
    if (camera.y > 980){
      camera.y -=2.6
    }
    if(camera.zoom < 1.3){
      camera.zoom +=0.01
    }
    bossFightArea = true
  }
  else{
    if (guy.y > 1080 && camera.y != guy.y){
      camera.y +=2.6
    }
    if(camera.zoom > 1){
      camera.zoom -=0.01
    }
    camera.x = guy.x
    camera.y = guy.y 
    bossFightArea = false
  }
}

function setup() {
  createCanvas(480, 384, 'pixelated');
  Map_Setup()

  tileMap1 = new Tiles(
    ["gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "ggggggggggggggggggggz...zggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg",
    "zzzzzzzzzzzzzzzzzzzzz...zzzzzzzzzzzzzzzzzzzzzzzzzzzggggggggggggggggggggggggggggggggggggggggggggggggg",
    "bbbbbbbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggggggggggggggggggggggggg",
    "bbbbbbbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbzzzzzzzzzzzzzzzzzzzzzzzggggggggggggggggggggggggggg",
    "bbbbbbbbbbbbbbbbbbbbz...zbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggg",
    "zzzzzzzzzzzzzzzzzzzzzgggzzzzzzzzzzzzzzzzzzzzzzzbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggg",
    "zzzzzzzzzzzzzzzzzzzzzgggzzzzzzzzzzzzzzzzzzzzzzzbbbbbbbbbbbbbbbbbbbbbbbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggzbbbzzzzzzzzzzzzzzzzzzzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggggggggggggggzbbbzzzzzzzzzzzzzzzzzzzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggSSggggggggggggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggSWWWSggggggggggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggWWWWWWWSSSgggggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggWWWWWWWWWWWSgggzbbbzggggggggLRgggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggSWWWWWWWWWWSSggzbbbzgggggggglrgggggggzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggSWWWWWWWWWWWWSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggWWWWWWWWWWWWSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggWWWWWWWWWWWSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggWWWWWWWWWWSSggzbbbzgggggggggggggggggzbbbzggggggggggggggggggggggggggg",
    "gggggggggggggggggggggggggggggggggSWWWWWWWWSgggzbbbzggggggz...zggggggzbbbzggzzzzggggggggggggggggggggg",
    "ggggggggggggggggggggggggggggggggggSSSSWWWSggggzbbbzzzzzzzz...zzzzzzzzbbbzzzzbbnggzzzzzzzzzzzzzzzzzzz",
    "ggggggggggggggggggggggggggggggggggggSSSSSgggggzbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "ggggggggggggggggggggggggggggggggggggggggggggggzbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "gggggggggggggggz...zggggggggggggggggggggggggggzbbbbbbbbbbz...zbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
    "zzzzzzzzzzzzzzzz...zzzzzzzzzzzzzzzzzzzzzzzzzzzzbbbzzzzzzzzSSSzzzzzzzzzzzzzzzzzzznZZZzzzzzzzzzzzzzzzz",
    "bbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzzzzzzzzSSSzzzzzzzzzzzzzzzzzzzznZZzzzzzzzzzzzzzzzz",
    "bbbbbbbbbbbbbbbb...bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzSSSSSSSSSSSSSSSSSSSSSSSSSSSSzzznSSSSSSSSSSSSSSSSS",
    "bbbbbbbbbbbbbbbz...zbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbzSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "zzzzzzzzzzzzzzzzSSSzzzzzzzznZZZzzzzzzzzzzzzzzzzzzzzSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "zzzzzzzzzzzzzzzzSSSzzzzzzzzznZZzzzzzzzzzzzzzzzzzzzzSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSzzznSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "SSWWWWWWWWWWWWSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWSSSSSSSSSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWSSSSSSSSSSSSSSWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
    "WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW",
  ],16, 16, tileSize, tileSize)

  guySetup()
  spinMoveSetup()
  swordSetup()
  shieldSetup()
  lifeHeartsSetup()
  testEnemySetup()
  BowSetup()
  tileMap1.layer = 1

  sword.overlaps(guy)
  rotationSensor.overlaps(guy)
  shield.overlaps(guy)
  sword.overlaps(rotationSensor)
  shield.overlaps(rotationSensor)
  sword.overlaps(shield)
  bow.overlaps(guy)
  bow.overlaps(sword)
  bow.overlaps(rotationSensor)
  bow.overlaps(shield)
  bow.overlaps(bRotationSensor)
  shield.overlaps(bRotationSensor)
  bRotationSensor.overlaps(guy)
  sword.overlaps(bRotationSensor)
  rotationSensor.overlaps(bRotationSensor)
  arrow.overlaps(sword)
  arrow.overlaps(rotationSensor)
  arrow.overlaps(bRotationSensor)
  arrow.overlaps(shield)
  arrow.overlaps(bow)
  arrow.overlaps(guy)



  tileMap2 = new Tiles(
    ["....................................................................................................",
      "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    ".....................qqq............................................................................",
    ".....................qqq............................................................................",
    ".....................BBB............................................................................",
    ".....................BBB............................................................................",
    ".....................qqq............................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "..........................................................qqq.......................................",
    "..........................................................qqq.......................................",
    "..........................................................BBB.......................................",
    "..........................................................BBB.......................................",
    "................qqq.......................................qqq.......................................",
    "................qqq.................................................................................",
    "................BBB.................................................................................",
    "................BBB.................................................................................",
    "................qqq.................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
    "....................................................................................................",
  ],
  16, 16, tileSize, tileSize)
  tileMap2.layer = 5
}

function draw() {
  console.log(shootHugeArrow)
  clear()
  weaponSwap()
  specialMoveBar()
  hugeArrow()
  Camera_Setup()
  if (weapon == 1){
    bowHide()
    swordShow()
    swordDraw()
    bowStop = true 
    swordStop = false
  }
  else if (weapon == 2){
    swordHide()
    bowShow()
    bowDraw()
    bowStop = false 
    swordStop = true
  }
  shieldDraw()
  Movement()
  spinMove()
  if (bossFightArea){
    heartsDraw(1)
  }
  else{
    heartsDraw(0)
  }
  if (guy.overlaps(trapDoorBL) || guy.overlaps(trapDoorBR) || guy.overlaps(trapDoorTL) || guy.overlaps(trapDoorTR)){
    enterDungeon()
  }
}

function bowHide(){
  bow.visible = false
  arrow.visible = false
  bow.collider = 'null'
  arrow.collider = 'null'
}

function swordHide(){
  sword.visible = false
  sword.collider = 'null'
}

function bowShow(){
  bow.visible = true
  arrow.visible = true
  bow.collider = 'dynamic'
  arrow.collider = 'dynamic'
}

function swordShow(){
  sword.visible = true
  sword.collider = 'dynamic'
}

function weaponSwap(){
  if(mouse.pressed('center')){
    if (weapon == 1){
      weapon += 1
      return weapon
    }
    if (weapon == 2){
      weapon -= 1
      return weapon 
    }
  }
}

function bowDraw(){
  bRotationSensor.rotateMinTo(mouse, 10, 90);  // Locks bRotationSensor to orientate to the mouse 
  bow.rotation = bRotationSensor.rotation - 90
  createNewArrow()
  if(arrowSpin){
    arrowRotation(1)
  }
  else{
    arrowRotation(2)
  }
  if(shootHugeArrow){
    bowShoot(2)
  }
  else if(!shootHugeArrow){
    bowShoot(1)
  
    
  }
   
}

function arrowRotation(val){
  if(arrow){
    if (val == 1){
      arrow.rotation = bRotationSensor.rotation - 90
    }
    else if(val == 2){
      arrow.rotation = arrow.direction
    }
  }
}


function bowShoot(val){
  if (!bowStop){
    if(val == 1){  // Normal arrows
      if(mouse.pressed('left') && timerOver == true){
        startTime = millis();
        isCountingDown = true;
        timerOver = false
        if(arrow.speed == 0){
          arrow.direction = arrow.angleTo(mouse)
          arrow.life = 60 * 1.5
          arrow.speed = 25
          arrowSpin = false
          arrow.scale= 0.3/4
        }
      }
    }
    else if(val == 2){  // Large arrows
      if(arrow){
        arrow.remove()
      }
      arrow = new Sprite(guy.x, guy.y, 60, 10, 'd');
      arrow.bigArrow = true
      arrow.layer = 4
      arrow.img = arrowImg
      arrow.scale = 0.3
      if(arrow.speed == 0){
        arrow.direction = arrow.angleTo(mouse)
        arrow.life = 60 * 1.5
        arrow.speed = 25
        arrowSpin = false
        
      }
      arrow.overlaps(sword)
      arrow.overlaps(rotationSensor)
      arrow.overlaps(bRotationSensor)
      arrow.overlaps(shield)
      arrow.overlaps(bow)
      arrow.overlaps(guy)
      if(arrow.bigArrow){
        arrow.scale= 0.3
      }
      firstArrow = true
      shootHugeArrow = false
    }
  }
}


function createNewArrow(){
  if(!bowStop && !shootHugeArrow){
    if (isCountingDown) {
      let elapsedTime = millis() - startTime;
      let remainingTime = countdownTime3 * 1000 - elapsedTime; // Convert to milliseconds
      if (remainingTime <= 0) {
        remainingTime = 0;
        isCountingDown = false; // Stop the countdown when it reaches zero
        if(firstArrow){
          arrow.remove()
          firstArrow = false
        }
        arrow = new Sprite(guy.x, guy.y, 60, 10, 'd');
        arrow.bigArrow = false;
        arrow.layer = 4
        arrow.img = arrowImg
        arrow.scale = 0.3/4
        arrowSpin = true
        timerOver = true
        arrow.overlaps(sword)
        arrow.overlaps(rotationSensor)
        arrow.overlaps(bRotationSensor)
        arrow.overlaps(shield)
        arrow.overlaps(bow)
        arrow.overlaps(guy)
      }
    } 
  }
}


function shieldDraw(){
  shieldIndicator.x = guy.x - 90
  shieldIndicator.y = guy.y - 165
  if(!spinMoveActive){
    if(mouse.pressing('right')){
      shield.scale = 0.025/2
      shieldActive = true
      shieldIndicator.visible = true
    }
    else{
      shield.scale = 0.025/2.1
      shieldActive = false
      shieldIndicator.visible = false
    }
  }
}


function heartsDraw(a){
  if(a==0){
    hearts.x = guy.x - 165
    hearts.y = guy.y - 165
    if (hearts.scale < 0.2) hearts.scale += 0.05
  }
  if(a==1){
    if (hearts.x < 962 && hearts.x > 958) hearts.x = 960
    else if (hearts.x > 958) hearts.x -= 2
    else if (hearts.x < 962) hearts.x += 2
    if (hearts.y < 852 && hearts.y > 848) hearts.y = 850
    else if (hearts.y > 848) hearts.y -= 2
    else if (hearts.y < 852) hearts.y += 2
    if (hearts.scale > 0.18) hearts.scale -= 0.01
  }
  if(!shieldActive){
    if(guy.overlaps(enemy)) {lives -=1}
  }
  if(lives == 5) {hearts.ani = '5'}
  if(lives == 4) {hearts.ani = '4'}
  if(lives == 3) {hearts.ani = '3'}
  if(lives == 2) {hearts.ani = '2'}
  if(lives == 1) {hearts.ani = '1'}
}

function swordDraw(){
  swordSwing()  // Function for swinging the sword 
  rotationSensor.rotateMinTo(mouse, 10, 90);  // Locks rotationSensor to orientate to the mouse 
  swordRotation()  // Function for moving the sword 
  swordMirroring()  // Function for turning the sword image left and right 
}

function swordRotation(){
  if (!swordStop){
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
  } 
}


function specialMoveBar(){
  if(!shieldActive){
    if(mouse.pressing('left') >= 25){
      if(!swordStop && bowStop){
        spinMoveActive = true
      }
      else if(!bowStop && swordStop){
        hugeArrowActive = true
      }
      barOutline.visible = true
      barInside.visible = true
      if (barInside.w <= 94){
        barInside.w += (1 * 0.75)
        barInsideXPOS += (0.5 * 0.75)
        if ((barInside.w >= 94) && (barInside.w <= 94.5)) {
          barFull = true
        }
        else{
          barFull = false
        }
      }
    }
    else{
      doSpinMove = false
      spinMoveActive = false
      hugeArrowActive = false
      shootHugeArrow = false
      barOutline.visible = false
      barInside.visible = false
      barInside.w = 2
      barInsideXPOS = 0
    }
    barOutline.x = guy.x - 50
    barOutline.y = guy.y - 165
    barInside.x = (guy.x - 96) + barInsideXPOS
    barInside.y = guy.y - 165
  }
}


function hugeArrow(){
  if((!shieldActive) && (!bowStop)){
    if ((barFull == true) && (mouse.released())) {
      shootHugeArrow = true
    }
    else{
      shootHugeArrow = false
    }
  }
}


function spinMove(){
  if((!shieldActive) && (!swordStop)){
    if ((barFull == true) && (mouse.released())) {
      doSpinMove = true
    }
    else{
      doSpinMove = false
    }

    if(doSpinMove == true){
      startTime = millis();
      isCountingDown = true;
      swordStop = true
      movementActive = false

      if (isCountingDown) {
        let elapsedTime = millis() - startTime;
        let remainingTime = countdownTime2 * 1000 - elapsedTime; // Convert to milliseconds
        if (remainingTime >= 2500 && remainingTime <= 3000) {
          sword.rotation = 90
          sword.layer = 4
          guy.layer = 3
          shield.layer = 2
          sword.x = (guy.x + 7)  // Locks sword onto guy's x position
          sword.y = (guy.y + 1)  // Locks sword onto guy's y position
          shield.x = (guy.x)
          shield.y = (guy.y - 1)
          timerOver = false
        }
        else if(remainingTime >= 2000 && remainingTime <= 2500){
          sword.rotation = -90
          sword.layer = 2
          guy.layer = 3
          shield.layer = 4
          sword.x = (guy.x - 7)  // Locks sword onto guy's x position
          sword.y = (guy.y + 1)  // Locks sword onto guy's y position
          shield.x = (guy.x)
          shield.y = (guy.y - 1)
          timerOver = false
        }
        else if (remainingTime >= 1500 && remainingTime <= 2000) {
          sword.rotation = 90
          sword.layer = 4
          guy.layer = 3
          shield.layer = 2
          sword.x = (guy.x + 7)  // Locks sword onto guy's x position
          sword.y = (guy.y + 1)  // Locks sword onto guy's y position
          shield.x = (guy.x)
          shield.y = (guy.y - 1)
          timerOver = false
        }
        else if(remainingTime >= 1000 && remainingTime <= 1500){
          sword.rotation = -90
          sword.layer = 2
          guy.layer = 3
          shield.layer = 4
          sword.x = (guy.x - 7)  // Locks sword onto guy's x position
          sword.y = (guy.y + 1)  // Locks sword onto guy's y position
          shield.x = (guy.x)
          shield.y = (guy.y - 1)
          timerOver = false
        }
        if (remainingTime <= 0) {
          remainingTime = 0;
          isCountingDown = false; // Stop the countdown when it reaches zero
          timerOver = true
          swordStop = false
          movementActive = true
        }
      }
    } 
  }
}

function Movement() {
  if (movementActive == true){
    if (kb.pressing('a')) {
      guy.vel.x = -3
      idleHorizontal = false
      GuyAnimation(1)
    }
    else if (kb.pressing('d')) {
      guy.vel.x = 3
      idleHorizontal = false
      GuyAnimation(2)
    }
    else {
      guy.vel.x = 0
      idleHorizontal = true
      GuyAnimation(5)
    }
    if (kb.pressing('s')) {
      guy.vel.y = 3
      idleVertical = false
      GuyAnimation(3)
    }
    else if (kb.pressing('w')) {
      guy.vel.y = -3
      idleVertical = false
      GuyAnimation(4)
    }
    else {
      guy.vel.y = 0
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
    guy.layer = 4
    sword.layer = 2
    shield.layer = 5
    bow.layer = 2
    arrow.layer = 3
    bow.x = (guy.x - 8 )
    bow.y = (guy.y + 1)
    if(arrowSpin == true){
      arrow.x = (guy.x - 8 )
      arrow.y = (guy.y + 1)
    }
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    bRotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    bRotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
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
    bow.layer = 4
    arrow.layer = 5
    bow.x = (guy.x + 5 )
    bow.y = (guy.y + 1)
    if(arrowSpin == true){
      arrow.x = (guy.x + 5 )
      arrow.y = (guy.y + 1)
    }
    sword.x = (guy.x + 5 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x + 5 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    bRotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    bRotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
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
    bow.layer = 4
    arrow.layer = 5
    bow.x = (guy.x - 8 )
    bow.y = (guy.y + 1)
    if(arrowSpin == true){
      arrow.x = (guy.x - 8 )
      arrow.y = (guy.y + 1)
    }
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    bRotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    bRotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 4 && idleVertical == false){
    guy.ani = 'moveUp'
    goingLeft = false
    goingRight = false
    guy.layer = 5
    sword.layer = 2
    shield.layer = 4
    bow.layer = 2
    arrow.layer = 3
    bow.x = (guy.x + 5 )
    bow.y = (guy.y + 1)
    if(arrowSpin == true){
      arrow.x = (guy.x + 5 )
      arrow.y = (guy.y + 1)
    }
    sword.x = (guy.x + 5 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x + 5 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    bRotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    bRotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x - 6 )
    shield.y = (guy.y + 2)
  }
  if (movement == 5 && idleVertical == true && idleHorizontal == true){
    guy.ani = 'idle'
    goingLeft = false
    goingRight = false
    guy.layer = 2
    sword.layer = 4
    shield.layer = 3
    bow.layer = 4
    bow.x = (guy.x - 8 )
    bow.y = (guy.y + 1)
    arrow.layer = 5
    if(arrowSpin == true){
      arrow.x = (guy.x - 8 )
      arrow.y = (guy.y + 1)
    }
    sword.x = (guy.x - 8 )  // Locks sword onto guy's x position
    sword.y = (guy.y + 1)  // Locks sword onto guy's y position
    rotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    rotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    bRotationSensor.x = (guy.x - 8 )  // Locks rotationSensor onto guy's x position
    bRotationSensor.y = (guy.y + 1)  // Locks rotationSensor onto guy's y position
    shield.x = (guy.x + 6 )
    shield.y = (guy.y + 2)
  }
}

function enterDungeon() {
  movementActive = false
  openTrapDoor()
  window.open("dungeons.html", "_self");
  movementActive = true
  closeTrapDoor()
}

function openTrapDoor(){
  trapDoorTL.image = trapDoorOpenTLImg
  trapDoorTR.image = trapDoorOpenTRImg
  trapDoorBL.image = trapDoorOpenBLImg
  trapDoorBR.image = trapDoorOpenBRImg
}

function closeTrapDoor(){
  trapDoorTL.img = trapDoorClosedTLImg
  trapDoorTR.img = trapDoorClosedTRImg
  trapDoorBL.img = trapDoorClosedBLImg
  trapDoorBR.img = trapDoorClosedBRImg
}