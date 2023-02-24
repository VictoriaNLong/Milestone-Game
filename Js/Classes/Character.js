class Player extends Sprite {
  constructor({ position, collisionBlocks, imageSrc, frameRate, scale = 1, animations }) {
    super({imageSrc, frameRate, scale})
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    };
    
    this.collisionBlocks = collisionBlocks
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    }
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

    c.fillStyle = 'rgba(255, 0, 0, 0.2)'
    c.fillRect(
      this.hitbox.position.x,
      this.hitbox.position.y,
      this.hitbox.width,
      this.hitbox.height
    )

    this.draw();
    this.position.x += this.velocity.x;   
    this.updateHitbox() 
    this.checkForHorizontalCollisions()
    this.applyGravity();
    this.checkForVerticalCollisions();
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x + 8,
        y: this.position.y + 6,
      },
      width: 21,
      height: 20,
    }
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
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0
          this.position.y = collisionBlock.position.y + collisionBlock.height + 0.01
          break
        }
      }
    }
    
  }
}
