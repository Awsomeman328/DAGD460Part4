class Player {
	constructor(){
		this.maxHealth = 200;
		this.health = this.maxHealth;
		this.dead = false;

		this.isGrounded = false;

		// position:
		this.x = 500;
		this.y = 670;
		this.pos = new Vector(0, 0);
		// velocity:
		this.vx = 0;
		this.vy = 0;

		// gravity:
		this.g = 2000;

		// jump velocity:
		this.jv = -1200;

		// setup size:
		this.w = 50;
		this.h = 76;

		// setup anchor point:
		this.ax = -this.w/2;
		this.ay = -this.h/2;

		// setup collision:
		this.aabb = new AABB(this.w, this.h);

		/*
		// load all images:
		this.imgs = [];
		this.animFrame = 0;
		this.animDelay = 0;

		for(let i = 0; i < 8; i++){

			const img = new Image();
			img.src = "imgs/run00"+(i+1)+".png";

			this.imgs.push(img);
		}*/
	}
	update(){

		this.move();

		// go to next frame in animation:
		/*this.animDelay -= game.time.dt;
		if(this.animDelay <= 0){
			this.animFrame++;
			if(this.animFrame >= this.imgs.length) this.animFrame = 0;
			this.animDelay = 1/15;
		}*/

		/*
		// I want to: if the player is grounded, when they jump, lower gravity. 
		// Then, if they are not grounded, keep gravity low if jump is still bring pressed down
		// If they are not grounded and jump is no longer being pressed, then gravity returns to normal, even if it gets pressed again.

		//console.log(this.isGrounded);
		if(this.isGrounded && keyboard.onDown( mapping.jump() )){
			this.vy = this.jv;
		}


		// apply gravity
		this.vy += this.g * game.time.dt;
		//console.log(this.y);
		*/

		if(keyboard.isDown(107)) this.health++;
		if(keyboard.isDown(109)) this.health--;
		if(this.health < 0) this.health = 0;
		if(this.health > this.maxHealth) this.health = this.maxHealth;

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();

	}
	move(){
		var inputX = 0;
		var inputY = 0;

		if(keyboard.isDown( mapping.right() )) inputX++;
		if(keyboard.isDown( mapping.left() )) inputX--;
		//console.log(inputX);
		if(keyboard.isDown( mapping.up() )) inputY--;
		if(keyboard.isDown( mapping.down() )) inputY++;
		//console.log(inputY);

		const moveAccel = 1200;
		const maxVel = 400;

		if(inputX != 0){
			//console.log("I WANT TO MOVE!");
			this.vx += moveAccel * game.time.dt * inputX;
			if(this.vx > maxVel) this.vx = maxVel;
			if(this.vx <-maxVel) this.vx = -maxVel;
		} else {
			// slow down
			if(this.vx < 0){ // moving left
				this.vx += moveAccel * game.time.dt;
				if(this.vx > 0) this.vx = 0;
			}
			if(this.vx > 0){ // moving right
				this.vx += -moveAccel * game.time.dt;
				if(this.vx < 0) this.vx = 0;
			}
		}

		if(inputY != 0){
			//console.log("I WANT TO MOVE!");
			this.vy += moveAccel * game.time.dt * inputY;
			if(this.vy > maxVel) this.vy = maxVel;
			if(this.vy <-maxVel) this.vy = -maxVel;
		} else {
			// slow down
			if(this.vy < 0){ // moving left
				this.vy += moveAccel * game.time.dt;
				if(this.vy > 0) this.vy = 0;
			}
			if(this.vy > 0){ // moving right
				this.vy += -moveAccel * game.time.dt;
				if(this.vy < 0) this.vy = 0;
			}
		}

		// clamp to the edges of the screen
		const wall = 1255;
		if(this.x > wall){
			this.x = wall;
			this.vx = 0;
		}
		if(this.x < 25){
			this.x = 25;
			this.vx = 0;
		}

		// clamp to ground
		this.isGrounded = false;
		const ground = 682;
		if(this.y > ground){
			this.y = ground;
			this.vy = 0;
			this.isGrounded = true;
		}

		if(this.y < 38){
			this.y = 38;
			this.vy = 0;
		}

		// euler physics step:
		this.x += this.vx * game.time.dt;
		this.y += this.vy * game.time.dt;



	}
	draw(){
		this.aabb.draw();

		const gfx = game.view.gfx;
		//gfx.fillStyle = "#700";
		//game.view.gfx.fillRect(this.x - (this.w + this.ax), this.y - (this.h + this.ay), this.x + (this.w + this.ax), this.y + (this.h + this.ay));
	}
	takeDamage(amount){
		this.health -= amount;
		if(this.health < 0) {
			this.health = 0;
			this.dead = true;
		}
		if(this.health > this.maxHealth) this.health = this.maxHealth;
	}
}

class Vector {
	constructor(x, y){
		this.x = x||0;
		this.y = y||0;
	}
	mag(){

	}
	angle(){
		return Math.atan2(this.y, this.x);
	}
}