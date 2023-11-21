const DT = 0.1 // delta time step
const EPS = 0.00000001 // epsilon
const DAMPING = 0.75 // bounce damping
const MINDELTA = 100
const MAXDELTA = 400
const KGrid = 10.0 // elastic value of the grid
const KClick = 10.6 // elastic value of the click

const spring_force = (ax, ay, bx, by, k) => {
    const xx = ax - bx
    const yy = ay - by
    
    const d = dist(xx,yy,0,0)
    
    const nx = xx/(d+EPS)
    const ny = yy/(d+EPS)
    
    const f = k*d
    
    const fx = f*nx
    const fy = f*ny
    
    return createVector(fx,fy)
}

export default class Dot{
  constructor(i, j, N){
    this.vx = 0
    this.vy = 0
    
    this.x = map(i, 0, N-1, -200, max(width, height) + 200)
    this.y = map(j, 0, N-1, -200, max(width, height) + 200)
    
    this.x0 = this.x
    this.y0 = this.y
  }
  
  update(coords){
    const res = createVector(0, 0)

    // if(mouseIsPressed) res.add(spring_force(mouseX, mouseY, this.x, this.y, intensity)) // DEBUG
    const touchVal = coords?.value || 0
    if(touchVal !== 0) {
      const d = dist(coords.x, coords.y, this.x, this.y)
      const DELTA = map(coords.value, 40, 190, MINDELTA, MAXDELTA)
      const intensity = KClick*exp(-d*d/(DELTA*DELTA))
      res.add(spring_force(coords.x, coords.y, this.x, this.y, intensity))
    } 
    res.add(spring_force(this.x0, this.y0, this.x, this.y, KGrid))

    this.vx += DT*res.x
    this.vy += DT*res.y
    this.vx *= DAMPING
    this.vy *= DAMPING
    this.x += DT*this.vx
    this.y += DT*this.vy
  }
}