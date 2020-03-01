class ATK{
	constructor(x, y, vx, vy, w, h){
		this.x = x;
		this.y = y;

		// velocity:
		this.vx = vx;
		this.vy = vy;

		// size:
		this.width = w;
		this.height = h;

		// setup anchor point:
		this.ax = -w/2;
		this.ay = -h/2;

		// setup collision:
		this.aabb = new AABB(w, h);

		this.dead = false;
	}
	update(){
		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();
	}
	draw(){
		this.aabb.draw("#456");
	}
}
