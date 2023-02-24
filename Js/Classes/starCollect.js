class StarSprite {
    constructor({ position, imageSrc, frameRate = 1, frameSpeed = 10, scale = 1}) {
        this.position = position;
        this.scale = scale
        this.loaded = false
        this.image = new Image();
        this.image.onload = () => {
          this.width = (this.image.width / this.frameRate) * this.scale
          this.height = (this.image.height) * this.scale
          this.loaded = true
        };
        this.image.src = imageSrc;
        this.frameRate = frameRate,
        this.currentFrame = 0
        this.frameSpeed = frameSpeed
        this.elapsedFrames = 0
      }

    draw() {
        if (!this.image) return

        const crop = {
            position: {
              x: this.currentFrame * (this.image.width / this.frameRate),
              y: 0,
            },
            width: this.image.width / this.frameRate,
            height: this.image.height,
          };

          c.drawImage(
            this.image,
            crop.position.x,
            crop.position.y,
            crop.width,
            crop.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height,
          );

        
    }

    update() {
        this.draw();
        this.updateFrame()
      }
      updateFrame() {
        this.elapsedFrames++
    
        if (this.elapsedFrames % this.frameSpeed === 0) {
        if (this.currentFrame < this.frameRate - 1) this.currentFrame++
      else this.currentFrame = 0
        }
    }
}