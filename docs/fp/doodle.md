---
id: doodle
title: DPoodle Graphics
---

```reason hidden
let rec logoBackground = n => {
  if (n == 0) {
    Empty
  } else {
    let r = 10.0 *. sqrt(float_of_int(4 * n));
    logoBackground(n - 1) +++
      solid(hsl(float_of_int(12 * n), 1.0, 0.5), ellipse(2. *. r, r))
  }
};
let logo = withFont(2., Mono, Bold, Normal, stroke(Color("none"), fill(Color("black"), text("DPoodle")))) +++ logoBackground(50);
draw(logo)
```

## Section 1. Introduction
DPoodle is a graphics library written in ReasonML at DePauw University during Spring 2020.
DPoodle is based on the Doodle graphics library from [Creative Scala](https://creativescala.com/).

## Section 2. `image` type
The basic type of a drawing in DPoodle is `image`.
Seven built-in functions used to construct geometric shapes are ellipse, circle, rectangle, square, triangle, polygon, and regularPolygon.
The size arguments for all of these functions are of type `float`, plus the `regularPolygon` function also takes the number of sides as an `int`.
Every image in DPoodle has a *bounding box*, which is a minimal rectangle that can cover the image.
The center of the bounding box by default is at (0, 0).
The built-in triangle function creates an isoceles triangle with the base on the bottom edge of the bounding box and the vertex in the middle of the top edge. Detail about the built-in functions to create geometric shape images in DPoodle are in the following table:

| Function | Argument(s) | Bounding box size |
| :-: | :-: | :-: |
| `ellipse(w, h)` | Horizontal axis (w) and Vertical axis (h) | $w\times h$ |
| `circle(r)` | Radius (r)  | $2r\times 2r$ |
| `rectangle(w, h)`  | Width (w) and Height (h) | $w\times h$ |
| `square(w)`  | Side length (w)  | $w\times w$ |
| `triangle(w, h)`| Base (w) and Height (h)| $w\times h$ |
| `polygon(points)` | List of vertex points | Smallest rectangle containing all points |
| `regularPolygon(n, s, a)`| Number of sides (n), Distance from center to vertex (s), and Initial angle (a)| $2s\times 2s$ (roughly) |

Function `draw(image)` is used to visualize the `image`:
```reason edit
draw(ellipse(20.0, 15.0))
draw(square(15.0))
draw(triangle(15.0, 20.0))
draw(polygon([(-10.0, 10.0), (0.0, -10.0), (10.0, -10.0), (15.0, 0.0)]))
draw(regularPolygon(6, 15., 90.))
```

In the library there is also a function call `polyline` which is closely related to to `polygon`. A polyline is a non-closed polygon: 
```reason edit
draw(polyline([(-10.0, 10.0), (0.0, -10.0), (10.0, -10.0), (15.0, 0.0)]))
```

Information about bounding box `bbox` of an `image` can be retrieved by following functions, which take an `image` as input. The first 4 functions return a `float` and the rest return a `point`, which is equivalent to a pair of floats.

| Function | Return |
| :-: | :-: |
|`left(image)`| Minimum x-coordinate of corresponding `bbox`|
|`right(image)`| Maximum x-coordinate of corresponding `bbox`|
|`top(image)`|Minium y-coordinate of corresponding `bbox`|
|`bottom(image)`|Maximum y-coordinate of corresponding `bbox`|
|`topLeft(image)`|Top left coordinate of corresponding `bbox`|
|`topRight(image)`|Top right coordinate of corresponding `bbox`|
|`bottomLeft(image)`|Bottom left coordinate of corresponding `bbox`|
|`bottomRight(image)`|Bottom right coordinate of corresponding `bbox`|

Here are some examples: 
```reason edit
let a = rectangle(15., 20.)
left(a)
right(a)
top(a)
bottom(a)
topLeft(a)
topRight(a)
bottomLeft(a)
bottomRight(a)
```

We can also visuallize the bouding box and its center using `showBounds` function, which takes image as input: 

```reason edit
let a = circle(30.)
draw(showBounds(a))
```

We can also construct a shape by specifying a colection of points and the connection between these points (using straight line or curve).
These shapes can be:

* Open-path: using `openPath(pathElements)` function.
* Close-path: using `closedPath(pathElements)` function. 

These two functions take a list of `pathElement` values as input. The `pathElement` type can be
* `MoveTo(point)`
* `LineTo(point)`
* `CurveTo(point, point, point)` 
where point is a pair of floats.

In the following example, we draw an AND gate using `closedPath` function, on top of input and output wires drawn with `openPath`: 
```reason edit
let andGate = ClosedPath([
  MoveTo((-5., -10.)),
  LineTo((0., -10.)),
  CurveTo((5., -10.), (10., -5.), (10., 0.)),
  CurveTo((10., 5.), (5., 10.), (0., 10.)),
  LineTo((-5., 10.))
]) +++ OpenPath([
  MoveTo((-5., -5.)), LineTo((-15., -5.)),
  MoveTo((-5., 5.)), LineTo((-15., 5.)),
  MoveTo((10., 0.)), LineTo((20., 0.))
]);
draw(andGate);
```

Here are corresponding definitions of OR and NOT gates. Note how the NOT gate is built from other primitive geometric shapes:
```reason edit
let orGate = ClosedPath([
  MoveTo((-5., -10.)),
  LineTo((0., -10.)),
  CurveTo((5., -10.), (8., -5.), (10., 0.)),
  CurveTo((8., 5.), (5., 10.), (0., 10.)),
  LineTo((-5., 10.)),
  CurveTo((0., 5.), (0., -5.), (-5., -10.))
]) +++ OpenPath([
  MoveTo((0., -5.)), LineTo((-15., -5.)),
  MoveTo((0., 5.)), LineTo((-15., 5.)),
  MoveTo((10., 0.)), LineTo((20., 0.))
]);
draw(orGate);

let notGate = translate(4., 0., (rotate(90., triangle(20., 14.)) ||| circle(2.)))
  +++ OpenPath([
  MoveTo((-5., 0.)), LineTo((-15., 0.)),
  MoveTo((13., 0.)), LineTo((20., 0.))
]);
draw(notGate);
```

## Section 3. Position and Manipulation
We can control the relative position of 2 images using the following functions: 

| Function | Return | Alternative operation |
| :-: | :-: | :-: |
| beside(a, b) | Image a is on the left of image b. The centers of a and b are aligned | <code>a &#124;&#124;&#124; b</code> |
| above (a, b) | Image a is vertically above image b. The centers of a and b are aligned | `a --- b` |
| on(a, b) | Image a on top of image b. The centers of a and b are superimposed | `a +++ b` |

The operator symbols should remind you of how a and b are arranged; imagine either drawing a line between them (`|` or `-`) or centering one on the other (`+`).

We can also scale, rotate, and translate the image: 


## Section 4. Format
`image` type is formatted using the `Styled` function. 


``` reason edit

```


Here is an ugly example:
```reason edit
let blueFill = img => { Styled(img, [FillColor(Color("blue"))]) };
let wideLines = img => { Styled(img, [LineWidth(3.0)]) };
let redOutline = img => { Styled(img, [LineColor(Color("red"))]) };
let a = blueFill(Ellipse(60.0, 80.0));
let b = wideLines(Rectangle(50.0, 50.0));
let c = Ellipse(30.0, 30.0);
let d = Bounds(Text("Hello"), -24., 24., -7., 7.);
draw(On(Rotate(Scale(d, 5., 5.), 45.),
        redOutline(Above(Beside(a, b), c))));
```

```reason edit
let blueFill = fill(Color("blue"));
let wideLines = strokeWidth(3.0);
let redOutline = stroke(Color("red"));
let a = blueFill(ellipse(60.0, 80.0));
let b = wideLines(square(50.0));
let c = circle(30.0);
let d = setBounds(-24., 24., -7., 7., text("Hello"));
draw(rotate(45., scale(5., d)) +++ redOutline((a ||| b) --- c));
```


Here is an arrow. The `focus` function moves the _focus_ point of the image (the point used
to line up images with `On`, `Beside`, and `Above`).
The first argument of focus is a two-letter value; the first letter is (T)op, (M)iddle, or (B)ottom, and the second is (L)eft, (C)enter, or (R)ight.
The value `ML` says to move the focus to the middle of the left edge of the bounding box, which in this
case is the tail end of the arrow.
We can use the `showBounds` function to visualize the bounding box and focus point.
```reason edit
let arrow = len => {
  strokeWidth(2., focus(ML, OpenPath([
    moveXY(0., 0.),
    lineXY(len, 0.),
    lineXY(len -. 5., 5.),
    moveXY(len, 0.),
    lineXY(len -. 5., -5.)])))
};

draw(arrow(50.))

draw(showBounds(arrow(50.)))

draw(arrow(50.) +++ rotate(-90., arrow(30.)) +++ fill(Color("white"), circle(60.)))
```

Using the arrow, here is a function to visualize a linked list:
```reason edit
let listNode = n => {
  let valueField = solid(Color("black"), text(string_of_int(n))) +++ square(20.);
  let nextField = arrow(20.) +++ square(20.);
  fill(Color("white"), valueField ||| nextField)
};

let rec showList = nums => {
  switch (nums) {
  | [] => solid(Color("black"), circle(5.))
  | [head, ...tail] => listNode(head) ||| showList(tail)
  }
};

draw(showList([1, 2, 3]));
draw(showList([1, 2, 3, 4, 5, 6, 7, 8, 9]));
```
