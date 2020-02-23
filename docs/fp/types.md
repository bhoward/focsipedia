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

## Tuples

## Records and Variants

### Pattern Matching

### Recursive Types

## Connection to Natural Deduction

TODO: another page on common patterns of recursion: map, reduce, fold, accumulator,
auxilliary function, tail-recursion. A page on functional graphics. A summary page
on ReasonML.