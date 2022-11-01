class LaserShot extends Entity {
  static instances = [];

  constructor(imgPath, width, height, speed, alien) {
    let left =
      alien.getLeft() + alien.getWidth() / 2 - Manager.laserShotData.width / 2;
    let bottom = alien.getBottom() + alien.getHeight() / 2;
    super(imgPath, width, height, left, bottom);

    this.img.style.zIndex = "-10";
    this.speed = speed;
    this.animation = requestAnimationFrame(() => this.move());

    LaserShot.instances.push(this);
  }

  move() {
    if (this.bottom + this.height > 0) {
      this.bottom = this.bottom - this.speed;
      this.checkCollision(ship);
      this.animation = requestAnimationFrame(() => this.move());
    } else {
      cancelAnimationFrame(this.animation);
      this.img.remove();
    }
  }

  pause() {
    cancelAnimationFrame(this.animation);
  }

  resume() {
    this.animation = requestAnimationFrame(() => this.move());
  }

  checkCollision(other) {
    if (
      this.bottom <= other.bottom + other.height &&
      this.bottom + this.height > other.bottom + other.height
    ) {
      if (
        (this.left >= other.left && this.left <= other.left + other.width) ||
        (this.left + this.width >= other.left &&
          this.left + this.width <= other.left + other.width)
      ) {
        other.die();
        this.die();
      }
    }
  }

  die() {
    this.img.remove();
    cancelAnimationFrame(this.animation);
  }
}
