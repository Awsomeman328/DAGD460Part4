
const rand = (min, max) => {
    return Math.random() * (max - min) + min;
};

// setup mouse
const mouse = {
    x: 0,
    y:0
};

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

const balls = [];

class Game {
    constructor(id){
        this.canvas = document.getElementById(id);
        //console.log(this.canvas);
        this.gfx = this.canvas.getContext("2d");
        //console.log(this.gfx);
        this.canvas.width = this.canvas.clientWidth;
        this.canvas.height = this.canvas.clientHeight;
        
        // add our own fillEllipse() to gfx:
        this.gfx.fillEllipse = (x, y, rx, ry)=> {
            this.gfx.beginPath();
            this.gfx.ellipse(x, y, rx, ry, 0, 0, 2 * Math.PI);
            this.gfx.fill();
        };

        // new Player(){ x = 42, y = 40 }

        this.time = {
            now:0,
            prev:0,
            dt:0,
            calc(now){
                now = now|0; // or +now;
                this.dt = (now - this.prev)/1000;
                this.prev = now;
                this.now = now;
            }
        };
    }
    
    fill(color = "#000"){ // clears the canvas back to the color passed in.
        this.gfx.fillStyle = color;
        this.gfx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
    tick(now){

        //calc delta time:
        this.time.calc(now);
        //console.log(this.time.dt);
        
        // update:
        //console.log("tick");
        

        // draw:
        this.fill("rgba(200, 50, 150)"); // clear screen
        
        
        //console.log(this);
        requestAnimationFrame((t)=>{this.tick(t); } );
    }
    
}

class Ball {

    constructor(){

        // props:
        this.x = 10;
        this.y = 10;

        this.vx = 0;
        this.vy = 0;

        this.size = 100;
        this.mass = this.size / 20;

        const r = 2;
        const g = 25;
        const b = 255;

        this.color = "rgb("+r+","+g+","+b+")";

        //this.color = "hsl(360, 100%, 50%)";

        this.div = document.createElement("div");
        document.body.appendChild(this.div);

        this.updateStyle();
    }
    updateStyle(){

        const s = this.div.style;

        s.background = this.color;
        s.width = this.size + "px";
        s.height = this.size + "px";
        s.borderRadius = this.size + "px";
        s.position = "absolute";
        s.left = this.x + "px";
        s.top = this.y + "px";
        s.marginTop = (-this.size/2) + "px";
        s.marginLeft = (-this.size/2) + "px";
    }
    update(){

        const dx = 0;
        const dy = 0;

        const a = 1 / this.mass;

        this.vx += (dx > 0) ? a : -a;
        this.vy += (dy > 0) ? a : -a;

        this.x += this.vx;
        this.y += this.vy;

        this.updateStyle();
    }
};

balls.forEach(b => b.update());

class Enemy extends Ball {
    constructor(){
        super();
    }
    draw(){
        super.draw();
    }
}

const game = new Game("game");
game.tick();


