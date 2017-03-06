//Vote Catching Game

var default_image;
var theCanvas;

var score = 0;

var trumpR, trumpL;

var spinTheVote;

var vote1, vote2, vote3;
var voteAngle;

var theBackground;

var xPos, yPos;

var vXPos, vYPos;

var speed = 3;

var aTop, aBottom, aRight, aLeft;
var vTop, vBottom, vRight, vLeft;


function preload() {
  trumpR = loadImage("hillary_right.png");
  trumpL = loadImage("trump_left.png");
  
  vote1 = loadImage("vote.png");
  vote2 = loadImage("vote2.png");
  vote3 = loadImage("vote3.png");
  
  theBackground = loadImage("state_map.png");
}

function setup() {
  theCanvas = createCanvas(900,495);
  
  // apply a style to this element
  theCanvas.style('border', '5px solid black');
  theCanvas.style('display', 'block');
  theCanvas.style('margin', 'auto');
  
  //set an id for the canvas to be referenced in the index.html
  theCanvas.parent("#gameCanvas");
  
  // apply a style to this element
  theCanvas.style('border', '5px solid black');
  theCanvas.style('display', 'block');
  theCanvas.style('margin', 'auto');
  
  //set an id for the canvas to be referenced in the index.html
  theCanvas.parent("#gameCanvas");
  
  default_image = trumpR;
  
  xPos = width/2;
  yPos = height - trumpR.height;
  
  noiseDetail(24);
  
  voteXPos = random(900 - vote1.width);
  voteYPos = random(0, -100);
  
  voteAngle = 0;
  
  voteOb1 = new Vote();
  voteOb2 = new Vote();
  voteOb3 = new Vote();
  voteOb4 = new Vote();
  voteOb5 = new Vote();
  voteOb6 = new Vote();
  voteOb7 = new Vote();
  voteOb8 = new Vote();
  voteOb9 = new Vote();
  voteOb10 = new Vote();
  voteOb11 = new Vote();
  voteOb12 = new Vote();
  voteOb13 = new Vote();
  voteOb14 = new Vote();
  voteOb15 = new Vote();
  voteOb16 = new Vote();
  voteOb17 = new Vote();
  voteOb18 = new Vote();
  voteOb19 = new Vote();
  voteOb20 = new Vote();
  voteOb21 = new Vote();
  voteOb22 = new Vote();
  voteOb23 = new Vote();
  voteOb24 = new Vote();
  voteOb25 = new Vote();
  
}

function draw() {
  
  background(255);
  image(theBackground, 0 ,0);
  
  image(default_image, xPos, yPos);
  
  //set borders for candidate image
  aTop = yPos;
  aLeft = xPos;
  aBottom = yPos + default_image.height;
  aRight = xPos + default_image.width;
  
  //add perlin noise to all
  voteOb1.move();
  voteOb2.move();
  voteOb3.move();
  voteOb4.move();
  voteOb5.move();
  voteOb6.move();
  voteOb7.move();
  voteOb8.move();
  voteOb9.move();
  voteOb10.move();
  voteOb11.move();
  voteOb12.move();
  voteOb13.move();
  voteOb14.move();
  voteOb15.move();
  voteOb16.move();
  voteOb17.move();
  voteOb18.move();
  voteOb19.move();
  voteOb20.move();
  voteOb21.move();
  voteOb22.move();
  voteOb23.move();
  voteOb24.move();
  voteOb25.move();
  
  
  //display all
  voteOb1.display();
  voteOb2.display();
  voteOb3.display();
  voteOb4.display();
  voteOb5.display();
  voteOb6.display();
  voteOb7.display();
  voteOb8.display();
  voteOb9.display();
  voteOb10.display();
  voteOb11.display();
  voteOb12.display();
  voteOb13.display();
  voteOb14.display();
  voteOb15.display();
  voteOb16.display();
  voteOb17.display();
  voteOb18.display();
  voteOb19.display();
  voteOb20.display();
  voteOb21.display();
  voteOb22.display();
  voteOb23.display();
  voteOb24.display();
  voteOb25.display();
  
  
  if (mouseX < xPos) {
    xPos -= speed;
    default_image = trumpL;
  }
  if (mouseX > xPos) {
    xPos += speed;
    default_image = trumpR;
  }
  
  textSize(20);
  text("# of votes: " + score, 25, 25);
}


function Vote() {
  
  this.vXPos = random(900 - vote1.width);
  this.vYPos = random(0, -100);
  
  var randomizer = random(3);
    
    if (randomizer <= 1) {
      this.currentVote = vote1;
    } else if (randomizer <= 2 && randomizer > 1) {
      this.currentVote = vote2;
    } else if (randomizer <= 3 && randomizer > 2) {
      this.currentVote = vote3;
    }
  
  var randSpeed = random(3);
  
  this.voteA = 0;
  
  this.display = function() {
    
    push();
    translate(this.vXPos,this.vYPos)
    rotate(radians(this.voteA));
    imageMode(CENTER);
    image(this.currentVote,0, 0);
    pop();
    
    this.voteA += random(2);
    
    this.vYPos += randSpeed;
    
    if (this.vYPos >= height) {
      this.vXPos = random(900 - vote1.width);
      this.vYPos = random(0, -100);
    }
    
    this.vTop = this.vYPos;
    this.vLeft = this.vXPos;
    this.vBottom = this.vYPos + this.currentVote.height;
    this.vRight = this.vXPos + this.currentVote.width;
   

  if (this.vBottom < aTop || 
    this.vTop > aBottom || 
    this.vRight < aLeft || 
    this.vLeft > aRight) {
      return null;
  } else {
    score += 1;
    this.vXPos = random(900 - vote1.width);
    this.vYPos = random(0, -100);
  }
    
  }
  
  // create a "noise offset" to keep track of our position in Perlin Noise space
  this.xNoiseOffset = random(1000,2000);
  
  // movement mechanics
  this.move = function() {
    // compute how much we should move
    var xMovement = map( noise(this.xNoiseOffset), 0, 1, -1, 1 );
    
    // update our position
    this.vXPos += xMovement;
    
    // update our noise offset values
    this.xNoiseOffset += 0.05;
  }
  
}


  // push();
  // translate(voteXPos,voteYPos)
  // rotate(radians(voteAngle));
  // imageMode(CENTER);
  // image(vote1,0, 0);
  // pop();
  


