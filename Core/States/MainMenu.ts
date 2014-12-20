///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Services/AuthService.ts"/>

module SpaceWars.Core.States
{

    export class MainMenu extends Phaser.State
    {

        assets: Array<any>;
        authService: Services.AuthService;

        init(assets)
        {
            this.assets = assets;
            this.authService = new Services.AuthService();
        }

        create()
        {

            this.generateBackground();

            // Resizing world
            this.game.world.width = 800;
            this.game.world.height = 640;

            // Header
            var heading = this.game.add.text(this.game.world.centerX, 100, 'MAIN MENU', { font: "16px Arial", fill: "#ffffff", align: "center" });
            heading.anchor.set(0.5, 0.5);

            // Button to start the game
            var startGameButton = this.game.add.text(this.game.world.centerX, 150, 'Start Game', { font: "12px Arial", fill: "#ffffff", align: "center" });
            startGameButton.anchor.set(0.5, 0.5);
            startGameButton.inputEnabled = true;
            startGameButton.events.onInputDown.add(this.startGame, this);

            // View HighScores button
            var highscoresButton = this.game.add.text(this.game.world.centerX, 180, 'HighScores', { font: "12px Arial", fill: "#ffffff", align: "center" });
            highscoresButton.anchor.set(0.5, 0.5);
            highscoresButton.inputEnabled = true;
            highscoresButton.events.onInputDown.add(this.startHighscores, this);

            if (this.authService.isLoggedIn()) {
                // Logout Button
                var logoutButton = this.game.add.text(this.game.world.centerX, 210, 'Logout', { font: "12px Arial", fill: "#ffffff", align: "center" });
                logoutButton.anchor.set(0.5, 0.5);
                logoutButton.inputEnabled = true;
                logoutButton.events.onInputDown.add(this.logout, this);
            }

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

        }


    }

}