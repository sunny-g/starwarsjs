"use strict";

var meter = new FPSMeter(config.CANVAS, {
  interval:  100,     // Update interval in milliseconds.
  // smoothing: 10,      // Spike smoothing strength. 1 means no smoothing.
  show:      'fps',   // Whether to show 'fps', or 'ms' = frame duration in milliseconds.
  toggleOn:  'click', // Toggle between show 'fps' and 'ms' on this event.
  decimals:  1,       // Number of decimals in FPS number. 1 = 59.9, 2 = 59.94, ...
  maxFps:    60,      // Max expected FPS value.

  position: 'absolute', // Meter position.
  zIndex:   10,         // Meter Z index.
  left:     '5px',      // Meter left offset.
  top:      '5px',      // Meter top offset.
  right:    'auto',     // Meter right offset.
  bottom:   'auto',     // Meter bottom offset.
  margin:   '0 0 0 0',  // Meter margin. Helps with centering the counter when left: 50%;

  // Theme
  theme: 'dark', // Meter theme. Build in: 'dark', 'light', 'transparent', 'colorful'.
    heat:  0,      // A
});

class GameLoop {
  constructor() {
    this.frame = this.frame.bind(this);
    this.lastTime = 0;
    this.callback = function() {};
  }


  start(callback) {
    this.callback = callback;
    this.frame();
  }

  frame(time) {
    time = time || Date.now();
    meter.tickStart();

    var seconds = (time - this.lastTime) / 1000;
    this.lastTime = time;
    if (seconds < 0.2) this.callback(seconds);

    meter.tick();

    requestAnimationFrame(this.frame);
  }
}

// function sxs3dcnv_main() {  // for attaching events or loading assets before starting
//   renderFrame(); //everything in this function will loop
// }

// function renderFrame(){
//   loop.frame

// }
