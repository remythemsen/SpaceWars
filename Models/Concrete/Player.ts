///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="User.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
///<reference path="../Abstract/Module.ts"/>
module SpaceWars.Models.Concrete {

    /*
    * This is the player object.
    *
    *
    */

    export class Player extends Abstract.Spaceship {

        // Variable to hold timestamp for next allowed shot
        nextFire : number = 0;

        // The rate of which bullets can be fired, (Higher is slower)
        fireRate : number = 200;

        // The velocity of the bullets
        speed : number = 1000;

        // The group of bullets
        bullets : Phaser.Group;

        // Damage
        minDamage: number;
        maxDamage: number;

        constructor(game:Phaser.Game, x:number, y: number, key:string ) {

            // Calling sprite's constructor
            super(game,x,y,key);

            // Setting anchor point
            this.anchor.setTo(0.5, 0.5);
            this.smoothed = false;

            this.animations.add('idle',[2,1,0], 7, true);
            this.animations.add('advancing', [4, 3], 10, true);

            // Adding some bullets
            // Bullets
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;

            this.game.physics.arcade.enable(this);

            // Creating some bullets
            for (var i = 0, bullet; i < 50; i++) {

                //adding bullet to the game
                bullet = this.game.add.sprite(0, 0, 'yellow_bullet', null, this.bullets);


                // Enabling physics engine on bullet
                bullet.enableBody = true;
                bullet.physicsBodyType = Phaser.Physics.ARCADE;


                // Setting pivot / scale point to be in center of bullet sprite
                bullet.anchor.set(0.5);
                bullet.smoothed = false;

                //scaling down bullet size
                bullet.scale.x = 0.5;
                bullet.scale.y = 0.5;

                bullet.kill();
            }

            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);


            // Setting base damage
            this.maxDmg = 8;
            this.minDmg = 6;

        }

        update() : void {

            // Player Controls

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;


            this.play('idle');

            // basic movements
            if(this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                this.body.velocity.y = -250;

            } else if(this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                this.body.velocity.y = 250;

            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {

                this.body.velocity.x = -450;

            }
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {

                this.body.velocity.x = 450;
                this.play('advancing');

            }

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.shoot();
            }



        }

        // Fires a shot
        shoot() : void {

            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
            {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) /2));

                bullet.body.velocity.x = this.speed;
            }
        }

        equip() : void {

        }
    }
}