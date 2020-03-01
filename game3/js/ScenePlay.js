class ScenePlay {
	constructor(){

		this.player = new Player();
		this.healthBar;
		this.boss = new Boss();
		this.atks = [
		new ATK(1000, 0.0, 0, 0, 25, 250),
		new ATK(1000, 100, 0, 0, 75, 175),
		new ATK(1000, 200, 0, 0, 150, 350),
		new ATK(1000, 404, 0, 0, 250, 654)
		];
		this.crates = [];
		this.delayPlatformSpawn = 0;
		this.collisionStop = 0;
		this.gameOver = 0;
	}
	update(){
		
		this.delayPlatformSpawn -= game.time.dt;
		if(this.delayPlatformSpawn <= 0){
			//this.atks.push( new ATK() );
			this.delayPlatformSpawn = Math.random() * 2 + 1;
		}

		if(this.boss) this.boss.update();
		else {
			this.gameOver = 1;
		}

		if(this.player){
			this.player.update();
			//this.atks.forEach(p=>p.update()); // this is not a good method for updating arrays with things that can 'die'
			// updates (backwards) and checks if they're dead
			for(let i = this.atks.length - 1; i >= 0; i--){
				this.atks[i].update();

				if(this.atks[i].aabb.overlaps(this.player.aabb)){
					if(this.collisionStop < 1000){
						console.log("collision! " + this.atks[i]);
						this.collisionStop++;
					}
					// do damage / lose points
					this.player.takeDamage(1);
					//this.atks[i].dead = true;
				}

				if(this.atks[i].dead){
					this.atks.splice(i, 1);
				}
			}
			if(this.boss && this.boss.aabb.overlaps(this.player.aabb)){
				this.boss.takeDamage(1);
			}
		}
		else {
			this.gameOver = -1;
		}
		if(this.player && this.player.dead){
			delete this.player;
		}
		if(this.boss && this.boss.dead){
			delete this.boss;
		}
	}
	draw(){
		const gfx = game.view.gfx;
		this.atks.forEach(p=>p.draw());
		if(this.player){
			this.player.draw();
			gfx.fillStyle = "#700";
			gfx.fillRect(10, 10, this.player.maxHealth, 30);
			gfx.fillStyle = "#070";
			gfx.fillRect(10, 10, this.player.health, 30);
			gfx.fillStyle = "#700";
			gfx.font = "30px Arial";
			gfx.fillText(this.player.health + "/" + this.player.maxHealth, 10, 65);
		}
		if(this.boss){
			this.boss.draw();
			gfx.fillStyle = "#700";
			gfx.fillRect(250, 10, this.boss.maxHealth, 30);
			gfx.fillStyle = "#070";
			gfx.font = "30px Arial";
			gfx.fillRect(250, 10, this.boss.health, 30);
			gfx.fillText("BOSS", 1150, 65);
		}
		this.drawGameOver();
	}
	drawGameOver(){
		if(this.gameOver == 0) return;
		if(this.gameOver > 0){
			// Player Wins!
			game.view.gfx.font = "90px Arial";
			game.view.gfx.fillText("Game Over! You Win!", 200, 400);
		}
		if(this.gameOver < 0){
			// Player loses
			game.view.gfx.font = "90px Arial";
			game.view.gfx.fillText("Game Over! You Lose!", 200, 400);
		}
	}
}