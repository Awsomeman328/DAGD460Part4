class ATK{
	constructor(x, y, vx, vy, w, h, vw, vh){
		// position
		this.x = x;
		this.y = y;

		// velocity:
		this.vx = vx;
		this.vy = vy;

		// size:
		this.width = w;
		this.height = h;

		// size change:
		this.vw = vw;
		this.vh = vh;

		// setup anchor point:
		this.ax = -w/2;
		this.ay = -h/2;

		// setup collision:
		this.aabb = new AABB(w, h);

		this.dead = false;
	}
	update(){
		this.x += this.vx;
		this.y += this.vy;

		this.width += this.vw;
		this.height += this.vh;

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();
	}
	draw(){
		this.aabb.draw("#456");
	}
}
