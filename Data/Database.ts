module SpaceWars.Data {
    export class Database {
        public static db = {
            // Tables
            spaceships : [
                {
                    'id': 1,
                    'name': 'rust burner 1AZ',
                    'key':'rust_burner_1',
                    'width':50,
                    'height':50,
                    'path':'assets/spritesheets/rust_burner_1.png'
                },
                {
                    'id': 2,
                    'name': 'rust burner 1BZ',
                    'key':'rust_burner_2',
                    'width':50,
                    'height':50,
                    'path':'assets/spritesheets/rust_burner_2.png'
                }
            ],
            modules : [
                {
                    'id': 1,
                    'name': 'prost fr 3',
                    'key':'prost_fr_3',
                    'width':25,
                    'height':25,
                    'type': 'weapon',
                    'path':'assets/spritesheets/prost_fr_3.png'
                }
            ],
            users : [
                {
                    'id':1, // Int
                    'name':'ABC', // Varchar
                    'spaceships':'1', // Varchar
                    'highscore':0

                }
            ],
            terrain : [
                {
                    'id':1, // int
                    'key':'redrock1', // varchar + unique
                    'width':57, // int
                    'height':37, // int
                    'path':'assets/images/terrain_rock_1.png' // varchar
                },
                {
                    'id':2, // int
                    'key':'redrock2', // varchar + unique
                    'width':47, // int
                    'height':23, // int
                    'path':'assets/images/terrain_rock_2.png' // varchar
                }
            ],
            scores : [] // TODO: implement
        };
    }
}
