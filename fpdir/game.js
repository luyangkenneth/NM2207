const keys = {
  up: false,
  left: false,
  right: false,
};

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

  const header = document.getElementById('header');
  const main = document.getElementById('main');

  const paper = new Raphael(main);
  const pWidth = paper.width;
  const pHeight = paper.height;

  const rect = paper.rect(0, 0, pWidth, pHeight);
  rect.attr({
    "fill": "#000",
    "fill-opacity": 0,
    "stroke-width": 0,
  });
};
