import { readFileSync } from "fs";
import npyjs from "npyjs";

const npyFilePath = "recording1-1fr.npy"; // Replace with your file path

try {
  // Read the .npy file as a Buffer
  const data = readFileSync(npyFilePath);

  // Create an instance of NpyJs and parse the data
  const npy = new npyjs();
  const npyData = npy.parse(data.buffer);

  // Now you can work with npyData (the parsed data)
  console.log(npyData);

  const numberOfZeros = Array.from(npyData).reduce((count, value) => {
    return count + (value === 0 || value === "0" ? 1 : 0);
  }, 0);
  console.log(
    `Number of 0s in npyData: ${numberOfZeros}`
  );

} catch (err) {
  console.error("Error reading the .npy file:", err);
}

// let jsonData;
// let myArray; // Declare the variable to hold the loaded JSON data

// function preload() {
//   // Load the JSON file
//   loadJSON("../utilities/recordings/test.json", loadData);
// }

// function loadData(data) {
//   // This function is called when the JSON data is loaded and ready
//   myArray = data;
//   console.log("JSON data loaded:", myArray);

//   // Call setup after loading the data
//   setup();
// }

// function setup() {
//   if (!myArray) {
//     // Data hasn't loaded yet, exit setup
//     return;
//   }

//   let numRows = myArray[0].length;
//   let numCols = myArray[0][0].length;
//   let cellSize = 1; // Adjust this as needed
//   createCanvas(numCols * cellSize, numRows * cellSize);

//   noStroke();

//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       let colorValue = parseInt(myArray[0][i][j]); // Assuming the value 1 corresponds to blue

//       let fillColor = color(colorValue * 255, 0, (1 - colorValue) * 255);
//       fill(fillColor);

//       rect(j * cellSize, i * cellSize, cellSize, cellSize);
//     }
//   }
// }

// function draw() {
//   // Your draw code
// }

// // !! setup / draw split -- WORKS!!
// let jsonData;
// let myArray; // Declare the variable to hold the loaded JSON data
// let numRows, numCols, cellSize;

// function preload() {
//   // Load the JSON file
//   loadJSON("../utilities/recordings/test.json", loadData);
// }

// function loadData(data) {
//   // This function is called when the JSON data is loaded and ready
//   myArray = data;
//   console.log("JSON data loaded:", myArray);

//   // Call setup after loading the data
//   setup();
// }

// function setup() {
//   if (!myArray) {
//     // Data hasn't loaded yet, exit setup
//     return;
//   }

//   numRows = myArray[0].length;
//   numCols = myArray[0][0].length;
//   cellSize = 1; // Adjust this as needed
//   createCanvas(numCols * cellSize, numRows * cellSize);
//   noLoop(); // Disable automatic redraw
//   noStroke();

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
//       let colorValue = parseInt(myArray[0][i][j]); // Assuming the value 1 corresponds to blue

//       let fillColor = color(colorValue * 255, 0, (1 - colorValue) * 255);
//       fill(fillColor);

//       rect(j * cellSize, i * cellSize, cellSize, cellSize);
//     }
//   }
// }

let jsonData;
let myArray; // Declare the variable to hold the loaded JSON data
let numRows, numCols, cellSize;
let fillColors = []; // Define custom fill colors for each cell

function preload() {
  // Load the JSON file
  loadJSON("../utilities/recordings/test.json", loadData);
}

function loadData(data) {
  // This function is called when the JSON data is loaded and ready
  myArray = data;
  console.log("JSON data loaded:", myArray);

  // Call setup after loading the data
  setup();
}

function setup() {
  if (!myArray) {
    // Data hasn't loaded yet, exit setup
    return;
  }

  numRows = myArray[0].length;
  numCols = myArray[0][0].length;
  cellSize = 20; // Adjust this as needed
  createCanvas(numCols * cellSize, numRows * cellSize);
  noLoop(); // Disable automatic redraw

  noStroke(); // Remove stroke (border) around the rectangles

  // Define custom fill colors for each cell
  for (let i = 0; i < numRows; i++) {
    fillColors[i] = []; // Initialize an empty array for each row
    for (let j = 0; j < numCols; j++) {
      // Set custom fill colors for each cell here
      fillColors[i][j] = color(random(255), random(255), random(255)); // Random color for each cell
    }
  }

  // You can call draw once to draw the initial state
  draw();
}

function draw() {
  // Your draw code
  if (!myArray) {
    // Data hasn't loaded yet, exit draw
    return;
  }

  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // Get the custom fill color for each cell
      fill(fillColors[i][j]);

      rect(j * cellSize, i * cellSize, cellSize, cellSize);
    }
  }
}

// !! Test data and function (WORKS)
// let myArray = [
//   [
//     [1, 0, 1],
//     [0, 1, 0],
//     [1, 0, 1],
//   ],
// ];

// function setup() {
//   let numRows = myArray[0].length;
//   let numCols = myArray[0][0].length;
//   let cellSize = 50; // Adjust this as needed
//   createCanvas(numCols * cellSize, numRows * cellSize);

//   for (let i = 0; i < numRows; i++) {
//     for (let j = 0; j < numCols; j++) {
//       let colorValue = myArray[0][i][j]; // Assuming the value 1 corresponds to blue
//       let fillColor = color(colorValue * 255, 0, (1 - colorValue) * 255);
//       fill(fillColor);
//       rect(j * cellSize, i * cellSize, cellSize, cellSize);
//     }
//   }
// }
