import kinectManager from "../utils/KinectManager.js";

const particleColor = new Uint8Array([255, 255, 255])
const particlesNum = 5000;
const sensorOffset = 10;
const clockwise = 50;
const counter = -30;
let displayWord = true;
let displayTime = 3;
let displayTimer;
let prevTouchX, prevTouchY;

function setup() {
  createCanvas(1920,800);
  frameRate(30);
  kinectManager.updateCanvasSize();
  kinectManager.pushThreshold = 40;
  angleMode(DEGREES);
  pixelDensity(1);
  background(0);
  particles.init();
  displayTimer = millis() + displayTime * 1000;
}

//hello 
// lets try firefox
// download it on the windows pc and open localhost:5000 there please copy that alsje says it is too much effort and we should just use chrome? but i dont know
// let me actually first try it here


function draw() {
  if (!kinectManager.firstFrameReceived) return;
  background(0, 5);

  if (displayWord) {
    displayStartWord();
  } else {
    drawParticles();
  }
}

function displayStartWord() {
  fill(255);
  textSize(100);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  text("MYCELIUM", width / 2, height / 2);

  
  if (millis() > displayTimer) {
    displayWord = false;
    background(0, 5);
  }
}

function drawParticles() {
  stroke(255);
  const coords = kinectManager.detectTouch();
  strokeWeight(coords?.value || kinectManager.pushThreshold);

  if (coords) {
    line(prevTouchX || coords.x, prevTouchY || coords.y, coords.x, coords.y);
    prevTouchX = coords.x;
    prevTouchY = coords.y;
  } else {
    prevTouchX = null;
    prevTouchY = null;
  }

  loadPixels();
  for (let i = 5; i--; ) { //shoot speed
    particles.updateAngle();
    particles.updatePosition();
  }
  updatePixels();
}

function createParticle() {
  return {
    x: width / 1, //position
    y: height / 1, //position
    angle: random(360),
    step: random(2, 10) //increase spread/speed?
  };
}

const particles = {
  array: [],

  init() {
    this.array.length = 0;
    for (let i = particlesNum; i--; ) {
      this.array.push(createParticle());
    }
  },

  smell(particle, direction) {
    const aim = particle.angle + direction;
    let x = 0 | (particle.x + sensorOffset * cos(aim) * 2);
    let y = 0 | (particle.y + sensorOffset * sin(aim) * 2);
    x = (x + width) % width;
    y = (y + height) % height;

    const index = (x + y * width) * 4;
    return pixels[index];
  },

  updateAngle() {
    for (const particle of this.array) {
      const right = this.smell(particle, clockwise),
        center = this.smell(particle, 0),
        left = this.smell(particle, counter);

      if (center > left && center > right) {
      } else if (left < right) {
        particle.angle += clockwise;
      } else if (left > right) {
        particle.angle += counter;
      }
    }
  },

  updatePosition() {
    for (const particle of this.array) {
      particle.x += cos(particle.angle) * particle.step;
      particle.y += sin(particle.angle) * particle.step;
      particle.x = (particle.x + width) % width;
      particle.y = (particle.y + height) % height;

      const index = ((0 | particle.x) + (0 | particle.y) * width) * 4;
      pixels.set(particleColor, index);
    }
  },
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  kinectManager.updateCanvasSize();
}

window.setup = setup;
window.draw = draw;
window.windowResized = windowResized;
window.keyPressed = keyPressed;