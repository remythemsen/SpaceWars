///<reference path="../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Models/Concrete/Enemy.ts"/>
module SpaceWars.Collections {
	export class EnemyGroup extends Phaser.Group {
		children : Array<Models.Concrete.Enemy>;
	}
}
