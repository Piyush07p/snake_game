let inputDir={ x:0  ,  y:0 };

 let foodsound= new Audio('music/food.mp3');
 let movesound=new Audio('music/move.mp3');
 let musicSound=new Audio('music/music.mp3');
 let gameOver=new Audio('music/gameover.mp3');

   let lastptime=0;
   let speed=5;
   let score=0;
    
   let snakearr=[
       {x:13,y:15}
   ]
   let food={
       x:6,y:12
   };

 // to insrease or decrease the speed of the sanke
 
function speedInc(){
    speed++;
    let h1=document.getElementById('h1');
    h1.innerHTML=speed;
}
function speedDec(){
    speed--;
    h1.innerHTML=speed;
}


//    game function

function  main(ctime){
  window.requestAnimationFrame(main);
  if((ctime-lastptime)/1000<1/speed){
      return;
  }
  lastptime=ctime;
  
  gameEngine();

}

  // logic of collision of the snake

function isCollide(snake){
    //(1) if snake collides with itself

    for(let i=1;i<snakearr.length;i++)
    {
        if(snake[i].x===snake[0].x && snake[i].y===snake[0].y  )
        {
            return true;
        }
    }

    // (2) if snake collides with the wall
if((snake[0].x>=18||snake[0].x<=0) || (snake[0].y>=18||snake[0].y<=0 ))
  return true;
}




function gameEngine(){
    
 //part-1 if snake collides with the wall

        if(isCollide(snakearr)){
            gameOver.play();
            musicSound.pause();
            inputDir={x:0,y:0};
            alert("game over press any key to play again")
            snakearr=[{x:13,y:15}]
            score=0;
            scoreBox.innerHTML="Score:"+score;
            

        }


//if you eaten the food, increment the score
         
        if(snakearr[0].y===food.y && snakearr[0].x===food.x){
            foodsound.play();
            score+=1;
            scoreBox.innerHTML="Score:"+score;
            snakearr.unshift({x: snakearr[0].x+inputDir.x, y: snakearr[0].y+inputDir.y});
            let a=2;
            let b=16;  
            food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
        }
        
    // moving the sanke

        for(let i=snakearr.length-2;i>=0;i--)
        {
            //  const element=array[i];
             snakearr[i+1]={...snakearr[i]};

        }
        snakearr[0].x += inputDir.x;
        snakearr[0].y += inputDir.y;



//part-2  display the snake and food

//(1) display the snake

   board.innerHTML="";
   snakearr.forEach((e,index)=>{
   snakeElement=document.createElement('div');
   snakeElement.style.gridRowStart=e.y;
   snakeElement.style.gridColumnStart=e.x;
  
   if(index===0){
       snakeElement.classList.add('head');
    
   }
   else{
    snakeElement.classList.add('snake');
   }
    board.appendChild(snakeElement);

  });

//(2) display the food element

foodelement=document.createElement('div');
foodelement.style.gridColumnStart=food.x;
foodelement.style.gridRowStart=food.y;
foodelement.classList.add('food');
board.appendChild(foodelement);


}



// main logic


window.addEventListener('keydown',e=>{
    inputDir={x:0,y:1}
    movesound.play();
    h1.innerHTML=speed;
    // musicSound.play();
    switch(e.key){
        case "ArrowUp":
            inputDir.x=0;
            inputDir.y=-1;
            break;

        case "ArrowDown":
            inputDir.x=0;
            inputDir.y=1;
            break;

        case "ArrowLeft":
            inputDir.x=-1; 
            inputDir.y=0;
            break;

        case "ArrowRight":
            inputDir.x=1;
            inputDir.y=0;
            break;



    }

})

// this line is used to recursivley call the function
window.requestAnimationFrame(main);

