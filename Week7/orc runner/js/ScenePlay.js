class ScenePlay {
	constructor(){

		this.player = new Player();
		this.bgs = [
			new TileBG(0.0, -25, "imgs/bg3.png"),
		 	new TileBG(100, -75, "imgs/bg2.png"),
			new TileBG(200, -150, "imgs/bg1.png"),
			new TileBG(404, -250, "imgs/stone.png")
		];
		this.crates = [];
		this.delayCrateSpawn = 0;
	}
	update(){
		

		this.delayCrateSpawn -= game.time.dt;
		if(this.delayCrateSpawn <= 0){
			this.crates.push( new Crate() );
			this.delayCrateSpawn = Math.random() * 2 + 1;
		}

		this.player.update();
		this.bgs.forEach(bg=>bg.update());
		//this.crates.forEach(c=>c.update()); // this is not a good method for anything that can 'die'
		// updates (backwards) and checks if they're dead
		for(let i = this.crates.length - 1; i >= 0; i--){
			this.crates[i].update();

			if(this.crates[i].aabb.overlaps(this.player.aabb)){
				// collision!
				// do damae / lose points
				this.crates[i].dead = true;
			}

			if(this.crates[i].dead){
				this.crates.splice(i, 1);
			}
		}



	}
	draw(){
		this.bgs.forEach(bg=>bg.draw());
		this.player.draw();
		this.crates.forEach(c=>c.draw());

	}
}