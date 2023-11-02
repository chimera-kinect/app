let nparticles = 22
let positions = []
let speeds   = []
let radius = 1
function setup() {
  createCanvas(400, 400);
  for(let i=0;i<nparticles;i++){
    let spd = createVector(random(-3,3),random(-3,3))
    let pos = createVector(width/2,height/2)
    positions.push(pos)
    speeds.push(spd)
  }
}
function draw() {
  background('#9CB0B8');
  fill('rgb(236,119,119)')
  noStroke()
  //update positions, speeds and draw the circles
  for(let i=0;i<nparticles;i++){
    let pos = positions[i]
    let spd = speeds[i]
    circle(pos.x,pos.y,radius * 2)
    pos.add(spd)
    if(pos.x > width-radius || pos.x < radius ){
      spd.x = -spd.x
    }
    if(pos.y > height-radius || pos.y < radius ){
      spd.y = -spd.y
    }
    positions[i] = pos
    speeds[i]    = spd
  //draw lines between particles
  stroke(100,50,20,15)
    
  for(let i=0;i<nparticles;i++){
    for(let j=0;j<nparticles;j++){
      let posA = positions[i]
      let posB = positions[j]
      if(dist(posA.x,posA.y,posB.x,posB.y)<100){
        line(posA.x,posA.y,posB.x,posB.y)
      }
    }
  }
  }
}

window.setup = setup;
window.draw = draw;



