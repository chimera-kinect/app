function setup() {
    createCanvas(windowWidth, windowHeight);
    
//   createCanvas(windowWidth, windowHeight)
//   kinectManager.updateCanvasSize()
//   kinectManager.pushThreshold = 40
//   frameRate(60)
//   curveCheckbox = createCheckbox('use curves', false)
//   curveCheckbox.position(1012, 40)
  rectMode(CENTER);
  colorMode(HSL, 100)
  }
  
  function draw() {
    //if (!kinectManager.firstFrameReceived)

    background(20);
    
    stroke(0, 0, 0);
    
    for (let i = 0; i < 35; i++) {
      for (let j = 0; j < 35; j++) {
        let x = map(i, 10, 35, 20, width);
        let y = map(j, 10, 35, 20, height);
        
        let r = noise(x / 100, y / 100, frameCount / 100) * 150;
        let d = map(dist(mouseX, mouseY, x, y),
                   0, 1200,
                   0, 100);
        
        stroke(r,r,r);
        strokeWeight(0.5);
        //noFill();
        circle(x, y, r*0.1 );
        fill(r,r/4,r/1.5)
        
         
  //mouse reactivity
        
        if( mouseIsPressed && d < 1 ){
           push()
           fill(r*2, r, r, 10);
           circle(x, y, r);
           rect(x, y, r*2);
           pop()
           
        }
      }
    }

      
  }

window.setup = setup;
window.draw = draw;