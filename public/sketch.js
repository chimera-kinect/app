// import { readNpyFile } from "./read_data.js";

let myArray;

function setup() {
createCanvas(400, 400);
background(55);

// myArray = await readNpyFile("recording1-1fr.npy");

  if (myArray) {
    console.log(myArray);
  }
}

function draw() {
  ellipse(50, 50, 50, 50);
}

// import { readFileSync } from "fs";
// import npyjs from "npyjs";
//import p5 from "p5";

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
//---


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
