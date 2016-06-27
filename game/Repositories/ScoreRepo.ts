///<reference path="Repository.ts"/>
///<reference path="../Interfaces/IAsset.ts"/>
///<reference path="../Vendor/jquery/jquery.d.ts"/>

module SpaceWars.Repositories {
    export class ScoreRepo extends Repository {

        public getAll() : any {

            var scores:Array<any> = [];

            $.ajax({
                dataType: "json",
                url: 'api/scores',
                async:false,
                success: function(response) {
                    if(response.error == false) {
                        response.data.forEach(a => {


                            scores.push(a);
                        });
                    }
                }
            });

            return scores;

        }

        public save(playerId:number, score:number) : boolean {

            var result;

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: 'api/scores',
                async:false,
                data:{'id':playerId, 'player_score':score},
                success: function(response) {
                    result = true;
                }, failure: function() {
                    result = false;
                }
            });

            return result;
        }

        public getPlayersHighscore(playerId:number) :number{

            var highscore:number;

            $.ajax({
                dataType: "json",
                url: 'api/scores/'+playerId,
                async:false,
                success: function(response) {
                    if(response.error == false) {
                        highscore = response.data;
                    }
                }
            });

            return highscore;
        }

        public getTopTen() : any {

            var scores:Array<any> = [];

            $.ajax({
                dataType: "json",
                url: 'api/scores',
                async:false,
                success: function(response) {
                    if(response.error == false) {
                        var counter = 0;
                        response.data.forEach(a => {

                            if(counter == 10) {
                                return;
                            } else {
                                counter++;

                                scores.push(a);
                            }


                        });
                    }
                }
            });

            return scores;
        }
    }
}