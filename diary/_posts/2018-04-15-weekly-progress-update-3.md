---
layout: post
title:  "Weekly Progress Update #3: 15 April 2018"
date:   2018-04-15 13:28:12 +0800
---
### What went well: Spaceship movement

This part was surprisingly smooth-sailing, and I managed to get the spaceship to exhibit three movement-related behaviors:

1. Thrust
2. Drag
3. Brake

To do this, I had to keep track of the speed as per previous assignments. I then increased or decreased the speed by checking `boolean` variables that corresponded to whether certain arrow keys were pressed, via event listeners.

Finally, every iteration of the main loop updates the position of the spaceship. I must say I'm quite happy with how smoothly the spaceship flies across the screen.

To keep things simple, I think I will continue to use an oval shape to represent the spaceship, instead of going with something fancy.

### An annoying roadblock: Raphael element translation

Apparently in `Raphael.js`, updating an element's x and y positions is based on the element's own rotated x and y axes, instead of the screen's. This has made it very tricky to wrap the spaceship around the screen edges. Fortunately, there are no issues at all for the other shapes that don't need to rotate.

I managed to get some semblance of screen wrapping working for the spaceship, which involved some good ol' trigonometry and pen-and-paper to visualize the problem. However it was too buggy and sometimes made the spaceship disappear completely off the screen. As this doesn't affect the gameplay majorly, I will leave this till the very end and fix it if I have the time. Meanwhile, I have implemented an ugly but functional hack to keep the spaceship within the gameplay area.
