const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 576;
canvas.height = 1024;

const gravity = .5

class Player {
  constructor(position) {
    this.position = position
    this.veloccity = {
       x: 0,
       y: 1,
    }
  }

  draw() {
    c.fillStyle = "red";
    c.fillRect(this.position.x, this.position.y, 30, 30);
  }

  update() {
    this.draw()
    this.position.y += this.veloccity.y
    this.veloccity.y += gravity

  }
}

const player = new Player({
x: 0,
y: 0,

})

function movement() {
  window.requestAnimationFrame(movement);
  c.fillStyle = "white";
  c.fillRect(0, 0, canvas.width, canvas.height);
  player.update()
}

movement();
