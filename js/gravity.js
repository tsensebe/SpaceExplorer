var stage;
var player;
var booster=false;
var brake=false;
var boosterPower=0;

function keyDown(e) {
	// up
	if(e.keyCode === 38) {
		booster=true;
	}

	// down
	if(e.keyCode === 40) {
		brake = true;
	}

	if(e.keyCode === 37){
		player.regX = 0;
		player.regY = 0;
		player.rotation--;
	}

	if(e.keyCode === 39){
		player.rotation++;
	}
}

function keyUp(e) {
	booster=false;
	brake=false;
}



function init() {

	stage = new createjs.Stage("gravityCanvas");
	
	var background = new createjs.Shape();
	background.graphics.beginFill("lightblack").drawRoundRect (0,0,500,400,1); 
	stage.addChild(background);

	var circle = new createjs.Shape();
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

	player = new createjs.Shape();
	player.graphics.beginFill("orange").drawPolyStar(250, 350, 10, 2, 0.5, -90);
	stage.addChild(player);

	createjs.Ticker.on("tick", tick);
	createjs.Ticker.setFPS(60);	

	addEventListener("keyup",keyUp);
	addEventListener("keydown",keyDown);
}

function tick(event) {
    // move 100 pixels per second (elapsedTimeInMS / 1000msPerSecond * pixelsPerSecond):
    if(booster) {
    	boosterPower = Math.min(boosterPower+0.5,4);
    } 

   	if(brake) {
    	boosterPower = Math.max(boosterPower-1,0);
    }
    player.y -= boosterPower;
    stage.update();
}


