const run = () => {
  setup();
};

const setup = () => {
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
