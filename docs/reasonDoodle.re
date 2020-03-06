type point = (float, float);
type pathElement =
| MoveTo(point)
| LineTo(point)
| CurveTo(point, point, point);
type style = (); /* TODO */
type angle = float; /* TODO */
type image =
| Empty
| Ellipse(float, float)
| Rectangle(float, float)
| Text(string)
| OpenPath(list(pathElement))
| ClosedPath(list(pathElement))
| Beside(image, image)
| Above(image, image)
| Layer(list(image))
| Styled(image, style)
| Translate(image, float, float)
| Rotate(image, angle)
| Scale(image, float, float)
| Bounds(image, float, float, float, float);
let rec width = image => {
  switch (image) {
  | Empty => 0.0
  | Ellipse(w, h) => w
  | Rectangle(w, h) => w
  | Beside(left, right) => width(left) +. width(right)
  | Above(top, bottom) => max(width(top), width(bottom))
  | _ => 0.0 /* TODO */
  }
};
let rec height = image => {
  switch (image) {
  | Empty => 0.0
  | Ellipse(w, h) => h
  | Rectangle(w, h) => h
  | Beside(left, right) => max(height(left), height(right))
  | Above(top, bottom) => height(top) +. height(bottom)
  | _ => 0.0 /* TODO */
  }
};
let draw = image => {
  let rec render = image => {
    switch (image) {
    | Empty => ""
    | Ellipse(width, height) =>
      "<ellipse rx='" ++ string_of_float(width /. 2.)
      ++ "' ry='" ++ string_of_float(height /. 2.)
      ++ "' cx='0' cy='0' />\n"
    | Rectangle(width, height) =>
      "<rect width='" ++ string_of_float(width)
      ++ "' height='" ++ string_of_float(height)
      ++ "' x='" ++ string_of_float(-.width /. 2.)
      ++ "' y='" ++ string_of_float(-.height /. 2.)
      ++ "' />\n"
    | Text(s) =>
      "<text x='0' y='0' font-size='60'"
      ++ " text-anchor='middle' dominant-baseline='middle' fill='white'>"
      ++ s ++ "</text>\n"
    | OpenPath(path) => ""
    | ClosedPath(path) => ""
    | Beside(left, right) => {
        let lw = width(left);
        let rw = width(right);
        let lx = -.rw /. 2.;
        let rx = lw /. 2.;
        "<g transform='translate("
        ++ string_of_float(lx) ++ "0, 0)'>"
        ++ render(left) ++ "</g>\n"
        ++ "<g transform='translate("
        ++ string_of_float(rx) ++ "0, 0)'>"
        ++ render(right) ++ "</g>\n"
      }
    | Above(top, bottom) => {
        let th = height(top);
        let bh = height(bottom);
        let ty = -.bh /. 2.;
        let by = th /. 2.;
        "<g transform='translate(0, "
        ++ string_of_float(ty) ++ "0)'>"
        ++ render(top) ++ "</g>\n"
        ++ "<g transform='translate(0, "
        ++ string_of_float(by) ++ "0)'>"
        ++ render(bottom) ++ "</g>\n"
      }
    | Layer(layers) => ""
    | Styled(img, sty) => ""
    | Translate(img, x, y) => ""
    | Rotate(img, a) => ""
    | Scale(img, scalex, scaley) => ""
    | Bounds(img, xl, xr, yt, yb) => ""
    }
  };

  print_string("<svg viewBox='-100 -100 200 200' width='100%' preserveAspectRatio>\n");
  print_string("<rect x='-100' y='-100' width='100%' height='100%' fill='black' />\n");
  print_string("<circle cx='0' cy='0' r='80' fill='green' />\n");
  let result = render(image);
  print_string(result);
  print_string("</svg>\n");
  result
};
let a = Ellipse(60.0, 60.0);
let b = Rectangle(50.0, 50.0)
let result = draw(Above(a, b));
/* draw(Text("Hello")); */