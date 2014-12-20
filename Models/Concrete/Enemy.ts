///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
module SpaceWars.Models.Concrete {
    export class Enemy extends Abstract.Spaceship {

        // Variable to hold timestamp for next allowed shot
        nextFire : number = 0;

        // The rate of which bullets can be fired, (Higher is slower)
        fireRate : number = 500;

        // The velocity of the bullets
        speed : number = 500;

        // The group of bullets
        bullets : Phaser.Group;

        constructor(game:Phaser.Game, x:number, y: number, key:string) {
            super(game, x, y, key);

            // Adding idle animation
            this.animations.add('idle',[2,1,0], 7, true);

            // Adding some bullets
            // Bullets
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

            // Creating some bullets
            for(var i = 0, bullet; i < 10; i++) {

                //adding bullet to the game
                bullet = this.game.add.sprite(0, 0, 'yellow_bullet', null, this.bullets);

                
                // Enabling physics engine on bullet
                bullet.enableBody = true;
                bullet.physicsBodyType = Phaser.Physics.ARCADE;


                // Setting pivot / scale point to be in center of bullet sprite
                bullet.anchor.set(0.5);
                bullet.smoothed = false;

                //scaling down bullet size
                bullet.scale.x = -0.5;
                bullet.scale.y = 0.5;

                bullet.kill();

            }

            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);
            // flipping enemies to face the player
            this.scale.x = -1;

            // Setting start dmg
            this.dmg = 1;
        }

        update() : void {
            this.play('idle');
            // if player is same y as this.. then shoot

        }

        evade() : void {

        }

        shoot() : void {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
            {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) /2));

                bullet.body.velocity.x = this.speed - (this.speed + this.speed);
            }
        }

        dropModules() {
            //console.log('module dropped');
            //this.game.add.sprite(100, 100, 'lasergun');
        }

    }
}