---
id: intro
title: Introduction to Functional Programming
---

(Content adapted from Critchlow & Eck)

Functions are fundamental in computer programming,
although not everything in programming that goes by the name of "function"
is a function according to the [mathematical definition](../sets/functions.md).

In computer programming, a function is a routine that is given 
some data as input and that will calculate and return an
answer based on that data.
For example, in the Java programming
language, a function that calculates the cube of an integer
could be written
```java
int cube(int n) {
    return n * n * n;
}
```
In Java, _int_ is a data type.
From the mathematical point of view, a data type is a set.
The data type _int_ is the set of all integers that can be represented as 32-bit 
binary numbers.
Mathematically, then, $\textit{int}\subseteq\Z$.
(You should get used to the fact that sets and functions can
have names that consist of more than one character, since
it's done all the time in computer programming.)
The first line of the above function definition,
"`int cube(int n)`", says that we are defining
a function named _cube_ whose range is _int_
and whose domain is _int_.
In the usual notation for functions, we would express this as
$\textit{cube}\colon \textit{int}\to\textit{int}$,
or possibly as $\textit{cube}\in{\textit{int}}^{\textit{\small{int}}}$,
where ${\textit{int}}^{\textit{\small{int}}}$ is the set of all
functions that map the set _int_ to the set _int_.

The first line of the function, `int cube(int n)`, is called
the **signature** of the function (in some languages, such as C++, it
is called the **prototype**).
The signature specifies the name, the domain, and the range of the function
and so carries exactly the same information as the notation "$f\colon A\to B$".
The "$n$" in "`int cube(int n)`" is a name for
an arbitrary element of the data type _int_.
In computer jargon, $n$ is called a **parameter** of the function.
The rest of the definition of _cube_ tells the computer
to calculate the value of $\textit{cube}(n)$ for any $n\in\textit{int}$
by multiplying $n\times n\times n$.
The statement "`return n * n * n`" says that $n\times n\times n$ is the
value that is computed, or "returned," by the function.
(The $*$ stands for multiplication.)

In these notes we will be using the programming language [Scala](../scala.md).
You may think of Scala as an enhanced relative of Java, which adds excellent
support for **functional programming**, similar to how C++ and Java added support
for **object-oriented programming** to the family of C-like languages.
Scala is a hybrid language, which allows programmers to express solutions in
both the object-oriented and functional styles; one of our goals in this course
is to see how these approaches can complement each other, rather than being in
opposition.

The _cube_ method above may be written in Scala as follows:
```scala mdoc
def cube(n: Int): Int = n * n * n
```
There are some cosmetic differences from Java:
* Types are written `_: T` instead of `T _`
* Method definitions begin with the keyword `def`
* Basic types such as `int` are written with an initial capital letter: `Int`
* Since the body of this function just returns the result of an expression, we
just write that expression after the `=`, similar to the way a function might
be defined mathematically: $f(x) = e$.

Beyond those minor differences, however, there will be much that is familiar about Scala.

Here is another example of Scala code, which uses the keyword `val` instead of `def` to
introduce a variable declaration:
```scala mdoc
val answer = 6 * 7
```
The [mdoc](https://scalameta.org/mdoc/) tool used in creating FoCSipedia automatically runs Scala code and inserts the results in comments.
The result in this case is that the value 42 has been **bound** to the name _answer_.

## Partial and Impure Functions

Not every Java or Scala function is actually a function in the mathematical sense.
In mathematics, a function must associate a single value in
its range to each value in its domain.
There are two things here that can go wrong:
* The value of the function might not be defined for every element of the domain, and
* The function might associate several different values to the same element of the domain.

Both of these things can happen with functions in typical computer languages.

In computer programming, it is very common for a "function" to be
undefined for some values of its parameter.
In mathematics, a **partial function** from a set $A$ to
a set $B$ is defined to be a function from a subset of $A$ to $B$.
A partial function from $A$ to $B$ can be undefined for some
elements of $A$, but when it is defined for some $a\in A$,
it associates just one element of $B$ to $a$.
Many functions in computer programs are actually partial functions.
(When  dealing with partial functions, an ordinary function, which is
defined for every element of its domain, is sometimes referred to
as a **total function**.
Note that&mdash;with the mind-boggling
logic that is typical of mathematicians&mdash;a total function is
a type of partial function, because a set is a subset of itself.)

It's also very common for a "function" in a computer program
to produce a variety of values for the same value of its parameter.
This most frequently occurs because the function is **impure**&mdash;either
it has a **side-effect** (such as changing the value of a global
variable) beyond just computing a result, or it relies on a value that
has been changed as a side-effect of some other part of the program.
Another way to say that a function is impure is that it depends on a
**hidden state**&mdash;some extra information affecting the result that
is not provided by the function's direct inputs.
A common example is the method in the _java.util.Random_ class with signature
`int nextInt(int N)`, which returns a random integer between
0 and $N-1$.
The value of _nextInt_(5) could be 0, 1, 2, 3, or 4.
This is not the behavior of a mathematical function!
Behind the scenes, this function is storing a variable called the "seed";
each time the function is called, the seed is used to generate a random value,
plus a new value for the seed.
Each time the seed changes, the next value to be returned is likely to change.

Even though many functions in computer programs are not really
mathematical functions, we will continue to refer to them as
functions in this section. 
Mathematicians will just have to stretch
their definitions a bit to accommodate the realities of computer
programming.

## Pure Functional Programming

Unlike Java, a typical functional programming language such as Scala,
Haskell, or ReasonML will actively discourage the use of side-effects
in functions.[^1]
The benefit of restricting the programmer to
**pure** functions, that always return the same value for a given
argument, is that it becomes possible to reason about the behavior
**algebraically**, freely substituting the returned values in place
of function calls without having to worry about whether some "hidden state"
might have changed since the last time the function was called.

[^1]: The most common exception is for functions that send
output to the console, such as the `println` function in Scala.
Being able to track execution and easily display results is very
useful, and printing a line on the console is a fairly benign
side-effect&mdash;it won't cause the function to return different
values for the same arguments.
However, printing a result can still
interfere with algebraic reasoning about a program, because interchanging
such a function call with its value can affect whether and how many times
the output is printed.

For example, suppose that we have a function that computes the value of
some polynomial, such as $f(x)=x^2+2x+1$.
If we know that another function
$g\colon\textit{String}\to\textit{int}$ is pure, then we can be sure
that $f(g(s))$ is the same as $g(s)^2+2\cdot g(s)+1$, as well as
$(g(s)+1)^2$.
All of these are algebraically equivalent, as long as $g$ is pure.
This allows the programmer to reason more easily about the
correctness of their program, and it also enables the computer to choose
any equivalent expression for evaluation, ideally choosing the most
efficient version.

One of the simplest ways that a functional language such as Scala will encourage
pure functions is to do away with, or at least severely restrict, the
ability to update the value assigned to a variable.
It is important to distinguish
between **initializing** a variable with a value, as in `val answer = 6 * 7`, which
binds the value 42 to _answer_, and **assigning** a different value to an existing
variable (for example, by trying to execute `answer = 43`).
In Scala, the assignment
statement may only be used on variables that have been explicitly declared with
`var` (meaning that they are truly "variable") instead of `val`.
When a value is bound to a
variable with a `val` statement, that variable will then remain bound to that
value for as long as the variable exists.
(This is similar to declaring the variable `final` in Java, or `const` in C++.)
A variable will cease to exist when the
block (such as a function body) containing it is finished:
```scala mdoc
{
  val x = 42
  println(x)
} /* x no longer exists here */
```

A variable may be temporarily **shadowed** by another variable with the same name.
This may look like an assignment of a changed value to a variable,
but each use of the `val` statement will create a new named location in
memory; if the shadowing variable goes away, the original one will become
visible again with its correct value:
```scala mdoc
val x = 42
println(x) /* prints 42 */
{
  val x = 17 /* shadows earlier definition of x */
  println(x) /* prints 17 */
}
println(x) /* prints 42 again */
```

Again, this behavior permits algebraic reasoning about the program.
The above code is equivalent to
```scala mdoc:reset
val x = 42
println(x)
{
  val y = 17
  println(y)
}
println(x)
```
where we have uniformly renamed the inner variable _x_ as _y_ to make it clear
that they are distinct variables.
It is also equivalent to
```scala mdoc
println(42)
println(17)
println(42)
```
where we have replaced each use of our identifiers with its value.
The only difference here is that the identifier _x_ no longer has the value 42
bound to it, so it will not be available later in the program.

## Expressions and the Substitution Model

One of the core principles of functional programming is that programs are made up
of **expressions** that may be evaluated.
They are composed of constants, variables, operators, and function calls, as in
most languages, plus compound forms such as [blocks](#blocks-and-local-values)
and `if` statements.

The **Substitution Model** arises from the fact that the value assigned to a
variable may not be changed: since the value of an expression cannot change,
you are free to "substitute equals for equals," just as in algebra.
If you see the binding `val answer = 6 * 7` followed by the expression `answer + 1`,
you know that this is the same as `(6 * 7) + 1`.
This seemingly simple observation is the basis of many of the powerful techniques
that are enabled by functional programming; you will learn more about this later, but
just one application is in optimizing code to be run in parallel on a multi-processor
machine&mdash;if you know that the substitution model holds, then the compiler has
great freedom to rearrange when and where values are computed to maximize the use of
the available processors.
In a language without the substitution model, where the value of a variable depends
on the last time it was changed in an assignment statement, it is much harder to do
this kind of optimization.

See if you can predict the output of the following code:
```scala
val a = 2
val b = a + 1
val c = if a < b then a * b else a * a + b
val d = if a > b then a * b else a * a + b
val e = c * d
println(e)
```

<details>
    <summary>Answer</summary>

```scala mdoc
val a = 2
val b = a + 1
val c = if a < b then a * b else a * a + b
val d = if a > b then a * b else a * a + b
val e = c * d
println(e)
```
</details>

## Blocks and Local Values

When computing an expression, it is frequently useful to declare additional variables to hold temporary results.
For example,

```scala mdoc
val result = {
  val local1 = "Hello"
  val local2 = "World"
  local1 ++ " " ++ local2
}
println(result)
```

The nested lines are called a **block**, which may be used anywhere an expression is expected.
Within a block, we may have a series of **local value definitions**.
The value of the block expression (which is then bound as the value of `result`) is the
value of the last expression in the block, `local1 ++ " " ++ local2` (note that `++`
is the string concatenation operator in Scala).
Before it evaluates that expression, however, it first evaluates each of the `val`
statements (in order), temporarily binding those values to the given local variables.
In the example, `local1` and `local2` are each bound to their corresponding string
values, and then the final expression is evaluated relative to those variable
bindings.

The names of variables within a block are completely invisible outside their block.
After the block is finished, it is as if those local bindings never took place.
This allows us to use local reasoning about the value of an expression, without
having to know what might have happened in other blocks (which might have
coincidentally used the same variable names).
```scala mdoc:fail
println(local1)
```

Predict the result bound to the outer `x` in this code (this is actually a case where we need the braces to embed the blocks within a larger expression):
```scala
val x = {
  val x = 3
  x + x
} * {
  val x = 4
  x + x
}
```

<details>
    <summary>Answer</summary>

```scala mdoc:reset
val x = {
  val x = 3
  x + x
} * {
  val x = 4
  x + x
}
```
</details>

## Function Values

So far, we have only talked about expressions, variables, and (briefly) methods.
The heart of functional programming, of course, is the **function**.
In Scala, functions are just another type of value, along with integers, strings, _etc._
We write the function value that takes **parameters** `a`, `b`, `c` and returns the expression `e` using the syntax `(a, b, c) => e`.
This value is what is known as an **anonymous function**; to give it a name, we may bind it to a variable, just like any other value:
```scala mdoc
val area = (width: Int, height: Int) => width * height
println(area(6, 7))
```
Note that each parameter specifies both an **identifier** and a **type**;
there are some contexts where Scala is able to **infer** the type of a parameter and it may be omitted, but we will generally include it for clarity.

In the second line of this example, after assigning the function value to `area`, we are able to use `area` as the name of a function just like a built-in function (such as `println`).

When Scala reports the bindings that result from this code, it says that `area` has the type `Function2[Int, Int, Int]`&mdash;
this reflects the fact that a function value in Scala is actually an object of a class implementing a particular **trait** (which is analogous to a Java interface).
This function type may also be written `(Int, Int) => Int`, which you can think of as giving a picture of a typical use of the function:
when applied to two `Int` arguments, it returns an `Int` result.

Because functions are just another kind of value, they may themselves be passed as arguments to functions, or returned as results; we will explore these **higher-order** functions later.

Since expressions are evaluated according to the substitution model, where we do not have to worry about a variable changing its value between the time is was declared
(**bound**) and used, we know several very useful facts about functions:
* Functions in Scala are **pure**: the output only depends on the inputs, so calling a function twice with the same arguments will always produce the same result.
Furthermore, we know that calling a function will not have any **side-effects**&mdash;that is, it will not cause the bindings of any other variables to change.[^2]
If a program uses only pure functions, then the compiler is free to optimize code in various ways: it may rearrange when functions are called; it may combine multiple calls with the same arguments into one, or split a single call into several; and if it detects that the result of a function call is not needed, it may omit the call entirely.
None of these optimizations are guaranteed to preserve program behavior if a function is not known to be pure, which is the case in most non-functional languages.
* When an argument is passed to a function, the value (such as `6`) is bound to the parameter name (such as `width`) using the same mechanism as binding local variables in a block.
Therefore, the function call in the example above could be rewritten as
```scala mdoc
println({
  val width = 6
  val height = 7
  width * height
})
```

[^2]: Technically, some Scala functions _may_ have a side-effect, if they call output functions such as `println`.
That is, you can tell the difference between calling such a function once, twice, or not at all, by looking at the output that is printed to the console.
We will consider this sort of side-effect to be benign, however, and we will generally use such functions only in very controlled places in a program, or only when tracing or debugging code.
Other possible side-effects include calling impure functions such as `io.StdIn.readLine` or `math.random`,
or assigning a new value to a variable declared with `var`, but we will similarly avoid or isolate these operations.

## First-Class Functions

In most programming languages, functions are not first-class
objects.  That is, a function cannot
be treated as a data value in the same way as a _String_
or an _int_.  However, recent versions of Java have taken a step in this
direction.  It is possible for a function to be a parameter
to another function, as long as it is wrapped in a "function object".
For example, consider the function signature
```java
int sumten(Function<Integer, Integer> f)
```
This is a signature for a function named _sumten_ whose
parameter is a function object.
The parameter is specified by the
type "`Function<Integer, Integer>`".
If _S_ and _T_ are types, then
the type `Function<S, T>` represents functions from _S_ to _T_.
Therefore, the parameter of _sumten_ is essentially a function from _int_ to _int_.[^3]
The parameter name, _f_, stands for an arbitrary such function.
Mathematically, $f\in \textit{int}^{\textit{int}}$, and so
$\textit{sumten}\colon \textit{int}^{\textit{int}}\to\textit{int}$.

[^3]: For our purposes we may ignore the distinction between _int_ and _Integer_ in Java.

The idea here might be that $\textit{sumten}(f)$ will compute
$f(1)+f(2)+\cdots+f(10)$.
A more useful function would
be able to compute $f(a)+f(a+1)+\cdots+f(b)$ for any integers
$a$ and $b$.
This just means that $a$ and $b$ should be
parameters to the function.
The signature for the improved
function might look like
```java
int sum(Function<Integer, Integer> f, int a, int b)
```
The parameters to _sum_ form an ordered triple in which
the first coordinate is a function and the second and third
coordinates are integers.
So, we could write
$$
\textit{sum}\colon \textit{int}^{\textit{int}}
       \times\textit{int}\times\textit{int}\to\textit{int}
$$
It's interesting that computer programmers deal routinely
with such complex objects.

There are several ways of providing a function object as an
argument in Java.
If we want to pass the method _m_ of an object
_x_, where the signature of _m_ is `int m( int i )`, then
we can call our function as `sum(x::m, a, b)`.
However, a more general technique is to use an **anonymous function**.

## Anonymous functions

The anonymous function values in Java and Scala are sometimes called
**lambda**[^4] expressions.
In Java, a lambda expression such as `i -> { return i * i * i; }`
creates a function object that takes an _int_ (this will be
determined from the context) and returns another _int_.
This particular function cubes its input.
Thus, if we call our _sum_ function as follows:
```java
sum(i -> { return i * i * i; }, 3, 5)
```
the result will be $3^3 + 4^3 + 5^3$,
which is 216.

[^4]: In the 1930's, the mathematician Alonzo Church introduced
the use of the Greek letter lambda ($\lambda$) to indicate an
otherwise unnamed function defined by a formula. That is, instead
of writing "the function $f$ where $f(x) = \textit{some formula}$",
he wrote "$\lambda x(\textit{some formula})$". When the first
functional programming language, LISP (invented in the late 1950's),
needed a way to create function values, John McCarthy adopted Church's
use of lambda, and the name has stuck.

Many languages now support a similar syntax for creating anonymous
function values, and offer some facility for working with functions
as (mostly) first-class objects.
For example, the same function is expressed in Scala as `i => i * i * i`.
Since one of the hallmarks of
the functional languages is their ability to work with function
values, you can imagine that they tend to provide the most
thorough integration of functions with other kinds of values.

Here are complete demos of the _sum_ example, first in Java and
then in Scala:

```java file=<rootDir>/code/src/main/java/SumDemo.java
```

```scala mdoc
def sum(f: Int => Int, a: Int, b: Int): Int = {
  if a > b then
    0
  else
    f(a) + sum(f, a+1, b)
}
println(sum(i => i * i * i, 3, 5))
```

Note that we are defining a **named function** (_sum_) here, along
with the anonymous function value being passed as the first argument
to _sum_.
This allows us to use the _sum_ function on the right-hand side, within
the definition of _sum_ itself; since an anonymous function does not have
a name (until it gets bound to a variable), this sort of **recursive** call
is not possible.
If we just said `val sum = (...) => ... sum(f, a+1, b) ...`
then the use of _sum_ on the right-hand side would be referring to some older
(shadowed) binding to that name.
Scala also requires that function signatures in a `def` statement declare
the types of their parameters as well as the return type, just as in Java.
We will talk more about recursive functions later.

As a simpler function definition in Scala, not needing the `def` statement,
here is our _cube_ function again:
```scala mdoc
val cube = (n: Int) => n * n * n;
```
This is just binding the anonymous function we have been using above
to the name _cube_.
We do need to supply a type for the parameter _n_, because
Scala doesn't have enough context to figure out that it is an `Int`, but otherwise
this is exactly the same as the function `i => i * i * i`, since the name
of the parameter does not matter outside the function.

:::tip Additional Reading
There is an optional section about defining [class methods](../methods.md)
and operators.
:::

## Higher-Order Functions

It is even possible in functional languages for a function to return
another function as its value.  For example,
```scala mdoc
val monomial = (a: Int, n: Int) => {
  (x: Int) => a * math.pow(x, n).toInt
}
```
Here, `math.pow(x, n)` is a library function that returns $x^n$ (and the `.toInt`
converts the result from a `Double` back to an `Int`), so for any
integers _a_ and _n_, the value of `monomial(a,n)` is 
a _function value_ that, when given _x_, computes $ax^n$.  Thus,
```scala mdoc
val f = monomial(2, 3)
```
would define $f$ to be the function on integers that satisfies $f(x)=2x^3$. This is
now ready to be handed to our _sum_ function:
```scala mdoc
println(sum(f, 3, 6))
```
This computes $2*3^3+2*4^3+2*5^3+2*6^3$.
In fact, _monomial_ can be used to create an unlimited number of new functions
from scratch.
It is even possible to write `monomial(2, 3)(5)`
to indicate the result of applying the function value `monomial(2, 3)`
to the value 5. 
The value returned by `monomial(2, 3)(5)` is $2*5^3$, or 250.
This is real functional programming and might give you some idea of its power:
solutions to problems may be **composed** out of pure functions that solve
individual parts, and the substitution model allows us to reason about the
correctness of each part independently.

## Exercises

1. For each of the following Java function signatures, translate the
signature into a standard mathematical function specification, such
as $\textit{func}\colon\textit{double}\to\textit{int}$.
   * `int strlen(String s)`
   <details>
     <summary>Answer</summary>

     $\textit{strlen}\colon\textit{String}\to\textit{int}$
   </details>

   * `double pythag(double x, double y)`
   <details>
     <summary>Answer</summary>

     $\textit{pythag}\colon\textit{double}\times\textit{double}\to\textit{double}$
   </details>

   * `int round(double x)`
   <details>
     <summary>Answer</summary>

     $\textit{round}\colon\textit{double}\to\textit{int}$
   </details>

   * `String sub(String s, int n, int m)`
   <details>
     <summary>Answer</summary>

     $\textit{sub}\colon\textit{String}\times\textit{int}\times\textit{int}\to\textit{String}$
   </details>

   * `String unlikely(Function<String, Integer> f)`
   <details>
     <summary>Answer</summary>

     $\textit{unlikely}\colon\textit{int}^\textit{String}\to\textit{String}$
   </details>

   * `int h(Function<Integer, Integer> f, Function<Integer, Integer> g)`
   <details>
     <summary>Answer</summary>

     $\textit{h}\colon\textit{int}^\textit{int}\times\textit{int}^\textit{int}\to\textit{int}$
   </details>


2. Write a Java function signature for a function that
belongs to each of the following sets.

   * $\textit{String}^{\textit{String}}$
   <details>
     <summary>Answer</summary>

     `String foo(String s)`
   </details>

   * $\textit{boolean}^{\textit{double}\times\textit{double}}$
   <details>
     <summary>Answer</summary>

     `boolean bar(double x, double y)`
   </details>

   * $\textit{double}^{ \textit{int}^{\textit{int}} }$
   <details>
     <summary>Answer</summary>

     `double baz(Function<Integer, Integer> f)`
   </details>


3. It is possible to define new types in Java.  For example, the
definition
```java
public class Point {
  public double x;
  public double y;
}
```
defines a new type named _Point_.  A value of type _Point_
contains two values of type _double_.  What mathematical operation
corresponds to the construction of this data type?  Why?
<details>
  <summary>Answer</summary>

  Each element of _Point_ contains a pair of numbers, so the type corresponds
  to the cartesian product $\textit{double}\times\textit{double}$.
</details>

4. Let _cube_, _sum_ and _monomial_
be the Scala functions described in this section.  What is the
value of each of the following?
   * _sum_(_cube_, 2, 4)
   <details>
     <summary>Answer</summary>

     $2^3 + 3^3 + 4^3 = 8 + 27 + 64 = 99$
   </details>

   * _sum_(_monomial_(5, 2), 1, 3)
   <details>
     <summary>Answer</summary>

     $5\cdot1^2 + 5\cdot2^2 + 5\cdot3^2 = 5 + 20 + 45 = 70$
   </details>

   * _monomial_(_cube_(2), 7)
   <details>
     <summary>Answer</summary>

     The function $f$ such that $f(x) = 8x^7$
   </details>

   * _sum_($n\Rightarrow\{ 2*n \}$, 1, 5)
   <details>
     <summary>Answer</summary>

     $2\cdot1 + 2\cdot2 + 2\cdot3 + 2\cdot4 + 2\cdot5 = 2 + 4 + 6 + 8 + 10 = 30$
   </details>

   * _cube_(_sum_(_monomial_(2, 3), 1, 2))
   <details>
     <summary>Answer</summary>

     $(2\cdot1^3 + 2\cdot2^3)^3 = (2 + 16)^3 = 18^3 = 5832$
   </details>

5. Write a Scala function named _compose_
that computes the composition of two functions.  That
is, $\textit{compose}(f, g)$ is $f\circ g$, where
$f$ and $g$ are each functions of type `Int => Int`.  Recall that
$f\circ g$ is the function defined by $(f\circ g)(x)=f(g(x))$.
<details>
  <summary>Answer</summary>

  `val compose = (f: Int => Int, g: Int => Int) => (x: Int) => f(g(x))`
</details>

6. Consider the following Scala function:
```scala
val exercise = (a: Int, b: Int) => {
  val m = (x: Int, y: Int) => x - y
  val s = (n: Int) => n * n
  val c = m(a, b)
  val d = m(a, c)
  val e = c + d
  s(d) - s(e)
}
```
   * What is the value of `exercise(4, 5)`?
   <details>
     <summary>Answer</summary>

     9
   </details>

   * What is the value of `exercise(12, 13)`?
   <details>
     <summary>Answer</summary>

     25
   </details>

   * Use algebraic substitution to evaluate `exercise(a, b)` in terms of the
     variables `a` and `b`.
   <details>
     <summary>Answer</summary>

     First, `c = a - b`, and `d = a - c`, so `d = b`. Now, `e = c + d`, so `e = a`. Finally, the result is `s(d) - s(e)`, which will be `b * b - a * a`.
   </details>

