# Spring 2020 DPoodle Gallery, Section A

## Allyson Low
```reason demo
{
let case = solid(Color("saddleBrown"), rectangle(400., 300.));
let shelf = solid(Color("sandyBrown"), rectangle(400., 50.))
let bookOne = solid(Color("skyblue"), ellipse(6.,30.)) +++ (solid(Color("green"), rectangle(15., 100.)));
let bookTwo = solid(Color("tan"), rectangle(5., 40.)) +++ (solid(Color("lightCyan"), rectangle(20., 100.)));
let series = bookOne ||| bookTwo;

let rec fillShelf = count => {
 switch (count){
 | 0 => empty
 | n => series ||| fillShelf(n - 1)
 }
};

let fullShelf = fillShelf(11);
draw(translate(0., 40., fullShelf) --- translate(0., 50., shelf) +++ case);
}
```

## Ashley Dapore
```reason demo
{
let cover = solid(Color("black"), square(600.))
let cov = solid(rgba(0,0,0,1.0), square(610.))
let shape = solid(rgba(132,160,160,1.0), triangle(160., 148.))
let shape1 = solid(Color("black"), triangle(148., 136.))
let wrec = solid(rgba(255,255,255,0.5), rectangle(4., 295.))
let rect = solid(Color("black"), rectangle(5., 283.))
let col = count => {
  switch (count) {
  | 0 => empty
  | n => fill(hsla(float_of_int(315+count*55),1.,0.4, 1.0), strokeWidth(0.0, rectangle(5.6,295.)))
  }
};
let rec rainbow = count => {
  switch (count) {
  | 0 => empty
  | n => col(n) ||| rainbow(n-1)
  }
};
let finalCover = translate(-164., -18., rotate(75., wrec))
  +++cover
  +++stroke(Color("black"), strokeWidth(1., cov));
let finalShape = translate(0., -38., shape1)
  +++translate(0., -40., shape)
  +++translate(157., -49., rotate(276., rect))
  +++translate(165., -10., rotate(278., rect));
  
let finalRainbow = translate(158., -30., rotate(277., rainbow(6)));
draw(
  finalShape
  +++finalRainbow
  +++finalCover);
}
```

## Caymn Lutz
```reason demo
{
let a = fill(color("pink"), ellipse(45., 80.));
let b = rectangle(10., 10.);
let c = strokeWidth(3., rectangle(50., 50.));
let d = rectangle(50., 50.);
draw(rotate(1., scale(1., d))
      +++ stroke(color("pink"), (a ||| b) --- c));
let f = withFont(2., Serif, Bold, Italic, setBounds(-30., 30., -20., 20., Text("Happy Easter")));
draw(f);
}
```

## Hamza Niazi
```reason demo
{
let line = lenght => {
  strokeWidth(2., focus(ML, openPath([
    moveXY(0., 0.),
    lineXY(lenght, 0.),
    moveXY(lenght, 0.)])))
};
let leftEye = solid(color("red"), circle(25.));
let p1 = (-40., 0.);
let p2 = (40., 0.);
let c1 = (-10., 30.);
let c2 = (10., 30.);
let curve = openPath([moveP(p1), curveP(c1, c2, p2)]);

let rec sunGlasses = nums => {
  switch (nums) {
  | [] => solid(color("green"), circle(25.))
  | [head, ...tail] => line(head) ||| sunGlasses(tail)
  }
};
draw(rotate(-90., translate(0., 0., leftEye) --- rotate(90., sunGlasses([25., 1.]))) --- rotate(-90., line(35.)) --- curve +++ fill(color("goldenrod"), circle(80.)))
}
```

## Helen Amaro
```reason demo
{
let rec hat = nums => {
  switch(nums){
  | [] => Rectangle(50., 50.)
  | [head] => Rectangle(5., head)
  | [head, ...tail] => Beside(Rectangle(5., head), hat(tail))
  }
};

let rec snowMan = nums => {
  switch(nums){
  | [] => circle(10.)
  | [head] => circle(head)
  | [head, ...tail] => Above(circle(head), snowMan(tail))
  }
};

let snowman1 = fill(color("snow"), snowMan([13.,15.,24.]));

let button1 = fill(color("black"), circle(2.));

let topHat = rotate(90.,fill(color("black"), hat([20.,30.])));

let rightscarf = fill(color("red"), rectangle(20., 7.));
let scarf = beside(rightscarf, fill(color("red"), rectangle(30., 7.)));
let finalScarf = translate(15., -25., scarf);

let sky = fill(color("royalBlue"), Rectangle(120.,100.));
let ground = fill(color("snow"), Rectangle(120., 40.) );

let righteye = fill(color("black"),circle(2.));
let eyes = beside(righteye, fill(color("black"), circle(2.)))
let finalEyes = translate(0., -42., eyes);

let moon = translate(-40., -35., fill(color("cornSilk"), circle(10.))); 
let finalSky = on(moon, sky);

let hat = translate(0., -55., topHat);
let hatSnowman = on(hat, snowman1);

let scarfSnowman = on(finalScarf, hatSnowman);
let eyeSnowman = on (finalEyes, scarfSnowman);

let nose = rotate(90., fill(color("orange"), triangle(3.,15.)));
let finalNose = translate(8., -38.,nose);
let noseSnowman = on(finalNose, eyeSnowman);

let arrow = len => {
  strokeWidth(2., focus(ML, openPath([
    moveXY(0., 0.),
    lineXY(len, 0.),
    lineXY(len -. 5., 5.),
    moveXY(len, 0.),
    lineXY(len -. 5., -5.)])))
};

let righthand = rotate(-220., fill(color("saddleBrown"),arrow(25.)));
let finalhand = translate(30.,-30., righthand);
let righthandSnowman = on(finalhand, noseSnowman);

let lefthand = rotate(-320., fill(color("saddleBrown"), arrow(25.)));
let finalLhand = translate(-30., -30., lefthand);
let twoHandSnowman = on (finalLhand, righthandSnowman);

let b1Snowman = translate(0., -15., button1);
let fb1Snowman = on(b1Snowman, twoHandSnowman);

let b2Snowman = translate(0., -5., button1);
let fb2Snowman = on(b2Snowman, fb1Snowman);

let b3Snowman = translate(0., 15., button1);
let fb3Snowman = on(b3Snowman, fb2Snowman);

let b4Snowman = translate(0., 25., button1);
let fb4Snowman = on(b4Snowman, fb3Snowman);

let b5Snowman = translate(0., 35., button1);
let finalSnowman = on(b5Snowman, fb4Snowman);

let background = above(finalSky, ground);
draw(finalSnowman +++ background);
}
```

## Jacob Bauer
```reason demo
{
/* This code contains multiple functions that create random shapes in a grid. There are two types of grids. A pattern that is one single randomized shape, and there is a normal grid that creates completely randomized shapes in a grid. The grid and pattern functions have 3 parameters, a function, a width, and a height. Exectute the code multiple times to see what it does */
let random_shape = () => {
  let f1 = [circle, square];
  let f2 = [ellipse, rectangle, triangle];
  let select_list = Random.int(2);
  let lr = Random.int(256);
  let lg = Random.int(256);
  let lb = Random.int(256);
  let la = Random.float(1.);
  let lclr = LineColor(RGBA(lr, lg, lb, la))
  let fr = Random.int(256);
  let fg = Random.int(256);
  let fb = Random.int(256);
  let fa = Random.float(1.);
  let fclr = FillColor(RGBA(fr, fg, fb, fa))
  let lw = Random.float(8.);
  let lwidth = LineWidth(lw);
  let rotval = Random.float(360.);
  let arg1 = Random.float(10.) +. 2.;
  switch(select_list){
    |  0  =>  let select_elem = Random.int(2);
            rotate(rotval, Styled(List.nth(f1, select_elem)(arg1), [lclr, fclr, lwidth]));
    |  1  =>  let select_elem = Random.int(3);
            let arg2 = Random.float(10.) +. 2.;
            rotate(rotval, Styled(List.nth(f2, select_elem)(arg1, arg2), [lclr, fclr, lwidth]));
    | n => empty
  }
}

let const_random_shape = {
  random_shape()
}

let rec row = (func, x) => {
  switch(x){
    | 0 => empty
    | n => func() ||| row(func, n - 1)
  }
}

let rec column = (func, x, y) => {
  switch(y){
    | 0 => empty
    | n => row(func, x) --- column(func, x, n - 1)
  }
}

let grid = (func, x, y) => {
  column(func, x, y);
}

let rec const_row = (func, x) => {
  switch(x){
    | 0 => empty
    | n => func ||| const_row(func, n - 1)
  }
}

let rec const_column = (func, x, y) => {
  switch(y){
    | 0 => empty
    | n => const_row(func, x) --- const_column(func, x, n - 1)
  }
}

let pattern = (func, x, y) => {
  const_column(func, x, y);
}

draw(pattern(const_random_shape, 10, 2) --- (pattern(const_random_shape, 2, 10) ||| grid(random_shape, 10, 10) ||| pattern(const_random_shape, 2, 10)) --- pattern(const_random_shape, 10, 2));
}
```

## Jason Cast
```reason demo
{
let back = solid(Color("black"), rectangle(500., 500.));
let text = Bounds(Text("F U N"), -4., 4., -10., 70.);
let picture = (start, radius, pictures) => {
  let step = 5.;
  let dot = regularPolygon(6, 9., 10.);
  let rec loop = count => {
    let angle = radians(step *. float_of_int(count));
    let r = radius /. float_of_int(pictures) *. float_of_int(count); 
    switch (count) {
    | 0 => empty
    | n => fill(hsl(float_of_int(200 + count * 3), 0.5, 0.5),
        translate(r *. cos(angle), r *. sin(angle), dot)) +++ loop(n - 1)
    }
  };
  loop(pictures)
};
draw(above(text,picture(10., 300., 100))+++ back);
}
```

## Nemekhbayar Nergui
```reason demo
{
let deepBlue = rgb(15,96,137);
let skyBlue = rgb(0,153,230);
let deepRed = rgb(214,26,26);
let red = rgb(255,0,0);
let white = rgb(255,255,255);
let green = rgb(0,128,0);
let black =rgb(0,0,0);
let mustard = rgb(255,219,88);
let purple = rgb(128,0,128);

let symbol = solid(purple, regularPolygon(6,15.,90.));
let rec banter = num => {
	switch(num) {
	| 0 => empty
	| num => symbol ||| banter(num-1)
	}
};

let fLeft = solid(deepBlue, rectangle(50., 100.));
let fMiddle = solid(white, rectangle (50.,100.));
let fRight = solid(deepRed, rectangle (50.,100.));
let france = fLeft ||| fMiddle ||| fRight;

let fname = fill(black, withFont(0.5,Serif, Regular, Normal, text("France")));
let flagFrance = france ---fname;

let jBody = solid(white, rectangle(150., 100.));
let jCircle = solid(red, ellipse(50.,50.));
let japan = jCircle+++jBody;

let jname = fill(black, withFont(0.5,Serif, Regular, Normal, text("Japan")));
let flagJapan = japan---jname;

let gTop = solid(black, rectangle(150.,33.));
let gMiddle=solid(red,rectangle(150.,33.));
let gBottom = solid(mustard, rectangle(150.,33.));
let germany = gTop---gMiddle---gBottom;

let gname = fill(black, withFont(0.5,Serif, Regular, Normal, text("Germany")));
let flagGermany = germany---gname;

let iLeft = solid(green,rectangle(50.,100.));
let iMiddle = solid(white,rectangle(50.,100.));
let iRight = solid(red, rectangle(50.,100.));
let italy = iLeft ||| iMiddle ||| iRight;

let iname = fill(black, withFont(0.5,Serif, Regular, Normal, text("Italy")));
let flagItaly = italy---iname;

let rTop = solid(white, rectangle(150., 33.));
let rMiddle =solid(skyBlue,rectangle(150.,33.));
let rBottom = solid(red, rectangle(150.,33.));
let russia = rTop---rMiddle---rBottom;
let rname = fill(black, withFont(0.5,Serif, Regular, Normal, text("Russia")));
let flagRussia = russia---rname;

let heading = banter(6);
draw(heading);
draw(flagFrance);
draw(flagJapan);
draw(flagGermany);
draw(flagItaly);
draw(flagRussia);
}
```

## Rana Muhammad Hamza
```reason demo
{
let top = solid(Color("orange"), rectangle(420., 200.));
let bottom = solid(Color("yellow"), rectangle(420., 100.));
let words  = fill(Color("Blue"), withFont(3.0, Sans, Regular, Normal, text("CSC233")));
let words2 = fill(Color("Purple"), withFont(1.0, Sans, Regular, Normal, text("By: Rana MHamza")));

/*shapes in the top*/
let circ1 = solid(Color("indigo"), circle(30.));
let circ2 = solid(Color("yellow"), circle(20.));
let tri1  = solid(Color("orange"), triangle(30., 30.));
let topshape = tri1 +++ circ2 +++ circ1;

let rec topshapeRec = count => {
  switch (count) {
  | 0 => empty
  | n => topshape ||| topshapeRec(n - 1)
  }
};

/*shapes in the bottom*/
let circ3 = solid(Color("orange"), circle(30.));
let circ4 = solid(Color("yellow"), circle(20.));
let tri2  = solid(Color("indigo"), triangle(30., 30.));
let bottomshape = tri2 +++ circ4 +++ circ3;

let rec btmshapeRec = count => {
  switch (count) {
  | 0 => empty
  | n => bottomshape ||| btmshapeRec(n - 1)
  }
};

let bot = btmshapeRec(7);
let tops = topshapeRec(7);
draw(translate(0., 120., bot) +++ translate(0., -70., tops) +++ translate(-65.,0., words) ---translate(95.,0., words2) +++ translate(0., 100., bottom) +++ top);
}
```

## Samuel Johnson
```reason demo
{
/*Creating the background components*/
let mySky = strokeWidth(0.3, fill(color("skyBlue"), rectangle(200., 100.)));
let myText = withFont(1., Serif, Bold, Italic, setBounds(-30., 30., -20., 20., Text("The Recursive Forest")));
let mySun = translate(-85., -35., strokeWidth(0.3, fill(color("gold"), circle(10.))));
let myGround = strokeWidth(0.3, fill(color("green"), rectangle(200., 20.)));

/*Placing all background elements into one Image*/
let myBackground = myText --- (mySun +++ mySky) --- myGround;

/*Creating the tree components*/
let treeTrunk = strokeWidth(0.3, fill(color("black"), circle(2.))) +++ strokeWidth(0.3, fill(color("brown"), rectangle(10., 40.)));
let treeLeaves = strokeWidth(0.3,fill(color("green"), circle(20.)));

/*Placing all tree elements into one tree image*/
let myTree = translate(0., 30. , treeLeaves --- treeTrunk); 

/*Recursive function creates n trees side by side*/
let rec plantForest = n => {
	switch (n) {
  | 0 => empty
  | n => myTree ||| plantForest(n - 1)
  }
};

/*plantForest function called to create n trees and draw them on top of myBackground image*/
draw(plantForest(5) +++ myBackground);
}
```

## Sang Truong
```reason demo
{
/* Sierpinski triangle */
let rec sierpinski = (num, b) => {
  let h = 0.8660 *. b
  switch(num) {
  | 0 => empty
  | k => {
    let bigTrig = fill(color("white"), stroke(rgb(1, 1, 255), strokeWidth(0.2, triangle(b, h))))
    let leftC = bottomLeft(bigTrig)
    let rightC = bottomRight(bigTrig)
    let topC = (0., top(bigTrig)) 
    translateP(leftC, focus(BL, sierpinski(num - 1, b/. 2.)))
    +++
    translateP(rightC, focus(BR, sierpinski(num - 1, b/. 2.)))
    +++
    translateP(topC, focus(TC, sierpinski(num - 1, b/. 2.)))
    +++
    bigTrig
  }
  }
}
draw(sierpinski(10, 150.))
    
/* Pyramid top down */

let rec bigTriangle = (num, b) => {
  let h = 0.8660 *. b
	switch(num) {
  | 0 => empty
  | num => {
    bigTriangle (num-1, b/.1.1)
    +++
    fill(color("white"), stroke(rgb(1, 1, 255), strokeWidth(0.2, triangle(b, h))))
  	}
	}	
}
draw(bigTriangle(30, 100.))
}
```

## Tyler Hicks
```reason demo
{
/*Prescription Bottle */
let top = (solid(Color("white"), rectangle(60., 10.)) ---
  	solid(Color("white"), rectangle(90., 10.)));
            
let bottle = (solid(Color("white"), rectangle(81., 43.)) +++
  	solid(Color("orange"), rectangle(80., 100.)));
    
let myText = fill(color("black"), withFont(0.40, Serif, Regular, Normal, text("Rx____________")));

/* Background */
let bckgrd= solid(Color("navajoWhite"), rectangle(400., 300.));

let prescriptBottle = top --- bottle; 
let finalPBottle = myText +++ translate(5., 0., prescriptBottle +++ bckgrd);

/* Creating the Pills */

let redHalf = solid(Color("red"), ellipse(8., 6.));
let yellowHalf = solid(Color("yellow"), ellipse(8., 6.));
let finalPill = redHalf +++ translate(7.,0., yellowHalf);

/* Recursion for "Pills in Bottle" */
/* Row of Pills */
let rec pillS = ct => {
  switch (ct) {
    | 1 => empty
    | n => finalPill ||| pillS(n - 1)
  }
}; 

/* Column of Pills */
let rec amountPills = amount => {
  switch (amount) {
    | 0 => empty
    |amount => pillS(6) --- amountPills(amount -1)
  }
};

let bottlePills = pillS(1); 
let colPills = amountPills(4);

draw(translate(0., 80., bottlePills) +++ translate(6., 52., colPills) +++ translate(0., 5., finalPBottle));
}
```
