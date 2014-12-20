///<reference path="../../Vendor/phaser/phaser.d.ts"/>
module SpaceWars.Core.States {
    export class LevelUp extends Phaser.State {

        assets:any;
        currentLevel:number;
        playerState:any;

        init(assets:any, currentLevel:number, playerState:any) {
            this.assets = assets;
            this.currentLevel = currentLevel;
            this.playerState = playerState;
        }

        create() {
            // Reset World Size
            this.game.world.width = 800;
            this.game.world.height = 640;

            // Header
            var header = this.game.add.text(400, 100 , 'Level Up!, press spacebar to continue', { font: "16px Arial", fill: "#ffffff", align: "center" });
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
            this.game.state.start('Arena', true, false, this.assets, this.currentLevel+1, this.playerState);
        }
        quit() {
            this.game.state.start('MainMenu', true, false);
        }
    }
}
