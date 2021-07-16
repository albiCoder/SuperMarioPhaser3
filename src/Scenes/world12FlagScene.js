class world12FlagScene extends Phaser.Scene {
	constructor(){
		super("world12FlagScene");
	}

	create(){
		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "1-2 ";

		//load map
		const map = this.make.tilemap({ key: "map2End" });
		
	    // load tilesets
	    const tileset = map.addTilesetImage("tileset", "tiles");

	    //load layers
	    // load static layers
	    const Background = map.createStaticLayer("Background", tileset, 0, 0);

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
		gameLogicScene.setPlayerView();
		

		//detect object that start moving piranha
		const sP = map.findObject("Player", obj => obj.name === "startMovingPiranha");
  		//load door
		exit3 = this.physics.add.sprite(sP.x, sP.y + 150);
		exit3.body.immovable = true;
		exit3.body.allowGravity = false;
		exit3.setSize(20, 300);		



		//add piranhaplants
		PiranhaPlants = this.physics.add.group({
			immovable: true,
			allowGravity: false,
		});

		const plantsObj = map.getObjectLayer('PiranhaPlants')['objects'];
		plantsObj.forEach(obj => {
			const plant = PiranhaPlants.create(obj.x, obj.y, 'enemies', 'Plant1');
		})

		 PiranhaPlants.playAnimation("greenPiranha");
		

		//add collision layer
		CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);

		//
		//
		//add exit pipe gates
		//
		//detect gate positions
  		const exitPosition = map.findObject("Player", obj => obj.name === "ExitBox");
  		//load exit1 object
		exit1 = this.physics.add.sprite(exitPosition.x + 36, exitPosition.y + 10);
		exit1.setImmovable(true);
		exit1.setSize(57, 65);
		exit1.body.allowGravity = false;

		smallExitChecker = this.physics.add.sprite(exitPosition.x + 36, exitPosition.y - 50);
		smallExitChecker.setImmovable(true);
		smallExitChecker.setSize(57, 5);
		smallExitChecker.body.allowGravity = false;

		bigExitChecker = this.physics.add.sprite(exitPosition.x + 36, exitPosition.y - 80);
		bigExitChecker.setImmovable(true);
		bigExitChecker.setSize(57, 5);
		bigExitChecker.body.allowGravity = false;


		//flag
		//find flag position
  		const flagPosition = map.findObject("Player", obj => obj.name === "Flag");
  		//load flag object
		var flagPole = this.physics.add
			.sprite(flagPosition.x+3, flagPosition.y+140)
			.setSize(5, 326);

		flagPole.setImmovable(true);
		flagPole.body.allowGravity = false;


		//upload flag sprite
		flagImage = this.add.image(flagPosition.x - 21, flagPosition.y, "flag");

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

		CollisionLayer.setCollision([1, 3, 98, 99, 145]);

		//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, PiranhaPlants, gameLogicScene.bulletExplosion, null, this);

		//exit-player
		this.physics.add.overlap(player, exit1, gameLogicScene.verticalGatesExit, null, this);

		//exitChecker-player
		this.physics.add.overlap(player, smallExitChecker, gameLogicScene.restoreSmallPlayerProperties, null, this);
		this.physics.add.overlap(player, bigExitChecker, gameLogicScene.restoreBigPlayerProperties, null, this);

		//player-Collision layer
		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer);

		
		
		//player-flag collision
		playerFlagCollision = this.physics.add.collider(player, flagPole, function(){
			gameLogicScene.levelEndingAnimations(1190);	
		}, null, this);



		//object to start moving piranhaPlant
		var movePiranha = this.physics.add.overlap(player, exit3, function(){
			this.physics.world.removeCollider(movePiranha);

			PiranhaPlants.children.iterate(function (child){
				gameLogicScene.applyPiranhaPlantsMovement(child);
			});

			//piranhaPlants - player
			this.physics.add.overlap(player, PiranhaPlants, gameLogicScene.piranhaPlantsHandler, null, this);
			
		}, null, this);		

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
		var flagX = 932.333;	

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
		   		if(player.body.touching.down || player.body.blocked.down){
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
			
			if(player.y >= gameOverJumpHeight)
				player.y -= 5;
			else{
				//player.disableBody(false, false);
				player.body.allowGravity = true;
				this.physics.world.removeCollider(playerCollisions[0]);
				this.physics.world.removeCollider(playerCollisions[1]);
				this.physics.world.removeCollider(playerCollisions[2]);
				
			}
			//this.time.delayedCall(1500, this.goToLivesScene, [], this);		
		}

		if(levelTime == 0 && player.x < flagX){//nqs kemi timeout para se lojtari te arrij flagpole
			gameState.current = gameState.levelTimeout;
			this.time.delayedCall(1000, function(){ this.scene.stop('world11'); this.scene.start("infoScene"); }, [], this);	
		}

		if(gameState.current != gameState.levelEnd)
	    	gameLogicScene.setPlayerObjectSize();

	    gameLogicScene.removeObjects(Koopas, Turtles, Mushrooms, Stars, Flowers, Bullets, Coins, this.physics.world.bounds.x, this.physics.world.bounds.right);

	}//end update

}