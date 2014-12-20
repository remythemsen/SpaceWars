///<reference path="../Models/Abstract/Entity.ts"/>
module SpaceWars.Data {
    export class Connection {

        public static getDBContext() : any {

            var db = {
                // Tables
                spaceships : [
                    {
                        'id': 1,
                        'name': 'test spaceship',
                        'key':'spaceship'
                    },
                    {
                        'id': 2,
                        'name': 'test spaceship 2',
                        'key':'spaceship2'
                    }
                ],
                modules : [
                    {
                        'id':1,
                        'name':'laser gun',
                        'type':'weapon',
                        'key':'lasergun'
                    },
                    {
                        'id':2,
                        'name':'turbo thrusters',
                        'type':'thruster',
                        'key':'thrusters'
                    }
                ],
                users : [
                    {
                        'id':1, // Int
                        'name':'ABC', // Varchar
                        'spaceships':'1', // Varchar
                        'modules':'1, 2', // Varchar
                        'activeSpaceship':1, // Int
                        'activeModules':'1' // Varchar

                    }
                ],
                scores : [] // TODO: implement
            };

            return db;
        }

    }
}
