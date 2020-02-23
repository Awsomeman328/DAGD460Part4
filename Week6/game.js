

class Game {
    constructor(id){
        this.canvas = document.getElementById(id);
        //console.log(this.canvas);
        this.gfx = this.canvas.getContext("2d");
        //console.log(this.gfx);
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

        
        this.sprite = new Sprite("Darkrai.png");
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
        const x = 400 + Math.sin(this.time.now/1000) * 200;

        // draw:
        this.fill("rgba(200, 50, 150)"); // clear screen
        
        this.gfx.fillStyle = "#fff";
        this.gfx.fillEllipse(x, 250, 40, 40);
        
        this.sprite.x = x;
        this.sprite.draw(this.gfx);
        //console.log(this);
        requestAnimationFrame((t)=>{this.tick(t); } );
    }

}


class Sprite {
    constructor(url) {
        this.x = 0;
        this.y = 250;
        this.img = new Image();
        this.img.src = url;
    }
    draw(){
    
        game.gfx.translate(this.x, this.y);
        game.gfx.scale(.2,.2);
        game.gfx.rotate(game.time.now/1000);
        game.gfx.drawImage(this.img, -this.img.width/2, -this.img.height/2)
        game.gfx.resetTransform();
    }
    
}
class Enemy extends Sprite {
    constructor(){
        super();
    }
    draw(){
        super.draw();
    }
}

const game = new Game("game");
game.tick();


