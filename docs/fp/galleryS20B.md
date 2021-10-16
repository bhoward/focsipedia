---
id: galleryS20B
title: Spring 2020 DPoodle Gallery, Section B
---

## Alecia Hawkins
```reason demo
{
let cherry = solid(Color("red"), circle(5.));
let flavor = cherry --- solid(Color("pink"), circle(20.));
let cone = solid(Color("black"), rotate(180., triangle(35.,55.)));
let icecream = flavor --- cone;
let rec order = count => {
  switch (count) {
  | 0 => empty
  | n => icecream ||| order(n-1)
  }
};
draw(order(7));
}
```

## Brayton Strohmeyer
```reason demo
{
let arrow = len => {
  strokeWidth(2., focus(ML, openPath([
    moveXY(0., 0.),
    lineXY(len, 0.),
    lineXY(len -. 5., 5.),
    moveXY(len, 0.),
    lineXY(len -. 5., -5.)])))
};
let d = withFont(1., Serif, Bold, Italic, setBounds(-20., 10., -20., 10., Text("N")));
let e = withFont(1., Serif, Bold, Italic, setBounds(-20., 10., -20., 10., Text("E")));
let f = withFont(1., Serif, Bold, Italic, setBounds(-20., 10., -20., 10., Text("S")));
let g = withFont(1., Serif, Bold, Italic, setBounds(-20., 10., -20., 10., Text("W")));
draw(d);
draw(arrow(45.) +++ rotate(-90., arrow(45.)) +++ rotate(-180., arrow(45.)) 
     +++ rotate(-270., arrow(45.)) +++ fill(color("black"), circle(2.)) +++ 
     rotate(-225., arrow(35.)) +++ fill(color("white"), circle(50.)) +++
     (translate(70., 0., e)) +++ (translate(-70., 0., g)));
draw(translate(0., 0., f));
}
```

## Clayton Troyer
```reason demo
{
let color = count =>{
  switch (count){
    | 0 => empty
    | j => fill(hsl(float_of_int(j), 1.0, 0.5), polygon([(-30.0, 14.0), (3.0, -19.0), (16.0, -14.0), (14.0, 2.0)]))
  }
};

let rec obj = count => {
  switch (count) {
    | 0 => empty
    | n => color(n) ||| obj(n-5)
  }
};

let rec row = count => {
  switch (count) {
  | 0 => empty
  | n => (color(n) --- obj(n - 5)) --- row(n - 10)
  }
};

let pyramid = count => {
  switch (count) {
  | 0 => empty
  | n => row(n)
  }
};

draw(pyramid(200));
}
```

## Gangao Yang
```reason demo
{
let rec showList = nums => {
  let showBox = n => {
    Styled(ellipse(float_of_int(n * 10), float_of_int(n * 10)),
      [FillColor(HSLA(float_of_int(n * 36), 1.0, 0.5, 1.0))])
  };
   switch (nums) {
  | [] => Empty
  | [head, ...tail] => Beside(showBox(head), showList(tail))
  }
};
 
draw(showList([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
}
```

## Grace Todd
```reason demo
{
let rec worm = nums => {
  switch(nums){
    |[] => circle(10.0)
    |[head] => circle(head)
    |[head, ...tail] => Beside(circle(10.0), worm(tail))
  }
};
draw(worm([10.0,10.0,10.0,10.0,10.0,10.0,10.0]))
}
```

## Hieu Tran
```reason demo
{
let rec fib = nums => {
  switch(nums) {
  | 0 => 0
  | 1 => 1
  | nums => fib(nums-1) + fib(nums-2)
   }
};

let rec d = nums => {
   let dm = n => {
      fill(hsl(float_of_int(n*1000), 1.0, 0.5), circle(float_of_int(n*5)))
   }
   switch(nums) {
   | 0 => empty
   | nums => Above(dm(nums), d(nums-1))
    }
};

draw(d(fib(7)))
}
```

## Jacob Kelber
```reason demo
{
let rec fractal = (n) => {
     let a = rectangle(30.0,40.0);
     let n = 15;
     if(n == 0){
           draw(a);
}  	
     else if(n > 0){
           draw(a);
           draw(rotate(30.0,a));
	   fractal(n-1);
} 
}
}
```

## Jordyn Blakey
```reason demo
{
let circleNum = count => {
  switch (count) {
  | 0 => empty
  | i => fill(rgb(255, 215, 0), circle(10.))
  }
};
 
let rec part1 = count => {
  switch (count) {
  | 0 => empty
  | n => circleNum(n) --- part1(n - 1)
  }
};
 
let rec part2 = count => {
  switch (count) {
  | 0 => empty
  | n => part1(n) ||| part2(n - 1)
  }
};
 
let brick = square(10.);
let rec layer = nums => {
switch(nums) {
  |0 => empty
  |l => brick ||| layer(l - 1)
  }
};
 
let rec layer2 = nums => {
switch(nums) {
  |0 => empty
  |j => layer(j) +++ layer(j - 1)
  }
};
 
draw(part2(60) ||| layer2(90));
}
```

## Linhao Liu
```reason demo
{
let squares = n => {
  
  let c = solid(Color("blueViolet"), text(string_of_int(n))) +++ square(20.0);
  fill(Color("silver"),c);
};
let a = setBounds(-30.,30.,-9.,9.,text("good"));
let b = rotate(90.,scale(1.,a))
let rec showList = nums => {
  switch (nums) {
  | [] => solid(Color("violet"), b)
  | [head, ...tail] => squares(head) ||| showList(tail)
  }
};

draw(showList([1, 2, 3]));
draw(showList([1, 2, 3, 4, 5, 6, 7, 8, 9]));
}
```

## Mana Kunimatsu
```reason demo
{
let blueFill = img => { Styled(img, [FillColor(Color("blue"))]) };
let pinkFill = img => { Styled(img, [FillColor(Color("pink"))]) };
let greenFill = img => { Styled(img, [FillColor(Color("green"))]) };
let redOutline = img => { Styled(img, [LineColor(Color("green"))]) };
let a = blueFill(circle(75.0));
let b = pinkFill(circle(75.0));
let c = greenFill(circle(90.0));
let d = Text("Peace");
draw(On(Rotate(Scale(d, 4., 7.), 0.),
    redOutline(Above(Beside(a, b), c))));
}
```

## Mason Meadows
```reason demo
{
let eyeL = (ellipse(10.0, 10.0));
let eyeR = (ellipse(10.0, 10.0));
let eyeCL = fill(color("blue"), eyeL);
let eyeCR = fill(color("blue"), eyeR);
let nose = (triangle(5.0, 5.0));
let noseC = fill(color("yellow"), nose);

draw(translate(0.0, 0.0, eyeCL) ||| eyeCR)
draw(noseC)
draw(polyline([(-10.0, 5.0), (10.0, 3.0)]))
}
```

## Matthew Luing
```reason demo
{
let column = count => {
  switch (count) {
  | 0 => empty
  | k => fill(color("darkOrange"), triangle(5.0, 8.0))
  }
};
let rec single = count => {
  switch (count) {
  | 0 => empty
  | n => column(n) ||| single(n - 10)
  }
};
let rec row = count => {
  switch (count) {
  | 0 => empty
  | n => row(n - 10) --- (column(n) ||| single(n - 10))
  }
};
let pyramid = count => {
  switch (count) {
  | 0 => empty
  | n => row(n)
  }
};
draw(pyramid(100));
}
```

## Robin Bista
```reason demo
{
let line = length => {
  strokeWidth(2., focus(ML, openPath([
    moveXY(0., 0.),
    lineXY(length, 0.),
    moveXY(length, 0.)])))
};

let leftEye = solid(color("blue"), circle(30.));
let p1 = (-50., 0.);
let p2 = (50., 0.);
let c1 = (-10., 30.);
let c2 = (10., 30.);

let curve = openPath([moveP(p1), curveP(c1, c2, p2)]);

let rec sunGlasses = nums => {
  switch (nums) {
  | [] => solid(color("green"), circle(30.))
  | [head, ...tail] => line(head) ||| sunGlasses(tail)
  }
};

draw(rotate(-90., translate(0., 0., leftEye) --- rotate(90., sunGlasses([30., 1.]))) --- rotate(-90., line(35.)) --- curve +++ fill(color("navyblue"), circle(30.)))
}
```

## Xiaoye Zhang
```reason demo
{
let circles = n => {
  let fCircle = solid(Color("blue"), text(string_of_int(n))) +++ circle(20.0);
  fill(Color("yellow"), fCircle )
};

let a = setBounds(-24., 24., -7., 7., text("stop"));
let b = rotate(45., scale(1., a))

let rec showList = nums => {
  switch (nums) {
  | [] => solid(Color("red"), b)
  | [head, ...tail] => circles(head) ||| showList(tail)
  }
};

draw(showList([1, 2, 3]));
draw(showList([1, 2, 3, 4, 5, 6, 7, 8, 9]));
}
```

## Yuji Mao
```reason demo
{
let listBuilding = n => {
  let valueFloor = solid(color("papayaWhip"), text(string_of_int(n))) +++ square(3.7);
  let nextFloor = circle(2.) +++ square(3.7);
  fill(color("white"), valueFloor +++ nextFloor)
};

let d = withFont(2., Serif, Bold, Italic, setBounds(-30., 30., -20., 20., Text("Jasmyn")));

let rec showList = nums => {
  switch (nums) {
  | [] => solid(color("peachPuff"),  d)
  | [head, ...tail] => listBuilding(head) --- showList(tail)
  }
};

draw(showList([1, 3, 5, 7, 9]));
}
```

## Rain Chen
```reason demo
{
let listNode = n => {
  let valueField = solid(color("black"), text(string_of_int(n))) +++ square(20.);
  fill(color("white"), valueField)
};

let endOfTail = setBounds(-20.,20.,-20.,20.,text ("END"));

let rec showList = nums => {
  switch (nums) {
  | [] => solid(color("black"), endOfTail)
  | [head, ...tail] => listNode(head) ||| showList(tail)
  }
};

draw(showList([1, 2, 3]));
}
```

## Amy Chen
```reason demo
{
let rec list = nums => {
  let showBox = n => {
	  Styled(ellipse(5., float_of_int(n*5)),
	    [FillColor(rgb(100,50,100))])
  };
  switch (nums) {
  | [] => empty
  | [head, ...tail] => Beside(showBox(head), list(tail))
  }
};

draw(list([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]));
}
```

## Zonghui Hu
```reason demo
{
let arrow = len => {
  strokeWidth(2., focus(ML, openPath([
    moveXY(0., 0.),
    lineXY(len, 0.),
    lineXY(len -. 5., 5.),
    moveXY(len, 0.),
    lineXY(len -. 5., -5.)])))
};

let squareCircle = n => {
  if (n mod 2 == 0){
  let valueField = stroke(color("black"), text(string_of_int(n))) +++ circle(15.0);
  let nextField = rotate(90.,arrow(20.)) ;
  fill(color("gray"), valueField) --- stroke(color("red"), nextField);
  }
  else {
  let valueField = stroke(color("black"), text(string_of_int(n))) +++ square(25.0);
  let nextField = rotate(90.,arrow(20.)) ;
  fill(color("gray"), valueField) --- stroke(color("red"), nextField);
  }
};

let rec showList = nums => {
  switch (nums) {
  | [] => solid(color("yellow"), text("Hello World"))
  | [head, ...tail] => squareCircle(head) --- showList(tail)
  }
};

draw(showList([1, 2, 3]));
draw(showList([1, 2, 3, 4, 5, 6, 7, 8, 9]));
}
```