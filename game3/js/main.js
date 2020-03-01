/*
const sprites = {
	crate:new Image(),
	player:new Image,
	setup(){
		crate.src = "imgs/crate.png";
	}
};

sprites.setup();
*/

const game = new Game();
game.start("game");
/*
Ok, so here is my final game concept:
The player can move around with either the WASD keys, or the arrow keys. (No gravity.)
The player has 100 health represented by a healthbar that's 100px wide. (1hp = 1px)
When the player collides with anything that's not the boss, they take 1 damage every frame.
The boss has more health than the player. (probably 1,000-50,000 health) 
When the player collides with the boss, the boss takes 1 damage every frame.
When player hp reaches 0, need a game over screen.
When boss health reaches 0, we need a win screen.

The boss summons hurtboxes to damage the player in certain patterns.
There should be at least 3 different patterns that are chosen randomly. (preferably more)
*/