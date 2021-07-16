class world11 extends Phaser.Scene {
	constructor(){
		super("world11");
	}



	create(){

		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "1-1";
				

		//load map
		const map = this.make.tilemap({ key: "map1" });
		
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
		  mushroom.setSize(22, 36);//rrit pak permasat ne menyre qe te realizohet kontakt me player
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
		// 		
		// 
		// ATTACK
		// 
		// 		
		//add mushrooms objects
		Bullets = this.physics.add.group({
			maxSize: 2,
		});

		//attack key(bullet key)
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);





		//detect player spawn point
  		const spawnPoint = map.findObject("Player", obj => obj.name === "Spawn position");
  		//load player
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y-30);		
		gameLogicScene.setPlayerView();
		player.setVelocity(0);//set speed to zero



   	    

		//flag
		//find flag position
  		const flagPosition = map.findObject("Player", obj => obj.name === "Flag");
  		//load flag object
		var flagPole = this.physics.add
			.sprite(flagPosition.x, flagPosition.y+152)
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

		Turtles.playAnimation('turtleWalking');

		//
		//
		//add pipe gates
		//
		//detect gate positions
  		const exit1Position = map.findObject("Player", obj => obj.name === "HiddenWorldGate");
  		//load exit1 object
		exit1 = this.physics.add.sprite(exit1Position.x + 36, exit1Position.y + 5);
		exit1.setImmovable(true);
		exit1.setSize(60, 57);
		exit1.body.allowGravity = false;

		entryChecker = this.physics.add.sprite(exit1Position.x + 36, exit1Position.y + 58);
		entryChecker.setImmovable(true);
		entryChecker.setSize(60, 5);
		entryChecker.body.allowGravity = false;

		const exitPosition = map.findObject("Player", obj => obj.name === "exit2");
  		//load exit1 object
		exit2 = this.physics.add.sprite(exitPosition.x + 36, exitPosition.y + 10);
		exit2.setImmovable(true);
		exit2.setSize(57, 65);
		exit2.body.allowGravity = false;

		smallExitChecker = this.physics.add.sprite(exitPosition.x + 36, exitPosition.y - 50);
		smallExitChecker.setImmovable(true);
		smallExitChecker.setSize(57, 5);
		smallExitChecker.body.allowGravity = false;

		bigExitChecker = this.physics.add.sprite(exitPosition.x + 36, exitPosition.y - 80);
		bigExitChecker.setImmovable(true);
		bigExitChecker.setSize(57, 5);
		bigExitChecker.body.allowGravity = false;

		//add map layers
	    CoinBricks = map.createStaticLayer("CoinBricks", tileset, 0, 0);
   	    CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);
		
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

		CollisionLayer.setCollision([1, 3, 20, 98, 99, 100, 145, 146, 396, 414, 415]);

		CoinBricks.setCollision([23]);
		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer, brickCollision, null, this);

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


		//player-flag collision
		playerFlagCollision = this.physics.add.collider(player, flagPole, function(){
			gameLogicScene.levelEndingAnimations(8580);	
		}, null, this);


		//enemies-collisionLayer
		this.physics.add.collider(Koopas, CollisionLayer);
		this.physics.add.collider(Turtles, CollisionLayer);

		//player - enemies
		playerCollisions[1] = this.physics.add.collider(player, Koopas, gameLogicScene.koopasColliderHandler, null, this);
		playerCollisions[2] = this.physics.add.collider(player, Turtles, gameLogicScene.turtlesColliderHandler, null, this);
		
		//collision enemy - enemy
		
		this.physics.add.collider(Koopas, Koopas);
		this.physics.add.collider(Turtles, Koopas, gameLogicScene.collisionBetweenEnemiesHandler, null, this);

		//mushrooms collision
		this.physics.add.collider(Mushrooms, CollisionLayer);
		playerCollisions[3] = this.physics.add.overlap(player, Mushrooms, gameLogicScene.moveMushroom, null, this);
		
		//lifemushrooms collision
		this.physics.add.collider(LifeMushrooms, CollisionLayer);
		this.physics.add.collider(LifeMushrooms, CoinBricks);
		playerCollisions[4] = this.physics.add.overlap(player, LifeMushrooms, gameLogicScene.moveMushroom, null, this);
		
		
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
		playerCollisions[5] = this.physics.add.overlap(player, Stars, gameLogicScene.moveStar, null, this);
		
		

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
		playerCollisions[6] = this.physics.add.overlap(player, Flowers, gameLogicScene.fireFlowerHandler, null, this);
		

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
		playerCollisions[7] = this.physics.add.collider(CoinBricks, player, function(){ 
			if(player.body.blocked.up || player.body.touching.up)
				BUMP.play();
			}, null, this);

		this.physics.add.collider(CoinBricks, Mushrooms);
		this.physics.add.collider(CoinBricks, Koopas);
		this.physics.add.collider(CoinBricks, Stars);
		this.physics.add.collider(CoinBricks, Flowers);
   	 	
   	 	//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Turtles, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Koopas, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, CoinBricks, gameLogicScene.bulletExplosion, null, this);
		
		//hiddenLevelGate - player
		//this.physics.add.overlap(player, exit1, gameLogicScene.verticalGatesEntry, null, this);
		//this.physics.add.overlap(player, entryChecker, gameLogicScene.gateSendTo, null, this);

		//exitChecker-player
		// this.physics.add.overlap(player, exit2, gameLogicScene.verticalGatesExit, null, this);
		// this.physics.add.overlap(player, smallExitChecker, gameLogicScene.restoreSmallPlayerProperties, null, this);
		// this.physics.add.overlap(player, bigExitChecker, gameLogicScene.restoreBigPlayerProperties, null, this);


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



}//end create

update(time, delta) {
	var flagX = 8319.66666666667;
	

	if(this.input.keyboard.enabled == true){
		if(cursors.left.isDown){
	        player.setVelocityX(-300);
	        camera.stopFollow(player);
	        player.setFlipX(true);
	        if(player.body.onFloor())
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
	        if(player.body.onFloor())
	        	gameLogicScene.chooseAnimation(player, "walk");

	    }
	    else if(cursors.down.isDown){
	    	if(player.body.onFloor())
	        	gameLogicScene.chooseAnimation(player, "sitDown");	
	    }
		else{
	    	player.setVelocityX(0);
			if(player.body.onFloor())
	   			gameLogicScene.chooseAnimation(player, "frontView");
		} 

	    if(cursors.up.isDown){
	   		if(player.body.onFloor()){
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
	}

	if(levelTime == 0 && player.x < flagX){//nqs kemi timeout para se lojtari te arrij flagpole
		gameState.current = gameState.levelTimeout;
		this.time.delayedCall(1000, function(){ this.scene.stop('world11'); this.scene.start("infoScene"); }, [], this);	
	}

	if(hiddenLevelAccessed){
		this.physics.world.setBounds(6900, 7571, 671, 522);	
		hiddenLevelAccessed = false;
	}
    
    gameLogicScene.objectsBehaviourHandler(this.physics.world.bounds.right);
    gameLogicScene.removeObjects(Koopas, Turtles, Mushrooms, Stars, Flowers, Bullets, Coins, this.physics.world.bounds.x, this.physics.world.bounds.right);
    
    if(gameState.current != gameState.levelEnd)
    	gameLogicScene.setPlayerObjectSize();


}//end update



// goToLivesScene(){
// 	this.scene.start("infoScene");
// }

levelEnding(player){
	let flagBottomY = 418; 
	let flagBaseX = 8360;

	this.input.keyboard.enabled = false;
	//this.chooseAnimation(player, "climb");

	if(player.y == flagBottomY || player.y == 401){
		player.setFlipX(true);
		player.x += 6;
		gameLogicScene.chooseAnimation(player, "walk");
	}
	else if(player.x >= flagBaseX){
		player.resetFlip();
		player.x += 1;
		gameLogicScene.chooseAnimation(player, "walk");	
	}

	if(player.x >= 8580){
	    player.destroy();
	    highScore = points;
	    if(highScore > localStorage.getItem("highScore"))
	    	localStorage.setItem("highScore", highScore);
	    
	    //restore time
	    levelTime = 400;

	    this.scene.stop("world11");
	    this.scene.run("world12");

	}
	gameState.current = gameState.levelEnd;//kjo eshte per te kthyer timer ne 0 dhe per te shtuar piket

}


}//end class
//end of world 1-1