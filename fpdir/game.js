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

const bullets = new Set();
const bulletRadius = 2;
const bulletSpeed = 7;

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

  window.addEventListener('keypress', (event) => {
    if (event.key === 'f') {
      fireBullet();
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
  const index = asteroids.indexOf(asteroid);
  if (index < 0) {
    return;
  }

  // Create smaller asteroids
  const center = getCenter(asteroid);
  if (asteroid.size === 'large') {
    repeat(2, () => createAsteroid('medium', center.x, center.y));
  } else if (asteroid.size === 'medium') {
    repeat(2, () => createAsteroid('small', center.x, center.y));
  }

  // Remove from array
  asteroids.splice(index, 1);

  // Remove from paper
  asteroid.remove();

  // TODO: add animation and sound for destruction
};

const fireBullet = () => {
  const spaceshipCenter = getCenter(spaceship);
  const bullet = paper.circle(spaceshipCenter.x, spaceshipCenter.y, bulletRadius);

  // Determine bullet xrate and yrate based on spaceship rotation
  const rotationRad = Raphael.rad(spaceship.rotation);
  bullet.xrate = Math.sin(rotationRad) * bulletSpeed;
  bullet.yrate = -Math.cos(rotationRad) * bulletSpeed;

  bullet.attr({
    "fill": "#09f",
    "stroke-width": 0,
  });

  bullets.add(bullet);

  // TODO: add sound for firing

  setTimeout(() => expireBullet(bullet), 1200);
};

const expireBullet = (bullet) => {
  if (!bullets.has(bullet)) {
    return;
  }

  // Remove from set
  bullets.delete(bullet);

  // Remove from paper
  bullet.remove();
};

//////////////////////////////////////////////////

const loop = () => {
  if (!spaceship.removed) {
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
  }

  //////////

  // Handle asteroids
  asteroids.forEach((asteroid) => {
    asteroid.translate(asteroid.xrate, asteroid.yrate);
    wrap(asteroid);

    // Check collision with spaceship
    const asteroidRadius = asteroidStats[asteroid.size].radius;
    if (!spaceship.removed && checkCollision(spaceship, spaceshipLength, asteroid, asteroidRadius)) {
      spaceship.remove();
      destroyAsteroid(asteroid);

      // TODO: display game over message
    }
  });

  //////////

  // Handle bullets
  bullets.forEach((bullet) => {
    bullet.translate(bullet.xrate, bullet.yrate);
    wrap(bullet);

    // Check collision with asteroids
    for (let i = 0; i < asteroids.length; i++) {
      const asteroid = asteroids[i];
      const asteroidRadius = asteroidStats[asteroid.size].radius;
      if (checkCollision(bullet, bulletRadius, asteroid, asteroidRadius)) {
        expireBullet(bullet);
        destroyAsteroid(asteroid);
        break;
      }
    };
  });

  //////////

  // TODO: extract this into variable, proportionate to all movement rates
  setTimeout(loop, 10);
};

//////////////////////////////////////////////////

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
