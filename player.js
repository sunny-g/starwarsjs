"use strict";

class Player {
  constructor(x, y, direction, height) {
    this.x = x;
    this.y = y;
    this.z = height;
    this.direction = direction;
  }

  update(controls, map, seconds) {
      // console.log('FPS:', 1 / seconds)
      if (controls.rotateLeft) this.rotate(-Math.PI * seconds);
      if (controls.rotateRight) this.rotate(Math.PI * seconds);
      
      if (controls.forward) this.walk(config.forwardWalk(seconds), map, this.direction);
      if (controls.backward) this.walk(config.backwardWalk(seconds), map, this.direction);
      if (controls.left) this.walk(config.sideWalk(seconds), map, this.direction - Math.PI / 2);
      if (controls.right) this.walk(config.sideWalk(-seconds), map, this.direction - Math.PI / 2);

      // if (controls.rotateLeft) this.rotate(config.ROTATELEFT);
      // if (controls.rotateRight) this.rotate(config.ROTATERIGHT);
      // if ()
      // if (controls.crouch) 
    }

  // TODO: annotate every line of this
  walk(distance, map, direction) {
    var dx = Math.cos(direction) * distance;
    var dy = Math.sin(direction) * distance;
    if (map.get(this.x + dx, this.y) <= 0) this.x += dx;
    if (map.get(this.x, this.y + dy) <= 0) this.y += dy;
    this.paces += distance;
  }

  // TODO: annotate every line of this
  rotate(angle) {
    // console.log('angle, direction:', angle, this.direction);
    this.direction = (this.direction + angle + config.TAU) % (config.TAU);
  }
}
