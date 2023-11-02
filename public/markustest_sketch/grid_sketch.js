import kinectManager from '../utils/KinectManager.js'

function setup() {
    createCanvas(windowWidth, windowHeight)
    kinectManager.updateCanvasSize()
    kinectManager.pushThreshold = 30
    //frameRate(60)
    rectMode(CENTER);
    colorMode(HSL, 50);
    angleMode(DEGREES);
  }
  
  function draw() {
    if (!kinectManager.firstFrameReceived) return

    const coords = kinectManager.detectTouch()
    
    
    background(10);
    
    stroke(0, 0, 0);
    
    for (let i = 0; i < 30; i++) {
      for (let j = 0; j < 20; j++) {
        let x = map(i, 0, 29, 30, width - 30);
        let y = map(j, 0, 19, 30, height - 30);
        
        let r = noise(x / 150, y / 150, frameCount / 150) * 100;
        let d = map(dist(mouseX, mouseY, x, y),
                    0, 300,
                    0, 100);
        
        push();
        translate(x, y);
        
        //let d = coords ? map(dist(coords.x, coords.y, x, y), 0, 300, 0, 100) : 100
        if (d > 70) {
            fill(10,30,r/2);
            rect(0, 0, 60, 40);
            fill(10,60,r/2);
            // circle(0,0,20);
            // circle(0,0,15);
            // circle(0,0,10);
            // circle(0,0,5);
            // circle(0,0,1);
            noStroke()
        } else {
            fill(r,80,r/0.95)
            rect(0, 0, 60, 50);
            //circle(0,0,r/3);
            noStroke();
            
        }
        
        // if (d > 40) {
        //   fill(10,30,r/2);
        //   rect(0, 0, 25, 25);
        //   fill(10,60,r/2);
        //   circle(0,0,20);
        //   circle(0,0,15);
        //   circle(0,0,10);
        //   circle(0,0,5);
        //   circle(0,0,1);
        //   noStroke()
        // } else {
        //   fill(r,80,r/0.95)
        //   rect(0, 0, 30, 25);
        //   //circle(0,0,r/3);
        //   noStroke();
          
        // }
        
        pop();
      }
    }
  }
  
window.setup = setup;
window.draw = draw;