///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Repositories/ScoreRepo.ts"/>
module SpaceWars.Core.States {
    export class Highscores extends Phaser.State {

        scoreRepo:Repositories.ScoreRepo;
        assets:Array<any>;

        init(assets) {
            this.scoreRepo = new Repositories.ScoreRepo();
            this.assets = assets;
        }

        create() {
            // Resizing world
            this.game.world.width = 800;
            this.game.world.height = 640;


            var heading = this.game.add.text(this.game.world.centerX, 100, 'HIGHSCORES! - press B to return to menu', { font: "16px Arial", fill: "#ffffff", align: "center" });
            heading.anchor.set(0.5,0.5);

            var scores = this.scoreRepo.getTopTen();

            var marginTop = 120;

            scores.forEach(s => {

                marginTop = marginTop+20;

               var score = this.game.add.text(this.game.world.centerX, marginTop, s.name+' - '+s.score, { font: "10px Arial", fill: "#ffffff", align: "center" });
            });

            // Creating background
            this.generateBackground();


        }
        update() {
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

        }
    }
}
