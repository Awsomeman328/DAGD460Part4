
const rand = (min, max) => {
    return Math.random() * (max - min) + min;
};

class Game {
    constructor(id){
        this.canvas = document.getElementById(id);
        //console.log(this.canvas);
        this.gfx = this.canvas.getContext("2d");
        //console.log(this.gfx);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        
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
    tick(now){ // This is our Update Method, our GameLoop.

        //calc delta time:
        this.time.calc(now);
        //console.log(this.time.dt);
        
        // update:
        //console.log("tick");
        balls.forEach(b => b.update());
        

        // draw:
        this.fill("#00b"); // clear screen
        
        
        //console.log(this);
        requestAnimationFrame((t)=>{this.tick(t); } );
    }
    
}

/*
TO DO LIST:

Part 1: BALLS!
TODO: Set Blue Background
TODO: Spawn 1 red ball and 3 black balls
TODO: Have Red Ball follow the mouse
TODO: Have the 3 black balls move in random directions
TODO: Give all of the balls radial collision detection
    -Since all the balls will be in the same array, make sure the collision detection first checks if the 'current ball' is itself.
TODO: Have the black balls bounce off the edge of the canvas/screen/window
TODO: Have the black balls bounce off of each other
TODO: Every 20 sec:
    -Have White text fade in in the middle of the screen
    -Have that white text say 'n + " Balls" where n is the total number of balls
    -Spawn another black ball
        +Give the black balls two states: Spawning and Spawned
        +If Spawning, all it does is fade into existance until at full opasity. Then sets it's state to Spawned
        +If Spawned, do all other behavior listed before the previous line.
    -Once the ball has spawned, fade the white text back out.
TODO: Have Player die when it collides with a black ball
TODO: When Player.isDead = true, take away control of the player and send the red ball straight down until off screen.
TODO: When Player.isDead = true, stop updating the other balls
TODO: Create a gameOver State w/ a lose screen fading in after player 'falls' offscreen when dead.
TODO: Show Scoreboard
TODO: Show current time alive
TODO: Add Reset button

Part 2: Asteroids!
TODO: Darken the background (half blue, half black)
TODO: Give all balls a white border
TODO: Make player ball a triangle (will still use radial collision)
TODO: Add Keyboard Input
TODO: Change player controls:
    -Create two rotateStates for the player: A rotateWithMouse and a rotateWithKeyboard
    -rotateWithMouse:
        +The player no longer moves to where the mouse is on the screen
        +Instead, the player rotates it's 'front' to point to where the mouse is at
    -rotateWithKeyboard:
        +By pressing the 'D' or Right keys, the player will rotate clockwise
        +By pressing the 'A' or Left keys, the player will rotate counter-clockwise
    -By pressing the 'W' or Up keys or by right clicking w/ the mouse, the player will accelerate 'forward'.
    -By pressing the spacebar or left clicking, the player will spawn a ball with a 'forward' direction
TODO: All balls have a parent varrible that points to what spawned it, or what object 'owns' it
TODO: All balls check for both themselves and their parents.
    -If I have a parent, then check if I'm colliding w/ my parent or if we share the same parent.
TODO: The player has a maxSpeed
TODO: The player's velocity will slow down to 0 if the is no input.
TODO: Other balls will now get destroyed when colliding w/ the player or any of the player's projectiles.
TODO: Balls will now come in 3 different sizes: big, medium, and small
TODO: Big balls will spawn 3 medium balls when destroyed.
TODO: Medium balls will spawn 3 small balls when destroyed.
TODO: Destroying balls will now add to the player's score (10points)
TODO: Create a Points Multiplyer Varriable
TODO: The total number of balls in the balls array will determine the current multiplyer
TODO: Create A.I. Balls(2 different types)
    -All A.I. balls can shoot projectiles and will do so an a set cooldown
    -Big AI Balls
        +Will wonder around aimlessly
        +Shoot projectiles in random directions
    -Small AI Balls
        +Will always try to get closer to the player
        +Shoots it's projectiles towards the player, with some inaccuracey
    -As Score Increases, the less likely you will see the big AI Balls
    -As Score Increases, the more accurate the small AI balls shots will be.
TODO: Create Player Teleport Power.
    -By pressing "someButton", the player will teleport to a random spot on the screen.
    -Every time they teleport there is a chance they will self-destruct.
    -This chance starts at 1% and increases by 1% every time they use it.
    -If the player teleports inside another ball (that's not their own projectiles), they die.
TODO: Create a Level system that starts whenever there are no balls left (this does not include the player or their projectiles)
    -Display the current level in the GUI
    -Every 20sec (When the game spawns a new ball from before), increase the level by 1.
    -If all of the balls are destroyed before this happens, recreate the game on a 'new level' (increase the level by 1)
    -This new level starts with (3 + Current Level) asteroids, with the first level being level 0.
    -ScoreMultiplyer now adds currentLevel to it's multiplyer, w/ the first level being level 0.
TODO: Give the player lives.
    -Player starts w/ 3-5 lives
    -When the player dies now, the level is reset (not the game, just the level) with the player's lives decreasing by 1
    -Every 10,000 points, the player gains 1 life
    -The number of lives now affect the ScoreMultiplyer
    -Once the player gains a life after having 250 lives, they win the game!
TODO: Create a gameOver:Win screen

Part 3: Hacking!
TODO: Create PickUp Class
    -Most pickUps when the player collides with them set a vlue inside Player to ture, unlocking a 'power', then destroying themselves.
    -Player should lose all 'PickedUp powers' after startong a new level
TODO: Set Teleport Power to be a PickUp that player needs to collect to be able to use
TODO: Give Player a darker background and greener border
TODO: Set Player Projectiles to green
TODO: Create Movement PowerUp that changes player controls
    -Player can now press the directional keys & WASD for instant rotaion and movement.
    -Player's accelleration increases
    -Player now comes to a stop much more quickly
TODO: Create Rapid Fire PickUp (Hold fire button to rapidly shoot)
TODO: Medium Balls can now randomly drop 1 PowerUp instead of a small ball
TODO: Create SpinnyGear (ClockWorkDrones) Enemies
    -[DO THIS LAST (for testing purposes)] Set these enemies to only appear in level 2 and after
    -These Enemies are 'invincible' unless you collect a specific powerup
        +[Either the bullet will hit this enemy, explode and do nothing, or will be reflected off just like the border of the screens, but in a circuler fashion]
        +If a Clockwork Enemy spawns, then whenever you destroy a medium ball, a small 'PowerPart' Appears.
        +Up to m number of PowerParts appears where m is the current level number.
        +Once you have collected all of the powerParts, the player's bullets turn yellow and can now shoot the clockwork enemies
    -These enemies will slowly approach the player.
    -Once withinRange = true, it will spin for a second and fire a red-spinning projectile at the player.
        +This spinning projectile has mild tracking towards the player after it's been fired.
        +This projectile will also deal 5 damage to the player (With what? damage? we don't have health yet! wel...)
TODO: Give the player health. Starting at 5/5, everything that killed the player, other an the line above, will now only deal 1 damage
TODO: Add Silver and and Gold Repair powerUps.
    -Now whenever you gain 10,000 points, you instead get a silver repair powerUp.
    -If you already have a silverShield, it is replaced by a goldenShield
    -If you already have a shield, then you just gain an extra life.
    -Whenever you would go down to 0 health, you will consume your shield and regain 3/5 health.
        +If you consume your golden shield, it is reduced to a silver sheild.
        +If you consume a silver shield, then you have no more shields
TODO: Create Game Info Page

*/

// setup mouse
const mouse = {
    x: 0,
    y: 0
};

document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

class Ball {
    constructor(){
        // props:
        this.x = rand(0, 500);
        this.y = rand(0, 500);

        this.vx = 1;
        this.vy = 1;

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
        const dx = 1;
        const dy = 1;

        const a = 1 / this.mass;

        this.vx += (dx > 0) ? a : -a;
        this.vy += (dy > 0) ? a : -a;

        this.x += this.vx;
        this.y += this.vy;

        this.updateStyle();
    }
};

const balls = [];

class Enemy extends Ball {
    constructor(){
        super();
    }
    draw(){
        super.draw();
    }
}

const game = new Game("game");
for(let i = 0; i < 3; i++){
    balls.push(new Ball());
}
game.tick();


