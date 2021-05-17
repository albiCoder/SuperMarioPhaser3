class world14 extends Phaser.Scene {
	constructor(){
		super("world14");
	}

	create(){

		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "1-4";
		//restore time
		levelTime = 300;

		//load map
		const map = this.make.tilemap({ key: "map4" });
		
	    // load tilesets
	    const tileset = map.addTilesetImage("tileset", "tiles");

   	    // load static layers
	    Background = map.createDynamicLayer("Background", tileset, 0, 0);
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
		  const platform = Platforms.create(obj.x + 60, obj.y - 8, 'smallPlatformImg');
		  platform.setSize(84, 18);
		  platform.setOffset(0, 0);
		  platform.setBounce(1);
		  platform.body.velocity.x = -70;
		});

		//
		//ADD FIREBARS
		//
		FireBars = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});

		const FireBarsObjects = map.getObjectLayer('FireBars')['objects'];
		FireBarsObjects.forEach(obj => {
		  const fireBar1 = FireBars.create(0, 0, 'bulletAtlas', 'Bullet1');
		  fireBar1.setSize(10, 10);
		  const fireBar2 = FireBars.create(0, 20, 'bulletAtlas', 'Bullet1');
		  fireBar2.setSize(10, 10);
		  const fireBar3 = FireBars.create(0, 40, 'bulletAtlas', 'Bullet1');
		  fireBar3.setSize(10, 10);
		  const fireBar4 = FireBars.create(0, 60, 'bulletAtlas', 'Bullet1');
		  fireBar4.setSize(10, 10);
		  const fireBar5 = FireBars.create(0, 80, 'bulletAtlas', 'Bullet1');
		  fireBar5.setSize(10, 10);
		  const fireBar6 = FireBars.create(0, 100, 'bulletAtlas', 'Bullet1');
		  fireBar6.setSize(10, 10);

		  //create containers
		  FireBarsContainer[fireBarsCounter] = this.add.container(obj.x + 21 , obj.y, [fireBar1, fireBar2, fireBar3, fireBar4, fireBar5, fireBar6]);
		  
		  //set initial firebar position
		  if(fireBarsCounter == 0 || fireBarsCounter == 4 || fireBarsCounter == 5)
		  	FireBarsContainer[fireBarsCounter].rotation = 3.14;

		  //set state to determine rotation direction
		  //state: 1 - clockwise
		  if(fireBarsCounter == 6){
		  	FireBarsContainer[fireBarsCounter].state = 1;
			FireBarsContainer[fireBarsCounter].rotation += 1.56;		  	
		  }

		  //increment firebarscontainer array
		  fireBarsCounter++;

		});

		FireBars.playAnimation("bulletAnimation");

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
			invisibleWall.setSize(20, 200);
			invisibleWall.setVisible(false);
		})

		//
		//
		//add lava objects
		Lava = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const LavaObjects = map.getObjectLayer("Lava")['objects'];
		LavaObjects.forEach(obj => {
			const l = Lava.create(obj.x + 60, obj.y - 12);
			l.setSize(200, 20);
			l.setVisible(false);
		})



		//
		//Bowser
		//

		const BowserPosition = map.findObject("Bowser", obj => obj.name === "Bowser");
  		//load BOWSER
		Bowser = this.physics.add
			.sprite(BowserPosition.x, BowserPosition.y-30, "enemies", "Bowser1")
			.setSize(65, 70)
			.setOffset(12, 0);
		Bowser.body.immovable = true;


		BowserBoundary = this.physics.add.group({
			immovable: true,
			allowGravity: false
		});

		const boundaryObjs = map.getObjectLayer("BowserBoundary")['objects'];
		boundaryObjs.forEach(obj => {
			const child = BowserBoundary.create(obj.x, obj.y + 100);
			child.setVisible(false);
			child.setSize(20, 500);

		});

		BowserFire = this.physics.add.group({
			allowGravity: false,

		});		
		BowserFire.setDepth(-1);
		Bowser.setDepth(1);

		



		startMovingBowserObj = this.physics.add.sprite(3916, 300);
		startMovingBowserObj.body.visible = false;
		startMovingBowserObj.body.immovable = true;
		startMovingBowserObj.body.allowGravity = false;
		startMovingBowserObj.setSize(1, 300);
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
		player.setDepth(10);
		player.setVelocity(0);
		gameLogicScene.setPlayerView();

		//add axe
		const axePosition = map.findObject("Bowser", obj => obj.name === "Axe");
		var axe = this.physics.add.sprite(axePosition.x + 21, axePosition.y, 'axeImg');
		axe.setSize(36, 36);
		axe.body.allowGravity = false;
		axe.body.immovable = true;

		var levelEndGate = this.physics.add.sprite(axePosition.x + 75, axePosition.y);//nje objekt qe nuk do te lejoj lojetarin te kaloj axe
		levelEndGate.setSize(36, 200);
		levelEndGate.setVisible(false);
		levelEndGate.body.allowGravity = false;
		levelEndGate.body.immovable = true;

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

		CollisionLayer.setCollision([20, 804]);
		CoinBricks.setCollision([12, 16]);
		Background.setCollision([52, 12, 931, 941, ]);


		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer, brickCollision, null, this);

		function brickCollision(player){
			if(player.body.blocked.up || player.body.touching.up){
				var collisionTile = null;
				collisionTile = CollisionLayer.getTileAtWorldXY(player.x, player.y - 40);
			 	if(collisionTile){//brick qe mund te thyen gjithmone
				    if(CoinBricks.getTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36) != null){				    	
				    	if(collisionTile.index == 804){//InvisibleBrick 1 coin
				    		points += 200;
				    		coins++;
				    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				 			COIN.play();
				    	}
				    	else if(collisionTile.index == 416){//questionMarkBrick powerup
				    		CollisionLayer.removeTileAtWorldXY(collisionTile.x * 42, collisionTile.y * 36);
				    		ITEM.play();
				    	}
				    	else
				    		BUMP.play();			    	
				   	}
				   	
			    	pointsText.setText('MARIO\n'+ points);
			    	coinsNumber.setText("x  " + coins);    
				}
		 	}
		}//end brickCollision

		//
		//
		//collision
		//
		//


		//mushrooms collision
		this.physics.add.collider(Mushrooms, CollisionLayer);
		playerCollisions[7] = this.physics.add.overlap(player, Mushrooms, gameLogicScene.moveMushroom, null, this);

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


		//fireFlowers collision
		this.physics.add.collider(Flowers, CollisionLayer);
		playerCollisions[8] = this.physics.add.overlap(player, Flowers, gameLogicScene.fireFlowerHandler, null, this);
		

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
		playerCollisions[1] = this.physics.add.collider(CoinBricks, player, function(){ 
			if(player.body.blocked.up || player.body.touching.up)
				BUMP.play();
			}, null, this);

		this.physics.add.collider(CoinBricks, Mushrooms);
		this.physics.add.collider(CoinBricks, Flowers);

   	 	//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Background, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, CoinBricks, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Bowser, gameLogicScene.bulletHitsBowser, null, this);

		//background - others
		playerCollisions[2] = this.physics.add.collider(player, Background);
		this.physics.add.collider(Mushrooms, Background);
		this.physics.add.collider(Bullets, Background);


		//platforms - others
		playerCollisions[3] = this.physics.add.collider(player, Platforms, gameLogicScene.platformsHandler, null, this);
		this.physics.add.collider(Platforms, InvisibleWalls, gameLogicScene.platformsMovement, null, this);

		//firebars - player
		playerCollisions[9] = this.physics.add.overlap(player, FireBars, gameLogicScene.playerHit, null, this);

		//firebreath - player
		playerCollisions[10] = this.physics.add.overlap(player, BowserFire, gameLogicScene.playerHit, null, this);

		//axe - player
		playerCollisions[11] = this.physics.add.collider(player, axe, gameLogicScene.axeCollision, null, this);

		//
		//Bowser
		//
		//bowser - boundaries
		this.physics.add.collider(BowserBoundary, Bowser, function(){
			if(goRight == true)
				goRight = false;
			else 
				goRight = true;

			Bowser.setVelocityX(Bowser.body.velocity.x * (-1));
		}, null , this);

		playerCollisions[12] = this.physics.add.overlap(Bowser, player, function(){ gameLogicScene.playerHit(); }, null, this);
		this.physics.add.collider(Bowser, Background);

		//start moving bowser
		playerCollisions[4] = this.physics.add.collider(player, startMovingBowserObj, function(){
			gameLogicScene.BowserBehaviour(currentScene);
		}, null, this);

		//lava - player
		playerCollisions[5] = this.physics.add.overlap(player, Lava, function(){ gameLogicScene.playerKilled(); }, null, this);

		//mos lejo lojetarin te tejkaloj axen
		playerCollisions[6] = this.physics.add.collider(player, levelEndGate);


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



	}//END CREATE

	update(time, delta) {
	var flagX = 5912.33;
	

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
		this.time.delayedCall(1000, function(){ this.scene.stop('world11'); this.scene.start("infoScene"); }, [], this);	
	}

    gameLogicScene.objectsBehaviourHandler(this.physics.world.bounds.right);
    gameLogicScene.removeObjects(Koopas, Turtles, Mushrooms, Stars, Flowers, Bullets, Coins, this.physics.world.bounds.x, this.physics.world.bounds.right);
    
    gameLogicScene.setPlayerObjectSize();
    
    gameLogicScene.platformsCycle(Platforms);

    for(let i = 0; i < fireBarsCounter; i++){
    	if(FireBarsContainer[i].state == 1)
    		FireBarsContainer[i].rotation -= 0.03;
    	else
    		FireBarsContainer[i].rotation += 0.03;
    }



}//end update

}