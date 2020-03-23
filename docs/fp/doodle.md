---
id: doodle
title: DPoodle Graphics
---

```reason hidden
type point = (float, float);
type angle = float;
type pathElement =
| MoveTo(point)
| LineTo(point)
| CurveTo(point, point, point);
type color =
| Color(string)
| RGBA(int, int, int, float)
| HSLA(angle, float, float, float);
type fontFamily =
| Mono
| Sans
| Serif;
type fontWeight =
| Bold
| Regular;
type fontStyle =
| Italic
| Normal;
type style =
| LineWidth(float)
| LineColor(color) /* TODO patterns? */
| FillColor(color)
| Dashed
| Font(float, fontFamily, fontWeight, fontStyle);
type image =
| Empty
| Ellipse(float, float)
| Rectangle(float, float)
| Text(string)
| OpenPath(list(pathElement))
| ClosedPath(list(pathElement))
| Beside(image, image)
| Above(image, image)
| On(image, image)
| Styled(image, list(style))
| Translate(image, float, float)
| Rotate(image, angle)
| Scale(image, float, float)
| Bounds(image, float, float, float, float);
type position = TL | TC | TR | ML | MC | MR | BL | BC | BR;
let string_of_color = c => {
  switch (c) {
  | Color(s) => s
  | RGBA(r, g, b, a) =>
    Printf.sprintf("rgba(%d,%d,%d,%f)",
      r, g, b, a)
  | HSLA(h, s, l, a) =>
    Printf.sprintf("hsla(%f,%d%%,%d%%,%f)",
      h, int_of_float(s *. 100.), int_of_float(l *. 100.), a)
  }
};
let string_of_fontFamily = f => {
  switch (f) {
  | Mono => "Roboto Mono, monospace"
  | Sans => "Roboto, sans-serif"
  | Serif => "Lora, serif"
  }
}
let string_of_fontWeight = w => {
  switch (w) {
  | Bold => "bold"
  | Regular => "normal"
  }
}
let string_of_fontStyle = s => {
  switch (s) {
  | Italic => "italic"
  | Normal => "normal"
  }
}
let string_of_style = s => {
  switch (s) {
  | LineWidth(w) =>
    Printf.sprintf("stroke-width='%f'", w)
  | LineColor(c) =>
    Printf.sprintf("stroke='%s'", string_of_color(c))
  | FillColor(c) => 
    Printf.sprintf("fill='%s'", string_of_color(c))
  | Dashed =>
    "stroke-dasharray='4'"
  | Font(size, family, weight, style) =>
    Printf.sprintf("font-size='%frem' font-family='%s' font-weight='%s' font-style='%s'",
      size, string_of_fontFamily(family), string_of_fontWeight(weight), string_of_fontStyle(style))
  }
}
let radians = a => {
  a *. 3.14159265358979 /. 180.0
};
let getPoint = elt => {
  switch (elt) {
  | MoveTo(p) => p
  | LineTo(p) => p
  | CurveTo(_, _, p) => p
  }
};
let rec bbox_of_points = ps => {
  switch (ps) {
  | [] => (0., 0., 0., 0.)
  | [(x, y)] => (x, x, y, y)
  | [(x, y), ...rest] => {
      let (l, r, t, b) = bbox_of_points(rest);
      (min(x, l), max(x, r), min(y, t), max(y, b))
    }
  }
};
let rec bbox = img => {
  switch (img) {
  | Empty => (0., 0., 0., 0.)
  | Ellipse(w, h) => (-.w /. 2., w /. 2., -.h /. 2., h /. 2.)
  | Rectangle(w, h) => (-.w /. 2., w /. 2., -.h /. 2., h /. 2.)
  | Text(_) => (0., 0., 0., 0.)
  | OpenPath(elts) => {
    bbox_of_points(List.map(getPoint, elts))
  }
  | ClosedPath(elts) => {
    bbox_of_points(List.map(getPoint, elts))
  }
  | Beside(l, r) => {
    let (ll, lr, lt, lb) = bbox(l);
    let (rl, rr, rt, rb) = bbox(r);
    let w = (lr -. ll) +. (rr -. rl);
    (-.w /. 2., w /. 2., min(lt, rt), max(lb, rb))
  }
  | Above(t, b) => {
    let (tl, tr, tt, tb) = bbox(t);
    let (bl, br, bt, bb) = bbox(b);
    let h = (tb -. tt) +. (bb -. bt);
    (min(tl, bl), max(tr, br), -.h /. 2., h /. 2.)
  }
  | On(a, b) => {
    let (al, ar, at, ab) = bbox(a);
    let (bl, br, bt, bb) = bbox(b);
    (min(al, bl), max(ar, br), min(at, bt), max(ab, bb))
  }
  | Styled(img, _) => bbox(img)
  | Translate(img, x, y) => {
    let (l, r, t, b) = bbox(img);
    (l +. x, r +. x, t +. y, b +. y)
  }
  | Rotate(img, a) => {
    let (l, r, t, b) = bbox(img);
    let ps = [(l, t), (l, b), (r, t), (r, b)];
    let arad = radians(a);
    let cosa = cos(arad);
    let sina = sin(arad);
    let rot = ((x, y)) => { (x *. cosa -. y *. sina, x *. sina +. y *. cosa) }
    bbox_of_points(List.map(rot, ps))
  }
  | Scale(img, sx, sy) => {
    let (l, r, t, b) = bbox(img);
    (l *. sx, r *. sx, t *. sy, b *. sy)
  }
  | Bounds(_, l, r, t, b) => (l, r, t, b)
  }
};
let left = img => {
	let (l, _, _, _) = bbox(img);
	l
};
let right = img => {
	let (_, r, _, _) = bbox(img);
	r
};
let top = img => {
	let (_, _, t, _) = bbox(img);
	t
};
let bottom = img => {
	let (_, _, _, b) = bbox(img);
	b
};
let width = img => {
	let (l, r, _, _) = bbox(img);
	r -. l
};
let height = img => {
	let (_, _, t, b) = bbox(img);
	b -. t
};
let topLeft = img => {
	let (l, _, t, _) = bbox(img);
	(l, t)
};
let topRight = img => {
	let (_, r, t, _) = bbox(img);
	(r, t)
};
let bottomLeft = img => {
	let (l, _, _, b) = bbox(img);
	(l, b)
};
let bottomRight = img => {
	let (_, r, _, b) = bbox(img);
	(r, b)
};
let rec string_of_path = path => {
  switch (path) {
  | [] => ""
  | [MoveTo((x, y)), ...rest] =>
      Printf.sprintf("M %f %f ", x, y) ++ string_of_path(rest)
  | [LineTo((x, y)), ...rest] =>
      Printf.sprintf("L %f %f ", x, y) ++ string_of_path(rest)
  | [CurveTo((x1, y1), (x2, y2), (x3, y3)), ...rest] =>
      Printf.sprintf("C %f %f, %f %f, %f %f ", x1, y1, x2, y2, x3, y3) ++ string_of_path(rest)
  }
};
let rec render = img => {
  switch (img) {
  | Empty => ""
  | Ellipse(w, h) =>
    Printf.sprintf("<ellipse rx='%f' ry='%f' cx='0' cy='0' />",
      w /. 2., h /. 2.)
  | Rectangle(w, h) =>
    Printf.sprintf("<rect width='%f' height='%f' x='%f' y='%f' />",
      w, h, -.w /. 2., -.h /. 2.)
  | Text(s) =>
    Printf.sprintf("<text x='0' y='0' text-anchor='middle' dominant-baseline='middle'>%s</text>", s)
  | OpenPath(path) =>
    Printf.sprintf("<path d='%s' fill='none' stroke-linejoin='round' stroke-linecap='round' />", string_of_path(path))
  | ClosedPath(path) => 
    Printf.sprintf("<path d='%sZ' stroke-linejoin='round' stroke-linecap='round' />", string_of_path(path))
  | Beside(l, r) => {
      let (ll, lr, _, _) = bbox(l);
      let (rl, rr, _, _) = bbox(r);
      let w = (lr -. ll) +. (rr -. rl);
      Printf.sprintf("<g transform='translate(%f,0)'>%s</g>",
        -.w /. 2. -. ll, render(l))
      ++
      Printf.sprintf("<g transform='translate(%f,0)'>%s</g>",
        w /. 2. -. rr, render(r))
    } 
  | Above(t, b) => {
      let (_, _, tt, tb) = bbox(t);
      let (_, _, bt, bb) = bbox(b);
      let h = (tb -. tt) +. (bb -. bt);
      Printf.sprintf("<g transform='translate(0,%f)'>%s</g>",
        -.h /. 2. -. tt, render(t))
      ++
      Printf.sprintf("<g transform='translate(0,%f)'>%s</g>",
        h /. 2. -. bb, render(b))
    }
  | On(a, b) => render(b) ++ render(a)
  | Styled(img, stys) => {
      let ss = List.map(s => { " " ++ string_of_style(s) }, stys);
      Printf.sprintf("<g %s>%s</g>", List.fold_left((++), "", ss), render(img))
    }
  | Translate(img, x, y) =>
    Printf.sprintf("<g transform='translate(%f,%f)'>%s</g>",
      x, y, render(img))
  | Rotate(img, a) =>
    Printf.sprintf("<g transform='rotate(%f)'>%s</g>",
      a, render(img))
  | Scale(img, sx, sy) =>
    Printf.sprintf("<g transform='scale(%f,%f)'>%s</g>",
      sx, sy, render(img))
  | Bounds(img, _, _, _, _) => render(img)
  }
};
let draw = image => {
  let (l, r, t, b) = bbox(image);
  let w = r -. l;
  let h = b -. t;
  let padw = w *. 0.05;
  let padh = h *. 0.05;
  let newl = min(l -. padw, -100.);
  let newr = max(r +. padw, 100.);
  let newt = t -. padh;
  let newb = b +. padh;
  Printf.printf("<svg viewBox='%f %f %f %f' width='100%%' preserveAspectRatio>",
    newl, newt, newr -. newl, newb -. newt);
  print_string("<g fill='grey' stroke='black' font-family='Roboto Mono, monospace' font-size='1rem'>");
  print_string(render(image));
  print_string("</g></svg>\n");
};
let empty = Empty;
let circle = r => { Ellipse(2. *. r, 2. *. r) };
let ellipse = (w, h) => { Ellipse(w, h) };
let rectangle = (w, h) => { Rectangle(w, h) };
let square = w => { Rectangle(w, w) };
let triangle = (w, h) => { ClosedPath([
    MoveTo((-. w /. 2., h /. 2.)),
    LineTo((0., -. h /. 2.)),
    LineTo((w /. 2., h /. 2.))
  ]) };
let text = s => { Text(s) };
let openPath = elements => { OpenPath(elements) };
let closedPath = elements => { ClosedPath(elements) };
let polar = (r, theta) => {
  let a = radians(theta);
  (r *. cos(a), r *. sin(a))
};
let regularPolygon = (sides, size, initialAngle) => {
  let rotation = 360. /. float_of_int(sides);
  let getPoint = n => polar(size, rotation *. float_of_int(n) +. initialAngle);
  let rec path = n => {
    if (n == 0) []
    else [LineTo(getPoint(n)), ...path(n - 1)]
  };
  ClosedPath([MoveTo(getPoint(sides)), ...path(sides - 1)])
};
let polygon = points => {
  let rec path = points => {
    switch (points) {
    | [] => []
    | [p, ...rest] => [LineTo(p), ...path(rest)]
    }
  };
  switch (points) {
  | [] => Empty
  | [p, ...rest] => ClosedPath([MoveTo(p), ...path(rest)])
  }
};
let polyline = points => {
  let rec path = points => {
    switch (points) {
    | [] => []
    | [p, ...rest] => [LineTo(p), ...path(rest)]
    }
  };
  switch (points) {
  | [] => Empty
  | [p, ...rest] => OpenPath([MoveTo(p), ...path(rest)])
  }
};
let above = (a, b) => { Above(a, b) };
let below = (a, b) => { Above(b, a) };
let beside = (a, b) => { Beside(a, b) };
let on = (a, b) => { On(a, b) };
let under = (a, b) => { On(b, a) };
let (---) = (a, b) => { Above(a, b) };
let (|||) = (a, b) => { Beside(a, b) };
let (+++) = (a, b) => { On(a, b) };
let fill = (c, img) => { Styled(img, [FillColor(c)]) };
let stroke = (c, img) => { Styled(img, [LineColor(c)]) };
let solid = (c, img) => { Styled(img, [FillColor(c), LineColor(c)]) };
let strokeWidth = (w, img) => { Styled(img, [LineWidth(w)]) };
let withFont = (size, family, weight, style, img) => { Styled(img, [Font(size, family, weight, style)]) };
let focus = (pos, img) => {
  let (l, r, t, b) = bbox(img);
  switch (pos) {
  | TL => Translate(img, -.l, -.t)
  | TC => Translate(img, -.(l +. r) /. 2., -.t)
  | TR => Translate(img, -.r, -.t)
  | ML => Translate(img, -.l, -.(t +. b) /. 2.)
  | MC => Translate(img, -.(l +. r) /. 2., -.(t +. b) /. 2.)
  | MR => Translate(img, -.r, -.(t +. b) /. 2.)
  | BL => Translate(img, -.l, -.b)
  | BC => Translate(img, -.(l +. r) /. 2., -.b)
  | BR => Translate(img, -.r, -.b)
  }
};
let rotate = (a, img) => { Rotate(img, a) };
let translate = (dx, dy, img) => { Translate(img, dx, dy) };
let scalexy = (sx, sy, img) => { Scale(img, sx, sy) };
let scale = (s, img) => { Scale(img, s, s) };
let setBounds = (l, r, t, b, img) => { Bounds(img, l, r, t, b) };
let showBounds = img => {
  let (l, r, t, b) = bbox(img);
  let w = r -. l;
  let h = b -. t;
  On(
    Bounds(Styled(
      circle(max(w, h) /. 20.) +++
        OpenPath([MoveTo((-.w /. 10., 0.)), LineTo((w /. 10., 0.))]) +++
        OpenPath([MoveTo((0., -.h /. 10.)), LineTo((0., h /. 10.))]) +++
        Translate(rectangle(w, h), l +. w /. 2., t +. h /. 2.),
      [Dashed, FillColor(Color("none")), LineColor(Color("black")), LineWidth(1.0)]), 0., 0., 0., 0.),
    img
  )
}
let rgb = (r, g, b) => { RGBA(r, g, b, 1.0) };
let rgba = (r, b, g, a) => { RGBA(r, g, b, a) };
let hsl = (h, s, l) => { HSLA(h, s, l, 1.0) };
let hsla = (h, s, l, a) => {HSLA(h, s, l, a) };
let moveXY = (x, y) => { MoveTo((x, y)) };
let lineXY = (x, y) => { LineTo((x, y)) };
let curveXY = (c1x, c1y, c2x, c2y, px, py) => { CurveTo((c1x, c1y), (c2x, c2y), (px, py)) };
let curveP = (c1, c2, p) => { CurveTo(c1, c2, p) };
let moveP = p => { MoveTo(p) };
let lineP = p => { LineTo(p) };
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
