class infoScene extends Phaser.Scene {
	constructor(){
		super("infoScene");
	}

	create(){
		--lives;
		LEVEL1THEMESONG.stop();
		powerStatus.current = powerStatus.small;
		currentScene.input.keyboard.enabled = true;

		 //add text
		pointsText = this.add.text(40, 10, 'MARIO\n'+ points, { font: '30px Russo One', fill: '#FFFFFF' });
		var coinSymbolImg1 = this.add.image(200, 52, 'coinSymbol1');
		coinsNumber = this.add.text(222, 33, "x  " + coins, { font: '30px Russo One', fill: '#FFFFFF' });
		var levelText = this.add.text(330, 10, "WORLD\n    " + currentLevel, { font: '30px Russo One', fill: '#FFFFFF' });
	    timeText = this.add.text(490, 10, "TIME\n ", { font: '30px Russo One', fill: '#FFFFFF' });
		
		if(gameState.current == gameState.playerDead){
			this.add.text(222, 220, "WORLD " + currentLevel, { font: '30px Russo One', fill: '#FFFFFF' });
			this.add.image(273, 290, 'mario', 'SmallMario_front_view');
			this.add.text(290 , 273, "  x  " + lives, { font: '30px Russo One', fill: '#FFFFFF' });		
		}
		else if(gameState.current == gameState.levelTimeout){
			var text = this.add.text(223, 260, "  TIMEOUT", { font: '30px Russo One', fill: '#FFFFFF' });
			this.time.delayedCall(1000, function(){ text.setText("GAME OVER") }, [], this);
			
		}
		else if(gameState.current == gameState.gameOver){
			this.add.text(223, 260, "GAME OVER", { font: '30px Russo One', fill: '#FFFFFF' });
		}
		
		if(lives > 0)
			this.time.delayedCall(1500, function(){ 
				this.scene.stop("infoScene");
				levelTime = 400;
				gameState.current = gameState.playing; 
				this.scene.run(currentScene); 
			}, [], this);
		else
			this.time.delayedCall(1000, function(){ 				
				this.scene.stop("infoScene");
				levelTime = 400;
				gameState.current = gameState.startScreen;

				//add to url to save player result
				window.location.href = "?points=" + points;
				this.scene.run("startGame"); 
			}, [], this);
	}

}