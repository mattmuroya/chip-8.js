import Renderer from './renderer.js';

const renderer = new Renderer(10);

let fps = 60;
let frameTime;
let t0;
let t1;
let elapsed;

function init() {
  // Calculate frame time in ms:
  // 1000ms per 60 frames = 16.66ms per frame
  frameTime = 1000 / fps;
  t0 = Date.now();

  // Initial call to step()
  requestAnimationFrame(step);
}

function step() {
  t1 = Date.now();

  if (t1 - t0 >= frameTime) {
    // Cycle CPU
    t0 = t1;
  }

  // Request to call step() before next browser rendering loop (non-recursive)
  // Frequency matches display refresh rate, so browser might refresh more often
  // than CPU emulator needs to be cycled
  requestAnimationFrame(step);
}

init();
