import kinectManager from '../utils/KinectManager.js'

const particleColor = new Uint8Array([255, 255, 255]);
const particlesNum = 2750;
const sensorOffset = 10;
const clockwise = 50;
const counter = -30;

function setup() {
  createCanvas(windowHeight, windowWidth);
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  angleMode(DEGREES);
  pixelDensity(1);
  background(0); // Initialize trail
  particles.init(); // Corrected function name
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0, 5); // Update trail
  stroke(255);
  strokeWeight(10);
  if (mouseIsPressed) {
    line(pmouseX, pmouseY, mouseX, mouseY);
  }

  loadPixels();
  for (let i = 1; i--; ) {
    particles.updateAngle();
    particles.updatePosition();
  }
  updatePixels();
}

function createParticle() {
  return {
    x: width / 2,
    y: height / 2,
    angle: random(360),
    step: random(2, 3),
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
    let x = 0 | (particle.x + sensorOffset * cos(aim));
    let y = 0 | (particle.y + sensorOffset * sin(aim));
    x = (x + width) % width;
    y = (y + height) % height;

    const index = (x + y * width) * 4;
    return pixels[index]; // Only get red channel
  },

  updateAngle() {
    for (const particle of this.array) {
      const right = this.smell(particle, clockwise),
        center = this.smell(particle, 0),
        left = this.smell(particle, counter);

      if (center > left && center > right) {
        /* Carry on straight */
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
};
