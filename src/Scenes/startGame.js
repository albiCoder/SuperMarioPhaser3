class startGame extends Phaser.Scene {
	constructor(){
		super("startGame");
	}

	create(){
		//when game over restore this
		lives = 3;
		//set points and coins to zero if player start playing again
		points = 0;
		coins = 0;
		
		if(currentScene != null)
			currentScene.input.keyboard.enabled = true;

		this.add.image(0, 0, "startSceneImg").setOrigin(0, 0);
		highScore = localStorage.getItem('highScore');
		this.add.text(310, 407, highScore, { font: '22px Russo One', fill: '#FFFFFF' });	

		Enterkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
	}

	update(time, delta){
		if(Phaser.Input.Keyboard.JustDown(Enterkey)){
			this.scene.start("world11");
		}
	}
}