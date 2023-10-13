export default class Sphere {
  constructor(size, x, y, vx, vy) {
    this.size = size
    this.x = x
    this.y = y
    this.z = 0
    this.vx = vx
    this.vy = vy
    this.dragFactor = 0.97
  }
  
  draw() {
    push()
    translate(this.x, this.y, this.z)
    sphere(this.size)
    pop()
  }

  update(spheres) {
    // Apply drag to velocity
    this.vx *= this.dragFactor
    this.vy *= this.dragFactor

    // Update position based on velocity
    this.x += this.vx
    this.y += this.vy

    // Check for collision with canvas boundaries
    if (this.x - this.size * 1.1 < -width / 2 || this.x + this.size * 1.1 > width / 2) {
      this.vx *= -1 // Reverse x-velocity to bounce
    }

    if (this.y - this.size * 1.1 < -height / 2 || this.y + this.size * 1.1 > height / 2) {
      this.vy *= -1 // Reverse y-velocity to bounce
    }

    // Check for collisions with other spheres
    for (let otherSphere of spheres) {
      if (otherSphere === this) continue

      const dx = otherSphere.x - this.x
      const dy = otherSphere.y - this.y
      const distance = dist(this.x, this.y, otherSphere.x, otherSphere.y)
      const minDist = this.size + otherSphere.size

      if (distance < minDist) {
        // Calculate the overlap or penetration depth
        const overlap = minDist - distance

        // Calculate the direction vector to move the spheres apart
        const collisionNormal = createVector(dx, dy).normalize()

        // Move spheres apart to eliminate overlap
        const correction = collisionNormal.mult(overlap / 2)
        this.x -= correction.x
        this.y -= correction.y
        otherSphere.x += correction.x
        otherSphere.y += correction.y

        // Reflect velocities for collision response
        const relativeVelocity = createVector(this.vx - otherSphere.vx, this.vy - otherSphere.vy)
        const impulse = collisionNormal.mult(2 * relativeVelocity.dot(collisionNormal) / (1 / this.size + 1 / otherSphere.size))
        this.vx -= impulse.x / this.size
        this.vy -= impulse.y / this.size
        otherSphere.vx += impulse.x / otherSphere.size
        otherSphere.vy += impulse.y / otherSphere.size
      }
    }
  }
}