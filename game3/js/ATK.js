class ATK{
	constructor(x, y, vx, vy, w, h, vw = 0, vh = 0){
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
		this.x += this.vx * game.time.dt;
		this.y += this.vy * game.time.dt;

		this.width += this.vw * game.time.dt;
		this.height += this.vh * game.time.dt;

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();
	}
	draw(){
		this.aabb.draw("#456");
	}
}
