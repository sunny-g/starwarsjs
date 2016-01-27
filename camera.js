"use strict";

// TODO: annotate all of this
/**
 * Camera
 * @class Camera
 * @param {DOM Element}
 * @param {Integer}
 * @param {Number}
 */
class Camera {
  constructor(canvas, resolution, focalLength) {
    this.ctx = canvas.getContext('2d');
    // TODO: annotate all of this too
    this.width = canvas.width = window.innerWidth * 0.5;
    this.height = canvas.height = window.innerHeight * 0.5;
    
    // what are all these properties???
    
    // number of columns to render
    this.resolution = config.resolution || resolution;
    // width of each column
    this.spacing = this.width / this.resolution;
    // 
    this.focalLength = focalLength;
    // ?? distance to render ??
    this.range = config.MOBILE ? 8 : 14;
    // 
    this.lightRange = 5;
    // 
    this.scale = (this.width + this.height) / 1200;
  }

  render(player, map) {
    this.drawSky(player.direction, map.sky, map.light);
    this.drawColumns(player, map);
    // this.drawWeapon();
  }

  // TODO: annotate this
  drawSky(direction, sky, ambientLight) {
    var width = sky.width * (this.height / sky.height) * 2;
    var left = (direction / config.TAU) * -width;
    this.ctx.save();
    this.ctx.drawImage(sky.image, left, 0, width, this.height);
    
    if (left < width - this.width) {
      this.ctx.drawImage(sky.image, left + width, 0, width, this.height);
    }

    if (ambientLight > 0) {
      this.ctx.fillStyle = '#ffffff';
      this.ctx.globalAlpha = ambientLight * 0.1;
      this.ctx.fillRect(0, this.height * 0.5, this.width, this.height * 0.5);
    }
    this.ctx.restore();
  }

  // TODO: annotate this
  project(height, angle, distance) {
    var z = distance * Math.cos(angle);
    var wallHeight = this.height * height / z;
    var bottom = this.height / 2 * (1 + 1 / z);
    return {
      top: bottom - wallHeight,
      height: wallHeight
    }; 
  }

  // TODO: annotate this
  drawColumns(player, map) {
    /*
      for each column
        ?? what is x?
        get angle of ray w/in FOV
        create the ray from map.cast()
        draw the column
     */
    this.ctx.save();
    for (var column = 0; column < this.resolution; column++) {
      var x = column / this.resolution - 0.5;
      var angle = config.arctan2(x, this.focalLength);
      var ray = map.cast(player, player.direction + angle, this.range);
      this.drawColumn(column, ray, angle, map);
    }
    this.ctx.restore();
  }

  // TODO: annotate this
  drawColumn(column, ray, angle, map) {
    var texture = map.wallTexture;
    
    // grab left-most ?? pixel ?? of the column
    // width is column width rounded up
    var left = Math.floor(column * this.spacing);
    var width = Math.ceil(this.spacing);
    var hit = -1;
    
    // 
    while (++hit < ray.length && ray[hit].height <= 0);

    // for each `step` in `ray`
    for (var s = ray.length - 1; s >= 0; s--) {
      var step = ray[s];
      if (s === hit) {
        var textureX = Math.floor(texture.width * step.offset);
        var wall = this.project(step.height, angle, step.distance);

        this.ctx.globalAlpha = 1;
        this.ctx.drawImage(texture.image, textureX, 0, 1, texture.height, left, wall.top, width, wall.height);
        this.ctx.fillStyle = '#000000';
        this.ctx.globalAlpha = Math.max((step.distance + step.shading) / this.lightRange - map.light, 0);
        this.ctx.fillRect(left, wall.top, width, wall.height);
      }
      
      this.ctx.fillStyle = '#ffffff';
      this.ctx.globalAlpha = 0.15;
    }
  }
}
