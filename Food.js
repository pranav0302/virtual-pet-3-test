class Food{
    constructor(){
       this.foodStock = 6
       this.lastFed = 0 
       this.image = loadImage("images/Milk.png");
    }

    display(){

        var x = 20,y=100;

        if(this.foodStock != 0){
            for(i = 0; i<this.foodStock;i++){
                image(this.image,x,y,50,50)
                x = x+30;
                if(i%10 === 0){
                    y += 50;
                    x = 20;
                }
            }
        }else{
            text("No food available",220,250);
        }

        
    }
    getFoodStock(){
        var foodStockref = database.ref('food');
        foodStockref.on("value",function(data){
         this.foodStock = data.val();
        })
    }

    updateFoodStock(stock,feedTime){
        database.ref('/').update({
            food:stock,
            feedTime:feedTime
        })
    }


}