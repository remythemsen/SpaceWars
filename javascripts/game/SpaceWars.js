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
///<reference path="../Models/Abstract/Asset.ts"/>
///<reference path="../Interfaces/IAsset.ts"/>
///<reference path="../Vendor/jquery/jquery.d.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Repositories;
    (function (Repositories) {
        var AssetRepo = (function () {
            function AssetRepo() {
            }
            AssetRepo.prototype.getAll = function () {
                // Creating reference to Assets Array (to use inside ajax call)
                var assets = new Array();
                var asset;
                asset = new SpaceWars.Models.Abstract.Asset();
                asset.id = 0;
                asset.name = 'background';
                asset.asset_key = 'background_stars';
                asset.type = 'background';
                asset.path = 'assets/images/background_tile.png';
                asset.width = 500;
                asset.height = 500;
                assets.push(asset);
                // Space ships
                asset = new SpaceWars.Models.Abstract.Asset();
                asset.id = 1;
                asset.name = 'rust burner 1AZ';
                asset.asset_key = 'rust_burner_1';
                asset.type = 'spaceship';
                asset.path = 'assets/spritesheets/rust_burner_1.png';
                asset.width = 50;
                asset.height = 25;
                assets.push(asset);
                asset = new SpaceWars.Models.Abstract.Asset();
                asset.id = 2;
                asset.name = 'rust burner 1BZ';
                asset.asset_key = 'rust_burner_2';
                asset.type = 'spaceship';
                asset.path = 'assets/spritesheets/rust_burner_2.png';
                asset.width = 44;
                asset.height = 18;
                assets.push(asset);
                // terrain
                asset = new SpaceWars.Models.Abstract.Asset();
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
                asset = new SpaceWars.Models.Abstract.Asset();
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
                asset = new SpaceWars.Models.Abstract.Asset();
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
                asset = new SpaceWars.Models.Abstract.Asset();
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
            };
            return AssetRepo;
        }());
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
                    // Header
                    var heading = this.game.add.text(this.game.world.centerX, 100, 'MAIN MENU', { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
                    heading.anchor.set(0.5, 0.5);
                    // Button to start the game
                    var startGameButton = this.game.add.text(this.game.world.centerX, 150, 'Start Game', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                    startGameButton.anchor.set(0.5, 0.5);
                    startGameButton.inputEnabled = true;
                    startGameButton.events.onInputDown.add(this.startGame, this);
                    // View HighScores button
                    var highscoresButton = this.game.add.text(this.game.world.centerX, 180, 'HighScores', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                    highscoresButton.anchor.set(0.5, 0.5);
                    highscoresButton.inputEnabled = true;
                    highscoresButton.events.onInputDown.add(this.startHighscores, this);
                };
                MainMenu.prototype.update = function () {
                    //  Scroll the background
                    this.background.tilePosition.y -= 0.2;
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
                    //  The scrolling starfield background
                    this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');
                };
                return MainMenu;
            }(Phaser.State));
            States.MainMenu = MainMenu;
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
            var Highscores = (function (_super) {
                __extends(Highscores, _super);
                function Highscores() {
                    _super.apply(this, arguments);
                }
                Highscores.prototype.init = function (assets) {
                    this.assets = assets;
                };
                Highscores.prototype.create = function () {
                    // Creating background
                    this.generateBackground();
                    var heading = this.game.add.text(this.game.world.centerX, 100, 'HIGHSCORES! - press B to return to menu', { font: "10px press_start_2pregular", fill: "#ffffff", align: "center" });
                    heading.anchor.set(0.5, 0.5);
                    var marginTop = 120;
                };
                Highscores.prototype.update = function () {
                    //  Scroll the background
                    this.background.tilePosition.y -= 0.2;
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
                    //  The scrolling starfield background
                    this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');
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
                LevelUp.prototype.init = function (assets, currentLevel, playerState, score, combo) {
                    this.assets = assets;
                    this.currentLevel = currentLevel;
                    this.playerState = playerState;
                    this.score = score;
                    this.combo = combo;
                };
                LevelUp.prototype.create = function () {
                    // Header
                    var header = this.game.add.text(400, 100, 'Level Up!, press spacebar to continue', { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
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
                    this.game.state.start('Arena', true, false, this.assets, this.currentLevel + 1, this.playerState, this.score, this.combo);
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
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
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
                    this.authService = new SpaceWars.Services.AuthService();
                    this.score = score;
                };
                GameOver.prototype.create = function () {
                    // generating background
                    this.generateBackground();
                    // Heading
                    var heading = this.game.add.text(this.game.world.centerX, 100, 'Game Over!', { font: "16px press_start_2pregular", fill: "#ffffff", align: "center" });
                    heading.anchor.set(0.5, 0.5);
                    // Game Debreif info
                    var displayScore = this.game.add.text(this.game.world.centerX, 130, 'You Scored: ' + this.score, { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                    displayScore.anchor.set(0.5, 0.5);
                    // Instructions
                    var controlInstructions = this.game.add.text(this.game.world.centerX, 170, 'Press Space to restart, or Q to exit to menu', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                    controlInstructions.anchor.set(0.5, 0.5);
                };
                GameOver.prototype.update = function () {
                    //  Scroll the background
                    this.background.tilePosition.y -= 0.2;
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
                    //  The scrolling starfield background
                    this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');
                };
                GameOver.prototype.removePopUp = function () {
                    $('#' + this.popUpElementId).remove();
                };
                return GameOver;
            }(Phaser.State));
            States.GameOver = GameOver;
        })(States = Core.States || (Core.States = {}));
    })(Core = SpaceWars.Core || (SpaceWars.Core = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Concrete;
        (function (Concrete) {
            var Bullet = (function (_super) {
                __extends(Bullet, _super);
                function Bullet(game, x, y, key) {
                    _super.call(this, game, x, y, key, null);
                }
                Bullet.prototype.getOwner = function () {
                    if (this._owner != null) {
                        return this._owner;
                    }
                    else {
                        throw new Error('Owner of bullet not set');
                    }
                };
                // Returns the exact impact damage.
                Bullet.prototype.getDamage = function () {
                    // Todo: Implement Critical Strikes
                    try {
                        // Impact Range
                        var minImpact = this._damage * 0.9;
                        var maxImpact = this._damage * 1.1;
                        return this.game.rnd.integerInRange(minImpact, maxImpact);
                    }
                    catch (e) {
                        throw new Error(e);
                    }
                };
                return Bullet;
            }(Phaser.Sprite));
            Concrete.Bullet = Bullet;
        })(Concrete = Models.Concrete || (Models.Concrete = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
///<reference path="../Concrete/Bullet.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Abstract;
        (function (Abstract) {
            /* This is the 'Abstract' SpaceShip class
             *
             * It is essentially a sprite with extended functionality like Shoot
             */
            var Spaceship = (function (_super) {
                __extends(Spaceship, _super);
                function Spaceship(game, x, y, key, speed, damage, fireRate, bulletSpeed, oppositeDirection) {
                    if (oppositeDirection === void 0) { oppositeDirection = false; }
                    //# Setting Sprite Properties
                    _super.call(this, game, x, y, key);
                    // Variable to hold timestamp for next allowed shot
                    this._nextFire = 0;
                    // Setting Anchor point (Middle)
                    this.anchor.setTo(0.5, 0.5);
                    // Removing Smoothing Effect on sprite
                    this.smoothed = false;
                    //# Enabling Physics on the Sprite
                    this.game.physics.arcade.enable(this);
                    //# Setting Spaceship Specific Fields
                    this._speed = speed;
                    this._damage = damage;
                    this._fireRate = fireRate;
                    this._bulletSpeed = bulletSpeed;
                    this._oppositeDirection = oppositeDirection;
                    // Adding idle animation
                    this.animations.add('idle', [2, 1, 0], 7, true);
                    // Advancing Animation
                    this.animations.add('advancing', [4, 3], 10, true);
                    if (this._oppositeDirection) {
                        //# Adjusting to Opposite Direction
                        // flipping enemies to face the player
                        this.scale.x = -1;
                        // Flip bullet direction
                        this._bulletSpeed = this._bulletSpeed - (this._bulletSpeed + this._bulletSpeed);
                    }
                }
                Spaceship.prototype.update = function () {
                    this.play('idle');
                };
                /* Methods */
                Spaceship.prototype.shoot = function () {
                    var bullets;
                    // Grab bullets group array reference from active state
                    try {
                        var currentState = this.game.state.getCurrentState();
                        bullets = currentState.bullets;
                    }
                    catch (e) {
                        throw new Error('Could not get bullets from current state ' + e);
                    }
                    // Fire a shot if the weapon is ready.
                    if (this.game.time.now > this._nextFire && currentState.bullets.countDead() > 0) {
                        // Setting point in future time for next allowed shot.
                        this._nextFire = this.game.time.now + this._fireRate;
                        // Grab a bullet from the generated list
                        var bullet = currentState.bullets.getFirstDead();
                        // Setting Damage on bullet
                        bullet._damage = this._damage;
                        // Setting owner of bullet
                        bullet._owner = this;
                        // Set bullet position
                        bullet.reset((this.body.x + (this.body.width / 2)), (this.body.y + (this.height) / 2));
                        // Set bullet direction and speed
                        bullet.body.velocity.x = this._bulletSpeed;
                    }
                };
                return Spaceship;
            }(Phaser.Sprite));
            Abstract.Spaceship = Spaceship;
        })(Abstract = Models.Abstract || (Models.Abstract = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Abstract/Spaceship.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
///<reference path="Bullet.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Models;
    (function (Models) {
        var Concrete;
        (function (Concrete) {
            /*
            * This is the player class.
            *
            *
            */
            var Player = (function (_super) {
                __extends(Player, _super);
                function Player(game, x, y, key) {
                    // Calling sprite's constructor
                    _super.call(this, game, x, y, key, 100, 10, 300, 1000);
                    var shootKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
                    shootKey.onDown.add(this.shoot, this);
                }
                Player.prototype.update = function () {
                    // Player Controls
                    this.body.velocity.x = 0;
                    this.body.velocity.y = 0;
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
                    else {
                        this.play('idle');
                    }
                };
                return Player;
            }(Models.Abstract.Spaceship));
            Concrete.Player = Player;
        })(Concrete = Models.Concrete || (Models.Concrete = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Core/States/Arena.ts"/>
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
                    // TODO: Find another place to set enemy stats.
                    _super.call(this, game, x, y, key, 100, 10, 500, 500, true);
                }
                Enemy.prototype.update = function () {
                    // Idle animation
                    this.play('idle');
                    // TODO: Place AI logic here
                };
                return Enemy;
            }(Models.Abstract.Spaceship));
            Concrete.Enemy = Enemy;
        })(Concrete = Models.Concrete || (Models.Concrete = {}));
    })(Models = SpaceWars.Models || (SpaceWars.Models = {}));
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
///<reference path="../Vendor/phaser/phaser.d.ts"/>
///<reference path="../Models/Concrete/Enemy.ts"/>
var SpaceWars;
(function (SpaceWars) {
    var Collections;
    (function (Collections) {
        var EnemyGroup = (function (_super) {
            __extends(EnemyGroup, _super);
            function EnemyGroup() {
                _super.apply(this, arguments);
            }
            return EnemyGroup;
        }(Phaser.Group));
        Collections.EnemyGroup = EnemyGroup;
    })(Collections = SpaceWars.Collections || (SpaceWars.Collections = {}));
})(SpaceWars || (SpaceWars = {}));
///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Models/Concrete/Player.ts"/>
///<reference path="../../Models/Concrete/Enemy.ts"/>
///<reference path="../../Models/Concrete/Bullet.ts"/>
///<reference path="../../Models/Abstract/Asset.ts"/>
///<reference path="../../Models/Concrete/User.ts"/>
///<reference path="../../Models/Abstract/Spaceship.ts"/>
///<reference path="../../Collections/EnemyGroup.ts"/>
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
                    ///////////////////////////////////
                    /* ##### Performance Enha. ##### */
                    ///////////////////////////////////
                    this.slowedLoopNext = 0;
                    // Array with Terrain type Assets
                    this.terrainAssets = [];
                }
                /*!!!!!!!!!!!!!!!!!!!!!!!!*/
                /*!!!!!!!!!METHODS!!!!!!!!*/
                /*!!!!!!!!!!!!!!!!!!!!!!!!*/
                /* This is the Initial Method which is run,
                *  when the state starts
                */
                Arena.prototype.init = function (assets, level, playerState, score, combo) {
                    if (level === void 0) { level = 1; }
                    if (score === void 0) { score = 0; }
                    if (combo === void 0) { combo = 0; }
                    // Grabbing Information from Former level (if any)
                    this.level = level;
                    this.assets = assets;
                    this.score = score;
                    this.playerState = playerState;
                    this.combo = combo;
                    // Settings for the Game should be set here
                    this.totalEnemies = 70;
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
                    // Get Bullets Ready
                    // Populating Bullets
                    this.bullets = this.game.add.group();
                    this.bullets.addMultiple(this.generateBullets());
                    // Removing the Sprite from Rendering and Physics when it's out of bounds.
                    this.bullets.setAll('checkWorldBounds', true);
                    this.bullets.setAll('outOfBoundsKill', true);
                    // Spawning the Player
                    this.spawnPlayer();
                    // Spawning Enemies
                    this.generateEnemies();
                    // Spawning Enemies with timed interval
                    this.nextEnemySpawn = this.game.time.now + 1000;
                    this.game.time.events.repeat(Phaser.Timer.SECOND * 1, this.totalEnemies, this.spawnEnemy, this);
                    this.game.time.events.repeat(Phaser.Timer.SECOND * 2, this.totalEnemies, this.spawnEnemy, this);
                    // Loading UI
                    this.loadUI();
                    var classContext = this;
                    // Adding callback from removing help text at the start of the game.
                    this.game.input.keyboard.onDownCallback = function () {
                        if (classContext.UIControlHelp.visible) {
                            classContext.UIControlHelp.visible = false;
                        }
                    };
                };
                Arena.prototype.ai = function () {
                    //#### AI #### //
                    // try to get player in sight
                    this.seekPlayerY();
                    // When player is in sight of enemy
                    var enemy = this.playerInSight();
                    if (enemy) {
                        enemy.shoot();
                    }
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
                    this.game.physics.arcade.overlap(this.bullets, this.enemies, this.enemyHit, null, this);
                    //Player hit by enemies
                    this.enemies.forEachExists(function (enemy) {
                        this.game.physics.arcade.overlap(this.bullets, this.player, this.playerHit, null, this);
                    }, this);
                    if (this.slowedLoopNext <= this.game.time.now) {
                        this.slowedLoopNext = this.game.time.now + 200;
                        this.ai();
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
                                enemy.body.y = this.game.rnd.integerInRange(this.game.world.y, this.game.world.height);
                                enemy.body.velocity.x = -200;
                            }
                        }, this);
                    }
                    // ### SPAWN TERRAIN PROPS ### //
                    if (this.game.time.now > this.nextPropSpawn) {
                        this.spawnProp();
                    }
                    // #### CAMERA #### //
                };
                Arena.prototype.createMap = function () {
                    // Setting Stage Settings
                    this.game.stage.width = 948;
                    this.game.stage.height = 600;
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
                        //prop.enableBody = true;
                        //prop.physicsBodyType = Phaser.Physics.ARCADE;
                        //prop.smoothed = false;
                        // killing the prop
                        prop.kill();
                    }
                    this.nextPropSpawn = this.game.time.now + 300;
                };
                Arena.prototype.spawnProp = function () {
                    // Grabbing a prop
                    var prop = this.terrainProps.getFirstDead();
                    prop.anchor.y = 1.0;
                    prop.anchor.x = 1.0;
                    var rand = this.game.rnd.realInRange(0, 3);
                    prop.scale.setTo(rand, rand);
                    // Resetting position
                    prop.reset(this.game.world.width + prop.body.width, this.game.world.height);
                    // Setting Movement Speed on prop 
                    prop.body.velocity.x = -200;
                    // When is next spawn
                    this.nextPropSpawn = this.game.time.now + this.game.rnd.integerInRange(100, 300);
                };
                // #### User Interface ####
                Arena.prototype.loadUI = function () {
                    // Player Health
                    this.UIHealth = this.game.add.text(0, 0, '', { font: "10px press_start_2pregular", fill: "#ffffff", align: "center" });
                    this.UIHealth.fixedToCamera = true;
                    this.UIHealth.cameraOffset.setTo(10, 10);
                    // Health bar
                    this.UIHealthBar = this.game.add.graphics(0, 0);
                    var color = 0xFF3300;
                    this.UIHealthBar.lineStyle(15, color, 1);
                    this.UIHealthBar.moveTo(10, 40);
                    this.UIHealthBar.lineTo(200, 40);
                    // Current Combo
                    this.UICombo = this.game.add.text(0, 0, '', { font: "14px press_start_2pregular", fill: "#ffffff", align: "center" });
                    this.UICombo.fixedToCamera = true;
                    this.UICombo.cameraOffset.setTo(this.game.world.centerX, 10);
                    this.UICombo.anchor.x = 0.5;
                    // Current Score
                    this.UIScore = this.game.add.text(0, 0, '', { font: "10px press_start_2pregular", fill: "#ffffff", align: "center" });
                    this.UIScore.fixedToCamera = true;
                    this.UIScore.cameraOffset.setTo(this.game.world.centerX, 40);
                    this.UIScore.anchor.x = 0.5;
                    // Current Level
                    this.UILevel = this.game.add.text(0, 0, '', { font: "10px press_start_2pregular", fill: "#ffffff", align: "center" });
                    this.UILevel.fixedToCamera = true;
                    this.UILevel.cameraOffset.setTo(10, ((this.game.world.height - this.UILevel.height) - 10));
                    // ControlHelp
                    this.UIControlHelp = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Controls: Move with Arrow keys, Shoot with Space', { font: "12px press_start_2pregular", fill: "#ffffff", align: "center" });
                    this.UIControlHelp.anchor.x = 0.5;
                    // Updating Data
                    this.updateUI();
                };
                Arena.prototype.updateUI = function () {
                    this.UIScore.setText('Score: ' + this.score.toString());
                    this.UIHealth.setText('Health: ' + this.player.health.toString());
                    // Update Healthbar aswell
                    // removing old healthbar
                    this.UIHealthBar.clear();
                    // Calculating color
                    var x = (this.player.health / this.player._maxHealth) * 100;
                    var color = this.convertToHex((x > 50 ? 1 - 2 * (x - 50) / 100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2 * x / 100.0) * 255, 0);
                    // Redrawing health bar 
                    this.UIHealthBar.lineStyle(15, color, 1);
                    this.UIHealthBar.moveTo(10, 40);
                    var value = ((this.player.health / this.player._maxHealth) * 100) * 2;
                    this.UIHealthBar.lineTo(value, 40);
                    this.UILevel.setText('Level: ' + this.level.toString());
                    this.UICombo.setText('Combo x' + this.combo.toString());
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
                        enemy._maxHealth = enemy.health;
                        // Setting damage 
                        enemy._damage = 10 * (this.level);
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
                            enemy.body.y = this.game.rnd.integerInRange(this.game.world.y, this.game.world.height);
                            // Setting Movement Speed on prop 
                            enemy.body.velocity.x = -200;
                            // When is next spawn
                            this.nextEnemySpawn = this.game.time.now + this.game.rnd.integerInRange(500, 3000);
                        }
                    }
                };
                // Generating a Collection of Bullets
                Arena.prototype.generateBullets = function () {
                    var bullets = new Array();
                    // Creating some bullets
                    for (var i = 0, bullet; i < 50; i++) {
                        //adding bullet to the game
                        bullet = new SpaceWars.Models.Concrete.Bullet(this.game, 0, 0, 'yellow_bullet');
                        // Adding Bullet to the Game
                        bullet = this.game.add.existing(bullet);
                        // Enabling physics on bullet
                        this.game.physics.arcade.enable(bullet);
                        // Setting pivot / scale point to be in center of bullet sprite
                        bullet.anchor.set(0.5);
                        bullet.smoothed = false;
                        //scaling down bullet size
                        bullet.scale.x = 0.5;
                        bullet.scale.y = 0.5;
                        bullet.kill();
                        bullets.push(bullet);
                    }
                    return bullets;
                };
                Arena.prototype.spawnPlayer = function () {
                    // Initializing the Player
                    this.player = new SpaceWars.Models.Concrete.Player(this.game, 150, this.game.world.centerY, 'rust_burner_2');
                    // Updating player from passed State object.
                    if (this.playerState) {
                        this.player.health = this.playerState.health;
                    }
                    else {
                        this.player.health = 100;
                        this.player._maxHealth = this.player.health;
                    }
                    // keeping the player inside map bounds
                    this.player.body.collideWorldBounds = true;
                    this.game.add.existing(this.player);
                };
                Arena.prototype.explode = function (sprite) {
                    // Adding explosion to game
                    var explosion = this.game.add.sprite(sprite.body.x - (sprite.body.width / 2), sprite.body.y, 'explosion_1');
                    this.game.physics.enable(explosion, Phaser.Physics.ARCADE);
                    explosion.anchor.x = 0.5;
                    explosion.anchor.y = 0.5;
                    explosion.animations.add('explode');
                    explosion.animations.play('explode', 10, false, true);
                    explosion.body.velocity.x = -255;
                };
                // #### Collision Handlers #### //
                Arena.prototype.enemyHit = function (bullet, enemy) {
                    if (bullet.getOwner() !== enemy) {
                        bullet.kill();
                        var damage = bullet.getDamage();
                        enemy.health -= damage;
                        // Add sprite with number of damage dealt
                        var dmgShow = this.game.add.text(enemy.body.x - (enemy.body.width / 2), enemy.body.y - 20, damage.toString(), { font: "10px press_start_2pregular", fill: "#ffffff" });
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
                            // update combo
                            this.combo += 1;
                            // Update score
                            this.score += (1 * this.level * this.combo);
                            this.updateUI();
                            // If No more enemies is alive
                            if (this.enemies.countLiving() <= 0) {
                                // Advance to next level.
                                this.nextLevel();
                            }
                        }
                    }
                };
                Arena.prototype.playerHit = function (player, bullet) {
                    if (bullet.getOwner() !== player) {
                        bullet.kill();
                        // Taking some Damage
                        player.health -= bullet.getDamage();
                        // update combo
                        this.combo = 0;
                        this.updateUI();
                        if (this.player.health < 1) {
                            player.kill();
                            this.endGame();
                        }
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
                    this.game.state.start('LevelUp', true, false, this.assets, this.level, playerState, this.score, this.combo);
                };
                Arena.prototype.endGame = function () {
                    // To Highscores State
                    this.game.state.start('GameOver', true, false, this.assets, this.score);
                };
                // #### UTILS #### //
                Arena.prototype.convertToHex = function (r, g, b) {
                    var result = "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                    return +result;
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
                _super.call(this, 800, 540, Phaser.CANVAS, 'game_con', null);
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
