// our color detector object - this does it all!
var colorDetector;
var theCanvas;

var thisShape;

var useVideo;
var takeStill;

function setup() {
  theCanvas = createCanvas(640, 480);
  
  background(255);
  
  theCanvas.parent("#ourCanvas");
  
  //start with the video selected
  useVideo = true;
  takeStill = false;
  
  ellipseMode(CENTER);
  rectMode(CENTER);

  thisShape = "ellipse";
  noStroke();

  // arguments: width, height, mirror (boolean), threshold (int)
  colorDetector = new ColorDetector(320, 240, true, 10);
}

function draw() {
  //video mode
  // detect all colors in the video
  colorDetector.trackColors(useVideo, 0, 0, 320, 240);
  
  // draw boxes around each color
  var colorInfo = colorDetector.getColors();
  for (var i = 0; i < colorInfo.length; i++) {
    fill(colorInfo[i].red, colorInfo[i].green, colorInfo[i].blue);
  }
  
  if (thisShape == "ellipse") {
    ellipse(mouseX,mouseY,15);
  } else if (thisShape == "rect") {
    rect(mouseX, mouseY, 15,15);
  } else if (thisShape == "triangle") {
    triangle(mouseX - 15, mouseY, mouseX, mouseY - 20, mouseX + 15, mouseY);
  }
  
}

function mousePressed() {
  colorDetector.clearAllColors();
  // add in a color based on a color from the incoming video stream
  colorDetector.addColor(mouseX, mouseY);
}

function keyPressed() {
  if (key == 'A') {
    thisShape = "ellipse";
  }
  if (key == 'S') {
    thisShape = "rect";
  }
  if (key == 'D') {
    thisShape = "triangle";
  }
  
  // for picture mode
  if (key == 'C') {
    colorDetector.trackColors(takeStill, 0, 0, 320, 240);
   }
  
  if (key == 'X') {
    saveCanvas(theCanvas, 'mySketch', 'png');
  }
}


function updateCaptureMenu( captureMenu ) {
  // get the value of the menu
  var menuValue = captureMenu.value;
  
  // use the value in some computation
  if (menuValue == 'Video') {
    useVideo = true;
    takeStill = false;
    
  }
  if (menuValue == 'Still Image') {
    useVideo = false;
    takeStill = true;
  }
}

function updateShapeMenu( shapeMenu ) {
  // get the value of the menu
  var menuValue = shapeMenu.value;
  
  // use the value in some computation
  if (menuValue == 'Circle') {
    thisShape = "ellipse";
  }
  if (menuValue == 'Square') {
    thisShape = "rect";
  }
  if (menuValue == 'Triangle') {
    thisShape = "triangle";
  }
}







function ColorDetector(w, h, mirror, threshold) {
  // create a video object
  this.video = createCapture({
    video: {
      mandatory: {
        minWidth: w,
        minHeight: h,
        maxWidth: w,
        maxHeight: h
      }
    }
  });
  this.video.hide();

  // store width and height
  this.vw = w;
  this.vh = h;

  // store our mirror preferences
  this.mirror = mirror;

  // store threshold & percent change needed
  this.threshold = threshold;

  // array of colors we want to track
  this.colors = [];
  
  // clear all colors
  this.clearAllColors = function() {
    this.colors = [];
  }
  
  // update threshold
  this.updateThreshold = function(v) {
    this.threshold += v;
  }

  // add a color to track
  this.addColor = function(xPos, yPos) {
    
    // expose pixels
    this.video.loadPixels();

    // do we need to mirror the video?
    if (this.mirror) {
      // iterate over 1/2 of the width of the image & the full height of the image
      for (var x = 0; x < this.video.width / 2; x++) {
        for (var y = 0; y < this.video.height; y++) {
          // compute location here
          var loc1 = (x + y * this.video.width) * 4;
          var loc2 = (this.video.width - x + y * this.video.width) * 4;

          // swap pixels from left to right
          var tR = this.video.pixels[loc1];
          var tG = this.video.pixels[loc1 + 1];
          var tB = this.video.pixels[loc1 + 2];

          this.video.pixels[loc1] = this.video.pixels[loc2];
          this.video.pixels[loc1 + 1] = this.video.pixels[loc2 + 1];
          this.video.pixels[loc1 + 2] = this.video.pixels[loc2 + 2];

          this.video.pixels[loc2] = tR;
          this.video.pixels[loc2 + 1] = tG;
          this.video.pixels[loc2 + 2] = tB;
        }
      }
    }
    
    // grab the location
    var loc = (xPos + yPos * this.vw) * 4;

    this.colors.push({
      red: this.video.pixels[loc],
      green: this.video.pixels[loc+1],
      blue: this.video.pixels[loc+2],
      x: -1,
      y: -1,
      xSum: 0,
      ySum: 0,
      numPixels: 0
    });
  }

  // get all colors
  this.getColors = function() {
    return this.colors;
  }

  // remove a color by index
  this.removeColor = function(id) {
    this.colors.splice(id, 1);
  }

  // get color by index
  this.getColorByIndex = function(id) {
    return this.colors[id];
  }

  // track all colors
  this.trackColors = function(drawVideo, vx, vy, vw, vh) {

    // expose pixels
    this.video.loadPixels();

    // do we need to mirror the video?
    if (this.mirror) {
      // iterate over 1/2 of the width of the image & the full height of the image
      for (var x = 0; x < this.video.width / 2; x++) {
        for (var y = 0; y < this.video.height; y++) {
          // compute location here
          var loc1 = (x + y * this.video.width) * 4;
          var loc2 = (this.video.width - x + y * this.video.width) * 4;

          // swap pixels from left to right
          var tR = this.video.pixels[loc1];
          var tG = this.video.pixels[loc1 + 1];
          var tB = this.video.pixels[loc1 + 2];

          this.video.pixels[loc1] = this.video.pixels[loc2];
          this.video.pixels[loc1 + 1] = this.video.pixels[loc2 + 1];
          this.video.pixels[loc1 + 2] = this.video.pixels[loc2 + 2];

          this.video.pixels[loc2] = tR;
          this.video.pixels[loc2 + 1] = tG;
          this.video.pixels[loc2 + 2] = tB;
        }
      }
    }

    // clear all trackers
    for (var i = 0; i < this.colors.length; i++) {
      this.colors[i].x = -1;
      this.colors[i].y = -1;
      this.colors[i].xSum = 0;
      this.colors[i].ySum = 0;
      this.colors[i].numPixels = 0;
    }

    // iterate over all pixels and find our desired colors
    var xLoc, yLoc;
    for (var i = 0; i < this.video.pixels.length; i += 4) {
      // convert this position to an x&y location
      xLoc = ((i / 4) % this.vw)
      yLoc = ((i / 4) / this.vw)

      // see if this pixel matches one of the colors we want to track
      for (var j = 0; j < this.colors.length; j++) {
        if (dist(this.video.pixels[i], this.video.pixels[i + 1], this.video.pixels[i + 2], this.colors[j].red, this.colors[j].green, this.colors[j].blue) < this.threshold) {
          this.colors[j].xSum += xLoc;
          this.colors[j].ySum += yLoc;
          this.colors[j].numPixels++;
        }
      }
    }

    // now produce a series of x & y values for each tracked color
    for (var j = 0; j < this.colors.length; j++) {
      this.colors[j].x = this.colors[j].xSum / this.colors[j].numPixels;
      this.colors[j].y = this.colors[j].ySum / this.colors[j].numPixels;
    }
    
    // update our pixel array
    this.video.updatePixels();
    
    // draw the video?
    if (drawVideo) {
      image(this.video, vx, vy, vw, vh);
    }
  }
}