# Types in Functional Programming

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
string_of_int(42);
```

Since functions are first-class values, we may bind a function to another name:
```reason edit
let f = string_of_int;
f(42);
```

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
f(x * x) + x;
```

The first binding to `x` is the integer 5. When `f` is applied to its argument,
which is `x * x`, or 25, we will temporarily bind 25 to a new, local variable
named `x` and evaluate the body of the function: `x + 12`, which gives 37.
Continuing to evaluate the expression `f(x * x) + x`, we now have `37 + x`;
since `x` here refers to the original binding, this is `37 + 5`, so it produces
the final answer 42.

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
average(7, 10);
```
This is actually a lie! In ReasonML, functions can only have a single argument.
Behind the scenes, the code above is translated to the following:
```reason edit
let average = a => { b => { float_of_int(a + b) /. 2.0 } };
average(7)(10);
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
format_grade("Midterm", 100, "Brian", 93);
```
We could take advantage of currying to create a specialized function for formatting the
midterm grades:
```reason edit
let format_midterm = format_grade("Midterm", 100);
format_midterm("Brian", 93);
format_midterm("Alice", 97);
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
type binary_op('operand, 'result) = 'operand => 'operand => 'result;
type printer('t) = 't => unit;
let p1: point(int) = (5, 10);
let p2: point(float) = (5.0, 10.0);
let int_plus: binary_op(int, int) = (+);
let string_eq: binary_op(string, bool) = (==);
let print_point: printer(point(int)) = ((x, y)) => {
  Printf.printf("(%d, %d)", x, y)
};
print_point(p1);
```

## Constructors and Variants

A tuple is a rather generic way of packaging up data. When you are building a larger
program, it would not be very meaningful to see a value like `("Brian", 93)` out of
context. Just as programmers are encouraged to use symbolic names for constants (for
example, `LINE_WIDTH` instead of 80), we can attach names to particular uses of tuples
to make them more readable and maintainable. If we create a type alias where the
right-hand-side prefixes the tuple with a **constructor** name (which needs to start
with a capital letter in ReasonML), then it will introduce a new type of tuples that
need to be labeled with that constructor:
```reason edit
type grade_entry = Entry(string, int);
let entry = Entry("Brian", 93);
```
If we want to extract the components of this new type, we use a corresponding
named pattern in the `let` binding:
```reason edit
let Entry(name, grade) = entry;
```
Here is another version of the `format_grade` example, using the above `grade_entry`
type plus another that describes a particular grading item (with a title and maximum
number of points). Even though both are essentially a pair of a string and an integer,
we can now tell them apart:
```reason edit
type grade_entry = Entry(string, int);
type grading_item = Item(string, int);
let format_grade = (item, entry) => {
  let Item(title, max) = item;
  let Entry(name, grade) = entry;
  name ++ ", " ++ title ++ ": " ++ string_of_int(grade) ++ "/" ++ string_of_int(max)
};
format_grade(Item("Midterm", 100), Entry("Brian", 93));
```

So far we have seen types where all of the data have the same form: the same number
of components, each with the same set of types, across all values of the type. However,
most interesting data will come in several forms, and our programs will need to make
appropriate decisions based on the form of each piece of data.

### Enumerations

The simplest case of having several **variants** of a data type is an **enumeration**.
An enumerated type is specified as a list of constant constructors, separated by vertical
bars:
```reason edit
type suit = Club | Diamond | Heart | Spade;
type rank = Ace | Two | Three | Four | Five | Six | Seven
          | Eight | Nine | Ten | Jack | Queen | King;
```
Unlike the case with tuples or simple tuple-like constructors, we can not just
expect to match an enumerated value with a `let` binding. Instead, we need a construct
that gives us a selection among _several_ bindings, one for each variant. In ReasonML,
as in many programming languages, this construct is the `switch` expression (sometimes
called a match or case statement):
```reason edit
let suit1 = Club;
switch (suit1) {
| Club => "It's a club"
| Diamond => "It's a diamond"
| Heart => "It's a heart"
| Spade => "It's a spade"
};
```
Try changing the value bound to `suit1` and check the output. Each of the lines starting
with a vertical bar is one **case**, and the expression to the right of the double arrow
is the code to evaluate when that case matches the value in the switch.

ReasonML will guarantee that the only possible values of an expression of an enumerated
type are those in the list, and it will also check whether all of the cases are covered
in a switch. Try removing one of the cases above and see what happens.

### Algebraic Data Types

By combining variants with tuple-like constructors, we get what are known as **algebraic
data types**. The idea is that the values of a type are formed by one of several
constructors, each of which takes some number of component values. If we think of a
tuple as the "product" of its component types, and a variant as a "sum" of several
choices, then an algebraic type is just our old familiar sum-of-products construction
from propositional logic!

For example, suppose we want a type that describes some shapes. A shape will be either
a rectangle, with a given width and height, or a circle, with a given radius. The
variant type may be defined as
```reason edit
type shape = Rectangle(float, float) | Circle(float);
```
Algebraically, this is the set $\text{float}\times\text{float} + \text{float}$, where
the $+$ operation is forming a **disjoint sum** of two sets&mdash;similar to a union, but
attaching some sort of tag to the element of each set so that there are no duplicates.[^For
example, we could define $A+B=(\{0\}\times A)\cup(\{1\}\times B)$. Then each element
in the disjoint sum would be a pair whose first component is a tag of 0 if the element
came from $A$ and 1 if it came from $B$. Any element in common between $A$ and $B$ will
still be distinguishable by its tag.]

We may define a function to compute the area of a shape by doing a case analysis:
```reason edit
let area = sh => {
  switch (sh) {
  | Rectangle(width, height) => width *. height
  | Circle(radius) => 3.141592653589 *. radius *. radius
  }
};
area(Rectangle(5.0, 10.0));
area(Circle(10.0));
```

If you are familiar with interfaces and subclasses in an object-oriented language such
as Java, it is instructive to compare this with a typical object-oriented approach:
```java
interface Shape {
  double area();
}

class Rectangle implements Shape {
  private double width, height;

  public Rectangle(double width, double height) {
    this.width = width;
    this.height = height;
  }

  public double area() {
    return width * height;
  }
}

class Circle implements Shape {
  private double radius;

  public Circle(double radius) {
    this.radius = radius;
  }

  public double area() {
    return 3.141592653589 * radius * radius;
  }
}
```
In Java, each class implementing `Shape` is one variant, and the interface
requires it to provide an `area` method with the correct signature. When we
execute code such as `sh.area()`, where `sh` is a variable of type `Shape`,
the underlying Java virtual machine code essentially does a case analysis
of the object currently in `sh` to determine which `area` method to run.

One difference between the functional and object-oriented approaches is that
the functional version makes it easy to add new operations (such as a
`perimeter` function), but to change the list of variants (for example, to
add triangular shapes) is hard because we have to add a case to all of the
existing operations. Conversely, the object-oriented version makes it easy to
add new variants (just define another class implementing `Shape`), but if we
want to add a new operation to the interface (such as `perimeter`) we need
to implement that method in all of the existing subclasses. This tradeoff
has led to considerable work on hybrid object-functional languages, such as
Scala.

### Pattern Matching

The pattern matching case analysis in a switch statement can be very powerful,
since patterns may contain other patterns. We may match on not only variants,
constructors, and tuples, but also on individual primitive values (such as
integers or strings). As long as the patterns cover all of the cases, they
are allowed to overlap (that is, more than one pattern might match a given
value); if so, then the first matching case is selected. At any point in a
pattern we may use the special **wildcard** pattern, underscore (`_`), which
will match any value (but not bind it to anything). Switch statements will
often have a final case matching the wildcard pattern as a "default" case.

For example, here are some functions using the playing card enumerations
from above. First we will define a variant for a playing card, which is either
an ordinary card with a rank and a suit, or a joker:
```reason edit
type card = Card(rank, suit) | Joker;
let card1 = Card(Two, Club);
let card2 = Card(Jack, Spade);
let card3 = Card(Ace, Heart);
let card4 = Joker;
```
Here is a function that determines whether a card is a face card:
```reason edit
let isFace = c => {
  switch (c) {
  | Card(Jack, _) => true
  | Card(Queen, _) => true
  | Card(King, _) => true
  | _ => false
  }
};
isFace(card2);
isFace(card3);
```
Here is a function that tells us if a card is "wild", if we are playing a friendly
game where jokers and black twos are wild:
```reason edit
let isWild = c => {
  switch (c) {
  | Card(Two, Club) => true
  | Card(Two, Spade) => true
  | Joker => true
  | _ => false
  }
};
isWild(card1);
isWild(card2);
isWild(card3);
isWild(card4);
```
Finally, here is a function that will take two cards plus a string, either
"high" or "low". It will return the card with the higher rank; if they have the
same rank, it will just return the first card. If the string argument is "high",
then aces will rank higher than kings, otherwise they will rank lower than twos
(this is somewhat artificial, but I want to show an example with a string
pattern). Jokers are always the highest. The code takes advantage of the
ordering automatically defined on an enumeration, where earlier variants are
less than (`<`) later ones:
```reason edit
let higher = (c1, c2, rule) => {
  switch ((c1, c2, rule)) {
  /* First handle the Jokers */
  | (Joker, _, _) => c1
  | (_, Joker, _) => c2
  /* Handle all of the Ace cases now */
  | (Card(Ace, _), _, "high") => c1
  | (_, Card(Ace, _), "high") => c2 
  | (_, Card(Ace, _), "low") => c1
  | (Card(Ace, _), _, "low") => c2
  /* Handle the remaining cases by comparison */
  | (Card(rank1, _), Card(rank2, _), _) =>
      if (rank1 >= rank2) {
        c1
      } else {
        c2
      }
  }
}
higher(card1, card2, "high"); /* should be the Jack */
higher(card1, card3, "high"); /* should be the Ace */
higher(card1, card3, "low"); /* should be the Two */
higher(card3, card4, "high"); /* should be the Joker */
```

### Recursive Types

When we define a type with the `type` statement, the right-hand-side is allowed to
refer to the new type when assigning the types of components. When specifying such
a **recursive type** there generally needs to be a variant that does not refer to
the new type, to serve as a base case (otherwise it is difficult to get off the
ground when building values of the type). Here are two characteristic examples
that we will be exploring more later:
```reason edit
type myList = Empty | ListNode(int, myList);
type myTree('a, 'b) = Leaf('a) | TreeNode(myTree('a, 'b), 'b, myTree('a, 'b));
```

The type `myList` represents linked lists of integers. Each value is either
an empty list or a list node containing an integer and a value for the rest of
the list. For example, the list `[1, 2, 3]` would be represented by the following
value:
```reason edit
let list123 = ListNode(1, ListNode(2, ListNode(3, Empty)));
```
The natural way to write a function over such a list is by pattern matching, with
the additional wrinkle that we may recursively use the function to process the
rest of the list (since it is a smaller list, we can use structural induction to
prove properties of such a function). Here is a function to add up the numbers
in a list:
```reason edit
let rec sumList = nums => {
  switch (nums) {
  | Empty => 0
  | ListNode(n, rest) => n + sumList(rest)
  }
};
sumList(list123);
```

The type `myTree('a, 'b)` is a parameterized type. It represents binary trees that
are either leaves containing a value of type `'a`, or tree nodes that contain two
subtrees and a value of type `'b`. For example, here is a tree with integers in the
leaves and string labels on the interior nodes; it is meant to represent the
arithmetic expression `1 + 2 * 3`:
```reason edit
let tree123 = TreeNode(Leaf(1), "+", TreeNode(Leaf(2), "*", Leaf(3)));
```
Here is a function defined by pattern matching over trees that evaluates such an
expression:
```reason edit
let rec eval = t => {
  switch (t) {
  | Leaf(n) => n
  | TreeNode(left, "+", right) => eval(left) + eval(right)
  | TreeNode(left, "*", right) => eval(left) * eval(right)
  }
};
eval(tree123);
```
Note that we get a warning that the pattern match is not exhaustive, because we
don't provide cases for all of the possible operator strings. We will look at
better solutions for this eventually.

## Connection to Natural Deduction

Finally, here is the "big reveal" about natural deduction. The proofs that we
constructed were really just programs in a close relative of ReasonML! Here is
a table explaining the analogy:

| Functional Programming | Natural Deduction |
| :- | :- |
| function type `A => B` | implication $A\rightarrow B$ |
| function value `(x: A) => { ... body of type B ... }` | $\rightarrow$ Introduction |
| application `f(a)` | $\rightarrow$ Elimination, from $f: A\rightarrow B$ and $a: A$ |
| tuple type `(A, B)` | conjunction $A\land B$ |
| tuple value `(a, b)` | $\land$ Introduction from $a: A$ and $b: B$ |
| projections `fst`, `snd` | $\land$ Elimination 1 and 2 |
| variant type `Left(A)` &#124; `Right(B)` | disjunction $A\lor B$ |
| constructors `Left`, `Right` | $\lor$ Introduction 1 and 2 |
| switch statement | $\lor$ Elimination |
| `unit` type | $\T$ |

The most complicated comparison here is viewing the switch statement as doing $\lor$
elimination. Consider a proof such as
$$ \begin{array}{l|l}
\ell_1: p\lor q & \text{premise}\\
\ell_2: p\Rightarrow\{\\
\quad\ell_3: q\lor p & \lor I_2\ \ell_2\\
\}\\
\ell_4: q\Rightarrow\{\\
\quad\ell_5: q\lor p & \lor I_1\ \ell_2\\
\}\\
\ell_6: q\lor p & \lor E\ \ell_1, \ell_2, \ell_4
\end{array} $$
Here is an analogous ReasonML function:
```reason edit
type disj('a, 'b) = Left('a) | Right('b);
let orCommutative: disj('a, 'b) => disj('b, 'a) = (l1: disj('a, 'b)) => {
  let l6: disj('b, 'a) = switch (l1) {
  | Left(l2: 'a) => {
      let l3: disj('b, 'a) = Right(l2);
      l3
    }
  | Right(l4: 'b) => {
      let l5: disj('b, 'a) = Left(l4);
      l5
    }
  };
  l6
};
orCommutative(Left(42));
orCommutative(Right("hello"));
```
More idiomatically, taking advantage of type inference and not using so many
`let` statements to label each "line" of the proof, we can write this as:
```reason edit
let orCommutative = a_or_b => {
  switch (a_or_b) {
  | Left(a) => Right(a)
  | Right(b) => Left(b)
  }
};
orCommutative(Left(42));
orCommutative(Right("hello"));
```

One of the very powerful aspects of this analogy between typed functional
programming and logical proofs is that, for those parts of a program that
are just doing the "administrative" work of shuffling around pieces of
data structures in a generic way, there is just one straightforward way to
put the pieces together that will satisfy the type-checker. Writing this
kind of program is akin to proving an equivalence in logic, and there is
a strong hope that this sort of code could be generated automatically, or
at least with significant machine assistance, leaving programmers to work
on the more interesting parts of the problem.

Missing from this analogy is how to treat negation and contradiction ($\F$).
The simplest approach in ReasonML is probably to treat negation $\lnot A$ as
equivalent to the implication $A\rightarrow\F$. We do not have a type that
corresponds to $\F$, because there are not supposed to be any values of that
type (since they would correspond to proofs of a contradiction!). However,
we can extend our analogy so that reaching a contradiction is like throwing
an exception to abort the program. In ReasonML, the expression `raise Exit`
may be used where _any_ type of value is expected, and if it is evaluated then
the program will abort (unless we have an exception handler in place&hellip;).
This corresponds to _ex falso quodlibet_, the $\F$ elimination rule: if we
reach a contradiction, we can get a proof of any proposition, _i.e._, a result
of any type. If negation is an implication of $\F$, then the analogue to
$\lnot A$ in ReasonML would be a function that takes a parameter of type `A`
and throws an exception&mdash;if it is truly the case that there is no value
of type `A` (that is, no proof of $A$, which is what we would hope if $\lnot A$
is true), then this function can never be called.[^This now accounts for all
of natural deduction except for the double-negation elimination rule, which
we already observed is difficult to justify from a computational viewpoint.
It would allow us to go from knowing that $\lnot A$ is not true to somehow
having a proof that $A$ is true, but there is a long distance from knowing that
a number is not prime, for example, to being able to show that it is composite by giving
its factors&mdash;much of modern cryptography relies on this distance!]

## Exercises

1. Write ReasonML functions that compute the inclusive and exclusive OR
   operations. That is, write Boolean functions `or(x, y)` and `xor(x, y)` that
   will return `true` if one of `x` or `y` is `true`; in the inclusive case,
   `or(true, true)` is also `true`, while for the exclusive case,
   `xor(true, true)` is `false`. Use pattern matching for one, and `if`
   expressions for the other (but do not use the built-in logical operators such
   as `||`).

2. Add a `Triangle` variant to the `shape` type above. The constructor should
   take two floats: the base and the height. Extend the `area` function to
   handle triangles, and then define a `perimeter` function for shapes.

3. Define a function that takes a `myTree('a, 'b)` value and counts the number
   of leaves. That is, the function call
   `numLeaves(TreeNode(Leaf(27), "+", TreeNode(Leaf(3), "*", Leaf(5))))`
   should return 3. _Hint:_ Define it using a pattern match.

4. Based on the `curry` and `uncurry` functions, give a natural deduction proof
   of the arguments $(p\land q)\rightarrow r\vdash p\rightarrow(q\rightarrow r)$
   and its converse $p\rightarrow(q\rightarrow r)\vdash(p\land q)\rightarrow r$.

5. We have observed that modus ponens, the $\rightarrow$ elimination rule,
   corresponds to function application. What operation on functions corresponds
   to the Law of Syllogism ($p\rightarrow q,q\rightarrow r\vdash p\rightarrow
   r$)?

6. Prove the logical equivalence $(p\lor q)\rightarrow r\equiv(p\rightarrow
   r)\land(q\rightarrow r)$. Give the analogous ReasonML functions that show the
   1-1 correspondence between the types `disj('a, 'b) => 'c` and
   `('a => 'c, 'b => 'c)`.


## TODO
another page on common patterns of recursion: map, reduce, fold, accumulator,
auxilliary function, tail-recursion, mutual recursion. A page on functional graphics.
A summary page on ReasonML.