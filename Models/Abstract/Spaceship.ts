///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Vehicle.ts"/>
///<reference path="../Abstract/Weapon.ts"/>

module SpaceWars.Models.Abstract {

    export class Spaceship extends Abstract.Vehicle {
        //health:number; // current health
        path:string; // path to spritesheet
        modules:Array<Abstract.Module>; // Module (child sprite)
        dmg:number; // The amount of damage per shot.
    }
}