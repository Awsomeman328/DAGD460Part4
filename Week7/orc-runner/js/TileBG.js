class TileBG {
	constructor(y, vx, url){
		this.x = 0;
		this.y = y;
		this.vx = vx;
		this.img = new Image();
		this.img.src = url;
	}
	update(){
		this.x += this.vx * game.time.dt;

		if(this.x < -this.img.width) this.x += this.img.width;
	}
	draw(){
		game.view.gfx.drawImage(this.img, this.x, this.y);
		game.view.gfx.drawImage(this.img, this.x + this.img.width, this.y);
	}
}