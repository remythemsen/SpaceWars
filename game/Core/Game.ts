///<reference path="../Vendor/phaser/phaser.d.ts"/>
///<reference path="States/Boot.ts"/>
///<reference path="States/Preloader.ts"/>
///<reference path="States/MainMenu.ts"/>
///<reference path="States/Highscores.ts"/>
///<reference path="States/LevelUp.ts"/>
///<reference path="States/GameOver.ts"/>
///<reference path="States/Arena.ts"/>



module SpaceWars.Core {

    export class Game extends Phaser.Game {

        constructor() {

            super(800, 540, Phaser.CANVAS, 'game_con', null);

            this.state.add('Boot', States.Boot, false);
            this.state.add('Preloader', States.Preloader, false);
            this.state.add('MainMenu', States.MainMenu, false);
            this.state.add('Arena', States.Arena, false);
            this.state.add('Highscores', States.Highscores, false);
            this.state.add('LevelUp', States.LevelUp, false);
            this.state.add('GameOver', States.GameOver, false);

            // New Game
            this.state.start('Boot', true, false);

        }


    }
}
