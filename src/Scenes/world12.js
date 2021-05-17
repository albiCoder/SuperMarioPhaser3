class world12 extends Phaser.Scene {
	constructor(){
		super("world12");
	}

	create(){

		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "1-2";
		//restore time
		levelTime = 400;
		
		//load map
		const map = this.make.tilemap({ key: "map2" });
		
	    // load tilesets
	    const tileset = map.addTilesetImage("tileset", "tiles");

   	    // load static layers
	    const Background = map.createStaticLayer("Background", tileset, 0, 0);
		// 		
		// 
		// powerups
		// 
		// 		
		//add mushrooms objects
		Mushrooms = this.physics.add.group({
			allowGravity: false,
		});

		const MushroomObjects = map.getObjectLayer('Mushrooms')['objects'];
		MushroomObjects.forEach(obj => {
		  const mushroom = Mushrooms.create(obj.x + 21, obj.y - 38, 'mushroomImg');
		  mushroom.setSize(22, 36);//ndrysho pak permasat ne menyre qe te realizohet kontakt me player
		  mushroom.setOffset(10, 2);
		});
   	    

		//add lifemushrooms objects
		LifeMushrooms = this.physics.add.group({
			allowGravity: false,
		});

		const LifeMushroomObjects = map.getObjectLayer('LifeMushrooms')['objects'];
		LifeMushroomObjects.forEach(obj => {
		  const lifeMushroom = LifeMushrooms.create(obj.x + 21, obj.y - 38, 'lifeMushroomImg');
		  lifeMushroom.setSize(22, 36);//ndrysho pak permasat ne menyre qe te realizohet kontakt me player
		  lifeMushroom.setOffset(10, 2);
		});

   	    //add stars objects
		Stars = this.physics.add.group({
			allowGravity: false,
		});

		const StarObjects = map.getObjectLayer('Stars')['objects'];
		StarObjects.forEach(obj => {
		  const star = Stars.create(obj.x + 21, obj.y - 38, 'starImg');
		  star.setSize(25, 36);//rrit pak permasat ne menyre qe te realizohet kontakt me player
		  star.setOffset(8, 2);
		});

		//add flower objects
		Flowers = this.physics.add.group({
			allowGravity: false,
		});

		const FlowerObjects = map.getObjectLayer('Flowers')['objects'];
		FlowerObjects.forEach(obj => {
		  const flower = Flowers.create(obj.x + 21, obj.y - 38, 'flowerImg');
		  flower.setSize(20, 20);
		  flower.setOffset(11, 8);
		});

		//add platforms objects
		Platforms = this.physics.add.group({
			allowGravity: false,
			immovable: true,
		});

		const PlatformObjects = map.getObjectLayer('Platforms')['objects'];
		PlatformObjects.forEach(obj => {
		  const platform = Platforms.create(obj.x + 60, obj.y - 8, 'platformImg');
		  platform.setSize(126, 18);
		  platform.setOffset(0, 0);
		  platform.setBounce(1);
		});

		//set platforms state(mode)

		//state: 0 - still, unmovable
		//state: 1 - falls on touch
		//state: 2 - moving left -> right
		//state: 3 - moving right -> left
		//state: 4 - moving up -> down
		//state: 5 - moving down -> up
		//state: 6 - still, falls if player on it
		var platformsArray = [];
		platformsArray = Platforms.getChildren();

		for(let i = 0; i < Platforms.countActive(true); i++){
			if(i == 0 || i == 1){
				platformsArray[i].state = 4;
				platformsArray[i].body.velocity.y = 70;
			}
			else if(i == 2 || i == 3){
				platformsArray[i].state = 5;
				platformsArray[i].body.velocity.y = -70;	
			}

		}


		//add coins objects
		Coins = this.physics.add.group({
			allowGravity: false,
			immovable: true,
		});

		const CoinObjects = map.getObjectLayer('Coins')['objects'];
		CoinObjects.forEach(obj => {
		  const coin = Coins.create(obj.x + 21, obj.y - 36, 'coinImg1');
		  coin.setSize(26, 32);
		});
		// 		
		// 
		// ATTACK
		// 
		// 		
		//add bullets group
		Bullets = this.physics.add.group({
			maxSize: 2,

		});

		//attack key(bullet key)
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

		//detect player spawn point
  		const spawnPoint = map.findObject("Player", obj => obj.name === "Spawn position");
  		//load player
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y-30);		
		player.setVelocity(0);
		gameLogicScene.setPlayerView();



		//
		//
		//add enemies
		//add koopas
		Koopas = this.physics.add.group({
			//immovable: true,			
		});

		const KoopaObjects = map.getObjectLayer('Koopas')['objects'];
		KoopaObjects.forEach(obj => {
		  const koopa = Koopas.create(obj.x + 21, obj.y - 36, 'enemies', "Koopa1");
		});
		Koopas.children.iterate(function (child) {
		    child.setBounceX(1);
		    child.setSize(26, 26);
		    child.setOffset(8, 10);
		    child.setVelocityX(-1);//nje shpejtesi shume e vogel/ do te ndryshohet tek funksioni deployenemy
	    });
		Koopas.playAnimation('blueKoopaWalking');

		//add turtle enemy
		Turtles = this.physics.add.group({
			//immovable: true,
		});

		const TurtleObjects = map.getObjectLayer('Turtles')['objects'];
		TurtleObjects.forEach(obj => {
		  const turtle = Turtles.create(obj.x + 21, obj.y - 52, 'enemies', 'Turtle2');
		});
		Turtles.children.iterate(function (child) {
		    child.setBounceX(1);
		    child.setSize(36, 52);
		    child.setOffset(3, 0);
		    child.setVelocityX(-1);
	    	child.state = 0;
	    });		

		Turtles.playAnimation('blueTurtleWalking');


		//add piranhaplants
		PiranhaPlants = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const plantsObj = map.getObjectLayer('PiranhaPlants')['objects'];
		plantsObj.forEach(obj => {
			const plant = PiranhaPlants.create(obj.x, obj.y, 'enemies', 'BluePlant1');
		})

		PiranhaPlants.children.iterate(function (child){
			gameLogicScene.applyPiranhaPlantsMovement(child);
		});

		PiranhaPlants.playAnimation("bluePiranha");
		//
		//
		//add invisible walls
		InvisibleWalls = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const InvisibleWallObjects = map.getObjectLayer("InvisibleWalls")['objects'];
		InvisibleWallObjects.forEach(obj => {
			const invisibleWall = InvisibleWalls.create(obj.x + 10, obj.y + 50);
		})
		InvisibleWalls.children.iterate(function(child){
			child.setSize(20, 200);
			child.setVisible(false);
		})

   	    //add map layers
	    CoinBricks = map.createStaticLayer("CoinBricks", tileset, 0, 0);
   	    CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);
		

		//
		//
		//add pipe gates
		//
		//detect gate positions
  		const exit1Position = map.findObject("Player", obj => obj.name === "exit1");
  		//load exit1 object
		exit1 = this.physics.add.sprite(exit1Position.x + 46, exit1Position.y);
		exit1.setImmovable(true);
		exit1.setSize(97, 57);
		exit1.body.allowGravity = false;

		smallExitChecker = this.physics.add.sprite(exit1Position.x + 80, exit1Position.y);
		smallExitChecker.setImmovable(true);
		smallExitChecker.setSize(5, 57);
		smallExitChecker.body.allowGravity = false;


		//detect gate positions
  		const exit2Position = map.findObject("Player", obj => obj.name === "exit2");
  		//load exit1 object
		exit2 = this.physics.add.sprite(exit2Position.x + 30, exit2Position.y + 26);
		exit2.setImmovable(true);
		exit2.setSize(57, 50);
		exit2.body.allowGravity = false;






		//start playing the level song
		LEVEL1THEMESONG.play();
		LEVEL1THEMESONG.loop = true;
		LEVEL1THEMESONG.volume = 0.7;





		//
		//
		// collision managment
		//
		//

		this.physics.world.setBoundsCollision(true, true, false, false);
		player.setCollideWorldBounds(true);

		CollisionLayer.setCollision([2, 67, 107, 192, 193, 239, 240, 288, 335, 289, 336, 290, 239, 255]);
		CoinBricks.setCollision([70, 71]);
		Background.setCollision([107, 2, 4]);


		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer, brickCollision, null, this);

		function brickCollision(player){
			if(player.body.blocked.up || player.body.touching.up){
				var collisionTile = null;
				collisionTile = CollisionLayer.getTileAtWorldXY(player.x, player.y - 40);
			 	if(collisionTile){//brick qe mund te thyen gjithmone
				    if(CoinBricks.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null){				    	
				    	if(collisionTile.index == 67){//questionMarkBrick 1 coin
				    		points += 200;
				    		coins++;
				    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				 			COIN.play();
				    	}
				    	else if(collisionTile.index == 416){//questionMarkBrick powerup
				    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    		ITEM.play();
				    	}
				    	else if(collisionTile.index == 255){//brick 10 points
				    		tenCoinsBrick--;
				    		if(tenCoinsBrick == 0){
				    			CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    			tenCoinsBrick = 10;
				    		}
				    		coins++;
				    		points += 200;
				    		COIN.play();
				    	}
				    	else
				    		BUMP.play();			    	
				   	}
				   	else if(CollisionLayer.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null){//nuk mund te thyen nga SmallMario
				   		if(powerStatus.current != powerStatus.small && powerStatus.current != powerStatus.smallInvincible && powerStatus.current != powerStatus.transition){
				    		if(collisionTile.index == 107){//brick
					    		points += 50;
					    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    			BREAK.play();
				    		}
				    	}
				    	else if(collisionTile.index == 107){//brick
		 					BUMP.play();
				    	}

				    }

			    	pointsText.setText('MARIO\n'+ points);
			    	coinsNumber.setText("x  " + coins);    
				}
		 	}
		}//end brickCollision

		

		//enemies-collisionLayer
		this.physics.add.collider(Koopas, CollisionLayer);
		this.physics.add.collider(Turtles, CollisionLayer);

		//player - enemies
		playerCollisions[1] = this.physics.add.collider(player, Koopas, gameLogicScene.koopasColliderHandler, null, this);
		playerCollisions[2] = this.physics.add.collider(player, Turtles, gameLogicScene.turtlesColliderHandler, null, this);

		//collision enemy - enemy
		this.physics.add.collider(Turtles, Turtles, gameLogicScene.collisionBetweenEnemiesHandler, null, this);
		this.physics.add.collider(Koopas, Koopas);
		this.physics.add.collider(Turtles, Koopas, gameLogicScene.collisionBetweenEnemiesHandler, null, this);

		//mushrooms collision
		this.physics.add.collider(Mushrooms, CollisionLayer);
		playerCollisions[4] = this.physics.add.overlap(player, Mushrooms, gameLogicScene.moveMushroom, null, this);
		
		//lifemushrooms collision
		this.physics.add.collider(LifeMushrooms, CollisionLayer);
		this.physics.add.collider(LifeMushrooms, CoinBricks);
		playerCollisions[5] = this.physics.add.overlap(player, LifeMushrooms, gameLogicScene.moveMushroom, null, this);
		
		
		this.events.on("mushroomPowerup", function(){

			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition){
				if(player.body.onFloor())//ka nje bug ketu qe rikthen onfloor false kur duhet te jete true
					player.y -= 16; 		//zgjidhja: tilet e dyshemese i krijova ne shtresen collision layer dhe jo background

				powerStatus.current = powerStatus.big;
			}
			else if(powerStatus.current == powerStatus.smallInvincible){
				if(player.body.onFloor())
					player.y -= 16;
				
				powerStatus.current = powerStatus.bigInvincible;
			}
		});

		//stars collision
		this.physics.add.collider(Stars, CollisionLayer);
		playerCollisions[6] = this.physics.add.overlap(player, Stars, gameLogicScene.moveStar, null, this);
		
		

		this.events.on("invincibleStarPowerup", function(){//kohezgjatja e invincible mode 14 sek
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition){
				powerStatus.current = powerStatus.smallInvincible;
			}
			else if(powerStatus.current == powerStatus.big){
				powerStatus.current = powerStatus.bigInvincible;
			}
			else if(powerStatus.current == powerStatus.fireMode){
				powerStatus.current = powerStatus.fireInvincible;
			}
		});

		//fireFlowers collision
		this.physics.add.collider(Flowers, CollisionLayer);
		playerCollisions[7] = this.physics.add.overlap(player, Flowers, gameLogicScene.fireFlowerHandler, null, this);
		

		this.events.on("fireFlowerPowerup", function(){
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition){
				powerStatus.current = powerStatus.big;
				if(player.body.onFloor())
					player.y -= 16; 
			}
			else if(powerStatus.current == powerStatus.smallInvincible){
				powerStatus.current = powerStatus.bigInvincible;
				if(player.body.onFloor())
					player.y -= 16;
			}
			else if(powerStatus.current == powerStatus.big){
				powerStatus.current = powerStatus.fireMode;
			}
			else if(powerStatus.current == powerStatus.bigInvincible){
				powerStatus.current = powerStatus.fireInvincible;
			}
		});

		//coinbricks-others
		this.physics.add.collider(CoinBricks, player, function(){ 
			if(player.body.blocked.up || player.body.touching.up)
				BUMP.play();
			}, null, this);

		this.physics.add.collider(CoinBricks, Mushrooms);
		this.physics.add.collider(CoinBricks, Koopas);
		this.physics.add.collider(CoinBricks, Stars);
		this.physics.add.collider(CoinBricks, Flowers);
   	 	
   	 	//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Background, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Turtles, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Koopas, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, CoinBricks, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, PiranhaPlants, gameLogicScene.bulletExplosion, null, this);
		

		//background - others
		playerCollisions[3] = this.physics.add.collider(player, Background);
		this.physics.add.collider(Mushrooms, Background);
		this.physics.add.collider(LifeMushrooms, Background);
		this.physics.add.collider(Koopas, Background);
		this.physics.add.collider(Turtles, Background);
		this.physics.add.collider(Stars, Background);
		this.physics.add.collider(Bullets, Background);


		//platforms - others
		playerCollisions[8] = this.physics.add.collider(player, Platforms, gameLogicScene.platformsHandler, null, this);
		
		//coins - player
		playerCollisions[9] = this.physics.add.overlap(Coins, player, gameLogicScene.coinsHandler, null, this);

		//invisible walls - turtles
		this.physics.add.overlap(Turtles, InvisibleWalls, gameLogicScene.invisibleWallsHandler, null, this);

		//pipegates-player
		this.physics.add.overlap(player, exit1, gameLogicScene.horizontalGatesEntry, null, this);//ndaje kete funksion ne 2. HorizontalGatesHandler dhe VertikalGatesHandler
		this.physics.add.overlap(player, exit2, gameLogicScene.verticalGatesEntry, null, this);
		this.physics.add.overlap(player, smallExitChecker, gameLogicScene.gateSendTo, null, this);


		//piranhaPlants - player
		playerCollisions[10] = this.physics.add.overlap(player, PiranhaPlants, gameLogicScene.piranhaPlantsHandler, null, this);


		//get lifeMushroom hidden tile
		// var hiddenTile = CollisionLayer.getTileAtWorldXY(64 * 42, 9 * 36);
		// hiddenTile.setCollision(false, false, false, true);
		// CoinBricks.getTileAtWorldXY(64 * 42, 9 * 36).setCollision(false, false, false, true);

   	 	//camera
  		camera = this.cameras.main;
	    camera.startFollow(player);
  		camera.setBounds(0, 0, map.widthInPixels, 0);
 	    //set gamescreen background
   	    this.cameras.main.setBackgroundColor('#000000');
 	    //key control
	    cursors = this.input.keyboard.createCursorKeys();


	    //add text
	    gameLogicScene.addText();

	}//end create

	update(time, delta) {	
		var pipeGateX = 7019;

		if(this.input.keyboard.enabled == true){
			if(cursors.left.isDown){
		        player.setVelocityX(-300);
		        camera.stopFollow(player);
		        player.setFlipX(true);
		        if(player.body.touching.down || player.body.blocked.down)
		        	gameLogicScene.chooseAnimation(player, "walk");
		    }
			else if(cursors.right.isDown){
		        player.setVelocityX(300);
		        if(player.x > camera.worldView.x + 336){
		        	camera.startFollow(player);
		        }
		        this.physics.world.bounds.x = camera.worldView.x;
			    this.physics.world.bounds.right = camera.worldView.x + 671;
		        player.resetFlip();
		        if(player.body.touching.down || player.body.blocked.down)
		        	gameLogicScene.chooseAnimation(player, "walk");

		    }
		    else if(cursors.down.isDown){
		    	if(player.body.touching.down || player.body.blocked.down)
		        	gameLogicScene.chooseAnimation(player, "sitDown");
		    }
			else{
		    	player.setVelocityX(0);
				if(player.body.touching.down || player.body.blocked.down)
		   			gameLogicScene.chooseAnimation(player, "frontView");
			} 

		    if(cursors.up.isDown){
		   		if(player.body.blocked.down){
		   			player.setVelocityY(-500);
		    		JUMP.play();
		   		}
		   		else{
			   		gameLogicScene.chooseAnimation(player, "jump");
		    	}
			}

			if(Phaser.Input.Keyboard.JustDown(keyA)){
				if(Bullets.getTotalFree() > 0 && (powerStatus.current == powerStatus.fireMode || powerStatus.current == powerStatus.fireInvincible))
				{
					var bullet = Bullets.create(player.x, player.y, 'bulletAtlas', 'Bullet1');
					if(player.flipX == false)
						bullet.setVelocityX(500);
					else
						bullet.setVelocityX(-500);
					bullet.setSize(10, 10);			
					bullet.play('bulletAnimation', true);	
					FIREBALL.play();
				}
			}	
		}
		else{//kur lojtari vdes dhe rifillon skena, lojtari leviz vet ne te njejtin drejtim si skena me para. Beji false butonat ne menyre qe te mos levizi.
			cursors.up.isDown = false;
			cursors.left.isDown = false;
			cursors.right.isDown = false;
		}

		if(player.y >= 544 && gameState.current != gameState.playerDead){//nqs lojtari eshte gjalle por bie nga platforma dyshemese
			this.input.keyboard.enabled = false;
			player.setVelocityX(0);

			if(lives > 1)
				gameState.current = gameState.playerDead;
			else
				gameState.current = gameState.gameOver;
			
			this.time.delayedCall(1000, function(){ gameLogicScene.restartTheScene(); }, [], this);
		}

		if(gameState.current == gameState.playerDead || gameState.current == gameState.gameOver){
			//player.disableBody(false, false);
		
			player.body.allowGravity = true;
			this.physics.world.removeCollider(playerCollisions[0]);
			this.physics.world.removeCollider(playerCollisions[1]);
			this.physics.world.removeCollider(playerCollisions[2]);
			this.physics.world.removeCollider(playerCollisions[3]);
			this.physics.world.removeCollider(playerCollisions[4]);
			this.physics.world.removeCollider(playerCollisions[5]);
			this.physics.world.removeCollider(playerCollisions[6]);
			this.physics.world.removeCollider(playerCollisions[7]);
			this.physics.world.removeCollider(playerCollisions[8]);
			this.physics.world.removeCollider(playerCollisions[9]);
			this.physics.world.removeCollider(playerCollisions[10]);
		
		}

		if(levelTime == 0 && player.x < pipeGateX){//nqs kemi timeout para se lojtari te arrij flagpole
			gameState.current = gameState.levelTimeout;
			this.time.delayedCall(1000, function(){ this.scene.stop('world12'); this.scene.start("infoScene"); }, [], this);	
		}

	    gameLogicScene.objectsBehaviourHandler(this.physics.world.bounds.right);
	    gameLogicScene.removeObjects(Koopas, Turtles, Mushrooms, Stars, Flowers, Bullets, Coins, this.physics.world.bounds.x, this.physics.world.bounds.right);
	    gameLogicScene.setPlayerObjectSize();
	    gameLogicScene.platformsCycle(Platforms);

	}//end update

}