# Scala Doodle

This is the code for the DePauw Scala version of the Doodle library (as used on [scalafiddle.io](https://scalafiddle.io/sf/gDzN6Mw/37)):

```scala
import fiddle.Fiddle, Fiddle.println
import scalajs.js

@js.annotation.JSExportTopLevel("ScalaFiddle")
object ScalaFiddle {
  import org.scalajs.dom.CanvasRenderingContext2D
  
  sealed trait Image {
    def left: Double
    def right: Double
    def top: Double
    def bottom: Double
    def width: Double = right - left
    def height: Double = bottom - top
    def render: Unit
    def draw: Unit = Translate(this, 10-left, 10-top).lineColor(Color.black).fillColor(Color.transparent).render
    
    def beside(that: Image): Image = Beside(this, that)
    def above(that: Image): Image = Above(this, that)
    def below(that: Image): Image = Above(that, this)
    def on(that: Image): Image = Layer(that, this)
    def under(that: Image): Image = Layer(this, that)
    
    def fillColor(c: Pattern): Image = Styled(this, FillColor(c))
    def lineColor(c: Pattern): Image = Styled(this, LineColor(c))
    def lineWidth(w: Double): Image = Styled(this, LineWidth(w))
    def color(c: Pattern): Image = Styled(Styled(this, FillColor(c)), LineColor(c))
    def font(value: String): Image = Styled(this, Font(value))
    def dashed: Image = Styled(this, Dashed)
    
    def bounds(left: Double, right: Double, top: Double, bottom: Double): Image = Bounds(this, left, right, top, bottom)
    def resize(w: Double, h: Double): Image = Bounds(this, -w/2, w/2, -h/2, h/2)
    def recenter: Image = Translate(this, -(left + right)/2, -(top + bottom)/2)
    
    def showBounds: Image = this under (
      Rectangle(width, height).translate(left + width/2, top + height/2) under
      Circle(10) under
      Path(List(MoveTo(Point(-20, 0)), LineTo(Point(20, 0))), false) under
      Path(List(MoveTo(Point(0, -20)), LineTo(Point(0, 20))), false)
    ).lineColor(Color.black).dashed.resize(0, 0)
    
    def translate(x: Double, y: Double): Image = Translate(this, x, y)
    def at(x: Double, y: Double): Image = Translate(this, x, y)
    def at(p: Point): Image = Translate(this, p.x, p.y)
    def at(v: Vec): Image = Translate(this, v.x, v.y)
    
    def rotate(angle: Angle): Image = Rotate(this, angle)
    def scale(factor: Double): Image = Scale(this, factor, factor)
    def scale(xfactor: Double, yfactor: Double): Image = Scale(this, xfactor, yfactor)
    
    def byTopLeft: Image = Translate(this, -left, -top)
    def byBottomLeft: Image = Translate(this, -left, -bottom)
    def byTopRight: Image = Translate(this, -right, -top)
    def byBottomRight: Image = Translate(this, -right, -bottom)
    def byTop: Image = Translate(this, 0, -top)
    def byBottom: Image = Translate(this, 0, -bottom)
    def byLeft: Image = Translate(this, -left, 0)
    def byRight: Image = Translate(this, -right, 0)
    
    def topLeft: Point = Point(left, top)
    def bottomLeft: Point = Point(left, bottom)
    def topRight: Point = Point(right, top)
    def bottomRight: Point = Point(right, bottom)
  }
  
  object Image {
    def circle(radius: Double): Image = Circle(radius)
    def rectangle(width: Double, height: Double): Image = Rectangle(width, height)
    def triangle(width: Double, height: Double): Image = Triangle(width, height)
    def ellipse(width: Double, height: Double): Image = Ellipse(width, height)
    def openPath(path: List[PathElement]): Image = Path(path, false)
    def closedPath(path: List[PathElement]): Image = Path(path, true)
    def text(string: String): Image = Text(string)
    def empty: Image = Rectangle(0, 0)
  }
  
  import Image._

  final case class Rectangle(w: Double, h: Double) extends Image {
    val left = -w/2
    val right = w/2
    val top = -h/2
    val bottom = h/2
    def render: Unit = {
      val d = Fiddle.draw
      d.fillRect(left, top, width, height)
      d.strokeRect(left, top, width, height)
    }
  }
  
  final case class Triangle(w: Double, h: Double) extends Image {
    val left = -w/2
    val right = w/2
    val top = -h/2
    val bottom = h/2
    def render: Unit = {
      val d = Fiddle.draw
      d.beginPath()
      d.moveTo(left, bottom)
      d.lineTo(0, top)
      d.lineTo(right, bottom)
      d.closePath()
      d.fill()
      d.stroke()
    }
  }
  
  final case class Circle(r: Double) extends Image {
    val left = -r
    val right = r
    val top = -r
    val bottom = r
    def render: Unit = {
      val d = Fiddle.draw
      d.beginPath()
      d.arc(0, 0, r, 0, 2 * math.Pi)
      d.closePath()
      d.fill()
      d.stroke()
    }
  }
  
  final case class Ellipse(w: Double, h: Double) extends Image {
    val left = -w/2
    val right = w/2
    val top = -h/2
    val bottom = h/2
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      d.scale(1.0, h / w)
      d.beginPath()
      d.arc(0, 0, w/2, 0, 2 * math.Pi)
      d.closePath()
      d.fill()
      d.stroke()
      d.restore()
    }
  }
  
  final case class Path(path: List[PathElement], closed: Boolean) extends Image {
    val points = path.map(_.p)
    val xs = points.map(_.x)
    val ys = points.map(_.y)
    val left = xs.min min 0
    val right = xs.max max 0
    val top = ys.min min 0
    val bottom = ys.max max 0
    def render: Unit = {
      val d = Fiddle.draw
      d.beginPath()
      d.moveTo(0, 0)
      path.foreach(_.trace(d))
      if (closed) d.closePath()
      d.fill()
      d.stroke()
    }
  }

  final case class Text(string: String) extends Image {
    val left = 0
    val right = 0
    val top = 0
    val bottom = 0
    def render: Unit = {
      val d = Fiddle.draw
      d.textAlign = "center"
      d.textBaseline = "middle"
      d.fillText(string, 0, 0)
      d.strokeText(string, 0, 0)
    }
  }

  final case class Beside(l: Image, r: Image) extends Image {
    override val width = l.width + r.width
    val left = -width/2
    val right = width/2
    val top = l.top min r.top
    val bottom = l.bottom max r.bottom
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      d.translate(left - l.left, 0)
      l.render
      d.translate(l.right - r.left, 0)
      r.render
      d.restore()
    }
  }
  
  final case class Above(t: Image, b: Image) extends Image {
    override val height = t.height + b.height
    val left = t.left min b.left
    val right = t.right max b.right
    val top = -height/2
    val bottom = height/2
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      d.translate(0, top - t.top)
      t.render
      d.translate(0, t.bottom - b.top)
      b.render
      d.restore()
    }
  }
  
  final case class Layer(layers: Image*) extends Image {
    val left = layers.map(_.left).min
    val right = layers.map(_.right).max
    val top = layers.map(_.top).min
    val bottom = layers.map(_.bottom).max
    def render: Unit = {
      val d = Fiddle.draw
      for (layer <- layers) layer.render
    }
  }
  
  final case class Styled(image: Image, style: Style) extends Image {
    val left = image.left
    val right = image.right
    val top = image.top
    val bottom = image.bottom
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      style(d)
      image.render
      d.restore()
    }
  }
  
  final case class Translate(image: Image, x: Double, y: Double) extends Image {
    val left = image.left + x
    val right = image.right + x
    val top = image.top + y
    val bottom = image.bottom + y
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      d.translate(x, y)
      image.render
      d.restore()
    }
  }
  
  final case class Rotate(image: Image, angle: Angle) extends Image {
    val points = List(image.topLeft, image.topRight, image.bottomLeft, image.bottomRight).map(_.rotate(angle))
    val xs = points.map(_.x)
    val ys = points.map(_.y)
    val left = xs.min
    val right = xs.max
    val top = ys.min
    val bottom = ys.max
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      d.rotate(angle.toRadians)
      image.render
      d.restore()
    }
  }
  
  final case class Scale(image: Image, xfactor: Double, yfactor: Double) extends Image {
    val left = image.left * xfactor min image.right * xfactor
    val right = image.left * xfactor max image.right * xfactor
    val top = image.top * yfactor min image.bottom * yfactor
    val bottom = image.top * yfactor max image.bottom * yfactor
    def render: Unit = {
      val d = Fiddle.draw
      d.save()
      d.scale(xfactor, yfactor)
      image.render
      d.restore()
    }
  }
  
  final case class Bounds(image: Image, left: Double, right: Double, top: Double, bottom: Double) extends Image {
    def render: Unit = image.render
  }
  
  sealed trait Style {
    def apply(d: CanvasRenderingContext2D): Unit
  }
  
  final case class LineWidth(w: Double) extends Style {
    def apply(d: CanvasRenderingContext2D): Unit = {
      d.lineWidth = w
    }
  }
  
  final case class LineColor(c: Pattern) extends Style {
    def apply(d: CanvasRenderingContext2D): Unit = {
      d.strokeStyle = c.value
    }
  }
  
  final case class FillColor(c: Pattern) extends Style {
    def apply(d: CanvasRenderingContext2D): Unit = {
      d.fillStyle = c.value
    }
  }
  
  final case object Dashed extends Style {
    def apply(d: CanvasRenderingContext2D): Unit = {
      d.setLineDash(scala.scalajs.js.Array(4.0, 2.0))
    }
  }
  
  final case class Font(value: String) extends Style {
    def apply(d: CanvasRenderingContext2D): Unit = {
      d.font = value
    }
  }
  
  sealed trait Pattern {
    def value: js.Any
  }
  
  final case class LinearGradient(start: Point, end: Point, stops: Seq[(Normalized, Color)]) extends Pattern {
    def value: js.Any = {
      val d = Fiddle.draw
      val gradient = d.createLinearGradient(start.x, start.y, end.x, end.y)
      for ((pos, c) <- stops) gradient.addColorStop(pos.value, c.value.toString)
      gradient
    }
  }
  
  final case class RadialGradient(start: Point, startRadius: Double, end: Point, endRadius: Double, stops: Seq[(Normalized, Color)]) extends Pattern {
    def value: js.Any = {
      val d = Fiddle.draw
      val gradient = d.createRadialGradient(start.x, start.y, startRadius,
        end.x, end.y, endRadius)
      for ((pos, c) <- stops) gradient.addColorStop(pos.value, c.value.toString)
      gradient
    }
  }
  
  object Pattern {
    def linearGradient(start: Point, end: Point, stops: (Normalized, Color)*): Pattern =
      LinearGradient(start, end, stops)
    def radialGradient(start: Point, startRadius: Double,
        end: Point, endRadius: Double, stops: (Normalized, Color)*) =
      RadialGradient(start, startRadius, end, endRadius, stops)
    def dichromaticVertical(color1: Color, color2: Color, length: Double): Pattern =
      linearGradient(Point.zero, Point(0, length), (0.normalized, color1), (1.normalized, color2))
    def dichromaticHorizontal(color1: Color, color2: Color, length: Double): Pattern =
      linearGradient(Point.zero, Point(length, 0), (0.normalized, color1), (1.normalized, color2))
    def dichromaticRadial(color1: Color, color2: Color, radius: Double): Pattern =
      radialGradient(Point.zero, 0, Point.zero, radius, (0.normalized, color1), (1.normalized, color2))
  }
  
  import Pattern._
  
  final case class Color(red: UByte, green: UByte, blue: UByte, alpha: Normalized = 1.0.normalized) extends Pattern {
    val value: js.Any = s"rgba($red, $green, $blue, $alpha)"
    
    def hue: Angle = hsl._1
    def saturation: Normalized = hsl._2
    def lightness: Normalized = hsl._3
    
    def hsl: (Angle, Normalized, Normalized) = {
      val r = red.toNormalized.value
      val g = green.toNormalized.value
      val b = blue.toNormalized.value
      val cMax = r max g max b
      val cMin = r min g min b
      val delta = cMax - cMin
  
      val unnormalizedHue =
        if(cMax == r)
          60 * (((g - b) / delta))
        else if(cMax == g)
          60 * (((b - r) / delta) + 2)
        else
          60 * (((r - g) / delta) + 4)
      val hue = unnormalizedHue.degrees
  
      val lightness = Normalized.clip((cMax + cMin) / 2)
  
      val saturation =
        if(delta == 0.0)
          0.normalized
        else
          Normalized.clip(delta / (1 - math.abs(2 * lightness.value - 1)))
  
      (hue, saturation, lightness)
    }
    
    def hue(h: Angle): Color = {
      val (_, s, l) = hsl
      Color.hsla(h, s, l, alpha)
    }
  
    def saturation(s: Normalized): Color = {
      val (h, _, l) = hsl
      Color.hsla(h, s, l, alpha)
    }
  
    def lightness(l: Normalized): Color = {
      val (h, s, _) = hsl
      Color.hsla(h, s, l, alpha)
    }
  
    def alpha(a: Normalized): Color =
      Color(red, green, blue, a)
  
    def spin(angle: Angle) = {
      val (h, s, l) = hsl
      Color.hsla(h + angle, s, l, alpha)
    }
  
    def lighten(lightness: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, s, Normalized.clip(l.value + lightness.value), alpha)
    }
  
    def darken(darkness: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, s, Normalized.clip(l.value - darkness.value), alpha)
    }
  
    def saturate(saturation: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, Normalized.clip(s.value + saturation.value), l, alpha)
    }
  
    def desaturate(desaturation: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, Normalized.clip(s.value - desaturation.value), l, alpha)
    }
  
    def fadeIn(opacity: Normalized) = {
      Color(red, green, blue, Normalized.clip(alpha.value + opacity.value))
    }
  
    def fadeOut(opacity: Normalized) = {
      Color(red, green, blue, Normalized.clip(alpha.value - opacity.value))
    }
  
    def lightenBy(lightness: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, s, Normalized.clip(l.value * (1 + lightness.value)), alpha)
    }
  
    def darkenBy(darkness: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, s, Normalized.clip(l.value * (1 - darkness.value)), alpha)
    }
  
    def saturateBy(saturation: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, Normalized.clip(s.value * (1 + saturation.value)), l, alpha)
    }
  
    def desaturateBy(desaturation: Normalized) = {
      val (h, s, l) = hsl
      Color.hsla(h, Normalized.clip(s.value * (1 - desaturation.value)), l, alpha)
    }
  
    def fadeInBy(opacity: Normalized) = {
      Color(red, green, blue, Normalized.clip(alpha.value * (1 + opacity.value)))
    }
  
    def fadeOutBy(opacity: Normalized) = {
      Color(red, green, blue, Normalized.clip(alpha.value * (1 - opacity.value)))
    }
  }
  
  object Color {
    def rgb(r: UByte, g: UByte, b: UByte): Color = Color(r, g, b)
    def rgba(r: UByte, g: UByte, b: UByte, a: Normalized): Color = Color(r, g, b, a)
    def hsl(h: Angle, s: Normalized, l: Normalized): Color = hsla(h, s, l, 1.normalized)
    def hsla(h: Angle, s: Normalized, l: Normalized, a: Normalized): Color = {
          if (s.value == 0.0) {
            val lightness = l.toUnsignedByte
            rgba(lightness, lightness, lightness, a)
          } else {
            def hueToRgb(p: Double, q: Double, t: Normalized): Normalized =
              Normalized.wrap(
                if (t.value < 1.0/6.0) p + (q - p) * 6 * t.value
                else if (t.value < 0.5) q
                else if (t.value < 2.0/3.0) p + (q - p) * 6 * (2.0/3.0 - t.value)
                else p)
  
            val lightness = l.value
            val saturation = s.value
            val q =
              if (lightness < 0.5) lightness * (1 + saturation)
              else lightness + saturation - lightness * saturation
            val p = 2 * lightness - q
            val r = hueToRgb(p, q, Normalized.wrap((h + 120.degrees).toTurns))
            val g = hueToRgb(p, q, Normalized.wrap(h.toTurns))
            val b = hueToRgb(p, q, Normalized.wrap((h - 120.degrees).toTurns))
  
            rgba(r.toUnsignedByte, g.toUnsignedByte, b.toUnsignedByte, a)
          }
    }
    
    val transparent          = rgba(0x00.uByte, 0x00.uByte, 0x00.uByte, 0.normalized)
    val aliceBlue            = rgb(0xf0.uByte, 0xf8.uByte, 0xff.uByte)
    val antiqueWhite         = rgb(0xfa.uByte, 0xeb.uByte, 0xd7.uByte)
    val aqua                 = rgb(0x00.uByte, 0xff.uByte, 0xff.uByte)
    val aquamarine           = rgb(0x7f.uByte, 0xff.uByte, 0xd4.uByte)
    val azure                = rgb(0xf0.uByte, 0xff.uByte, 0xff.uByte)
    val beige                = rgb(0xf5.uByte, 0xf5.uByte, 0xdc.uByte)
    val bisque               = rgb(0xff.uByte, 0xe4.uByte, 0xc4.uByte)
    val black                = rgb(0x00.uByte, 0x00.uByte, 0x00.uByte)
    val blanchedAlmond       = rgb(0xff.uByte, 0xeb.uByte, 0xcd.uByte)
    val blue                 = rgb(0x00.uByte, 0x00.uByte, 0xff.uByte)
    val blueViolet           = rgb(0x8a.uByte, 0x2b.uByte, 0xe2.uByte)
    val brown                = rgb(0xa5.uByte, 0x2a.uByte, 0x2a.uByte)
    val burlyWood            = rgb(0xde.uByte, 0xb8.uByte, 0x87.uByte)
    val cadetBlue            = rgb(0x5f.uByte, 0x9e.uByte, 0xa0.uByte)
    val chartreuse           = rgb(0x7f.uByte, 0xff.uByte, 0x00.uByte)
    val chocolate            = rgb(0xd2.uByte, 0x69.uByte, 0x1e.uByte)
    val coral                = rgb(0xff.uByte, 0x7f.uByte, 0x50.uByte)
    val cornflowerBlue       = rgb(0x64.uByte, 0x95.uByte, 0xed.uByte)
    val cornSilk             = rgb(0xff.uByte, 0xf8.uByte, 0xdc.uByte)
    val crimson              = rgb(0xdc.uByte, 0x14.uByte, 0x3c.uByte)
    val cyan                 = rgb(0x00.uByte, 0xff.uByte, 0xff.uByte)
    val darkBlue             = rgb(0x00.uByte, 0x00.uByte, 0x8b.uByte)
    val darkCyan             = rgb(0x00.uByte, 0x8b.uByte, 0x8b.uByte)
    val darkGoldenrod        = rgb(0xb8.uByte, 0x86.uByte, 0x0b.uByte)
    val darkGray             = rgb(0xa9.uByte, 0xa9.uByte, 0xa9.uByte)
    val darkGrey             = rgb(0xa9.uByte, 0xa9.uByte, 0xa9.uByte)
    val darkGreen            = rgb(0x00.uByte, 0x64.uByte, 0x00.uByte)
    val darkKhaki            = rgb(0xbd.uByte, 0xb7.uByte, 0x6b.uByte)
    val darkMagenta          = rgb(0x8b.uByte, 0x00.uByte, 0x8b.uByte)
    val darkOliveGreen       = rgb(0x55.uByte, 0x6b.uByte, 0x2f.uByte)
    val darkOrange           = rgb(0xff.uByte, 0x8c.uByte, 0x00.uByte)
    val darkOrchid           = rgb(0x99.uByte, 0x32.uByte, 0xcc.uByte)
    val darkRed              = rgb(0x8b.uByte, 0x00.uByte, 0x00.uByte)
    val darkSalmon           = rgb(0xe9.uByte, 0x96.uByte, 0x7a.uByte)
    val darkSeaGreen         = rgb(0x8f.uByte, 0xbc.uByte, 0x8f.uByte)
    val darkSlateBlue        = rgb(0x48.uByte, 0x3d.uByte, 0x8b.uByte)
    val darkSlateGray        = rgb(0x2f.uByte, 0x4f.uByte, 0x4f.uByte)
    val darkSlateGrey        = rgb(0x2f.uByte, 0x4f.uByte, 0x4f.uByte)
    val darkTurquoise        = rgb(0x00.uByte, 0xce.uByte, 0xd1.uByte)
    val darkViolet           = rgb(0x94.uByte, 0x00.uByte, 0xd3.uByte)
    val deepPink             = rgb(0xff.uByte, 0x14.uByte, 0x93.uByte)
    val deepSkyBlue          = rgb(0x00.uByte, 0xbf.uByte, 0xff.uByte)
    val dimGray              = rgb(0x69.uByte, 0x69.uByte, 0x69.uByte)
    val dimGrey              = rgb(0x69.uByte, 0x69.uByte, 0x69.uByte)
    val dodgerBlue           = rgb(0x1e.uByte, 0x90.uByte, 0xff.uByte)
    val fireBrick            = rgb(0xb2.uByte, 0x22.uByte, 0x22.uByte)
    val floralWhite          = rgb(0xff.uByte, 0xfa.uByte, 0xf0.uByte)
    val forestGreen          = rgb(0x22.uByte, 0x8b.uByte, 0x22.uByte)
    val fuchsia              = rgb(0xff.uByte, 0x00.uByte, 0xff.uByte)
    val gainsboro            = rgb(0xdc.uByte, 0xdc.uByte, 0xdc.uByte)
    val ghostWhite           = rgb(0xf8.uByte, 0xf8.uByte, 0xff.uByte)
    val gold                 = rgb(0xff.uByte, 0xd7.uByte, 0x00.uByte)
    val goldenrod            = rgb(0xda.uByte, 0xa5.uByte, 0x20.uByte)
    val gray                 = rgb(0x80.uByte, 0x80.uByte, 0x80.uByte)
    val grey                 = rgb(0x80.uByte, 0x80.uByte, 0x80.uByte)
    val green                = rgb(0x00.uByte, 0x80.uByte, 0x00.uByte)
    val greenYellow          = rgb(0xad.uByte, 0xff.uByte, 0x2f.uByte)
    val honeydew             = rgb(0xf0.uByte, 0xff.uByte, 0xf0.uByte)
    val hotpink              = rgb(0xff.uByte, 0x69.uByte, 0xb4.uByte)
    val indianRed            = rgb(0xcd.uByte, 0x5c.uByte, 0x5c.uByte)
    val indigo               = rgb(0x4b.uByte, 0x00.uByte, 0x82.uByte)
    val ivory                = rgb(0xff.uByte, 0xff.uByte, 0xf0.uByte)
    val khaki                = rgb(0xf0.uByte, 0xe6.uByte, 0x8c.uByte)
    val lavender             = rgb(0xe6.uByte, 0xe6.uByte, 0xfa.uByte)
    val lavenderBlush        = rgb(0xff.uByte, 0xf0.uByte, 0xf5.uByte)
    val lawngreen            = rgb(0x7c.uByte, 0xfc.uByte, 0x00.uByte)
    val lemonChiffon         = rgb(0xff.uByte, 0xfa.uByte, 0xcd.uByte)
    val lightBlue            = rgb(0xad.uByte, 0xd8.uByte, 0xe6.uByte)
    val lightCoral           = rgb(0xf0.uByte, 0x80.uByte, 0x80.uByte)
    val lightCyan            = rgb(0xe0.uByte, 0xff.uByte, 0xff.uByte)
    val lightGoldenrodYellow = rgb(0xfa.uByte, 0xfa.uByte, 0xd2.uByte)
    val lightGray            = rgb(0xd3.uByte, 0xd3.uByte, 0xd3.uByte)
    val lightGrey            = rgb(0xd3.uByte, 0xd3.uByte, 0xd3.uByte)
    val lightGreen           = rgb(0x90.uByte, 0xee.uByte, 0x90.uByte)
    val lightPink            = rgb(0xff.uByte, 0xb6.uByte, 0xc1.uByte)
    val lightSalmon          = rgb(0xff.uByte, 0xa0.uByte, 0x7a.uByte)
    val lightSeaGreen        = rgb(0x20.uByte, 0xb2.uByte, 0xaa.uByte)
    val lightSkyBlue         = rgb(0x87.uByte, 0xce.uByte, 0xfa.uByte)
    val lightSlateGray       = rgb(0x77.uByte, 0x88.uByte, 0x99.uByte)
    val lightSlateGrey       = rgb(0x77.uByte, 0x88.uByte, 0x99.uByte)
    val lightSteelBlue       = rgb(0xb0.uByte, 0xc4.uByte, 0xde.uByte)
    val lightYellow          = rgb(0xff.uByte, 0xff.uByte, 0xe0.uByte)
    val lime                 = rgb(0x00.uByte, 0xff.uByte, 0x00.uByte)
    val limeGreen            = rgb(0x32.uByte, 0xcd.uByte, 0x32.uByte)
    val linen                = rgb(0xfa.uByte, 0xf0.uByte, 0xe6.uByte)
    val magenta              = rgb(0xff.uByte, 0x00.uByte, 0xff.uByte)
    val maroon               = rgb(0x80.uByte, 0x00.uByte, 0x00.uByte)
    val mediumAquamarine     = rgb(0x66.uByte, 0xcd.uByte, 0xaa.uByte)
    val mediumBlue           = rgb(0x00.uByte, 0x00.uByte, 0xcd.uByte)
    val mediumOrchid         = rgb(0xba.uByte, 0x55.uByte, 0xd3.uByte)
    val mediumPurple         = rgb(0x93.uByte, 0x70.uByte, 0xd8.uByte)
    val mediumSeaGreen       = rgb(0x3c.uByte, 0xb3.uByte, 0x71.uByte)
    val mediumSlateBlue      = rgb(0x7b.uByte, 0x68.uByte, 0xee.uByte)
    val mediumSpringGreen    = rgb(0x00.uByte, 0xfa.uByte, 0x9a.uByte)
    val mediumTurquoise      = rgb(0x48.uByte, 0xd1.uByte, 0xcc.uByte)
    val mediumVioletRed      = rgb(0xc7.uByte, 0x15.uByte, 0x85.uByte)
    val midnightBlue         = rgb(0x19.uByte, 0x19.uByte, 0x70.uByte)
    val mintCream            = rgb(0xf5.uByte, 0xff.uByte, 0xfa.uByte)
    val mistyRose            = rgb(0xff.uByte, 0xe4.uByte, 0xe1.uByte)
    val moccasin             = rgb(0xff.uByte, 0xe4.uByte, 0xb5.uByte)
    val navajoWhite          = rgb(0xff.uByte, 0xde.uByte, 0xad.uByte)
    val navy                 = rgb(0x00.uByte, 0x00.uByte, 0x80.uByte)
    val oldLace              = rgb(0xfd.uByte, 0xf5.uByte, 0xe6.uByte)
    val olive                = rgb(0x80.uByte, 0x80.uByte, 0x00.uByte)
    val oliveDrab            = rgb(0x6b.uByte, 0x8e.uByte, 0x23.uByte)
    val orange               = rgb(0xff.uByte, 0xa5.uByte, 0x00.uByte)
    val orangeRed            = rgb(0xff.uByte, 0x45.uByte, 0x00.uByte)
    val orchid               = rgb(0xda.uByte, 0x70.uByte, 0xd6.uByte)
    val paleGoldenrod        = rgb(0xee.uByte, 0xe8.uByte, 0xaa.uByte)
    val paleGreen            = rgb(0x98.uByte, 0xfb.uByte, 0x98.uByte)
    val paleTurquoise        = rgb(0xaf.uByte, 0xee.uByte, 0xee.uByte)
    val paleVioletRed        = rgb(0xd8.uByte, 0x70.uByte, 0x93.uByte)
    val papayaWhip           = rgb(0xff.uByte, 0xef.uByte, 0xd5.uByte)
    val peachPuff            = rgb(0xff.uByte, 0xda.uByte, 0xb9.uByte)
    val peru                 = rgb(0xcd.uByte, 0x85.uByte, 0x3f.uByte)
    val pink                 = rgb(0xff.uByte, 0xc0.uByte, 0xcb.uByte)
    val plum                 = rgb(0xdd.uByte, 0xa0.uByte, 0xdd.uByte)
    val powderBlue           = rgb(0xb0.uByte, 0xe0.uByte, 0xe6.uByte)
    val purple               = rgb(0x80.uByte, 0x00.uByte, 0x80.uByte)
    val rebeccaPurple        = rgb(0x66.uByte, 0x33.uByte, 0x99.uByte)
    val red                  = rgb(0xff.uByte, 0x00.uByte, 0x00.uByte)
    val rosyBrown            = rgb(0xbc.uByte, 0x8f.uByte, 0x8f.uByte)
    val royalBlue            = rgb(0x41.uByte, 0x69.uByte, 0xe1.uByte)
    val saddleBrown          = rgb(0x8b.uByte, 0x45.uByte, 0x13.uByte)
    val salmon               = rgb(0xfa.uByte, 0x80.uByte, 0x72.uByte)
    val sandyBrown           = rgb(0xf4.uByte, 0xa4.uByte, 0x60.uByte)
    val seaGreen             = rgb(0x2e.uByte, 0x8b.uByte, 0x57.uByte)
    val seaShell             = rgb(0xff.uByte, 0xf5.uByte, 0xee.uByte)
    val sienna               = rgb(0xa0.uByte, 0x52.uByte, 0x2d.uByte)
    val silver               = rgb(0xc0.uByte, 0xc0.uByte, 0xc0.uByte)
    val skyBlue              = rgb(0x87.uByte, 0xce.uByte, 0xeb.uByte)
    val slateBlue            = rgb(0x6a.uByte, 0x5a.uByte, 0xcd.uByte)
    val slateGray            = rgb(0x70.uByte, 0x80.uByte, 0x90.uByte)
    val slateGrey            = rgb(0x70.uByte, 0x80.uByte, 0x90.uByte)
    val snow                 = rgb(0xff.uByte, 0xfa.uByte, 0xfa.uByte)
    val springGreen          = rgb(0x00.uByte, 0xff.uByte, 0x7f.uByte)
    val steelBlue            = rgb(0x46.uByte, 0x82.uByte, 0xb4.uByte)
    val tan                  = rgb(0xd2.uByte, 0xb4.uByte, 0x8c.uByte)
    val teal                 = rgb(0x00.uByte, 0x80.uByte, 0x80.uByte)
    val thistle              = rgb(0xd8.uByte, 0xbf.uByte, 0xd8.uByte)
    val tomato               = rgb(0xff.uByte, 0x63.uByte, 0x47.uByte)
    val turquoise            = rgb(0x40.uByte, 0xe0.uByte, 0xd0.uByte)
    val violet               = rgb(0xee.uByte, 0x82.uByte, 0xee.uByte)
    val wheat                = rgb(0xf5.uByte, 0xde.uByte, 0xb3.uByte)
    val white                = rgb(0xff.uByte, 0xff.uByte, 0xff.uByte)
    val whiteSmoke           = rgb(0xf5.uByte, 0xf5.uByte, 0xf5.uByte)
    val yellow               = rgb(0xff.uByte, 0xff.uByte, 0x00.uByte)
    val yellowGreen          = rgb(0x9a.uByte, 0xcd.uByte, 0x33.uByte)
  }
  
  class UByte(val value: Int) {
    override def toString: String = value.toString
    def toNormalized: Normalized = Normalized.clip(value / 255.0)
  }
  
  object UByte {
    def clip(n: Int): UByte = new UByte(n max 0 min 255)
  }
  
  implicit class IntUByteOps(n: Int) {
    def uByte: UByte = UByte.clip(n)
  }
  
  class Normalized(val value: Double) {
    override def toString: String = value.toString
    def toUnsignedByte: UByte = math.round(value * 255).toInt.uByte
  }
  
  object Normalized {
    def clip(x: Double): Normalized = new Normalized(x max 0.0 min 1.0)
    def wrap(x: Double): Normalized = new Normalized(if (0 <= x && x <= 1) x else x - math.floor(x))
  }
  
  implicit class DoubleNormalizedOps(x: Double) {
    def normalized: Normalized = Normalized.clip(x)
  }
  
  class Angle(val toRadians: Double) {
    def +(that: Angle): Angle = Angle(toRadians + that.toRadians)
    def -(that: Angle): Angle = Angle(toRadians - that.toRadians)
    def *(x: Double): Angle = Angle(toRadians * x)
    def /(x: Double): Angle = Angle(toRadians / x)
    def unary_- : Angle = Angle(-toRadians)
    def toDegrees: Double = toRadians / Angle.TwoPi * 360
    def toTurns: Double = toRadians / Angle.TwoPi
    def cos: Double = math.cos(toRadians)
    def sin: Double = math.sin(toRadians)
  }
  
  object Angle {
    val TwoPi = math.Pi * 2
    val zero = Angle(0.0)
    val one = Angle(TwoPi)
  
    def degrees(deg: Double): Angle = Angle(deg * TwoPi / 360.0)
    def radians(rad: Double): Angle = Angle(rad)
    def turns(t: Double): Angle = Angle(t * TwoPi)
    def apply(radians: Double): Angle = new Angle(radians)
  }
  
  implicit class DoubleAngleOps(x: Double) {
    def radians: Angle = Angle.radians(x)
    def degrees: Angle = Angle.degrees(x)
    def turns: Angle = Angle.turns(x)
    def *(angle: Angle): Angle = angle * x
  }
  
  final case class Vec(x: Double, y: Double) {
    def +(that: Vec): Vec = Vec(x + that.x, y + that.y)
    def -(that: Vec): Vec = Vec(x - that.x, y - that.y)
    def unary_- : Vec = Vec(-x, -y)

    def *(d: Double): Vec = Vec(x * d, y * d)
    def /(d: Double): Vec = Vec(x / d, y / d)
    
    def angle: Angle = Angle.radians(math.atan2(y, x))
    def length: Double = math.sqrt(x*x + y*y)

    def normalize: Vec = {
      val len = length
      if (len == 0) Vec(1, 0) else this / len
    }

    def rotate(by: Angle): Vec = Vec.polar(length, angle + by)
    def dot(that: Vec): Double = x * that.x + y * that.y
    def cross(that: Vec): Double = x * that.y - y * that.x
    def toPoint: Point = Point(x, y)
  }
  
  object Vec {
    val zero = Vec(0, 0)
    val unitX = Vec(1, 0)
    val unitY = Vec(0, 1)
    def polar(r: Double, a: Angle): Vec = Vec(r * a.cos, r * a.sin)
    def polar(a: Angle): Vec = polar(1, a)
  }
  
  implicit class DoubleVecOps(x: Double) {
    def *(vec: Vec): Vec = vec * x
  }
  
  final case class Point(x: Double, y: Double) {
    def +(that: Vec): Point = Point(x + that.x, y + that.y)
    def -(that: Point): Vec = Vec(x - that.x, y - that.y)

    def angle: Angle = Angle.radians(math.atan2(y, x))
    def length: Double = math.sqrt(x*x + y*y)
    def toVec: Vec = Vec(x, y)

    def rotate(by: Angle): Point = Point.polar(length, angle + by)
  }
  
  object Point {
    val zero = Point(0, 0)
    def cartesian(x: Double, y: Double): Point = Point(x, y)
    def polar(r: Double, a: Angle): Point = Point(r * a.cos, r * a.sin)
  }
  
  import Point._

  sealed trait PathElement {
    def p: Point
    def trace(d: CanvasRenderingContext2D): Unit
  }
  
  object PathElement {
    def moveTo(p: Point): PathElement = MoveTo(p)
    def lineTo(p: Point): PathElement = LineTo(p)
    def curveTo(c1: Point, c2: Point, p: Point): PathElement = CurveTo(c1, c2, p)
  }
  
  import PathElement._

  final case class MoveTo(p: Point) extends PathElement {
    def trace(d: CanvasRenderingContext2D): Unit = d.moveTo(p.x, p.y)
  }
  
  final case class LineTo(p: Point) extends PathElement {
    def trace(d: CanvasRenderingContext2D): Unit = d.lineTo(p.x, p.y)
  }
  
  final case class CurveTo(c1: Point, c2: Point, p: Point) extends PathElement {
    def trace(d: CanvasRenderingContext2D): Unit = d.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, p.x, p.y)
  }
  
  object Turtle {
    case class TurtleState(at: Vec, heading: Angle)
    
    def draw(instructions: List[Instruction]): Image = {
      def iterate(state: TurtleState, instructions: List[Instruction]): List[PathElement] =
        instructions match {
          case Nil =>
            Nil
          case i :: is =>
            val (newState, elements) = process(state, i)
            elements ++ iterate(newState, is)
        }
        
      def process(state: TurtleState, instruction: Instruction): (TurtleState, List[PathElement]) = {
        import PathElement._
      
        instruction match {
          case Forward(d) =>
            val nowAt = state.at + Vec.polar(d, state.heading)
            val element = lineTo(nowAt.toPoint)
            (state.copy(at = nowAt), List(element))
          case Turn(a) =>
            val nowHeading = state.heading + a
            (state.copy(heading = nowHeading), List())
          case Branch(is) =>
            val branchedElements = iterate(state, is)
            (state, branchedElements :+ moveTo(state.at.toPoint))
          case NoOp =>
            (state, List())
        }
      }
    
      openPath(iterate(TurtleState(Vec.zero, Angle.zero), instructions))
    }
  }
  
  sealed trait Instruction
  
  object Instruction {
    def forward(distance: Double): Instruction = Forward(distance)
    def turn(angle: Angle): Instruction = Turn(angle)
    def branch(instructions: Instruction*): Instruction = Branch(instructions.toList)
    def noop: Instruction = NoOp
  }
  
  import Instruction._

  final case class Forward(distance: Double) extends Instruction
  
  final case class Turn(angle: Angle) extends Instruction
  
  final case class Branch(instructions: List[Instruction]) extends Instruction
  
  final case object NoOp extends Instruction
  
  abstract class Random[T] { self =>
    def run: T
  
    def map[U](f: T => U): Random[U] = new Random[U] {
      def run: U = f(self.run)
    }
  
    def flatMap[U](f: T => Random[U]): Random[U] = new Random[U] {
      def run: U = f(self.run).run
    }
  }

  object Random {
    val rng = new scala.util.Random
  
    def always[T](value: T): Random[T] = new Random[T] {
      def run: T = value
    }
  
    def double: Random[Double] = new Random[Double] {
      def run: Double = rng.nextDouble
    }
  
    def int: Random[Int] = new Random[Int] {
      def run: Int = rng.nextInt
    }
  
    def natural(limit: Int): Random[Int] = new Random[Int] {
      def run: Int = rng.nextInt(limit)
    }
  
    def oneOf[T](values: T*): Random[T] = new Random[T] {
      def run: T = values(rng.nextInt(values.size))
    }
  
    def normal(mean: Double, stdDev: Double): Random[Double] = new Random[Double] {
      def run: Double = mean + stdDev * rng.nextGaussian
    }
  
    def normal: Random[Double] = normal(0, 1)
  }
  
  implicit def drawRandomImage(r: Random[Image]) = new {
    def draw: Unit = r.run.draw
  }
  
  // $FiddleStart
  def polygon(sides: Int, size: Int, initialRotation: Angle): Image = {
    def iter(n: Int, rotation: Angle): List[PathElement] = n match {
      case 0 =>
        Nil
      case n =>
        LineTo(polar(size, rotation * n + initialRotation)) :: iter(n - 1, rotation)
    }
    
    closedPath(moveTo(polar(size, initialRotation)) :: iter(sides, 360.degrees / sides))
  }
  
  val gradient = linearGradient(Point(-80, -80), Point(80, 80),
    (0.normalized, Color.red),
    (0.5.normalized, Color.green),
    (1.normalized, Color.blue))
  
  val a = polygon(9, 80, 20.degrees).fillColor(gradient).lineWidth(4)
  
  def squareSpiral(steps: Int, distance: Double, angle: Angle, increment: Double): Image = {
    Turtle.draw((1 to steps).toList.flatMap { n =>
      List(forward(distance + (n * increment)), turn(angle))
    })
  }
  
  val b = squareSpiral(180, 0, 91.degrees, 1).recenter.lineColor(Color.maroon)
  
  def randomCircle(r: Double, color: Random[Color]): Random[Image] =
    color map (fill => Image.circle(r) fillColor fill)
    
  def randomAngle: Random[Angle] = Random.double.map(x => x.turns)
  
  def randomColor(s: Normalized, l: Normalized): Random[Color] =
    randomAngle map (hue => Color.hsl(hue, s, l))
  
  val randomPastel = randomColor(0.7.normalized, 0.7.normalized)
  
  def randomConcentricCircles(count: Int, size: Int): Random[Image] =
    count match {
      case 0 => Random.always(Image.empty)
      case n =>
        for {
          circle <- randomCircle(size, randomPastel)
          circles <- randomConcentricCircles(n-1, size + 5)
        } yield circle on circles
    }
  
  val rc = randomConcentricCircles(7, 50)
  
  def parametricCircle(angle: Angle): Point = Point.polar(80, angle)
  
  def sample(start: Angle, samples: Int): Image = {
    // Angle.one is one complete turn. I.e. 360 degrees
    val step = Angle.one / samples
    val dot = triangle(10, 10)
    def loop(count: Int): Image = {
      val angle = step * count
      count match {
        case 0 => Image.empty
        case n => dot.at(parametricCircle(angle).toVec).color(Color.fireBrick.spin(angle)) on loop(n - 1)
        
      }
    }
    loop(samples)
  }
  
  val radGrad = dichromaticRadial(Color.white, Color.purple, 60)
  
  val d = text("Hello World").font("20px serif").fillColor(radGrad).rotate(45.degrees) on
    sample(0.degrees, 72)
  
  val result = for {
    c <- rc
  } yield ((a beside (b on a.scale(0.5).byLeft.showBounds.resize(0, 0))) above (c beside d))
  
  result.draw
  // $FiddleEnd
}
```