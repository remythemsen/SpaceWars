///<reference path="../../Vendor/phaser/phaser.d.ts"/>
module SpaceWars.Core.States {
    export class LevelUp extends Phaser.State {

        assets:any;
        currentLevel:number;
        playerState:any;
		score:number;
		combo:number;

        init(assets:any, currentLevel:number, playerState:any, score:number, combo:number) {
            this.assets = assets;
            this.currentLevel = currentLevel;
            this.playerState = playerState;
            this.score = score;
            this.combo = combo;
        }

        create() {

            // Header
            var header = this.game.add.text(400, 100 , 'Level Up!, press spacebar to continue', { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
            header.fixedToCamera = true;
            header.cameraOffset.setTo((this.game.world.centerX) - header.width / 2, 50);

        }
        update() {

            if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                this.continue();
            }
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                this.quit();
            }
        }
        continue() {
            this.game.state.start('Arena', true, false, this.assets, this.currentLevel+1, this.playerState, this.score, this.combo);
        }
        quit() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}
