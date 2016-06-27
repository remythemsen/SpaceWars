///<reference path="Repository.ts"/>
///<reference path="../Models/Abstract/Asset.ts"/>
///<reference path="../Interfaces/IAsset.ts"/>
///<reference path="../Vendor/jquery/jquery.d.ts"/>


module SpaceWars.Repositories {
    export class AssetRepo extends Repository {

        resourceUrl: string;

        constructor()
        {
            // Constructing Parent Class
            super();
        }

        public getAll() : Array<Models.Abstract.Asset> {

            // Creating reference to Assets Array (to use inside ajax call)
            var assets:Array<Models.Abstract.Asset> = new Array<Models.Abstract.Asset>();

						var asset: Models.Abstract.Asset;
						asset = new Models.Abstract.Asset();

						asset.id = 100;
						asset.name = 'rust_burner_1';
						asset.asset_key = 'rust_burner_2';
						asset.type = 'spaceship';
						asset.path = 'assets/spritesheets/rust_burner_2.png';
						asset.width = 46;
						asset.height = 25;
						asset.created_at = '0';
						asset.update_at = '0';
						assets.push(asset);


						// terrain
						asset = new Models.Abstract.Asset();

						asset.id = 101;
						asset.name = 'terrain_rock_1';
						asset.asset_key = '101';
						asset.type = 'terrain';
						asset.path = 'assets/spritesheets/terrain_rock_1.png';
						asset.width = 57;
						asset.height = 37;
						asset.created_at = '0';
						asset.update_at = '0';
						assets.push(asset);


            return assets;

        }
    }
}
