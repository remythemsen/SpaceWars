///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
module SpaceWars.Models.Concrete {
    export class Enemy extends Abstract.Spaceship {

        constructor(game:Phaser.Game, x:number, y: number, key:string) {
            super(game, x, y, key, 100, 10, 500, 500, true);

            // Adding idle animation
            this.animations.add('idle',[2,1,0], 7, true);

            // flipping enemies to face the player
            this.scale.x = -1;
        }

        update() : void {
            this.play('idle');
            // if player is same y as this.. then shoot

        }

        evade() : void {

        }

        shoot() : void {

            var stateManager = this.game.state;
            var state:Core.States.Arena = <Core.States.Arena> stateManager.getCurrentState();

            console.log('enemy Shot!');

            if (this.game.time.now > this._nextFire && state.bullets.countDead() > 0)
            {
                this._nextFire = this.game.time.now + this._fireRate;

                var bullet:Models.Concrete.Bullet = state.bullets.getFirstDead();

                // Setting Damage on bullet
                bullet._damage = this._damage;
                // Setting owner of bullet
                bullet._owner = this;

                bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) /2));

                bullet.body.velocity.x = this._bulletSpeed - (this._bulletSpeed + this._bulletSpeed);
            }
        }

       

    }
}
