import kinectManager from "../utils/KinectManager.js";

let CX, CY;
let m;  

function setup() {
  const CX = windowWidth, CY = windowHeight;
  kinectManager.updateCanvasSize();
  createCanvas(CX, CY);
  m = {};
  m.lx = 0;
  m.ly = 0;
}

function draw() {   
  m.x = mouseX;
  m.y = mouseY;
  m.lx = lerp(m.lx, m.x, 0.15);
  m.ly = lerp(m.ly, m.y, 0.15);
  background("rgba(255,255,255,0.15)");
  stroke("rgba(155,0,0,1)");
  console.log(CX - m.x);
  for (var i = 0; i < CX / 5; i++) {
    line(i * 5, 0, m.lx, m.ly);
  }
  for (var i = 0; i < CX / 5; i++) {
    line(i * 5, CY, m.lx, m.ly);
  }
  for (var i = 0; i < CX / 5; i++) {
    line(0, i * 5, m.lx, m.ly);
  }
  for (var i = 0; i < CX / 5; i++) {
    line(CX, i * 5, m.lx, m.ly);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
