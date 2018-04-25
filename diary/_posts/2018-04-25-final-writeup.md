---
layout: post
title:  "Final Writeup"
date:   2018-04-25 23:52:41 +0800
---
Oftentimes when writing code, there needs to be a fine balance between polish and time. As I have always preferred clean and well-modularized code, deciding when something is "good enough" and withholding my perfectionism has been something for me to learn over the years. Just yesterday I had an exam for another module, so I didn't have much time left for NM2207, and I had to make those choices quickly in order to make the final project deadline.

As I've covered most of my approach and the technical challenges in my previous updates, I guess it would be good to have this post fill in the gaps and serve as a nice wrap up for the project :)

## 🚀 Asteroids Remake: How to play 🚀

Destroy all the asteroids to win, but watch out for incoming ones!

- Thrust: `Up`
- Brake: `Down`
- Turn: `Left` / `Right`
- Fire: `F`

### Declaration

All code was written by myself in ES6 from scratch, with no remixing. The only snippets of code I adapted were past assignments on creating and mutating `Raphael` elements. I also referred to the online `Raphael.js` reference, and the Mozilla JavaScript API, which I find more comprehensive than w3schools.

Since I mentioned ES6, I might as well talk about one of its benefits, which is a more concise syntax for anonymous functions:
```javascript
// ES6
setTimeout(() => expireBullet(bullet), bulletExpiration);

// ES5 and earlier
setTimeout(function () {
  expireBullet(bullet);
}, bulletExpiration);
```

### Sounds

While I was able to find some sounds on freesound.org, not all of them matched what I wanted exactly. To address that, I used Audacity to change the length and pitch of those downloaded sounds accordingly.

For the record, these were for:
- Firing a bullet
- Destroying an asteroid
- Crashing the spaceship

### Limiting the rate of fire

When it came time to implement this, I realized (to my amusement) that I had already thought about it, because of the related question in the final quiz.

```javascript
const firingRate = 120;
let timeLastFired;

const fireBullet = () => {
  if (timeLastFired !== undefined && Date.now() - timeLastFired < firingRate) {
    return;
  }
  timeLastFired = Date.now();

  ...
}
```

The core logic here is to check if enough time has elapsed between now and the previous bullet fire. However when firing a bullet for the first time, `timeLastFired` isn't defined yet, so I had to make sure to catch that condition.

### Polish

There were some low-hanging fruit which I decided to implement to improve the game experience:

- Pretty gradient `fill`s for the spaceship and the asteroids, given the low-realism shapes they are — I didn't even know I could make those gradients until I chanced upon that section in the `Raphael.js` reference

- Fade-ins for `GAME OVER` and `YOU WIN` messages instead of ugly `alert()` boxes

- A `PLAY AGAIN` button so that the player won't be left hanging when the game ends, plus `:hover` styling for the button so there is immediate positive feedback that it is clickable when the player does a mouseover

### What I didn't manage to implement

- A section for instructions

- Retro font on a large `ASTEROIDS` header

- Multiple lives for the spaceship (blinking, immunity against asteroids, etc)

- Random starting positions for the asteroids

- Proper screen wrapping for the spaceship

- Enemy spaceships (originally scoped out as a stretch goal)
