let canvas, context;

const paddle1 = {
  x: undefined,
  y: 40,
  thickness: 10,
  height: 100
};

const paddleCPU = {
  x: undefined,
  y: 40,
  thickness: 10,
  height: 100
};

const ball = {
  x: 50,
  y: 50,
  xVelocity: 4, // travelling right
  yVelocity: 4, // travelling down
  diameter: 6
};

const player1 = {
  score: 0
};

const playerCPU = {
  score: 0
};

const cpuSpeed = 4;

window.onload = function() {
  canvas = document.getElementById("gc");
  context = canvas.getContext("2d");

  setInterval(update, 1000 / 30);

  canvas.addEventListener("mousemove", event => {
    // move to the mouse's Y-coordinate (and adjust for centring)
    paddle1.y = event.clientY - paddle1.height / 2;
  });
};

function update() {
  // move to next position
  ball.x += ball.xVelocity;
  ball.y += ball.yVelocity;

  // BOUNCE
  // goes off the top of the screen AND ball travelling up
  if (ball.y < 0 && ball.yVelocity < 0) {
    // reverse y velocity
    bounceY();
  }
  // goes off the bottom of the screen AND ball travelling down
  if (ball.y > canvas.height && ball.yVelocity > 0) {
    bounceY();
  }

  // goes off to the left
  if (ball.x < 0) {
    const paddle1TopY = paddle1.y;
    const paddle1BottomY = paddle1.y + paddle1.height;
    // ball hits the paddle
    if (ball.y > paddle1TopY && ball.y < paddle1BottomY) {
      // bounce
      bounceX()
      const paddle1CentreY = paddle1.y + paddle1.height / 2;
      // WHAT DOES THIS SAY??
      const deltaY = ball.y - paddle1CentreY;
      ball.yVelocity = deltaY * 0.3;
    } else {
      // didn't hit the paddle
      playerCPU.score++;
      reset();
    }
  }

  // goes off to the right
  if (ball.x > canvas.width) {
    const paddleCPUTopY = paddle1.y;
    const paddleCPUBottomY = paddleCPU.y + paddleCPU.height;
    // ball hits the paddle
    if (ball.y > paddleCPUTopY && ball.y < paddleCPUBottomY) {
      // bounce
      bounceX()
      const paddleCPUCentreY = paddleCPU.y + paddleCPU.height / 2;
      // WHAT DOES THIS SAY??
      const deltaY = ball.y - paddleCPUCentreY;
      ball.yVelocity = deltaY * 0.3;
    } else {
      // didn't hit the paddle
      player1.score++;
      reset();
    }
  }

  // CPU
  // if centre of paddle is above the ball,
  if (paddleCPU.y + paddleCPU.height / 2 < ball.y) {
    // move it down
    paddleCPU.y += cpuSpeed;
  } else {
    // move it up
    paddleCPU.y -= cpuSpeed;
  }

  draw()
}

function reset() {
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVelocity = -ball.xVelocity;
  ball.yVelocity = 3;
}

function draw() {
  // background
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // paddles
  context.fillStyle = "white";

  // paddle 1
  context.fillRect(0, paddle1.y, paddle1.thickness, paddle1.height);

  // paddle 2
  context.fillRect(
    canvas.width - paddleCPU.thickness,
    paddleCPU.y,
    paddleCPU.thickness,
    paddleCPU.height
  );

  // ball
  context.fillRect(
    ball.x - ball.diameter / 2,
    ball.y - ball.diameter / 2,
    ball.diameter,
    ball.diameter
  );

  // scores
  context.fillText(player1.score, 100, 100);
  context.fillText(playerCPU.score, canvas.width - 100, 100);
}

function bounceX() {
  ball.xVelocity = -ball.xVelocity
}

function bounceY() {
  ball.yVelocity = -ball.yVelocity
}
