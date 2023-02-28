class Player extends Sprite {
  constructor({ position, collisionBlocks, starBlocks, imageSrc, frameRate, scale = 1, animations }) {
    super({imageSrc, frameRate, scale})
    this.position = position
    this.velocity = {
      x: 0,
      y: 1,
    };
    
    this.collisionBlocks = collisionBlocks
    this.starBlocks = starBlocks
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
    // c.fillStyle = 'rgba(0, 255, 0, 0.2)'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    // c.fillStyle = 'rgba(255, 0, 0, 0.2)'
    // c.fillRect(
    //   this.hitbox.position.x,
    //   this.hitbox.position.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // )

    this.draw();
    this.position.x += this.velocity.x;   
    this.updateHitbox() 
    this.checkForHorizontalCollisions()
    this.applyGravity();
    this.updateHitbox() 
    this.checkForVerticalCollisions();
    this.starCollect()
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
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.x > 0) {
          this.velocity.x = 0

          const offset =
          this.hitbox.position.x - this.position.x + this.hitbox.width

          this.position.x = collisionBlock.position.x - offset + 0.01
          break
        }

        if (this.velocity.x < 0) {
          this.velocity.x = 0

          const offset =
          this.hitbox.position.x - this.position.x

          this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
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
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.y > 0) {
          this.velocity.y = 0

          const offset =
            this.hitbox.position.y - this.position.y + this.hitbox.height

          this.position.y = collisionBlock.position.y - offset - 0.01
          break
        }

        if (this.velocity.y < 0) {
          this.velocity.y = 0

          const offset = this.hitbox.position.y - this.position.y

          this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
          break
        }
      }
    }
    
  }

  starCollect() {
    for (let i = 0; i < this.starBlocks.length; i++) {
      const starBlock = this.starBlocks[i];

      if ( 
      collision({
      object1: this.hitbox,
      object2: starBlock,
    })
      ) {
        starBlocks.splice(i, 1)
        collectedscore.innerHTML = score
        score++
        
  }
}
}
}