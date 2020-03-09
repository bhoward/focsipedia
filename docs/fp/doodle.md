---
id: doodle
title: Doodle Graphics
---

```reason hidden
type point = (float, float);
type pathElement =
| MoveTo(point)
| LineTo(point)
| CurveTo(point, point, point);
type color =
| Color(string)
| RGBA(float, float, float, float)
| HSLA(float, float, float, float);
type style =
| LineWidth(float)
| LineColor(color) /* TODO patterns? */
| FillColor(color)
| Dashed; /* TODO: Font(family, size, style, ...) */
type angle = float;
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
let string_of_color = c => {
  switch (c) {
  | Color(s) => s
  | RGBA(r, g, b, a) =>
    Printf.sprintf("rgba(%d,%d,%d,%f)",
      int_of_float(r), int_of_float(g), int_of_float(b), a)
  | HSLA(h, s, l, a) =>
    Printf.sprintf("hsla(%f,%d%%,%d%%,%f)",
      h, int_of_float(s *. 100.), int_of_float(l *. 100.), a)
  }
};
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
  }
}
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
    (ll -. (rr -. rl) /. 2., rr +. (lr -. ll) /. 2., min(lt, rt), max(lb, rb))
  }
  | Above(t, b) => {
    let (tl, tr, tt, tb) = bbox(t);
    let (bl, br, bt, bb) = bbox(b);
    (min(tl, bl), max(tr, br), tt -. (bb -. bt) /. 2., bb +. (tb -. tt) /. 2.)
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
    let arad = a *. 3.14159265358979 /. 180.0;
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
let rec width = img => {
  let (l, r, _, _) = bbox(img);
  r -. l
};
let rec height = img => {
  let (_, _, t, b) = bbox(img);
  b -. t
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
  | OpenPath(path) => "" /* TODO */
  | ClosedPath(path) => "" /* TODO */
  | Beside(l, r) =>
    Printf.sprintf("<g transform='translate(%f,0)'>%s</g>",
      -.width(r) /. 2., render(l))
    ++
    Printf.sprintf("<g transform='translate(%f,0)'>%s</g>",
      width(l) /. 2., render(r))
  | Above(t, b) =>
    Printf.sprintf("<g transform='translate(0,%f)'>%s</g>",
      -.height(b) /. 2., render(t))
    ++
    Printf.sprintf("<g transform='translate(0,%f)'>%s</g>",
      height(t) /. 2., render(b))
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
  print_string("<svg viewBox='-100 -100 200 200' width='100%' preserveAspectRatio>");
  print_string("<g fill='grey' stroke='black' font-size='14'>");
  print_string(render(image));
  print_string("</g></svg>");
};
let circle = r => { Ellipse(2. *. r, 2. *. r) };
let ellipse = (w, h) => { Ellipse(w, h) };
let rectangle = (w, h) => { Rectangle(w, h) };
let text = s => { Text(s) };
let showBounds = img => {
  let (l, r, t, b) = bbox(img);
  let w = r -. l;
  let h = b -. t;
  On(
    Styled(
      On(
        circle(10.), /* TODO add the crosshairs */
        Translate(rectangle(w, h), l +. w /. 2., t +. h /. 2.)),
      [Dashed, FillColor(Color("none")), LineColor(Color("black")), LineWidth(1.0)]),
    img
  )
}

let rec foo = n => {
  if (n == 0) {
    Empty
  } else {
    On(foo(n - 1), Styled(circle(float_of_int(10 * n)),
      [FillColor(HSLA(float_of_int(24 * n), 1.0, 0.5, 1.0))]))
  }
};
draw(On(Scale(Styled(Text("DPoodle"), [FillColor(Color("black"))]), 2.1, 2.1), foo(10)))
```

Here is an ugly example:
```reason edit
let blueFill = img => { Styled(img, [FillColor(Color("blue"))]) };
let wideLines = img => { Styled(img, [LineWidth(3.0)]) };
let redOutline = img => { Styled(img, [LineColor(Color("red"))]) };
let a = blueFill(ellipse(60.0, 80.0));
let b = wideLines(rectangle(50.0, 50.0));
let c = circle(30.0);
let d = Text("Hello");
draw(On(Rotate(Scale(d, 5., 5.), 45.),
        redOutline(Above(Beside(a, b), c))));
```