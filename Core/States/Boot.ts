///<reference path="../../Vendor/phaser/phaser.d.ts"/>
module SpaceWars.Core.States {
    export class Boot extends Phaser.State {

        preload() {

            // Assets for initial loading Screen
            this.load.image('preloadBar', 'assets/images/loader.png');

        }

        create() {

            // Limit cursors / pointers to one (No multitouch)
            this.input.maxPointers = 1;

            // Enabling Physics Engine
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            // Start Loading Assets State
            this.game.state.start('Preloader', true, false);

        }

    }
}
