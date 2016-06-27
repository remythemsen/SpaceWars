var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            var Boot = (function (_super) {
                __extends(Boot, _super);
                function Boot() {
                    _super.apply(this, arguments);
                }
                Boot.prototype.preload = function () {
                    // Assets for initial loading Screen
                    this.load.image('preloadBar', 'assets/images/loader.png');
                };
                Boot.prototype.create = function () {
                    // Limit cursors / pointers to one (No multitouch)
                    this.input.maxPointers = 1;
                    // Enabling Physics Engine
                    this.game.physics.startSystem(Phaser.Physics.ARCADE);
                    // Start Loading Assets State
                    this.game.state.start('Preloader', true, false);
                };
                return Boot;
            }(Phaser.State));
            States.Boot = Boot;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
var SpaceWars;
(function (SpaceWars) {
    var Repositories;
    (function (Repositories) {
        var Repository = (function () {
            function Repository() {
                this.serviceUrl = 'http://localhost/spacewars/public/';
            }
            return Repository;
        }());
        Repositories.Repository = Repository;
    })(Repositories = SpaceWars.Repositories || (SpaceWars.Repositories = {}));
})(SpaceWars || (SpaceWars = {}));
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            var Asset = (function () {
                function Asset() {
                }
                return Asset;
            }());
            Abstract.Asset = Asset;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="Repository.ts"/>
///<reference path="../Models/Abstract/Asset.ts"/>
///<reference path="../Interfaces/IAsset.ts"/>
///<reference path="../Vendor/jquery/jquery.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Repositories;
    (function (Repositories) {
        var AssetRepo = (function (_super) {
            __extends(AssetRepo, _super);
            function AssetRepo() {
                // Constructing Parent Class
                _super.call(this);
            }
            AssetRepo.prototype.getAll = function () {
                // Creating reference to Assets Array (to use inside ajax call)
                var assets = new Array();
                var asset;
                asset = new SpaceWars.Models.Abstract.Asset();
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
                asset = new SpaceWars.Models.Abstract.Asset();
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
            };
            return AssetRepo;
        }(Repositories.Repository));
        Repositories.AssetRepo = AssetRepo;
    })(Repositories = SpaceWars.Repositories || (SpaceWars.Repositories = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Repositories/AssetRepo.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            /* This state is a Loading state, Launched by the Boot state
            *  Here all the assets needed ingame and in menu's are loaded
            *  in.
            **/
            var Preloader = (function (_super) {
                __extends(Preloader, _super);
                function Preloader() {
                    _super.apply(this, arguments);
                }
                Preloader.prototype.init = function () {
                    this.assetRepo = new SpaceWars.Repositories.AssetRepo();
                };
                Preloader.prototype.preload = function () {
                    // Showing Loading Screen
                    var loadingImage = this.game.add.image(this.game.world.centerX, this.game.world.centerY, 'preloadBar');
                    loadingImage.anchor.x = 0.5;
                    loadingImage.anchor.y = 0.5;
                    // Loading All Assets
                    this.loadArenaAssets();
                };
                Preloader.prototype.create = function () {
                    // Calling 
                    this.startMainMenu();
                };
                Preloader.prototype.startMainMenu = function () {
                    this.game.state.start('MainMenu', true, false, this.assets);
                };
                Preloader.prototype.loadArenaAssets = function () {
                    var _this = this;
                    this.assets = this.assetRepo.getAll();
                    this.assets.forEach(function (a) {
                        _this.load.spritesheet(a.asset_key, a.path, parseInt(a.width), parseInt(a.height));
                    });
                };
                return Preloader;
            }(Phaser.State));
            States.Preloader = Preloader;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../Vendor/jquery/jquery.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Services;
    (function (Services) {
        var AuthService = (function () {
            function AuthService() {
            }
            AuthService.prototype.isLoggedIn = function () {
                var result = 0;
                $.ajax({
                    dataType: "json",
                    url: 'services/logged-in',
                    async: false,
                    success: function (response) {
                        if (response.error == false) {
                            if (response.data) {
                                result = response.data;
                            }
                        }
                    }
                });
                return result;
            };
            AuthService.prototype.login = function (username, password) {
                // Setting result var
                var result = 0;
                $.ajax({
                    dataType: "json",
                    type: 'POST',
                    url: 'services/authenticate',
                    data: { 'username': username, 'password': password },
                    async: false,
                    success: function (response) {
                        if (response.error == false) {
                            if (response.data) {
                                result = response.data;
                            }
                        }
                    }
                });
                return result;
            };
            AuthService.prototype.logout = function () {
                $.ajax({
                    dataType: 'json',
                    type: 'get',
                    url: 'api/logout',
                    async: false
                });
            };
            return AuthService;
        }());
        Services.AuthService = AuthService;
    })(Services = SpaceWars.Services || (SpaceWars.Services = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Services/AuthService.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            var MainMenu = (function (_super) {
                __extends(MainMenu, _super);
                function MainMenu() {
                    _super.apply(this, arguments);
                }
                MainMenu.prototype.init = function (assets) {
                    this.assets = assets;
                    this.authService = new SpaceWars.Services.AuthService();
                };
                MainMenu.prototype.create = function () {
                    this.generateBackground();
                    // Resizing world
                    this.game.world.width = 800;
                    this.game.world.height = 640;
                    // Header
                    var heading = this.game.add.text(this.game.world.centerX, 100, 'MAIN MENU', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    heading.anchor.set(0.5, 0.5);
                    // Button to start the game
                    var startGameButton = this.game.add.text(this.game.world.centerX, 150, 'Start Game', { font: "12px Arial", fill: "#ffffff", align: "center" });
                    startGameButton.anchor.set(0.5, 0.5);
                    startGameButton.inputEnabled = true;
                    startGameButton.events.onInputDown.add(this.startGame, this);
                    // View HighScores button
                    var highscoresButton = this.game.add.text(this.game.world.centerX, 180, 'HighScores', { font: "12px Arial", fill: "#ffffff", align: "center" });
                    highscoresButton.anchor.set(0.5, 0.5);
                    highscoresButton.inputEnabled = true;
                    highscoresButton.events.onInputDown.add(this.startHighscores, this);
                    if (this.authService.isLoggedIn()) {
                        // Logout Button
                        var logoutButton = this.game.add.text(this.game.world.centerX, 210, 'Logout', { font: "12px Arial", fill: "#ffffff", align: "center" });
                        logoutButton.anchor.set(0.5, 0.5);
                        logoutButton.inputEnabled = true;
                        logoutButton.events.onInputDown.add(this.logout, this);
                    }
                };
                MainMenu.prototype.startGame = function () {
                    this.game.state.start('Arena', true, false, this.assets);
                };
                MainMenu.prototype.startHighscores = function () {
                    this.game.state.start('Highscores', true, false, this.assets);
                };
                MainMenu.prototype.logout = function () {
                    this.authService.logout();
                    this.game.state.start('MainMenu', true, false, this.assets);
                };
                MainMenu.prototype.generateBackground = function () {
                    // Set background color
                    this.game.stage.backgroundColor = '#000000';
                };
                return MainMenu;
            }(Phaser.State));
            States.MainMenu = MainMenu;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="Repository.ts"/>
///<reference path="../Interfaces/IAsset.ts"/>
///<reference path="../Vendor/jquery/jquery.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Repositories;
    (function (Repositories) {
        var ScoreRepo = (function (_super) {
            __extends(ScoreRepo, _super);
            function ScoreRepo() {
                _super.apply(this, arguments);
            }
            ScoreRepo.prototype.getAll = function () {
                var scores = [];
                $.ajax({
                    dataType: "json",
                    url: 'api/scores',
                    async: false,
                    success: function (response) {
                        if (response.error == false) {
                            response.data.forEach(function (a) {
                                scores.push(a);
                            });
                        }
                    }
                });
                return scores;
            };
            ScoreRepo.prototype.save = function (playerId, score) {
                var result;
                $.ajax({
                    dataType: "json",
                    type: 'POST',
                    url: 'api/scores',
                    async: false,
                    data: { 'id': playerId, 'player_score': score },
                    success: function (response) {
                        result = true;
                    }, failure: function () {
                        result = false;
                    }
                });
                return result;
            };
            ScoreRepo.prototype.getPlayersHighscore = function (playerId) {
                var highscore;
                $.ajax({
                    dataType: "json",
                    url: 'api/scores/' + playerId,
                    async: false,
                    success: function (response) {
                        if (response.error == false) {
                            highscore = response.data;
                        }
                    }
                });
                return highscore;
            };
            ScoreRepo.prototype.getTopTen = function () {
                var scores = [];
                $.ajax({
                    dataType: "json",
                    url: 'api/scores',
                    async: false,
                    success: function (response) {
                        if (response.error == false) {
                            var counter = 0;
                            response.data.forEach(function (a) {
                                if (counter == 10) {
                                    return;
                                }
                                else {
                                    counter++;
                                    scores.push(a);
                                }
                            });
                        }
                    }
                });
                return scores;
            };
            return ScoreRepo;
        }(Repositories.Repository));
        Repositories.ScoreRepo = ScoreRepo;
    })(Repositories = SpaceWars.Repositories || (SpaceWars.Repositories = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Repositories/ScoreRepo.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            var Highscores = (function (_super) {
                __extends(Highscores, _super);
                function Highscores() {
                    _super.apply(this, arguments);
                }
                Highscores.prototype.init = function (assets) {
                    this.scoreRepo = new SpaceWars.Repositories.ScoreRepo();
                    this.assets = assets;
                };
                Highscores.prototype.create = function () {
                    var _this = this;
                    // Resizing world
                    this.game.world.width = 800;
                    this.game.world.height = 640;
                    var heading = this.game.add.text(this.game.world.centerX, 100, 'HIGHSCORES! - press B to return to menu', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    heading.anchor.set(0.5, 0.5);
                    var scores = this.scoreRepo.getTopTen();
                    var marginTop = 120;
                    scores.forEach(function (s) {
                        marginTop = marginTop + 20;
                        var score = _this.game.add.text(_this.game.world.centerX, marginTop, s.name + ' - ' + s.score, { font: "10px Arial", fill: "#ffffff", align: "center" });
                    });
                    // Creating background
                    this.generateBackground();
                };
                Highscores.prototype.update = function () {
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.B)) {
                        this.MainMenu();
                    }
                };
                Highscores.prototype.MainMenu = function () {
                    this.game.state.start('MainMenu', true, false, this.assets);
                };
                Highscores.prototype.generateBackground = function () {
                    // Set background color
                    this.game.stage.backgroundColor = '#000000';
                };
                return Highscores;
            }(Phaser.State));
            States.Highscores = Highscores;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            var LevelUp = (function (_super) {
                __extends(LevelUp, _super);
                function LevelUp() {
                    _super.apply(this, arguments);
                }
                LevelUp.prototype.init = function (assets, currentLevel, playerState) {
                    this.assets = assets;
                    this.currentLevel = currentLevel;
                    this.playerState = playerState;
                };
                LevelUp.prototype.create = function () {
                    // Reset World Size
                    this.game.world.width = 800;
                    this.game.world.height = 640;
                    // Header
                    var header = this.game.add.text(400, 100, 'Level Up!, press spacebar to continue', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    header.fixedToCamera = true;
                    header.cameraOffset.setTo((this.game.world.centerX) - header.width / 2, 50);
                };
                LevelUp.prototype.update = function () {
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        this.continue();
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                        this.quit();
                    }
                };
                LevelUp.prototype.continue = function () {
                    this.game.state.start('Arena', true, false, this.assets, this.currentLevel + 1, this.playerState);
                };
                LevelUp.prototype.quit = function () {
                    this.game.state.start('MainMenu', true, false);
                };
                return LevelUp;
            }(Phaser.State));
            States.LevelUp = LevelUp;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="Repository.ts"/>
///<reference path="../Vendor/phaser/phaser.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Repositories;
    (function (Repositories) {
        var UserRepo = (function (_super) {
            __extends(UserRepo, _super);
            function UserRepo() {
                _super.apply(this, arguments);
            }
            UserRepo.prototype.create = function (username, password) {
                var result;
                $.ajax({
                    dataType: "json",
                    type: 'POST',
                    url: 'users',
                    async: false,
                    data: { 'username': username, 'password': password },
                    success: function (response) {
                        result = true;
                    }, failure: function () {
                        result = false;
                    }
                });
                return result;
            };
            return UserRepo;
        }(Repositories.Repository));
        Repositories.UserRepo = UserRepo;
    })(Repositories = SpaceWars.Repositories || (SpaceWars.Repositories = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Repositories/ScoreRepo.ts"/>
///<reference path="../../Repositories/UserRepo.ts"/>
///<reference path="../../Services/AuthService.ts"/>
///<reference path="../../Vendor/jquery/jquery.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            var GameOver = (function (_super) {
                __extends(GameOver, _super);
                function GameOver() {
                    _super.apply(this, arguments);
                    this.popUpElementId = 'LoginWindow';
                }
                GameOver.prototype.init = function (assets, score) {
                    this.assets = assets;
                    this.scoreRepo = new SpaceWars.Repositories.ScoreRepo();
                    this.userRepo = new SpaceWars.Repositories.UserRepo();
                    this.authService = new SpaceWars.Services.AuthService();
                    this.score = score;
                };
                GameOver.prototype.create = function () {
                    // Resizing world
                    this.game.world.width = 800;
                    this.game.world.height = 640;
                    // generating background
                    this.generateBackground();
                    // Heading
                    var heading = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    heading.anchor.set(0.5, 0.5);
                    // Game Debreif info
                    var displayScore = this.game.add.text(this.game.world.centerX, 130, 'You Scored: ' + this.score, { font: "12px Arial", fill: "#ffffff", align: "center" });
                    displayScore.anchor.set(0.5, 0.5);
                    // Instructions
                    var controlInstructions = this.game.add.text(this.game.world.centerX, 170, 'Press Space to restart, or Q to exit to menu', { font: "12px Arial", fill: "#ffffff", align: "center" });
                    controlInstructions.anchor.set(0.5, 0.5);
                    var userId = this.isLoggedIn();
                    // IF Logged in, save score!!
                    if (userId >= 1) {
                        var oldScore = this.scoreRepo.getPlayersHighscore(userId);
                        if (oldScore) {
                            var displayOldScore = this.game.add.text(this.game.world.centerX, 150, 'Previous Highscore: ' + oldScore, { font: "16px Arial", fill: "#ffffff", align: "center" });
                            displayOldScore.anchor.set(0.5, 0.5);
                        }
                        // Saving Score
                        this.scoreRepo.save(userId, this.score);
                    }
                    else {
                        // Instructions
                        var notLoggedInMessage = this.game.add.text(this.game.world.centerX, 200, "Can't Save Score, You must be logged in!", { font: "12px Arial", fill: "#ffffff", align: "center" });
                        notLoggedInMessage.anchor.set(0.5, 0.5);
                        var loginButton = this.game.add.text(this.game.world.centerX, 230, "Log-in", { font: "12px Arial", fill: "#ffffff", align: "center" });
                        loginButton.anchor.set(0.5, 0.5);
                        loginButton.inputEnabled = true;
                        loginButton.events.onInputDown.add(this.redirectToLoginPage, this);
                    }
                };
                GameOver.prototype.redirectToLoginPage = function () {
                    // Storing Score in Session to save later
                    // Linking to WWW/login page
                    window.location.href = "login";
                };
                GameOver.prototype.update = function () {
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        this.removePopUp();
                        this.newGame();
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
                        this.removePopUp();
                        this.quit();
                    }
                };
                GameOver.prototype.newGame = function () {
                    this.game.state.start('Arena', true, false, this.assets);
                };
                GameOver.prototype.quit = function () {
                    this.game.state.start('MainMenu', true, false, this.assets);
                };
                GameOver.prototype.generateBackground = function () {
                    // Set background color
                    this.game.stage.backgroundColor = '#000000';
                };
                GameOver.prototype.isLoggedIn = function () {
                    return this.authService.isLoggedIn();
                };
                GameOver.prototype.removePopUp = function () {
                    $('#' + this.popUpElementId).remove();
                };
                GameOver.prototype.createUser = function () {
                    // Getting Values from fields
                    var userName = $("#create_form").find("input[name='username']").val();
                    var password = $("#create_form").find("input[name='password']").val();
                    // Validate Matching passwords
                    //TODO
                    // Check Username available
                    // todo
                    // if all is okay
                    // Sending Request via userRepo
                    this.userRepo.create(userName, password);
                    this.removePopUp();
                    // Show Success Message / or sumthin
                    // Else catch!
                    // TODO: Display error message
                };
                GameOver.prototype.logUserIn = function () {
                    var userName = $("#login_form").find("input[name='username']").val();
                    var password = $("#login_form").find("input[name='password']").val();
                    // if returns userId then user is logged in!
                    var userId = this.authService.login(userName, password);
                    if (userId !== 0) {
                        // saving score
                        this.scoreRepo.save(userId, this.score);
                        // Removing popup
                        this.removePopUp();
                    }
                };
                return GameOver;
            }(Phaser.State));
            States.GameOver = GameOver;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Concrete;
        (function (Concrete) {
            var User = (function () {
                function User() {
                }
                return User;
            }());
            Concrete.User = User;
        })(Concrete = Models.Concrete || (Models.Concrete = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var Helpers;
        (function (Helpers) {
            /*
            
             This is a simple logger class, it's sole purpose is
             to log custom information to various log types.
            
             */
            var Shout = (function () {
                function Shout() {
                }
                /*
        
                 ToConsole writes information to the Console.
        
                 */
                Shout.ToConsole = function (message, className) {
                    var output = Array();
                    var seperator = ' : ';
                    // Appending timestamp if specified in param.
                    output.push(new Date().toLocaleTimeString());
                    // Appending Custom Message
                    output.push(message);
                    // Appending Class name if provided
                    if (className !== null)
                        output.push(className);
                    // Outputting to console.
                    console.log(output.join(seperator));
                };
                return Shout;
            }());
            Helpers.Shout = Shout;
        })(Helpers = Core.Helpers || (Core.Helpers = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../Models/Abstract/Entity.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Data;
    (function (Data) {
        var Connection = (function () {
            function Connection() {
            }
            Connection.getDBContext = function () {
                var db = {
                    // Tables
                    spaceships: [
                        {
                            'id': 1,
                            'name': 'test spaceship',
                            'key': 'spaceship'
                        },
                        {
                            'id': 2,
                            'name': 'test spaceship 2',
                            'key': 'spaceship2'
                        }
                    ],
                    modules: [
                        {
                            'id': 1,
                            'name': 'laser gun',
                            'type': 'weapon',
                            'key': 'lasergun'
                        },
                        {
                            'id': 2,
                            'name': 'turbo thrusters',
                            'type': 'thruster',
                            'key': 'thrusters'
                        }
                    ],
                    users: [
                        {
                            'id': 1,
                            'name': 'ABC',
                            'spaceships': '1',
                            'modules': '1, 2',
                            'activeSpaceship': 1,
                            'activeModules': '1' // Varchar
                        }
                    ],
                    scores: [] // TODO: implement
                };
                return db;
            };
            return Connection;
        }());
        Data.Connection = Connection;
    })(Data = SpaceWars.Data || (SpaceWars.Data = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Data/Connection.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            var Entity = (function (_super) {
                __extends(Entity, _super);
                function Entity() {
                    _super.apply(this, arguments);
                }
                return Entity;
            }(Phaser.Sprite));
            Abstract.Entity = Entity;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/Helpers/Shout.ts"/>
///<reference path="Entity.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            /*
            *   This is the Base class for all modules; Guns, Bullets, Thrusters aso.
            *   This class needs to provide a unified way to extract data about a module from a
            *   data connection object upon instantiation.
            */
            var Module = (function (_super) {
                __extends(Module, _super);
                function Module() {
                    _super.apply(this, arguments);
                }
                return Module;
            }(Phaser.Sprite));
            Abstract.Module = Module;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Module.ts"/>
///<reference path="Entity.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            var Vehicle = (function (_super) {
                __extends(Vehicle, _super);
                function Vehicle() {
                    _super.apply(this, arguments);
                }
                return Vehicle;
            }(Abstract.Entity));
            Abstract.Vehicle = Vehicle;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Interfaces/IWeapon.ts"/>
///<reference path="Module.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            var Weapon = (function (_super) {
                __extends(Weapon, _super);
                function Weapon(game, x, y, key) {
                    _super.call(this, game, x, y, key);
                    // Variable to hold timestamp for next allowed shot
                    this.nextFire = 0;
                    // The rate of which bullets can be fired, (Higher is slower)
                    this.fireRate = 500;
                    // The velocity of the bullets
                    this.speed = 500;
                    // Bullets
                    this.bullets = this.game.add.group();
                    this.bullets.enableBody = true;
                    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
                    this.bullets.createMultiple(150, 'bullet');
                    this.bullets.setAll('checkWorldBounds', true);
                    this.bullets.setAll('outOfBoundsKill', true);
                }
                // Fires a shot
                Weapon.prototype.shoot = function () {
                    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                        this.nextFire = this.game.time.now + this.fireRate;
                        var bullet = this.bullets.getFirstDead();
                        bullet.reset((this.body.x + this.body.width), this.body.y);
                        bullet.body.velocity.x = this.speed;
                    }
                };
                return Weapon;
            }(Abstract.Module));
            Abstract.Weapon = Weapon;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Vehicle.ts"/>
///<reference path="../Abstract/Weapon.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            var Spaceship = (function (_super) {
                __extends(Spaceship, _super);
                function Spaceship() {
                    _super.apply(this, arguments);
                }
                return Spaceship;
            }(Abstract.Vehicle));
            Abstract.Spaceship = Spaceship;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="User.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
///<reference path="../Abstract/Module.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Concrete;
        (function (Concrete) {
            /*
            * This is the player object.
            *
            *
            */
            var Player = (function (_super) {
                __extends(Player, _super);
                function Player(game, x, y, key) {
                    // Calling sprite's constructor
                    _super.call(this, game, x, y, key);
                    // Variable to hold timestamp for next allowed shot
                    this.nextFire = 0;
                    // The rate of which bullets can be fired, (Higher is slower)
                    this.fireRate = 200;
                    // The velocity of the bullets
                    this.speed = 1000;
                    // Setting anchor point
                    this.anchor.setTo(0.5, 0.5);
                    this.smoothed = false;
                    this.animations.add('idle', [2, 1, 0], 7, true);
                    this.animations.add('advancing', [4, 3], 10, true);
                    // Adding some bullets
                    // Bullets
                    this.bullets = this.game.add.group();
                    this.bullets.enableBody = true;
                    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
                    this.game.physics.arcade.enable(this);
                    // Creating some bullets
                    for (var i = 0, bullet; i < 50; i++) {
                        //adding bullet to the game
                        bullet = this.game.add.sprite(0, 0, 'yellow_bullet', null, this.bullets);
                        // Enabling physics engine on bullet
                        bullet.enableBody = true;
                        bullet.physicsBodyType = Phaser.Physics.ARCADE;
                        // Setting pivot / scale point to be in center of bullet sprite
                        bullet.anchor.set(0.5);
                        bullet.smoothed = false;
                        //scaling down bullet size
                        bullet.scale.x = 0.5;
                        bullet.scale.y = 0.5;
                        bullet.kill();
                    }
                    this.bullets.setAll('checkWorldBounds', true);
                    this.bullets.setAll('outOfBoundsKill', true);
                    // Setting base damage
                    this.maxDmg = 8;
                    this.minDmg = 6;
                }
                Player.prototype.update = function () {
                    // Player Controls
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
                    this.play('idle');
                    // basic movements
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
                        this.body.velocity.y = -250;
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
                        this.body.velocity.y = 250;
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
                        this.body.velocity.x = -450;
                    }
                    else if (this.game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
                        this.body.velocity.x = 450;
                        this.play('advancing');
                    }
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
                        this.shoot();
                    }
                };
                // Fires a shot
                Player.prototype.shoot = function () {
                    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                        this.nextFire = this.game.time.now + this.fireRate;
                        var bullet = this.bullets.getFirstDead();
                        bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) / 2));
                        bullet.body.velocity.x = this.speed;
                    }
                };
                Player.prototype.equip = function () {
                };
                return Player;
            }(Models.Abstract.Spaceship));
            Concrete.Player = Player;
        })(Concrete = Models.Concrete || (Models.Concrete = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Concrete;
        (function (Concrete) {
            var Enemy = (function (_super) {
                __extends(Enemy, _super);
                function Enemy(game, x, y, key) {
                    _super.call(this, game, x, y, key);
                    // Variable to hold timestamp for next allowed shot
                    this.nextFire = 0;
                    // The rate of which bullets can be fired, (Higher is slower)
                    this.fireRate = 500;
                    // The velocity of the bullets
                    this.speed = 500;
                    // Adding idle animation
                    this.animations.add('idle', [2, 1, 0], 7, true);
                    // Adding some bullets
                    // Bullets
                    this.bullets = this.game.add.group();
                    this.bullets.enableBody = true;
                    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
                    // Creating some bullets
                    for (var i = 0, bullet; i < 10; i++) {
                        //adding bullet to the game
                        bullet = this.game.add.sprite(0, 0, 'yellow_bullet', null, this.bullets);
                        // Enabling physics engine on bullet
                        bullet.enableBody = true;
                        bullet.physicsBodyType = Phaser.Physics.ARCADE;
                        // Setting pivot / scale point to be in center of bullet sprite
                        bullet.anchor.set(0.5);
                        bullet.smoothed = false;
                        //scaling down bullet size
                        bullet.scale.x = -0.5;
                        bullet.scale.y = 0.5;
                        bullet.kill();
                    }
                    this.bullets.setAll('checkWorldBounds', true);
                    this.bullets.setAll('outOfBoundsKill', true);
                    // flipping enemies to face the player
                    this.scale.x = -1;
                    // Setting start dmg
                    this.dmg = 1;
                }
                Enemy.prototype.update = function () {
                    this.play('idle');
                    // if player is same y as this.. then shoot
                };
                Enemy.prototype.evade = function () {
                };
                Enemy.prototype.shoot = function () {
                    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
                        this.nextFire = this.game.time.now + this.fireRate;
                        var bullet = this.bullets.getFirstDead();
                        bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) / 2));
                        bullet.body.velocity.x = this.speed - (this.speed + this.speed);
                    }
                };
                Enemy.prototype.dropModules = function () {
                    //console.log('module dropped');
                    //this.game.add.sprite(100, 100, 'lasergun');
                };
                return Enemy;
            }(Models.Abstract.Spaceship));
            Concrete.Enemy = Enemy;
        })(Concrete = Models.Concrete || (Models.Concrete = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Models/Concrete/Player.ts"/>
///<reference path="../../Models/Concrete/Enemy.ts"/>
///<reference path="../../Models/Abstract/Asset.ts"/>
///<reference path="../../Models/Concrete/User.ts"/>
///<reference path="../../Models/Abstract/Spaceship.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var States;
        (function (States) {
            var Arena = (function (_super) {
                __extends(Arena, _super);
                function Arena() {
                    _super.apply(this, arguments);
                    // Array with Terrain type Assets
                    this.terrainAssets = [];
                }
                /*!!!!!!!!!!!!!!!!!!!!!!!!*/
                /*!!!!!!!!!METHODS!!!!!!!!*/
                /*!!!!!!!!!!!!!!!!!!!!!!!!*/
                /* This is the Initial Method which is run,
                *  when the state starts
                */
                Arena.prototype.init = function (assets, level, playerState, score) {
                    if (level === void 0) { level = 1; }
                    if (score === void 0) { score = 0; }
                    // Grabbing Information from Former level (if any)
                    this.level = level;
                    this.assets = assets;
                    this.score = score;
                    // Settings for the Game should be set here
                    this.totalEnemies = 20;
                };
                /* After Init has run, create is called
                *  Here i called all my creation methods
                *  To generate content in the arena
                */
                Arena.prototype.create = function () {
                    // Generating the Map
                    this.createMap();
                    // Get Terrain Assets
                    this.getTerrainPropsList();
                    // Spawning the Player
                    this.spawnPlayer();
                    // Spawning Enemies
                    this.generateEnemies();
                    // Spawning Enemies with timed interval
                    this.nextEnemySpawn = this.game.time.now + 2000;
                    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, this.totalEnemies, this.spawnEnemy, this);
                    // Loading UI
                    this.loadUI();
                };
                Arena.prototype.update = function () {
                    //  Scroll the background
                    this.background.tilePosition.x -= 0.5;
                    // For dev
                    if (this.game.input.keyboard.isDown(Phaser.Keyboard.R)) {
                        this.nextLevel();
                    }
                    //#### Collisions #### //
                    //Hitting enemies with bullets
                    this.game.physics.arcade.overlap(this.player.bullets, this.enemies, this.enemyHit, null, this);
                    //Player hit by enemies
                    this.enemies.forEachExists(function (enemy) {
                        this.game.physics.arcade.overlap(enemy.bullets, this.player, this.playerHit, null, this);
                    }, this);
                    //#### AI #### //
                    // try to get player in sight
                    this.seekPlayerY();
                    // When player is in sight of enemy
                    var enemy = this.playerInSight();
                    if (enemy) {
                        enemy.shoot();
                    }
                    // ### SPAWN TERRAIN PROPS ### //
                    if (this.game.time.now > this.nextPropSpawn) {
                        this.spawnProp();
                    }
                    // Killing Props and enemies when they hit left world boundry
                    this.terrainProps.forEachAlive(function (prop) {
                        if (prop.body.x + prop.body.width < 0) {
                            prop.kill();
                        }
                    }, this);
                    //// TODO: Limit foreach to enemies on screen
                    this.enemies.forEachExists(function (enemy) {
                        if (enemy.x + enemy.width < 0) {
                            // Resetting position
                            enemy.body.x = this.game.world.width + enemy.body.width;
                            enemy.body.y = this.game.world.centerY;
                            enemy.body.velocity.x = -200;
                        }
                    }, this);
                    // #### CAMERA #### //
                };
                Arena.prototype.createMap = function () {
                    // Setting Stage Settings
                    this.game.stage.width = 800;
                    this.game.stage.height = 640;
                    // Set background color
                    this.game.stage.backgroundColor = '#000000';
                    //  The scrolling starfield background
                    this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');
                };
                Arena.prototype.getTerrainPropsList = function () {
                    var _this = this;
                    this.terrainProps = this.game.add.group();
                    this.terrainProps.enableBody = true;
                    this.terrainProps.physicsBodyType = Phaser.Physics.ARCADE;
                    this.terrainProps.setAll('checkWorldBounds', true);
                    this.terrainProps.setAll('outOfBoundsKill', true);
                    // going through available assets
                    this.assets.forEach(function (a) {
                        // checking for terrain on type property
                        if (a.type === 'terrain') {
                            // push the asset to array
                            _this.terrainAssets.push(a);
                        }
                    });
                    for (var i = 0, numberOfProps = 30; i < numberOfProps; i++) {
                        // Selecting a random Prop
                        var terrainIndex = this.game.rnd.integerInRange(0, (this.terrainAssets.length - 1));
                        // Adding the Prop
                        var prop = this.game.add.sprite(100, 100, this.terrainAssets[terrainIndex].asset_key, null, this.terrainProps);
                        // Enabling physics engine on bullet
                        prop.enableBody = true;
                        prop.physicsBodyType = Phaser.Physics.ARCADE;
                        prop.smoothed = false;
                        // killing the prop
                        prop.kill();
                    }
                    this.nextPropSpawn = this.game.time.now + 1000;
                };
                Arena.prototype.spawnProp = function () {
                    // Grabbing a prop
                    var prop = this.terrainProps.getFirstDead();
                    // Resetting position
                    prop.reset(this.game.world.width + prop.body.width, this.game.world.height - prop.body.height);
                    // Setting Movement Speed on prop 
                    prop.body.velocity.x = -200;
                    // When is next spawn
                    this.nextPropSpawn = this.game.time.now + this.game.rnd.integerInRange(500, 5000);
                };
                // #### User Interface ####
                Arena.prototype.loadUI = function () {
                    // Player Health
                    this.UIHealth = this.game.add.text(0, 0, '', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    this.UIHealth.fixedToCamera = true;
                    this.UIHealth.cameraOffset.setTo(50, 50);
                    // Current Score
                    this.UIScore = this.game.add.text(0, 0, '', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    this.UIScore.fixedToCamera = true;
                    this.UIScore.cameraOffset.setTo(50, 70);
                    // Current Level
                    this.UILevel = this.game.add.text(0, 0, '', { font: "16px Arial", fill: "#ffffff", align: "center" });
                    this.UILevel.fixedToCamera = true;
                    this.UILevel.cameraOffset.setTo(50, 90);
                    // Updating Data
                    this.updateUI();
                };
                Arena.prototype.updateUI = function () {
                    this.UIScore.setText('Score: ' + this.score.toString());
                    this.UIHealth.setText('Health: ' + this.player.health.toString());
                    this.UILevel.setText('Level: ' + this.level.toString());
                };
                Arena.prototype.generateEnemies = function () {
                    // Create Group Holding Enemies
                    this.enemies = this.game.add.group();
                    // GroupWide Settings
                    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
                    this.enemies.enableBody = true;
                    // Getting Array with Available Ships
                    var spaceshipAssets = [];
                    this.assets.forEach(function (a) {
                        // checking for spaceship on type property
                        if (a.type == 'spaceship') {
                            // push the asset to array
                            spaceshipAssets.push(a);
                        }
                    });
                    // Creating each enemy
                    var enemy; // declaring variable before loop
                    for (var i = 0; i < this.totalEnemies; i++) {
                        enemy = new SpaceWars.Models.Concrete.Enemy(this.game, 0, 0, spaceshipAssets[this.game.rnd.integerInRange(0, (spaceshipAssets.length - 1))].asset_key);
                        // Taking the Enemy out of the map, stopping it's loop.
                        enemy.exists = false;
                        // Setting health
                        enemy.health = 15 * this.level;
                        // Adding the enemy to group
                        this.enemies.add(enemy);
                    }
                };
                Arena.prototype.spawnEnemy = function () {
                    // Check if any alive enemies
                    if (this.enemies.countLiving() > 0) {
                        // Declaring enemy container
                        var enemy;
                        // Find an enemy which is not in the game, but is still alive
                        for (var i = 0; i < this.enemies.children.length; i++) {
                            // TODO: Make array Typed by Enemy<>
                            if (this.enemies.children[i].alive === true && this.enemies.children[i].exists === false) {
                                // Grab Enemy
                                enemy = this.enemies.children[i];
                                // Exit loop
                                break;
                            }
                        }
                        if (enemy) {
                            // Adding to the map
                            enemy.exists = true;
                            // Resetting position
                            enemy.body.x = this.game.world.width + enemy.body.width;
                            enemy.body.y = this.game.world.centerY;
                            // Setting Movement Speed on prop 
                            enemy.body.velocity.x = -200;
                            // When is next spawn
                            this.nextEnemySpawn = this.game.time.now + this.game.rnd.integerInRange(500, 3000);
                        }
                    }
                };
                Arena.prototype.spawnPlayer = function () {
                    // Initializing the Player
                    this.player = new SpaceWars.Models.Concrete.Player(this.game, 150, this.game.world.centerY, 'rust_burner_2');
                    // Updating player from passed State object.
                    if (this.playerState) {
                        this.player.health = this.playerState.health;
                    }
                    else {
                        this.player.health = 3;
                    }
                    // keeping the player inside map bounds
                    this.player.body.collideWorldBounds = true;
                    this.game.add.existing(this.player);
                };
                Arena.prototype.explode = function (sprite) {
                    // Adding explosion to game
                    var explosion = this.game.add.sprite(sprite.body.x - (sprite.body.width / 2), sprite.body.y, 'explosion_1');
                    explosion.anchor.x = 0.5;
                    explosion.anchor.y = 0.5;
                    explosion.animations.add('explode');
                    explosion.animations.play('explode', 80, false, true);
                };
                // #### Collision Handlers #### //
                Arena.prototype.enemyHit = function (bullet, enemy) {
                    bullet.kill();
                    var damage = this.game.rnd.integerInRange(this.player.minDmg, this.player.maxDmg);
                    enemy.health -= damage;
                    // Add sprite with number of damage dealt
                    var dmgShow = this.game.add.text(enemy.body.x - (enemy.body.width / 2), enemy.body.y - 20, damage.toString(), { font: "16px Arial", fill: "#ffffff" });
                    dmgShow.anchor.x = 0.5;
                    dmgShow.anchor.y = 0.5;
                    // Tween the sprite
                    var tween = this.game.add.tween(dmgShow).to({ alpha: 0, y: dmgShow.y - 20 }, 1000, Phaser.Easing.Linear.None, true, 0);
                    tween.onComplete.add(function () {
                        // Destroying the sprite
                        dmgShow.destroy();
                    });
                    if (enemy.health < 1) {
                        // Kill the enemy
                        enemy.kill();
                        this.explode(enemy);
                        // Update score
                        this.score += (2 * this.level);
                        this.updateUI();
                        // If No more enemies is alive
                        if (this.enemies.countLiving() <= 0) {
                            // Advance to next level.
                            this.nextLevel();
                        }
                    }
                };
                Arena.prototype.playerHit = function (player, bullet) {
                    bullet.kill();
                    player.health -= 1;
                    this.updateUI();
                    if (this.player.health < 1) {
                        player.kill();
                        this.endGame();
                    }
                };
                // #### AI #### //
                Arena.prototype.playerInSight = function () {
                    var result;
                    this.enemies.forEachExists(function (enemy) {
                        //checking that enemy is in camera
                        if (enemy.inCamera) {
                            // checking that player is leveled with enemy ( horizontally)
                            if (enemy.body.y > (this.player.body.y - this.player.height) && enemy.body.y < this.player.body.y) {
                                if (enemy.body.x > this.player.body.x) {
                                    result = enemy;
                                }
                            }
                        }
                    }, this);
                    return result;
                };
                Arena.prototype.seekPlayerY = function () {
                    this.enemies.forEachExists(function (enemy) {
                        if (enemy.inCamera) {
                            //Move to player's y
                            if (this.player.body.y > enemy.body.y || this.player.body.y > enemy.body.y + enemy.body.height) {
                                enemy.body.velocity.y = 100;
                            }
                            else {
                                enemy.body.velocity.y = -100;
                            }
                        }
                        else {
                            // stopping enemy movement
                            enemy.body.velocity.y = 0;
                        }
                    }, this);
                };
                Arena.prototype.evade = function () {
                };
                // #### State Handles #### //
                Arena.prototype.nextLevel = function () {
                    var playerState = {
                        health: this.player.health
                    };
                    this.game.state.start('LevelUp', true, false, this.assets, this.level, playerState, this.score);
                };
                Arena.prototype.endGame = function () {
                    // To Highscores State
                    this.game.state.start('GameOver', true, false, this.assets, this.score);
                };
                return Arena;
            }(Phaser.State));
            States.Arena = Arena;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../Vendor/phaser/phaser.d.ts"/>
///<reference path="States/Boot.ts"/>
///<reference path="States/Preloader.ts"/>
///<reference path="States/MainMenu.ts"/>
///<reference path="States/Highscores.ts"/>
///<reference path="States/LevelUp.ts"/>
///<reference path="States/GameOver.ts"/>
///<reference path="States/Arena.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Core;
    (function (Core) {
        var Game = (function (_super) {
            __extends(Game, _super);
            function Game() {
                _super.call(this, 800, 640, Phaser.CANVAS, 'game_con', null);
                this.state.add('Boot', Core.States.Boot, false);
                this.state.add('Preloader', Core.States.Preloader, false);
                this.state.add('MainMenu', Core.States.MainMenu, false);
                this.state.add('Arena', Core.States.Arena, false);
                this.state.add('Highscores', Core.States.Highscores, false);
                this.state.add('LevelUp', Core.States.LevelUp, false);
                this.state.add('GameOver', Core.States.GameOver, false);
                // New Game
                this.state.start('Boot', true, false);
            }
            return Game;
        }(Phaser.Game));
        Core.Game = Game;
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="Vendor/phaser/phaser.d.ts"/>
///<reference path="Core/Game.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var game = new SpaceWars.Core.Game();
})(SpaceWars || (SpaceWars = {}));
