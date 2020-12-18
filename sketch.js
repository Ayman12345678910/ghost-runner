var tower,towerImage;
var door,doorImage,doorGroup;
var climber, climberImage,climberGroup;
var ghost,ghostImage;
var invisibleBlock, invisibleBlockGroup;
var gameState="PLAY"
var spookySound

function preload(){
 towerImage= loadImage("tower.png"); 
  doorImage= loadImage("door.png");
  climberImage= loadImage("climber.png")
  ghostImage=loadImage("ghost-standing.png")
  spookySound=loadSound("spooky.wav")
  doorGroup= new Group();
  climberGroup= new Group();
  invisibleBlockGroup= new Group();
}

function setup(){
  createCanvas(600,600)
  tower= createSprite(300,300);
  tower.addImage(towerImage);
  tower.velocityY= 2;
  ghost= createSprite(300,300);
  ghost.addImage(ghostImage);
  ghost.scale=0.4;
  
}

function draw(){
 background(0);
  if (gameState==="PLAY"){
      
  

    if(tower.y>500){
    tower.y=300
  }
  
  if(keyDown("left")){
  ghost.x=ghost.x-3;   
     
     }
   if(keyDown("right")){
  ghost.x=ghost.x+3;   
     
     }
   if(keyDown("space")){
  ghost.velocityY=-5   
     
     }
  ghost.velocityY= ghost.velocityY+0.8
  if(climberGroup.isTouching(ghost)){
     ghost.velocityY=0;
     }
  if(invisibleBlockGroup.isTouching(ghost) || (ghost.y>600)){
    ghost.destroy();
    gameState="END";
  }
  
spawnDoors();
 drawSprites(); 
  }
  
 if(gameState==="END"){
   textSize(30);
   stroke("red")
   fill("red")
   text ("Game " + "Over", 215,230);
   spookySound.loop();
 }
  
  
}

function spawnDoors(){
  
  if(frameCount%200==0){
  door=createSprite(200,-50)
  door.addImage(doorImage);
  door.velocityY= 2
  door.x=Math.round(random(100,500))
  door.lifetime= 500
  doorGroup.add(door);
  ghost.depth=door.depth+1;
    
  
  climber= createSprite(door.x,10);
  climber.addImage(climberImage);
  climber.velocityY=2;
  climber.lifetime=500
  climberGroup.add(climber);
  
  invisibleBlock= createSprite(climber.x,15, climber.width,2);   invisibleBlock.velocityY=2;
  invisibleBlock.debug=true;
  invisibleBlockGroup.add(invisibleBlock);
  }
}
