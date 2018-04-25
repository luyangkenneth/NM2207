---
layout: post
title:  "Weekly Progress Update #4: 22 April 2018"
date:   2018-04-22 20:06:41 +0800
---

Things are starting to shape up nicely! I have since implemented:
- Collision detection
- Screen wrapping for asteroids and bullets
- Bullet expiration

### Modularizing code: A case study with asteroids

_(In particular, creating and destroying asteroids.)_

This is something I'm quite proud of, so I wanted to talk about it. I don't expect the project grader(s) to examine all of our code, so I'm going to include the relevant snippets here for ease of discussion.

I housed my logic in separate functions so that it's easier to maintain and reason about my code. But before any of that, and before I call my main loop, I need a bunch of variables to store my state, as well as some values for later use:

```js
const asteroidStats = {
  large: {
    radius: 60,
    minSpeed: 0.4,
    maxSpeed: 0.8,
  },

  medium: {
    radius: 35,
    minSpeed: 0.8,
    maxSpeed: 1.2,
  },

  small: {
    radius: 15,
    minSpeed: 1.2,
    maxSpeed: 1.8,
  },
};
```

At this point, I want to define a `createAsteroid()` function so that I can create multiple asteroids easily. By storing all my asteroid stats in that one object, instead of writing separate functions like `createLargeAsteroid()`, I can simply call `createAsteroid('large')`.

```js
const createAsteroid = (size, x = halfWidth, y = halfHeight) => {
  const stats = asteroidStats[size];

  const asteroid = paper.circle(x, y, stats.radius);

  asteroid.xrate = randomFlip(randomFloat(stats.minSpeed, stats.maxSpeed));
  asteroid.yrate = randomFlip(randomFloat(stats.minSpeed, stats.maxSpeed));
  asteroid.size = size;

  ...
};
```

When I'm destroying an asteroid, I need to check whether to split it up into smaller asteroids. To do that, I've stored its `size` as with the above. Now I can do:

```js
const destroyAsteroid = (asteroid) => {
  ...

  // Create smaller asteroids
  const center = getCenter(asteroid);
  if (asteroid.size === 'large') {
    repeat(2, () => createAsteroid('medium', center.x, center.y));
  } else if (asteroid.size === 'medium') {
    repeat(2, () => createAsteroid('small', center.x, center.y));
  }

  // Remove from paper
  asteroid.remove();
};
```

Finally, I was lazy to write `for` loops every time I wanted to do something multiple times, so I wrote a neat little utility function called `repeat()`. I love how JavaScript supports functions as first-class objects. In doing so, I can wrap up some code in an anonymous function and pass it into `repeat()` to be executed multiple times.

```js
// Execute a function N times
const repeat = (N, func) => {
  for (let i = 0; i < N; i++) {
    func();
  }
};
```
