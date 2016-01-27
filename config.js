var config = {};

// App Constants
config.MOBILE = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
config['3DMODE'] = false;
config.CANVAS = document.getElementById('starwarsjs');
config.RESOLUTION = 320;
config.FOCALLENGTH = config['3DMODE'] ? 1.25 : 0.8;
// config.FOCALLENGTH = 0.65;

// Player Constants
config.ROTATERIGHT = Math.PI / 50;
config.ROTATELEFT = -config.ROTATERIGHT;
config.FORWARD_WALK = 3;
config.BACKWARD_WALK = -1.5;
config.SIDE_WALK = 1.5;

config.forwardWalk = _.memoize((seconds) => {
  return config.FORWARD_WALK * seconds;
});
config.backwardWalk = _.memoize((seconds) => {
  return config.BACKWARD_WALK * seconds;
});
config.sideWalk = _.memoize((seconds) => {
  return config.SIDE_WALK * seconds;
});

// Math Constants
config.TAU = Math.PI * 2;
config.sin = _.memoize((rad) => {
  return Math.sin(rad);
});
config.cos = _.memoize((rad) => {
  return Math.cos(rad);
});
config.arctan2 = _.memoize((x, y) => {
  return Math.atan2(x, y);
})