class world21 extends Phaser.Scene {
	constructor(){
		super("world21");
	}

	create() {

		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "2-1";
		//restore time
		levelTime = 400;

		//load map
		const map = this.make.tilemap({ key: "map5" });
		
	    // load tilesets
	    const tileset = map.addTilesetImage("tilesetEdited", "spacedTiles");

   	    // load static layers
	    Background = map.createDynamicLayer("Background", tileset, 0, 0);


		//detect player spawn point
  		const spawnPoint = map.findObject("Player", obj => obj.name === "Spawn position");
  		//load player
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y-30);		
		player.setDepth(10);
		player.setVelocity(0);
		gameLogicScene.setPlayerView();



   	    //add map layers
   	    CoinBricks = map.createStaticLayer("CoinBricks", tileset, 0, 0);
   	    CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);

   	   	//set depth
   	   	CoinBricks.setDepth(20);
   	   	CollisionLayer.setDepth(30);

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
		  mushroom.setSize(22, 36);//rrit pak permasat ne menyre qe te realizohet kontakt me player
		  mushroom.setOffset(10, 2);
		});
   	    
   	    Mushrooms.setDepth(1);

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

		//add piranhaplants
		PiranhaPlants = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const plantsObj = map.getObjectLayer('PiranhaPlants')['objects'];
		plantsObj.forEach(obj => {
			const plant = PiranhaPlants.create(obj.x, obj.y, 'enemies', 'BluePlant1');
			piranhaY[piranhaChildNumber] = obj.y;//get vertical coordinate
			gameLogicScene.applyPiranhaPlantsMovement(plant, piranhaChildNumber);
			plant.state = piranhaChildNumber;
			piranhaChildNumber++;//increment vector
		})


		PiranhaPlants.playAnimation("greenPiranha");


		piranhaChildNumber = 0;
		PiranhaStop = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const stoperObj = map.getObjectLayer('PiranhaStop')['objects'];
		stoperObj.forEach(obj => {
			const stoper = PiranhaStop.create(obj.x, obj.y);
			stoper.setVisible(false);
			stoper.setSize(3, 60);
			stoper.state = piranhaChildNumber;
			piranhaChildNumber++;
		});


		piranhaChildNumber = 0;
		PiranhaStart = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const startObj = map.getObjectLayer('PiranhaStart')['objects'];
		startObj.forEach(obj => {
			const start = PiranhaStart.create(obj.x, obj.y);
			start.setVisible(false);
			start.state = piranhaChildNumber;
			piranhaChildNumber++;
		});
		

		var startArray = [];
		startArray = PiranhaStart.getChildren();
		for(let i = 0; i < PiranhaStart.countActive(true); i++){
		    //i - children number

		    if(i % 4 == 0 || i % 4 == 1){
		    	startArray[i].setSize(3, 90);
		    }
		    else {
	    		startArray[i].setSize(50, 3);
		    }
	    }	


		// 		
		// 
		// ATTACK
		// 
		// 		
		//add mushrooms objects
		Bullets = this.physics.add.group({
			maxSize: 2,
		});
		//flag
		//find flag position
  		const flagPosition = map.findObject("Player", obj => obj.name === "Flag");
  		//load flag object
		var flagPole = this.physics.add
			.sprite(flagPosition.x + 4, flagPosition.y + 152)
			.setSize(5, 326);

		flagPole.setImmovable(true);
		flagPole.body.allowGravity = false;


		//upload flag sprite
		flagImage = this.add.image(flagPosition.x - 21, flagPosition.y + 10, "flag");


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
		    child.setSize(36, 36);
		    child.setOffset(3, 0);
		    child.setVelocityX(-1);//nje shpejtesi shume e vogel/ do te ndryshohet tek funksioni deployenemy
	    });
		Koopas.playAnimation('koopaWalking');



		//turtle object states
		// state: 0 - untouched
		// state: 1 - 1 hit unmoving
		// state: 2 - shell bullet
		// state: 3 - flying turtle verticaly
		// state: 4 - flying turtle
		//add turtle enemy
		Turtles = this.physics.add.group({
			//immovable: true,
		});

		const TurtleObjects = map.getObjectLayer('Turtles')['objects'];
		TurtleObjects.forEach(obj => {
		  const turtle = Turtles.create(obj.x + 21, obj.y - 52, 'enemies', 'Turtle2');
		});
		
		// set turtle group children
		var turtlesArray = [];
		turtlesArray = Turtles.getChildren();
		for(let i = 0; i < Turtles.countActive(true); i++){
		    //i - children number

		    if(i == 4 || i == 5 || i == 6){
		    	turtlesArray[i].state = 4;
		    	turtlesArray[i].setVelocityX(-1);	
		    	turtlesArray[i].play('greenFlyingTurtle');
		    }
		    else {
	    		turtlesArray[i].state = 0;
		    	turtlesArray[i].setVelocityX(-1);
		    	turtlesArray[i].play('turtleWalking');
		    }
		    
		    turtlesArray[i].setBounceX(1);		
		    turtlesArray[i].setSize(36, 52);
		    turtlesArray[i].setOffset(3, 0);
	    }		


		//start playing the level song
		LEVEL1THEMESONG.play();
		LEVEL1THEMESONG.loop = true;
		LEVEL1THEMESONG.volume = 0.7;

  		//
		//
		// collision managment
		//
		//

		this.physics.world.setBoundsCollision(true, true, true, true);
		player.setCollideWorldBounds(true);

		CollisionLayer.setCollision([1, 3, 20, 98, 99, 100, 145, 146, 396, 414, 415]);
		CoinBricks.setCollision([23]);
				

		//player - other
		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer, brickCollision, null, this);
		playerCollisions[1] = this.physics.add.collider(player, Koopas, gameLogicScene.koopasColliderHandler, null, this);
		playerCollisions[2] = this.physics.add.collider(player, Turtles, gameLogicScene.turtlesColliderHandler, null, this);
		playerCollisions[3] = this.physics.add.overlap(player, Mushrooms, gameLogicScene.moveMushroom, null, this);
		playerCollisions[4] = this.physics.add.overlap(player, LifeMushrooms, gameLogicScene.moveMushroom, null, this);
		playerCollisions[5] = this.physics.add.overlap(player, Stars, gameLogicScene.moveStar, null, this);
		playerCollisions[6] = this.physics.add.overlap(player, Flowers, gameLogicScene.fireFlowerHandler, null, this);

		playerCollisions[7] = this.physics.add.collider(CoinBricks, player, function(){ 
			if(player.body.blocked.up || player.body.touching.up)
				BUMP.play();
			}, null, this);

		playerCollisions[8] = this.physics.add.overlap(player, PiranhaPlants, gameLogicScene.piranhaPlantsHandler, null, this);
		playerCollisions[9] = this.physics.add.overlap(player, PiranhaStop, gameLogicScene.piranhaTweenPause, null, this);
		playerCollisions[10] = this.physics.add.overlap(player, PiranhaStart, gameLogicScene.piranhaTweenResume, null, this);

		//player-flag collision
		playerFlagCollision = this.physics.add.collider(player, flagPole, function(){
			gameLogicScene.levelEndingAnimations(8670);	
		}, null, this);


		function brickCollision(player){
			if(player.body.blocked.up || player.body.touching.up){
				var collisionTile = null;
				collisionTile = CollisionLayer.getTileAtWorldXY(player.x, player.y - 40);
			 	if(collisionTile){//brick qe mund te thyen gjithmone
				    if(CoinBricks.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null){				    	
				    	if(collisionTile.index == 20){//questionMarkBrick 1 coin
				    		points += 200;
				    		coins++;
				    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				 			COIN.play();
				    	}
				    	else if(collisionTile.index == 414){//questionMarkBrick powerup
				    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    		ITEM.play();
				    	}
				    	else if(collisionTile.index == 415){//brick 10 points
				    		tenCoinsBrick--;
				    		if(tenCoinsBrick == 0){
				    			CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    			//restore ten coins brick count
								tenCoinsBrick = 10;
				    		}
				    		coins++;
				    		points += 200;
				    		COIN.play();
				    	}
			    					    	
				   	}
				   	else if(CollisionLayer.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null){//nuk mund te thyen nga SmallMario
				   		if(powerStatus.current != powerStatus.small && powerStatus.current != powerStatus.smallInvincible && powerStatus.current != powerStatus.transition){
				    		if(collisionTile.index == 396){//brick
					    		points += 50;
					    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    			BREAK.play();
				    		}
				    	}
				    	else if(collisionTile.index == 396){//brick
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
		
		//collision enemy - enemy
		this.physics.add.collider(Turtles, Turtles, gameLogicScene.collisionBetweenEnemiesHandler, null, this);
		this.physics.add.collider(Koopas, Koopas);
		this.physics.add.collider(Turtles, Koopas, gameLogicScene.collisionBetweenEnemiesHandler, null, this);

		//mushrooms collision
		this.physics.add.collider(Mushrooms, CollisionLayer);

		//lifemushrooms collision
		this.physics.add.collider(LifeMushrooms, CollisionLayer);
		this.physics.add.collider(LifeMushrooms, CoinBricks);
		
		
		this.events.on("mushroomPowerup", function(){

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
		});

		//stars collision
		this.physics.add.collider(Stars, CollisionLayer);
	

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

		this.physics.add.collider(CoinBricks, Mushrooms);
		this.physics.add.collider(CoinBricks, Koopas);
		this.physics.add.collider(CoinBricks, Stars);
		this.physics.add.collider(CoinBricks, Flowers);
   	 	
   	 	//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Turtles, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Koopas, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, CoinBricks, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, PiranhaPlants, gameLogicScene.bulletExplosion, null, this);



	    //attack key(bullet key)
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

   	 	//camera
  		camera = this.cameras.main;
	    camera.startFollow(player);
  		camera.setBounds(0, 0, map.widthInPixels, 0);


 	    //set gamescreen background
   	    this.cameras.main.setBackgroundColor('#6b8cff');
 	    //key control
	    cursors = this.input.keyboard.createCursorKeys();

	    //add text
		gameLogicScene.addText();



	}


	update(time, delta) {
		var flagX = 8408;
		

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
		    	if((powerStatus.current != powerStatus.small && powerStatus.current != powerStatus.transition && powerStatus.current != powerStatus.smallInvincible) && (player.body.touching.down || player.body.blocked.down)){
		        	player.body.velocity.x = 0;
		        	gameLogicScene.chooseAnimation(player, "sitDown");
		    	}
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
			this.physics.world.bounds.x = camera.worldView.x;
			this.physics.world.bounds.right = camera.worldView.x + 671;
		        
		}


		if(player.y >= 544  && gameState.current != gameState.playerDead){//nqs lojtari eshte gjalle por bie nga platforma dyshemese
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
			this.physics.world.removeCollider(playerCollisions[11]);
			this.physics.world.removeCollider(playerCollisions[12]);
			
		}

		if(levelTime == 0 && player.x < flagX){//nqs kemi timeout para se lojtari te arrij flagpole
			gameState.current = gameState.levelTimeout;
			this.time.delayedCall(1000, function(){ this.scene.stop('world21'); this.scene.start("infoScene"); }, [], this);	
		}

	    gameLogicScene.objectsBehaviourHandler(this.physics.world.bounds.right);
	    gameLogicScene.removeObjects(Koopas, Turtles, Mushrooms, Stars, Flowers, Bullets, Coins, this.physics.world.bounds.x, this.physics.world.bounds.right);
	    
	    gameLogicScene.setPlayerObjectSize();
	    

	}//end update

}