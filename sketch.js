var bkgd, bg, invisGround
var troll, trollimg
var logimg, treeimg, bushimg, appleimg, banannaimg
var bushGrp, logGrp, treeGrp, appleGrp, banannaGrp
var rand
var fruitcounter
var gamestate, play, end, score

function preload(){
  bkgd = loadImage("assets/jungle.jpg")
  trollimg = loadAnimation("assets/troll1.png", "assets/trollrun1.png", "assets/trollrun2.png", "assets/trolljump.png")
  logimg = loadImage("assets/log.png")
  treeimg = loadImage("assets/tree.png")
  bushimg = loadImage("assets/bush.png")
  appleimg = loadImage("assets/apple.png")
  banannaimg = loadImage("assets/bananna.png")
  trollEndGame = loadAnimation("assets/troll1.png")
}
function setup() {
  createCanvas(800,400);

  bg = createSprite(400,200)
  bg.scale = 1.5
  bg.addImage(bkgd)
  

  troll = createSprite(60, 300, 50, 50);
  troll.addAnimation("troll",trollimg)
  troll.addAnimation("trollEnd", trollEndGame)
  troll.scale = 2
  troll.debug = true

  invisGround = createSprite(0, 400, 400, 20)
  invisGround.visible = false

  bushGrp = new Group()
  logGrp = new Group()
  treeGrp = new Group()
  appleGrp = new Group()
  banannaGrp = new Group()

  rand = Math.round(random(1,3))

  fruitcounter = 185

  play = 1
  end = 0
  gamestate=play

  score = 0
}


function draw() {
  background(0);

  if (gamestate==play) {
    bg.velocityX=-1
    if(bg.x<375){
      bg.x= bg.width/2
    }
    if(keyDown(UP_ARROW)){
      troll.velocityY = -4
      fruitcounter-=0.9
    }
  
    troll.velocityY += 0.5
  
    console.log(rand)
    if(rand==1){
      spawnbush()
      spawnlog()
    }
    else if(rand==2){
      spawnlog()
      spawntree()
    }
    else{
      spawntree()
      spawnbush()
    }

    if(troll.isTouching(appleGrp)){
      fruitcounter = 185
      appleGrp.destroyEach()
    }
  
    if(troll.isTouching(banannaGrp)){
      fruitcounter = 185
      banannaGrp.destroyEach()
    }

    score = score+Math.round(getFrameRate()/60)

    if(troll.isTouching(bushGrp)||troll.isTouching(logGrp)||troll.isTouching(treeGrp)){
      gamestate = end
    }

  } else if (gamestate === end){
    bg.velocityX=0
    troll.velocityY = 0
    bushGrp.setVelocityXEach(0)
    logGrp.setVelocityXEach(0)
    treeGrp.setVelocityXEach(0)
    appleGrp.setVelocityXEach(0)
    banannaGrp.setVelocityXEach(0)
    background.velocityX = 0
    troll.changeAnimation("trollEnd")
    
  }
  
  troll.collide(invisGround)

  
  drawSprites();
  textSize(20)
  fill("white")
  text("Score : "+score, 100, 40)

  showFruitCounter()
  spawnapple()
  spawnbananna()
}

function spawnbush(){
  if(frameCount%109==0){
    var bush = createSprite(800, 330, 20, 20)
    bush.addImage("bush", bushimg)
    bush.velocityX = -5
    bush.scale = 0.4
    bush.lifetime = 500
    bushGrp.add(bush)
  }
}

function spawnlog(){
  if(frameCount%180==0){
    var log = createSprite(1100, 370, 20, 20)
    log.addImage("log", logimg)
    log.velocityX = -5
    log.scale = 0.2
    log.lifetime = 500
    logGrp.add(log)
  }
}

function spawntree(){
  if(frameCount%70==0){
    var tree = createSprite(800, 340, 20, 20)
    tree.addImage("tree", treeimg)
    tree.velocityX = -5
    tree.scale = 0.4
    tree.lifetime = 500
    treeGrp.add(tree)
  }
}

function showFruitCounter(){
  fill ("white")
  rect (50, 50, 185, 20)
  fill ("red")
  rect (50, 50, fruitcounter, 20)
}

function spawnapple(){
  if(frameCount%100==0){
    var apple = createSprite(800, 270, 20, 20)
    apple.addImage("apple", appleimg)
    apple.velocityX = -5
    apple.scale = 0.1
    apple.lifetime = 500
    appleGrp.add(apple)
  }
}  

function spawnbananna(){
  if(frameCount%170==0){
    var bananna = createSprite(800, 270, 20, 20)
    bananna.addImage("bananna", banannaimg)
    bananna.velocityX = -5
    bananna.scale = 0.1
    bananna.lifetime = 500
    banannaGrp.add(bananna)
  }
}  