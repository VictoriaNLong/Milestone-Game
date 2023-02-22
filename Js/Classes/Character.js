class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc }) {
    super({imageSrc})
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    };
    
    this.width = 30;
    this.height = 30;
    this.collisionBlocks = collisionBlocks
  }

  update() {
    this.draw();
    this.position.x += this.velocity.x;    
    this.checkForHorizontalCollisions()
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0
          this.position.x = collisionBlock.position.y - this.width - 0.01
          break
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0
          this.position.x = collisionBlock.position.y + collisionBlock.width + 0.01
          break
        }
      }
    }
  }

  applyGravity() {
    this.velocity.y += gravity;
   this.position.y += this.velocity.y;
    
  }

  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y - this.height - 0.01
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
        }
      }
    }
  }
}
