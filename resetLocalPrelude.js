const prelude = `type point = (float, float);
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
    Printf.sprintf("<text x='0' y='0' text-anchor='middle' dominant-baseline='middle' vector-effect='non-scaling-stroke'>%s</text>", s)
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
  print_string("</g></svg>\\n");
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

let dashed = img => { Styled(img, [Dashed]) };
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
let translateP = (p, img) => {
  let (dx, dy) = p;
  translate(dx, dy, img)
};
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

let color = (c) => { Color(c) };
let rgb = (r, g, b) => { RGBA(r, g, b, 1.0) };
let rgba = (r, b, g, a) => { RGBA(r, g, b, a) };
let hsl = (h, s, l) => { HSLA(h, s, l, 1.0) };
let hsla = (h, s, l, a) => { HSLA(h, s, l, a) };
let moveXY = (x, y) => { MoveTo((x, y)) };
let lineXY = (x, y) => { LineTo((x, y)) };
let curveXY = (c1x, c1y, c2x, c2y, px, py) => { CurveTo((c1x, c1y), (c2x, c2y), (px, py)) };
let curveP = (c1, c2, p) => { CurveTo(c1, c2, p) };
let moveP = p => { MoveTo(p) };
let lineP = p => { LineTo(p) };
module Turtle {
  type state = (point, angle);
  type instruction = Forward(float) | Turn(float) | Branch(list(instruction)) | NoOp;
  let run = instructions => {
    let rec process = (st, i) => {
      switch (i) {
      | Forward(d) => {
          let ((x, y), heading) = st;
          let (dx, dy) = polar(d, heading);
          let p = (x +. dx, y +. dy);
          ((p, heading), [lineP(p)])
        }
      | Turn(a) => {
          let (p, heading) = st;
          ((p, heading +. a), [])
        }
      | Branch(instrs) => {
          let (p, _) = st;
          let branchElts = iterate(st, instrs);
          (st, branchElts @ [moveP(p)])
        }
      | NoOp => (st, [])
      }
    }
    and iterate = (st, instrs) => {
      switch (instrs) {
      | [] => []
      | [i, ...rest] => {
          let (st', elts) = process(st, i);
          elts @ iterate(st', rest) /* TODO use correct tail recursion */
        }
      }
    };
    openPath([moveXY(0., 0.), ...iterate(((0., 0.), 0.), instructions)])
  };
};
`
evaluator.resetLocal = function() {
  evaluator.reset();
  evaluator.reasonSyntax();
  let results = evaluator.execute(prelude);
  results.forEach(r => {
    let {stderr} = r.value;
    if (stderr.trim() !== '') {
      console.log(stderr);
    }
  });
};
evaluator.resetLocal();
