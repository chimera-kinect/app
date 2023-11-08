var points = [];
var EPSILON = 0.001;
var density = 50;

//Angle Bridage
var mult
let img
let pg

function preload(){
  img = loadImage('assets/bubble.png');
}

function setup() {
  // blendMode(EXCLUSION);

  createCanvas(windowWidth, windowHeight);

  pg = createGraphics(windowWidth, windowHeight); 
  // pg.image(img, 0, 0);
  pg.filter(BLUR, 10); //when larger more smooth but also slower
  //img = pg;

  background(10);
  angleMode(DEGREES);
 // noiseDetail(2, 0.2); - see no difference
  var space = width / density;
  for (var x = 0; x < width; x += space) {
    for (var y = 0; y < height; y += space) {
      var particle = new Object();
      particle.pos = createVector(x + random(-10, 10), y + random(-10, 10));
      particle.vel = createVector(random(-3, 3), random(-3, 3));
      particle.speed = random(-1, 1) > 0 ? 2 : -2; //better result if move different direction.
      particle.size = random(1, 5);
      particle.col = color(img.get(particle.pos.x, particle.pos.y));
      if (particle.pos.x > img.width || particle.pos.y > img.height) continue
      points.push(particle);
    }
  }

  mult = random(0.002, 0.01);
  preload();
}

function curl(x, y){ //vortex based on image gradient.
  //Find rate of change in X direction
  var n1 = brightness(color(img.get(x + 2, y))); // swapped 2 with 1 for all n's
  var n2 = brightness(color(img.get(x - 2, y)));
  //Average to find approximate derivative
  var a = (n1 - n2)/(2 * EPSILON);

  //Find rate of change in Y direction
  n1 = brightness(color(img.get(x, y + 2)));
  n2 = brightness(color(img.get(x, y - 2)));

  //Average to find approximate derivative
  var b = (n1 - n2)/(2 * EPSILON);

  return new createVector(b*2, -a); // added *2
}

function draw() {
  // fill(0, 4); // looks cool with
  // rect(0, 0, width, height);
	noStroke()


	// get colors from picture
	for(var i=0; i<points.length; i++){
    // set(points[i].pos.x, points[i].pos.y, points[i].col)
    // continue
    if (!mouseIsPressed) {

          var p = points[i];
          var c = color(img.get(p.pos.x, p.pos.y));
          var r = red(c); //map(points[i].x, 0, width, r1, r2)
          var g = green(c); //map(points[i].y, 0, height, g1, g2)
          var b = blue(c); //map(points[i].y, 0, width, b1, b2)
          var a = map(
            dist(width / 2, height / 2, p.pos.x, p.pos.y),
            0,
            380,
            255,
            0
          );
          var pc = p.col;
          var pa = alpha(pc) / 255.0;

    } else {
          var p = points[i];
          var c = color(255)
          var r = red(c); //map(points[i].x, 0, width, r1, r2)
          var g = green(c); //map(points[i].y, 0, height, g1, g2)
          var b = blue(c); //map(points[i].y, 0, width, b1, b2)
          var a = map(
            dist(width / 2, height / 2, p.pos.x, p.pos.y),
            0,
            380,
            255,
            0
          );
          var pc = p.col;
          var pa = alpha(pc) / 255.0;
    }

   //curl noise
    var cvec = curl(p.pos.x, p.pos.y);
    var cvecMag = cvec.mag(); // Calculates magnitude (length) of vector; mag() is a shortcut for writing dist(0, 0, x, y).
    var vec = cvec.normalize();

    p.color = color(r, g, b, a * pa);
    p.col = c;

    if (cvecMag > 500) {
      p.vel = vec; // normailizing draws straight lines
    }


    // if (!mouseIsPressed) {

    //   //perin noise version
    //   else {
    //     var angle = map(noise(p.pos.x * mult, p.pos.y * mult), 0, 1, 0, 720);
    //     p.vel = createVector(cos(angle) * p.speed, sin(angle) * p.speed);
    //   }
    // }

    p.pos.add(p.vel);

    if (dist(width / 2, height / 2, p.pos.x, p.pos.y) < 800) {
      fill(p.col);
      ellipse(p.pos.x, p.pos.y, ((p.size * brightness(c)) / 255.0) * 4);
    }
    // controls how many are drawn
    if (random(2000) < 1) {
      p.pos = createVector(random(width), random(height));
    }
  }
  // updatePixels()
}

function mouseClicked(){
	//
}

window.preload = preload
window.setup = setup
window.curl = curl
window.draw = draw
window.mouseClicked = mouseClicked