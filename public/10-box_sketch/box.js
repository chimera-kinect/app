import kinectManager from "../utils/KinectManager.js";

let x, y, lx, ly, csw, tsw;

function preload() {
  // lx = width / 2;
	// ly = height / 2;
  // x = width / 2;
	// y = height / 2;
  // now all of a sudden works in setup and not here :/
}

function setup() {
	createCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  // fix stroke
  stroke(0, 0, 255, 200);
  frameRate(30);
  lx = width / 2;
  ly = height / 2;
  x = width / 2;
  y = height / 2;
  strokeWeight(3);
}

function draw() {
  background(255);

  if (!kinectManager.firstFrameReceived) return;
  const coords = kinectManager.detectTouch();

	x = coords?.x || lx;
	y = coords?.y || ly;
  if (dist(x, y, lx, ly) > 1) {
    lx=lerp(lx,x,0.15);
	  ly=lerp(ly,y,0.15);
  } else {
    lx = x
    ly = y
  }

  let depth = coords?.value || 30;
  let tsw = map(depth, 190, 3, 0.1, true);
 // let csw = lerp(csw, tsw, 0.1);
 // lerp not working to save my life
  strokeWeight(tsw);

  for(var i=0;i<width/3;i++){
		line(i*3, 0, lx, ly);
    line(i*3, height, lx, ly);
	}
  for(var i=0; i<height/3; i++){
    line(0, i*3, lx, ly);
    line(width, i*3, lx, ly);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
