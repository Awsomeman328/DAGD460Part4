class Game {

	constructor(){

		this.time = {
			now:0,
			prev:0,
			dt:0,
			calc:function(now){
				this.dt = (now - this.prev)/1000;
				this.now = this.prev = now;
			}
		};

		this.view = {
			canvas:null,
			gfx:null,
		};

		this.scene = new ScenePlay();

	}
	tick(now){
		// time calculation:
		this.time.calc(now);

		// update game objects:
		if(this.scene) this.scene.update();

		// draw game objects:
		this.view.gfx.fillStyle="#888";
		this.view.gfx.fillRect(0,0,this.view.canvas.width,this.view.canvas.height);
		if(this.scene) this.scene.draw();

		// late-update:
		keyboard.update();
		requestAnimationFrame( (time) => { this.tick(time); } );
	}
	start(id){
		this.view.canvas = document.getElementById(id);
		if(!this.view.canvas) return;

		this.view.gfx = this.view.canvas.getContext("2d");
		if(!this.view.gfx) return;

		this.tick(0);
	}
}