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
| `beside(a, b)` | Image a is on the left of image b. The centers of a and b are aligned | <code>a &#124;&#124;&#124; b</code> |
| `above (a, b)` | Image a is vertically above image b. The centers of a and b are aligned | `a --- b` |
| `on(a, b)` | Image a on top of image b. The centers of a and b are superimposed | `a +++ b` |

The operator symbols should remind you of how a and b are arranged; imagine either drawing a line between them (`|` or `-`) or centering one on the other (`+`).

We can also scale, rotate, and translate the image: 

| Function | Arguments | Effect |
| :-: | :-: | :-: |
| `rotate(a, img)` | Angle a (degrees) and image img | Rotate img by angle a clockwise. |
| `translate(dx, dy, img)` | Changes in x- and y-coordinates dx and dy, image img | Translate the points of img from (x, y) to (x + dx, y + dy).|
| `translateP(p, img)` | Point p and image img | Translate the origin of img to point p. |
| `scalexy(sx, sy, img)` | Horizontal and vertical scale factors sx and sy, image img | Scale image horizontally by sx and vertically by sy.|
| `scale(s, img)` | Scale factor s and image img | Scale img in both directions by factor s.| 

For example: 
```reason edit
let a = circle(10.);
draw(translate(0., 10., a) ||| a);
draw(scale(5., a));
```

## Section 4. Format
The `image` type can be formatted using the `Styled` constructor.
In addition to an image `img`, the `Styled` function take a list as its argument.
Elements of this list can be these following values: 

| `Styled` list element | Argument | Effect |
| :-: | :-: | :-: |
| `LineWidth(float)` | A float | Use the specified border thickness. |
| `LineColor(color)` | A `color` type | Use the specified border color. |
| `FillColor(color)` | A `color` type | Use the specified fill color. |
| `Dashed` | None | Draw the border with dashed lines. |

The type `color` can be generated by one of the following constructors: 
* `Color(string)`: Takes a named CSS Level 4 color (see list below) as its argument. 
* `RGBA(int, int, int, float)`: Create a color with the given red, green, and blue components. The first 3 arguments should be ints between 0 and 255. The fourth argument is the `alpha` level, which determines the opacity of the color; it should be a float between 0 and 1. An alpha of 1.0 is fully opaque, while 0.0 is fully transparent.
* `HSLA(angle, float, float, float)`: Create a color with the given hue, saturation, and lightness components. The first argument (hue) should be a float from 0 to 360, representing an angle in the color wheel (0 is red, 120 is green, and 240 is blue). The second argument (saturation) should be a float from 0 to 1, measuring how pure the hue is (1 is fully pure, while 0 is a shade of gray). The third argument (lightness) should be a float from 0 to 1, measuring how close to white (1) or black (0) it is. For example, a fully pure blue is represented by (hue, saturation, lightness) numbers (240., 1., 0.5). The last argument is the alpha value, as in RGBA.

Here are the known named colors:

| | | | |
| :- | :- | :- | :- |
| transparent | aliceBlue | antiqueWhite | aqua |
| aquamarine | azure | beige | bisque |
| black | blanchedAlmond | blue | blueViolet |
| brown | burlyWood | cadetBlue | chartreuse |
| chocolate | coral | cornflowerBlue | cornSilk |
| cyan | darkBlue | darkCyan | darkGoldenrod |
| darkGray | darkGrey | darkGreen | darkKhaki |
| darkMagenta | darkOliveGreen | darkOrange | darkOrchid |
| darkRed | darkSalmon | darkSeaGreen | darkSlateBlue |
| darkSlateGray | darkSlateGrey | darkTurquoise | darkViolet |
| deepPink | deepSkyBlue | dimGray | dimGrey |
| dodgerBlue | fireBrick | floralWhite | forestGreen |
| fuchsia | gainsboro | ghostWhite | gold |
| goldenrod | gray | grey | green |
| greenYellow | honeydew | hotpink | indianRed |
| indigo | ivory | khaki | lavender |
| lavenderBlush | lawngreen | lemonChiffon | lightBlue |
| lightCoral | lightCyan | lightGoldenrodYellow | lightGray |
| lightGrey | lightGreen | lightPink | lightSalmon |
| lightSeaGreen | lightSkyBlue | lightSlateGray | lightSlateGrey |
| lightSteelBlue | lightYellow | lime | limeGreen |
| linen | magenta | maroon | mediumAquamarine |
| mediumBlue | mediumOrchid | mediumPurple | mediumSeaGreen |
| mediumSlateBlue | mediumSpringGreen | mediumTurquoise | mediumVioletRed |
| midnightBlue | mintCream | mistyRose | moccasin |
| navajoWhite | navy | oldLace | olive |
| oliveDrab | orange | orangeRed | orchid |
| paleGoldenrod | paleGreen | paleTurquoise | paleVioletRed |
| papayaWhip | peachPuff | peru | pink |
| plum | powderBlue | purple | rebeccaPurple |
| red | rosyBrown | royalBlue | saddleBrown |
| salmon | sandyBrown | seaGreen | seaShell |
| sienna | silver | skyBlue | slateBlue |
| slateGray | slateGrey | snow | springGreen |
| steelBlue | tan | teal | thistle |
| tomato | turquoise | violet | wheat |
| white | whiteSmoke | yellow | yellowGreen |

Here are some examples: 
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

## Section 5. Some applications
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
