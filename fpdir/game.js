//////////////////////////////////////////////////

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

const spaceshipLength = 16;
const spaceshipWidth = 12;
let spaceship;

const asteroids = [];
const asteroidStats = {
  large: {
    radius: 60,
    minSpeed: 0.3,
    maxSpeed: 0.6,
  },

  medium: {
    radius: 40,
    minSpeed: 0.6,
    maxSpeed: 1.1,
  },

  small: {
    radius: 20,
    minSpeed: 0.9,
    maxSpeed: 1.5,
  },
};

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

  repeat(3, () => createAsteroid('large'));
};

const createSpaceship = () => {
  spaceship = paper.ellipse(40, pHeight - 40, spaceshipWidth, spaceshipLength);

  spaceship.xrate = 0;
  spaceship.yrate = 0;
  spaceship.rotation = 0;

  spaceship.attr({
    "fill": "90-#ddf:0-#09f:100",
    "stroke-width": 0,
  });
};

const createAsteroid = (size, x = halfWidth, y = halfHeight) => {
  const stats = asteroidStats[size];

  // TODO: don't spawn the large asteroids at center of paper at the beginning
  const asteroid = paper.circle(x, y, stats.radius);

  // TODO: randomize an angle, then split into xrate and yrate from there
  asteroid.xrate = randomFlip(randomFloat(stats.minSpeed, stats.maxSpeed));
  asteroid.yrate = randomFlip(randomFloat(stats.minSpeed, stats.maxSpeed));
  asteroid.size = size;

  asteroid.attr({
    "fill": "#ccc",
    "stroke": "#333",
    "stroke-width": 3,
  });

  asteroids.push(asteroid);

  // TODO: remove this
  asteroid.addEventListener('click', () => {
    destroyAsteroid(asteroid);
  });
};

const destroyAsteroid = (asteroid) => {
  const center = getCenter(asteroid);
  if (asteroid.size === 'large') {
    repeat(3, () => createAsteroid('medium', center.x, center.y));
  } else if (asteroid.size === 'medium') {
    repeat(3, () => createAsteroid('small', center.x, center.y));
  }

  const index = asteroids.indexOf(asteroid);
  asteroids.splice(index, 1);

  asteroid.remove();

  // TODO: add animation and sound for destruction
};

const loop = () => {
  // Rotate spaceship
  let rotateAmount = 0;
  if (keys.right) {
    rotateAmount = 3;
  } else if (keys.left) {
    rotateAmount = -3;
  }
  spaceship.rotation += rotateAmount + 360
  spaceship.rotation %= 360;
  spaceship.rotate(rotateAmount);

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
  spaceship.translate(spaceship.xrate, spaceship.yrate);

  // Wrap spaceship if it goes out of screen
  wrap(spaceship);

  //////////

  // Handle asteroids
  asteroids.forEach((asteroid) => {
    asteroid.translate(asteroid.xrate, asteroid.yrate);
    wrap(asteroid);

    // Check collision with spaceship
    if (checkCollision(spaceship, spaceshipLength, asteroid, asteroidStats[asteroid.size].radius)) {
      // TODO: spaceship should be destroyed
      destroyAsteroid(asteroid);
    }
  });

  //////////

  setTimeout(loop, 10);
};

const wrap = (obj) => {
  const bbox = obj.getBBox();
  const objWidth = bbox.x2 - bbox.x;
  const objHeight = bbox.y2 - bbox.y;
  let xTranslate = pWidth + objWidth;
  let yTranslate = pHeight + objHeight;

  if (obj.rotation === undefined) {
    // left and right edges
    if (bbox.x2 < 0) {
      obj.translate(xTranslate, 0);
    } else if (bbox.x > pWidth) {
      obj.translate(-xTranslate, 0);
    }

    // top and bottom edges
    if (bbox.y2 < 0) {
      obj.translate(0, yTranslate);
    } else if (bbox.y > pHeight) {
      obj.translate(0, -yTranslate);
    }

    return;
  }

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

const getCenter = (obj) => {
  const bbox = obj.getBBox();
  const objWidth = bbox.x2 - bbox.x;
  const objHeight = bbox.y2 - bbox.y;

  return {
    x: bbox.x + objWidth / 2,
    y: bbox.y + objHeight / 2,
  };
};

const checkCollision = (a, aRadius, b, bRadius) => {
  const aCenter = getCenter(a);
  const bCenter = getCenter(b);
  const distance = getDistance(aCenter.x, aCenter.y, bCenter.x, bCenter.y,);
  return distance <= aRadius + bRadius;
};
