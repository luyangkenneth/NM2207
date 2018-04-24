const header = document.getElementById('header');
const main = document.getElementById('main');

const paper = new Raphael(main);
const pWidth = paper.width;
const pHeight = paper.height;
const halfWidth = pWidth / 2;
const halfHeight = pHeight / 2;

const rect = paper.rect(0, 0, pWidth, pHeight);
rect.attr({
  "fill": "#000",
  "fill-opacity": 0,
  "stroke-width": 0,
});

const keys = {
  up: false,
  left: false,
  right: false,
};

let spaceship;

//////////////////////////////////////////////////

const run = () => {
  setup();
};

const setup = () => {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        keys.up = true;
        break;
      case 'ArrowLeft':
        keys.left = true;
        break;
      case 'ArrowRight':
        keys.right = true;
        break;
    }
  });

  window.addEventListener('keyup', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        keys.up = false;
        break;
      case 'ArrowLeft':
        keys.left = false;
        break;
      case 'ArrowRight':
        keys.right = false;
        break;
    }
  });

  createSpaceship();
};

const createSpaceship = () => {
  spaceship = paper.ellipse(halfWidth, halfHeight, 15, 20);

  spaceship.xpos = halfWidth;
  spaceship.ypos = halfHeight;
  spaceship.attr({
    "fill": "90-#fff:0-#00f:100",
    // "fill-opacity": 0,
    "stroke-width": 0,
  });
};
