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
let draw = image => {
  print_string("<svg version='1.1' baseProfile='full' width='300' height='200' xmlns='http://www.w3.org/2000/svg'>\n"); /* TODO change size: 100% by ? */
  print_string("<rect width='100%' height='100%' fill='red' />\n");
  print_string("<circle cx='150' cy='100' r='80' fill='green' />\n");
  print_string("<text x='150' y='125' font-size='60' text-anchor='middle' fill='white'>SVG</text>\n");
  print_string("</svg>\n");
};
draw(Empty);