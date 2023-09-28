let img; // The image to explode
let explosion = false; // Flag to track explosion state
let explosionRadius = 0; // Radius of explosion
let originalImage; // Original image copy
let explosionX;
let explosionY;
let lastFrameTime;


function preload() {
  // Load your image
  img = loadImage("assets/new.png");
}

function setup() {
  createCanvas(img.width, img.height);
  originalImage = img.get();
  image(img, 0, 0);
}

function draw() {
  if (explosion) {
    loadPixels();

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let dx = x - explosionX;
        let dy = y - explosionY;
        let distance = sqrt(dx * dx + dy * dy);

        if (distance < explosionRadius) {
          // Calculate the angle for dispersion effect
          let angle = atan2(dy, dx);

          // Adjust the displacement value to control the dispersion
          let displacement = random(0, explosionRadius);

          // Calculate the new position
          let newX = x + cos(angle) * displacement;
          let newY = y + sin(angle) * displacement;

          // Ensure the new position is within bounds
          newX = constrain(newX, 0, width - 1);
          newY = constrain(newY, 0, height - 1);

          // Sample the pixel from the original image and set it at the new position
          let originalColor = originalImage.get(newX, newY);
          set(x, y, originalColor);
        }
      }
    }
    updatePixels();
  }
}

function mouseDragged() {
  explosion = true;
  explosionX = mouseX;
  explosionY = mouseY;

  // Calculate the time difference between frames and use it to increase explosion radius
  let deltaTime = millis() - lastFrameTime;
  explosionRadius += deltaTime * 0.2; // Adjust the multiplier for the rate of increase

  // Store the current timestamp as the last frame time
  lastFrameTime = millis();
}

function mouseReleased() {
  explosion = false;
  image(originalImage, 0, 0); // Restore the original image when the mouse is released
  explosionRadius = 0; // Reset the explosion radius
}

function mousePressed() {
  // Initialize lastFrameTime when the mouse is pressed
  lastFrameTime = millis();
}

window.preload = preload;
window.setup = setup;
window.draw = draw;
window.mouseReleased = mouseReleased;
window.mouseDragged = mouseDragged;
window.mousePressed = mousePressed;
