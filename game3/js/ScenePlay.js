class ScenePlay {
	constructor(){

		this.player = new Player();
		this.boss = new Boss();
		this.platforms = [
			new Platform(0.0, 25, 250),
		 	new Platform(100, 75, 175),
			new Platform(200, 150, 350),
			new Platform(404, 250, 654)
		];
		this.crates = [];
		this.delayPlatformSpawn = 0;
	}
	update(){
		
		this.delayPlatformSpawn -= game.time.dt;
		if(this.delayPlatformSpawn <= 0){
			this.platforms.push( new Platform() );
			this.delayPlatformSpawn = Math.random() * 2 + 1;
		}

		this.player.update();
		
		//this.platforms.forEach(p=>p.update()); // this is not a good method for updating arrays with things that can 'die'
		// updates (backwards) and checks if they're dead
		for(let i = this.platforms.length - 1; i >= 0; i--){
			this.platforms[i].update();

			if(this.platforms[i].aabb.overlaps(this.player.aabb)){
				// collision!
				// do damae / lose points
				this.platforms[i].dead = true;
			}

			if(this.platforms[i].dead){
				this.platforms.splice(i, 1);
			}
		}

	}
	draw(){

		

		this.platforms.forEach(p=>p.draw());
		this.player.draw();
	}
}