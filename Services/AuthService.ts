///<reference path="../Vendor/jquery/jquery.d.ts"/>
module SpaceWars.Services {
    export class AuthService {
        public isLoggedIn() : number {

            var result:number = 0;

            $.ajax({
                dataType: "json",
                url: 'services/logged-in',
                async:false,
                success: function(response) {
                    if(response.error == false) {
                        if(response.data){
                            result = response.data;
                        }
                    }
                }
            });

            return result;
        }
        public login(username:string, password:string) : number // userId
        {
            // Setting result var
            var result:number = 0;

            $.ajax({
                dataType: "json",
                type: 'POST',
                url: 'services/authenticate',
                data: { 'username': username, 'password': password }, 
                async: false,
                success: function (response)
                {
                    if (response.error == false) {
                        if (response.data) {
                            result = response.data;
                        }
                    }
                }
            });

            return result;
        }
        public logout(): void
        {
            $.ajax({
                dataType: 'json',
                type: 'get',
                url: 'api/logout',
                async: false
            });
        }
    }
}