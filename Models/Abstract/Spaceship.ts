///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
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

				// Flip bullet direction
                this._bulletSpeed = this._bulletSpeed - (this._bulletSpeed + this._bulletSpeed);

			}
		}

		update() : void {
			this.play('idle');
		}
		
		/* Methods */
		
		public shoot() : void {

			var bullets:Phaser.Group;

			// Grab bullets group array reference from active state
			try {
				var currentState:Core.States.Arena = <Core.States.Arena> this.game.state.getCurrentState();
				bullets = currentState.bullets;
			} catch(e) {
				throw new Error('Could not get bullets from current state '+e);
			}

            // Fire a shot if the weapon is ready.
            if (this.game.time.now > this._nextFire && currentState.bullets.countDead() > 0)
            {
                // Setting point in future time for next allowed shot.
                this._nextFire = this.game.time.now + this._fireRate;
                // Grab a bullet from the generated list
                var bullet:Models.Concrete.Bullet = currentState.bullets.getFirstDead();
                // Setting Damage on bullet
                bullet._damage = this._damage;
                // Setting owner of bullet
                bullet._owner = this;
				// Set bullet position
                bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) /2));
				// Set bullet direction and speed
                bullet.body.velocity.x = this._bulletSpeed;
            }
			 
		}


		


    }
}
