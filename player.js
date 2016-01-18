"use strict";

class Player {
  constructor(x, y, direction, height) {
    this.x = x;
    this.y = y;
    this.z = height;
    this.direction = direction;
  }

  // TODO: annotate every line of this
  walk(distance, map) {
    var dx = Math.cos(this.direction) * distance;
    var dy = Math.sin(this.direction) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
    this.paces += distance;
  }

  // TODO: annotate every line of this
  rotate(angle) {
    this.direction = (this.direction + angle + CIRCLE) % (CIRCLE);
  }

  update(controls, map, seconds) {
    if (controls.left) this.rotate(-Math.PI * seconds);
    if (controls.right) this.rotate(Math.PI * seconds);
    if (controls.forward) this.walk(3 * seconds, map);
    if (controls.backward) this.walk(-3 * seconds, map);
    // if (controls.crouch) 
  }
}
