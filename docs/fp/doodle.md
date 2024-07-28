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

## Basic Types

When working with graphics, we will need some basic types beyond `Int`, `Double`, and `String`.
Although we could use `Double` to describe **angles**, it will be helpful to have a separate `Angle` type, which
may be thought of as a `Double` together with a "unit" (_e.g._, degrees or radians).
The Doodle library defines methods `degrees`, `radians`, and `spins` as extensions on the `Double` type, so
that the values `360.degrees`, `2 * math.Pi.radians`, and `1.turns` all represent one complete turn around a circle.

**Points** in two dimensions can be specified by two coordinates, `x` and `y`, where we adopt the convention that
`x` increases from left to right, while `y` increases from bottom to top
(the location of the origin will be discussed later).
Again, these could just be given by two `Double` values, but Doodle introduces a `Point` type with two constructors:
* `Point(x, y)` creates a Cartesian point from `Double` values `x` and `y`, while
* `Point(r, theta)` creates a point in polar coordinates, where `r` is a `Double` giving the distance from the origin,
and `theta` is an `Angle` giving the counter-clockwise angle from the `x`-axis.

For example, `Point(100, 0.degrees)` is the same as `Point(100, 0)`, while `Point(100, math.Pi.radians / 2)` and
`Point(100, 0.25.turns)` are both the same as `Point(0, 100)`.

## The `Image` type
The fundamental type of a drawing in Doodle is `Image`.[^1]
Some built-in functions used to construct geometric shapes are `circle`, `rectangle`, `triangle`, `regularPolygon`, `star`, and `rightArrow`.
There are also some special cases and variations: `square`, `roundedRectangle`, `equilateralTriangle`, `arc`, `pie`, and `line`.
The size arguments for all of these functions are of type `Double`, plus the `regularPolygon` and `star` functions also take the number of vertices as an `Int`.
The `arc` and `pie` functions also take an argument of type `Angle`, as discussed above.
Every image in Doodle has a **bounding box**, which is a minimal rectangle that can cover the image.
The center of the bounding box by default is at (0, 0), the **origin** for that image (exceptions include
the equilateral triangle, whose origin is the center of the triangle, and the arc and pie shapes, whose origin is
the center of the circle).
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

[^1]: The Doodle library also has a type called `Picture` which parallels many of the features of `Image`, but which
has some more advanced capabilities.
We will not be discussing this further; see the
[Doodle documentation](https://www.creativescala.org/doodle/) for details.

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
* `curveTo(cp1, cp2, point)`, `curveTo(cp1x, cp1y, cp2x, cp2y, px, py)`, or `curveTo(r1, t1, r2, t2, r, theta)`: draw a [Bézier curve](https://en.wikipedia.org/wiki/B%C3%A9zier_curve) to the given point; 
`cp1` is the first **control point**, which determines the starting direction of the curve from the initial point, while `cp2` is the second control point,
which determines the direction heading into the destination, `point`.

As a convenience, each of these methods allows the points to be specified as a `Point` object
or as separate Cartesian coordinates `x` and `y`, or as polar coordinates `r` and `theta`.

For some purposes, it is more convenient to construct a path value from a list of `PathElement` objects.
For example, instead of
```scala
OpenPath.empty.moveTo(100, 0).lineTo(100, 45.degrees)
```
you can do the following:
```scala
val elements = List(PathElement.moveTo(100, 0), PathElement.lineTo(100, 45.degrees))
OpenPath(elements)
```
The advantage of this form is that all of our usual operations on lists are available
to work with the sequence of instructions before turning them into a path.

Here is an example to help you visualize the Bézier control points.
Note how the distance to the control point affects how quickly the curve diverges from that direction:
```scala mdoc:silent
def cpDiagram(p1: Point, p2: Point, cp1: Point, cp2: Point): Image = {
  val curve = Image.path(OpenPath.empty
    .moveTo(p1).curveTo(cp1, cp2, p2))
  val boundary = Image.path(OpenPath.empty
    .moveTo(p1).lineTo(cp1)
    .moveTo(cp2).lineTo(p2)).strokeDash(List(4, 4))
  val labels = Image.text("p1").originAt(Landmark.bottomCenter).at(p1) `on`
    Image.text("p2").originAt(Landmark.bottomCenter).at(p2) `on`
    Image.text("cp1").originAt(Landmark.topCenter).at(cp1) `on`
    Image.text("cp2").originAt(Landmark.topCenter).at(cp2)
  curve `on` boundary `on` labels
}
val bezierImage1 = cpDiagram(Point(-60, 0), Point(60, 0), Point(0, -60), Point(60, -30))
val bezierImage2 = cpDiagram(Point(-60, 0), Point(60, 0), Point(0, -60), Point(60, -90))
val bezierImage = bezierImage1 `beside` Image.empty.size(20, 0) `beside` bezierImage2
```
```scala mdoc:passthrough
RenderFile(bezierImage, "bezier.png")
```

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

The origin for a path is the starting point $(0, 0)$, and the bounding box is just large enough to contain all
of the points of the path.

A final way to construct a path image is to fit a **spline** curve to a list of points:
```scala mdoc:silent
val points = for (x <- 0 to 360) yield Point(x, x.degrees.sin * 100)
val sineImage = Image.interpolatingSpline(points)
```
```scala mdoc:passthrough
RenderFile(sineImage, "sineWave.png")
```

## Position and Manipulation

Of course, the real interest of a graphics library is not just in the basic shapes, but
in how to combine them into larger images.
Since an `Image` is a type of value that we can construct and manipulate, we may use the full
machinery of the Scala language to develop functions that build complex images **compositionally**,
allowing us to use the substitution model to understand what the finished `Image` will be in terms
of its component parts.

Two images may be combined with three primary operations:
* Overlaying: `image1.on(image2)` lines up the origin of `image1` over the origin of `image2`;
* Horizontal joining: `image1.beside(image2)` lines up the right edge of the bounding box of `image1`
with the left edge of that of `image2`; and
* Vertical joining: `image1.above(image2)` lines up the bottom edge of the bounding box of `image1`
with the top edge of that of `image2`.

For `image1.beside(image2)`, the images are shifted up or down so that their origins are on a horizontal line,
while for `image1.above(image2)` the origins will line up vertically.
In all cases, a new bounding box will be computed that contains both images, and its origin will be in the center.

As a convenience, Scala permits a method call such as `a.on(b)` to be written in **operator form**
as ``a `on` b``; we will generally use this form.
Doodle also provides two additional methods, `under` and `below`, which are just `on` and `above` with the arguments
swapped: ``a `under` b`` is the same as ``b `on` a``, and ``a `below` b`` is the same as ``b `above` a``.

To help visualize the role of origin and bounding box, the `Image` type provides the method `debug`,
which draws a visible bounding box and puts a small circle on the origin.
Here is an example of putting a circle beside an equilateral triangle, with `debug` used to show the
individual shapes and then the result:
```scala mdoc:silent
val circle = Image.circle(100)
val triangle = Image.equilateralTriangle(100)
val result = circle `beside` triangle
val space = Image.empty.size(20, 20)
val inputs = circle.debug `above` space `above` triangle.debug
val debugDemo = inputs `beside` space `beside` result.debug
```
```scala mdoc:passthrough
RenderFile(debugDemo, "debugDemo.png")
```

We may modify the bounding box with the methods `size` and `margin`:
* `image.size(width, height)` replaces the current box with one having the given dimensions, centered on the origin;
* `image.margin(top, right, bottom, left)` expands the bounding box by the given amounts in each direction
(a negative amount will shrink the box on that side);
* `image.margin(w, h)` is equivalent to `image.margin(h, w, h, w)`, so it expands by `w` both left and right, and
by `h` both top and bottom; and
* `image.margin(s)` is equivalent to `image.margin(s, s, s, s)`, adding an extra space `s` on all sides.

In the example above, we used `Image.empty.size(20, 20)` to create an empty image of size 20 by 20, to use as a spacer.
We would have gotten the same result with `Image.empty.margin(10)`.

TODO now do originAt, and landmarks

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

We can also visuallize the bounding box and its center using the `showBounds` function, which takes an image as input: 
```reason edit
let a = circle(30.)
draw(showBounds(a))
```

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