class world22 extends Phaser.Scene {
	constructor(){
		super("world22");
	}

	create() {

		//get gameLogic scene
		gameLogicScene = this.scene.get("GameLogic");
		//set current scene as this
		currentScene = this;
		//world text info
		currentLevel = "2-2";
		//restore time
		levelTime = 400;

		//load map
		const map = this.make.tilemap({ key: "map22" });
		
	    // load tilesets
	    const tileset = map.addTilesetImage("tilesetEdited", "spacedTiles");

   	    // load static layers
	    this.add.image(0, 0, "background22").setOrigin(0, 0).setScrollFactor(0);
	    Background = map.createDynamicLayer("Background", tileset, 0, 0);

		//detect player spawn point
  		const spawnPoint = map.findObject("Player", obj => obj.name === "Spawn position");
  		//load player
		player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y-30);		
		player.setDepth(10);
		player.setVelocity(0);
		player.setGravity(0, 10);
		gameLogicScene.setPlayerView();



   	    //add map layers
  
   	    CollisionLayer = map.createDynamicLayer("CollisionLayer", tileset, 0, 0);

   	   	//set depth
   	   	CollisionLayer.setDepth(30);



		// 		
		// 
		// ATTACK
		// 
		// 		
		//add mushrooms objects
		Bullets = this.physics.add.group({
			maxSize: 2,
		});

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

		//add enemies
		//add koopas
		// Koopas = this.physics.add.group({
		// 	//immovable: true,			
		// });

		
		// const KoopaObjects = map.getObjectLayer('Koopas')['objects'];
		// KoopaObjects.forEach(obj => {
		//   const koopa = Koopas.create(obj.x + 21, obj.y - 36, 'enemies', "Koopa1");
		// });
		// Koopas.children.iterate(function (child) {
		//     child.setBounceX(1);
		//     child.setSize(36, 36);
		//     child.setOffset(3, 0);
		//     child.setVelocityX(-1);//nje shpejtesi shume e vogel/ do te ndryshohet tek funksioni deployenemy
	 //    });
		// Koopas.playAnimation('koopaWalking');



		//fish
		Fish = this.physics.add.group({
			allowGravity: false,
		});
		Fish.setDepth(400);

		const FishObjects = map.getObjectLayer('Fish')['objects'];
		FishObjects.forEach(obj => {
		  const fish = Fish.create(obj.x + 21, obj.y - 52, 'enemies', 'Fish1');
		});
		
		// set turtle group children
		var FishArray = [];
		FishArray = Fish.getChildren();
		for(let i = 0; i < Fish.countActive(true); i++){
		    //i - children number

		    if(i == 2 || i == 3 || i == 7 || i == 8 || i == 9 || i == 13){ 
		    	FishArray[i].setVelocityX(-1);	
		    	FishArray[i].play('redFish');
		    }
		    else {
	    		FishArray[i].setVelocityX(-1);	
		    	FishArray[i].play('greyFish');
		    }
		    	
		    FishArray[i].setSize(35, 30);
		    FishArray[i].setOffset(3, 3);
	    }		


		//start playing the level song
		// LEVEL1THEMESONG.play();
		// LEVEL1THEMESONG.loop = true;
		// LEVEL1THEMESONG.volume = 0.7;

  		//
		//
		// collision managment
		//
		//

		this.physics.world.setBoundsCollision(true, true, true, true);
		player.setCollideWorldBounds(true);

		CollisionLayer.setCollision([295, 340, 194, 241]);

		//player - other
		playerCollisions[0] = this.physics.add.collider(player, CollisionLayer);
		playerCollisions[1] = this.physics.add.collider(player, Koopas, gameLogicScene.koopasColliderHandler, null, this);
		playerCollisions[2] = this.physics.add.collider(player, Turtles, gameLogicScene.turtlesColliderHandler, null, this);
		playerCollisions[3] = this.physics.add.overlap(player, Fish, function(){ gameLogicScene.playerHit(); }, null, this);
		playerCollisions[4] = this.physics.add.overlap(Coins, player, gameLogicScene.coinsHandler, null, this);


   	 	//bullets-others
		this.physics.add.collider(Bullets, CollisionLayer, gameLogicScene.bulletExplosion, null, this);
		this.physics.add.collider(Bullets, Fish, gameLogicScene.bulletExplosion, null, this);



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
		        player.setVelocityX(-200);
		        camera.stopFollow(player);
		        player.setFlipX(true);
		        gameLogicScene.chooseAnimation(player, "swim");
		    }
			else if(cursors.right.isDown){
		        player.setVelocityX(200);
		        if(player.x > camera.worldView.x + 336){
		        	camera.startFollow(player);
		        }
		        this.physics.world.bounds.x = camera.worldView.x;
			    this.physics.world.bounds.right = camera.worldView.x + 671;
		        player.resetFlip();
		        gameLogicScene.chooseAnimation(player, "swim");

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

		    if(Phaser.Input.Keyboard.JustDown(cursors.up) && player.y > 85){
	   			player.setVelocityY(-300);
	    		JUMP.play();
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
			this.time.delayedCall(1000, function(){ this.scene.stop('world22'); this.scene.start("infoScene"); }, [], this);	
		}

	    gameLogicScene.objectsBehaviourHandler(this.physics.world.bounds.right);
	    gameLogicScene.removeObjects(Koopas, Turtles, Mushrooms, Stars, Flowers, Bullets, Coins, this.physics.world.bounds.x, this.physics.world.bounds.right);
	    
	    gameLogicScene.setPlayerObjectSize();
	    

	}//end update

}