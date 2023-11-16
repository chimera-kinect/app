const NOISE_SCALE = 0.01

const onScreen = (p) => p.x >= 0 && p.x <= width && p.y >= 0 && p.y <= height
const noiseAtCoords = (x, y) => noise(x * NOISE_SCALE, y * NOISE_SCALE, frameCount * NOISE_SCALE * NOISE_SCALE)

export default class Particle {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.dir = random([-1, 1])
    this.col = color(255)
  }

  update(kinectManager) {
    if(!onScreen(this)) {
      this.x = random(width)
      this.y = random(height)
    }

    if (kinectManager.isCoordinatePushed(this.x, this.y)) {
      const n = noiseAtCoords(this.x, this.y)
      const a = TAU * n
      this.x += random([-1, 1]) * cos(a)
      this.y += random([-1, 1]) * sin(a)
      this.col = color(255, 0, 0)
    } else {
      const n = noiseAtCoords(this.x, this.y)
      const a = TAU * n
      this.x += this.dir * cos(a)
      this.y += this.dir * sin(a)
      this.col = color(255)
    }
  }

  draw() {
    stroke(this.col)
    point(this.x, this.y)
  }
}