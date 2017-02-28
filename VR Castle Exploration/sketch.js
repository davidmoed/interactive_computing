var world, theCastle;

var theRain = [];

var sky, stonebrick;

var circle1, circle2;

var x,y,z;

var rotated1, rotated2;

var doorOpen, doorClose;

var spaceship;

function setup() {
  noCanvas();
  
  world = new World('VRScene');
  theCastle = new castle();
  
  doorOpen = loadSound("sounds/open_door.mp3");
  doorClose = loadSound("sounds/close_door.mp3");
  
  theCastle.displayCastle();
  
  // create a plane entity.
  var plane1 = new Plane({
                        x:0, y:-30, z:0, 
            						width:100, height:100, 
            						asset: 'stonebrick',
            						repeatX: 100,
            						repeatY: 100,
            						rotationX:-90
                        });
                        
  // add the plane to the world
  world.add(plane1);
  
 
 
	
  //this is not working in p5, only in chrome.
  spaceship = new OBJ({
              asset: 'booster_obj',
              mtl: 'booster_mtl',
              x: 0,
            	y: 0,
            	z: -10,
            	rotationY: 90,
              scaleX:.05,
              scaleY:.05,
		          scaleZ:.05,
  });
  world.add(spaceship);
	
}

function draw() {
  if (mouseIsPressed || touchIsDown) {
		world.moveUserForward(0.1);
	}

  // always create a new particle
	var temp = new Rain(-2.5, 0, 2.5);
	
	if (frameCount % 15 == 0) {
  	// add to array
  	theRain.push( temp );
	}
  	// draw all rain
  	for (var i = 0; i < theRain.length; i++) {
  		var result = theRain[i].move();
  		if (result == "gone") {
  			theRain.splice(i, 1);
  			i-=1;
  		}
  	}
	
}



function Rain(x,y,z) {
	
	// construct a new Sphere that lives at this position
	this.mySphere = new Sphere({
							x:x, y:y, z:z,
							red: 0, green:0, blue:255,
							radius: 0.5
	});
	
	// add the Sphere to the world
	world.add(this.mySphere);
	
	// keep track of an offset in Perlin noise space
	this.xOffset = random(1000);
	this.zOffset = random(2000, 3000);
	
	// function to move our sphere
	this.move = function() {
		
		var yMovement = -0.1;
		
		// the rain should randomly move in the x & z directions
		var xMovement = map( noise(this.xOffset), 0, 1, -0.05, 0.05);
		var zMovement = map( noise(this.zOffset), 0, 1, -0.05, 0.05);
		
		// update our poistions in perlin noise space
		this.xOffset += 0.05;
		this.zOffset += 0.25;
		
		// set the position of our Sphere (using the 'nudge' method)
		this.mySphere.nudge(xMovement, yMovement, zMovement);
		
		
		// take out the sphere it if hits the plane
		if (this.mySphere.y <= -30) {
			// remove the box from the world
			world.remove(this.mySphere);
			return "gone";
		}
		else {
		  return "ok";
		}
	}
}


