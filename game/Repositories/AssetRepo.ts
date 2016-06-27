///<reference path="../Models/Abstract/Asset.ts"/>
///<reference path="../Interfaces/IAsset.ts"/>
///<reference path="../Vendor/jquery/jquery.d.ts"/>


module SpaceWars.Repositories {
    export class AssetRepo {

        public getAll() : Array<Models.Abstract.Asset> {
            // Creating reference to Assets Array (to use inside ajax call)
            var assets:Array<Models.Abstract.Asset> = new Array<Models.Abstract.Asset>();

						var asset: Models.Abstract.Asset;
						asset = new Models.Abstract.Asset();

						asset.id = 0;
						asset.name = 'background';
						asset.asset_key = 'background_stars';
						asset.type = 'background';
						asset.path = 'assets/images/background_tile.png';
						asset.width = 500;
						asset.height = 500;

						assets.push(asset);

						// Space ships
						asset = new Models.Abstract.Asset();

						asset.id = 1;
						asset.name = 'rust burner 1AZ';
						asset.asset_key = 'rust_burner_1';
						asset.type = 'spaceship';
						asset.path = 'assets/spritesheets/rust_burner_1.png';
						asset.width = 50;
						asset.height = 25;

						assets.push(asset);

						asset = new Models.Abstract.Asset();

						asset.id = 2;
						asset.name = 'rust burner 1BZ';
						asset.asset_key = 'rust_burner_2';
						asset.type = 'spaceship';
						asset.path = 'assets/spritesheets/rust_burner_2.png';
						asset.width = 44;
						asset.height = 18;

						assets.push(asset);

						// terrain
						asset = new Models.Abstract.Asset();

						asset.id = 3;
						asset.name = 'terrain_rock_1';
						asset.asset_key = 'redrock';
						asset.type = 'terrain';
						asset.path = 'assets/spritesheets/terrain_rock_1.png';
						asset.width = 57;
						asset.height = 37;
						asset.created_at = '0';
						asset.update_at = '0';
						assets.push(asset);

						asset = new Models.Abstract.Asset();

						asset.id = 4;
						asset.name = 'terrain_rock_2';
						asset.asset_key = 'redrock2';
						asset.type = 'terrain';
						asset.path = 'assets/spritesheets/terrain_rock_2.png';
						asset.width = 47;
						asset.height = 23;
						asset.created_at = '0';
						asset.update_at = '0';
						assets.push(asset);

						// Bullet

						asset = new Models.Abstract.Asset();

						asset.id = 5;
						asset.name = 'bullet';
						asset.asset_key = 'yellow_bullet';
						asset.type = 'bullet';
						asset.path = 'assets/spritesheets/bullet.png';
						asset.width = 20;
						asset.height = 7;
						asset.created_at = '0';
						asset.update_at = '0';
						assets.push(asset);

						// Explosion

						asset = new Models.Abstract.Asset();

						asset.id = 6;
						asset.name = 'explosion_1';
						asset.asset_key = 'explosion_1';
						asset.type = 'bullet';
						asset.path = 'assets/spritesheets/explosion_1.png';
						asset.width = 64;
						asset.height = 64;
						asset.created_at = '0';
						asset.update_at = '0';
						assets.push(asset);

            return assets;

        }
    }
}
