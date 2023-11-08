export default class VerticalLine {
  constructor(xPos) {
    this.xPos = xPos
    this.color = color(random(100, 255))
  }

  draw(kinectManager) {
    stroke(this.color)
    beginShape()

    vertex(this.xPos, 0)
    for (let y = 0; y <= height; y += random(10, 20)) {
      vertex(this.xPos + (kinectManager.isCoordinatePushed(this.xPos, y) ? random(-5, 5) : random(-1, 1)), y)
    }
    vertex(this.xPos, height)
    
    endShape()
  }
}
