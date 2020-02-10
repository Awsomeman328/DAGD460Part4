package  {
	
	import flash.display.MovieClip;
	
	
	public class ParticleEnemy extends Particle {
		
		public function ParticleEnemy(spawnX:Number, spawnY:Number) {
			// constructor code
			super(spawnX, spawnY);
			
			velocity.x = Math.random() * 1000 - 500;
			velocity.y = Math.random() * 1000 - 500;
			
			acceleration.y = 600
			
			lifeSpan = Math.random() * 1 + 1;
			
		}//End constructor
	}//End class
}//End package
