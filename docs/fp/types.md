---
id: types
title: Types in Functional Programming
---
import useBaseUrl from '@docusaurus/useBaseUrl';

One of the hallmarks of modern functional programming is a strong and rich
systems of types. The type of an expression can be thought of as the set of all
values that the expression might have; by specifying the type of a parameter to
a function, it constrains the values that may be provided as input. In this
sense, the type of a function is then a form of contract: if the input satisfies
some condition (is a value in the parameter type), then the output is also
guaranteed to satisfy a condition (be a value of the result type).

## Functions

In ReasonML we write the type of functions from `A` to `B` as `A => B`. Given a
function `f` of that type, if `x` is a value (or more generally any expression)
of type `A`, then the **application** `f(x)` will give us a result of type `B`.
The value `x` to which we apply the function is known as the **argument**.
For example, `string_of_int` is a function of type `int => string`; when we
apply it to an integer, it returns the string of digits representing the argument:
```reason edit
let result = string_of_int(42);
```

Since functions are first-class values, we may bind a function to another name:
```reason edit
let f = string_of_int;
let result = f(42);
```

:::warning
Because the embedded ReasonML compiler here is first converting the code to
OCaml, and then executing the OCaml code, it actually reports types using the
OCaml syntax, which is slightly different! For example, OCaml uses a single
arrow `->` for function types instead of the double arrow `=>`. This is
unfortunate, but as we will see below we rarely even need to write types.
:::

To create a function value, we use the double arrow to show that we are taking
a parameter, for example `p`, and using it to compute a result:
`p => { ...result expression... }`. The parameter may be any variable name&mdash;it
will represent the value of the argument just within the block containing the
result expressions. That is, if the variable name had been used outside the function,
it will be temporarily "shadowed" by the new binding; when the function has returned
its result, the local binding to the argument goes away.

Consider the following example:
```reason edit
let x = 5;
let f = x => { x + 12 };
let y = f(x * x) + x;
```

The first binding to `x` is the integer 5. When `f` is applied to its argument,
which is `x * x`, or 25, we will temporarily bind 25 to a new, local variable
named `x` and evaluate the body of the function: `x + 12`, which gives 37.
Continuing to evaluate the expression `f(x * x) + x`, we now have `37 + x`; since
`x` here refers to the original binding, this is `37 + 5`, so it binds 42 to `y`.

## Type Inference

ReasonML does not require that we specify the types of variables most of the
time, because it can usually infer what types they should have from the context
and how they are used. Looking at the example above, since 5 is an int, we know
that `x` must have type `int`. In the second line, the local `x` must also be an
`int`, since we can add 12 to it.[^ReasonML, unlike many common languages,
distinguishes between the integer addition operator, written `+`, and the
floating-point addition operator, which is written `+.`. In part this is done to
make type inference easier.] The result of the function body will be an `int`, so
the type of `f` is `int => int`. Finally, the application of `f` in the third line
checks out, because it is applied to an integer argument (`x * x`), and its result
is used in a further integer addition. We could be explicit about the types and
add a **type annotation** to each of the bindings:
```reason edit
let x: int = 5;
let f: int => int = (x: int) => { x + 12 };
let y: int = f(x * x) + x;
let z: string = string_of_int(y);
```
However, the convention in ReasonML is that type annotations are not generally
used except as documentation and as a check that the compiler is doing what we
think it is.

### Currying

When we write a function that takes multiple arguments, we may list the parameters
in parentheses, separated by commas:
```reason edit
let average = (a, b) => { float_of_int(a + b) /. 2.0 };
let result = average(7, 10);
```
This is actually a lie! In ReasonML, functions can only have a single argument.
Behind the scenes, the code above is translated to the following:
```reason edit
let average = a => { b => { float_of_int(a + b) /. 2.0 } };
let result = average(7)(10);
```
That is, `average` is a function that takes an integer parameter `a` and returns
another function. This second function expects to be given another integer
parameter, named `b`, and then it will compute the result (which is a `float`
for variety). The computation on the second line corresponds to this: first
`average` is applied to the argument 7. The resulting function is then further
applied to the argument 10, producing the desired floating-point result.

Here is the same code, written out more explicitly:
```reason edit
let average: int => (int => float) = (a: int) => {
  (b: int) => {
    float_of_int(a + b) /. 2.0
  }
};
let result1: int => float = average(7);
let result: float = result1(10);
```

This replacement of multiple-parameter functions with a sequence of single-parameter
functions is called **currying**, named after the logician Haskell B. Curry.[^As
is often the case when things are named, Curry did not originate this idea. He got it
from Moses Schönfinkel, who may have picked it up from Gottlob Frege, but "currying"
is easier to say than "schönfinkeling" or "fregeing"&hellip;.] One advantage of this,
other than the simplicity of only needing one kind of function, is that it is often
useful to create a **partially applied** function, where some of its arguments have
been supplied to create a new function ready to be given the rest. For example, suppose
we have a function for formatting exam grades:
```reason edit
let format_grade = (exam, total, name, points) => {
  name ++ ", " ++ exam ++ ": " ++ string_of_int(points) ++ "/" ++ string_of_int(total) 
};
let demo = format_grade("Midterm", 100, "Brian", 93);
```
We could take advantage of currying to create a specialized function for formatting the
midterm grades:
```reason edit
let format_midterm = format_grade("Midterm", 100);
let demo1 = format_midterm("Brian", 93);
let demo2 = format_midterm("Alice", 97);
```
The first two arguments of `format_grade` have been provided with the exam name
("Midterm") and the total number of points (100). Now we have a new function,
bound to `format_midterm`, that just needs to be applied to a student name and
grade, and then it can produce a string with all four components.

## Tuples

Perhaps the most basic form of data structure is the **tuple**. We have already
seen this in the context of
[sets and cartesian products](../sets/functions#pairs): an $n$-tuple is simply
an ordered listing of $n$ values, traditionally shown in parentheses separated
by commas. The ReasonML syntax for a tuple type is likewise an ordered listing
of each value's type, in parentheses and separated by commas. For example, the
tuple `(42, "hello", 3.1416)` has type `(int, string, float)`:
```reason edit
let demo: (int, string, float) = (42, "hello", 3.1416);
```

:::warning
Again the OCaml syntax differs from the ReasonML syntax, so you will see tuple
types printed out with the types separated by asterisks: `int * string * float`
instead of `(int, string, float)`. In OCaml they chose to make it look more like
a cartesian product, while ReasonML is trying to make the type look like the
values it describes.
:::

In the case $n=2$, a tuple is just the familiar **pair**. For example, the type
of two-dimensional points with integer coordinates is `(int, int)`. Pairs come
with accessor functions named `fst` and `snd` to access the first and second
coordinates, respectively:
```reason edit
let p = (5, 10);
let x = fst(p);
let y = snd(p);
```
The standard library does not provide accessor functions for arbitrary
$n$-tuples.[^Part of the reason for this is simply tradition, but another
important factor is that ReasonML does not have an easy way to give a type for a
function that would take an $n$-tuple plus an integer, say from 1 to $n$, and
return that component of the tuple; since each component may have a different
type, what would the return type of that accessor be?] Instead, we may retrieve
the components of a tuple through an extension of the binding operation, `let`:
```reason edit
let demo = (42, "hello", 3.1416); /* construct a tuple */
let (a, b, c) = demo;             /* "destruct" a tuple */
```
If we only want to extract some of the components, the other positions may be
filled with a place-holder, the so-called **wildcard** identifier, `_`
(underscore):
```reason edit
let demo = (42, "hello", 3.1416);
let (_, greeting, _) = demo;
```

An $n$-tuple when $n=1$ is just an ordinary value (which may be enclosed in
parentheses as usual just for grouping purposes). However, the case when
$n=0$ is more interesting: the only value is the empty tuple, `()`, and its type
is named `unit`:
```reason edit
let a: unit = ();
```
Since there is only one value of type `unit`, it carries no information. We
will use it when we need to specify a type but its value does not matter. For
example, look at the types of the print functions in ReasonML:
```reason edit
let a = print_int;
let b = print_string;
let c = print_float;
let d = print_newline;
```
All of them return a value of type `unit` because there is nothing to be
returned. In fact, this is a strong hint that these functions do their work via
side-effects (albeit the relatively benign side-effect of sending some
characters to the console). The `print_newline` function also takes `unit` as
its argument type&mdash;it needs no input, but there still needs to be some
argument passed in so that it knows to do its job (emitting an end-of-line
character). Note the difference between the function value expression
`print_newline`, as seen above in the binding to `d`, and the function _call_
expression `print_newline()`, which actually produces output:
```reason edit
print_string("line 1, ");
print_newline;
print_string("still line 1");
print_newline();
print_string("line 2");
```

### Tuples and Parameters

It might seem that tuples should be used to pass multiple parameters to
functions, but as we have seen, ReasonML handles this by currying the function
into a series of functions each taking a single parameter. We can force it
to pass tuples of arguments, and bind them to tuples of parameters, by
including an extra pair of parentheses:
```reason edit
let f: ((string, int)) => string = ((name, points)) => {
  name ++ ": " ++ string_of_int(points) ++ "/100"
};
print_string( f(("Brian", 93)) );
```
Now, that's ugly, and unless you really need to do that, don't do it. However,
this brings up an interesting equivalence of types. Note that the type for `f`
here is `((string, int)) => string`; in terms of sets, this is the set of
functions $\text{string}^{\text{string}\times\text{int}}$. Compare this with the
equivalent but curried function `g`:
```reason edit
let g: string => int => string = (name, points) => {
  name ++ ": " ++ string_of_int(points) ++ "/100"
};
print_string( g("Brian", 93) );
```
The type of `g` here is `string => int => string`; in terms of sets, this is the
set $(\text{string}^{\text{int}})^{\text{string}}$. If these types are truly equivalent,
in the sense that every function in one corresponds to a unique function in the other,
then that suggests that there might be a general equivalence of the form
$$
A^{B\times C}\equiv(A^C)^B
$$
This is indeed true (and it should remind you of a corresponding fact about exponents from
ordinary algebra), and we can write the functions in ReasonML that mediate this
equivalence:
```reason edit
let curry = (f: (('b, 'c)) => 'a) => {
  (b: 'b) => (c: 'c) => f((b, c))
};
let uncurry = (g: 'b => 'c => 'a) => {
  ((b, c): ('b, 'c)) => g(b)(c)
};
```
That is, given any function from the pair type `('b, 'c)` to `'a` (type variables in
ReasonML always start with an apostrophe (`'`)), we can apply the `curry` function to
it to get the corresponding curried function of type `'b => 'c => 'a`. The `uncurry`
function is the inverse of this. Since we have functions going each direction that
are inverses to each other, this shows that the two types (or sets) are equivalent.

## Type Aliases and Parameterized Types

Given the importance of types, and potentially complicated type expressions, in
ReasonML, it should not be a surprise that they can be named and manipulated
much like ordinary values with variables and functions.[^ReasonML does not go
quite all the way with making types be first-class values. There is currently
active work on creating industrial-strength languages with so-called **dependent
types**, where types are values and values can be used in types. Good examples are
Agda (https://github.com/agda/agda), Idris (https://www.idris-lang.org/), and Lean
(https://leanprover.github.io/).] We give a name to a type with the `type` statement:
```reason edit
type int_point = (int, int);
type math_op = float => float => float;
let p: int_point = (5, 10);
let plus: math_op = (+.);
```

If we have a family of types where one or more parts can be substituted with an
arbitrary type, then we can introduce a **parameterized type alias** by adding
type parameters. As we saw above, type variables start with an apostrophe:
```reason edit
type point('a) = ('a, 'a);
type binary_op('a) = 'a => 'a => 'a;
type printer('a) = 'a => unit;
let p1: point(int) = (5, 10);
let p2: point(float) = (5.0, 10.0);
let int_plus: binary_op(int) = (+);
let print_point: printer(point(int)) = p => {
  print_string("(");
  print_int(fst(p));
  print_string(",");
  print_int(snd(p));
  print_string(")");
}
```

:::warning
Once again, OCaml displays parameterized types slightly differently. TODO
:::

## Constructors and Variants

### Pattern Matching

### Recursive Types

## Connection to Natural Deduction

## Exercises

TODO: another page on common patterns of recursion: map, reduce, fold, accumulator,
auxilliary function, tail-recursion, mutual recursion. A page on functional graphics.
A summary page on ReasonML.