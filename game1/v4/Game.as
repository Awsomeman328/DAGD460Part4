package {

	import flash.display.MovieClip;
	import flash.events.Event;
	import flash.events.MouseEvent;
	import flash.media.SoundChannel;
	import flash.utils.getTimer;

	public class Game extends MovieClip {

		public static var deltaTime: Number;
		var musicChannel: SoundChannel;
		/** The timestamp of the previous frame, measured in milliseconds. */
		var previousTime: int = 0;
		/** This array hold a collection of Enemy objects.*/
		var enemies: Array = new Array();
		var bullets: Array = new Array();
		var particles: Array = new Array();

		/**This countdown timer keeps track of how many frames to wait until spawning the next Enemy.*/
		var delaySpawn: Number = 0;

		public function Game() {
			// constructor code
			//var music: SoundMusic = new SoundMusic();
			//musicChannel = music.play();


			addEventListener(Event.ENTER_FRAME, gameLoop);
			stage.addEventListener(MouseEvent.CLICK, handleClick);
		} // Ends Game Constructor
		private function spawnEnemy(): void {
			var e: Enemy = new Enemy(); //1. spawn the object
			addChild(e); //2. add it to the scene graph
			enemies.push(e); //3.  add it to our collection
		} // Ends spawnEnemy
		private function spawnBullet(): void {
			var e: Bullet = new Bullet(player); //1. spawn the object
			addChild(e); //2. add it to the scene graph
			bullets.push(e); //3.  add it to our collection
		} // Ends spawnEnemy
		private function spawnSmokeParticle(spawnX: Number, spawnY: Number): void {
			var p: ParticleSmoke = new ParticleSmoke(spawnX, spawnY);

			addChild(p);
			particles.push(p);
		}
		private function spawnEnemyParticles(spawnX: Number, spawnY: Number): void {

			for (var i: int = 0; i < 20; i++) {
					var p: ParticleEnemy = new ParticleEnemy(spawnX, spawnY);
					addChild(p);
					particles.push(p);
				}

			}
			private function doEnemySpawning(): void {
				delaySpawn -= deltaTime;
				if (delaySpawn <= 0) {
					spawnEnemy();
					delaySpawn = Math.random() * 2 + 1;
				}
			}
			private function updateAllEnemies(): void {
				for (var i: int = enemies.length - 1; i >= 0; i--) {
					enemies[i].update(deltaTime);
					if (enemies[i].isDead) {
						// remove event listener ???
						removeChild(enemies[i]); // remove from scene graph
						enemies.removeAt(i);
					}
				}
			}
			private function updateAllBullets(): void {
				for (var j: int = bullets.length - 1; j >= 0; j--) {
					bullets[j].update(deltaTime);
					if (bullets[j].isDead) {
						// remove event listener ???
						removeChild(bullets[j]); // remove from scene graph
						bullets.removeAt(j);
					} else {
						spawnSmokeParticle(bullets[j].x, bullets[j].y);
					}
				}
			}
			private function updateAllParticles(): void {
				for (var j: int = particles.length - 1; j >= 0; j--) {
					particles[j].update();
					if (particles[j].isDead) {
						// remove event listener ???
						removeChild(particles[j]); // remove from scene graph
						particles.removeAt(j);
					}
				}
			}
			private function doCollisionChecks(): void {
				for each(var b: Bullet in bullets) { // for each bullet do the following...
					for each(var enemy: Enemy in enemies) {
						if (checkCollision(b, enemy)) {
							enemy.isDead = true;
							b.isDead = true;
							spawnEnemyParticles(enemy.x, enemy.y);
						}

					}
				} // End collision detection	
			}
			private function gameLoop(e: Event): void {

				deltaTime = getDeltaTime();

				doEnemySpawning();
				player.update();
				updateAllEnemies();
				updateAllBullets();
				updateAllParticles();
				doCollisionChecks();
			} // End gameLoop

			private function checkCollision(b: Bullet, e: Enemy): Boolean {
				var dx: Number = b.x - e.x;
				var dy: Number = b.y - e.y;
				var dis: Number = Math.sqrt(dx * dx + dy * dy);
				if (dis <= e.radius + b.radius) {
					return true;
				}
				return false;
			}

			private function getDeltaTime(): Number {
				var currentTime: int = getTimer();
				var deltaTime: Number = (currentTime - previousTime) / 1000.0;
				previousTime = currentTime; // cache this value for the next frame...

				return deltaTime;
			}
			private function handleClick(e: MouseEvent): void {
				//var warbble: SoundWarble = new SoundWarble();
				//warble.play();
				//musicChannel.stop();

				spawnBullet();
			}
		} // End class
	} // End package