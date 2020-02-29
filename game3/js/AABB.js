class AABB {

	constructor(w, h){

		this.halfSize = {w:w/2, h:h/2};
		this.center = {x:0, y:0};

		this.min = {x:0, y:0};
		this.max = {x:0, y:0};

	}
	recalc(){
		this.min.x = this.center.x - this.halfSize.w;
		this.max.x = this.center.x + this.halfSize.w;

		this.min.y = this.center.y - this.halfSize.h;
		this.max.y = this.center.y + this.halfSize.h;
	}
	overlaps(other){

		if(this.max.x < other.min.x) return false;
		if(this.min.x > other.max.x) return false;

		if(this.max.y < other.min.y) return false;
		if(this.min.y > other.max.y) return false;

		return true;
	}
	draw(color = "#f00"){
		game.view.gfx.fillStyle = color
		game.view.gfx.fillRect(this.min.x, this.min.y, this.halfSize.w * 2, this.halfSize.h * 2);
	}
}