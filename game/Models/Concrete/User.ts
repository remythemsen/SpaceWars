///<reference path="../../Vendor/phaser/phaser.d.ts"/>
module SpaceWars.Models.Concrete {
    export class User {
        public id : number;
        public spaceships : Array<number>;
        public name : string;
        public highscore : number; // varchar
    }
}