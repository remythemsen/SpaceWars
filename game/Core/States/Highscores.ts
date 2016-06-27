///<reference path="../../Vendor/phaser/phaser.d.ts"/>
module SpaceWars.Core.States {
    export class Highscores extends Phaser.State {

        assets:Array<any>;

        // The Stars (Background)
        background:Phaser.TileSprite;      

        init(assets) {
            this.assets = assets;
        }

        create() {

            // Creating background
            this.generateBackground();

            var heading = this.game.add.text(this.game.world.centerX, 100, 'HIGHSCORES! - press B to return to menu', { font: "10px press_start_2pregular", fill: "#ffffff", align: "center" });
            heading.anchor.set(0.5,0.5);


            var marginTop = 120;




        }
        update() {
            //  Scroll the background
            this.background.tilePosition.y -= 0.2;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.B)) {
                this.MainMenu();
            }
        }

        MainMenu() {
            this.game.state.start('MainMenu', true, false, this.assets);
        }

        generateBackground() {
            // Set background color
            this.game.stage.backgroundColor = '#000000';
            //  The scrolling starfield background
            this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');


        }
    }
}
