const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 576;
canvas.height = 1024;

const scaledCanvas = {
  width: canvas.width / 1.5,
  height: canvas.height / 1.5,
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

const platCollisions2D = [];
for (let i = 0; i < platCollisions.length; i += 72) {
  platCollisions2D.push(platCollisions.slice(i, i + 72));
}

const platCollisionBlocks = [];
platCollisions2D.forEach((across, y) => {
  across.forEach((symbol, x) => {
    if (symbol > 0) {
      platCollisionBlocks.push(
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


const gravity = 0.3;

const player = new Player({
 position: {
    x: 100,
  y: 964,
},
  collisionBlocks,
  platCollisionBlocks,
  imageSrc:'Assets/FoxIdleSheet.png',
  frameRate: 14,
  animations: {
    Idle: {
      imageSrc:'Assets/FoxIdleSheet.png',
      frameRate: 14,
      frameSpeed: 10
    },
    IdleLeft: {
      imageSrc:'Assets/FoxIdleLeftSheet.png',
      frameRate: 14,
      frameSpeed: 10
    },
    RunRight: {
      imageSrc:'Assets/FoxRunSheet.png',
      frameRate: 8,
      frameSpeed: 5
    },
    RunLeft: {
      imageSrc:'Assets/FoxRunLeftSheet.png',
      frameRate: 8,
      frameSpeed: 5
    },
    Jump: {
      imageSrc:'Assets/FoxJumpStartSheet.png',
      frameRate: 2,
      frameSpeed: 20
    },
    JumpLeft: {
      imageSrc:'Assets/FoxJumpLeftStartSheet.png',
      frameRate: 2,
      frameSpeed: 20
    },
    Land: {
      imageSrc:'Assets/FoxJumpEndSheet.png',
      frameRate: 3,
      frameSpeed: 15
    },
    LandLeft: {
      imageSrc:'Assets/FoxJumpLeftEndSheet.png',
      frameRate: 3,
      frameSpeed: 15
    },
  }
});

const keys = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
};

const background = new Sprite({
  position: {
    x: 0,
    y: 0,
  },
  imageSrc: "Assets/Background.png",
});

function animate() {
  window.requestAnimationFrame(animate);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);

  c.save();
  c.scale(1.5, 1.5);
  c.translate(0, -background.image.height + scaledCanvas.height);
  background.update();
  collisionBlocks.forEach(collisionBlock =>{
    collisionBlock.update()
  })
  platCollisionBlocks.forEach(block =>{
    block.update()
  })
  c.restore();

  

  player.update();
  player.velocity.x = 0;
  if (keys.d.pressed) {
    player.spriteSwitch('RunRight')
    player.velocity.x = 3
    player.lastDirection = 'right'
  } else if (keys.a.pressed) {
    player.spriteSwitch('RunLeft')
    player.velocity.x = -3
    player.lastDirection = 'left'
  } else if (player.velocity.y === 0) {
    if (player.lastDirection === 'right') player.spriteSwitch('Idle')
    else player.spriteSwitch('IdleLeft')
    
  }

  if (player.velocity.y < 0) {
    if (player.lastDirection === 'right') player.spriteSwitch('Jump')
    else player.spriteSwitch('JumpLeft')
  } else if (player.velocity.y > 0) {
    if (player.lastDirection === 'right') player.spriteSwitch('Land')
    else player.spriteSwitch('LandLeft')
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
      player.velocity.y = -12;
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
