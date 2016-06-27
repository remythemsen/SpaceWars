///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
module SpaceWars.Models.Concrete {
    export class Bullet extends Phaser.Sprite {
		// The Minimum and Maximum Amount of Impact Damage a Bullet has
		_damage:number;
		_owner:Models.Abstract.Spaceship;

		constructor(game:Phaser.Game, x, y, key) {
			super(game, x, y, key, null);
		}

		public getOwner() : Models.Abstract.Spaceship {
			if(this._owner != null) {
				return this._owner;
			} else {
				throw new Error('Owner of bullet not set');
			}
		}

    	// Returns the exact impact damage.
    	public getDamage() : number {
			// Todo: Implement Critical Strikes
			try {
				// Impact Range
				var minImpact:number = this._damage * 0.9;
				var maxImpact:number = this._damage * 1.1;
				return this.game.rnd.integerInRange(minImpact, maxImpact);
			} catch (e) {
				throw new Error(e);
			}

    	}
    }
}
