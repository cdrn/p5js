var nodes = [];
var numNodes = 50;
var node;

function setup () {
	createCanvas(1000, 480)
	for( i= 0; i < numNodes; i++) {
		n = new circObj(30, i)
		nodes.push(n);
	}
}

function draw () {
	for (j = 0; j < numNodes; j++) {
		nodes[j].place(nodes);
	}
	for (k = 0; k < numNodes; k++) {
		nodes[k].disp();	
	}
}

function circObj(d, id){
	this.x = random(width)
	this.y = random(height)
	this.d = d
	this.id = id;
	this.color = color(random(255),random(255),random(255))
	this.hit = true;

	this.place = function(objArray){

			for(i=0;i<objArray.length;i++){
				if(this.id != i){ //dont do the check if it is looking at itself

					this.hit = collideCircleCircle(this.x, this.y, this.d, objArray[i].x, objArray[i].y, objArray[i].d); //colliding with anything?

					if(this.hit == true){ // if we ever get a true we have to try again, this works since we iterate down through the objects one by one.
						//try again:
						this.x = random(width)
						this.y = random(height)
					}
				}
			}
	}

	this.disp = function(){
		noStroke();
		fill(this.color);
		ellipse(this.x,this.y,this.d,this.d);

	}

}