class world13 extends Phaser.Scene {
	constructor(){
		super("world13");
	}

	create(){
		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "1-3";
		//restore time
		levelTime = 400;

		//load map
		const map = this.make.tilemap({ key: "map3" });
		
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
		  const mushroom = Mushrooms.create(obj.x + 20, obj.y - 38, 'mushroomImg');
		  mushroom.setSize(22, 36);//rrit pak permasat ne menyre qe te realizohet kontakt me player
		  mushroom.setOffset(10, 2);
		});
   	    
		//add flower objects
		Flowers = this.physics.add.group({
			allowGravity: false,
		});

		const FlowerObjects = map.getObjectLayer('Flowers')['objects'];
		FlowerObjects.forEach(obj => {
		  const flower = Flowers.create(obj.x + 20, obj.y - 38, 'flowerImg');
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
			if(i == 0){
				platformsArray[i].state = 5;
				platformsArray[i].body.velocity.y = -70;
			}
			else if(i == 1 || i == 3){
				platformsArray[i].state = 3;
				platformsArray[i].body.velocity.x = -70;	
			}
			else if(i == 2){
				platformsArray[i].state = 2;	
				platformsArray[i].body.velocity.x = 70;
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
		//add mushrooms objects
		Bullets = this.physics.add.group({
			maxSize: 2,
		});

		//attack key(bullet key)
		keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);


   	    //add map layers
	    CoinBricks = map.createStaticLayer("CoinBricks", tileset, 0, 0);
   	    CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);

		//detect player spawn point
  		const spawnPoint = map.findObject("Player", obj => obj.name === "Spawn position");
  		//load player
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y-30);		
		player.setDepth(10);
		player.setVelocity(0);
		gameLogicScene.setPlayerView();
		

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
		
		// set turtle group children
		var turtlesArray = [];
		turtlesArray = Turtles.getChildren();
		for(let i = 0; i < Turtles.countActive(true); i++){
		    //i - children number

		    if(i == 1 || i == 3){
		    	turtlesArray[i].state = 3;
		    	turtlesArray[i].setVelocityY(-1);	
		    	turtlesArray[i].play('redFlyingTurtle');
		    	turtlesArray[i].body.allowGravity = false;
		    	turtlesArray[i].body.immovable = true;
		    }
		    else {
	    		turtlesArray[i].state = 0;
		    	turtlesArray[i].setVelocityX(-1);
		    	turtlesArray[i].play('redTurtleWalking');
		    }
		    
		    turtlesArray[i].setBounceX(1);		
		    turtlesArray[i].setSize(36, 52);
		    turtlesArray[i].setOffset(3, 0);
	    }		

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

		//set walls size and direction

		var wallsArray = [];
		wallsArray = InvisibleWalls.getChildren();
		
		for(var i = 0; i < InvisibleWalls.countActive(true); i++){
			//i - child number
	
			if(i == 2 || i == 3 || i ==6 || i ==7 || i == 9 || i == 10){//horizontal walls
				wallsArray[i].setSize(200, 20);
			}
			else{//vertical walls
				wallsArray[i].setSize(20, 200);
			}

			wallsArray[i].setVisible(false);
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

		this.physics.world.setBoundsCollision(true, true, false, false);
		player.setCollideWorldBounds(true);

		CollisionLayer.setCollision([1, 3, 20, 98, 99, 100, 145, 146, 396, 414, 415]);

		Background.setCollision([1, 3, 197, 198, 199]);
		
		CoinBricks.setCollision([23]);
		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer, brickCollision, null, this);
		playerCollisions[4] = this.physics.add.collider(player, Background);

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
			gameLogicScene.levelEndingAnimations(6606);	
		}, null, this);

		


		//enemies-collisionLayer
		this.physics.add.collider(Koopas, CollisionLayer);
		this.physics.add.collider(Turtles, CollisionLayer);

		//enemies-backgroundLayer
		this.physics.add.collider(Koopas, Background);
		this.physics.add.collider(Turtles, Background);
		
		//player - enemies
		playerCollisions[1] = this.physics.add.collider(player, Koopas, gameLogicScene.koopasColliderHandler, null, this);
		playerCollisions[2] = this.physics.add.collider(player, Turtles, gameLogicScene.turtlesColliderHandler, null, this);
		
		//collision enemy - enemy		
		this.physics.add.collider(Turtles, Turtles, gameLogicScene.collisionBetweenEnemiesHandler, null, this);

		//mushrooms collision
		this.physics.add.collider(Mushrooms, CollisionLayer);
		playerCollisions[3] = this.physics.add.overlap(player, Mushrooms, gameLogicScene.moveMushroom, null, this);
		

		
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

		
		
		//fireFlowers collision
		this.physics.add.collider(Flowers, CollisionLayer);
		playerCollisions[5] = this.physics.add.overlap(player, Flowers, gameLogicScene.fireFlowerHandler, null, this);
		

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
		playerCollisions[6] = this.physics.add.collider(CoinBricks, player, function(){ 
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
		

		//platforms - others
		playerCollisions[7] = this.physics.add.collider(player, Platforms, gameLogicScene.platformsHandler, null, this);
		this.physics.add.collider(Platforms, InvisibleWalls, gameLogicScene.platformsMovement, null, this);


		//coins - player
		playerCollisions[8] = this.physics.add.overlap(Coins, player, gameLogicScene.coinsHandler, null, this);

		//invisible walls - turtles
		this.physics.add.overlap(Turtles, InvisibleWalls, gameLogicScene.invisibleWallsHandler, null, this);

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
	var flagX = 6391;
	

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
	}
	
	if(levelTime == 0 && player.x < flagX){//nqs kemi timeout para se lojtari te arrij flagpole
		gameState.current = gameState.levelTimeout;
		this.time.delayedCall(1000, function(){ this.scene.stop('world11'); this.scene.start("infoScene"); }, [], this);	
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
	let flagBottom = 418; 
	let flagBaseX = 6387;
	
	this.input.keyboard.enabled = false;
	//this.chooseAnimation(player, "climb");

	if(player.y == flagBottom || player.y == 401){
		player.setFlipX(true);
		player.x += 6;
		gameLogicScene.chooseAnimation(player, "walk");
	}
	else if(player.x >= flagBaseX){
		player.resetFlip();
		player.x += 1;
		gameLogicScene.chooseAnimation(player, "walk");	
	}

	if(player.x == 6602){
	    player.destroy();
	    highScore = points;
	    if(highScore > localStorage.getItem("highScore"))
	    	localStorage.setItem("highScore", highScore);

	    this.scene.stop("world13");
	    this.scene.run("world14");
	}

	gameState.current = gameState.levelEnd;//kjo eshte per te kthyer timer ne 0 dhe per te shtuar piket
}


}
