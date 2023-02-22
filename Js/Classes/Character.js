class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 1.5, animations }) {
    super({imageSrc, frameRate, scale})
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    };
    
    this.collisionBlocks = collisionBlocks
    this.animations = animations
    this.lastDirection = 'right'

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }
  }

  spriteSwitch(key) {
    if (this.image === this.animations[key] || !this.loaded) return
    this.image = this.animations[key].image
    this.frameSpeed = this.animations[key].frameSpeed
    this.frameRate = this.animations[key].frameRate
  }

  update() {
    this.updateFrame()
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
