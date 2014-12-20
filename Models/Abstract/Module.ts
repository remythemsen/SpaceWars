///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/Helpers/Shout.ts"/>
///<reference path="Entity.ts"/>
module SpaceWars.Models.Abstract {

    /*
    *   This is the Base class for all modules; Guns, Bullets, Thrusters aso.
    *   This class needs to provide a unified way to extract data about a module from a
    *   data connection object upon instantiation.
    */

    export class Module extends Phaser.Sprite {

        id:number;
        name:string;
        path:string;
        moduleType:string;
    }
}
