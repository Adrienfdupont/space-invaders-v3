class Entity {
  constructor(imgPath, width, height, left, bottom) {
    // création de l'élément du DOM
    this.img = document.createElement("img");
    this.img.src = imgPath;
    this.img.style.width = width + "px";
    this.img.style.height = height + "px";
    document.body.appendChild(this.img);

    // positionnement de l'élément
    this.img.style.position = "absolute";
    this.left = left;
    this.bottom = bottom;
  }

  hide() {
    this.img.style.display = "none";
  }

  display() {
    this.img.style.display = "block";
  }

  set left(int) {
    this.img.style.left = int + "px";
  }

  set bottom(int) {
    this.img.style.bottom = int + "px";
  }

  get width() {
    let width = window.getComputedStyle(this.img, null).width;
    return parseInt(width.substring(0, width.length - 2));
  }

  get height() {
    let height = window.getComputedStyle(this.img, null).height;
    return parseInt(height.substring(0, height.length - 2));
  }

  get left() {
    let left = window.getComputedStyle(this.img, null).left;
    return parseInt(left.substring(0, left.length - 2));
  }

  get bottom() {
    let bottom = window.getComputedStyle(this.img, null).bottom;
    return parseInt(bottom.substring(0, bottom.length - 2));
  }

  get top() {
    let top = window.getComputedStyle(this.img, null).top;
    return parseInt(top.substring(0, top.length - 2));
  }

  get right() {
    let right = window.getComputedStyle(this.img, null).right;
    return parseInt(right.substring(0, right.length - 2));
  }
}
