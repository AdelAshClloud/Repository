// useful to have them as global variables
var canvas, ctx, w, h;
var mousePos;


// an empty array!
var balls = [];
var initialNumberOfBalls;
var globalSpeedMultiplier = 0.2;
var colorToEat = 'red';
var wrongBallsEaten = goodBallsEaten = 0;
var numberOfGoodBalls;
let level = 1;
let nbVies = 3;
let score = 0;
let gameState = 'Game Over';
let LevelMax = 1 ;

var player = {
    x: 10,
    y: 10,
    width: 20,
    height: 20,
};

function drawPlayer(r) {
    ctx.save();

    var playerImg = new Image();
    playerImg.src = './ressources/link.png';

    ctx.translate(r.x - r.width, r.y - r.height);

    // ctx.fillStyle = r.color;
    // ctx.fillRect(0, 0, r.width, r.height);
    ctx.drawImage(playerImg, 0, 0, 50, 80);
    ctx.restore();


}


window.onload = function init() {
    // called AFTER the page has been loaded
    canvas = document.querySelector("#myCanvas");

    // often useful
    w = canvas.width;
    h = canvas.height;

    // important, we will draw with this object
    ctx = canvas.getContext('2d');

    // start game with 10 balls, balls to eat = red balls
    startGame(level);

    // add a mousemove event listener to the canvas
    canvas.addEventListener('mousemove', mouseMoved);
    window.addEventListener('keydown', traiteToucheEnfoncee);

    // ready to go !
    mainLoop();
};

function traiteToucheEnfoncee(evt) {
    console.log(evt.key);
    if (evt.key === ' ') {
        if (gameState === 'Game Over') {
            gameState = 'PLAYING';
            
            level = 1;
            score = 0;
            nbVies = 3;
            startGame(level);
        }
    }
}

function startGame(level) {
    let nb = level * 2;

    do {
        balls = createBalls(nb);
        initialNumberOfBalls = nb;
        numberOfGoodBalls = countNumberOfGoodBalls(balls, colorToEat);
    } while (numberOfGoodBalls === 0);

    wrongBallsEaten = goodBallsEaten = 0;
}

function countNumberOfGoodBalls(balls, colorToEat) {
    var nb = 0;

    balls.forEach(function (b) {
        if (b.color === colorToEat)
            nb++;
    });

    return nb;
}

function changeNbBalls(nb) {
    startGame(nb);
}

function changeColorToEat(color) {
    colorToEat = color;
}

function changePlayerColor(color) {
    player.color = color;
}

function changeBallSpeed(coef) {
    globalSpeedMultiplier = coef;
}

function mouseMoved(evt) {
    mousePos = getMousePos(canvas, evt);
}

function getMousePos(canvas, evt) {
    // necessary work in the canvas coordinate system
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function movePlayerWithMouse() {
    if (mousePos !== undefined) {
        player.x = mousePos.x;
        player.y = mousePos.y;
    }
}

function mainLoop() {
    // 1 - clear the canvas
    ctx.clearRect(0, 0, w, h);

    if (gameState === 'PLAYING') {
        // draw the ball and the player
        drawPlayer(player);
        drawAllBalls(balls);
        drawInfosTextuelles(balls);

        // animate the ball that is bouncing all over the walls
        moveAllBalls(balls);

        movePlayerWithMouse();
    } else if(gameState === 'Game Over') {
        ctx.font = "100px Arial";
        ctx.fillText("Game Over!" , 140, 350+Math.random()*5);
        ctx.font = "50px Arial";
        ctx.fillText("Press <SPACE> to start again" , 100, 400+Math.random()*5);

    globalSpeedMultiplier = 0,2
    if (LevelMax < level)
        LevelMax = level ;
    }
    // ask the browser to call mainloop in 1/60 of  for a new animation frame
    requestAnimationFrame(mainLoop);
}

// Collisions between rectangle and circle
function circRectsOverlap(x0, y0, w0, h0, cx, cy, r) {
    var testX = cx;
    var testY = cy;
    if (testX < x0) testX = x0;
    if (testX > (x0 + w0)) testX = (x0 + w0);
    if (testY < y0) testY = y0;
    if (testY > (y0 + h0)) testY = (y0 + h0);
    return (((cx - testX) * (cx - testX) + (cy - testY) * (cy - testY)) < r * r);
}


function add_speed_ball(ball){

    if (ball.color === 'cyan')
    {
        ball.speedX = ball.speedX + 2;
        ball.speedY= ball.speedY + 2;
    }
    if (ball.color === 'purple')
    {
        ball.speedX = ball.speedX - 2;
        ball.speedY= ball.speedY - 2;
    }
    if (ball.color === 'pink')
    {
        ball.speedX = ball.speedX + 3;
        ball.speedY= ball.speedY + 3;
    }
    if (ball.color === 'green')
    {
        ball.speedX = ball.speedX + -3;
        ball.speedY= ball.speedY + -3;
    }
    if (ball.color === 'yellow')
    {
        ball.speedX = ball.speedX + 5;
        ball.speedY= ball.speedY + 5;
    }
    return ball;
}


function createBalls(n) {
    // empty array
    var ballArray = [];

    // create n balls
    for (var i = 0; i < n; i++) {
        var b = {
            x: Math.round(Math.random() * h),
            y: Math.round(Math.random() * w),
            radius: 5 + 30 * Math.random(), // between 5 and 35
            speedX: -2 + 10 * Math.random(), // between -2 and + 5
            speedY: -2 + 10 * Math.random(), // between -2 and + 5
            color: getARandomColor(),
        }
        if (i < level)
            b.color = "red"

        b = add_speed_ball(b);
        // add ball b to the array

        ballArray.push(b);
    }
    // returns the array full of randomly created balls
    return ballArray;
}

function getARandomColor() {
    var colors = ['blue', 'cyan', 'purple', 'pink', 'green', 'yellow'];
    // a value between 0 and color.length-1
    // Math.round = rounded value
    // Math.random() a value between 0 and 1
    var colorIndex = Math.round((colors.length - 1) * Math.random());
    var c = colors[colorIndex];

    // return the random color
    return c;
}

function drawInfosTextuelles(balls) {
    ctx.save();
    ctx.font = "20px Arial";

    if (nbVies <= 0) {
        // on a perdu
        gameState = 'Game Over';
    } else if (goodBallsEaten === numberOfGoodBalls) {
        // On a gagné, on a mangé toutes les bonnes balles
        ctx.fillText("You Win! Final score : " + (initialNumberOfBalls - wrongBallsEaten),
            20, 30);
        // on change de niveau
        passerAuNiveauSuivant()
    } else {
        // On est en train de jouer....
        ctx.fillText("Balls still alive: " + balls.length, 10, 30);
        ctx.fillText("Good Balls eaten: " + goodBallsEaten, 10, 50);
        ctx.fillText("Wrong Balls eaten: " + wrongBallsEaten, 10, 70);
        ctx.fillText("Level: " + level, 910, 30);
        ctx.fillText("Vies: " + nbVies, 10, 90);
        canvas.fillStyle = "blue";
        ctx.fillText("Score: " + score, 710, 780);
        ctx.fillText("LevelMax" + LevelMax, 10, 110)

    }
    ctx.restore();
}

function passerAuNiveauSuivant() {
    level++;
    globalSpeedMultiplier += 0.1;
    startGame(level);
}

function drawAllBalls(ballArray) {
    ballArray.forEach(function (b) {
        drawFilledCircle(b);
    });
}

function moveAllBalls(ballArray) {
    // iterate on all balls in array
    balls.forEach(function (b, index) {
        // b is the current ball in the array
        if (index === 0) {
            b.radius += 0.1;
            if (b.radius > 40) {
                b.radius = 5;
            }
            b.x += (b.speedX * globalSpeedMultiplier);
            b.y += (b.speedY * globalSpeedMultiplier);
        } else {
            b.x += (b.speedX * globalSpeedMultiplier);
            b.y += (b.speedY * globalSpeedMultiplier);
        if(b.color === "yellow")
            b.x += Math.random()*5
        else if (b.color === "cyan")
        this.x += this.speed *Math.cos(this.angle * Math.PI / 180);
        this.y += this.speed * Math.sin(this.angle * Math.PI / 180);

        }

        testCollisionBallWithWalls(b);

        testCollisionWithPlayer(b, index);
    });
}

function testCollisionWithPlayer(b, index) {
    if (circRectsOverlap(player.x, player.y,
        player.width, player.height,
        b.x, b.y, b.radius)) {
        // we remove the element located at index
        // from the balls array
        // splice: first parameter = starting index
        //         second parameter = number of elements to remove
        if (b.color === colorToEat) {
            // Yes, we remove it and increment the score
            goodBallsEaten += 1;
            score += 10;
        } else {
            wrongBallsEaten += 1;
            nbVies = nbVies - 1;
        }

        balls.splice(index, 1);

    }
}

function testCollisionBallWithWalls(b) {
    // COLLISION WITH VERTICAL WALLS ?
    if ((b.x + b.radius) > w) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = w - b.radius;
    } else if ((b.x - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedX = -b.speedX;

        // put the ball at the collision point
        b.x = b.radius;
    }

    // COLLISIONS WTH HORIZONTAL WALLS ?
    // Not in the else as the ball can touch both
    // vertical and horizontal walls in corners
    if ((b.y + b.radius) > h) {
        // the ball hit the right wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.y = h - b.radius;
    } else if ((b.y - b.radius) < 0) {
        // the ball hit the left wall
        // change horizontal direction
        b.speedY = -b.speedY;

        // put the ball at the collision point
        b.Y = b.radius;
    }
}


function drawFilledCircle(c) {
    // GOOD practice: save the context, use 2D trasnformations
    ctx.save();

    // translate the coordinate system, draw relative to it
    ctx.translate(c.x, c.y);

    ctx.fillStyle = c.color;
    // (0, 0) is the top left corner of the monster.
    ctx.beginPath();
    ctx.arc(0, 0, c.radius, 0, 2 * Math.PI);
    ctx.fill();

    // GOOD practice: restore the context
    ctx.restore();
}