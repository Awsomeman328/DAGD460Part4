package {
	
	import flash.display.MovieClip;
	
	
	public class Player extends MovieClip {
		
		public const R2D: Number = 180 / Math.PI;
		public const D2R: Number = Math.PI / 180;
		
		
		public function Player() {
			// constructor code
		} // End Player constructor
		
		public function update(): void {
			
			
			var dx: Number = parent.mouseX - x;
			var dy: Number = parent.mouseY - y;
			
			var radians: Number = Math.atan2(dy, dx);
			var degrees: Number = radians * R2D;
			
			rotation = degrees;
		} // End update
	} // End class
} // End package