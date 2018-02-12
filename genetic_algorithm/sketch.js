var nodes = [];
var deadNodes = [];
var numNodes = 50;
var node;
var canvas_height = 480;
var canvas_width = 1000;
var number_of_remaining_nodes;

function setup () {
	createCanvas(canvas_width, canvas_height)
	for( i= 0; i < numNodes; i++) {
		n = new circObj(30, i)
		nodes.push(n);
	}
}

function draw () {
	for (j = 0; j < numNodes; j++) {
		nodes[j].place(nodes);
	}
	background(200);
	for (k = 0; k < numNodes; k++) {
		nodes[k].disp();
		nodes[k].move();	
	}
	text('Number of remaining nodes: ' + calculateRemainingNodes(), 10, 30)
}

function calculateRemainingNodes () {
	var counter = 0;
	for(i=0; i<numNodes; i++) {
		if(nodes[i].isDead === false) {
			counter++
		}
	}
	return counter
}

function circObj(d, id){
	this.x = random(width)
	this.y = random(height)
	this.d = d
	this.accelerationX = random(-1.0, 1.0)
	this.accelerationY = random(-1.0, 1.0)
	this.id = id;
	this.color = color(random(255),random(255),random(255))
	this.hit = true;
	this.isDead = false;

	this.place = function(objArray){
			for(i=0;i<objArray.length;i++){
				if( this.id != i && !this.isDead && !objArray[i].isDead){ //dont do the check if it is looking at itself, or one circle isDead
					this.hit = collideCircleCircle(this.x, this.y, this.d, objArray[i].x, objArray[i].y, objArray[i].d); //colliding with anything?
					if( this.hit == true ){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
						this.isDead = true
					}
				}
			}
	}

	this.disp = function(){
		if(!this.isDead){
			noStroke();
			fill(this.color);
			ellipse(this.x,this.y,this.d,this.d);
		}
	}

	this.move = function(){
		this.x = this.x + this.accelerationX
		this.y = this.y + this.accelerationY
		// Bounce if we hit a canvas wall
		if (this.x <= 0 || this.y <= 0 || this.x >= canvas_width || this.y >= canvas_height) {
			this.accelerationX =- this.accelerationX
			this.accelerationY =- this.accelerationY
		}
	}

}