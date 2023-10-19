export default class VerticalLine {
  constructor(xPos) {
    this.xPos = xPos
    this.color = color(random(100, 255))
  }

  draw(useCurves, KinectManager) {
    stroke(this.color)
    beginShape()

    vertex(this.xPos, 0)
    if (useCurves) {
      for (let y = 0; y <= height; y += random(10, 20)) {
        let noiseFactor = noise(this.xPos * 0.01, y * 0.01, frameCount * 0.01)
        let xOffset = KinectManager.isCoordinatePushed(this.xPos, y) ? map(noiseFactor, 0, 1, -25, 25) : map(noiseFactor, 0, 1, -5, 5)
        curveVertex(this.xPos + xOffset, y)
      }
    } else {
      for (let y = 0; y <= height; y += random(10, 20)) {
        let xOffset = KinectManager.isCoordinatePushed(this.xPos, y) ? random(-5, 5) : random(-1, 1)
        vertex(this.xPos + xOffset, y)
      }
    }
    vertex(this.xPos, height)
    
    endShape()
  }
}
