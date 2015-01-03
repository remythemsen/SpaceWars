///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
module SpaceWars.Models.Concrete {
    export class Enemy extends Abstract.Spaceship {

        constructor(game:Phaser.Game, x:number, y: number, key:string) {
            // TODO: Find another place to set enemy stats.
            super(game, x, y, key, 100, 10, 500, 500, true);
        }

        update() : void {
			// Idle animation
			this.play('idle');

			// TODO: Place AI logic here
        }
    }
}
