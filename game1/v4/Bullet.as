package {

	import flash.display.MovieClip;


	public class Bullet extends MovieClip {

		const SPEED: Number = 800;

		var vx: Number = 0;
		var vy: Number = 0;
		public var radius:Number = 7;

		public var isDead: Boolean = false;

		public function Bullet(player: Player) {
			// constructor code
			x = player.x;
			y = player.y;

			var radians: Number = player.rotation * Math.PI / 180;

			vx = SPEED * Math.cos(radians);
			vy = SPEED * Math.sin(radians);
		} // End Bullet constructor

		public function update(dt: Number): void {
			x += vx * dt;
			y += vy * dt;
			if(Math.abs(x) > 1000 || Math.abs(y) > 1000) isDead = true;
		} // End update

	} // End class
} // End package