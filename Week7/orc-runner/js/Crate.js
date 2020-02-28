class Crate {
	constructor(){
		this.x = game.view.canvas.width + 48;
		this.y = 356;// setup anchor point:
		this.ax = -48;
		this.ay = -48;

		this.aabb = new AABB(96, 96);

		this.vx = -250;
		this.img = new Image();
		this.img.src = "imgs/crate.png";
		this.dead = false;
	}
	update(){
		this.x += this.vx * game.time.dt;
		if(this.x < -96) this.dead =true;
		this.aabb.center.x = this.x;
		this.aabb.center.y = this.y;
		this.aabb.recalc();
	}
	draw(){
		//game.view.gfx.drawImage(sprites.crate, this.x, this.y);
		game.view.gfx.drawImage(this.img, this.x + this.ax, this.y + this.ay);
		//this.aabb.draw();
	}
}