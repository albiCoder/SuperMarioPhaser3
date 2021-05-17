class GameLogic extends Phaser.Scene {
	constructor(){
		super("GameLogic");
	}

	create(){
		currentScene = this.scene.get("world11");

		this.scene.start("world11");


	}
	//functions
	levelTimeCountDown(){
		if(gameState.current != gameState.levelEnd)
			levelTime--;
		else{
			points += levelTime * 50;
			pointsText.setText('MARIO\n'+ points);
			levelTime = 0;
		}
		timeText.setText("TIME\n " + levelTime);		
	}

	objectsBehaviourHandler(rightBorder){
		//deploy koopas
		if(Koopas != null){
			Koopas.children.iterate(function(child){
				if(child.x < rightBorder + 50)
					if(child.body.velocity.x == -1)
						child.setVelocityX(-70);
					else if(child.body.velocity.x > 0)
						child.setVelocityX(70);
					else if(child.body.velocity.x < 0)
						child.setVelocityX(-70);
			});
		}

		//deploy turtles
		if(Turtles != null){
			Turtles.children.iterate(function(child){
				if(child.state == 0 && child.x < rightBorder + 50){//ground walking turtles
					if(child.body.velocity.x == -1)
						child.setVelocityX(-70);
					else if(child.body.velocity.x > 0){
						child.setVelocityX(70);
						child.setFlipX(true);
					}
					else if(child.body.velocity.x < 0){
						child.setVelocityX(-70);
						child.resetFlip();
					}
				}
				else if(child.state == 3 && child.x < rightBorder + 50){
						if(child.body.velocity.y == -1)
							child.setVelocityY(-70);
				}
				else if(child.state == 4 && child.x < rightBorder + 50){
						if(child.body.onFloor())
							child.setVelocityY(-400);
						if(child.body.velocity.x == -1)
							child.setVelocityX(-70);
						else if(child.body.velocity.x > 0){
							child.setVelocityX(70);
							child.setFlipX(true);
						}
						else if(child.body.velocity.x < 0){
							child.setVelocityX(-70);
							child.resetFlip();
						}
				}
			});	
		}

		//control Bowser view direction
		if(Bowser != null){
			if(player.x <= Bowser.x){
				Bowser.resetFlip();
			}
			else{
				Bowser.setFlipX(true);
			}
		}
						

		//bullets handler
		if(Bullets != null){
			Bullets.children.iterate(function(child){
				if(child.body.onFloor()){
					child.setVelocityY(-300);
				}
			});
		}

		//fish
		if(Fish != null){
			Fish.children.iterate(function(child){
				if(child.x < rightBorder + 50 && child.body.velocity.x == -1)
					child.setVelocityX(-70);
			});	
		}
	}

	removeObjects(koopas, turtles, mushrooms, stars, flowers, bullets, coins, leftBorder, rightBorder){

		if(koopas != null){
			let koopa = koopas.getFirstAlive();
			if(koopa != null && (koopa.x + 16 < leftBorder || koopa.y > 560))//fshi objektin nqs del jashte worldView
				koopa.destroy(true);			
		}

		if(turtles != null){
			let turtle = turtles.getFirstAlive();
			if(turtle != null && (turtle.x + 20 < leftBorder || turtle.y > 560))//fshi objektin nqs del jashte worldView
				turtle.destroy(true);	
		}

		if(mushrooms != null){
			let mushroom = mushrooms.getFirstAlive();
			if(mushroom != null && (mushroom.x + 20 < leftBorder || mushroom.y > 560))//fshi objektin nqs del jashte worldView
				mushroom.destroy(true);
		}
		
		if(stars != null){
			let star = stars.getFirstAlive();
			if(star != null && (star.x + 20 < leftBorder || star.y > 560))//fshi objektin nqs del jashte worldView
				star.destroy(true);	
		}
			
		if(flowers != null){
			let flower = flowers.getFirstAlive();
			if(flower != null && (flower.x + 20 < leftBorder || flower.y > 560))//fshi objektin nqs del jashte worldView
				flower.destroy(true);
		}

		if(bullets != null){
			let bullet = bullets.getFirstAlive();
			if(bullet != null && (bullet.x < leftBorder || bullet.x > rightBorder || bullet.y > 560))//fshi objektin nqs del jashte worldView
				bullet.destroy(true);
		}

		if(coins != null){
			let coin = coins.getFirstAlive();
			if(coin != null && (coin.x + 20 < leftBorder || coin.y > 560))//fshi objektin nqs del jashte worldView
				coin.destroy(true);	
		}
		
	}

	chooseAnimation(player, action){
		if(action == "walk"){
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition)
				player.play("smallMarioWalk", true);
			else if(powerStatus.current == powerStatus.big)
				player.play("bigMarioWalk", true);
			else if(powerStatus.current == powerStatus.fireMode)
				player.play("bigFireMarioWalk", true);
			else if(powerStatus.current == powerStatus.smallInvincible)
				player.play("smallMarioWalkInvincible1", true);
			else if(powerStatus.current == powerStatus.bigInvincible)
				player.play("bigMarioWalkInvincible1", true);
			else if(powerStatus.current == powerStatus.fireInvincible)
				player.play("bigFireMarioWalkInvincible1", true);
		}
		else if(action == "jump"){
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition)
				player.play("smallMarioJumping", true);
			else if(powerStatus.current == powerStatus.big)
				player.play("bigMarioJumping", true);
			else if(powerStatus.current == powerStatus.fireMode)
				player.play("bigFireMarioJumping", true);
			else if(powerStatus.current == powerStatus.smallInvincible)
				player.play("smallMarioJumpingInvincible1", true);
			else if(powerStatus.current == powerStatus.bigInvincible)
				player.play("bigMarioJumpingInvincible1", true);
			else if(powerStatus.current == powerStatus.fireInvincible)
				player.play("bigFireMarioJumpingInvincible1", true);
		}
		else if(action == "frontView"){
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition)
				player.play("smallMarioFrontView", true);
			else if(powerStatus.current == powerStatus.big)
				player.play("bigMarioFrontView", true);
			else if(powerStatus.current == powerStatus.fireMode)
				player.play("bigFireMarioFrontView", true);
			else if(powerStatus.current == powerStatus.smallInvincible)
				player.play("smallMarioFrontViewInvincible1", true);
			else if(powerStatus.current == powerStatus.bigInvincible)
				player.play("bigMarioFrontViewInvincible1", true);
			else if(powerStatus.current == powerStatus.fireInvincible)
				player.play("bigFireMarioFrontViewInvincible1", true);
		}
		else if(action == "climb"){
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition)
				player.play("smallMarioClimbing", true);
			else if(powerStatus.current == powerStatus.big)
				player.play("bigMarioClimbing", true);
			else if(powerStatus.current == powerStatus.fireMode)
				player.play("bigFireMarioClimbing", true);
			else if(powerStatus.current == powerStatus.smallInvincible)
				player.play("smallMarioClimbingInvincible1", true);
			else if(powerStatus.current == powerStatus.bigInvincible)
				player.play("bigMarioClimbingInvincible1", true);
			else if(powerStatus.current == powerStatus.fireInvincible)
				player.play("bigFireClimbingInvincible1", true);
		}
		else if(action == "sitDown"){				
			if(powerStatus.current == powerStatus.big)
				player.play("bigMarioSittingDown", true);
			else if(powerStatus.current == powerStatus.fireMode)
				player.play("bigFireMarioSittingDown", true);
			else if(powerStatus.current == powerStatus.bigInvincible)
				player.play("bigMarioSittingDownInvincible1", true);
			else if(powerStatus.current == powerStatus.fireInvincible)
				player.play("bigFireSittingDownInvincible1", true);
			else if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition || powerStatus.current == powerStatus.smallInvincible);
		}
		if(action == "swim"){
			if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition)
				player.play("smallMarioSwimming", true);
			else if(powerStatus.current == powerStatus.big)
				player.play("bigMarioSwimming", true);
			else if(powerStatus.current == powerStatus.fireMode)
				player.play("fireMarioSwimming", true);
			else if(powerStatus.current == powerStatus.smallInvincible)
				player.play("smallMarioWalkInvincible1", true);
			else if(powerStatus.current == powerStatus.bigInvincible)
				player.play("bigMarioWalkInvincible1", true);
			else if(powerStatus.current == powerStatus.fireInvincible)
				player.play("bigFireMarioWalkInvincible1", true);
		}
	}

	koopasColliderHandler(player, koopa){
		if((player.body.touching.down || player.body.blocked.down) && (koopa.body.touching.up || koopa.body.blocked.up)){
			koopa.setSize(0, 0);
			koopa.setOffset(0, 25);
			//choose dead koopa texture
			if(koopa.anims.getCurrentKey() == "koopaWalking")
				koopa.setTexture("enemies", "Koopa3");
			else if(koopa.anims.getCurrentKey() == "blueKoopaWalking")
				koopa.setTexture("enemies", "KoopaBlue3");

			currentScene.time.delayedCall(1000, function(){ koopa.destroy();}, [], this);
			gameLogicScene.chooseAnimation(player, "jump");
			player.setVelocityY(-240);//krijo efektin bounce kur lojtari vret nje enemy
			koopa.body.stop();
			koopa.anims.stop();
			points += 100;
			SQUISH.play();
		}
		else if(powerStatus.current == powerStatus.small){
			gameLogicScene.playerKilled();
		}
		else if(powerStatus.current == powerStatus.big || powerStatus.current == powerStatus.fireMode){
			powerStatus.current = powerStatus.transition;

			currentScene.time.delayedCall(3000, function(){if(powerStatus.current == powerStatus.transition)	powerStatus.current = powerStatus.small;}, [], this);
			if(koopa.body.touching.left || koopa.body.blocked.left)
				koopa.setVelocityX(70);
			else if(koopa.body.touching.right || koopa.body.blocked.right)
				koopa.setVelocityX(-70);

			WARP.play();
		}
		else if(powerStatus.current != powerStatus.transition){//invincible mode
			koopa.destroy();
			points += 100;
			KICK.play();
		}
		else if(powerStatus.current == powerStatus.transition){
			if(koopa.body.touching.left || koopa.body.blocked.left)
				koopa.setVelocityX(70);
			else if(koopa.body.touching.right || koopa.body.blocked.right)
				koopa.setVelocityX(-70);
		}

		pointsText.setText('MARIO\n'+ points);
	}


	//turtle object states
	// state: 0 - untouched
	// state: 1 - 1 hit unmoving
	// state: 2 - shell bullet
	// state: 3 - flying turtle verticaly
	// state: 4 - flying turtle
	turtlesColliderHandler(player, turtle){
		if((player.body.touching.down || player.body.blocked.down) && (turtle.body.touching.up || turtle.body.blocked.up)){
			if(turtle.state == 0){
				this.time.delayedCall(6000, gameLogicScene.turtleToStateZero, [turtle, turtle.body.velocity.x, turtle.anims.getCurrentKey()], this);//6 sekonda rri breshka ne zhguall pas goditjes se pare
				turtle.setSize(40, 30);
				turtle.setOffset(0, 10);
				gameLogicScene.chooseAnimation(player, "jump");
				player.setVelocityY(-240);//krijo efektin bounce kur lojtari vret nje enemy
				turtle.body.stop();
				turtle.anims.stop();

				//choose turtle shell texture
				if(turtle.anims.getCurrentKey() == "turtleWalking")
					turtle.setTexture("enemies", "TurtleShell1");
				else if(turtle.anims.getCurrentKey() == "blueTurtleWalking")
					turtle.setTexture("enemies", "BlueTurtleShell1");
				else if(turtle.anims.getCurrentKey() == "redTurtleWalking")
					turtle.setTexture("enemies", "RedTurtleShell1");

				points += 100;

				turtle.state = 1;
			}
			else if(turtle.state == 1){
				if(player.x <= turtle.x)
					turtle.setVelocityX(350);
				else
					turtle.setVelocityX(-350);

				gameLogicScene.chooseAnimation(player, "jump");
				player.setVelocityY(-240);
				turtle.state = 2;
				points += 500; 
			}
			else if(turtle.state == 2){
				turtle.body.stop();
				turtle.state = 1;
				gameLogicScene.chooseAnimation(player, "jump");
				player.setVelocityY(-240);
			}
			else if(turtle.state == 3 || turtle.state == 4){
				turtle.state = 0;
				turtle.body.allowGravity = true;

				gameLogicScene.chooseAnimation(player, "jump");
				player.setVelocityY(-240);

				if(turtle.anims.getCurrentKey() == "greenFlyingTurtle")
					turtle.play("turtleWalking");
				else if(turtle.anims.getCurrentKey() == "redFlyingTurtle")
					turtle.play("redTurtleWalking");
				
				points += 500;
				
				if(player.x <= turtle.x){
					turtle.setVelocityX(70);
					//turtle.setFlipX(true);//flip the image if it is going to the right
				}
				else{
					turtle.setVelocityX(-70);				
				}
				
			}

			SQUISH.play();
			
		}
		else if(powerStatus.current == powerStatus.small && (turtle.state == 0 || turtle.state == 2 || turtle.state == 3 || turtle.state == 4)){
			gameLogicScene.playerKilled();
		}
		else if((powerStatus.current == powerStatus.big || powerStatus.current == powerStatus.fireMode) && (turtle.state == 0 || turtle.state == 2 || turtle.state == 3 || turtle.state == 4)){
			powerStatus.current = powerStatus.transition;

			//move turtle to other direcation after collision with player
			if(turtle.state == 0){
				if(turtle.body.touching.left || turtle.body.blocked.left){
					turtle.setVelocityX(70);
				}
				else if(turtle.body.touching.right || turtle.body.blocked.right){
					turtle.setVelocityX(-70);
				}
			}
			else if(turtle.state == 2){
				if(turtle.body.touching.left || turtle.body.blocked.left){
					turtle.setVelocityX(350);
				}
				else if(turtle.body.touching.right || turtle.body.blocked.right){
					turtle.setVelocityX(-350);
				}
			}
			
			this.time.delayedCall(3000, function(){if(powerStatus.current == powerStatus.transition)	powerStatus.current = powerStatus.small;}, [], this);
			WARP.play();
		}
		else if(powerStatus.current == powerStatus.smallInvincible || powerStatus.current == powerStatus.bigInvincible || powerStatus.current == powerStatus.fireInvincible){
			turtle.destroy();
			points += 100;
			KICK.play();
		}
		else if(turtle.state == 1){//nqs lojtari prek nje shell ai duhet ta kthej ne shell bullet
			if(player.x <= turtle.x)
				turtle.setVelocityX(350);
			else
				turtle.setVelocityX(-350);
			turtle.state = 2;
		}
		else if(powerStatus.current == powerStatus.transition){
			if(turtle.state == 0){
				if(turtle.body.touching.left || turtle.body.blocked.left)
					turtle.setVelocityX(70);
				else if(turtle.body.touching.right || turtle.body.blocked.right)
					turtle.setVelocityX(-70);
			}
			else if(turtle.state == 2){
				if(turtle.body.touching.left || turtle.body.blocked.left)
					turtle.setVelocityX(350);
				else if(turtle.body.touching.right || turtle.body.blocked.right)
					turtle.setVelocityX(-350);
			}
		}

		pointsText.setText('MARIO\n'+ points);	
	}

	turtleToStateZero(turtle, speed, animation){
		if(turtle.active && turtle.state == 1){
			turtle.setSize(36, 52);
		    turtle.setOffset(3, 0);
		    turtle.setVelocityX(speed);
			turtle.state = 0;
			turtle.play(animation);	
		}
	}

	piranhaPlantsHandler(player, plant){
		if(powerStatus.current == powerStatus.small){
			this.input.keyboard.enabled = false;		
			player.setVelocityX(0);
			
			if(lives > 1){
				gameState.current = gameState.playerDead;
				DIE.play();
			}
			else{
				gameState.current = gameState.gameOver;
				GAMEOVER.play();
			}

			this.events.emit('gameStateChange');
			player.play("smallMarioGameOver");
			gameOverJumpHeight = player.y - 80;
			player.body.allowGravity = false;
			plant.body.stop();
			plant.anims.stop();
			LEVEL1THEMESONG.stop();

			this.time.delayedCall(1500, function(){ //
				gameLogicScene.restartTheScene(); 
			}, [], this);
		}
		else if(powerStatus.current == powerStatus.big || powerStatus.current == powerStatus.fireMode){
			powerStatus.current = powerStatus.transition;

			this.time.delayedCall(3000, function(){if(powerStatus.current == powerStatus.transition)	powerStatus.current = powerStatus.small;}, [], this);
			WARP.play();
		}
		else if(powerStatus.current != powerStatus.transition){//invincible mode
			plant.destroy();
			points += 200;
			KICK.play();
		}
		pointsText.setText('MARIO\n'+ points);	
	}


	//turtle object states
	// state: 0 - untouched
	// state: 1 - 1 hit unmoving
	// state: 2 - shell bullet
	// state: 3 - flying turtle
	collisionBetweenEnemiesHandler(turtle, enemy){
		if(turtle.state == 0 && enemy.state == 1){
			if(turtle.body.blocked.left || turtle.body.touching.left)
				turtle.setVelocityX(70);
			else if(turtle.body.blocked.right || turtle.body.touching.right)
				turtle.setVelocityX(-70); 
		}
		else if(turtle.state == 1 && enemy.state == 0){
			if(enemy.body.blocked.left || enemy.body.touching.left)
				enemy.setVelocityX(70);
			else if(enemy.body.blocked.right || enemy.body.touching.right)
				enemy.setVelocityX(-70); 
			
			if(turtle.body.touching.left || turtle.body.blocked.left || turtle.body.touching.right || turtle.body.blocked.right){//make shell unmovable
				turtle.setVelocityX(0);
			}
		}
		if(turtle.state == 2){
			if(turtle.body.touching.left || turtle.body.blocked.left){
				turtle.setVelocityX(-350);
			}
			else if(turtle.body.touching.right || turtle.body.blocked.right){
				turtle.setVelocityX(350);
			}
			if(enemy.state == 2){//if enemy is also a shell bullet. destroy them both or flying turtle
				turtle.destroy(true);
				points += 500;
			}
			enemy.destroy(true);
			points += 500;

			pointsText.setText('MARIO\n'+ points);
			KICK.play();
		}
	}

	bulletExplosion(bullet, object){
		if(bullet.body.blocked.right || bullet.body.touching.right || bullet.body.blocked.left || bullet.body.touching.left || ((bullet.body.blocked.down || bullet.body.touching.down || bullet.body.blocked.up || bullet.body.touching.up) && ((Koopas != null && Koopas.contains(object)) || (Turtles != null && Turtles.contains(object)) || (PiranhaPlants != null && PiranhaPlants.contains(object)) || (Fish != null && Fish.contains(object))))){
			bullet.disableBody(false, false);
			bullet.play('bulletExplosion', true);

			//add points
			if(Koopas != null && Koopas.contains(object)){
				points += 100;
				object.destroy(true);
				KICK.play();
			}
			else if(Turtles != null && Turtles.contains(object)){
				if(object.state == 0 || object.state == 1)
					points += 200;
				else
					points += 500;
				object.destroy(true);
				KICK.play();
			}
			else if(PiranhaPlants != null && PiranhaPlants.contains(object)){
				points += 200;
				object.destroy(true);
				KICK.play();
			}
			else if(Fish != null && Fish.contains(object)){
				points += 200;
				object.destroy(true);
				KICK.play();
			}
			else
				BUMP.play();

			//show points
			pointsText.setText('MARIO\n'+ points);
			
			this.time.delayedCall(200, function(){ bullet.destroy(); }, [], this);
		}
	}

	bulletHitsBowser(bowser, bullet){
		bullet.disableBody(false, false);
		bullet.play('bulletExplosion', true);

		if(Bowser.active == true){
				BowserLife--;
				if(BowserLife == 0){
					points += 5000;
					bowser.destroy(true);
					gameLogicScene.removeBowserTimeEvents();
					BOWSERDIE.play();
				}
				
		}

		//show points
		pointsText.setText('MARIO\n'+ points);
		
		this.time.delayedCall(200, function(){ bullet.destroy(); }, [], this);
			
	}

	restartTheScene(){
		currentScene.scene.restart(); 
		currentScene.input.keyboard.enabled = true;
		currentScene.scene.start('infoScene');
		player.body.allowGravity = true;
		powerStatus.current = powerStatus.small;
	}

	moveFireFlower(player, flower){	
		CollisionLayer.removeTileAtWorldXY(flower.x, flower.y);
		flower.setSize(40, 36);
		flower.setOffset(1, 0);
		flower.body.y -= 36;
		ITEM.play();		
	}
		
	fireFlowerHandler(player, flower){
		flower.destroy(true);
		this.events.emit('fireFlowerPowerup');
		points += 1000;
		pointsText.setText('MARIO\n'+ points);
		POWERUP.play();
	}

	endInvincibleMode(){
		if(powerStatus.current == powerStatus.smallInvincible)
			powerStatus.current = powerStatus.small;
		else if(powerStatus.current == powerStatus.bigInvincible)
			powerStatus.current = powerStatus.big;
		else if(powerStatus.current == powerStatus.fireInvincible)
			powerStatus.current = powerStatus.fireMode;
	}

	moveStar(player, star){
		if(CoinBricks.getTileAtWorldXY(star.x, star.y) != null){
			CollisionLayer.removeTileAtWorldXY(star.x, star.y);
			star.setSize(42, 36);
			star.setOffset(0, 0);
			star.body.y -= 36;
			star.setVelocityX(100);
			//star.setVelocityY(60);
			star.body.allowGravity = true;
			star.setBounce(1, 1);
			POWERUP.play();
		}
		else{
			star.destroy(true);
			this.time.delayedCall(14000, gameLogicScene.endInvincibleMode, [], this);
			this.events.emit("invincibleStarPowerup");
			points += 1000;
			pointsText.setText('MARIO\n'+ points);
			POWERUP.play();
		}
		
	}

	moveMushroom(player, mushroom){
		if(CoinBricks.getTileAtWorldXY(mushroom.x, mushroom.y) != null){
			CollisionLayer.removeTileAtWorldXY(mushroom.x, mushroom.y);
			Flowers.children.iterate(function(child){
				if(child.x + child.width/2 > mushroom.x && child.x - child.width/2 < mushroom.x && child.y + child.height/2 > mushroom.y && child.y - child.height/2 < mushroom.y){
					if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.smallInvincible || powerStatus.current == powerStatus.transition || LifeMushrooms.contains(mushroom)){
						mushroom.setSize(42, 36);
						mushroom.setOffset(0, 0);
						mushroom.body.y -= 36;
						mushroom.setVelocityX(90);
						mushroom.body.allowGravity = true;
						mushroom.setBounceX(1);
						ITEM.play();	
						//child.destroy();//destroy the fireFlower
					}
					else if((powerStatus.current == powerStatus.big  || powerStatus.current == powerStatus.bigInvincible || powerStatus.current == powerStatus.fireMode || powerStatus.current == powerStatus.fireInvincible) && Mushrooms.contains(mushroom)){
						gameLogicScene.moveFireFlower(player, child);//therrite si gameLogicScene.method sepse per nje arsye this eshte == null ketu
						mushroom.destroy(true);
					}
				}
				});
		}
		else{
			if(Mushrooms.contains(mushroom)){//kontrollo nqs eshte nje powerup mushroom ose nje life mushroom
				this.events.emit('mushroomPowerup');
				points += 1000;
				pointsText.setText('MARIO\n'+ points);
				POWERUP.play();
			}
			else{
				lives++;
				LIFEUP.play();
			}

			mushroom.destroy(true);
		}
		
	}

	setPlayerView(){
		if(powerStatus.current == powerStatus.small){
			player.setTexture("mario", "SmallMario_front_view");			
		}
		else {

			if(powerStatus.current == powerStatus.big){
				player.setTexture("mario", "BigMario_front_view");		
			}
			else if(powerStatus.current == powerStatus.fireMode){
				player.setTexture("mario", "BigFireMario_front_view");
			}
		}
	}

	setPlayerObjectSize(){
		if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.transition || powerStatus.current == powerStatus.smallInvincible){
			player.setSize(20, 30);
			player.setOffset(6, 0);
		}
		else{
			if(cursors.down.isDown){
				player.setSize(20, 44);
	        	player.setOffset(6, -6);
			}
			else{
				player.setSize(20, 64);
				player.setOffset(6, -17);			
			}
		}
	}

	coinsHandler(player, coin){
		coin.destroy(true);
		coins++;
		points += 200;

		pointsText.setText('MARIO\n'+ points);	
		coinsNumber.setText("x  " + coins);	
		COIN.play();
	}

	invisibleWallsHandler(turtle){
		if(turtle.state == 0){
			if(turtle.body.velocity.x < 0)
				turtle.setVelocityX(70);
			else if(turtle.body.velocity.x > 0)
				turtle.setVelocityX(-70);
		}
		else if(turtle.state == 3){
			if(turtle.body.velocity.x == 0){//if turtle moving only verticaly
				if(turtle.body.velocity.y < 0)
					turtle.setVelocityY(70);
				else if(turtle.body.velocity.y > 0)
					turtle.setVelocityY(-70);	
			}
		}
	}


	horizontalGatesEntry(player, exit){
		player.x++;
		currentScene.input.keyboard.enabled = false;

	}

	verticalGatesEntry(player, exit){

		if(cursors.down.isDown){

			player.x = exit.x;
			//remove player-pipe collision
			//this.scene.get("world11").physics.world.removeCollider(playerCollisions[0]);
			//remove gravity
			player.body.allowGravity = false;
			//move player down
			player.y++;
			//disable key controlls
			//this.scene.get("world11").input.keyboard.enabled = false;

		}
	}

	gateSendTo(player, checker){

		if(currentLevel == "1-1"){
			currentScene.scene.stop("world11");
			currentScene.scene.start("world11Hidden");
		}
		else if(currentLevel == "1-2"){
			currentScene.scene.stop("world12");
			currentScene.scene.start("world12FlagScene");
		}
		else if(currentLevel == "1-1 "){
			this.scene.get("world11Hidden").scene.stop();
			//set current scene as world 11
			//currentLevel = "1-1";
			//this.scene.start("world11");
			//this.scene.stop("world11");
			currentScene = this.scene.get("world11");
			gameLogicScene.restartTheScene();
			hiddenLevelAccessed = true;

			//playerCollisions[0] = currentScene.physics.add.collider(player, CollisionLayer, brickCollision, null, this);
			//currentScene.scene.start();
			player.body.allowGravity = false;
			currentScene.input.keyboard.enabled = true;
			
			//currentScene.scene.run("world11");
			//currentScene.physics.world.setBounds(6900, 7571, 671, 522);
			
			currentScene = currentScene.scene.get("world11");
		}
	}


	verticalGatesExit(player, exit){
		currentScene.input.keyboard.enabled = false;
		player.body.allowGravity = false;	
		player.y--;
	}

	restoreSmallPlayerProperties(player, checker){
		if(powerStatus.current == powerStatus.small || powerStatus.current == powerStatus.smallInvincible || powerStatus.current == powerStatus.transition){
			currentScene.input.keyboard.enabled = true;
			player.body.allowGravity = true;
		}
	}

	restoreBigPlayerProperties(player, checker){
		currentScene.input.keyboard.enabled = true;
		player.body.allowGravity = true;
	}



	platformsHandler(player, platform){
		if((player.body.touching.down || player.body.blocked.down) && (platform.body.blocked.up || platform.body.touching.up))
			player.body.blocked.down = true;

		platform.body.friction.x = 1;
	}


	platformsMovement(platform, wall){
		if((platform.body.blocked.up || platform.body.touching.up) && (wall.body.blocked.down || wall.body.touching.down)){
			platform.body.velocity.y = 70;
		}
		else if((platform.body.blocked.down || platform.body.touching.down) && (wall.body.blocked.up || wall.body.touching.up)){
			platform.body.velocity.y = -70;
		}
		else if((platform.body.blocked.left || platform.body.touching.left) && (wall.body.blocked.right || wall.body.touching.right)){
			platform.body.velocity.x = 70;
		}
		else if((platform.body.blocked.right || platform.body.touching.right) && (wall.body.blocked.left || wall.body.touching.left)){
			platform.body.velocity.x = -70;
		}
	}


	platformsCycle(Platforms){
		var array = [];
		array = Platforms.getChildren();

		for(let i = 0; i < Platforms.countActive(true); i++){
			if(array[i].y < 0){
				array[i].y = 522;
				array[i].setVelocityY(-70);
			}
			else if(array[i].y > 527){
				array[i].y = 0;
				array[i].setVelocityY(70);
			} 
		}
	}


	//add info texts in scenes

	addText(){
		pointsText = currentScene.add.text(40, 10, 'MARIO\n'+ points, { font: '30px Russo One', fill: '#FFFFFF' }).setScrollFactor(0);
		var coinSymbolImg1 = currentScene.add.image(200, 52, 'coinSymbol1').setScrollFactor(0);
		coinsNumber = currentScene.add.text(222, 33, "x  " + coins, { font: '30px Russo One', fill: '#FFFFFF' }).setScrollFactor(0);
		var levelText = currentScene.add.text(330, 10, "WORLD\n    " + currentLevel, { font: '30px Russo One', fill: '#FFFFFF' }).setScrollFactor(0);
		
	    timeText = currentScene.add.text(490, 10, "TIME\n " + levelTime, { font: '30px Russo One', fill: '#FFFFFF' }).setScrollFactor(0);
		
		currentScene.time.addEvent({ delay: 500, callback: gameLogicScene.levelTimeCountDown, callbackScope: this, loop: true });

	}

	lastLevelAddText(){
		currentScene.add.text(150, 180, 'Super Mario Bros V.1\n         THE END!', { font: '30px Russo One', fill: '#FFFFFF' }).setScrollFactor(0);
	}

	applyPiranhaPlantsMovement(plant){
	    currentScene.tweens.add({
		        targets: plant,
		        y: plant.y - 116,
		        duration: 3000,
			    ease: 'Sine.easeInOut',
			    repeat: -1,
			    yoyo: true
	    });	
	}

	applyPiranhaPlantsMovement(plant, childNumber){
	    piranhaTween[childNumber] = currentScene.tweens.add({
		        targets: plant,
		        y: plant.y - 116,
		        duration: 3000,
			    ease: 'Sine.easeInOut',
			    repeat: -1,
			    yoyo: true
	    });	
	}


	piranhaTweenPause(player, stoper){

		var plant;
		//find the plant
		if(PiranhaPlants != null){
			PiranhaPlants.children.iterate(function (child){
				if(child.state == Math.floor(stoper.state / 2)){
					plant = child;
				}
			});
		}
		//pjesetimi me 2 sepse cdo piranha ka 2 stoper. Nqs lojtari prek nje prej tyre piranha ndalon
		if(plant != null && piranhaY[Math.floor(stoper.state / 2)] < plant.y + 20)
			piranhaTween[Math.floor(stoper.state / 2)].pause();
		
	}

	piranhaTweenResume(player, starter){
		//restore piranhaplant movemnt		
		//kemi 4 objektet start per cdo objekt piranha
		PiranhaStart.children.iterate(function(child){
			if(piranhaTween[Math.floor(child.state / 4)].isPaused() && (child.body.x > player.x - 20 || child.body.x < player.x + 20))
				piranhaTween[Math.floor(child.state / 4)].resume();					
		});
	}		
	


	playerHit(){
		if(powerStatus.current == powerStatus.small){
			gameLogicScene.playerKilled();
		}
		else if(powerStatus.current == powerStatus.big || powerStatus.current == powerStatus.fireMode){
			powerStatus.current = powerStatus.transition;

			currentScene.time.delayedCall(3000, function(){if(powerStatus.current == powerStatus.transition)	powerStatus.current = powerStatus.small;}, [], this);
			WARP.play();
		}
	}

	playerKilled(){
		currentScene.input.keyboard.enabled = false;
		player.body.allowGravity = false;

		player.setVelocityX(0);
		
		if(lives > 1){
			gameState.current = gameState.playerDead;
			DIE.play();
		}
		else{
			gameState.current = gameState.gameOver;
			GAMEOVER.play();
		}
		

		player.play("smallMarioGameOver");
		currentScene.tweens.add({
	        targets: player,
	        y: player.y - 100,
	        duration: 1000,
		    ease: 'Sine.easeInOut',
    	});

    	player.setVelocityY(0);				
		player.body.allowGravity = true;
		LEVEL1THEMESONG.stop();
		
		currentScene.time.delayedCall(2000, function(){ gameLogicScene.restartTheScene(); }, [], this);

	}

	axeCollision(player, axe){
		currentScene.input.keyboard.enabled = false;
		axe.destroy(true);
		player.setVelocity(0);
		gameState.current = gameState.levelEnd;
		
		currentScene.physics.world.removeCollider(playerCollisions[6]);//ALLOW PLAYER TO PAS AXE
		currentScene.physics.world.removeCollider(playerCollisions[10]);//remove fire collisioni

		var firstTileX = 128;
    	var lastTileX = 140;
    	var i = lastTileX;
    	var tilesY = 10;
		//remove tiles of bridge
		currentScene.time.delayedCall(150, function(){ Background.removeTileAt(i, tilesY - 1); }, [], this);
		
		currentScene.time.addEvent({ delay: 300, callback: function (){
	    	Background.removeTileAt(i, tilesY);
	    	i--;
		}, callbackScope: this, repeat: 12 });

		if(Bowser.active == true){
			Bowser.body.allowGravity = false;
			Bowser.setVelocity(0);
		}

		if(Bowser.active == true){
			currentScene.tweens.add({
		        targets: Bowser,
		        y: 200,
		        duration: 1000,
			    ease: 'Sine.easeInOut',
			});
		}		

		currentScene.time.delayedCall(3000, function(){ if(Bowser.active == true) Bowser.body.allowGravity = true; }, [], this);//allow Bowset to fall
		currentScene.time.delayedCall(4000, function(){ 
			if(Bowser.active == true){
				Bowser.destroy(true);
				BOWSERDIE.play();
			}
			
			player.resetFlip();
			gameLogicScene.chooseAnimation(player, "walk");

			currentScene.tweens.add({
		        targets: player,
		        x: 6400,
		        duration: 6000,
			    ease: 'Sine.easeInOut',
			});

		currentScene.time.delayedCall(6010, function(){ gameLogicScene.chooseAnimation(player, "frontView"); 
			
			gameLogicScene.lastLevelAddText();
//			gameLogicScene.savePoints();
			gameLogicScene.goToNextScene(currentScene);
		}, [], this);
				

		}, [], this);//destroy bowser
	}

	savePoints(){
		highScore = points;
		    if(highScore > localStorage.getItem("highScore"))
		    	localStorage.setItem("highScore", highScore);

		//add to url to save player result
		window.location.href = "?points=" + points;
		this.scene.run("startGame"); 

	}


	BowserBehaviour(skena){		
		if(Bowser.active == true){

			currentScene.physics.world.removeCollider(playerCollisions[4]);//remove this collision with so this function can start only one time 

			Bowser.play("bowserWalking");		
			BowserTimeEvent1 = skena.time.addEvent({ delay: Phaser.Math.Between(2000, 3000), callback: function(){ 
				if(Bowser.active == true){
					if(goRight){
						if(Bowser.active == true && Bowser.body.onFloor())
							Bowser.setVelocity(40, -450);
					}
					else{
						if(Bowser.active == true && Bowser.body.onFloor())
							Bowser.setVelocity(-40, -450);	
					}
				}	

			}, callbackScope: this, loop: true });	

			BowserTimeEvent2 = skena.time.addEvent({ delay: Phaser.Math.Between(2000, 3000), callback: function(){ 
				if(Bowser.active == true){

					let fireBreathX;
					if(Bowser.flipX == false)
						fireBreathX = Bowser.x - 36;
					else 
						fireBreathX = Bowser.x + 36;

					Bowser.play("bowserFiring");
					if(Bowser.body.velocity.x != 0){
						var fireBreath = BowserFire.create(fireBreathX, Bowser.y - 12, 'fireBreathAtlas', 'Fire1');
						ENEMYFIRE.play();

						fireBreath.setFlipX(true);
						skena.tweens.add({
					        targets: fireBreath,
					        y: 341 - (Phaser.Math.Between(0, 2) * 36),//percakto lartesine e flakes
					        duration: 1000,
						    ease: 'Sine.easeInOut',
		    			});

						currentScene.time.delayedCall(500, function(){ Bowser.play("bowserWalking"); }, [], this); 
						fireBreath.play('fireBreathAnimation');

		    			if(Bowser.flipX == false){
							fireBreath.setVelocityX(-150);
							fireBreath.setFlipX(true);
		    			}		
						else{
							fireBreath.setVelocityX(150);
							fireBreath.resetFlip();
						}
						fireBreath.setSize(55, 14);
						fireBreath.setOffset(4, 2);			

					}
				}	
			}, callbackScope: this, loop: true });	

		}
	}

	removeBowserTimeEvents(){
		BowserTimeEvent1.remove(false);
		BowserTimeEvent2.remove(false);
	}

	levelEndingAnimations(doorX){
		currentScene.physics.world.removeCollider(playerFlagCollision);

		currentScene.input.keyboard.enabled = false;
		gameState.current = gameState.levelEnd;//kjo eshte per te kthyer timer ne 0 dhe per te shtuar piket

		gameLogicScene.chooseAnimation(player, "climb");

		currentScene.tweens.add({
		        targets: flagImage,
		        y: 400,
		        duration: 1000,
		});

		FLAGPOLE.play();		
		


		currentScene.time.delayedCall(500, function(){
			player.x += 7;
			player.setFlipX(true);

			gameLogicScene.chooseAnimation(player, "walk");
			
			player.resetFlip();

			currentScene.tweens.add({
				targets: player,
				ease: 'Linear',
				x: doorX,
				duration: 3600,
			});

		}, [], this);

		currentScene.time.delayedCall(4500, function(){
			player.setVisible(false);
		    highScore = points;
		    if(highScore > localStorage.getItem("highScore"))
		    	localStorage.setItem("highScore", highScore);
		    
		    gameLogicScene.goToNextScene(currentScene);
		}, null, this);
		 

	}

	goToNextScene(actualScene){
		if(actualScene == currentScene.scene.get("world11")){
			currentScene.scene.stop("world11");
			currentScene.scene.start("world12");
		}
		else if(actualScene == currentScene.scene.get("world12FlagScene")){
			currentScene.scene.stop("world12FlagScene");
			currentScene.scene.start("world13");
		}
		else if(actualScene == currentScene.scene.get("world13")){
			currentScene.scene.stop("world13");
			currentScene.scene.start("world14");
		}
		else if(actualScene == currentScene.scene.get("world14")){
			currentScene.scene.stop("world14");
			currentScene.scene.start("world21");
		}
		else if(actualScene == currentScene.scene.get("world21")){
			currentScene.scene.stop("world21");
			currentScene.scene.start("world22");
		}

		gameState.current = gameState.playing;

	}

}//end gamelogic class
