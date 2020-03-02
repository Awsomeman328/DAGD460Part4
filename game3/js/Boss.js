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

		this.prevVX = 0;
		this.prevVY = 0;

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
		this.atkMode = Math.random() * (3);
		this.atkDirection = 0;//Math.random() * (3);
		this.ready4Atk = false;
		this.firstTime = true;
		this.inPosition = false;
		this.atkTimer = Math.random() + 4;
		this.atkOver = false;
		this.beamRange = 1;

		this.easing = 0.05;
		
	}
	update(){
		this.clearAtkHitboxes();
		switch(this.bossState){
			case "idle":
			game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 2, this.h * 2)];
			this.vx = Math.random() * (1000 - -1000) + -1000;
			this.vy = Math.random() * (1000 - -1000) + -1000;
			this.idleTimer -= game.time.dt;
			if(this.idleTimer < 0) {
				this.bossState = "atks";
				this.idleTimer = parseFloat( Math.random() * (2 - 1) + 1);
				this.atkMode = Math.random() * (3);
				this.atkDirection = Math.random() * (3);
				this.ready4Atk = false;
				this.firstTime = true;
				this.inPosition = false;
				this.atkTimer = Math.random() + 4;
				this.atkOver = false;
				this.beamRange = 1;
			}
			break;

			case "weak":
			this.vx = Math.random() * (100 - -100) + -100;
			this.vy = Math.random() * (100 - -100) + -100;
			this.idleTimer -= game.time.dt;
			if(this.idleTimer < 0) {
				this.idleTimer = parseFloat( Math.random() * (2 - 1) + 1);
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

				// setup different atks:
				switch(Math.round(this.atkMode)){
					case 0: // teleport randomly around the screen for 1-2 sec.
					this.x = Math.random() * (1200 - 80) + 80;
					this.y = Math.random() * (600 - 120) + 120;
					this.idleTimer -= game.time.dt;
					if(this.idleTimer < 0) {
						this.atkMode = -1;
					}
					break;
					
					case 1: // pick randomly from NSEW to go off screen in that direction. Then peep in, aligning self with player on 1 axis.
						// After that, sprint to the other side of the screen. Once there, return to center of screen and go to weak.
						//console.log("begin charge atk!");
						if(this.ready4Atk == false) this.chooseDirection();
						else{
							//this.clearAtkHitboxes();
							if(this.inPosition == false)this.comeBack();
							else {
								
								this.idleTimer -= game.time.dt;
								if(this.idleTimer < 0){
									//game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * 4)];
									if(this.atkOver == false) {
										this.chargeATK();
										if(this.y < -720 || this.x < -1280 || this.x >1280*2 || this.y > 720*2){
											this.atkOver = true;
										}
									}
									else{
										this.atkOver = true;
										//this.clearAtkHitboxes();
										console.log("returning to center screen...");

										this.vx = 0;
										this.vy = 0;

										this.dx = 640 - this.x;
										this.x += this.dx * this.easing;

										this.dy = 360 - this.y
										this.y += this.dy * this.easing;

										//console.log("I'm currently at x: " + this.x + " y: " + this.y);

										if(this.x > 600 && this.x < 700 && this.y > 300 && this.y < 400){
											console.log("I feel weak...");
											this.atkMode = -1;
										}
									}
								} else {
									this.keepAlignWithPlayer();
									
								}
							}
						}
						/*
						this.idleTimer -= game.time.dt;
						if(this.idleTimer < 0) {
							this.atkMode = -1;
						}*/
						break;

					case 2: // pick randomly from NSEW to go off screen in that direction. Then peep in, aligning self with player on 1 axis.
						// After that, spawn a hit box that flies towards the player. Do this 3 times then go to weak.
						if(this.ready4Atk == false) this.chooseDirection();
						else{
							//this.clearAtkHitboxes();
							if(this.inPosition == false)this.comeBack();
							else {
								
								this.idleTimer -= game.time.dt;
								if(this.idleTimer < 0){
									//game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * 4)];
									if(this.atkOver == false) {
										//projectileAtk
										this.atkOver = true;
									}
									else{
										this.atkOver = true;
										//this.clearAtkHitboxes();
										console.log("returning to center screen...");

										this.vx = 0;
										this.vy = 0;

										this.dx = 640 - this.x;
										this.x += this.dx * this.easing;

										this.dy = 360 - this.y
										this.y += this.dy * this.easing;

										//console.log("I'm currently at x: " + this.x + " y: " + this.y);

										if(this.x > 600 && this.x < 700 && this.y > 300 && this.y < 400){
											console.log("I feel weak...");
											this.atkMode = -1;
										}
									}
								} else {
									this.keepAlignWithPlayer();
									
								}
							}
						}
						/*
						console.log("FIRE!");
						if(this.ready4Atk == false) this.chooseDirection();
						else{
							this.clearAtkHitboxes();
						}
						this.idleTimer -= game.time.dt;
						if(this.idleTimer < 0) {
							this.atkMode = -1;
						}*/
						break;

					case 3: // pick randomly from NSEW to go off screen in that direction. Then peep in, aligning self with player on 1 axis.
						// After that, spawn a hit box that streatches accross the screen. Once there, squish all the hitboxes to nothing and go to weak.
						if(this.ready4Atk == false) this.chooseDirection();
						else{
							//this.clearAtkHitboxes();
							if(this.inPosition == false)this.comeBack();
							else {
								
								this.idleTimer -= game.time.dt;
								if(this.idleTimer < 0){
									//game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * 4)];
									if(this.atkOver == false) {
										this.beamATK();
										this.atkTimer -= game.time.dt;
											if(this.atkTimer < 0){
												this.atkOver = true;
												this.clearAtkHitboxes();
											}
									}
									else{
										this.atkOver = true;
										//this.clearAtkHitboxes();
										console.log("returning to center screen...");

										this.vx = 0;
										this.vy = 0;

										this.dx = 640 - this.x;
										this.x += this.dx * this.easing;

										this.dy = 360 - this.y
										this.y += this.dy * this.easing;

										//console.log("I'm currently at x: " + this.x + " y: " + this.y);

										if(this.x > 600 && this.x < 700 && this.y > 300 && this.y < 400){
											console.log("I feel weak...");
											this.atkMode = -1;
										}
									}
								} else {
									this.keepAlignWithPlayer();
									
								}
							}
						}
						/*
						console.log("BEAM!");
						if(this.ready4Atk == false) this.chooseDirection();
						else{
							this.clearAtkHitboxes();
						}
						this.idleTimer -= game.time.dt;
						if(this.idleTimer < 0) {
							this.atkMode = -1;
						}*/
						break;

					case -1: // change atkMode to this case to change bossState to "weak".
					this.idleTimer = parseFloat( Math.random() * (2 - 1) + 1);
					this.bossState = "weak";
					default:
					[new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * 4)];
					this.atkMode = -1;
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

	beamATK(){
		console.log("BEAM!");
		this.beamRange++;
		if(this.beamRange > 40) this.beamRange = 40;
		switch(Math.round(this.atkDirection)){
			case 0: // 0 - 0.499
				// attack from above
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * this.beamRange, 0, 10)];
				break;
			case 1: // 0.5-1.499
				// attack from the left
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * this.beamRange, this.h * 4, 10, 0)];
				break;
			case 2: // 1.5-2.499
				// attack from the right
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * this.beamRange, this.h * 4, 10, 0)];
				break;
			case 3: // 2.5-3
				// attack from below
				game.scene.atks = [new ATK(this.x, this.y, 0, 0, this.w * 4, this.h * this.beamRange, 0, 10)];
				break;
			default:
				this.atkDirection = 1;
			}
	}

	chargeATK(){
		console.log("CHARGE!");
		switch(Math.round(this.atkDirection)){
			case 0: // 0 - 0.499
				// attack from above
				this.vy += 10;
				break;
			case 1: // 0.5-1.499
				// attack from the left
				this.vx += 10;
				break;
			case 2: // 1.5-2.499
				// attack from the right
				this.vx -= 10;
				break;
			case 3: // 2.5-3
				// attack from below
				this.vy -= 10;
				break;
			default:
				this.atkDirection = 1;
			}
		}

	keepAlignWithPlayer(){
		console.log("taking aim...");
		switch(Math.round(this.atkDirection)){
			case 0: // 0 - 0.499
			// attack from above
				if(game.scene.player) this.x = game.scene.player.x;
				break;
			case 1: // 0.5-1.499
				// attack from the left
				if(game.scene.player) this.y = game.scene.player.y;
				break;
			case 2: // 1.5-2.499
				// attack from the right
				if(game.scene.player) this.y = game.scene.player.y;
				break;
			case 3: // 2.5-3
				// attack from below
				if(game.scene.player) this.x = game.scene.player.x;
				break;
			default:
				this.atkDirection = 1;
			}
		}

	comeBack(){
		switch(Math.round(this.atkDirection)){
			case 0: // 0 - 0.499
			// attack from above
			if(game.scene.player) this.x = game.scene.player.x;
			if(this.firstTime){
				console.log("teleporting to position");
				
				this.y = -100;
				this.vx = 0;
				this.vy = 10;
				this.firstTime = false;
			} else if(this.y <= 0){
				console.log("coming back!");
				this.vy += 10;
			} else{
				console.log("slowing down...");
				this.vy -= 10;
				if(this.vy <= 0) {
					console.log("I've stopped");
					this.vy = 0;
					this.inPosition = true;
					}
				}
				break;
			case 1: // 0.5-1.499
				// attack from the left
				if(game.scene.player) this.y = game.scene.player.y;
				if(this.firstTime){
				console.log("teleporting to position");
				this.x = -100;
				
				this.vx = 10;
				this.vy = 0;
				this.firstTime = false;
			} else if(this.x <= 0){
				console.log("coming back!");
				this.vx += 10;
			} else{
				console.log("slowing down...");
				this.vx -= 10;
				if(this.vx <= 0) {
					console.log("I've stopped");
					this.vx = 0;
					this.inPosition = true;
					}
				}
				break;
			case 2: // 1.5-2.499
				// attack from the right
				if(game.scene.player) this.y = game.scene.player.y;
				if(this.firstTime){
				console.log("teleporting to position");
				this.x = 1380;
				
				this.vx = -10;
				this.vy = 0;
				this.firstTime = false;
			} else if(this.x >= 1280){
				console.log("coming back!");
				this.vx -= 10;
			} else{
				console.log("slowing down...");
				this.vx += 10;
				if(this.vx >= 0) {
					console.log("I've stopped");
					this.vx = 0;
					this.inPosition = true;
					}
				}
				break;
			case 3: // 2.5-3
				// attack from below
				if(game.scene.player) this.x = game.scene.player.x;
				if(this.firstTime){
				console.log("teleporting to position");
				
				this.y = 820;
				this.vx = 0;
				this.vy = -10;
				this.firstTime = false;
			} else if(this.y >= 720){
				console.log("coming back!");
				this.vy -= 10;
			} else{
				console.log("slowing down...");
				this.vy += 10;
				if(this.vy >= 0) {
					console.log("I've stopped");
					this.vy = 0;
					this.inPosition = true;
					}
				}
				break;
			default:
				this.atkDirection = 1;
			}
		}

	chooseDirection(){
		switch(Math.round(this.atkDirection)){
			case 0: // 0 - 0.499
				// attack from above
				console.log("FROM ABOVE!");
				this.vx = 0;
				this.vy -= 20;
				if(this.y < -720){
					this.ready4Atk = true;
				}
				break;
			case 1: // 0.5-1.499
				// attack from the left
				console.log("FROM THE LEFT!");
				this.vx -= 20;
				this.vy = 0;
				if(this.x < -1280){
					this.ready4Atk = true;
				}
				break;
			case 2: // 1.5-2.499
				// attack from the right
				console.log("FROM THE RIGHT!");
				this.vx += 20;
				this.vy = 0;
				if(this.x > 1280*2){
					this.ready4Atk = true;
				}
				break;
			case 3: // 2.5-3
				// attack from below
				console.log("FROM BELOW!");
				this.vx = 0;
				this.vy += 20;
				if(this.y > 720*2){
					this.ready4Atk = true;
				}
				break;
				default:
				this.atkDirection = 1;
			}
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
		this.prevVX = this.vx;
		this.prevVY = this.vy;
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