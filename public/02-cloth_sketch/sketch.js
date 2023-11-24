import Dot from './Dot.js'
import kinectManager from '../utils/KinectManager.js'
// import Spotify from '../utils/Spotify.js'

const N = 50
const array = new Array(N)

const draw_connection = (d1, d2) => {
  stroke(125)
  strokeWeight(2)
  line(d1.x, d1.y, d2.x, d2.y)
}

function setup() {
  createCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
  kinectManager.pushThreshold = 40
  background(0)
  
  for(let i=0;i<N;i++){
    array[i] = new Array(N)
  }
  
  for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
      array[i][j] = new Dot(i, j, N)
    }
  }

  // Spotify.play('claire de lune debussy')
}

function draw() {
  if (!kinectManager.firstFrameReceived) return
  background(0)
  
  push()

  const coords = kinectManager.detectTouch()
  
  for(let i=0;i<N;i++){
    for(let j=0;j<N;j++){
      array[i][j].update(coords)
    }
  }
  
  for(let i=0;i<N-1;i++){
    for(let j=0;j<N-1;j++){
      let d1 = array[i][j]
      let d2 = array[i+1][j]
      let d3 = array[i][j+1]
      draw_connection(d1, d2)
      draw_connection(d1, d3)
    }
  }
  
  for(let i=0;i<N-1;i++){
      let d1 = array[N-1][i]
      let d2 = array[N-1][i+1]
      let d3 = array[i][N-1]
      let d4 = array[i+1][N-1]
      draw_connection(d1, d2)
      draw_connection(d3, d4)
  }

  pop()
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
  kinectManager.updateCanvasSize()
}

window.setup = setup
window.draw = draw
window.windowResized = windowResized