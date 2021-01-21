var sword,chakku;
var PLAY = 2;
var END = 3;
var gameState= PLAY;
var f1,fru1;
var f2,fru2;
var f3,fru3;
var f4,fru4;
var go,gameo;
var gios;
var monster;
var score = 0;
var knifeSound;

function preload(){
  
 chakku=loadImage("sword.png"); 
 
  fru1=loadImage("fruit1.png");
  fru2=loadImage("fruit2.png");
  fru3=loadImage("fruit3.png");
  fru4=loadImage("fruit4.png");
  
  gameo=loadImage("gameover.png");
 gios=loadSound("gameover.mp3");
  
 monster = loadAnimation("alien1.png","alien2.png");
  
  knifeSound=loadSound("knifeSwooshSound.mp3");
  
}

function setup(){
  
  createCanvas(400,400);
  
 sword = createSprite(200,200,10,10);
 sword.addImage("chaaku",chakku);
 sword.scale = 0.7;
  
 score = 0;
 
fruitGroup = createGroup();
monsterGroup = createGroup();  
  
}

function draw(){
background("lightblue");
  
  if(gameState === PLAY){
    spawnFruits();
   spawnEnemies();
      
  if(monsterGroup.isTouching(sword)){
    gameState=END;
    gios.play();
  }
   
 sword.x=World.mouseX;
 sword.y=World.mouseY;
   
   if(fruitGroup.isTouching(sword)){
     score=score+1;
     fruitGroup.destroyEach();
     knifeSound.play();
   }
    
    if(score % 10 === 0){
      
      fruitGroup.velocityX = fruitGroup.velocityX + 3;
      
    }
    
 }
  
  if(gameState === END){
    
     monsterGroup.destroyEach();
    sword.destroy();
    fruitGroup.destroyEach();
    
    var gameisover = createSprite(200,200,20,20);
   gameisover.addImage("gio",gameo);
    
   }
  
  fill("red");
  textSize(20);
  text("Score :: " + score,300,50);
 
   drawSprites();
}

function spawnFruits(){
 
  if(frameCount % 20 === 0){
    
   var fruties = createSprite(-5,200,10,10);
   fruties.scale=0.2;
    
   var rand = Math.round(random(1,4));
    
      if(rand === 1){
    fruties.addImage(fru1);
      }
       else if(rand === 2){
     fruties.addImage(fru2);
   }  
    
    else if(rand === 3){
     fruties.addImage(fru3);
   }
    
      else if(rand === 4){
     fruties.addImage(fru4);
   }
      fruties.y=Math.round(random(20,380));
   fruties.velocityX=5;
     fruties.lifeTime = 90;
   
    fruitGroup.add(fruties);
 }
}

function spawnEnemies(){

if(frameCount % 200 === 0){
  var enime = createSprite(-5,200,20,20);
  enime.addAnimation("mosser",monster);
  enime.y=Math.round(random(30,370));
  enime.velocityX=5;
  enime.lifeTime = 90;
  
  monsterGroup.add(enime);
}  
}