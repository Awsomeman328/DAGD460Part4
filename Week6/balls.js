
const rand = (min, max) => {
    return Math.random() * (max - min) + min;
};

class Ball {
    
    constructor(){
        
        // props:
        this.x = rand(0, window.innerWidth);
        this.y = rand(0, window.innerHeight);
        
        this.vx = 0;
        this.vy = 0;
        
        this.size = rand(100, 500); // 100 to 500
        this.mass = this.size / 20;
                         
        const r = rand(0,255);
        const g = rand(0,255);
        const b = rand(0,255);
                         
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
        
        const dx = (mouse.x - this.x);
        const dy = (mouse.y - this.y);
        
        const a = 1 / this.mass;
        
        this.vx += (dx > 0) ? a : -a;
        this.vy += (dy > 0) ? a : -a;
        
        this.x += this.vx;
        this.y += this.vy;
        
        this.updateStyle();
    }
};

// spawn a bunch of balls
const balls = [];
for(let i = 0; i < 100; i++){
    balls.push(new Ball());
    balls.push(new Ball());
}

// setup mouse
const mouse = {
    x: 0,
    y:0
};

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});


// move them around
let prev = 0;
function gameLoop(now){
    
    balls.forEach(b => b.update());
    
    /*
    const dt = now - prev;
    prev = now;
    
    console.log(dt);
    */
    
    requestAnimationFrame(gameLoop);
}

/* How to pass additional info into gameLoop()
function gameLoop(now, n){
    
    const dt = now - prev;
    prev = now;
    
    console.log(n);
    
    requestAnimationFrame((t) => {gameLoop(t, 100); } );
}*/

gameLoop(0); // start game