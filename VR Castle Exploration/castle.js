function castle() {
  
  this.displayCastle = function() {
    //front row
    addCone (10,0,-10);
    addCylinder(10,-5,-10);
    build4Column(10,-25, -10); //rightmost corner
    build4Column(5,-25, -10);
    build4Column(0,-25, -10);
    build4Column(-5,-25, -10);
    build4Column(-10,-25, -10);
    build4Column(-15,-25, -10); //leftmost corner
    addCone (-15,0,-10);
    addCylinder(-15,-5,-10);
    
    //right row
    build4Column(10,-25, -5);
    build4Column(10,-25, 0);
    build4Column(10,-25, 5);
    build4Column(10,-25, 10);
    build4Column(10,-25, 15); //back rightmost corner
    addCone (10,0,15);
    addCylinder(10,-5,15);
    
    //left row
    build4Column(-15,-25, -5);
    build4Column(-15,-25, 0);
    build4Column(-15,-25, 5);
    build4Column(-15,-25, 10);
    build4Column(-15,-25, 15); //back leftmost corner
    addCone (-15,0,15);
    addCylinder(-15,-5,15);
    
    //back row
    build4Column(-10,-25, 15);
    
    //control for door rotations
    rotated1 = 0;
    rotated2 = 0;
    
    // doors
    var door1 = new Plane({
                          x: -5,
                          y: -20,
                          z: 15,
                          asset: 'doorLeft',
                          side: 'double',
                          height: 15,
                          width: 5,
                          
                          
                          clickFunction: function(thePlane) {
            								if (rotated1 == 0) {
            								  thePlane.rotateY(90);
            								  doorOpen.play();
            								  rotated1 = 1;
            								} else if (rotated1 == 1) {
            								  thePlane.rotateY(0);
            								  doorClose.play();
            								  rotated1 = 0;
            								}
            							}
                         
                          });
    world.add(door1);
    
    newBox(-5,-10,15);
    
    var door2 = new Plane({
                          x: 0,
                          y: -20,
                          z: 15,
                          asset: 'doorRight ',
                          side: 'double',
                          height: 15,
                          width: 5,
                          
                          clickFunction: function(thePlane) {
            								if (rotated2 == 0) {
            								  thePlane.rotateY(90);
            								  doorOpen.play();
            								  rotated2 = 1;
            								} else if (rotated2 == 1){
            								  thePlane.rotateY(0);
            								  doorClose.play();
            								  rotated2 = 0;
            								}
                          }
            								
                          });
                          
    // add the plane to the world
    world.add(door2);
    
    newBox(0,-10,15);
    
    build4Column(5,-25, 15); //end back row
    
    fountain();
  }
}


//create a 5x5x5 box object
function newBox (x,y,z) {
  
   // create a box entity.  entities take arguments in the form of an Object
  var box = new Box({
                      x:x,
                      y:y,
                      z:z,
                      width: 5,
                      height:5,
                      depth: 5,
                      red: random(255),
                      green: random(255),
                      blue: random(255)
                                
                      });

  // add the entity to the world
  world.add( box );
}

//build 3 box high columns
function build4Column(x,y,z) {
  x = x;
  y = y;
  z = z;

  
  for (i = 0; i < 4; i++) {
    newBox(x,y,z);
    y += 5;
  }
}

//create a cone object
function addCone (x,y,z) {
  	// cone primitive
	var co = new Cone({
						x:x , y:y, z:z,
						height:5,
						radiusBottom: 5, radiusTop: 0.25,
						red: random(255),
            green: random(255),
            blue: random(255)
					});
	world.add(co);
}

//create a cylinder object
function addCylinder(x,y,z) {
  	// cylinder primitive
	var cl = new Cylinder({
						x:x , y:y, z:z,
						height:5,
						radius: 2.5,
						red: random(255),
            green: random(255),
            blue: random(255)
					});
	world.add(cl);
}

function addSphere(x,y,z) {
  
  // circle primitive
	var c = new Sphere({
						x: x, y:y, z:z,
						radius: 2,
						red: random(255),
            green: random(255),
            blue: random(255)
					});
	world.add(c);
}

function fountain() {

  addSphere(0,-20, 0);
  addSphere(0,-20, 5);
  addSphere(-5,-20, 0);
  addSphere(-5,-20, 5);
}