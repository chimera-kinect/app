import npyjs from 'https://cdn.jsdelivr.net/npm/npyjs@0.5/+esm'

// const performanceElem = document.getElementById('perf');
// let myArray, nFrames, currentFrame;
// const frameLength = 1024 * 1024;

// function preload() {
//   const n = new npyjs()

//   n.load("../sample_data/recording2-5fr.npy", (array) => {
//     myArray = array;
//     nFrames = array.shape[0];
//     currentFrame = 0;
//   })
// }

let socket
const npy = new npyjs()

function setup() {
  createCanvas(1024, 1024);
  // pixelDensity(1);
  socket = new WebSocket("ws://localhost:12345")

  socket.addEventListener('open', (event) => {
    console.log('Connected to localhost:12345.'), event;
  })

  socket.addEventListener('message', async (event) => {
    const buf = await event.data.arrayBuffer()
    npy.load(buf, (array) => {
      console.log(array)
    })
  })

  socket.addEventListener('error', (event) => {
    console.error('WebSocket error:', event);
  });

  socket.addEventListener('close', (event) => {
    console.log("Socket closed", event);
  })
}

function draw() {
    background(0);
//   if (!myArray?.data) return; // currently having issues with the data not being loaded in time

//   const startTime = performance.now();
//   // no need for a 2d array when we can do this lmao
//   let startIdx = currentFrame * frameLength;
//   let endIdx = (currentFrame + 1) * frameLength;

//   for (let i = startIdx; i < endIdx; i++) {
//     let val = myArray.data[i];
//     let x = (i - startIdx) % 1024; // Calculate x within the current frame
//     let y = Math.floor((i - startIdx) / 1024); // Calculate y within the current frame

//     set(x, y, val);
//   }

//   updatePixels();
//   currentFrame = (currentFrame + 1) % nFrames; // when currentFrame reaches nFrames, reset it to 0
//   performanceElem.innerHTML = `Time to display frame: ${round(performance.now() - startTime)}ms`
// }
}

// this sketch is now a module. the browser doesn't know of the setup and draw functions existence
// let it know then by assigning the functions to the window object
// window.preload = preload;
window.setup = setup;
window.draw = draw;
