# Introduction to Functional Programming

(Content adapted from Critchlow & Eck)

Functions are fundamental in computer programming,
although not everything in programming that goes by the name of "function"
is a function according to the mathematical definition.

In computer programming, a function is a routine that is given 
some data as input and that will calculate and return an
answer based on that data.  For example, in the Java programming
language, a function that calculates the cube of an integer
could be written
```java
int cube(int n) {
    return n * n * n;
}
```
In Java, _int_ is a data type.  From the mathematical
point of view, a data type is a set.  The data type _int_
is the set of all integers that can be represented as 32-bit 
binary numbers.  Mathematically, then, $\textit{int}\subseteq\Z$.
(You should get used to the fact that sets and functions can
have names that consist of more than one character, since
it's done all the time in computer programming.)
The first line of the above function definition,
"`int cube(int n)`", says that we are defining
a function named _cube_ whose range is _int_
and whose domain is _int_.  In the usual notation for
functions, we would express this as $\textit{cube}\colon \textit{int}\to\textit{int}$,
or possibly as $\textit{cube}\in{\textit{int}}^{\textit{\small{int}}}$,
where ${\textit{int}}^{\textit{\small{int}}}$ is the set of all
functions that map the set _int_ to the set _int_.

The first line of the function, `int cube(int n)`, is called
the **signature** of the function (in some languages, such as C++, it
is called the **prototype**).  The signature specifies the
name, the domain, and the range of the function and so carries
exactly the same information as the notation "$f\colon A\to B$".
The "$n$" in "`int cube(int n)`" is a name for
an arbitrary element of the data type _int_.  In computer
jargon, $n$ is called a **parameter** of the function.
The rest of the definition of _cube_ tells the computer
to calculate the value of $\textit{cube}(n)$ for any $n\in\textit{int}$
by multiplying $n\times n\times n$.  The statement "`return n * n * n`"
says that $n\times n\times n$ is the value that is computed, or "returned,"
by the function.  (The $*$ stands for multiplication.)

Java has many data types in addition to _int_.  There is
a boolean data type named _boolean_.  The values of type
_boolean_ are _true_ and _false_.  Mathematically,
_boolean_ is a name for the set $\{\textit{true},\,\textit{false}\}$.
The type _double_ consists of real numbers, which can
include a decimal point.  Of course, on a computer, it's not
possible to represent the entire infinite set of real numbers,
so _double_ represents some subset of the mathematical set
of real numbers.  There is also a data type whose values are
strings of characters, such as "Hello world" or "xyz152QQZ".
The name for this data type in Java is _String_.  All these
types, and many others, can be used in functions.  For example,
in Java, $m\,\%\,n$ is the remainder when the integer $m$ is
divided by the integer $n$.  We can define a function to test
whether an integer is even as follows:
```java
boolean even(int k) {
    if ( k % 2 == 1 )
      return false;
    else
      return true;
}
```
You don't need to worry about all the details here, but you should
understand that the signature, `boolean even(int k)`,
says that _even_ is a function from the set _int_
to the set _boolean_.  That is,
$\textit{even}\colon\textit{int}\to\textit{boolean}$.  Given
an integer $N$, $\textit{even}(N)$ has the value _true_
if $N$ is an even integer, and it has the value _false_
if $N$ is an odd integer.

A function can have more than one parameter.  For example, we might
define a function with signature `int index(String str, String sub)`.
If $s$ and $t$ are strings, then $\textit{index}(s,t)$ would be the
_int_ that is the value of the function at the ordered pair
$(s,t)$.  We see that the domain of _index_ is the cross product
$\textit{String}\times\textit{String}$, and we can write
$\textit{index}\colon \textit{String}\times\textit{String}\to\textit{int}$
or, equivalently, $\textit{index}\in\textit{int}^{\textit{String}\times\textit{String}}$.

## Partial and Impure Functions

Not every Java function is actually a function in the mathematical
sense.  In mathematics, a function must associate a single value in
its range to each value in its domain.  There are two things
that can go wrong:  The value of the function might not be defined
for every element of the domain, and the function might associate
several different values to the same element of the domain.
Both of these things can happen with Java functions.

In computer programming, it is very common for a "function" to be
undefined for some values of its parameter.  In mathematics,
a **partial function** from a set $A$ to
a set $B$ is defined to be a function from a subset of $A$ to $B$.
A partial function from $A$ to $B$ can be undefined for some
elements of $A$, but when it is defined for some $a\in A$,
it associates just one element of $B$ to $a$.  Many functions
in computer programs are actually partial functions.  (When 
dealing with partial functions, an ordinary function, which is
defined for every element of its domain, is sometimes referred to
as a **total function**.  Note that&mdash;with the mind-boggling
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
0 and $N-1$.  The value of _nextInt_(5) could be 0, 1, 2, 3, or 4.
This is not the behavior of a mathematical function! Behind the scenes,
this function is storing a variable called the "seed", which is used to
generate a random value, plus a new value for the seed, each time the
function is called. Each time the seed changes, the next value to be
returned is likely to change.

Even though many functions in computer programs are not really
mathematical functions, I will continue to refer to them as
functions in this section.  Mathematicians will just have to stretch
their definitions a bit to accommodate the realities of computer
programming.

## Pure Functional Programming

Unlike Java, a typical functional programming language such as Scala,
Haskell, or ReasonML will actively discourage the use of side-effects
in functions.[^The most common exception is for functions that send
output to the console, such as the `print_int` function in ReasonML.
Being able to track execution and easily display results is very
useful, and printing a line on the console is a fairly benign
side-effect&mdash;it won't cause the function to return different
values for the same arguments. However, printing a result can still
interfere with algebraic reasoning about a program, because interchanging
such a function call with its value can affect whether and how many times
the output is printed.] The benefit of restricting the programmer to
**pure** functions, that always return the same value for a given
argument, is that it becomes possible to reason about the behavior
**algebraically**, freely substituting the returned values in place
of function calls without having to worry about whether some "hidden state"
might have changed since the last time the function was called.

For example, suppose that we have a function that computes the value of
some polynomial, such as $f(x)=x^2+2x+1$. If we know that another function
$g\colon\textit{String}\to\textit{int}$ is pure, then we can be sure
that $f(g(s))$ is the same as $g(s)^2+2\cdot g(s)+1$, as well as
$(g(s)+1)^2$. All of these are algebraically equivalent, as long as $g$
is pure. This allows the programmer to reason more easily about the
correctness of their program, and it also enables the computer to choose
any equivalent expression for evaluation, ideally choosing the most
efficient version.

One of the most common ways that a functional language will encourage
pure functions is to do away with, or at least severely restrict, the
ability to update the value assigned to a variable. In ReasonML, there
is no assignment statement. When a value is bound to a variable with a
`let` statement, that variable will then remain bound to that value for
as long as the variable exists. A variable will cease to exist when the
block (such as a function body) containing it is finished:
```reason demo
{
  let x = 42;
  print_int(x); print_newline(); /* prints 42 */
}
/* x no longer exists here */
```
A variable may be temporarily **shadowed** by another variable with the same
name. This may look like an assignment of a changed value to a variable,
but each use of the `let` statement will create a new named location in
memory; if the shadowing variable goes away, the original one will become
visible again with its correct value:
```reason demo
let x = 42;
print_int(x); print_newline(); /* prints 42 */
{
  let x = 17; /* shadows earlier definition of x */
  print_int(x); print_newline(); /* prints 17 */
}
print_int(x); print_newline(); /* prints 42 again */
```

Again, this behavior permits algebraic reasoning about the program. The above
code is equivalent to
```reason demo
let x = 42;
print_int(x); print_newline();
{
  let y = 17;
  print_int(y); print_newline();
}
print_int(x); print_newline();
```
where we have uniformly renamed the inner variable _x_ as _y_ to make it clear
that they are distinct variables. It is also equivalent to
```reason demo
print_int(42); print_newline();
print_int(17); print_newline();
print_int(42); print_newline();
```
where we have replaced each use of our identifiers with its value. The output is
slightly different in this case, because we no longer have the top-level
binding of 42 to _x_ that would have been available if we wrote additional lines
at the bottom of the program, but it is equivalent if we just look at the printed
results.

## First-Class Functions

In most programming languages, functions are not first-class
objects.  That is, a function cannot
be treated as a data value in the same way as a _String_
or an _int_.  However, recent versions of Java have taken a step in this
direction.  It is possible for a function to be a parameter
to another function, as long as it is wrapped in a "function object".
For example, consider the function signature
```java
int sumten( Function<Integer, Integer> f )
```
This is a signature for a function named _sumten_ whose
parameter is a function object.  The parameter is specified by the
type "`Function<Integer, Integer>`".  If _S_ and _T_ are types, then
the type `Function<S, T>` represents functions from _S_ to _T_. Therefore,
the parameter of _sumten_ is essentially a function from _int_ to _int_.[^For
our purposes we may ignore the distinction between _int_ and _Integer_ in Java.]
The parameter name, $f$, stands for an arbitrary such function.  Mathematically,
$f\in \textit{int}^{\textit{int}}$, and so
$\textit{sumten}\colon \textit{int}^{\textit{int}}\to\textit{int}$.

My idea is that $\textit{sumten}(f)$ would compute
$f(1)+f(2)+\cdots+f(10)$.  A more useful function would
be able to compute $f(a)+f(a+1)+\cdots+f(b)$ for any integers
$a$ and $b$.  This just means that $a$ and $b$ should be
parameters to the function.  The signature for the improved
function would look like
```java
int sum( Function<Integer, Integer> f, int a, int b )
```
The parameters to _sum_ form an ordered triple in which
the first coordinate is a function and the second and third
coordinates are integers.  So, we could write
$$
\textit{sum}\colon \textit{int}^{\textit{int}}
       \times\textit{int}\times\textit{int}\to\textit{int}
$$
It's interesting that computer programmers deal routinely
with such complex objects.

There are several ways of providing a function object as an
argument in Java. If we want to pass the method _m_ of an object
_x_, where the signature of _m_ is `int m( int i )`, then
we can call our function as `sum(x::m, a, b)`. However, a more
general technique is to use an **anonymous function**, also known
as a **lambda**.[^The mathematician Alonzo Church introduced in
the 1930's the use of the Greek letter lambda ($\lambda$) to indicate an
otherwise unnamed function defined by a formula. That is, instead
of writing "the function $f$ where $f(x) = \textit{some formula}$",
he wrote "$\lambda x(\textit{some formula})$". When the first
functional programming language, LISP (invented in the late 1950's),
needed a way to create function values, John McCarthy adopted Church's
use of lambda, and the name has stuck.]

## Anonymous functions

In Java, an expression such as `i -> { return i * i * i; }`
creates a function object that takes an _int_ (this will be
determined from the context) and returns another _int_. This
particular function cubes its input. Thus, if we call our _sum_ function as
follows:
```java
sum(i -> { return i * i * i; }, 3, 5)
```
the result will be $3^3 + 4^3 + 5^3$,
which is 216.

Many languages now support a similar syntax for creating anonymous
function values, and offer some facility for working with functions
as (mostly) first-class objects. For example, the same function
is expressed in ReasonML as `i => { i * i * i }`. Since one of the hallmarks of
the functional languages is their ability to work with function
values, you can imagine that they tend to provide the most
thorough integration of functions with other kinds of values.

Here are complete demos of the _sum_ example, first in Java and
then in ReasonML:

```java
import java.util.function.Function;

public class SumDemo {
  private static int sum(Function<Integer, Integer> f, int a, int b) {
    int total = 0;
    for (int i = a; i <= b; i++) {
      total += f.apply(i);
    }
    return total;
  }

  public static void main(String[] args) {
    System.out.println(sum(i -> { return i * i * i; }, 3, 5));
  }
}
```

```reason edit
let rec sum = (f, a, b) => {
  if (a > b) {
    0
  } else {
    f(a) + sum(f, a+1, b)
  }
};

print_int(sum(i => { i * i * i }, 3, 5));
print_newline();
```

Note that we define the function _sum_ in ReasonML by binding
a function value to the name _sum_, just as we can bind other
types of values to identifiers. The keyword "rec" after the "let"
indicates that the right-hand side expression is allowed to make
use of the name that is currently being defined, so that we can
make our function recursive. Without the "rec", any use of _sum_
in the right-hand expression would refer to an older binding to
that name.

As a simpler function definition in ReasonML, not needing the "rec"
keyword, here is our _cube_ function again:
```reason demo
let cube = n => { n * n * n };
```
This is just binding the anonymous function we have been using above
to the name _cube_. Note that the function `n => { n * n * n }` is
exactly the same as the function `i => { i * i * i }`, because the name
of the parameter does not matter outside the function.

An interesting fact about ReasonML is that the operators are also functions,
bound to names made out of operator symbols instead of letters and digits. To
refer to an operator as a function value, just put the operator in parentheses:
`(+)`, `(*)`, `(==)`, &hellip;. Therefore, an expression such as `a + b * c`
can also be written as `(+)(a, (*)(b, c))` (note that this takes into account
the usual higher precedence of multiplication over addition).
For example, if we wanted to define an exponentiation operator on _int_, and
call it `***`, we could define it as follows:[^4]

[^4]: The code here is based on the solution to an exercise in the [Recursion](../logic/recursion) section.]

```reason demo
let rec (***) = (n, p) => {
  if (p == 0) {
    1
  } else if (p mod 2 == 0) {
    (n * n) *** (p / 2)
  } else {
    n * (n *** (p - 1))
  }
};
```

It is even possible in functional languages for a function to return
another function as its value.  For example,
```reason demo
let monomial = (a, n) => {
  x => { a * x *** n }
};
```
Here, `x *** n` is our exponentiation operator from above, which computes $x^n$, so for any
integers $a$ and $n$, the value of $\textit{monomial}(a,n)$ is 
a function that computes $ax^n$.  Thus,
```reason edit
let f = monomial(2, 3);
```
would define $f$ to be the function that satisfies $f(x)=2x^3$. This is
now ready to be handed to our _sum_ function:
```reason edit
print_int( sum( f, 3, 6 ) );
```
would compute $2*3^3+2*4^3+2*5^3+2*6^3$.  In fact, _monomial_
can be used to create an unlimited number of new functions
from scratch.  It is even possible to write _monomial_(2, 3)(5)
to indicate the result of applying the function _monomial_(2, 3)
to the value 5.  The value represented by _monomial_(2, 3)(5)
is $2*5^3$, or 250.  This is real functional programming and
might give you some idea of its power.

## Exercises

1. For each of the following Java function signatures, translate the
signature into a standard mathematical function specification, such
as $\textit{func}\colon\textit{double}\to\textit{int}$.
   * `int strlen(String s)`
   * `double pythag(double x, double y)`
   * `int round(double x)`
   * `String sub(String s, int n, int m)`
   * `String unlikely(Function<String, Integer> f)`
   * `int h(Function<Integer, Integer> f, Function<Integer, Integer> g)`

2. Write a Java function signature for a function that
belongs to each of the following sets.

   * $\textit{String}^{\textit{String}}$
   * $\textit{boolean}^{\textit{double}\times\textit{double}}$
   * $\textit{double}^{ \textit{int}^{\textit{int}} }$

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

4. Let _cube_, _sum_ and _monomial_
be the ReasonML functions described in this section.  What is the
value of each of the following?
   * _sum_(_cube_, 2, 4)
   * _sum_(_monomial_(5, 2), 1, 3)
   * _monomial_(_cube_(2), 7)
   * _sum_($n\Rightarrow\{ 2*n \}$, 1, 5)
   * _cube_(_sum_(_monomial_(2, 3), 1, 2))
}

5. Write a ReasonML function named _compose_
that computes the composition of two functions.  That
is, $\textit{compose}(f, g)$ is $f\circ g$, where
$f$ and $g$ are functions of one parameter.  Recall that
$f\circ g$ is the function defined by $(f\circ g)(x)=f(g(x))$.

6. Consider the following ReasonML function:
```reason edit
let exercise = (a, b) => {
  let m = (x, y) => { x - y };
  let s = n => { n * n };
  let c = m(a, b);
  let d = m(a, c);
  let e = c + d;
  s(d) - s(e)
};
```
   * What is the value of `exercise(4, 5)`?
   * What is the value of `exercise(12, 13)`?
   * Use algebraic substitution to evaluate `exercise(a, b)` in terms of the
     variables `a` and `b`.
