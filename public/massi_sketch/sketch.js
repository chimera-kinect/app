// import c2 from 'https://cdn.jsdelivr.net/npm/c2@0.1.22/+esm'
import Sphere from './Sphere.js'

const spheres = []

function setup() {
  createCanvas(1022, 658, WEBGL)
  frameRate(60)
  for (let i = 0; i < 20; i++) {
    const sphereSize = 50 //random(30, 70)
    const x = random(-width / 2 + sphereSize, width / 2 - sphereSize)
    const y = random(-height / 2 + sphereSize, height / 2 - sphereSize)
    const vx = random(-1, 1)
    const vy = random(-1, 1)
    const newSphere = new Sphere(sphereSize, x, y, vx, vy, random(10000, 20000))
    
    // Check for collisions with existing spheres
    let safePosition = true
    const minSeparation = 20 // Adjust this value for separation between spheres
    for (let otherSphere of spheres) {
      const minDist = newSphere.size + otherSphere.size + minSeparation
      const distance = dist(newSphere.x, newSphere.y, otherSphere.x, otherSphere.y)
      if (distance < minDist) {
        safePosition = false
        break
      }
    }
    
    if (safePosition) {
      spheres.push(newSphere)
    }
  }
}

function draw() {
  background(0)
  spheres.forEach(sphereInstance => {
    sphereInstance.update(spheres)
    sphereInstance.draw()
  })
  let locX = mouseX - width / 2
  let locY = mouseY - height / 2
  pointLight(250, 250, 250, locX, locY, 100)
  ambientLight(30)
}

// DEBUG
function mousePressed() {
  spheres.forEach(sphereInstance => {
    if (sphereInstance.dragFactor === 1) {
      sphereInstance.dragFactor = 0.97
      sphereInstance.vx = random(-1, 1)
      sphereInstance.vy = random(-1, 1)
    } else {
      sphereInstance.dragFactor = 1
    }
  })
}

window.setup = setup
window.draw = draw
window.mousePressed = mousePressed
