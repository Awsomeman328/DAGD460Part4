package  {
	
	import flash.display.MovieClip;
	
	public class ParticleSmoke extends Particle {
		
		public function ParticleSmoke(spawnX:Number, spawnY:Number) {
			// constructor code
			super(spawnX, spawnY);
			
			lifeSpan = Math.random() * .5 +.25;
			
			acceleration.y = -(Math.random() * 100 + 100);
		}//End constructor
		
		override public function update(): void {
			super.update();
			alpha -= .02
		}
	}//End class
}//End package
