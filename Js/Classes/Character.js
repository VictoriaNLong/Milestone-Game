class Player extends Sprite {
  constructor({ position, collisionBlocks, platCollisionBlocks, imageSrc, frameRate, scale = 1.5, animations }) {
    super({imageSrc, frameRate, scale})
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    };
    
    this.collisionBlocks = collisionBlocks
    this.platCollisionBlocks = platCollisionBlocks
    this.animations = animations
    this.lastDirection = 'right'

    for (let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc

      this.animations[key].image = image
    }
  }

  spriteSwitch(key) {
    if (this.image === this.animations[key].image || !this.loaded) return
    this.currentFrame = 0
    this.image = this.animations[key].image
    this.frameSpeed = this.animations[key].frameSpeed
    this.frameRate = this.animations[key].frameRate
  }

  update() {
    this.updateFrame()
    c.fillStyle = 'rgba(0, 255, 0, 0.2)'
    c.fillRect(this.position.x, this.position.y, this.width, this.height)

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
    for (let i = 0; i < this.platCollisionBlocks.length; i++) {
      const platCollisionBlock = this.platCollisionBlocks[i];

      if (
        collision({
          object1: this,
          object2: platCollisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0
          this.position.y = platCollisionBlock.position.y - this.height - 0.01
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = platCollisionBlock.position.y + platCollisionBlock.height + 0.01
        }
      }
    }
  }
}
