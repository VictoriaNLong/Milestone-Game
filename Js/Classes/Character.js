class Player {
    constructor(position) {
      this.position = position;
      this.velocity = {
        x: 0,
        y: 0.5,
      };
      this.height = 30;
    }
  
    draw() {
      c.fillStyle = "red";
      c.fillRect(this.position.x, this.position.y, 30, this.height);
    }
  
    update() {
      this.draw();
      this.position.x += this.velocity.x;
      this.position.y += this.velocity.y;
      if (this.position.y + this.height + this.velocity.y < canvas.height)
        this.velocity.y += gravity;
      else this.velocity.y = 0;
    }
  }