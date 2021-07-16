class Preload extends Phaser.Scene {
	constructor(){
		super("Preload");
	}



	create(){
		

		//fireanimation
		this.anims.create({
			key: 'fireBreathAnimation',
			frames: [{
				key: 'fireBreathAtlas',
				frame: 'Fire1'
			}, {
				key: 'fireBreathAtlas',
				frame: 'Fire2'
			}],
			frameRate: 10,
			repeat: -1
		});



		//
		//
		//enemies animations
	    //
	    //
	    //koopa walking
	    this.anims.create({
	    	key: 'koopaWalking',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'Koopa1'
	    	}, {
	    		key: 'enemies',
	    		frame: 'Koopa2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //blue koopa walking
	    this.anims.create({
	    	key: 'blueKoopaWalking',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'KoopaBlue1'
	    	}, {
	    		key: 'enemies',
	    		frame: 'KoopaBlue2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });


	    //turtle walking
	    this.anims.create({
	    	key: 'turtleWalking',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'Turtle1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'Turtle2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //blue turtle walking
	    this.anims.create({
	    	key: 'blueTurtleWalking',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'BlueTurtle1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'BlueTurtle2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //red turtle walking
	    this.anims.create({
	    	key: 'redTurtleWalking',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'RedTurtle1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'RedTurtle2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //red flying turtle
	    this.anims.create({
	    	key: 'redFlyingTurtle',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'FlyingRedTurtle1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'FlyingRedTurtle2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    //green flying turtle
	    this.anims.create({
	    	key: 'greenFlyingTurtle',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'FlyingTurtle1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'FlyingTurtle2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    //
	    //fish
	    //
	    //green fish
	    this.anims.create({
	    	key: 'greenFish',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'Fish1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'Fish2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    //BLUE fish
	    this.anims.create({
	    	key: 'blueFish',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'BlueFish1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'BlueFish2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    //red fish
	    this.anims.create({
	    	key: 'redFish',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'RedFish1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'RedFish2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    //grey fish
	    this.anims.create({
	    	key: 'greyFish',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'GreyFish1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'GreyFish2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });








	    //bowser
		this.anims.create({
	    	key: 'bowserWalking',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'Bowser1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'Bowser2'
	    	}],
	    	frameRate: 3,
	    	repeat: -1
	    });	    
		this.anims.create({
	    	key: 'bowserFiring',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'Bowser3'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'Bowser4'
	    	}],
	    	frameRate: 3,
	    	repeat: -1
	    });

   	    //blue piranha
	    this.anims.create({
	    	key: 'bluePiranha',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'BluePlant1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'BluePlant2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

   	    //green piranha
	    this.anims.create({
	    	key: 'greenPiranha',
	    	frames: [{
	    		key: 'enemies',
	    		frame: 'Plant1'
	    	},
	    	{
	    		key: 'enemies',
	    		frame: 'Plant2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    //
	    //
	    //bullets animation
	    //
	    //
	    this.anims.create({
	    	key: 'bulletAnimation',
	    	frames: [{
	    		key: 'bulletAtlas',
	    		frame: 'Bullet1'
	    	}, {
	    		key: 'bulletAtlas',
	    		frame: 'Bullet2'
	    	}, {
	    		key: 'bulletAtlas',
	    		frame: 'Bullet3'
	    	}, {
	    		key: 'bulletAtlas',
	    		frame: 'Bullet4'
	    	}],
	    	frameRate: 8,
	    	repeat: -1
	    });	    
	    //bullet explosion
	    this.anims.create({
	    	key: 'bulletExplosion',
	    	frames: [{
	    		key: 'bulletAtlas',
	    		frame: 'BulletExplosion1'
	    	}, {
	    		key: 'bulletAtlas',
	    		frame: 'BulletExplosion2'
	    	}, {
	    		key: 'bulletAtlas',
	    		frame: 'BulletExplosion3'
	    	}],
	    	frameRate: 19,
	    	repeat: -1
	    });

	    //
	    //small mario animations
	    //
	    //walking
	    //normal mario walking
	    this.anims.create({
	    	key: 'smallMarioWalk',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_walking_3'
	    	}],
	    	frameRate: 9,
	    	repeat: -1
	    });
	    //invincible mario walking
	    this.anims.create({//kohezgjatja afersisht 10 sekonda
	    	key: 'smallMarioWalkInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_walking_3'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });

	    //front view
	    //normal mario
	    this.anims.create({
	    	key: 'smallMarioFrontView',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_front_view'
	    	}]
	    });
	    //invincible mario
		this.anims.create({
	    	key: 'smallMarioFrontViewInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_front_view'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });

		//sprint
		//normal mario
	    this.anims.create({
	    	key: 'smallMarioSprint',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_sprint'
	    	}]
	    });
	    //invincible mario
	    this.anims.create({
	    	key: 'smallMarioSprintInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_sprint'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });

	    //gameOver
	    this.anims.create({
	    	key: 'smallMarioGameOver',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_gameOver'
	    	}]
	    });

	    //jumping
	    //normal mario
	    this.anims.create({
	    	key: 'smallMarioJumping',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_jump'
	    	}],
	    });
	    //invincible mario
   	    this.anims.create({
	    	key: 'smallMarioJumpingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_jump'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });

   	    //climbing
   	    //normal mario
	    this.anims.create({
	    	key: 'smallMarioClimbing',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_climb_1'
	    	},
	    	{
	    		key: 'mario',
	    		frame: 'SmallMario_climb_2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //invincible mario
	    this.anims.create({
	    	key: 'smallMarioClimbingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible3Mario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible1Mario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallInvincible2Mario_climb_2'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });

	    //swimming
	    //normal mario
	    this.anims.create({
	    	key: 'smallMarioSwimming',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_5'
	    	}],
	    	frameRate: 15,
	    	repeat: -1
	    });
	    //normal mario
	    this.anims.create({
	    	key: 'fireMarioSwimming',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_swimming_5'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_swimming_6'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_swimming_1'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //invincible mario

	    //kete nuk po e perfundoj sepse nuk e di nese ka mode invincible ne water
   	    this.anims.create({
	    	key: 'smallMarioSwimmingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_5'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_5'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_5'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_5'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'SmallMario_swimming_5'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });
   	    //fire invincible mario
	    this.anims.create({
	    	key: 'bigFireMarioClimbingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_climb_2'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });

	    //swimming //nuk po i shkruaj modet invincible per water
	    //normal mario
	    this.anims.create({
	    	key: 'bigMarioSwimming',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_swimming_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_swimming_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_swimming_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_swimming_4'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_swimming_5'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_swimming_6'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });

	    
	    //
   	    //big mario animations
   	    //
   	    //walking
   	    //normal mario
	    this.anims.create({
	    	key: 'bigMarioWalk',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_walking_3'
	    	}],
	    	frameRate: 10,
	    	repeat: -1
	    });
   	    //fire mario
	    this.anims.create({
	    	key: 'bigFireMarioWalk',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_walking_3'
	    	}],
	    	frameRate: 10,
	    	repeat: -1
	    });
	    //normal invincible mario
	    this.anims.create({//kohezgjatja afersisht 10 sekonda
	    	key: 'bigMarioWalkInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_walking_3'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });
	    //fire invincible mario
	    this.anims.create({//kohezgjatja afersisht 10 sekonda
	    	key: 'bigFireMarioWalkInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_walking_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_walking_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigFireMario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_walking_3'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_walking_3'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });

	    //front view
	    //normal mario
	    this.anims.create({
	    	key: 'bigMarioFrontView',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_front_view'
	    	}]
	    });
	    //fire mario
	    this.anims.create({
	    	key: 'bigFireMarioFrontView',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_front_view'
	    	}]
	    });
	    //normal invincible mario
		this.anims.create({
	    	key: 'bigMarioFrontViewInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_front_view'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });
	    //fire invincible mario
		this.anims.create({
	    	key: 'bigFireMarioFrontViewInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_front_view'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_front_view'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });	    

	    //sprint
	    //normal mario
	    this.anims.create({
	    	key: 'bigMarioSprint',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_sprint'
	    	}]
	    });
	    //normal mario
	    this.anims.create({
	    	key: 'bigFireMarioSprint',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_sprint'
	    	}]
	    });
	    //normal invincible mario
	    this.anims.create({
	    	key: 'bigMarioSprintInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_sprint'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });
	    //fire invincible mario
	    this.anims.create({
	    	key: 'bigFireMarioSprintInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_sprint'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_sprint'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });

	    //jumping
	    //normal mario
	    this.anims.create({
	    	key: 'bigMarioJumping',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_jump'
	    	}],
	    });
	    //fire mario
	    this.anims.create({
	    	key: 'bigFireMarioJumping',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_jump'
	    	}],
	    });
	    //normal invincible mario
   	    this.anims.create({
	    	key: 'bigMarioJumpingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_jump'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });
   	    //fire invincible mario
   	    this.anims.create({
	    	key: 'bigFireMarioJumpingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_jump'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_jump'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });

   	    //attacking
   	    //fire mario
   	 //    this.anims.create({
	    // 	key: 'bigFireMarioAttacking',
	    // 	frames: [{
	    // 		key: 'mario',
	    // 		frame: 'BigFireMario_attack_1'
	    // 	}, ],
	    // });
   	 //    //fire invincible mario
   	 //    this.anims.create({
	    // 	key: 'bigFireMarioAttackingInvincible1',
	    // 	frames: [{
	    // 		key: 'mario',
	    // 		frame: 'BigFireMario_attack_1'
	    // 	}, {
	    // 		key: 'mario',
	    // 		frame: 'BigInvincible3Mario_attack_1'
	    // 	}, {
	    // 		key: 'mario',
	    // 		frame: 'BigInvincible1Mario_attack_1'
	    // 	}, {
	    // 		key: 'mario',
	    // 		frame: 'BigInvincible2Mario_attack_1'
	    // 	}],
	    // 	frameRate: 7,
	    // 	repeat: -1
	    // });

		//sitting down
		//normal mario	    
	    this.anims.create({
	    	key: 'bigMarioSittingDown',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_sitdown'
	    	}]
	    });
	    //fire mario	    
	    this.anims.create({
	    	key: 'bigFireMarioSittingDown',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_sitdown'
	    	}]
	    });
	    //normal invincible mario
	    this.anims.create({
	    	key: 'bigMarioSittingDownInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_sitdown'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_sitdown'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_sitdown'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_sitdown'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });
	    //fire invincible mario
	    this.anims.create({
	    	key: 'bigFireMarioSittingDownInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_sitdown'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_sitdown'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_sitdown'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_sitdown'
	    	}],
	    	frameRate: 12,
	    	repeat: -1
	    });

	    //climbing
	    //normal mario
	    this.anims.create({
	    	key: 'bigMarioClimbing',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_climb_1'
	    	},
	    	{
	    		key: 'mario',
	    		frame: 'BigMario_climb_2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //fire mario
	    this.anims.create({
	    	key: 'bigFireMarioClimbing',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigFireMario_climb_1'
	    	},
	    	{
	    		key: 'mario',
	    		frame: 'BigFireMario_climb_2'
	    	}],
	    	frameRate: 6,
	    	repeat: -1
	    });
	    //normal invincible mario
	    this.anims.create({
	    	key: 'bigMarioClimbingInvincible1',
	    	frames: [{
	    		key: 'mario',
	    		frame: 'BigMario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigMario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible3Mario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible1Mario_climb_2'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_climb_1'
	    	}, {
	    		key: 'mario',
	    		frame: 'BigInvincible2Mario_climb_2'
	    	}],
	    	frameRate: 20,
	    	repeat: -1
	    });
	    
	    //
	    //initialize sounds variables
	    //
	    COIN = this.sound.add("COIN");
	    LIFEUP = this.sound.add("LIFEUP");
	    BEEP = this.sound.add("BEEP");
	    JUMP = this.sound.add("JUMP");
	    BOWSERDIE = this.sound.add("BOWSERDIE");
	    BREAK = this.sound.add("BREAK");
	    BUMP = this.sound.add("BUMP");
	    DIE = this.sound.add("DIE");
	    ENEMYFIRE = this.sound.add("ENEMYFIRE");
	    FIREBALL = this.sound.add("FIREBALL");
	    FLAGPOLE = this.sound.add("FLAGPOLE");
	    GAMEOVER = this.sound.add("GAMEOVER");
	    ITEM = this.sound.add("ITEM");
	    KICK = this.sound.add("KICK");
	    PAUSE = this.sound.add("PAUSE");
	    POWERUP = this.sound.add("POWERUP");
	    SKID = this.sound.add("SKID");
	    SQUISH = this.sound.add("SQUISH");
	    THWOMP = this.sound.add("THWOMP");
	    VINE = this.sound.add("VINE");
	    WARP = this.sound.add("WARP");
	    LEVEL1THEMESONG = this.sound.add("LEVEL1THEMESONG");

	    //go to the next scene	
		this.scene.start("GameLogic");


	}
}