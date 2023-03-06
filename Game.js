const canvas = document.querySelector("#game-canvas");
const c = canvas.getContext("2d");
let collectedscore = document.querySelector("#collected");
let winText = document.querySelector("#winner");
let starText = document.querySelector("#score");

let helpMenu = document.getElementById("help-menu");

function hideMenu() {
  if ((helpMenu.style.display = "block")) {
    helpMenu.style.display = "none";
  } else {
    helpMenu.style.display = "block";
  }
}

function showMenu() {
  if ((helpMenu.style.display = "none")) {
    helpMenu.style.display = "block";
  } else {
    helpMenu.style.display = "none";
  }
}

canvas.width = 576;
canvas.height = 900;

const scaledCanvas = {
  width: canvas.width / 2,
  height: canvas.height / 2,
};

const floorCollisions2D = [];
for (let i = 0; i < floorCollisions.length; i += 72) {
  floorCollisions2D.push(floorCollisions.slice(i, i + 72));
}

const collisionBlocks = [];
floorCollisions2D.forEach((across, y) => {
  across.forEach((symbol, x) => {
    if (symbol > 0) {
      collisionBlocks.push(
        new CollisionBlock({
          position: {
            x: x * 8,
            y: y * 8,
          },
        })
      );
    }
  });
});

const starCollect2D = [];
for (let i = 0; i < starCollect.length; i += 72) {
  starCollect2D.push(starCollect.slice(i, i + 72));
}

const starBlocks = [];
starCollect2D.forEach((across, y) => {
  across.forEach((symbol, x) => {
    if (symbol > 0) {
      starBlocks.push(
        new Sprite({
          position: {
            x: x * 8,
            y: y * 8,
          },
          imageSrc: "Assets/StarCollectSheet.png",
          frameRate: 4,
          frameSpeed: 15,
        })
      );
    }
  });
});

const gravity = 0.3;

const player = new Player({
  position: {
    x: 100,
    y: 964,
  },
  collisionBlocks,
  starBlocks,
  imageSrc: "Assets/FoxIdleSheet.png",
  frameRate: 14,
  animations: {
    Idle: {
      imageSrc: "Assets/FoxIdleSheet.png",
      frameRate: 14,
      frameSpeed: 15,
    },
    IdleLeft: {
      imageSrc: "Assets/FoxIdleLeftSheet.png",
      frameRate: 14,
      frameSpeed: 10,
    },
    RunRight: {
      imageSrc: "Assets/FoxRunSheet.png",
      frameRate: 8,
      frameSpeed: 5,
    },
    RunLeft: {
      imageSrc: "Assets/FoxRunLeftSheet.png",
      frameRate: 8,
      frameSpeed: 5,
    },
    Jump: {
      imageSrc: "Assets/FoxJumpStartSheet.png",
      frameRate: 2,
      frameSpeed: 20,
    },
    JumpLeft: {
      imageSrc: "Assets/FoxJumpLeftStartSheet.png",
      frameRate: 2,
      frameSpeed: 20,
    },
    Land: {
      imageSrc: "Assets/FoxJumpEndSheet.png",
      frameRate: 3,
      frameSpeed: 15,
    },
    LandLeft: {
      imageSrc: "Assets/FoxJumpLeftEndSheet.png",
      frameRate: 3,
      frameSpeed: 15,
    },
  },
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

let score = 1;

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "Assets/Background.png",
});

const backgroundImageHeight = 1024;

const camera = {
  position: {
    x: 0,
    y: -backgroundImageHeight + scaledCanvas.height,
  },
};

let animationID;
function animate() {
  animationId = window.requestAnimationFrame(animate);
  //   c.fillStyle = "white";
  //   c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(2, 2);
  c.translate(camera.position.x, camera.position.y);
  background.update();
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.update();
  });

  starBlocks.forEach((starBlock) => {
    starBlock.update();
  });

  player.horizontalCanvasCollision();
  player.update();

  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.spriteSwitch("RunRight");
    player.velocity.x = 3;
    player.lastDirection = "right";
    player.cameraPanLeft({ canvas, camera });
  } else if (keys.a.pressed) {
    player.spriteSwitch("RunLeft");
    player.velocity.x = -3;
    player.lastDirection = "left";
    player.cameraPanRight({ canvas, camera });
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === "right") player.spriteSwitch("Idle");
    else player.spriteSwitch("IdleLeft");
  }

  if (player.velocity.y < 0) {
    player.cameraPanDown({ canvas, camera });
    if (player.lastDirection === "right") player.spriteSwitch("Jump");
    else player.spriteSwitch("JumpLeft");
  } else if (player.velocity.y > 0) {
    player.cameraPanUp({ canvas, camera });
    if (player.lastDirection === "right") player.spriteSwitch("Land");
    else player.spriteSwitch("LandLeft");
  }

  c.restore();

  if (score === 9) {
    winText.style.display = "flex";
    starText.style.display = "none";
  } else {
    winText.style.display = "none";
    starText.style.display = "flex";
  }
}

animate();

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = true;
      break;
    case "a":
      keys.a.pressed = true;
      break;
    case "w":
      player.velocity.y = -10;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      keys.d.pressed = false;
      break;
    case "a":
      keys.a.pressed = false;
      break;
  }
});
