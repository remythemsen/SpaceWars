module SpaceWars.Data {
    export class Database {
		public static assets = {
							[{
        		
                    'id': 1,
                    'type':'spaceship',
                    'name': 'rust burner 1AZ',
                    'key':'rust_burner_1',
                    'width':50,
                    'height':50,
                    'path':'assets/spritesheets/rust_burner_1.png'
                },
                {
                    'id': 2,
                    'type':'spaceship',
                    'name': 'rust burner 1BZ',
                    'key':'rust_burner_2',
                    'width':50,
                    'height':50,
                    'path':'assets/spritesheets/rust_burner_2.png'
                },
                {
                    'id':3, // int
                    'type':'terrain',
                    'key':'redrock1', // varchar + unique
                    'width':57, // int
                    'height':37, // int
                    'path':'assets/images/terrain_rock_1.png' // varchar
                },
                {
                    'id':4, 
                    'type':'terrain',
                    'key':'redrock2', // varchar + unique
                    'width':47, // int
                    'height':23, // int
                    'path':'assets/images/terrain_rock_2.png' // varchar
                }
            ]
        };
    }
}
