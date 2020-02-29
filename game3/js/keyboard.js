
const keys = {

	///////////// constant keyCode values:

	a:65,
	d:68,
	s:83,
	w:87,
	space:32,
	left:37,
	up:38,
	right:39,
	down:40
};

const mapping = {
	right(){return [keys.d, keys.right]; },
	left(){ return [keys.a, keys.left]; },
	jump(){ return keys.space; },
	up(){return [keys.w, keys.up]; },
	down(){return [keys.s, keys.down]; }
}

const keyboard = {
	keys:[],
	prev:[],
	isDown(keyCode){

		if(Array.isArray(keyCode)){
			let val = false;
			keyCode.forEach(k=>{
				if(this.keys[k]) val = true;
			});
			return val;
		}
		return this.keys[keyCode];
	},
	onDown(keyCode){

		if(Array.isArray(keyCode)){
			let val = false;
			keycode.forEach(k=>{
				if(this.keys[k] && !this.prev[k]) val = true;
				//if(this.onDown(k) val = true;
			});
			return val;
		}

		return this.keys[keyCode] && !this.prev[keyCode];
	},
	update(){
		// copy keys into prev:
		this.prev = this.keys.slice(0);
	},
	updateKey(e, value){
		console.log(e.keyCode + (value ? " is down" : " is up"));

		this.keys[e.keyCode] = value;
	},
	setup(){
		document.addEventListener("keydown", e=> this.updateKey(e, true) );
		document.addEventListener("keyup", e=> this.updateKey(e, false) );
	}
};

keyboard.setup();