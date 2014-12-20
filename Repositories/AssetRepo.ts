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

            // Doing Ajax Call to Ressource Route
            $.ajax({
                dataType: "json",
                url: 'api/assets',
                async:false,
                success: function(response) {
                    if(response.error == false) {

                        var asset: Models.Abstract.Asset;

                        response.data.forEach(a => {
                            // Create New Asset, and Push to Assets Array
                            asset = new Models.Abstract.Asset();
                            asset.id = a.id;
                            asset.name = a.name;
                            asset.asset_key = a.asset_key;
                            asset.type = a.type;
                            asset.path = a.path;
                            asset.width = a.width;
                            asset.height = a.height;
                            asset.created_at = a.created_at;
                            asset.update_at = a.update_at;

                            // TODO: Check all values before adding to array.

                            // Pushing to array
                            assets.push(asset);

                        });
                    }
                }
            });

            return assets;

        }
    }
}