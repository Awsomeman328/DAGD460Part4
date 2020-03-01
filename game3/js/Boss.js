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
				this.vx = Math.random() * (100 - -100) + -100;
				this.vy = Math.random() * (100 - -100) + -100;
				this.idleTimer -= game.time.dt;
				if(this.idleTimer < 0) {
					this.idleTimer = Math.random() * (2 - 1) + 1;
					this.bossState = "atks";
				}
				break;
			case "weak":
				this.vx = Math.random() * (10 - -10) + -10;
				this.vy = Math.random() * (10 - -10) + -10;
				this.idleTimer -= game.time.dt;
				if(this.idleTimer < 0) {
					this.idleTimer = Math.random() * (2 - 1) + 1;
					this.bossState = "idle";
				}
				break;
			case "dead":
				this.vx = 0;
				this.vy = 0;
				this.dead = true;
				break;
			case "atks":
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * 4)];
				this.vx = 0;
				this.vy = 0;
				this.x = Math.random() * (1200 - 80) + 80;
				this.y = Math.random() * (600 - 120) + 120;
				this.idleTimer -= game.time.dt;
				if(this.idleTimer < 0) {
					this.idleTimer = Math.random() * (2 - 1) + 1;
					this.bossState = "weak";
				}
				break;
			default:
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 2, this.h * 2)];
				this.bossState = "idle";
		}

		this.move();

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();

	}
	clearAtkHitboxes(){
		for(let i = game.scene.atks.length - 1; i >= 0; i--){
			game.scene.atks[i].dead = true;		
		}
	}
	move(){
		var inputX = 0;
		var inputY = 0;

		const moveAccel = 1200;
		const maxVel = 400;

		this.x += this.vx * game.time.dt;
		this.y += this.vy * game.time.dt;
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