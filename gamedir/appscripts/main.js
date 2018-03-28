require(
  // Use this library to "fix" some annoying things about Raphel paper and graphical elements:
  //     a) paper.put(relement) - to put an Element created by paper back on a paper after it has been removed
  //     b) call element.addEventListener(...) instead of element.node.addEventListner(...)
  ["../jslibs/raphael.lonce"], // include a custom-built library

  function () {
    console.log("Yo, I am alive!");

    // Grab the div where we will put our Raphael paper
    var centerDiv = document.getElementById("centerDiv");
    // Create the Raphael paper that we will use for drawing and creating graphical objects
    var paper = new Raphael(centerDiv);
    // Put the width and heigth of the canvas into variables for our own convenience
    var pWidth = paper.width;
    var pHeight = paper.height;
    console.log("pWidth is " + pWidth + ", and pHeight is " + pHeight);

    // create black rectangle
    var rectMargin = 0;
    var rectLeft = rectMargin;
    var rectTop = rectMargin;
    var rectWidth = pWidth - 2 * rectMargin;
    var rectHeight = pHeight - 2 * rectMargin;
    var rectRight = rectLeft + rectWidth;
    var rectBottom = rectTop + rectHeight;

    var rect = paper.rect(rectLeft, rectTop, rectWidth, rectHeight);
    rect.attr("fill", "#000");

    //////////////////////////////////////////////////

    var cookie;
    var difficulty;
    var radius;
    var cookiesEaten;

    //////////////////////////////////////////////////

    // function to generate a random color string
    var randomColorString = function () {
      var h = randomInt(0, 360);
      var s = randomInt(30, 100);
      var l = randomInt(30, 100);
      return Raphael.hsl(h, s, l);
    };

    // function to generate random integer between a range
    var randomInt = function (start, end) {
      var range = end - start + 1;
      return start + Math.floor(Math.random() * range);
    };

    // function to create a cookie
    var createCookie = function (radius) {
      var randomXpos = randomInt(radius, pWidth - radius);
      var randomYpos = randomInt(radius, pHeight - radius);
      cookie = paper.circle(randomXpos, randomYpos, radius);
      cookie.attr("fill", randomColorString());

      cookie.addEventListener("click", function (event) {
        cookie.remove();
        cookiesEaten++;
        createCookie(radius);
      });
    };

    // function to choose difficulty
    var chooseDifficulty = function () {
      var validOptions = ["1", "2", "3"];
      var validRadii = [200, 80, 20];

      difficulty = prompt("Eat as many cookies as you can! 🍪\nChoose 1 for Easy, 2 for Medium, and 3 for Hard.\nPress cancel to quit.");

      if (difficulty === null) {
        return null;
      } else if (validOptions.includes(difficulty)) {
        // set the radius
        radius = validRadii[parseInt(difficulty) - 1];
      } else {
        // prompt the player again
        return chooseDifficulty();
      }
    };

    // function for game start
    var gameStart = function () {
      // alert("");
      if (chooseDifficulty() === null) {
        return;
      }

      var durationInSeconds = 5;
      setTimeout(gameOver, 1000 * durationInSeconds);

      cookiesEaten = 0;
      createCookie(radius);
    };

    // function for game over
    var gameOver = function () {
      cookie.remove();
      alert("Game Over! You ate " + cookiesEaten + " cookies! 🍪");
    };

    //////////////////////////////////////////////////

    gameStart();
  }
);
