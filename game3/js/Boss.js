class Boss {
	constructor(){
		// position:
		this.x = 500;
		this.y = 670;
		this.pos = new Vector(0, 0);
		// velocity:
		this.vx = 0;
		this.vy = 0;

		// setup anchor point:
		this.ax = -48;
		this.ay = -48;

		// setup collision:
		this.aabb = new AABB(76, 76);
	}
	update(){
		this.move();

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();

	}
	move(){
		var inputX = 0;
		var inputY = 0;

		const moveAccel = 1200;
		const maxVel = 400;
	}
	draw(){
		this.aabb.draw("#666");

		const gfx = game.view.gfx;
		//gfx.drawImage(this.imgs[this.animFrame], this.x + this.ax, this.y + this.ax);
	}
}