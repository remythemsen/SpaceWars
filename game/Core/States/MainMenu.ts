///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Services/AuthService.ts"/>

module SpaceWars.Core.States
{

    export class MainMenu extends Phaser.State
    {

        assets: Array<any>;
        authService: Services.AuthService;
        // The Stars (Background)
        background:Phaser.TileSprite;      

        init(assets)
        {
            this.assets = assets;
            this.authService = new Services.AuthService();
        }

        create()
        {

            this.generateBackground();

            // Header
            var heading = this.game.add.text(this.game.world.centerX, 100, 'MAIN MENU', { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
            heading.anchor.set(0.5, 0.5);

            // Button to start the game
            var startGameButton = this.game.add.text(this.game.world.centerX, 150, 'Start Game', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
            startGameButton.anchor.set(0.5, 0.5);
            startGameButton.inputEnabled = true;
            startGameButton.events.onInputDown.add(this.startGame, this);

            // View HighScores button
            var highscoresButton = this.game.add.text(this.game.world.centerX, 180, 'HighScores', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
            highscoresButton.anchor.set(0.5, 0.5);
            highscoresButton.inputEnabled = true;
            highscoresButton.events.onInputDown.add(this.startHighscores, this);


        }
        update() : void {

            //  Scroll the background
            this.background.tilePosition.y -= 0.2;

        }
        startGame()
        {
            this.game.state.start('Arena', true, false, this.assets);
        }

        startHighscores()
        {
            this.game.state.start('Highscores', true, false, this.assets);
        }
        logout()
        {
            this.authService.logout();
            this.game.state.start('MainMenu', true, false, this.assets);
        }

        generateBackground()
        {
            // Set background color
            this.game.stage.backgroundColor = '#000000';

            //  The scrolling starfield background
            this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');



        }


    }

}
