import kinectManager from '../utils/KinectManager.js'

const balz = []
let osc, fft;

function setup() {
    createCanvas(windowWidth, windowHeight);
    kinectManager.updateCanvasSize()
    rectMode(CENTER);
    colorMode(HSL, 100)
    for (let i = 0; i < 35; i++) {
      for (let j = 0; j < 35; j++) {
        balz.push(new Ball(map(i, 0, 35, 10, width), map(j, 0, 35, 10, height)))
      }
    }
    osc = new p5.SawOsc(); // set frequency and type
    osc.amp(0.5);

    fft = new p5.FFT();
    osc.start();
  }
  
  function draw() {
    if (!kinectManager.firstFrameReceived) return
    background(20);

    

    // if (frameCount === 60) console.log(balz)
    stroke(0, 0, 0);
    
    // for (let i = 0; i < 35; i++) {
    //   for (let j = 0; j < 35; j++) {
    //     let x = map(i, 0, 35, 10, width);
    //     let y = map(j, 0, 35, 10, height);
        
    balz.forEach((ball) => {
      ball.updateCraziness()
      ball.draw()
    })
        
        
         
  //mouse reactivity
        
        // if( mouseIsPressed && d < 50 ){
        //    push()
           
        //    fill(r*2, r, r, 10);
        //    circle(x, y, r);
        //    rect(x, y, r*2);
        //    pop()
           
        // }
      // }
    // }
    let waveform = fft.waveform()
      
  }

class Ball {
  constructor (x, y) {
    this.x = x
    this.y = y
    this.currentCraziness = 10
    this.targetCraziness = 10
    this.lerpFrameStart = null
    this.lerpFrameEnd = null
    this.lerpDuration = 2
  }
  

  updateCraziness() {
    // lerp to targetCraziness based on frameCount
    if (this.currentCraziness === this.targetCraziness) {
      return
    } else {
      this.currentCraziness = lerp(this.currentCraziness, this.targetCraziness, constrain(map(frameCount, this.lerpFrameStart, this.lerpFrameEnd, 0, 1), 0, 1)) // takes 0.3 seconds
      console.log(`Current: ${this.currentCraziness}, Target: ${this.targetCraziness}, AMT: ${map(frameCount, this.lerpFrameStart, this.lerpFrameEnd, 0, 1)}`)
    }
  }

  draw() {
    let r = noise(this.x / 100, this.y / 100, frameCount / 100) * 150;
      // let d = map(dist(mouseX, mouseY, x, y),
      //            0, 1200,
      //            0, 100);
      
    stroke(r,r,r);
    strokeWeight(0.5);
    //noFill();
    this.craziness = kinectManager.isCoordinatePushed(this.x,this.y) ? 2 : 10
    // const pushed = kinectManager.isCoordinatePushed(this.x,this.y)
    // if (pushed && !this.lerpFrameStart && !this.lerpFrameEnd) {
    //   this.lerpFrameStart = frameCount
    //   this.targetCraziness = 10
    // } else if 
    // this.targetCraziness = kinectManager.isCoordinatePushed(this.x,this.y) ? 10 : 2
    circle(this.x + random(-this.currentCraziness, this.currentCraziness), this.y + random(-this.currentCraziness, this.currentCraziness), r * 0.1)
    fill(r,r/4,r/1.5)

    // change oscillator frequency based on mouseX
    let freq = map(this.x, 0, width, 100, 200);
    osc.freq(freq);


// change oscillator amplitude based on mouseY
    let amp = map(this.y, 0, height, 0.1, 0.01);
    osc.amp(amp);
  }

  set craziness(val) {
    if (this.targetCraziness === val) return

    this.lerpFrameStart = frameCount
    this.lerpFrameEnd = frameCount + frameRate() * this.lerpDuration
    this.targetCraziness = val
  }

  

}

window.setup = setup;
window.draw = draw;
  