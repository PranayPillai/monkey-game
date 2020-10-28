
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var survivalTime = 0;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,400);
  monkey = createSprite(50,360,20,20);
  monkey.scale = 0.1;
  monkey.addAnimation("running",monkey_running);
  
  ground = createSprite(400,390,1200,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}


function draw() {
  background("lightgreen");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  if(monkey.isTouching(obstacleGroup)){
    textSize(30);
    fill("yellow");
    text("GameOver",200,200);
    
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    score = 0;
    
  }
  
  if(keyDown("space")){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);

  bananas();
  obstacles();
  drawSprites(); 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time : "+survivalTime,100,50)
}

function bananas(){
  if(frameCount % 80 ===0){
    var banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -4;
    banana.lifeTime = 200;
    
    FoodGroup.add(banana);
  }

}

function obstacles(){
  if(frameCount % 300 === 0){
    var obstacle = createSprite(600,370,10,40);
    obstacle.velocityX = -4;
    
    //for generating obstacles randomly
    var r = Math.round(random(1,2));
    switch (r){
      case 1 : obstacle.addImage(obstacleImage);
        break;
        case 2 : obstacle.addImage(obstacleImage);
     break;
    }
    
    obstacle.scale = 0.1;
    obstacle.lifeTime = 300;
    
    obstacleGroup.add(obstacle);
  }
}



