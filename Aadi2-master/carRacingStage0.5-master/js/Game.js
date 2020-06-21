class Game {
  constructor(){}
  
  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })
   
  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

   async start(){
    if(gameState === 0){
      player = new Player();
      var pcref=await database.ref("playerCount").once("value");
      if(pcref.exists()){
        playerCount=pcref.val();
         player.getCount();
      }
     
      form = new Form()
      form.display();
    }
  
    car1=createSprite(100,200);
    car1.addImage(c1);
    car2=createSprite(300,200);
      car2.addImage(c2);
    car3=createSprite(500,200);
      car3.addImage(c3);
    car4=createSprite(700,200);
      car4.addImage(c4);
    cars=[car1,car2,car3,car4];
  }
  play(){
    form.hide();
   
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    if(allPlayers!==undefined){
      image(track,0,-displayHeight*4,displayWidth,displayHeight*5);
      var index=0;
      var x=300;
      var y;
      for(var plr in allPlayers){
      index++;
      x=x+300;
      y=displayHeight-allPlayers[plr].distance;
      cars[index-1].x=x;
      cars[index-1].y=y;
      if(index===player.index){
        stroke(10);
        fill("red");
        ellipse(x,y,60,60);
        camera.position.x=displayWidth/2;
        camera.position.y=cars[index-1].y;
      }
      }
    }
    if(keyIsDown(UP_ARROW)&& player.index!==null){
      player.distance+=20;
      player.update();
    }
    if(player.distance>4860){
gameState=2;
player.rank++;
Player.updateCarsAtEnd(player.rank);
    }
    drawSprites();
  }
  end(){
    console.log(player.rank);
  }
}
