///<reference path="../Vendor/jquery/jquery.d.ts"/>
module SpaceWars.Repositories {
    export class ConfigRepo
    {

        configFile: any;

        constructor()
        {
            this.configFile = this.getConfigFile();
        }

        public getConfigFile(): any
        {
            var file: any;

            var request = $.getJSON('/spacewars/public/config.json', function ()
            {
                console.log('loading json');
            });

            request.done(function () { return 'complete' });


            //$.ajax({
            //    dataType: "json",
            //    url: '/spacewars/public/config.json',
            //    async: false,
            //    success: function (response)
            //    {
            //        file = JSON.parse(response);
            //    }
            //}).done(function ()
            //{

            //    var response = 'lekael';
            //    file = response;
            //    return file;
            //});


        }

        get(key:string): string
        {
            //console.dir(this.configFile);
            //return this.configFile[key];
            return 'hwrrow';
        }
    }
}