
//Character controls
var Xpos, Ypos;

var character_speed;

//obstacle controls
var block1X, block1Y, block2X, block2Y, block3X, block3Y;

var block1Height, block2Height, block3Height, blockWidth;

var blockMovement;

var block1, block2, block3;

var numBlocks;

//collision controls
var charRight, charLeft, charTop, charBottom;

var block1Right, block1Left, block1Top, block1Bottom;
var block2Right, block2Left, block2Top, block2Bottom;
var block3Right, block3Left, block3Top, block3Bottom;

//character lives
var lives;
var lifeTime;

var counter;

//difficulty options
var easy, medium, hard;
var choice;

//game controls
var currentScreen;

var gameTime, startTime, time, menuTime;

//sound variables
var whoa, soundtrack;

function preload() {
  crash = loadImage("CrashBandicoot.png");
  canvas = loadImage("dice.png");
  whoa = loadSound("Whoa.mp3");
  soundtrack = loadSound("Crash_Bandicoot_Theme.mp3");
}



function setup() {
  
  theCanvas = createCanvas(800, 500);

  // apply a style to this element
  theCanvas.style('border', '5px solid black');
  theCanvas.style('display', 'block');
  theCanvas.style('margin', 'auto');
  
  theCanvas.parent("#gameCanvas");
  
  startTime = millis();
  
  lives = 3;
  
  counter = 0;

  blockMovement;
  
  currentScreen = 0;
  
  character_speed = 2;

  numBlocks = 1;
  
  xPos = 50;
  yPos = height/2;
  
  block1X = width - 5;
  block1Y = height /2;
  
  block2X = width - 5;
  block2Y = height /3;
  
  block3X = width - 5;
  block3Y = height - 50;
  
  blockWidth = 20;
  block1Height = 50;
  block2Height = 75;
  block3Height = 50;
  
  
  soundtrack.loop();
}

function draw() {
  
  
  
  if (currentScreen < 5) {
    
    if (currentScreen === 0) {
      //have the menu screen display
      menuScreen();
      startTime = 0;
    } else if (currentScreen == 1) {
      //start the game
      gameScreen();
    } else if (currentScreen == 2) {
      //show the loss screen
      lossScreen();
    } else if (currentScreen == 3) {
      winScreen();
    }
  
  }
}




function menuScreen() {
  background(255);
  
  menuTime = millis();
  
  textSize(30);
  text("Welcome to the escape game! Last 60 seconds to win!", 50, 100);
  
  textSize(20);
  text("Press 1 for easy difficulty, 2 for medium, and 3 for hard", 145, 200);

  image(crash, width/2 - 60, 300);
  
  text("Good Luck!", width/2 - 60, 275);
  
  if (keyIsPressed == 1) {
    blockMovement = 1;
    currentScreen++;
  } else if (keyIsPressed == 2) {
    blockMovement = 1.5;
    currentScreen++;
  } else if (keyIsPressed == 3) {
    blockMovement = 2;
    currentScreen++;
  }

}


function gameScreen () {
  image(canvas, 0 , 0);
      image(crash, xPos, yPos);
      
      fill(0);
      
      text("Lives Remaining: " + lives, 20,20);
      
      
      time = millis();
      gameTime = time - startTime - menuTime;
      
      roundTime = round(gameTime/1000);
      showTime = "Total survival time: " + roundTime;
      text(showTime, 20, 40);
      
      
      counter += frameCount;
      
      
      if (lives > 0) {   
        lifeTime = millis();
        
        
        Block1();
        updateMenu( myMenu );
        
        
        //move up or down with arrow keys or W and S
        if (keyIsDown(LEFT_ARROW)) {
          xPos -= character_speed;
        }
        if (keyIsDown(RIGHT_ARROW)) {
          xPos += character_speed;
        }
        if (keyIsDown(UP_ARROW)) {
          yPos -= character_speed;
        }
        if (keyIsDown(DOWN_ARROW)) {
          yPos += character_speed;
        } 
        if (keyIsDown(65)) {
        	xPos -= character_speed;
        }
         if (keyIsDown(87)) {
        	yPos -= character_speed;
        }
        if (keyIsDown(83)) {
        	yPos += character_speed;
        }
        if (keyIsDown(68)) {
        	xPos += character_speed;
        }
        
        //char wrap-araound
        if (yPos >= height) {
          yPos = 2;
        }
        if (yPos <= 1) {
          yPos = height - 50;
        }
        
        //char position variables 
        charRight = xPos + crash.width;
        charLeft = xPos;
        charTop = yPos;
        charBottom = yPos + crash.height;
        
      
        if (charRight > block1Left && charLeft < block1Right && charBottom > block1Top && charTop < block1Bottom) {
          restartGame();
        } else if (charRight > block2Left && charLeft < block2Right && charBottom > block2Top && charTop < block2Bottom) {
          restartGame();
        } else if (charRight > block3Left && charLeft < block3Right && charBottom > block3Top && charTop < block3Bottom) {
          restartGame();
        }
      }
      if (lives === 0) {
        currentScreen += 1;
      }
      if (roundTime >= 60) {
        text("You Win!!!", 500 , 20);
      }
      if (roundTime >= 120) {
        currentScreen += 2;
      }
  
}


function winScreen() {
  
  var r , g, b;
  
  r = random(255);
  g = random(255);
  b = random(255);
  
  fill (r,g,b);
  textSize(32);
  text("You Win!!!" ,width/2 - 100, height/2);
  

}


function lossScreen() {
  background(0);
  
  fill(255);
  textSize(50);
  text("You Lose.", width/2 - 120, 275 );
  
}



function Block1() {
  block1 = rect(block1X, block1Y, blockWidth, block1Height);
  if (block1X > 0) {
      block1X -= blockMovement;
    }
  
  //box 1 location 
  block1Right = block1X + 20;
  block1Left = block1X;
  block1Top = block1Y;
  block1Bottom = block1Y + block1Height;
  
  if (block1X <= 0) {
      block1X = width -5;
      block1Y = random(0,400);
      block1Height = random(50,150);
      blockMovement += .2;
    }
}


function Block2() {
   if (counter > 360 * 100) {
    block2 = rect(block2X, block2Y, blockWidth, block2Height);
    if (block2X > 0) {
      block2X -= blockMovement;
    }
    
    //box 2 location
    block2Right = block2X + 20;
    block2Left = block2X;
    block2Top = block2Y;
    block2Bottom = block2Y + block2Height;
    
    if (block2X <= 0) {
        block2X = width -5;
        block2Y = random(0,400);
        block2Height = random(50,150);
        blockMovement += .2;
    }
  } 
}

function Block3() {
  
  if (counter > 360 * 250) {
    block3 = rect(block3X, block3Y, blockWidth, block3Height);
    if (block3X > 0) {
      block3X -= blockMovement;
    }
    
    //box 3 location
   block3Right = block3X + 20;
  block3Left = block3X;
  block3Top = block3Y;
  block3Bottom = block3Y + block3Height;
    
    if (block3X <= 0) {
        block3X = width -5;
        block3Y = random(0,40);
        block3Height = random(50,150);
        blockMovement += .2;
        counter = 0;
    }
  }
}

function restartGame () {
  
  whoa.play();
  
  lives -= 1;
  
  xPos = 50;
  yPos = height/2;
  
  block1X = width - 5;
  block1Y = height /2;
  
  block2X = width - 5;
  block2Y = height /3;
  
  block3X = width - 5;
  block3Y = height - 50;
  
  counter = 0;
  Block1();
  updateMenu( myMenu );
  
}

function updateMenu( myMenu ) {
  // get the value of the menu
  var menuValue = myMenu.value;
  
  // use the value in some computation
  if (menuValue == 'a') {
    Block2();
    Block3();
  } else if (menuValue == 'b') {
    Block2();
  } 
  
}

function updateSound( soundMenu ) {
  var menuValue = soundMenu.value;
  
  if (menuValue == 'a') {
    soundtrack.loop();
  } else {
    soundtrack.stop();
  }
}