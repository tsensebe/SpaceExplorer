var stage;
var player;
var playerImg = new Image();
var booster = false;
var brake   = false;
var left    = false;
var right   = false;
var boosterPower=0;
var circle;

function keyDown(e) {
	if(e.keyCode === 38) booster = true;
	if(e.keyCode === 40) brake   = true;
	if(e.keyCode === 37) right   = true;
	if(e.keyCode === 39) left    = true;
}

function keyUp(e) {
	if(e.keyCode === 38) booster = false;
	if(e.keyCode === 40) brake   = false;
	if(e.keyCode === 37) right   = false;
	if(e.keyCode === 39) left    = false;
}

addEventListener("keyup",keyUp);
addEventListener("keydown",keyDown);

function wrapzone() {
	if(player.y > 400) player.y = 0;
    if(player.y < 0) player.y = 400;
    if(player.x > 500) player.x = 0;
    if(player.x < 0) player.x = 500;
}


function init() {

	stage = new createjs.Stage("gravityCanvas");

	var background = new createjs.Shape();
	background.graphics.beginFill("lightblack").drawRoundRect (0,0,500,400,1); 
	stage.addChild(background);

	circle = new createjs.Shape();
	circle.graphics.beginFill("red").drawCircle(0, 0, 50);
	circle.x = 65;
	circle.y = 100;
	stage.addChild(circle);

	var circle2 = new createjs.Shape();
	circle2.graphics.beginFill("blue").drawCircle(0, 0, 80);
	circle2.x = 260;
	circle2.y = 110;
	stage.addChild(circle2);

	var circle3 = new createjs.Shape();
	circle3.graphics.beginFill("yellow").drawCircle(0, 0, 150);
	circle3.x = 0;
	circle3.y = 400;
	stage.addChild(circle3);

	var circle4 = new createjs.Shape();
	circle4.graphics.beginFill("green").drawCircle(0, 0, 50);
	circle4.x = 400;
	circle4.y = 300;
	stage.addChild(circle4);


//	playerImg.src = "img/ship.png";
//	player = new createjs.Bitmap(playerImg);

	player = new createjs.Shape();
	player.graphics.beginFill("orange").drawCircle(0,0, 5);
	player.x = 250;
	player.y = 350;
	player.orientation = 90;
	stage.addChild(player);

	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(60);	
}

function tick(event) {
    // move 100 pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond):
    
    // Update player speed 
    if(booster) boosterPower = Math.min(boosterPower+0.5,4);
   	if(brake) boosterPower = Math.max(boosterPower-0.5,0);
    
   	// Update player orienttion
    if(right) {
 		player.orientation -= 5;
		if(player.orientation < 0) player.orientation = 360;
    }
    if(left) {
    	player.orientation += 5;
		if(player.orientation > 360) player.orientation = 0;
    }
		
	// Update player position
    if(true) {
    	player.y = player.y - boosterPower * Math.sin(player.orientation/180*Math.PI);
		player.x = player.x - boosterPower * Math.cos(player.orientation/180*Math.PI);
		wrapzone();
    }

    stage.update();
circle.alpha = 0.2;
    if (circle.hitTest(stage.mouseX, stage.mouseY)) { circle.alpha = 1; }
}