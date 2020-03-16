class Player {
    init(sprite) {
        this.sprite = sprite;
        this.sprite.setBounce(0.2);
        this.sprite.setCollideWorldBounds(true);
    }
    update(scene){

        if(!scene) return;
        if(!scene.dt) return;
        if(!scene.input) return;

        const cursor = scene.input.keyboard.createCursorKeys();

        let moveInput = {
            x:0,
            y:0,
        };
        if(cursor.left.isDown) moveInput.x--;
        if(cursor.right.isDown) moveInput.x++;
        if(cursor.up.isDown) moveInput.y--;
        if(cursor.down.isDown) moveInput.y++;

        this.sprite.body.velocity.x+=800*scene.dt*moveInput.x;
        this.sprite.body.velocity.y+=800*scene.dt*moveInput.y;
        
        this.sprite.body.velocity.x*=.95;
        this.sprite.body.velocity.y*=.95;

        
    }
}


const config = {
    type:Phaser.AUTO,
    width:800,
    height:600,
    physics:{
        default:"arcade",
        arcade: {
            gravity: { y: 0 }
        }
    },
    scene: {

        preload:function(){
            this.load.image('bg', 'imgs/space.png');
            this.load.image('ship', 'imgs/ship.png');
            this.load.image('asteroid', 'imgs/asteroid.png');
            this.load.image('bullet', 'imgs/bullet.png');
            this.load.spritesheet('orc', 'imgs/orc.png', {frameWidth:96,frameHeight:96});
        },
        create:function(){
            this.bg = this.add.image(400,300,'bg');
            //console.log(bg);
            this.keySpaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);            
            
            this.player = new Player();
            this.player.init(this.physics.add.image(400,300,'ship'));
                
                
            this.orc = this.add.sprite(400,300,'orc');
            
            const frames = Array.prototype.concat(
                this.anims.generateFrameNumbers('orc',{start:8,end:12}),    
                this.anims.generateFrameNumbers('orc',{start:11,end:9})    
            );
            this.anims.create({
                key:'orc_idle',
                frames:frames
                /*[
                    {key:'orc',frame:6,},
                    {key:'orc',frame:7,},
                    {key:'orc',frame:8,},
                    {key:'orc',frame:6,},
                ]*/,
                frameRate:10,
                repeat:-1, // Number of times U want it to repeat. 0 for don't repeat. Any positive number repeat that many times. -1 means always repeat.
            });
            this.anims.create({
                key:'orc_walk',
                frames:this.anims.generateFrameNumbers('orc',{start:0,end:7})
                /*[
                    {key:'orc',frame:6,},
                    {key:'orc',frame:7,},
                    {key:'orc',frame:8,},
                    {key:'orc',frame:6,},
                ]*/,
                frameRate:10,
                repeat:-1, // Number of times U want it to repeat. 0 for don't repeat. Any positive number repeat that many times. -1 means always repeat.
            });
            this.orc.anims.play('orc_idle');

            this.asteroids = this.physics.add.group();
            this.bullets = this.physics.add.group();
            
            this.physics.add.collider(this.player.sprite, this.asteroids, (p,a)=>{
                //console.log("collision!");
                a.warpBackToTop();
            });
            this.physics.add.overlap(this.bullets, this.asteroids, (b,a)=>{
                //console.log("collision!");
                b.destroy();
                a.warpBackToTop();
            });

            this.addAsteroid=function(){
                const a = this.asteroids.create(Math.random()*0,0,"asteroid");
                //console.log(a);
                a.warpBackToTop=function(){
                    a.x = Math.random()*800;
                    a.y = Math.random()*-600-100;
                    a.body.velocity.x = Math.random()*100 - 50;
                    a.body.velocity.y = Math.random()*300 + 100;
                };
                a.warpBackToTop();
            };
            this.addBullet=function(){
                //console.log("pew");
                const b = this.bullets.create(this.player.sprite.x, this.player.sprite.y, 'bullet');
                b.body.velocity.x=0;
                b.body.velocity.y=-800;
            };

            for(let i= 0; i<10;i++) this.addAsteroid();

        },
        update:function(now, dt){
            this.dt = dt/1000;
            //this.bg.rotation += 1 * this.dt
            this.player.update(this);
            
            if(this.keySpaceBar.isDown){
                this.addBullet();
            }

            this.asteroids.children.iterate(a=>{
                if(a.body.position.y > 600){
                    a.warpBackToTop();
                }
            });
            this.bullets.children.iterate(b=>{
                //console.log(b);
                if(b&&b.y<0){
                    b.destroy();
                }
            });
            //console.log(this.bullets.children.entries.length);

        },

    }
};

const game = new Phaser.Game(config);
