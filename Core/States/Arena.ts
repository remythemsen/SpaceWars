///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Models/Concrete/Player.ts"/>
///<reference path="../../Models/Concrete/Enemy.ts"/>
///<reference path="../../Models/Abstract/Asset.ts"/>
///<reference path="../../Models/Concrete/User.ts"/>
///<reference path="../../Models/Abstract/Spaceship.ts"/>
module SpaceWars.Core.States {
    export class Arena extends Phaser.State {

        /*!!!!!!!!!!!!!!!!!!!!!!!!*/
        /*!!!!!!!PROPERTIES!!!!!!!*/
        /*!!!!!!!!!!!!!!!!!!!!!!!!*/

        ///////////////////////////////
        /* ##### Game Settings ##### */ 
        ///////////////////////////////


        /////////////////////////////////
        /* ##### State Variables ##### */ 
        /////////////////////////////////
        
        // The integer modifying difficulty, and also score for kills
        level: number; 
        // The integer to modify score per kill
        combo: number; 
        // The Amount of enemies in the Current Level
        totalEnemies: number;
        // Score
        score: number;

        ////////////////////////
        /* ##### Assets ##### */
        ////////////////////////

        // Array holding all Assets
        assets: Array<Models.Abstract.Asset>; 

        ////////////////////////////
        /* ##### Characters ##### */
        ////////////////////////////

        // The Player
        player: Models.Concrete.Player;
        // PlayerState, the state on the player from previous game
        playerState: any;
        // The Enemies
        enemies: Phaser.Group;
        // Time at which next enemy will enter the arena
        nextEnemySpawn: number;
        
        ///////////////////////////////////
        /* ##### The UserInterface ##### */
        ///////////////////////////////////

        // Player health
        UIHealth:Phaser.Text;
        // Current Level
        UILevel:Phaser.Text;
        // Current Score
        UIScore:Phaser.Text;
        // Current Combo Multipler
        UICombo: Phaser.Text;

        /////////////////////////
        /* ##### Terrain ##### */
        /////////////////////////

        // The Stars (Background)
        background:Phaser.TileSprite;      
        // The Props which can be spawned in current level
        terrainProps: Phaser.Group;
        // Array with Terrain type Assets
        terrainAssets = []; 
        // Time at which Next terrain prop will enter the arena.
        nextPropSpawn: number;        


        /*!!!!!!!!!!!!!!!!!!!!!!!!*/
        /*!!!!!!!!!METHODS!!!!!!!!*/
        /*!!!!!!!!!!!!!!!!!!!!!!!!*/

        /* This is the Initial Method which is run,
        *  when the state starts 
        */

        init(assets: any, level: number = 1, playerState?: any, score:number = 0)
        {
            // Grabbing Information from Former level (if any)
            this.level = level;
            this.assets = assets;
            this.score = score;

            // Settings for the Game should be set here
            this.totalEnemies = 20;

        }

        /* After Init has run, create is called 
        *  Here i called all my creation methods
        *  To generate content in the arena
        */ 

        create() {
            
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

        }

        update()
        {

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
            this.enemies.forEachExists(function(enemy) {
                this.game.physics.arcade.overlap(enemy.bullets, this.player, this.playerHit, null, this);
            }, this);


             //#### AI #### //

            // try to get player in sight
            this.seekPlayerY();

            // When player is in sight of enemy
            var enemy = this.playerInSight();
            if(enemy) {
                enemy.shoot();
            }

            // ### SPAWN TERRAIN PROPS ### //
            if (this.game.time.now > this.nextPropSpawn) {
                this.spawnProp();
            }

            // Killing Props and enemies when they hit left world boundry
            this.terrainProps.forEachAlive(function (prop)
            {
                if (prop.body.x + prop.body.width < 0) {
                    prop.kill();
                } 
            }, this);
            
            //// TODO: Limit foreach to enemies on screen
            this.enemies.forEachExists(function (enemy)
            {
                if (enemy.x + enemy.width < 0) {
                    // Resetting position
                    enemy.body.x = this.game.world.width + enemy.body.width;
                    enemy.body.y = this.game.world.centerY;
                    enemy.body.velocity.x = -200;
                }
            }, this);


            // #### CAMERA #### //

        }

        createMap()
        {
            // Setting Stage Settings
            this.game.stage.width = 800;
            this.game.stage.height = 640;

            // Set background color
            this.game.stage.backgroundColor = '#000000';

            //  The scrolling starfield background
            this.background = this.game.add.tileSprite(0, 40, 2000, 600, 'background_stars');

        }

        getTerrainPropsList()
        {

            this.terrainProps = this.game.add.group();
            this.terrainProps.enableBody = true;
            this.terrainProps.physicsBodyType = Phaser.Physics.ARCADE;
            this.terrainProps.setAll('checkWorldBounds', true);
            this.terrainProps.setAll('outOfBoundsKill', true);

            // going through available assets
            this.assets.forEach(a =>
            {
                // checking for terrain on type property
                if(a.type === 'terrain') {
                    // push the asset to array
                    this.terrainAssets.push(a);
                }
            });


            for (var i = 0, numberOfProps = 30; i < numberOfProps; i++) {

                // Selecting a random Prop
                var terrainIndex = this.game.rnd.integerInRange(0, (this.terrainAssets.length - 1))

                // Adding the Prop
                var prop = this.game.add.sprite(100, 100, this.terrainAssets[terrainIndex].asset_key, null, this.terrainProps);

                //prop.enableBody = true;

                //prop.physicsBodyType = Phaser.Physics.ARCADE;

                //prop.smoothed = false;

                // killing the prop
                prop.kill();

            }

            this.nextPropSpawn = this.game.time.now + 1000;
        }


        spawnProp() : void
        {

            // Grabbing a prop
            var prop = this.terrainProps.getFirstDead();

            // Resetting position
            prop.reset(this.game.world.width + prop.body.width, this.game.world.height - prop.body.height);

            // Setting Movement Speed on prop 
            prop.body.velocity.x = -200;

            // When is next spawn
            this.nextPropSpawn = this.game.time.now + this.game.rnd.integerInRange(500, 5000); 
        }

        // #### User Interface ####
        loadUI() : void {

            // Player Health
            this.UIHealth = this.game.add.text(0, 0, '', { font: "16px Arial", fill: "#ffffff", align: "center" });
            this.UIHealth.fixedToCamera = true;
            this.UIHealth.cameraOffset.setTo(50, 50);

            // Current Score
            this.UIScore = this.game.add.text(0,0,'', {font:"16px Arial", fill: "#ffffff", align:"center"});
            this.UIScore.fixedToCamera = true;
            this.UIScore.cameraOffset.setTo(50, 70);

            // Current Level
            this.UILevel = this.game.add.text(0,0,'', {font:"16px Arial", fill: "#ffffff", align:"center"});
            this.UILevel.fixedToCamera = true;
            this.UILevel.cameraOffset.setTo(50, 90);

            // Updating Data
            this.updateUI();

        }
        updateUI() : void {
            this.UIScore.setText('Score: ' + this.score.toString());
            this.UIHealth.setText('Health: ' + this.player.health.toString());
            this.UILevel.setText('Level: ' + this.level.toString());
        }

        generateEnemies() {
            // Create Group Holding Enemies
            this.enemies = this.game.add.group();
            // GroupWide Settings
            this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
            this.enemies.enableBody = true;
            // Getting Array with Available Ships
            var spaceshipAssets = [];
            this.assets.forEach(a => {
                // checking for spaceship on type property
                if(a.type == 'spaceship') {
                    // push the asset to array
                    spaceshipAssets.push(a);
                }
            });
            // Creating each enemy
            var enemy; // declaring variable before loop
            for (var i = 0; i < this.totalEnemies; i++) {
                enemy = new Models.Concrete.Enemy(this.game, 0, 0, spaceshipAssets[this.game.rnd.integerInRange(0, (spaceshipAssets.length - 1))].asset_key);                 
                // Taking the Enemy out of the map, stopping it's loop.
                enemy.exists = false;

                // Setting health
                enemy.health = 15 * this.level;

                // Adding the enemy to group
                this.enemies.add(enemy);

            }

        }

        spawnEnemy() : void
        {
            // Check if any alive enemies
            if (this.enemies.countLiving() > 0) {
                // Declaring enemy container
                var enemy : Models.Concrete.Enemy;
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
        }

        spawnPlayer() {

            // Initializing the Player
            this.player = new Models.Concrete.Player(this.game, 150, this.game.world.centerY, 'rust_burner_2');

            // Updating player from passed State object.
            if(this.playerState) {
                this.player.health = this.playerState.health;
            } else {
                this.player.health = 3;
            }

            // keeping the player inside map bounds
            this.player.body.collideWorldBounds = true;

            this.game.add.existing(this.player);

        }

        explode(sprite: Phaser.Sprite)
        {
            // Adding explosion to game
            var explosion = this.game.add.sprite(sprite.body.x - (sprite.body.width / 2), sprite.body.y, 'explosion_1');
            explosion.anchor.x = 0.5;
            explosion.anchor.y = 0.5;

            explosion.animations.add('explode');

            explosion.animations.play('explode', 80, false, true);

        }

        // #### Collision Handlers #### //

        enemyHit(bullet, enemy) {

            bullet.kill();

            var damage = this.game.rnd.integerInRange(this.player.minDmg, this.player.maxDmg);

            enemy.health -= damage;
            
            // Add sprite with number of damage dealt
            var dmgShow = this.game.add.text(enemy.body.x - (enemy.body.width / 2), enemy.body.y - 20, damage.toString(), {font: "16px Arial", fill: "#ffffff"});

            dmgShow.anchor.x = 0.5;
            dmgShow.anchor.y = 0.5;

            // Tween the sprite
            var tween = this.game.add.tween(dmgShow).to({ alpha: 0, y:dmgShow.y - 20}, 1000, Phaser.Easing.Linear.None, true, 0);
            tween.onComplete.add(function ()
            {
                // Destroying the sprite
                dmgShow.destroy();

            });


            if(enemy.health < 1) {

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
        }

        playerHit(player, bullet) {
            bullet.kill();

            player.health -= 1;

            this.updateUI();

            if(this.player.health < 1) {
                player.kill();
                this.endGame();
            }
        }



        // #### AI #### //

        playerInSight() {

            var result:any;

            this.enemies.forEachExists(function(enemy) {
                //checking that enemy is in camera
                if(enemy.inCamera) {
                    // checking that player is leveled with enemy ( horizontally)
                    if(enemy.body.y > (this.player.body.y - this.player.height) && enemy.body.y < this.player.body.y) {

                        if(enemy.body.x > this.player.body.x) { // Checking that player is in front of enemy
                            result = enemy;
                        }
                    }
                }

            }, this);

            return result;
        }

        seekPlayerY() {
            this.enemies.forEachExists(function(enemy) {
                if(enemy.inCamera) {
                    //Move to player's y
                    if(this.player.body.y > enemy.body.y || this.player.body.y > enemy.body.y + enemy.body.height) {
                        enemy.body.velocity.y = 100;
                    } else {
                        enemy.body.velocity.y = -100;
                    }
                }
                else {
                    // stopping enemy movement
                    enemy.body.velocity.y = 0;
                }
            }, this);
        }

        evade() {

        }

        // #### State Handles #### //

        nextLevel() {

            var playerState = {
                health: this.player.health
            };

            this.game.state.start('LevelUp', true, false, this.assets, this.level, playerState, this.score);
        }

        endGame() {
            // To Highscores State
            this.game.state.start('GameOver', true, false, this.assets, this.score);
        }


    }
}
