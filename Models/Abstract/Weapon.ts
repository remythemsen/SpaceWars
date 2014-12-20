///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Interfaces/IWeapon.ts"/>
///<reference path="Module.ts"/>
module SpaceWars.Models.Abstract {
    export class Weapon extends Module implements Interfaces.IWeapon {

        // Variable to hold timestamp for next allowed shot
        nextFire : number = 0;

        // The rate of which bullets can be fired, (Higher is slower)
        fireRate : number = 500;

        // The velocity of the bullets
        speed : number = 500;

        // The group of bullets
        bullets : Phaser.Group;

        constructor(game:Phaser.Game, x, y, key) {
            super(game, x, y, key);

            // Bullets
            this.bullets = this.game.add.group();
            this.bullets.enableBody = true;
            this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
            this.bullets.createMultiple(150, 'bullet');
            this.bullets.setAll('checkWorldBounds', true);
            this.bullets.setAll('outOfBoundsKill', true);

        }

        // Fires a shot
        shoot() : void {
            if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0)
            {
                this.nextFire = this.game.time.now + this.fireRate;

                var bullet = this.bullets.getFirstDead();

                bullet.reset((this.body.x + this.body.width), this.body.y);

                bullet.body.velocity.x = this.speed;
            }
        }
    }
}
