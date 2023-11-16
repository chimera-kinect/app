let particles = []
let colors = "292723-736652-FFE6C0-FFFAF2-C6B474-BAECA3-FDD672-f15946".split("-").map(a=>"#"+a)
class Particle{
	constructor(args){
		let def = {
			lastP: createVector(0,0),
			p: createVector(0,0),
			v: createVector(0,0),
			a: createVector(0,0),
			color: random(colors),
			rSpan: random([5,10,20,50,100,200]),
			dashSpan: random([1,10,10000000]),
			alive: true,
			r: random(0.3,random(2)),
			live: 100,
			gen: 0,
		}
		Object.assign(def,args)
		Object.assign(this,def)
	}
	update(){
		this.lastP.x = this.p.x
		this.lastP.y = this.p.y
		this.p.add(this.v)
		this.v.add(this.a)
		
		this.v.mult(0.9)
		
		// this.a.y =-0.1
		this.live-=1
		if (this.live<0 && random()<0.05 && this.gen<2){
			this.alive=false
			for(let i=0;i<5;i++){
				particles.push(new Particle({
					p: this.p.copy(),
					v: p5.Vector.random2D().mult(5),
					gen: this.gen+1
				}))
			}
		}
		
		if (this.gen==1){
			this.p.y+=sin(this.p.x/this.rSpan)*4
			this.p.x+=sin(this.p.y/this.rSpan)*4
		}
		
		if (this.gen==2){
			this.p.y+=sin(this.p.x/this.rSpan*5)*2
			this.p.x+=sin(this.p.y/this.rSpan*5)*2
			this.v.rotate(sin(this.p.x/this.rSpan*5 + this.p.y/this.rSpan*5)/10)
			this.r*=0.99
		}
		
	// 	if (frameCount%15==0){
	// 		this.v.rotate(random([PI/2,-PI/2]))
	// 	}
		
	// 	this.v.rotate(0.04)
		
	// 	if (int(this.p.x)%20==0){
	// 		this.v.x+=(noise(this.p.x*100,100000)-0.5)/10
	// 		this.v.y+=(noise(this.p.y*100,5)-0.5)/10
	// 		// this.p.y+=sin(this.p.x/5)*2
	// 		// this.p.x+=sin(this.p.y/5)*2
	// 		// this.v.x+=random(-1,1)
	// 		// this.v.y+=random(-1,1)
	// 		if (random()<0.3){
	// 			this.color = random(random([colors]))
	// 		}
	// 	}
	// 	let delta = createVector(width/2,height/2).sub(this.p)
	// 	this.p.add(delta.mult(0.1).limit(4))
	// 	this.v.mult(0.999)
	// 	this.r*=0.998
	}
	draw(){
		push()
			noStroke()
		
		if (this.gen<2){
			strokeWeight(this.r*0.7)
			stroke(this.color)
			 line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
		}else{
			fill(this.color)
			translate(this.p.x,this.p.y)
			ellipse(0,0,this.r)
		}
			// if ((frameCount % this.dashSpan)<this.dashSpan*0.7){
			// 	line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			// }
			// if (random()<0.1){
			// 	noStroke()
			// 	fill(0,100)
			// 	for(var i=0;i<5;i++){
			// 		ellipse(this.p.x+random(-20,20),this.p.y+random(-20,20),random(2))
			// 	}
			// }
			// let c = color(this.color)
			// c.setAlpha(3)
			// stroke(c)
			// blendMode(SCREEN)
			// for(var i=4;i<5;i++){
			// 	strokeWeight(i*3)
			// 	line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			// }
			// strokeWeight(6)
			// line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			// strokeWeight(8)
			// line(this.lastP.x,this.lastP.y,this.p.x,this.p.y)
			
			// ellipse(0,0,this.r*2)
			// ellipse(0,0,this.r*3)
			// ellipse(0,0,this.r*4)
		pop()
		
	}
}

function setup() {
	pixelDensity(2)
	createCanvas(500, 475);
	fill(0)
	rect(0,0,width,height)
	setTimeout(()=>{
	for(let i=0;i<180;i++){
		particles.push(new Particle({
			p: createVector(mouseX,mouseY),
			v: p5.Vector.random2D().mult(20)
		}))
	} 
	
	},500)
}

function draw() {
	if(mouseIsPressed)
        particles.forEach(p=>{
            p.update()
            p.draw()
        })
        particles = particles.filter(p=>p.alive)
        //circle(mouseX, mouseY, 20);
    }
// this sketch is now a module. the browser doesn't know of the setup and draw functions existence
// let it know then by assigning the functions to the window object
window.setup = setup;
window.draw = draw;