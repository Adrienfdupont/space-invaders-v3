class Missile extends Entity {
  static instances = [];

  constructor(imgPath, width, height, speed) {
    let left = ship.left + ship.width / 2 - Manager.missileData.width / 2;
    let bottom = ship.bottom + ship.height / 2;
    super(imgPath, width, height, left, bottom);

    this.img.style.zIndex = "-10";
    this.speed = speed;
    this.animation = requestAnimationFrame(() => this.move());
    Missile.instances.push(this);
  }

  move() {
    if (this.bottom < window.innerHeight) {
      this.setBottom(this.bottom + this.speed);
      this.checkCollision();
      this.animation = requestAnimationFrame(() => this.move());
    } else {
      cancelAnimationFrame(this.animation);
      this.img.remove();
    }
  }

  checkCollision() {
    Alien.instances.forEach((alien) => {
      if (
        this.bottom + this.height >= alien.bottom &&
        this.bottom < alien.bottom
      ) {
        if (
          (this.left >= alien.left && this.left <= alien.left + alien.width) ||
          (this.left + this.width >= alien.left &&
            this.left + this.width <= alien.left + alien.width)
        ) {
          this.die();
          alien.die();
        }
      }
    });
  }

  pause() {
    cancelAnimationFrame(this.animation);
  }

  resume() {
    this.animation = this.move();
  }

  die() {
    cancelAnimationFrame(this.animation);
    this.img.remove();
    Missile.instances.splice(Missile.instances.indexOf(this), 1);
  }
}
