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

		this.w = 76;
		this.h = 76;

		// setup anchor point:
		this.ax = -48;
		this.ay = -48;

		// setup collision:
		this.aabb = new AABB(76, 76);

		// setup behavior
		this.bossState = "idle";
		this.idleTimer = 2;
	}
	update(){
		this.clearAtkHitboxes();
		switch(this.bossState){
			case "idle":
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 2, this.h * 2)];
				break;
			case "weak":

				break;
			case "dead":

				break;
			case "atks":

				break;
			default:

		}

		this.move();

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();

	}
	clearAtkHitboxes(){
		game.scene.atks.dead = true;
	}
	move(){
		var inputX = 0;
		var inputY = 0;

		const moveAccel = 1200;
		const maxVel = 400;

		this.x += this.vx;
		this.y += this.vy;
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