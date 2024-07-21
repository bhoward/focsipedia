---
id: methods
title: Methods in Scala
---

You may be wondering why the section on [functions](fp/intro.md) in Java and Scala
occasionally uses the word "method" instead of "function."

A **method** is a special kind of function in object-oriented programming that is definined
in the context of a **class** of objects.
In a method call such as `a.m(b, c)`, the **receiver** of the method call&mdash;that is,
the object before the dot, _a_&mdash;
is used to select which implementation of the method to use.
Different classes of objects may implement methods in different ways, and the **sender**
of the method call relies on the object to know the correct implementation (that is, the
decision is **object-oriented**).

The method call `a.m(b, c)` effectively turns into a call to the function `f(a, b, c)`,
where _f_ is the implementation of method _m_ suitable for object _a_.
The receiver _a_ is passed in as an extra argument
to _f_ and is typically accessed through a special keyword such as _this_ or _self_.

Here is an example in Scala of defining two classes of shapes, _Circle_ and _Square_,
which each define a method _area_ (with no parameters).
To express that they both implement this method, we also define a **trait** (similar to
a Java interface) that declares this fact:
```scala mdoc
trait Shape:
  def area: Double

class Circle(val radius: Double) extends Shape:
  def area: Double = math.Pi * radius * radius

class Square(val side: Double) extends Shape:
  def area: Double = side * side

val s = Circle(1.0)
println(s.area)
```

When we call `s.area`, the compiler generates code to look up the _area_ method in the class
of _s_ (which will be _Circle_ in this example), and then call that method with _s_ passed in
as the `this` object.
The _Circle_ version of _area_ takes that hidden `this` object and uses it to look up the
field _radius_ of object _s_ when it is computing the expression `math.Pi * radius * radius`.

## Operators as Methods

An interesting fact about Scala is that the operators, such as `+`, `*`, and `==`,
are actually methods of their left-hand operand. That is, `x + y` is equivalent to
`x.+(y)`, and a compound expression such as `a + b * c` becomes `a.+(b.*(c))` (note
that this takes into account the usual higher precedence of multiplication over addition).

In Scala, it is possible to define new methods (including operators) on existing types,
such as `Int`, through **extension methods**.
For example, if we wanted to define an exponentiation operator on `Int`, and
call it `***`, we could define it as follows:[^1]

[^1]: The code here is based on the solution to an exercise in the [Recursion](logic/recursion.md) section.]

```scala mdoc
extension (n: Int)
  def ***(p: Int): Int = {
    if p == 0 then
      1
    else if p % 2 == 0 then
      (n * n) *** (p / 2)
    else
      n * (n *** (p - 1))
  }
println(2 *** 3)
```
(The first line identifies this method as a new implementation to be used when the
receiver of the `***(p)` method is an `Int`; the receiver is given the explicit name _n_.)