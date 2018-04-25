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
  down: false,
  left: false,
  right: false,
};

let spaceship;

//////////////////////////////////////////////////

const run = () => {
  setup();
  loop();
};

const setup = () => {
  window.addEventListener('keydown', (event) => {
    switch (event.key) {
      case 'ArrowUp':
        keys.up = true;
        break;
      case 'ArrowDown':
        keys.down = true;
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
      case 'ArrowDown':
        keys.down = false;
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
  spaceship = paper.ellipse(halfWidth, halfHeight, 12, 16);

  spaceship.xpos = halfWidth;
  spaceship.ypos = halfHeight;
  spaceship.xrate = 0;
  spaceship.yrate = 0;
  spaceship.rotation = 0;

  spaceship.attr({
    "fill": "90-#ddf:0-#09f:100",
    // "fill-opacity": 0,
    "stroke-width": 0,
  });
};

const loop = () => {
  // Set rotate_amount
  let rotate_amount = 0;
  if (keys.right) {
    rotate_amount = 3;
  } else if (keys.left) {
    rotate_amount = -3;
  }
  spaceship.rotation += rotate_amount + 360
  spaceship.rotation %= 360;

  // Rotate spaceship
  spaceship.rotate(rotate_amount);

  // Set velocity
  if (keys.up) {
    spaceship.yrate -= 0.2;
  } else if (keys.down) {
    spaceship.yrate += 0.15;
  } else {
    spaceship.yrate += 0.03;
  }
  if (spaceship.yrate > 0) {
    spaceship.yrate = 0;
  } else if (spaceship.yrate < -10) {
    spaceship.yrate = -10;
  }

  // Move spaceship
  spaceship.xpos += spaceship.xrate;
  spaceship.ypos += spaceship.yrate;
  spaceship.attr({
    cx: spaceship.xpos,
    cy: spaceship.ypos,
  });

  // Wrap spaceship if it goes out of screen
  wrap(spaceship);

  //////////

  setTimeout(loop, 10);
};

const wrap = (obj) => {
  const bbox = obj.getBBox();
  const objWidth = bbox.x2 - bbox.x;
  const objHeight = bbox.y2 - bbox.y;

  // left and right edges
  if (bbox.x2 < 0) {
    obj.translate(0, objWidth);
  } else if (bbox.x > pWidth) {
    obj.translate(0, objWidth);
  }

  // top and bottom edges
  if (bbox.y2 < 0) {
    obj.translate(0, objHeight);
  } else if (bbox.y > pHeight) {
    obj.translate(0, objHeight);
  }
};
