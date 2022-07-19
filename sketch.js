var bkgd, bg, invisGround
var troll, trollimg
var logimg, treeimg, bushimg
var bushGrp, logGrp, treeGrp
var rand
var fruitcounter

function preload(){
  bkgd = loadImage("assets/jungle.jpg")
  trollimg = loadAnimation("assets/troll1.png", "assets/trollrun1.png", "assets/trollrun2.png", "assets/trolljump.png")
  logimg = loadImage("assets/log.png")
  treeimg = loadImage("assets/tree.png")
  bushimg = loadImage("assets/bush.png")
}
function setup() {
  createCanvas(800,400);

  bg = createSprite(400,200)
  bg.scale = 1.5
  bg.addImage(bkgd)
  bg.velocityX=-1

  troll = createSprite(60, 300, 50, 50);
  troll.addAnimation("troll",trollimg)
  troll.scale = 2

  invisGround = createSprite(0, 400, 400, 20)
  invisGround.visible = false

  bushGrp = new Group()
  logGrp = new Group()
  treeGrp = new Group()

  rand = Math.round(random(1,3))

  fruitcounter = 185
}


function draw() {
  background(0);
  if(bg.x<375){
    bg.x= bg.width/2
  }

  troll.collide(invisGround)

  if(keyDown(UP_ARROW)){
    troll.velocityY = -4
    fruitcounter-=0.2
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
  
  drawSprites();
  showFruitCounter()
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

