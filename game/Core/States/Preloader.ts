///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Repositories/AssetRepo.ts"/>

module SpaceWars.Core.States {

    /* This state is a Loading state, Launched by the Boot state
    *  Here all the assets needed ingame and in menu's are loaded
    *  in.
    **/

    export class Preloader extends Phaser.State {

        preloadBar: Phaser.Sprite;
        assetRepo: Repositories.AssetRepo;
        assets:Array<any>;

        init() {
            this.assetRepo = new Repositories.AssetRepo();
        }

        preload()
        {
            // Showing Loading Screen
            var loadingImage = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
            loadingImage.anchor.x = 0.5;
            loadingImage.anchor.y = 0.5;


            // Loading All Assets
            this.loadArenaAssets();
        }

        create() {

            // Calling 
            this.startMainMenu();
        }

        startMainMenu() {
            this.game.state.start('MainMenu', true, false, this.assets);
        }

        loadArenaAssets() {

            this.assets = this.assetRepo.getAll();

            this.assets.forEach(a => {
               this.load.spritesheet(a.asset_key, a.path, parseInt(a.width), parseInt(a.height));
            });
        }

    }

}
