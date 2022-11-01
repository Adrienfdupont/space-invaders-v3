class Alien extends Entity {
  static instances = [];

  constructor(imgPath, width, height, left, bottom, speed, reloadTime) {
    super(imgPath, width, height, left, bottom);

    this.speed = speed;
    this.reloadTime = reloadTime;
    Alien.instances.push(this);
  }

  initAction() {
    this.animation = requestAnimationFrame(() => this.moveRight());
    this.shot = setInterval(() => {
      this.shoot();
    }, Math.floor(Math.random() * (this.reloadTime + this.reloadTime / 2 - this.reloadTime / 2) + this.reloadTime / 2));
  }

  moveRight() {
    if (this.bottom + this.height > 0) {
      if (this.right > 0) {
        this.left = this.left + this.speed;
        this.animation = requestAnimationFrame(() => this.moveRight());
        this.previousAnimation = this.moveRight;
      } else {
        cancelAnimationFrame(this.animation);
        this.bottom = this.bottom - this.height * 2;
        this.animation = requestAnimationFrame(() => this.moveLeft());
      }
    } else {
      this.clear();
    }
  }

  moveLeft() {
    if (this.bottom + this.height > 0) {
      if (this.left > 0) {
        this.left = this.left - this.speed;
        this.animation = requestAnimationFrame(() => this.moveLeft());
        this.previousAnimation = this.moveLeft;
      } else {
        cancelAnimationFrame(this.animation);
        this.bottom = this.bottom - this.height * 2;
        this.animation = requestAnimationFrame(() => this.moveRight());
      }
    } else {
      this.clear();
    }
  }

  shoot() {
    new LaserShot(
      Manager.laserShotData.img,
      Manager.laserShotData.width,
      Manager.laserShotData.height,
      Manager.laserShotData.speed,
      this
    );
  }

  die() {
    this.clear();
    Manager.upgradeScore();
    Manager.checkVictory();
  }

  clear() {
    this.img.remove();
    Alien.instances.splice(Alien.instances.indexOf(this), 1);
    cancelAnimationFrame(this.animation);
    clearInterval(this.shot);
  }
}
