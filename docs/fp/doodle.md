---
id: doodle
title: Doodle Graphics
---

```scala mdoc:passthrough
import doodle.core.*
import doodle.image.*
import doodle.image.syntax.all.*
import doodle.image.syntax.core.*
import doodle.java2d.*
import doodle.core.font.*
import edu.depauw.bhoward.RenderFile

def logoBackground(n: Int): Image = {
  if n == 0 then Image.empty
  else
    val r = 20 * math.sqrt(4 * n)
    logoBackground(n - 1) `on` Image.circle(r).scale(2, 1).fillColor(Color.hsl(12.degrees * n, 1, 0.5)).noStroke
}

val f = Font.defaultSansSerif.bold.size(60)
val logo = Image.text("Doodle!").font(f) `on` logoBackground(50)
RenderFile(logo, "logo.png")
```

## Introduction
We will be using the [Doodle](https://www.creativescala.org/doodle/) graphics library, which accompanies the
book [Creative Scala](https://www.creativescala.org/creative-scala/) by Dave Gurnell and Noel Welsh.

One way to work with the library is to make your own fork of the GitHub repository
https://github.com/bhoward/creative-scala-template.
You can either clone it to your local machine and run the SBT console there, or create a GitHub codespace and
run it on the web.
Instructions for both approaches are in the README file within the repository.

The remainder of this page is a reference to the Doodle library, plus some examples.
Substantial parts of this were co-written by [Sang Truong](https://cs.stanford.edu/~sttruong/) (DePauw 2021).

## The `Image` type
The basic type of a drawing in Doodle is `Image`.
Some built-in functions used to construct geometric shapes are `circle`, `rectangle`, `triangle`, `regularPolygon`, `star`, and `rightArrow`.
There are also some special cases and variations: `square`, `roundedRectangle`, `equilateralTriangle`, `arc`, `pie`, and `line`.
The size arguments for all of these functions are of type `Double`, plus the `regularPolygon` and `star` functions also take the number of vertices as an `Int`.
The `arc` and `pie` functions also takes an argument of type `Angle` (see below).
Every image in Doodle has a **bounding box**, which is a minimal rectangle that can cover the image.
The center of the bounding box by default is at (0, 0).
The built-in triangle function creates an isoceles triangle with the base on the bottom edge of the bounding box and the vertex in the middle of the top edge.
Details about the built-in functions to create geometric shapes in Doodle are in the following table:

| Function | Argument(s) | Bounding box size |
| :-: | :-: | :-: |
| `Image.rectangle(w, h)`  | Width (w) and Height (h) | $w\times h$ |
| `Image.triangle(w, h)`| Base (w) and Height (h)| $w\times h$ |
| `Image.circle(d)` | Diameter (d)  | $d\times d$ |
| `Image.regularPolygon(n, r)`| Number of sides (n), Distance from center to vertex (r) | $2r\times 2r$ (roughly) |
| `Image.star(n, r1, r2)` | Number of sides (n), Outer radius (r1), Inner radius (r2) | $2r_1\times 2r_1$ (roughly) |
| `Image.rightArrow(w, h)` | Width (w) and Height (h) | $w\times h$ |
| `Image.square(w)`  | Side length (w)  | $w\times w$ |
| `Image.roundedRectangle(w, h, r)` | Width (w), Height (h), and Corner radius (r) | $w\times h$ |
| `Image.equilateralTriangle(w)` | Side length (w) | $w\times h\frac{\sqrt{3}}{2}$ |
| `Image.arc(d, theta)` | Diameter (d) and Angle extent (theta) | varies |
| `Image.pie(d, theta)` | Diameter (d) and Angle extent (theta) | varies |
| `Image.line(x, y)` | Horizontal (x) and Vertical (y) | $x\times y$ |

Method `.draw()` is used to display the `Image`:
```scala
val row1 = Image.rectangle(100, 50) `beside`
  Image.triangle(50, 100) `beside`
  Image.circle(100) `beside`
  Image.regularPolygon(6, 50) `beside`
  Image.star(7, 50, 20) `beside`
  Image.rightArrow(100, 50)
val row2 = Image.square(100) `beside`
  Image.roundedRectangle(100, 50, 10) `beside`
  Image.equilateralTriangle(100) `beside`
  Image.arc(100, 60.degrees) `beside`
  Image.pie(100, 60.degrees) `beside`
  Image.line(100, 50)
val image = row1 `above` row2
image.draw()
```
```scala mdoc:passthrough
val row1 = Image.rectangle(100, 50) `beside`
  Image.triangle(50, 100) `beside`
  Image.circle(100) `beside`
  Image.regularPolygon(6, 50) `beside`
  Image.star(7, 50, 20) `beside`
  Image.rightArrow(100, 50)
val row2 = Image.square(100) `beside`
  Image.roundedRectangle(100, 50, 10) `beside`
  Image.equilateralTriangle(100) `beside`
  Image.arc(100, 60.degrees) `beside`
  Image.pie(100, 60.degrees) `beside`
  Image.line(100, 50)
val image = row1 `above` row2
RenderFile(image, "shapes.png")
```

The value `Image.empty` is used to create an empty image with a zero-size bounding box;
it is often useful as a default image when there is nothing to draw, and it is an identity element for the image combination operations described below.

### Text

Another kind of primitive image is text.
By default, `Image.text(s)` gives you the string `s` rendered in a plain 12-point sans-serif font.
You can change the font with the `font` method, which takes an object of type `Font`.
There are two predefined `Font` values: `Font.defaultSansSerif` and `Font.defaultSerif`.
They may be modified with methods `bold`, `italic`, and `size(p)`, where `p` is an integer point size.

You can also create a `Font` object by specifying four values: `FontFamily`, `FontStyle`, `FontWeight`, and `FontSize`.
In addition to `FontFamily.serif` and `FontFamily.sansSerif`, there are `FontFamily.monospaced` and `FontFamily.named(s)`,
where `s` is a string giving the name of a font on the machine where Scala is running; this will typically include such
standards as `"Helvetica"` and `"Times"`, but this is not guaranteed.
The `FontStyle` can be `FontStyle.normal` or `FontStyle.italic`; the `FontWeight` can be `FontWeight.normal` or `FontWeight.bold`.
For the `FontSize`, you specify the point size `p` with the value `FontSize.points(p)`.
Putting this all together, you might choose a 24-point monospaced italic font with
`Font(FontFamily.monospaced, FontStyle.italic, FontWeight.normal, FontSize.points(24))`.

```scala mdoc:silent
val textImage =
  Image.text("Hello World!").font(Font.defaultSerif.size(36).bold) `above`
  Image.text("Lorem ipsum").font(
    Font(FontFamily.monospaced, FontStyle.italic, FontWeight.normal, FontSize.points(24)))
```
```scala mdoc:passthrough
RenderFile(textImage, "text.png")
```

### Paths

We can make more general shapes out of sequences of instructions of the following forms:
* Move to a given point;
* Draw a line from the current point to a given point;
* Draw a curve (with certain properties) from the current point to a given point.

We refer to such a sequence as a **path**.
A path may be either **open** or **closed**; a closed path will include a line from the ending point back to the beginning if one is not specified.
We create a path in Doodle with the function `Image.path(p)`, where `p` is a value describing the sequence of instructions.

One way to construct such a value is to start with either `OpenPath.empty` or `ClosedPath.empty`, and then apply a chain of methods:
* `moveTo(point)`, `moveTo(x, y)`, or `moveTo(r, theta)`: move to the given point (details below);
* `lineTo(point)`, `lineTo(x, y)`, or `lineTo(r, theta)`: draw a line to the given point;
* `curveTo(cp1, cp2, point)`, `curveTo(cp1x, cp1y, cp2x, cp2y, px, py)`, or `curveTo(r1, t1, r2, t2, r, theta)`: draw a Bézier curve to the given point; 
`cp1` is the first **control point**, which determines the starting direction of the curve from the initial point, while `cp2` is the second control point,
which determines the direction heading into the destination, `point`.

In each of these methods, the points may be specified as a `Point` object, such as `Point(10, 20)` (this is 10 units right, and 20 units up, from the origin),
or as separate `x` and `y` arguments of type `Double`, or as polar coordinates `r` and `theta`, where `r` is a `Double` and `theta` is an `Angle`
(measured counter-clockwise from the positive `x` axis).
An `Angle` value may be constructed by giving a `Double` followed by either `.degrees`, `.radians`, or `.turns`&mdash;the values `360.degrees`, `2 * math.Pi.radians`,
and `1.turns` all represent one complete turn around a circle.

Here is an example of using a closed path to draw an AND gate, on top of input and output wires drawn with `openPath`:
```scala mdoc:silent
val andGate = Image.path(ClosedPath.empty
  .moveTo(-15, -30)
  .lineTo(0, -30)
  .curveTo(Point(15, -30), Point(30, -15), Point(30, 0))
  .curveTo(Point(30, 15), Point(15, 30), Point(0, 30))
  .lineTo(-15, 30))
val andWires = Image.path(OpenPath.empty
  .moveTo(-15, -15).lineTo(-45, -15)
  .moveTo(-15, 15).lineTo(-45, 15)
  .moveTo(30, 0).lineTo(60, 0))
val andImage = andGate `on` andWires
```
```scala mdoc:passthrough
RenderFile(andImage, "andGate.png")
```

Here is an example to help you visualize the Bézier control points:
```scala mdoc:silent
val p1 = Point(-60, 0)
val p2 = Point(60, 0)
val cp1 = Point(0, -60)
val cp2 = Point(60, -60)
val curve = Image.path(OpenPath.empty
  .moveTo(p1).curveTo(cp1, cp2, p2))
val boundary = Image.path(OpenPath.empty
  .moveTo(p1).lineTo(cp1)
  .moveTo(cp2).lineTo(p2)).strokeDash(List(4, 4))
val labels = Image.text("p1").originAt(Landmark.bottomCenter).at(p1) `on`
  Image.text("p2").originAt(Landmark.bottomCenter).at(p2) `on`
  Image.text("cp1").originAt(Landmark.topCenter).at(cp1) `on`
  Image.text("cp2").originAt(Landmark.topCenter).at(cp2)
val bezierImage = curve `on` boundary `on` labels
```
```scala mdoc:passthrough
RenderFile(bezierImage, "bezier.png")
```

TODO remember to do interpolatingSpline

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

## Position and Manipulation
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

## Styles
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

## Some Demonstrations
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