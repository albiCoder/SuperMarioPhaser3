class world11Hidden extends Phaser.Scene {
	constructor(){
		super("world11Hidden");
	}

	create(){
		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
//		currentScene = this;
		//world text info
		currentLevel = "1-1 ";

		//load map
		const map = this.make.tilemap({ key: "map1Hidden" });
		
	    // load tilesets
	    const tileset = map.addTilesetImage("tileset", "tiles");

   	  
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



   		//detect player spawn point
  		const spawnPoint = map.findObject("Player", obj => obj.name === "Spawn position");
  		//load player
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y-30);		
		player.setVelocity(0);
		gameLogicScene.setPlayerView();

   	    //add map layers
   	    var Background = map.createStaticLayer("Background", tileset, 0, 0);
   	    CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);

		//
		//
		//add pipe gates
		//
		//detect gate positions
  		const exit1Position = map.findObject("Player", obj => obj.name === "exit1");
  		//load exit1 object
		exit1 = this.physics.add.sprite(exit1Position.x + 32, exit1Position.y + 12);
		exit1.setImmovable(true);
		exit1.setSize(70, 57);
		exit1.body.allowGravity = false;

		smallExitChecker = this.physics.add.sprite(exit1Position.x + 80, exit1Position.y + 7);
		smallExitChecker.setImmovable(true);
		smallExitChecker.setSize(5, 57);
		smallExitChecker.body.allowGravity = false;


		//start playing the level song
		LEVEL1THEMESONG.play();
		LEVEL1THEMESONG.loop = true;
		LEVEL1THEMESONG.volume = 0.7;


		//
		//
		// collision managment
		//
		//

		CollisionLayer.setCollision([107, 2, 288, 335, 289, 290, 569]);
		Background.setCollision([2]);
		this.physics.add.collider(player, CollisionLayer);
		this.physics.add.collider(player, Background);

		//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		//coins - player
		this.physics.add.overlap(Coins, player, gameLogicScene.coinsHandler, null, this);

		//pipegates-player
		this.physics.add.overlap(player, exit1, this.horizontalGatesEntry, null, this);

		this.physics.add.overlap(player, smallExitChecker, gameLogicScene.gateSendTo, null, this);

 	    //set gamescreen background
   	    this.cameras.main.setBackgroundColor('#000000');
 	    //key control
	    cursors = this.input.keyboard.createCursorKeys();

	    //add text
	    gameLogicScene.addText();

	    gameLogicScene.setPlayerView();
	    gameLogicScene.setPlayerObjectSize();
	}

	update(time, delta) {
		
		
		if(cursors.left.isDown){
	        player.setVelocityX(-300);
	        player.setFlipX(true);
	        if(player.body.touching.down || player.body.blocked.down)
	        	gameLogicScene.chooseAnimation(player, "walk");
	    }
		else if(cursors.right.isDown){
	        player.setVelocityX(300);
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
		
		
		if(levelTime == 0){
			gameState.current = gameState.levelTimeout;
			this.time.delayedCall(1000, function(){ this.scene.stop('world11'); this.scene.start("infoScene"); }, [], this);	
		}


	}//end update

	horizontalGatesEntry(player, exit){
		player.x++;
		currentScene.input.keyboard.enabled = false;
		//this.physics.world.removeCollider(playerCollisions[0]);
	}
}