package  {
	import flash.display.MovieClip;
	import flash.geom.Point;
	
	public class Particle extends MovieClip {

		protected var velocity:Point = new Point();
		protected var acceleration:Point = new Point();	
		
		protected var lifeSpan:Number = 0;
		protected var age:Number = 0;
		
		public var isDead:Boolean = false;
		
		public function Particle(spawnX:Number, spawnY:Number) {
			// constructor code
			x = spawnX;
			y = spawnY;
		}//End constructor
		
		public function update():void {
			
			velocity.x += acceleration.x * Game.deltaTime;
			velocity.y += acceleration.y * Game.deltaTime;
			
			x += velocity.x * Game.deltaTime;
			y += velocity.y * Game.deltaTime;
			
			age += Game.deltaTime;
			if(age > lifeSpan) isDead = true;
		}
		
		
		
	}//End class
}//End package
