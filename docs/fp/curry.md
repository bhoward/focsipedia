---
id: curry
title: Currying
---

When we write a function that takes multiple arguments, we may list the parameters
in parentheses, separated by commas:
```scala mdoc
val average = (a: Int, b: Int) => (a + b) / 2.0
average(7, 10)
```
This is actually a luxury!
We could make do entirely with functions taking only a single argument.

Of course, one way to do this is to make use of [tuples](types.md#tuples), but a
more interesting solution is to take advantage of
[higher-order functions](intro.md#higher-order-functions).
Based on the example above, we could define `average2` as a function that first takes a value
for the parameter `a` and then returns another function that expects a value for `b`:
```scala mdoc:reset
val average2 = (a: Int) => (b: Int) => (a + b) / 2.0
average2(7)(10)
```
Now when we apply `average2` to 7, the result is a function value that is then applied to the 10.

Here is the same code, written out more explicitly:
```scala mdoc:reset
val average2: Int => (Int => Double) = (a: Int) => {
  (b: Int) => {
    (a + b) / 2.0
  }
}
val result1: Int => Double = average2(7)
val result: Double = result1(10)
```

This replacement of multiple-parameter functions with a sequence of single-parameter
functions is called **currying**, named after the logician Haskell B. Curry.[^1]
One advantage of this,
other than the simplicity of only needing one kind of function, is that it is often
useful to create a **partially applied** function, where some of its arguments have
been supplied to create a new function ready to be given the rest. For example, suppose
we have a function for formatting exam grades:
```scala mdoc
val format_grade = (exam: String, total: Int, name: String, points: Int) => {
  name + ", " + exam + ": " + points + "/" + total
}
format_grade("Midterm", 100, "Brian", 93)
```
Scala has a built=in operation on functions, `.curried`, that produces the curried
version of a function:
```scala mdoc
val curried_format_grade = format_grade.curried
```
We could take advantage of currying to create a specialized function for formatting the
midterm grades:
```scala mdoc
val format_midterm = format_grade.curried("Midterm")(100)
format_midterm("Brian")(93)
format_midterm("Alice")(97)
```
The first two arguments of `format_grade` have been provided with the exam name
("Midterm") and the total number of points (100). Now we have a new function,
bound to `format_midterm`, that just needs to be applied to a student name and
grade, and then it can produce a string with all four components.

[^1]: As is often the case when things are named, Curry did not originate this idea. He got it
from Moses Schönfinkel, who may have picked it up from Gottlob Frege, but "currying"
is easier to say than "schönfinkeling" or "fregeing"&hellip;.

### Tuples and Parameters

It might seem that tuples should be used to pass multiple parameters to
functions, but for reasons of compatibility with Java, Scala gives special treatment
to multiple-parameter functions. We can force it
to pass tuples of arguments, and bind them to tuples of parameters, by
including an extra pair of parentheses:
```scala mdoc:reset
def f(p: (String, Int)): String = {
  val (name, points) = p
  name + ": " + points + "/100"
}
f(("Brian", 93))
```
Now, that's ugly, and unless you really need to do that, don't do it. However,
this brings up an interesting equivalence of types. Note that the type for `f`
here is `((string, int)) => string`; in terms of sets, this is the set of
functions $\text{string}^{\text{string}\times\text{int}}$. Compare this with the
equivalent (["curried"](curry.md)) function `g`:
```scala mdoc
val g: String => Int => String = (name) => (points) => {
  name + ": " + points + "/100"
}
g("Brian")(93)
```
The type of `g` here is `string => int => string`; in terms of sets, this is the
set $(\text{string}^{\text{int}})^{\text{string}}$. If these types are truly equivalent,
in the sense that every function in one corresponds to a unique function in the other,
then that suggests that there might be a general equivalence of the form
$$
A^{B\times C}\equiv(A^C)^B
$$
This is indeed true (and it should remind you of a corresponding fact about exponents from
ordinary algebra), and we can write the functions in Scala that mediate this
equivalence:
```scala mdoc
def curry[A, B, C](f: ((B, C)) => A): B => C => A = {
  (b: B) => (c: C) => f((b, c))
}
def uncurry[A, B, C](g: B => C => A): ((B, C)) => A = {
  (p: (B, C)) => g(p._1)(p._2)
}
```
That is, given any function from the pair type `(B, C)` to `A` (`A`,
`B`, and `C` are [type parameters](types.md#type-aliases-and-parameterized-types)),
we can apply the `curry` function to
it to get the corresponding curried function of type `B => C => A`. The `uncurry`
function is the inverse of this. Since we have functions going each direction that
are inverses to each other, this shows that the two types (or sets) are equivalent.