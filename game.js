// let newGameButton  //variable for main menu 'new game' button
// const tileSize = 48
// let mainMenuImg, overworldImg
// let levelState = 0
// let runOverworldTilemapOnce = 0 
// let movementActive = true
// let goingThroughDoor = false
// let dungeonFloorImg, dungeonWallImg, dungeonStairsImg
// let dungeonWalls, dungeonWall, dungeonFloors, dungeonFloor, dungeonStairs, dungeonDoors, dungeonRightDoor, dungeonLeftDoor, dungeonUpDoor, dungeonDownDoor, tileMap, leftLimiter, rightLimiter, upLimiter, downLimiter
// let overworldWalls, overworldWall, overworldFloors, overworldGrass, overworldBoundary, overworldDoors, trapDoorTL, trapDoorTR, trapDoorBL, trapDoorBR
// let camy = 169
// let camx = 216
// let overworldWallImg, overworldGrassImg, overworldBoundaryImg, trapDoorOpenTLImg, trapDoorOpenTRImg,trapDoorOpenBLImg,trapDoorOpenBRImg, trapDoorClosedTLImg, trapDoorClosedTRImg, trapDoorClosedBLImg, trapDoorClosedBRImg
// const levelTilemaps = [
//     [
// "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b......................................b",
// "b.................WWWWWWWWWWWWWW.......b",
// "b.................WssssssssssssW.......b",
// "b.................WsssssLRsssssW.......b",
// "b.................WssssslrsssssW.......b",
// "b.................WssssssssssssW.......b",
// "b.................WssssssssssssW.......b",
// "b.................WsssssWssssssW.......b",
// "b.................WsssssWsssssss.......b",
// "b.................WsssssWsssssss.......b",
// "b.................WsssssWsssssss.......b",
// "b.................WsssssWsssssss.......b",
// "b.................WsssssWWWWWWWWWWWWWWWb",
// "b.................Wssssssssssssssssssssb",
// "b.................Wssssssssssssssssssssb",
// "b.................Wssssssssssssssssssssb",
// "b.................Wssssssssssssssssssssb",
// "b.................Wssssssssssssssssssssb",
// "b.................Wssssssssssssssssssssb",
// "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
//     ],
//     [
//         "============================================================",
//         "=________==________==________==________==________==________=",
//         "=________==________==________==________==________==________=",
//         "=________><________><________><________><________><________=",
//         "=________><________><________><________><________><________=",
//         "=_S______==________==________==________==________==________=",
//         "=________==________==________==________==________==________=",
//         "====vv========vv========vv========vv========vv========vv====",
//         "====^^========^^========^^========^^========^^========^^====",
//         "=________==________==________==________==________==________=",
//         "=________==________==________==________==________==________=",
//         "=________><________><________><________><________><________=",
//         "=________><________><________><________><________><________=",
//         "=________==________==________==________==________==________=",
//         "=________==________==________==________==________==________=",
//         "============================================================",
//     ]
// ]




// function dungeonCameraSetup() {
//     camera.x = camx
//     camera.y = camy
//     camera.zoom = 1
// }



// function preload() {
//     mainMenuImg = loadImage('backgroundImg2.png')
//     dungeonFloorImg = loadImage('ZeldaTileMap.png')
//     dungeonWallImg = loadImage('ZeldaWall.png')
//     dungeonStairsImg = loadImage('stairsPic2.png')
//     overworldGrassImg = loadImage('zeldaGrass.png')
//     overworldWallImg = loadImage('ZeldaTileMap.png')
//     overworldBoundaryImg = loadImage('ZeldaWall.png')
//     trapDoorClosedTLImg = loadImage('ClosedTrapDoorTL.png')
//     trapDoorClosedTRImg = loadImage('ClosedTrapDoorTR.png')
//     trapDoorClosedBLImg = loadImage('ClosedTrapDoorBL.png')
//     trapDoorClosedBRImg = loadImage('ClosedTrapDoorBR.png')
//     trapDoorOpenTLImg = loadImage('OpenTrapDoorTL.png')
//     trapDoorOpenTRImg = loadImage('OpenTrapDoorTR.png')
//     trapDoorOpenBLImg = loadImage('OpenTrapDoorBL.png')
//     trapDoorOpenBRImg = loadImage('OpenTrapDoorBR.png')
// }




// function overworldCameraSetup(){
//     camera.x = guy.x
//     camera.y = guy.y 
//     camera.zoom = 1
// }




// function dungeonStairLimits(){
//     leftLimiter = new Sprite(121, 240, 1, 50, 's');
//     upLimiter = new Sprite(96, 265, 48, 1, 's');
//     downLimiter = new Sprite(96, 215, 48, 1, 's');
//     leftLimiter.visible = false;
//     upLimiter.visible = false;
//     downLimiter.visible = false;
// }


// function dungeonTilemapSetup() {

//     dungeonWalls = new Group();
//     dungeonWalls.collider = 's'
//     dungeonWalls.w = tileSize
//     dungeonWalls.h = tileSize
  
//     dungeonWall = new dungeonWalls.Group()
//     dungeonWall.tile = '='
//     dungeonWall.img = dungeonWallImg
  
//     dungeonFloors = new Group();
//     dungeonFloors.collider = 'none'
//     dungeonFloors.w = tileSize
//     dungeonFloors.h = tileSize
  
//     dungeonFloor = new dungeonFloors.Group()
//     dungeonFloor.tile = '_'
//     dungeonFloor.img = dungeonFloorImg
  
//     dungeonStairs = new dungeonFloors.Group()
//     dungeonStairs.tile = 'S'
//     dungeonStairs.img = dungeonStairsImg
  
//     dungeonDoors = new Group();
//     dungeonDoors.collider = 'none'
//     dungeonDoors.w = tileSize
//     dungeonDoors.h = tileSize
    
//     dungeonRightDoor = new dungeonDoors.Group()
//     dungeonRightDoor.tile = '>'
//     dungeonRightDoor.img = dungeonFloorImg
  
//     dungeonLeftDoor = new dungeonDoors.Group()
//     dungeonLeftDoor.tile = '<'
//     dungeonLeftDoor.img = dungeonFloorImg
  
//     dungeonDownDoor = new dungeonDoors.Group()
//     dungeonDownDoor.tile = 'v'
//     dungeonDownDoor.img = dungeonFloorImg
  
//     dungeonUpDoor = new dungeonDoors.Group()
//     dungeonUpDoor.tile = '^'
//     dungeonUpDoor.img = dungeonFloorImg
  
// }

// function overworldMapSetup() {

//     overworldWalls = new Group();
//     overworldWalls.collider = 's'
//     overworldWalls.w = tileSize
//     overworldWalls.h = tileSize
  
//     overworldBoundary = new overworldWalls.Group()
//     overworldBoundary.tile = 'b'
//     overworldBoundary.img = overworldBoundaryImg
  
//     overworldWall = new overworldWalls.Group()
//     overworldWall.tile = 'W'
//     overworldWall.img = overworldWallImg
  
//     overworldFloors = new Group();
//     overworldFloors.collider = 'none'
//     overworldFloors.w = tileSize
//     overworldFloors.h = tileSize
  
//     overworldGrass = new overworldFloors.Group()
//     overworldGrass.tile = 's'
//     overworldGrass.img = overworldGrassImg
  
//     trapDoorTL = new overworldFloors.Group()
//     trapDoorTL.tile = 'L'
//     trapDoorTL.img = trapDoorClosedTLImg
  
//     trapDoorTR = new overworldFloors.Group()
//     trapDoorTR.tile = 'R'
//     trapDoorTR.img = trapDoorClosedTRImg
  
//     trapDoorBL = new overworldFloors.Group()
//     trapDoorBL.tile = 'l'
//     trapDoorBL.img = trapDoorClosedBLImg
  
//     trapDoorBR = new overworldFloors.Group()
//     trapDoorBR.tile = 'r'
//     trapDoorBR.img = trapDoorClosedBRImg
  
//     overworldDoors = new Group();
//     overworldDoors.collider = 's'
//     overworldDoors.w = tileSize
//     overworldDoors.h = tileSize
// }

// function overworldCameraSetup() {
//     camera.x = guy.x
//     camera.y = guy.y 
// }




// function setup() {
//     createCanvas(480, 384, 'pixelated');
//     // createCanvas(480, 384);
//     guy = new Sprite(1800,1700,20,20,'k')
//     newGameButton = new Sprite(237,210,75,25,'s')
//     overworldMapSetup()
//     dungeonTilemapSetup()
//     dungeonStairLimits()
//     guy.overlaps(dungeonRightDoor, () => dungeonCameraMovement(1, 0, 3))>0  //put in organised function later----------------------------------
//     guy.overlaps(dungeonLeftDoor, () => dungeonCameraMovement(-1, 0, 3))>0  //put in organised function later---------------------------------
//     guy.overlaps(dungeonDownDoor, () => dungeonCameraMovement(0, 1, 3))>0  //put in organised function later-----------------------------------
//     guy.overlaps(dungeonUpDoor, () => dungeonCameraMovement(0, -1, 3))>0  //put in organised function later-----------------------------------
// }







// function draw() { 
//     clear()
//     if(levelState == 0){  //Main menu
//         MainMenu()
//     }
//     else if(levelState == 1){  //Main overworld
//         Overworld()
//         guyMovement()
//         overworldCameraSetup()
//     }
//     else if(levelState == 2){  //First dungeon level
//         DungeonL1()
//         guyMovement()
//     }
// }





// function MainMenu(){
//     background(mainMenuImg)
//     if (newGameButton.mouse.pressing()){
//         startOverworld()
//     }
// }
// function startOverworld(){
//     newGameButton.remove()
//     if(tileMap){
//         tileMap.removeAll()
//     }
//     tileMap = new Tiles(levelTilemaps[0],0, 0, tileSize, tileSize)
//     tileMap.layer = 1
//     guy.layer = 2
//     nextLvl()
// }
// function Overworld(){
//     if (guy.overlaps(trapDoorBL) || guy.overlaps(trapDoorBR) || guy.overlaps(trapDoorTL) || guy.overlaps(trapDoorTR)){
//         movementActive = false
//         openTrapDoor()
//         //delay here
//         startDungeonL1()
//         movementActive = true
//         closeTrapDoor()
//     }
// }
// function delay(milliseconds) {
//     return new Promise((resolve) => setTimeout(resolve, milliseconds));
// }
// function DungeonL1(){
//     if (goingThroughDoor == true){
//         movementActive = false
//     }
//     else{
//         movementActive = true
//     } 

//     if (guy.overlaps(dungeonStairs)){
//         levelState = 1
//     }
// }
// function guyMovement(){
//     if (movementActive == true){
//         if (kb.pressing('a')) {
//             guy.vel.x = -3
//         }
//         else if (kb.pressing('d')) {
//             guy.vel.x = 3
//         }
//         else {
//             guy.vel.x = 0
//         }
//         if (kb.pressing('s')) {
//             guy.vel.y = 3
//         }
//         else if (kb.pressing('w')) {
//             guy.vel.y = -3
//         }
//         else {
//             guy.vel.y = 0
//         }
//     }
//     else{
//         if (kb.pressing('a')) {
//             guy.vel.x = 0
//         }
//         else if (kb.pressing('d')) {
//             guy.vel.x = 0
//         }
//         else {
//             guy.vel.x = 0
//         }
//         if (kb.pressing('s')) {
//             guy.vel.y = 0
//         }
//         else if (kb.pressing('w')) {
//             guy.vel.y = 0
//         }
//         else {
//             guy.vel.y = 0
//         }
//     }
// }
// function nextLvl(){
//     levelState +=1
// }
// function openTrapDoor(){
//     trapDoorTL.image = trapDoorOpenTLImg
//     trapDoorTR.image = trapDoorOpenTRImg
//     trapDoorBL.image = trapDoorOpenBLImg
//     trapDoorBR.image = trapDoorOpenBRImg
// }
// function closeTrapDoor(){
//     trapDoorTL.img = trapDoorClosedTLImg
//     trapDoorTR.img = trapDoorClosedTRImg
//     trapDoorBL.img = trapDoorClosedBLImg
//     trapDoorBR.img = trapDoorClosedBRImg
// }
// async function moveCamera(dirX = 0, dirY = 0, speed = 1){
//     dirX = Math.round(dirX)
//      dirY = Math.round(dirY)
//     dirX = Math.min(Math.max(dirX, -1), 1)
//     dirY = Math.min(Math.max(dirY, -1), 1)
//      if (!goingThroughDoor){
//       goingThroughDoor = true;
//       if(dirX){
//         for(let i = 0;i < 480 / Math.abs(speed);i++){
//           camera.x = camera.x + speed * dirX
//           guy.x = guy.x + speed/4 * dirX
//           await delay(0.5)
//         }
//       }
//       if(dirY){
//         for(let i = 0;i < 384 / Math.abs(speed);i++){
//           camera.y = camera.y + speed * dirY
//           guy.y = guy.y + speed/3 * dirY
//           await delay(0.5)
//         }
//       }
//       goingThroughDoor = false;
//     }
// }
// function startDungeonL1(){
//     tileMap.removeAll()
//     tileMap = new Tiles(levelTilemaps[1],-160, -150, tileSize, tileSize)
//     tileMap.layer = 1
//     dungeonCameraSetup()
//     guy.layer = 2
//     guy.x = 30
//     guy.y = 30
//     nextLvl()
// }