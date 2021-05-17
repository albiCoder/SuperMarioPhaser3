<!DOCTYPE html>
<?php 
	
	$con = mysqli_connect('localhost', 'root', '');
	mysqli_select_db($con, 'SMB_Highscores');
	session_start();
	
	if(isset($_POST['submit'])){
		destroySession();
		unset($_POST['submit']);
	}

	function destroySession(){
		$_SESSION = array();
		session_destroy();
		unset($_GET['name']);		
	}


	if(isset($_GET['name'])){
		$_SESSION['playerName'] = $_GET['name'];
	}

	if(!isset($_SESSION['playerName'])){
?>

<script type="text/javascript">

    var lojtari = null; 
    
    lojtari = prompt("Para se te luani eshte e nevojshme te vendosni emrin tuaj!\n\n" + "▬▬▬▬▬▬▬▬▬▬▬▬▬ஜ۩۞۩ஜ▬▬▬▬▬▬▬▬▬▬▬▬▬▬\n\n" + "Ne qofte se nuk jepni nje emer, rezultati juaj nuk do te ruhet!");
    	
	if(lojtari != "" && lojtari != " " && lojtari != "  " && lojtari != "   "){
    	window.location.href = "?name=" + lojtari;
	}

	

</script>

<?php 


}

		if(isset($_GET['points'])){
			saveScoreToDatabase();			
		}

		function saveScoreToDatabase(){
			//save it to database
			if(isset($_SESSION['playerName']) && isset($_GET['points']) && $_SESSION['playerName'] != "null"){
			    //get name
			    $name = $_SESSION['playerName'];
				//get score
				$points = $_GET['points'];
			    //get database connection
			    global $con;
			    $result = mysqli_query($con, "SELECT * FROM highscores WHERE Lojtari = '$name'");
			    //if player exists
			    if(mysqli_num_rows($result) == 1) {
			    	$row = mysqli_fetch_assoc($result);
			    	//if new personal record
			    	if($row['Piket'] < $points){
			    		mysqli_query($con, "UPDATE highscores SET Piket = '$points' WHERE Lojtari = '$name'");
			    	}
			    }
			    //a new player
			    else {
			    	mysqli_query($con, "INSERT INTO highscores (Lojtari, Piket) VALUES ('$name', '$points')");
			    }
			    unset($_GET['points']);
			  }

		}

?>


<html>
<head>
	<meta charset="UTF-8">
	<title>Super Mario Bros</title>
	<link rel="shortcut icon" type="image/png" href="assets/Images/favicon.png">
	<!--CSS-->
	<link rel="stylesheet" href="css/app.css"/>
	<!--Phaser-->
	<script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script>
	<!--Game Logic-->
	<script src="src/GameLogic.js"></script>
	<!--Scenes-->
	<script src="src/Scenes/infoScene.js"></script>
	<script src="src/Scenes/world11.js"></script>
	<script src="src/Scenes/world11Hidden.js"></script>
	<script src="src/Scenes/world12.js"></script>
	<script src="src/Scenes/world12FlagScene.js"></script>
	<script src="src/Scenes/world13.js"></script>
	<script src="src/Scenes/world14.js"></script>
	<script src="src/Scenes/world21.js"></script>
	<script src="src/Scenes/world22.js"></script>
	<script src="src/Scenes/startGame.js"></script>
	<script src="src/Scenes/Boot.js"></script>
	<script src="src/Scenes/Preload.js"></script>

</head>
<body>

<form method="post" action="">
	<input id="submit" type="submit" name="submit" value="Choose a new player">
</form>

<div id="gameContainer"></div>
<div id="info">
	<h3>Super Mario Bros Facts</h3>
	<p>1. Mario was created by Shigeru Miyamoto and appeared in the game designer's first ever title, the 1981 arcade platformer, Donkey Kong.<br/><br/> 
	2. Mario was ally known as Jumpman.<br/><br/> 
	3. Mario was originally a carpenter, not a plumber.<br/><br/> 
	4. Donkey Kong Jr, the 1982 sequel to Donkey Kong, is the only game in which Mario officially stars as the antagonist. 
	Super Mario Bros was preceded by the 1983 arcade platformer, Mario Bros.<br/><br/> 
	5. Bowser was originally sketched as an ox by Miyamoto, but his drawings were misinterpreted by animator Yoichi Kotabe as a turtle. The duo worked together on the latter idea and the Bowser we know today was born.<br/><br/> 
	6. The first Super Mario Bros game has sold 40.24 million copies, although that figure is skewed by the fact that it was bundled with the Nintendo Entertainment System console.<br/><br/> 
	7. Super Mario Bros was the first game to be set in Mushroom World, Miyamoto's long-running and ever-evolving fantasy kingdom.<br/><br/> 
	8. Nintendo composer Koji Kondo provided the iconic soundtrack to Super Mario Bros. The main theme, known as 'Ground Theme', is one of the most recognisable pieces of game music ever recorded.<br/><br/> 
	9. The tune remained in the Billboard ringtone charts for 125 weeks and has been performed in concert by live orchestras.<br/><br/> 
	10. The original Super Mario Bros 2 was designed as a tougher version of the first game and released to support the Famicom Disk System, a new add-on for the Japanese version of the Nintendo Entertainment System. It was considered too difficult for Western release, though, so the US and Europe got a tweaked version of the 1987 title Yume Kojo: Doki Doki Panic instead.<br/><br/> 
	11. A Q Score survey in the early nineties revealed that Mario was more recognisable to American children than Mickey Mouse.<br/><br/> 
	12. The 1993 movie, Super Mario Bros, was Hollywood's first attempt to create a video game tie-in.<br/><br/> 
	13. The Super Mario bros series is in the Guinness Book of Records as the most successful gaming franchise of all time. It now boasts global sales of over 240 million units.<br/><br/> 
	14. Mario has appeared in over 200 video games.</p>
</div>

<div id="table">

	<h3>High Scores!</h3>

	<table border="1px">
		<tr>
			<th>Rank</th>
			<th>Player</th>
			<th>Score</th>
		</tr>

		<?php
			$query = "SELECT * FROM highscores ORDER BY Piket DESC LIMIT 10";
			$rank = 1;
			$result = mysqli_query($con, $query);
			while($row = mysqli_fetch_assoc($result)){
		
		print "<tr class='row".($rank%2)."' id='position".$rank."'>";
		?>
			<td><?php echo $rank; ?></td>
			<td><?php echo $row['Lojtari']; ?></td>
			<td><?php echo $row['Piket']; ?></td>
		</tr>
		<?php
		$rank++;
		}
		?>

	</table>

</div>






<script type="text/javascript">
	
	var config = {
    	type: Phaser.AUTO,
		width: 671,
		height: 522,
		parent: 'gameContainer',
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {y: 830},
				debug: true
			}
		},
		scene: [Boot, Preload, GameLogic, startGame, world11, infoScene, world12, world12FlagScene, world13, world11Hidden, world14, world21, world22]
	};


	//audio variables
	var COIN, LIFEUP, BEEP, JUMP, BOWSERDIE, BREAK, BUMP, DIE, ENEMYFIRE, FIREBALL, FLAGPOLE, GAMEOVER, ITEM, KICK, PAUSE, POWERUP, SKID, SQUISH, THWOMP, VINE, WARP, LEVEL1THEMESONG;
	//variablat
	var game = new Phaser.Game(config);
	var gameLogicScene, currentScene;
	var controls;
	var player;
    var Turtles, Koopas, Platforms, Coins, PiranhaPlants, FireBars;
    var FireBarsContainer = [], fireBarsCounter = 0;
    var CoinBricks, CollisionLayer, InvisibleWalls, Background, Lava;
	var Bowser, BowserFire, goRight = true, BowserBoundary, startMovingBowserObj, BowserLife = 6, BowserTimeEvent1, BowserTimeEvent2;
	var cursors, keyA, Enterkey;
	var exit1, exit2, exit3, exit4, smallExitChecker, bigExitChecker, entryChecker; //pipeGates
	var camera;
	const powerStatus = { // do te perdoret per te pare cfare fuqish ka mario
		small: 1,
		big: 2,
		fireMode: 3,
		smallInvincible: 4,
		bigInvincible: 5,
		fireInvincible: 6,
		transition: 7,
		current: 1
	}
	var lives = 3; //jetet
	var points = 0, coins = 0;
	var levelTime = 400;
	var timeText, coinsNumber, pointsText, highScore = localStorage.getItem('highScore');

	const gameState = {
		startScreen: 1,
		infoScene: 2,
		playing: 3,
		playerDead: 4,
		gameOver: 5,
		levelTimeout: 6,
		levelEnd: 7,
		current: 3
	}

	var gameOverJumpHeight;
	var playerCollisions = [];
	var tenCoinsBrick = 10;
	var Mushrooms, LifeMushrooms, Stars, Flowers, Fish;
	var Bullets, PiranhaStop, PiranhaStart;
	var playerFlagCollision, flagImage;
	var currentLevel;
	var hiddenLevelAccessed = false;

	var piranhaY = [], piranhaTween = [], piranhaChildNumber = 0;//piranha flowers first vertical position and tween

</script>
</body>
</html>