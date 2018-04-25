---
layout: post
title:  "Weekly Progress Update #2: Scoping the project"
date:   2018-04-08 23:37:46 +0800
---
I will be making [Asteroids][asteroids] for my final project!

### Defining the scope

I've been trying several games over the past two weeks, and I came to the conclusion that Asteroids provides a good balance of feasibility and complexity.

Furthermore, there are a few good-to-have features that I may implement as extension tasks depending on my progress. What's great is that the game will still work nicely even without those features, and they serve as additional stretch goals for me in this project.

### Challenges

After playing the [Asteroids game][game] online and experiencing its mechanics, I've come up with some of the challenges that I will need to tackle when making the game:

- **Basic spaceship movement**: How do I rotate the spaceship and move it along a certain angle, so that the player can control it with the arrow keys?

- **Screen wrapping**: When objects like the spaceship, asteroids, and bullets leave one side of the map, how do they reappear on the other side of the map?

- **Collision detection**: This one should be pretty straightforward. Like in previous assignments, I'm going to overlay a transparent circle onto each object. The reason for sticking to circles is to keep distance calculations between objects simple. This is also a major reason for choosing Asteroids, because almost all objects are circular.

- **Bullet expiration**: How do I make bullets expire after travelling for some distance?

- **Sounds**: Background music, bullet firing, asteroid collision / destruction.

### Extension

- **Advanced spaceship movement**: How do I get the spaceship to accelerate and decelerate, based on its rotation and thrust?

- **Enemy spaceships**: How do they move and how do they aim at the player?


[asteroids]: https://en.wikipedia.org/wiki/Asteroids_(video_game)
[game]: http://www.freeasteroids.org/
