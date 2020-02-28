class ScenePlay {
	constructor(){

		this.player = new Player();
		this.delayCrateSpawn = 0;
	}
	update(){
		
		this.player.update();

	}
	draw(){
		this.player.draw();

	}
}