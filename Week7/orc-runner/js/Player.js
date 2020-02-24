class Player {
	constructor(){

		this.isGrounded = false;

		// position:
		this.x = 0;
		this.y = 0;
		this.pos = new Vector(0, 0);
		// velocity:
		this.vx = 200;
		this.vy = 0;

		// setup anchor point:
		this.ax = -48;
		this.ay = -48;

		// setup collision:
		this.aabb = new AABB(50, 76);


		// load all images:
		this.imgs = [];
		this.animFrame = 0;
		this.animDelay = 0;

		for(let i = 0; i < 8; i++){

			const img = new Image();
			img.src = "imgs/run00"+(i+1)+".png";

			this.imgs.push(img);
		}
	}
	update(){

		this.moveHorizontal();

		// go to next frame in animation:
		this.animDelay -= game.time.dt;
		if(this.animDelay <= 0){
			this.animFrame++;
			if(this.animFrame >= this.imgs.length) this.animFrame = 0;
			this.animDelay = 1/15;
		}

		console.log(this.isGrounded);
		if(this.isGrounded && keyboard.onDown( mapping.jump() )){
			this.vy = -600;
		}

		// apply gravity
		this.vy += 1200 * game.time.dt;
		//console.log(this.y);
		// euler physics step:
		this.x += this.vx * game.time.dt;
		this.y += this.vy * game.time.dt;

		// clamp to ground
		this.isGrounded = false;
		const ground = 366;
		if(this.y > ground){
			this.y = ground;
			this.vy = 0;
			this.isGrounded = true;
		}

		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();

	}
	moveHorizontal(){
		let inputX = 0;

		if(keyboard.isDown( mapping.right() )) inputX++;
		if(keyboard.isDown( mapping.left() )) inputX--;
		//console.log(inputX);

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
	}
	draw(){

		this.aabb.draw();

		const gfx = game.view.gfx;
		gfx.drawImage(this.imgs[this.animFrame], this.x + this.ax, this.y + this.ax);
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