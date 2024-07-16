---
id: doodle-project
title: DPoodle Graphics Drawing Project
---

For Monday, March 30, create a drawing using the [DPoodle](doodle.md) graphics library. You should feel free to be as creative as you like, the only requirement is that the drawing use recursion in an essential way.

Here is an editor where you can enter your code. *Be sure to copy and paste it somewhere else* because this editor will be cleared when the page reloads. I suggest keeping a copy in a text editor such as WordPad or TextEdit. When you are done, upload it to Moodle: [Section A](https://moodle.depauw.edu/mod/assign/view.php?id=243021) or [Section B](https://moodle.depauw.edu/mod/assign/view.php?id=243023).

```reason edit
/*
 * your code here
 */
```

---

Here are some examples to give you ideas:

Bralin Coleman, Fall 2019:
```reason edit
let col = count => {
  switch (count) {
  | 0 => empty
  | k => fill(hsl(float_of_int(k), 1.0, 0.5), rectangle(10., 10.))
  }
};

let rec box = count => {
  switch (count) {
  | 0 => empty
  | n => col(n) ||| box(n - 5)
  }
};

let rec row = count => {
  switch (count) {
  | 0 => empty
  | n => row(n - 10) --- (col(n) ||| box(n - 5))
  }
};

let rec rowR = count => {
  switch (count) {
  | 0 => empty
  | n => (col(n) ||| box(n - 5)) --- rowR(n - 10)
  }
};

let diamond = count => {
  switch (count) {
  | 0 => empty
  | n => row(n) --- rowR(n)
  }
};

draw(diamond(200));
```

Kien Ta, Fall 2019:
```reason edit
let sample = (start, radius, samples) => {
  let step = 10.;
  let dot = triangle(10., 10.);
  let rec loop = count => {
    let angle = radians(step *. float_of_int(count));
    let r = radius /. float_of_int(samples) *. float_of_int(count); 
    switch (count) {
    | 0 => empty
    | n => fill(hsl(float_of_int(240 + count * 50), 1., 0.5),
        translate(r *. cos(angle), r *. sin(angle), dot)) +++ loop(n - 1)
    }
  };

  loop(samples)
};
draw(sample(0., 250., 200));
```

Michael Lackey, Fall 2019:
```reason edit
let sky = solid(Color("skyblue"), rectangle(400., 200.));
let ground = solid(Color("green"), rectangle(400., 100.));
let roof = solid(Color("red"), triangle(50., 50.));
let frontDoor = solid(Color("blue"), rectangle(50., 15.)) ---
  (solid(Color("black"), rectangle(10., 25.)) +++
    solid(Color("blue"), rectangle(50., 25.)));
let house = roof --- frontDoor;

let rec town = count => {
  switch (count) {
  | 0 => empty
  | n => house ||| town(n - 1)
  }
};

let townPlace = town(5);
draw(translate(0., 40., townPlace) +++ translate(0., 100., ground) +++ sky);
```

Abby Hutson-Comeaux, Fall 2019:
```reason edit
/* Establishing colors for the honeycomb & bee */
let orangeYellow = rgb(255, 215, 0);
let yellow = rgb(255, 255, 0);
let black = rgb(0, 0, 0);
let white = rgb(255, 255, 255);

/* Creating a plain yellow background */
let background = solid(yellow, rectangle(400., 300.));

/* oneComb generates each individual honey comb piece */
let oneComb = strokeWidth(3., stroke(yellow, fill(orangeYellow, regularPolygon(6, 15., 90.))));

/* Method to create each row with the desired number of combs per row */
let rec combsPerRow = num => {
  switch (num) { 
  | 1 => oneComb
  | num => oneComb ||| combsPerRow(num - 1)
  }
};

/* Method to actually create the honey comb that will be placed over the background */
let rec honeyComb = rows => {
  switch (rows) {
  | 0 => empty 
  | rows => combsPerRow(16) --- honeyComb(rows - 1)
  }
};

/* Making the bottom piece to the bee, including the lines */
let beeButt = fill(yellow, openPath([
  moveXY(-30., 0.), curveXY(-30., 0., 0., -35., 30., 0.),
  moveXY(-30., 0.), curveXY(-30., 0., 0., 35., 30., 0.),
  /* add lines for the bees body */
  moveXY(-15., -12.), lineXY(-15., 12.),
  moveXY(-5., -16.), lineXY(-5., 16.),
  moveXY(5., -16.), lineXY(5., 16.),
  moveXY(15., -12.), lineXY(15., 12.)
]));

/* Adding the wing to the bottom of the bee */
let bottomWing = openPath([
  moveXY(0., 17.), lineXY(0., 35.),
]) +++ fill(white, closedPath([
  moveXY(0., 10.), curveXY(0., 10., -15., 30., 0., 40.),
  curveXY(15., 30., 0., 10., 0., 10.)
]));

/* Adding the wing to the top of the bee */
let topWing = openPath([
  moveXY(0., -17.), lineXY(0., -35.),
]) +++ fill(white, closedPath([
  moveXY(0., -10.), curveXY(0., -10., -15., -30., 0., -40.),
  curveXY(15., -30., 0., -10., 0., -10.)
]));

let beeBody = fill(black, circle(11.));
let beeHead = fill(yellow, circle(7.));

/* Combining the parts of the bee */
let bee = beeBody +++ translate(12., 0., beeHead) +++ translate(-25., 0., beeButt);
let finalBee = bee +++ bottomWing +++ topWing;

let words = fill(black, withFont(3.0, Serif, Regular, Normal, text("~Bee Happy~")));

/* Joining the text, honey comb, and bee all together */
let finalHoneyComb = words +++ translate(0., 10., honeyComb(10) +++ background);

/* Add bees to the drawing */
let oneBee = rotate(320., finalBee) +++ translate(120., 55., finalHoneyComb);
let twoBee = rotate(140., finalBee) +++ translate(-230., -120., oneBee);

draw(twoBee);
```