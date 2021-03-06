window.onload = function() {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var positionXCar = 200;
  var positionYObstacle = 0;
  var positionYObstacle2 = -300;
  var img = new Image();

  function startGame() {
    img.src = "./images/car.png";
    img.onload = function() {
      ctx.drawImage(img, positionXCar, 300, 100, 200);
      ctx.fillStyle = "#551A8B";
      ctx.fillRect(0, positionYObstacle, 200, 60);
      ctx.fillRect(300, positionYObstacle2, 200, 60);
    };
  }

  document.getElementById("start-button").onclick = function() {
    startGame();
    updateCanvas();
  };

  document.onkeydown = function(event) {
    var key = event.keyCode;
    if (key === 37) {
      positionXCar -= 5;
    } else if (key === 39) {
      positionXCar += 5;
    }
  };

  function updateCanvas() {
    if (
      intersect(
        { x: 0, y: positionYObstacle, width: 200, height: 60 },
        { x: positionXCar, y: 300, width: 100, height: 200 }
      ) ||
      intersect(
        { x: 300, y: positionYObstacle2, width: 200, height: 60 },
        { x: positionXCar, y: 300, width: 100, height: 200 }
      )
    ) {
      alert("Game over");
      positionYObstacle = 0;
    } else {
      if (positionYObstacle === 500) {
        positionYObstacle = -60;
        positionYObstacle2++;
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(img, positionXCar, 300, 100, 200);
        ctx.fillRect(0, positionYObstacle, 200, 60);
        ctx.fillRect(300, positionYObstacle2, 200, 60);
        window.requestAnimationFrame(updateCanvas);
      } else if (positionYObstacle2 === 500) {
        positionYObstacle2 = -60;
        positionYObstacle++;
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(img, positionXCar, 300, 100, 200);
        ctx.fillRect(0, positionYObstacle, 200, 60);
        ctx.fillRect(300, positionYObstacle2, 200, 60);
        window.requestAnimationFrame(updateCanvas);
      } else {
        positionYObstacle++;
        positionYObstacle2++;
        ctx.clearRect(0, 0, 500, 500);
        ctx.drawImage(img, positionXCar, 300, 100, 200);
        ctx.fillRect(0, positionYObstacle, 200, 60);
        ctx.fillRect(300, positionYObstacle2, 200, 60);
        window.requestAnimationFrame(updateCanvas);
      }
    }
  }

  function intersect(rect1, rect2) {
    rect1left = rect1.x;
    rect1top = rect1.y;
    rect1right = rect1.x + rect1.width;
    rect1bottom = rect1.y + rect1.height;

    rect2left = rect2.x;
    rect2top = rect2.y;
    rect2right = rect2.x + rect2.width;
    rect2bottom = rect2.y + rect2.height;

    return !(
      rect1left > rect2right ||
      rect1right < rect2left ||
      rect1top > rect2bottom ||
      rect1bottom < rect2top
    );
  }
};

// function nextObstacle() {
//   if (positionXObstacle === 300) {
//     ctx.fillRect(positionXObstacle, 0, 200, 60);
//   }
// }
