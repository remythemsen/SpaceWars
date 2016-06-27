///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
///<reference path="Bullet.ts"/>
module SpaceWars.Models.Concrete {

    /*
    * This is the player class.
    *
    *
    */

    export class Player extends Abstract.Spaceship {
       
        constructor(game:Phaser.Game, x:number, y: number, key:string ) {

            // Calling sprite's constructor
            super(game,x,y,key, 100, 10, 300, 1000);

			var shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			shootKey.onDown.add(this.shoot, this);

        }

        update() : void {

            // Player Controls

            this.body.velocity.x = 0;
            this.body.velocity.y = 0;

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
            } else {
            	this.play('idle');
            }
			
        }
    }
}
