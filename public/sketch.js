import { readFileSync } from "fs";
import npyjs from "npyjs";
import p5 from "p5";

const npyFilePath = "recording1-1fr.npy";

// Read the .npy file as a Buffer
const data = readFileSync(npyFilePath);

// Create an instance of NpyJs and parse the data
const npy = new npyjs();
const npyData = npy.parse(data.buffer);
const myArray = npyData.data;

// Ensure npyData contains a Uint8Array / Test it can read the values
try {
  if (npyData.data instanceof Uint8Array) {

    // Initialize counters for 0s and 1s
    let numberOfZeros = 0;
    let numberOfOnes = 0;

    // Iterate through the Uint8Array and count 0s and 1s
    for (let i = 0; i < myArray.length; i++) {
      if (myArray[i] === 0) {
        numberOfZeros++;
      } else if (myArray[i] === 1) {
        numberOfOnes++;
      }
    }

    console.log(`Number of 0s: ${numberOfZeros}`);
    console.log(`Number of 1s: ${numberOfOnes}`);

  } else {
    console.error("npyData.data is not a Uint8Array");
  }
} catch (err) {
  console.error("Error reading the .npy file:", err);
}

// Define a function to be called when p5.js is ready
// function sketch(p) {
//   p.setup = function () {
//     p.createCanvas(400, 400);
//     // Use the npyDataArray in your setup function
//     console.log("Hello");
//     // You can now work with npyDataArray within your p5.js sketch
//   };

//   p.draw = function () {
//     background(51);
//   }
// }

// // Create a new p5 instance with your sketch function
// new p5(sketch);


new p5((p) => {
  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(220);
  };

  p.draw = () => {
    p.ellipse(50, 50, 50, 50);
  };
});

/// CANVAS
// let numRows, numCols, cellSize;
// let fillColors = []; // Define custom fill colors for each cell

// function setup() {

//   if (!myArray) {
//     // Data hasn't loaded yet, exit setup
//     return;
//   }

//   numRows = myArray[0].length;
//   numCols = myArray[0][0].length;
//   cellSize = 20; // Adjust this as needed
//   createCanvas(numCols * cellSize, numRows * cellSize);
//   noLoop(); // Disable automatic redraw

//   noStroke(); // Remove stroke (border) around the rectangles

//   // Define custom fill colors for each cell
//   for (let i = 0; i < numRows; i++) {
//     fillColors[i] = []; // Initialize an empty array for each row
//     for (let j = 0; j < numCols; j++) {
//       // Set custom fill colors for each cell here
//       fillColors[i][j] = color(random(255), random(255), random(255)); // Random color for each cell
//     }
//   }

//   // You can call draw once to draw the initial state
//   draw();
// }

// function draw() {
//   // Your draw code
//   if (!myArray) {
//     // Data hasn't loaded yet, exit draw
//     return;
//   }

//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       // Get the custom fill color for each cell
//       fill(fillColors[i][j]);

//       rect(j * cellSize, i * cellSize, cellSize, cellSize);
//     }
//   }
// }
