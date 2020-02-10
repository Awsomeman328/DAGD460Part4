package {

	import flash.display.MovieClip;


	public class Enemy extends MovieClip {

		/** This is the x component of the object's velocity. It is measured in px / second. */
		var vx: Number = 0;
		var vy: Number = -100;

		/** This is the x component of the object's acceleration. It is measured in px / second^2. */
		var ax: Number = 0;
		var ay: Number = 400;

		var mass: Number = 100;

		var fx: Number = 0;
		var fy: Number = 0;

		/**Wheather or not the object is ready to be removes from the game.*/
		public var isDead: Boolean = false;
		
		public var radius:Number = 18;

		public function Enemy() {
			// constructor code
			x = Math.random() * 550;
			y = -50;
		} // End Enemy constructor
		public function update(dt: Number): void {

			addForce(0, 10000); // force of gravity
			addForce(2, 0); // force of wind

			ax = fx / mass;
			ay = fy / mass;

			vx += ax * dt;
			vy += ay * dt;

			x += vx * dt;
			y += vy * dt;

			fx = 0;
			fy = 0;

			if (y > 1000) {
				isDead = true;
			}
		} // End update
		public function addForce(fx: Number, fy: Number): void {
			this.fx += fx;
			this.fy += fy;
		} // End addForce
	} // End class
} // End package