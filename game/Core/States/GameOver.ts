///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Vendor/jquery/jquery.d.ts"/>
module SpaceWars.Core.States {
    export class GameOver extends Phaser.State {

        assets:any;
        authService: Services.AuthService;
        score:number;

        // The Stars (Background)
        background:Phaser.TileSprite;      

        popUpElementId: string = 'LoginWindow';


        init(assets:any, score:number) {
            this.assets = assets;
            this.authService = new Services.AuthService();
            this.score = score;
        }

        create() {

            // generating background
            this.generateBackground();

            // Heading
            var heading = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
            heading.anchor.set(0.5,0.5);

            // Game Debreif info
            var displayScore = this.game.add.text(this.game.world.centerX, 130, 'You Scored: ' + this.score, { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
            displayScore.anchor.set(0.5,0.5);

            // Instructions
            var controlInstructions = this.game.add.text(this.game.world.centerX, 170, 'Press Space to restart, or Q to exit to menu', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
            controlInstructions.anchor.set(0.5,0.5);




        }
        update() {

            //  Scroll the background
            this.background.tilePosition.y -= 0.2;

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.removePopUp();
                this.newGame();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                this.removePopUp();
                this.quit();
            }
        }
        newGame() {
            this.game.state.start('Arena', true, false, this.assets);
        }
        quit() {
            this.game.state.start('MainMenu', true, false, this.assets);
        }
        generateBackground() {
            // Set background color
            this.game.stage.backgroundColor = '#000000';

            //  The scrolling starfield background
            this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');

        }

        removePopUp()
        {
            $('#' + this.popUpElementId).remove();
        }
    }
}
