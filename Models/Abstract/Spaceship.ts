///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Concrete/Bullet.ts"/>

module SpaceWars.Models.Abstract {

    /* This is the 'Abstract' SpaceShip class
     * 
     * It is essentially a sprite with extended functionality like Shoot
     */

    export class Spaceship extends Phaser.Sprite {
		/* Fields */
		// The Maximum Velocity for the spaceship
		_speed:number;
		// Impact Damage On Bullets
		_damage:number;
        // The rate of which bullets can be fired, (Higher is slower)
        _fireRate:number;
        // Variable to hold timestamp for next allowed shot
        _nextFire : number = 0;
		// The Bullet Velocity
		_bulletSpeed:number;
		// Opposite Direction, If the Spaceship is heading left
		_oppositeDirection:boolean;

		constructor(game:Phaser.Game, x:number, y:number, key:any, speed:number, damage:number, fireRate:number, bulletSpeed:number, oppositeDirection:boolean = false) {
			//# Setting Sprite Properties
			super(game, x, y, key);
			// Setting Anchor point (Middle)
			this.anchor.setTo(0.5,0.5);
			// Removing Smoothing Effect on sprite
			this.smoothed = false;

			//# Enabling Physics on the Sprite
			this.game.physics.arcade.enable(this);
			
			//# Setting Spaceship Specific Fields
			this._speed = speed;
			this._damage = damage;
			this._fireRate = fireRate;
			this._bulletSpeed = bulletSpeed;
			this._oppositeDirection = oppositeDirection;

			// Adding idle animation
			this.animations.add('idle',[2,1,0], 7, true);
			// Advancing Animation
			this.animations.add('advancing', [4, 3], 10, true);

			if(this._oppositeDirection) {
				//# Adjusting to Opposite Direction
				// flipping enemies to face the player
				this.scale.x = -1;
			}
		}

		update() : void {
			this.play('idle');
		}
		
		/* Methods */
		


		


    }
}
