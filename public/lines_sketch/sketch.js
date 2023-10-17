let radiusSlider

function setup() {
  createCanvas(1002, 658)
  frameRate(60)
  radiusSlider = createSlider(10, 300, 100)
  radiusSlider.position(1012, 10)
  radiusSlider.style('width', '80px')
}

function draw() {
  background(0)
  stroke(255)
  noFill()
  for (let x = 20; x < width; x += 20) {
    beginShape()
    vertex(x, 0)
    for (let y = 0; y <= height; y += random(10, 20)) {
      let xOffset = dist(mouseX, mouseY, x, y) < radiusSlider.value() ? random(-5, 5) : random(-1, 1)
      vertex(x + xOffset, y)
    }
    vertex(x, height)
    endShape()
  }
}

window.setup = setup
window.draw = draw