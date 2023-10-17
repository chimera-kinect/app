import VerticalLine from "./VerticalLine.js"

let radiusSlider, curveCheckbox
const lines = []

function setup() {
  createCanvas(1002, 658)
  frameRate(60)
  radiusSlider = createSlider(10, 300, 100)
  radiusSlider.position(1012, 10)
  radiusSlider.style('width', '80px')
  curveCheckbox = createCheckbox('use curves', false)
  curveCheckbox.position(1012, 40)
  for (let x = 1; x < width; x += 20) {
    lines.push(new VerticalLine(x))
  }
  stroke(255)
  noFill()
}

function draw() {
  background(0)
  lines.forEach(line => line.draw(radiusSlider.value(), curveCheckbox.checked()))
}


window.setup = setup
window.draw = draw