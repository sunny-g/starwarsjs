"use strict";

class Bitmap {
  constructor(src, width, height) {
    this.image = new Image();
    this.image.src = src;
    this.width = width;
    this.height = height;
  }
}

class Map {
  constructor(size, light) {
    this.size = size;
    this.area = size * size;
    this.wallGrid = new Uint8Array(this.area);
    this.light = light || 0;

    this.sky = new Bitmap('assets/sky/desert.jpg', 768, 256);
    this.wallTexture = new Bitmap('assets/textures/wall_texture1_257x257.jpg', 257, 257);
  }

  // returns a ray
  cast(player, angle, range) {
    var self = this;
    var sin = config.sin(angle);
    var cos = config.cos(angle);
    var noWall = { length2: Infinity };
    
    return ray({
      x: player.x, y: player.y,
      height: 0, distance: 0
    });

    /*************** helpers ***************/
    /*
      recursively generates a ray
     */
    function ray(origin) {
      var stepX = step(sin, cos, origin.x, origin.y);
      var stepY = step(cos, sin, origin.y, origin.x, true);
      // if 
      var nextStep = stepX.length2 < stepY.length2
        ? inspect(stepX, 1, 0, origin.distance, stepX.y)
        : inspect(stepY, 0, 1, origin.distance, stepY.x);
      if (nextStep.distance > range) return [origin];
      return [origin].concat(ray(nextStep));
    }

    // TODO: annotate every line of this
    function step(rise, run, x, y, inverted) {
      if (run === 0) return noWall;
      var dx = run > 0 ? Math.floor(x + 1) - x : Math.ceil(x - 1) - x;
      var dy = dx * (rise / run);
      return {
        x: inverted ? y + dy : x + dx,
        y: inverted ? x + dx : y + dy,
        length2: dx * dx + dy * dy
      };
    }

    // TODO: annotate every line of this
    function inspect(step, shiftX, shiftY, distance, offset) {
      var dx = cos < 0 ? shiftX : 0;
      var dy = sin < 0 ? shiftY : 0;
      step.height = self.get(step.x - dx, step.y - dy);
      step.distance = distance + Math.sqrt(step.length2);
      if (shiftX) step.shading = cos < 0 ? 2 : 0;
      else step.shading = sin < 0 ? 2 : 1;
      step.offset = offset - Math.floor(offset);
      return step;
    }
  }

  /**
   * Returns ???
   */
  get(x, y) {
    x = Math.floor(x);
    y = Math.floor(y);
    if (x < 0 || x > this.size - 1 || y < 0 || y > this.size - 1) return -1;
    return this.wallGrid[y * this.size + x];
  }

  update(seconds) {
    if (this.light > 0) {
      this.light = Math.max(this.light - 10 * seconds, 0);
    } else if (Math.random() * 5 < seconds) {
      this.light = 2;
    }
  }

  _randomize() {
    for (var i = 0; i < this.area; i++) {
      this.wallGrid[i] = Math.random() < 0.3 ? 1 : 0;
    }
  }

}
