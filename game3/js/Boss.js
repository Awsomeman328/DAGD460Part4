class Boss {
	constructor(){
		this.maxHealth = 1000;
		this.health = this.maxHealth;

		// position:
		this.x = 1000;
		this.y = 100;
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
	takeDamage(amount){
		this.health -= amount;
		if(this.health < 0) {
			this.health = 0;
			this.dead = true;
		}
		if(this.health > this.maxHealth) this.health = this.maxHealth;
	}
	draw(){
		this.aabb.draw("#000");

		const gfx = game.view.gfx;
		//game.view.gfx.fillRect(this.min.x, this.min.y, this.halfSize.w * 2, this.halfSize.h * 2);
	}
}