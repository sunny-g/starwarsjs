"use strict";


class Controls {
  constructor(player, codes) {
    this.player = player;
    this.codes  = codes || { 
      37: 'rotateLeft', 39: 'rotateRight', 
      38: 'forward', 40: 'backward', 87: 'forward', 83: 'backward',
      // 65: 'left', 68: 'right', 
      65: 'rotateLeft', 68: 'rotateRight',
      16: 'crouch', 32: 'jump'
    };

    this.states = { 
      'rotateLeft': false, 'rotateRight': false,
      'forward': false, 'backward': false,
      'left': false, 'right': false, 
      'crouch': false, 'jump': false
    };

    this.canvas = config.CANVAS;
    this.canvas.requestPointerLock = this.canvas.requestPointerLock ||
      this.canvas.mozRequestPointerLock ||
      this.canvas.webkitRequestPointerLock;

    this.canvas.onclick = () => {
      this.canvas.requestPointerLock();
    }

    if ("onpointerlockchange" in document) {
      document.addEventListener('pointerlockchange', this.onPointerLockChange.bind(this), false);
    } else if ("onmozpointerlockchange" in document) {
      document.addEventListener('mozpointerlockchange', this.onPointerLockChange.bind(this), false);
    } else if ("onwebkitpointerlockchange" in document) {
      document.addEventListener('webkitpointerlockchange', this.onPointerLockChange.bind(this), false);
    }

    document.addEventListener('keydown', this.onKey.bind(this, true), false);
    document.addEventListener('keyup', this.onKey.bind(this, false), false);
  }

/*
  onTouch(e) {
    var t = e.touches[0];
    this.onTouchEnd(e);
    if (t.pageY < window.innerHeight * 0.5) this.onKey(true, { keyCode: 38 });
    else if (t.pageX < window.innerWidth * 0.5) this.onKey(true, { keyCode: 37 });
    else if (t.pageY > window.innerWidth * 0.5) this.onKey(true, { keyCode: 39 });
  }

  onTouchEnd(e) {
    this.states = { 
      'rotateLeft': false, 'rotateRight': false,
      'forward': false, 'backward': false,
      'left': false, 'right': false, 
      'crouch': false, 'jump': false
    };
    e.preventDefault();
    e.stopPropagation();
  }
*/
  
  onKey(val, e) {
    var state = this.codes[e.keyCode];
    if (typeof state === 'undefined') return;
    this.states[state] = val;
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }

  onMouseMovement(e) {
    var x = (e.movementX || e.mozMovementX || e.webkitMovementX || 0);

    // player.rotate(x * Math.PI / 200);
    
    // rotateRight
    if (x > 0) this.player.rotate(config.ROTATERIGHT);
    // rotateLeft
    if (x < 0) this.player.rotate(config.ROTATELEFT);

    // if (x > 0) player.rotate(x * Math.PI / 40);
    // if (x < 0) player.rotate(x * Math.PI / 40);

    // if (x > 0) {
    //   this.states.rotateLeft = true;
    // } else if (x < 0) {
    //   this.states.rotateRight = true;
    // } else {
    //   this.states = { 
    //     'rotateLeft': false, 'rotateRight': false,
    //     'forward': false, 'backward': false,
    //     'left': false, 'right': false, 
    //     'crouch': false
    //   };
    // }
    e.preventDefault && e.preventDefault();
    e.stopPropagation && e.stopPropagation();
  }

  onPointerLockChange() {
    console.log('in onPointerLockChange')
    if (document.pointerLockElement === this.canvas ||
      document.mozPointerLockElement === this.canvas ||
      document.webkitPointerLockElement === this.canvas) {
      console.log('The pointer lock status is now locked');
      
      // Do something useful in response
      document.addEventListener('mousemove', this.onMouseMovement.bind(this), false);
    } else {
      console.log('The pointer lock status is now unlocked');      
      // Do something useful in response
    }
  }
}
