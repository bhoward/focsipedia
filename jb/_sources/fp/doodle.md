# DPoodle Graphics

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
let logo = withFont(2., Mono, Bold, Normal, stroke(color("none"), fill(color("black"), text("DPoodle")))) +++ logoBackground(50);
draw(logo)
```

## Section 1. Introduction
DPoodle is a graphics library written in ReasonML at DePauw University during Spring 2020.
DPoodle is based on the Doodle graphics library from [Creative Scala](https://creativescala.com/).

## Section 2. `image` type
The basic type of a drawing in DPoodle is `image`. Seven built-in functions used to construct geometric shapes are ellipse, circle, rectangle, square, triangle, polygon, and regularPolygon. The size arguments for all of these functions are of type `float`, plus the `regularPolygon` function also takes the number of sides as an `int`. Every image in DPoodle has a *bounding box*, which is a minimal rectangle that can cover the image. The center of the bounding box by default is at (0, 0). The built-in triangle function creates an isoceles triangle with the base on the bottom edge of the bounding box and the vertex in the middle of the top edge. Detail about the built-in functions to create geometric shape images in DPoodle are in the following table:

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

An `empty` value is use to create an empty image whose bounding box is (0., 0., 0., 0.); it is often useful as a default image when there is nothing to draw, and it is an identity element for the image combination operations described below. The `polyline` function is closely related to `polygon`. A polyline is a non-closed polygon:
```reason edit
draw(polyline([(-10.0, 10.0), (0.0, -10.0), (10.0, -10.0), (15.0, 0.0)]))
```

We can also construct a shape by specifying a colection of points and the connections between these points (using straight line or curve).
These shapes can be:

* Open-path: using `openPath(pathElements)` function.
* Close-path: using `closedPath(pathElements)` function. 

These two functions take a list of `pathElement` values as input. A `pathElement` may be created by the following functions: 
* `moveXY(x, y)`: move to point (x, y), without drawing a line.
* `moveP(p)`: move to point p.
* `lineXY(x, y)`: draw a line from the current point to point (x, y).
* `lineP(p)`: draw a line from the current point to point p. 
* `curveXY(c1x, c1y, c2x, c2y, px, py)`: draw a curve from the current point to point (px, py). The points (c1x, c1y) and (c2x, c2y) are called **control points**; the intuition is that the curve will start out headed toward the first control point, and then approach its destination as if coming from the second control point.
* `curveP(c1, c2, p)`: draw a curve from the current point to point p, with control points c1 and c2. 

Here is an example to help you visualize the control points:
```reason edit
let p1 = (-20., 0.);
let p2 = (20., 0.);
let c1 = (0., -20.);
let c2 = (20., -20.);
let curve = openPath([moveP(p1), curveP(c1, c2, p2)]);
let boundary = openPath([moveP(p1), lineP(c1), moveP(c2), lineP(p2)]);
let label = s => { setBounds(-4., 4., -3., 3., text(s)) };
let labels = stroke(color("none"), fill(color("black"), withFont(0.4, Sans, Regular, Normal,
  translateP(p1, focus(MR, label("p1")))
  +++ translateP(p2, focus(ML, label("p2")))
  +++ translateP(c1, focus(ML, label("c1")))
  +++ translateP(c2, focus(ML, label("c2"))))));
draw(curve +++ dashed(boundary) +++ labels);
```

In the following example, we draw an AND gate using the `closedPath` function, on top of input and output wires drawn with `openPath`: 
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

Information about the bounding box (bbox) of an `image` can be retrieved by following functions, which take an `image` as input. The first 4 functions return a `float` and the rest return a `point`, which is equivalent to a pair of floats.

| Function | Return |
| :-: | :-: |
|`left(image)`| Minimum x-coordinate of corresponding bbox |
|`right(image)`| Maximum x-coordinate of corresponding bbox |
|`top(image)`| Minium y-coordinate of corresponding bbox |
|`bottom(image)`| Maximum y-coordinate of corresponding bbox |
|`topLeft(image)`| Top left point of corresponding bbox |
|`topRight(image)`| Top right point of corresponding bbox |
|`bottomLeft(image)`| Bottom left point of corresponding bbox |
|`bottomRight(image)`| Bottom right point of corresponding bbox |

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

We can also visuallize the bounding box and its center using the `showBounds` function, which takes an image as input: 
```reason edit
let a = circle(30.)
draw(showBounds(a))
```

Elements in an image can also be text. The function `text(string)` is used to create a text image. This function return an image with 0 by 0 bounding box (this is a limitation of the way fonts are handled&mdash;the DPoodle library is not able to calculate an accurate bounding box on its own). Since the `draw(image)` function only renders the area inside of the bounding box, we often need to reset the size of the bounding box for text: `setBounds(left, right, top, bottom, text(string))`. You may have to play around with `showBounds` a bit to choose the correct values for the bounds. Here is an example: 
```reason edit
let d = setBounds(-28., 28., -8., 8., text("Sample"));
draw(showBounds(d));
```

## Section 3. Position and Manipulation
We can combine two images and control their relative positions using the following functions: 

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
| `translate(dx, dy, img)` | Changes in x- and y-coordinates dx and dy, image img | Translate the points of img from (x, y) to (x + dx, y + dy). |
| `translateP(p, img)` | Point p and image img | Translate the origin of img to point p. |
| `scalexy(sx, sy, img)` | Horizontal and vertical scale factors sx and sy, image img | Scale image horizontally by sx and vertically by sy. |
| `scale(s, img)` | Scale factor s and image img | Scale img in both directions by factor s.| 
| `setBounds(l, r, t, b, img)` | Min x, max x , min y, max y of the new bounding box respectively, and the image img | Create a new image that looks just like img, except its bounding box has the specified coordinates. The origin is unchanged.|

For example: 
```reason edit
let a = circle(10.);
draw(translate(0., 10., a) ||| a);
draw(scale(5., a));
```

`Focus(position, img)` is a special case of the `translate(dx, dy, img)` function. It produce a new image based on image img with the origin at the specified point on its bounding box. `position` is a type that has the nine following cases: TL (top left), TC (top center), TR (top right), ML (middle left), MC (middle center), MR (middle right), BL (bottom left), BC (bottom center), BR (bottom right).

``` reason edit
let a = circle(10.)
let b = focus(TL, a)
let c = fill(color("aqua"), b)
draw(showBounds(a) +++ showBounds(c))
```

Every image has a bounding box and a reference point. At the begining when the image is created, the reference point of the image is at the center. Translating an image (via the `translate`, `translateP`, or `focus` functions) translates the whole image but leaves the reference point behind. Think of the reference point as a spot on a table, and the image starts off as a piece of paper centered over that spot. Translating amounts to shifting the paper so that a different point is over the spot. Putting two images together with ||| or --- is like pushing two tables next to each other, lining up their spots horizontally or vertically. The papers come along for the ride and overlap as the tables are shifted. When you're done, you imagine a new combined table with a new spot underneath the overlapped (and now merged) papers.

## Section 4. Format
The `image` type can be formatted using the following functions: 

| Functions | Arguments | Effect |
| :-: | :-: | :-: |
| `fill(c, img)` | Color c (`color`) and `image` img | Fill img with color c. |
| `stroke(c, img)`| Color c (`color`) and `image` img | Change the border of img to color c. |
| `solid(c, img)`| Color c (`color`) and `image` img | Change the border of img and fill it with color c. |
| `strokeWidth(w, img)`| Thickness w (`float`) and `image` img| Change the thickness of img's border to w. |
| `dashed(img)`| image img | Draw the border of img with dashed lines. |
| `withFont(fontSize, fontFamily, fontWeight, fontStyle, img) `| Font size (`float`), font family (`fontFamily`), font weight (`fontWeight`), font style (`fontStyle`), and `image` img | Format the text in img as specified. | 

The type `color` can be generated by one of the following functions:
* `color(c)`: Takes a named CSS Level 4 color (see list below) as its `string` argument.
* `rgb(r, g, b)`: Create a color with the given red, green, and blue components. All arguments should be integers between 0 and 255. 
* `rgba(r, g, b, a)`: Similar to the `rgb(r, g, b)` function but also have a fourth argument which is the `alpha` level. Alpha level determines the opacity of the color and it should be a float between 0 and 1. An alpha of 1.0 is fully opaque, while 0.0 is fully transparent.
* `hsl(h, s, l)`: Create a color with the given hue, saturation, and lightness components. The first argument (hue) should be a float from 0 to 360, representing an angle in the color wheel (0 is red, 120 is green, and 240 is blue). The second argument (saturation) should be a float from 0 to 1, measuring how pure the hue is (1 is fully pure, while 0 is a shade of gray). The third argument (lightness) should be a float from 0 to 1, measuring how close to white (1) or black (0) it is. For example, a fully pure blue is represented by (hue, saturation, lightness) numbers (240., 1., 0.5).
* `hsla(h, s, l, a)`: similar to the `hsl(h, s, l)` function, but also have the alpha level as the `rgba(r, g, b, a)` function. 

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

Arguments for the `withFont(fontSize, fontFamily, fontWeight, fontStyle, img)` function have the following values:
* `fontSize` is a `float`, where 1.0 gives the default size (about 16.0 units from the top of a capital letter to the bottom of a descending stroke).
* `fontFamily` is a type that has 3 cases: Mono, Sans, and Serif.
* `fontWeight` is a type that has 2 cases: Bold and Regular.
* `fontStyle` is a type that has 2 cases: Italic and Normal.

Here are some examples: 
```reason edit
let a = fill(color("blue"), ellipse(60., 80.));
let b = strokeWidth(3., rectangle(50., 50.));
let c = circle(15.);
let d = setBounds(-24., 24., -8., 8., text("Hello"));
draw(rotate(45., scale(5., d))
      +++ stroke(color("red"), (a ||| b) --- c));
```

Here is an example of text formatting: 
```reason edit
let d = withFont(2., Serif, Bold, Italic, setBounds(-30., 30., -20., 20., Text("Hello")));
draw(d);
```

## Section 5. Some Demonstrations
Here is an arrow using `openPath`. This also shows examples of using `focus` and `showBounds`.
```reason edit
let arrow = len => {
  strokeWidth(2., focus(ML, openPath([
    moveXY(0., 0.),
    lineXY(len, 0.),
    lineXY(len -. 5., 5.),
    moveXY(len, 0.),
    lineXY(len -. 5., -5.)])))
};

draw(arrow(40.))

draw(showBounds(arrow(40.)))

draw(arrow(40.) +++ rotate(-90., arrow(50.)) +++ fill(color("white"), circle(60.)))
```

Using the arrow, here is a function to visualize a linked list:
```reason edit
let listNode = n => {
  let valueField = solid(color("black"), text(string_of_int(n))) +++ square(20.);
  let nextField = arrow(20.) +++ square(20.);
  fill(color("white"), valueField ||| nextField)
};

let rec showList = nums => {
  switch (nums) {
  | [] => solid(color("black"), circle(5.))
  | [head, ...tail] => listNode(head) ||| showList(tail)
  }
};

draw(showList([1, 2, 3]));
draw(showList([1, 2, 3, 4, 5, 6, 7, 8, 9]));
```
The second list is smaller because the `draw` function will adjust the scale so that the entire bounding box is displayed on screen.