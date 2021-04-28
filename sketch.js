//Create variables here
var happyDogImg,dogImg;
var database;
var foodStock,foodS,foodObj;
var feedTime,lastFed;


function preload()
{
 happyDogImg = loadImage("images/happydog.png");
 dogImg = loadImage("images/Dog.png")
 
}

function setup() {
	createCanvas(500,500);
  database = firebase.database();
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale=0.5;
 
  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  foodObj = new Food();
  feed = createButton("feed the dog")
  feed.position(300,50);
  feed.mousePressed(feedDog);

  addingFood = createButton("add food");
  addingFood.position(220,50)
  addingFood.mousePressed(addFood);
}


function draw() {  
//  background(46, 139, 87);
background("white");

  drawSprites();
  textSize(20);
  fill("blue");
  stroke("black");

  console.log(foodStock);
  lastFed = database.ref('feedTime')
  lastFed.on("value",function(data){
    feedTime = data.val();
  })

  if(feedTime > 12){
     text("last fed: "+feedTime % 12 +"P.M" , 50,50);
  }else if(feedTime === 0){
    text("last fed: 12 A.M",50,50)
  }else if(feedTime === 12){
    text("last fed: "+feedTime + " noon",50,50);
  }else{
    text("lastfed: "+feedTime + "A.M",50,50)
  }

  foodObj.display();
  
}

function readStock(data){
  foodS=data.val();
}

function writeStock(x){

  if(x<= 0){
    x=0
  }else{
    x=x-1
  }

  database.ref('/').update({
    food:x
  })
}

function feedDog(){
 
 foodObj.getFoodStock();
 if(foodStock <= 0 ){
    foodStock = 0;
    
 }else{
  dog.addImage(happyDogImg);
   foodStock = foodStock - 1
 }

  feedTime = hour();

 foodObj.updateFoodStock(foodStock,feedTime)
}

function addFood(){
  foodStock += 1
  database.ref('/').update({
    food:foodStock
  })
}