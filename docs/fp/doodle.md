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
type style = (); /* TODO */
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
| Styled(image, style)
| Translate(image, float, float)
| Rotate(image, angle)
| Scale(image, float, float)
| Bounds(image, float, float, float, float);
let rec bbox = img => {
  switch (img) {
  | Empty => (0., 0., 0., 0.)
  | Ellipse(w, h) => (-.w /. 2., w /. 2., -.h /. 2., h /. 2.)
  | Rectangle(w, h) => (-.w /. 2., w /. 2., -.h /. 2., h /. 2.)
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
  | Scale(img, sx, sy) => {
    let (l, r, t, b) = bbox(img);
    (l *. sx, r *. sx, t *. sy, b *. sy)
  }
  | Bounds(_, l, r, t, b) => (l, r, t, b)
  | _ => (0., 0., 0., 0.) /* TODO */
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
  | Styled(img, sty) => ""
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
  print_string("<g fill='grey' stroke='black'>");
  print_string(render(image));
  print_string("</g></svg>");
};
let circle = r => { Ellipse(2. *. r, 2. *. r) };
let ellipse = (w, h) => { Ellipse(w, h) };
let rectangle = (w, h) => { Rectangle(w, h) };
let text = s => { Text(s) };

let rec foo = n => {
  if (n == 0) {
    Empty
  } else {
    On(foo(n - 1), circle(float_of_int(10 * n)))
  }
};
draw(On(Scale(Text("Doodle"), 2., 2.), foo(10)))
```

Here is an example:
```reason edit
let a = ellipse(60.0, 80.0);
let b = rectangle(50.0, 50.0);
let c = circle(30.0);
let d = Text("Hello");
draw(On(Rotate(Scale(d, 5., 5.), 45.),
        Above(Beside(a, b), c)));
```