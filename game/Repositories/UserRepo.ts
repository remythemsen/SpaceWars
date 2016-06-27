///<reference path="Repository.ts"/>
///<reference path="../Vendor/phaser/phaser.d.ts"/>
module SpaceWars.Repositories {
    export class UserRepo extends Repository {

        public create(username, password) : string
        {
            var result;

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: 'users',
                async: false,
                data: { 'username': username, 'password': password},
                success: function (response)
                {
                    result = true;
                }, failure: function ()
                {
                    result = false;
                }
            });

            return result;

        }

       

    }
}