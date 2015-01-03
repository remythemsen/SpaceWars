///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Repositories/ScoreRepo.ts"/>
///<reference path="../../Repositories/UserRepo.ts"/>
///<reference path="../../Services/AuthService.ts"/>
///<reference path="../../Vendor/jquery/jquery.d.ts"/>
module SpaceWars.Core.States {
    export class GameOver extends Phaser.State {

        assets:any;
        scoreRepo:Repositories.ScoreRepo;
        userRepo:Repositories.UserRepo;
        authService: Services.AuthService;
        score:number;

        // The Stars (Background)
        background:Phaser.TileSprite;      

        popUpElementId: string = 'LoginWindow';


        init(assets:any, score:number) {
            this.assets = assets;
            this.scoreRepo = new Repositories.ScoreRepo();
            this.userRepo = new Repositories.UserRepo();
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

            var userId = this.isLoggedIn();
            // IF Logged in, save score!!
            if(userId >= 1) {

                var oldScore = this.scoreRepo.getPlayersHighscore(userId);

                if(oldScore) {
                    var displayOldScore = this.game.add.text(this.game.world.centerX, 150, 'Previous Highscore: '+oldScore, { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
                    displayOldScore.anchor.set(0.5,0.5);
                }

                // Saving Score
                this.scoreRepo.save(userId, this.score);


            } else {

                // Instructions
                var notLoggedInMessage = this.game.add.text(this.game.world.centerX, 200, "Can't Save Score, You must be logged in!", { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                notLoggedInMessage.anchor.set(0.5,0.5);

                var loginButton = this.game.add.text(this.game.world.centerX, 230, "Log-in", { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                loginButton.anchor.set(0.5,0.5);
                loginButton.inputEnabled = true;
                loginButton.events.onInputDown.add(this.redirectToLoginPage, this);

            }


        }
        redirectToLoginPage()
        {
            // Storing Score in Session to save later
            

            // Linking to WWW/login page
            window.location.href = "login";    
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

        isLoggedIn() {
            return this.authService.isLoggedIn();
        }
        removePopUp()
        {
            $('#' + this.popUpElementId).remove();
        }
        public createUser()
        {
            // Getting Values from fields
            var userName = $("#create_form").find("input[name='username']").val();
            var password = $("#create_form").find("input[name='password']").val();

            // Validate Matching passwords
            //TODO

            // Check Username available
            // todo

            // if all is okay

            // Sending Request via userRepo
            this.userRepo.create(userName, password);
            this.removePopUp();
            // Show Success Message / or sumthin

            // Else catch!
            // TODO: Display error message
        }

        logUserIn()
        {
            var userName = $("#login_form").find("input[name='username']").val();
            var password = $("#login_form").find("input[name='password']").val();

            // if returns userId then user is logged in!
            var userId:number = this.authService.login(userName, password);

            if (userId !== 0) {
                // saving score
                this.scoreRepo.save(userId, this.score);

                // Removing popup
                this.removePopUp();
            }
        }
    }
}
