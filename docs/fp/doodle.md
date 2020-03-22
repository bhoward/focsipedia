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
let width = img => {
  let (l, r, _, _) = bbox(img);
  r -. l
};
let height = img => {
  let (_, _, t, b) = bbox(img);
  b -. t
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
let (---) = (a, b) => { Above(a, b) };
let (|||) = (a, b) => { Beside(a, b) };
let (***) = (a, b) => { On(a, b) };
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
      circle(max(w, h) /. 20.) ***
        OpenPath([MoveTo((-.w /. 10., 0.)), LineTo((w /. 10., 0.))]) ***
        OpenPath([MoveTo((0., -.h /. 10.)), LineTo((0., h /. 10.))]) ***
        Translate(rectangle(w, h), l +. w /. 2., t +. h /. 2.),
      [Dashed, FillColor(Color("none")), LineColor(Color("black")), LineWidth(1.0)]), 0., 0., 0., 0.),
    img
  )
}
let polar = (r, theta) => {
  let a = radians(theta);
  (r *. cos(a), r *. sin(a))
};
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
let rec circles = n => {
  if (n == 0) {
    Empty
  } else {
    let r = 10.0 *. sqrt(float_of_int(4 * n));
    circles(n - 1) ***
      solid(hsl(float_of_int(12 * n), 1.0, 0.5), ellipse(2. *. r, r))
  }
};
let logo = withFont(2., Mono, Bold, Normal, stroke(Color("none"), fill(Color("black"), text("DPoodle")))) *** circles(50);
draw(logo)
```

Based on the Doodle graphics library from [Creative Scala](https://creativescala.com/).

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

Here is the same with operators and other shortcuts:
* `a ||| b` is `Beside(a, b)`
* `a --- b` is `Above(a, b)`
* `a *** b` is `On(a, b)`
```reason edit
let blueFill = fill(Color("blue"));
let wideLines = strokeWidth(3.0);
let redOutline = stroke(Color("red"));
let a = blueFill(ellipse(60.0, 80.0));
let b = wideLines(square(50.0));
let c = circle(30.0);
let d = setBounds(-24., 24., -7., 7., text("Hello"));
draw(rotate(45., scale(5., d)) *** redOutline((a ||| b) --- c));
```

Here is an example of drawing a polygon using a closed path and polar coordinates:
```reason edit
let polygon = (sides, size, initialAngle) => {
  let rotation = 360. /. float_of_int(sides);
  let getPoint = n => polar(size, rotation *. float_of_int(n) +. initialAngle);
  let rec path = n => {
    if (n == 0) {
      []
    } else {
      [lineP(getPoint(n)), ...path(n - 1)]
    }
  };
  ClosedPath([moveP(getPoint(sides)), ...path(sides - 1)])
};

draw(solid(Color("green"), polygon(6, 30., 90.)));
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

draw(arrow(50.) *** rotate(-90., arrow(30.)) *** fill(Color("white"), circle(60.)))
```

Using the arrow, here is a function to visualize a linked list:
```reason edit
let listNode = n => {
  let valueField = solid(Color("black"), text(string_of_int(n))) *** square(20.);
  let nextField = arrow(20.) *** square(20.);
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