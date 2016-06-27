///<reference path="../../Vendor/phaser/phaser.d.ts"/>
///<reference path="../../Models/Concrete/Player.ts"/>
///<reference path="../../Models/Concrete/Enemy.ts"/>
///<reference path="../../Models/Concrete/Bullet.ts"/>
///<reference path="../../Models/Abstract/Asset.ts"/>
///<reference path="../../Models/Concrete/User.ts"/>
///<reference path="../../Models/Abstract/Spaceship.ts"/>
///<reference path="../../Collections/EnemyGroup.ts"/>

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
        enemies: SpaceWars.Collections.EnemyGroup;
        // Time at which next enemy will enter the arena
        nextEnemySpawn: number;
        
        ///////////////////////////////////
        /* ##### The UserInterface ##### */
        ///////////////////////////////////

        // Player health
        UIHealth:Phaser.Text;
        // Healthbar
		UIHealthBar:Phaser.Graphics;
        // Current Level
        UILevel:Phaser.Text;
        // Current Score
        UIScore:Phaser.Text;
        // Current Combo Multipler
        UICombo: Phaser.Text;
        // Control Help
		UIControlHelp:Phaser.Text;

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


        /////////////////////////
        /* ##### Bullets ##### */
        /////////////////////////

		// A Group of Bullets, which is able to get fired of.
		bullets:Phaser.Group;


        /*!!!!!!!!!!!!!!!!!!!!!!!!*/
        /*!!!!!!!!!METHODS!!!!!!!!*/
        /*!!!!!!!!!!!!!!!!!!!!!!!!*/

        /* This is the Initial Method which is run,
        *  when the state starts 
        */

        init(assets: any, level: number = 1, playerState?: any, score:number = 0, combo:number = 0)
        {
            // Grabbing Information from Former level (if any)
            this.level = level;
            this.assets = assets;
            this.score = score;
            this.playerState = playerState;
			this.combo = combo;

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
            this.nextEnemySpawn = this.game.time.now + 2000;
            this.game.time.events.repeat(Phaser.Timer.SECOND * 2, this.totalEnemies, this.spawnEnemy, this);

            // Loading UI
            this.loadUI();

            var classContext = this;

			// Adding callback from removing help text at the start of the game.
			this.game.input.keyboard.onDownCallback = function() {
				if(classContext.UIControlHelp.visible) {
					classContext.UIControlHelp.visible = false;
				}
			}


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
            this.game.physics.arcade.overlap(this.bullets, this.enemies, this.enemyHit, null, this);

             //Player hit by enemies
            this.enemies.forEachExists(function(enemy) {
                this.game.physics.arcade.overlap(this.bullets, this.player, this.playerHit, null, this);
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
                    enemy.body.y = this.game.rnd.integerInRange(this.game.world.y, this.game.world.height);
                    enemy.body.velocity.x = -200;
                }
            }, this);



            // #### CAMERA #### //

        }

        createMap()
        {
            // Setting Stage Settings
            this.game.stage.width = 948;
            this.game.stage.height = 600;

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
            this.nextPropSpawn = this.game.time.now + this.game.rnd.integerInRange(500, 2000); 
        }

        // #### User Interface ####
        loadUI() : void {

            // Player Health
            this.UIHealth = this.game.add.text(0, 0, '', { font: "10px press_start_2pregular", fill: "#ffffff", align: "center" });
            this.UIHealth.fixedToCamera = true;
            this.UIHealth.cameraOffset.setTo(10, 10);

            // Health bar
            this.UIHealthBar = this.game.add.graphics(0,0);
			var color = 0xFF3300;
			this.UIHealthBar.lineStyle(15, color, 1);
			this.UIHealthBar.moveTo(10,40);
			this.UIHealthBar.lineTo(200, 40);

            // Current Combo
            this.UICombo = this.game.add.text(0, 0, '', {font:"14px press_start_2pregular", fill:"#ffffff", align:"center"});
            this.UICombo.fixedToCamera = true;
            this.UICombo.cameraOffset.setTo(this.game.world.centerX, 10);
            this.UICombo.anchor.x = 0.5;

            // Current Score
            this.UIScore = this.game.add.text(0,0,'', {font:"10px press_start_2pregular", fill: "#ffffff", align:"center"});
            this.UIScore.fixedToCamera = true;
            this.UIScore.cameraOffset.setTo(this.game.world.centerX, 40);
            this.UIScore.anchor.x = 0.5;

            // Current Level
            this.UILevel = this.game.add.text(0,0,'', {font:"10px press_start_2pregular", fill: "#ffffff", align:"center"});
            this.UILevel.fixedToCamera = true;
            this.UILevel.cameraOffset.setTo(10, ((this.game.world.height - this.UILevel.height) - 10));



            // ControlHelp
            this.UIControlHelp = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Controls: Move with Arrow keys, Shoot with Space', {font:"12px press_start_2pregular", fill:"#ffffff", align:"center"});
			this.UIControlHelp.anchor.x = 0.5;

            // Updating Data
            this.updateUI();

        }
        updateUI() : void {
            this.UIScore.setText('Score: ' + this.score.toString());
            this.UIHealth.setText('Health: ' + this.player.health.toString());
            // Update Healthbar aswell
            // removing old healthbar
            this.UIHealthBar.clear();
			// Calculating color
			var x = (this.player.health / this.player._maxHealth) * 100;
			var color:number = <number> this.convertToHex((x > 50 ? 1-2*(x-50)/100.0 : 1.0) * 255, (x > 50 ? 1.0 : 2*x/100.0) * 255, 0);
			// Redrawing health bar 
			this.UIHealthBar.lineStyle(15, color, 1);
			this.UIHealthBar.moveTo(10,40);
			var value = ((this.player.health / this.player._maxHealth) * 100) * 2;
			this.UIHealthBar.lineTo(value, 40);


            this.UILevel.setText('Level: ' + this.level.toString());
            this.UICombo.setText('Combo x' + this.combo.toString());
        }

        generateEnemies() {
            // Create Group Holding Enemies
            this.enemies = <SpaceWars.Collections.EnemyGroup> this.game.add.group();
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

                enemy._maxHealth = enemy.health;

                // Setting damage 
                enemy._damage = 10 * (this.level);

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
        }

		// Generating a Collection of Bullets
		private generateBullets() : Array<Models.Concrete.Bullet> {
			
			var bullets = new Array<Models.Concrete.Bullet>();

            // Creating some bullets
            for (var i = 0, bullet:Models.Concrete.Bullet; i < 50; i++) {

                //adding bullet to the game
            	bullet = new Models.Concrete.Bullet(this.game, 0, 0,'yellow_bullet');
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
			
		}

        spawnPlayer() {

            // Initializing the Player
            this.player = new Models.Concrete.Player(this.game, 150, this.game.world.centerY, 'rust_burner_2');

            // Updating player from passed State object.
            if(this.playerState) {
                this.player.health = this.playerState.health;
            } else {
                this.player.health = 100;
                this.player._maxHealth = this.player.health;
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

        enemyHit(bullet:Models.Concrete.Bullet, enemy:Models.Concrete.Enemy) {

			if(bullet.getOwner() !== enemy) {

				bullet.kill();

				var damage = bullet.getDamage();

				enemy.health -= damage;
				
				// Add sprite with number of damage dealt
				var dmgShow = this.game.add.text(enemy.body.x - (enemy.body.width / 2), enemy.body.y - 20, damage.toString(), {font: "10px press_start_2pregular", fill: "#ffffff"});

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
		}

        playerHit(player:Models.Concrete.Player, bullet:Models.Concrete.Bullet) {
			if(bullet.getOwner() !== player) {

				bullet.kill();

				// Taking some Damage
				player.health -= bullet.getDamage();

				// update combo
				this.combo = 0;

				this.updateUI();

				if(this.player.health < 1) {
					player.kill();
					this.endGame();
				}
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

            this.game.state.start('LevelUp', true, false, this.assets, this.level, playerState, this.score, this.combo);
        }

        endGame() {
            // To Highscores State
            this.game.state.start('GameOver', true, false, this.assets, this.score);
        }


        // #### UTILS #### //
        convertToHex(r:number, g:number, b:number) : number {
    		var result = "0x" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    		return +result;
        }


    }
}
