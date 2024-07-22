---
id: types
title: Types in Functional Programming
---

One of the hallmarks of modern functional programming is a strong and rich
systems of types. The type of an expression can be thought of as the set of all
values that the expression might have; by specifying the type of a parameter to
a function, it constrains the values that may be provided as input. In this
sense, the type of a function is then a form of contract: if the input satisfies
some condition (is a value in the parameter type), then the output is also
guaranteed to satisfy a condition (be a value of the result type).

## Functions

In Scala we write the type of functions from `A` to `B` as `A => B`. Given a
function `f` of that type, if `x` is a value (or more generally any expression)
of type `A`, then the **application** `f(x)` will give us a result of type `B`.
The value `x` to which we apply the function is known as the **argument**.
For example, `String.valueOf` is a function of type `Int => String`; when we
apply it to an integer, it returns the string of digits representing the argument:
```scala mdoc
String.valueOf(42);
```

Since functions are first-class values, we may bind a function to another name:
```scala mdoc
val f: Int => String = String.valueOf
f(42)
```
The type annotation after `f` is required here, because there are several overloaded
functions named `String.valueOf`, each taking a different type of argument (`Int`,
`Double`, `Boolean`, &hellip;), and we need to select the one for `Int`.

To create a function value, we use the double arrow to show that we are taking
a parameter, for example `p`, and using it to compute a result:
`p => expression`.
The parameter may optionally be followed by a type: `(p: T) => expression`; we will
see that in many cases Scala can infer this type, but sometimes it is needed to resolve
ambiguity.
The parameter may be any variable name&mdash;it
will represent the value of the argument just within the
result expression. That is, if the variable name had been used outside the function,
it will be temporarily "shadowed" by the new binding; when the function has returned
its result, the local binding to the argument goes away.

Consider the following example:
```scala mdoc:reset
val x = 5
val f = (x: Int) => x + 12
f(x * x) + x
```

The value bound to the first `x` is the integer 5.
When `f` is applied to its argument,
which is `x * x`, or 25, we will temporarily bind 25 to a new, local variable
named `x` and evaluate the body of the function: `x + 12`, which gives 37.
After this, the temporary binding of 25 to `x` is forgotten.
Continuing to evaluate the expression `f(x * x) + x`, we now have `37 + x`;
since `x` here refers to the original binding, this is `37 + 5`, so it produces
the final answer 42.

## Type Inference

Scala does not require that we specify the types of variables most of the
time, because it can usually infer what types they should have from the context
and how they are used. Looking at the example above, since 5 is an int, we know
that `x` must have type `int`. In the second line, we must declare the type `Int` for
the parameter `x`, because we do not know the expected type of the function `f`.
The result of the function body will be an `Int`, so we now know
the type of `f` is `Int => Int`. Finally, the application of `f` in the third line
checks out, because it is applied to an integer argument (`x * x`), and its result
is used in a further integer addition. We could be explicit about the types and
add a **type annotation** to each of the bindings:
```scala mdoc:reset
val x: Int = 5
val f: Int => Int = (x: Int) => x + 12
val y: Int = f(x * x) + x
```
However, the convention in Scala is that, apart from function signatures, type
annotations are not generally used except as documentation and as a check that
the compiler is doing what we think it is.

:::tip Additional Reading
[Currying](curry.md) is an interesting operation on functions, although we will not
be needing it in this course.
:::

## Tuples

Perhaps the most basic form of data structure is the **tuple**. We have already
seen this in the context of
[sets and cartesian products](../sets/functions.md#pairs): an $n$-tuple is simply
an ordered listing of $n$ values, traditionally shown in parentheses separated
by commas. The Scala syntax for a tuple type is likewise an ordered listing
of each value's type, in parentheses and separated by commas. For example, the
tuple `(42, "hello", math.Pi)` has type `(Int, String, Double)`:
```scala mdoc
val demo: (Int, String, Double) = (42, "hello", math.Pi);
```

In the case $n=2$, a tuple is just the familiar **pair**. For example, the type
of two-dimensional points with integer coordinates is `(Int, Int)`. Pairs come
with accessor methods named `_1` and `_2` to access the first and second
coordinates, respectively:
```scala mdoc:reset
val p = (5, 10)
val x = p._1
val y = p._2
```
The standard library provides similar accessor functions for $n$-tuples up to $n=22$.[^1]

However, it is frequently more convenient to retrieve
the components of a tuple through an extension of the binding operation, `val`:
```scala mdoc:reset
val demo = (42, "hello", math.Pi) /* construct a tuple */
val (a, b, c) = demo             /* "destruct" a tuple */
```
If we only want to extract some of the components, the other positions may be
filled with a place-holder, the so-called **wildcard** identifier, `_`
(underscore):
```scala mdoc:reset
val demo = (42, "hello", math.Pi)
val (_, greeting, _) = demo
```

[^1]: Why 22? Well, they had to stop somewhere. Also, if you are writing code using
tuples with more than 22 elements, you might want to reconsider your design.

An $n$-tuple when $n=1$ is just an ordinary value (which may be enclosed in
parentheses as usual, for grouping purposes). However, the case when
$n=0$ is more interesting: the only value is the empty tuple, `()`, and its type
is named `Unit`:
```scala mdoc:reset
val a: Unit = ()
```
Since there is only one value of type `Unit`, it carries no information. We
will use it when we need to specify a type but its value does not matter. For
example, look at the type of the `println` function in Scala (it is heavily
overloaded, so we are using a type annotation here to select one implementation):
```scala mdoc
val f: Int => Unit = println
```
It returns a value of type `Unit` because there is nothing to be
returned. In fact, this is a strong hint that this function does its work via
side-effects (albeit the relatively benign side-effect of sending some
characters to the console).

## Type Aliases and Parameterized Types

Given the importance of types, and potentially complicated type expressions, in
Scala, it should not be a surprise that they can be named and manipulated
much like ordinary values with variables and functions.[^2]
We give a name to a type with the `type` statement:
```scala mdoc
type IntPoint = (Int, Int)
type MathOp = Double => Double => Double
val p: IntPoint = (5, 10)
val plus: MathOp = x => y => x + y
```

[^2]: Scala does not go quite all the way with making types be first-class values. There is currently
active work on creating industrial-strength languages with so-called **dependent
types**, where types are values and values can be used in types. Good examples are
Agda (https://github.com/agda/agda), Idris (https://www.idris-lang.org/), and Lean
(https://leanprover.github.io/).

If we have a family of types where one or more parts can be substituted with an
arbitrary type, then we can introduce a **parameterized type alias** by adding
type parameters.
```scala mdoc
type Point[A] = (A, A)
type BinaryOp[Op, Res] = Op => Op => Res
type Printer[T] = T => Unit
val p1: Point[Int] = (5, 10)
val p2: Point[Double] = (5.0, 10.0)
val int_plus: BinaryOp[Int, Int] = x => y => x + y
val string_eq: BinaryOp[String, Boolean] = s => t => s == t
val print_point: Printer[Point[Int]] = (p) => {
  printf("(%d, %d)", p._1, p._2)
}
print_point(p1)
```

## Constructors and Variants

A tuple is a rather generic way of packaging up data. When you are building a larger
program, it would not be very meaningful to see a value like `("Brian", 93)` out of
context. Just as programmers are encouraged to use symbolic names for constants (for
example, `LINE_WIDTH` instead of 80), we can attach names to particular uses of tuples
to make them more readable and maintainable.

The object-oriented solution to this is to create an **object** (or **class** of objects)
with named **fields**.
In Java, this might look as follows:
```java
public class Entry {
  private final String name;
  private final int grade;

  public Entry(String name, int grade) {
    this.name = name;
    this.grade = grade;
  }

  public String getName() {
    return name;
  }

  public int getGrade() {
    return grade;
  }
}
```
We can then use it as follows:
```java
Entry entry = new Entry("Brian", 93);
System.out.println(entry.getName() + "'s grade is " + entry.getGrade());
```

In Java 16 (released in March 2021), the concept of a **record** was added to Java
specifically for this purpose: classes of objects with immutable named fields.
The above class can be replaced by this:
```java
public record Entry(String name, int grade) {}
```
It is used the same way, except the automatically-created getters are `name()`
and `grade()` instead of `getName()` and `getGrade()`.
In Java 21 (released in September 2023), the `switch/case` statement was extended
to allow matching values on **record patterns**:
```java
switch (entry) {
  case Entry(var name, var grade):
    System.out.println(name + "'s grade is " + grade);
}
```

While it is nice that Java is finally getting support for this feature (and it is still
in the process of being incorporated into other parts of the language, such as variable
initialization and assignment), it has been
an integral part of most functional languages since the earliest days (the design of
Standard ML had it in 1983, modeled on an earlier language called HOPE).
In Scala, these records are called **case classes**, and this is what the above example
looks like:
```scala mdoc
case class Entry(name: String, grade: Int)

val entry = Entry("Brian", 93)
entry match
  case Entry(name, grade) => println(name + "'s grade is " + grade)
```

Suppose we have a gradebook data structure, containing a bunch of these
`Entry` records bundled with a "grading item" (representing a single assignment
or exam, with a title and maximum number of points).
Now we could write a function `formatGrade` that takes an `Item` and an `Entry`
and generates a string describing one line of the gradebook:
```scala mdoc
case class Item(title: String, max: Int)

def formatGrade(item: Item, entry: Entry): String = {
  val Item(title, max) = item
  val Entry(name, grade) = entry
  name + ", " + title + ": " + grade + "/" + max
}

formatGrade(Item("Midterm", 100), Entry("Brian", 93))
```
The advantage here is that, even though both a grading item and a gradebook entry
are described by a pair of a `String` and an `Int`, we can easily keep them
separate in the code because of the class names and associated field names.
Naming is good!

So far we have seen types where all of the data have the same form: the same number
of components, each with the same set of types, across all values of the type. However,
most interesting data will come in several forms, and our programs will need to make
appropriate decisions based on the form of each piece of data.

### Enumerations

The simplest case of having several **variants** of a data type is an **enumeration**.
An enumerated type is specified as a list of constant cases:
```scala mdoc
enum Suit:
  case Club
  case Diamond
  case Heart
  case Spade
import Suit.*
```
The `import Suit.*` statement allows us to use `Club` instead of `Suit.Club`, and so on.

Unlike tuples or simple tuple-like constructors, we cannot just
expect to match an enumerated value with a `val` binding.
Instead, we need a construct
that gives us a selection among _several_ bindings, one for each variant.
In Scala this construct is the `match` expression, which is similar to the `switch`
statement in many languages:
```scala mdoc
val suit1 = Club
suit1 match
  case Club => "It's a club"
  case Diamond => "It's a diamond"
  case Heart => "It's a heart"
  case Spade => "It's a spade"
```
Scala will guarantee that the only possible values of an expression of an enumerated
type are the listed cases, and it will also check whether all of the cases are covered
in a match.

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
```scala mdoc
enum Shape:
  case Rectangle(width: Double, height: Double)
  case Circle(radius: Double)
import Shape.*
```

Algebraically, this is the set $\text{double}\times\text{double} + \text{double}$, where
the $+$ operation is forming a **disjoint sum** of two sets&mdash;similar to a union, but
attaching some sort of tag to the element of each set so that there are no duplicates.[^3]

[^3]: For example, we could define $A+B=(\{0\}\times A)\cup(\{1\}\times B)$. Then each element
in the disjoint sum would be a pair whose first component is a tag of 0 if the element
came from $A$ and 1 if it came from $B$. Any element in common between $A$ and $B$ will
still be distinguishable by its tag.

We may define a function to compute the area of a shape by doing a case analysis:
```scala mdoc
def area(shape: Shape): Double = {
  shape match
    case Rectangle(width, height) => width * height
    case Circle(radius) => math.Pi * radius * radius
}
area(Rectangle(5.0, 10.0))
area(Circle(10.0))
```

If you are familiar with interfaces and subclasses in an object-oriented language such
as Java, it is instructive to compare this with a typical object-oriented approach (which
is also supported in Scala):
```scala mdoc:reset
trait Shape:
  def area: Double

class Rectangle(val width: Double, val height: Double) extends Shape:
  def area: Double = width * height

class Circle(val radius: Double) extends Shape:
  def area: Double = math.Pi * radius * radius

Rectangle(5.0, 10.0).area
Circle(10.0).area
```
Each class implementing `Shape` is one variant, and the trait (interface)
requires it to provide an `area` method with the correct signature. When we
execute code such as `sh.area`, where `sh` is a variable of type `Shape`,
the underlying Java virtual machine code essentially does a case analysis
of the object currently in `sh` to determine which `area` method to run.

One difference between the functional and object-oriented approaches is that
the functional version makes it easy to add new operations (such as a
`perimeter` function), but it is harder to change the list of variants (for example, to
add triangular shapes) because we have to add a case to all of the
existing operations. Conversely, the object-oriented version makes it easy to
add new variants (just define another class implementing `Shape`), but if we
want to add a new operation to the interface (such as `perimeter`) we need
to implement that method in all of the existing subclasses. This tradeoff
is part of the reason for the existence of hybrid object-functional languages such as
Scala.

### Pattern Matching

The pattern-matching case analysis in a match expression can be very powerful,
since patterns may contain other patterns. We may match on not only variants,
constructors, and tuples, but also on individual primitive values (such as
integers or strings). As long as the patterns cover all of the cases, they
are allowed to overlap (that is, more than one pattern might match a given
value); if so, then the first matching case is selected. At any point in a
pattern we may use the special **wildcard** pattern, underscore (`_`), which
will match any value (but not bind it to anything). Match expressions will
often have a final case matching the wildcard pattern as a "default" case.

For example, here are some functions on playing cards.
First we will define the variants for the suit and rank, as well as a variant
for a playing card, which is either an ordinary card with a rank and a suit, or a joker:
```scala mdoc
enum Suit:
  case Club
  case Diamond
  case Heart
  case Spade
import Suit.*

enum Rank:
  case Number(value: Int)
  case Jack
  case Queen
  case King
  case Ace
import Rank.*

enum Card:
  case Ordinary(rank: Rank, suit: Suit)
  case Joker
import Card.*

val card1 = Ordinary(Number(2), Club)
val card2 = Ordinary(Jack, Spade)
val card3 = Ordinary(Ace, Heart)
val card4 = Joker;
```
Here is a function that determines whether a card is a face card:
```scala mdoc
def isFace(c: Card): Boolean = {
  c match
    case Ordinary(Jack, _) => true
    case Ordinary(Queen, _) => true
    case Ordinary(King, _) => true
    case _ => false
}
isFace(card2)
isFace(card3)
```
Here is a function that tells us if a card is "wild", if we are playing a friendly
game where jokers and black twos are wild:
```scala mdoc
def isWild(c: Card): Boolean = {
  c match
    case Ordinary(Number(2), Club) => true
    case Ordinary(Number(2), Spade) => true
    case Joker => true
    case _ => false
}
isWild(card1)
isWild(card2)
isWild(card3)
isWild(card4)
```
Finally, here is a function that will take two cards plus a string, either
"high" or "low". It will return the card with the higher rank; if they have the
same rank, it will just return the first card. If the string argument is "high",
then aces will rank higher than kings, otherwise they will rank lower than twos
(this is somewhat artificial, but I want to show an example with a string
pattern). Jokers are always the highest. The code takes advantage of the
`.ordinal` property automatically defined on an enumeration, where earlier variants are
less than (`<`) later ones:
```scala mdoc
def higher(c1: Card, c2: Card, rule: String): Card = {
  (c1, c2, rule) match
    /* First handle the Jokers */
    case (Joker, _, _) => c1
    case (_, Joker, _) => c2
    /* Handle all of the Ace cases now */
    case (Ordinary(Ace, _), _, "high") => c1
    case (_, Ordinary(Ace, _), "high") => c2 
    case (_, Ordinary(Ace, _), "low") => c1
    case (Ordinary(Ace, _), _, "low") => c2
    /* Handle the number card cases */
    case (Ordinary(Number(n1), _), Ordinary(Number(n2), _), _) =>
      if n1 >= n1 then c1 else c2
    case (Ordinary(Number(_), _), Ordinary(_, _), _) => c2
    case (Ordinary(_, _), Ordinary(Number(_), _), _) => c1
    /* Handle the face cards by comparison */
    case (Ordinary(rank1, _), Ordinary(rank2, _), _) =>
      if (rank1.ordinal >= rank2.ordinal) then c1 else c2
}
higher(card1, card2, "high") /* should be the Jack */
higher(card1, card3, "high") /* should be the Ace */
higher(card1, card3, "low") /* should be the Two */
higher(card3, card4, "high") /* should be the Joker */
```

### Recursive Types

When we define a type with the `enum` statement, the cases are allowed to
refer to the new type when assigning the types of components. When specifying such
a **recursive type** there generally needs to be a variant that does not refer to
the new type, to serve as a base case (otherwise it is difficult to get off the
ground when building values of the type). Here are two characteristic examples
that we will be exploring more later:
```scala mdoc
enum MyList:
  case Empty
  case Node(head: Int, tail: MyList)
enum MyTree[A, B]:
  case Leaf(value: A)
  case Node(left: MyTree[A, B], value: B, right: MyTree[A, B])
```

The type `MyList` represents linked lists of integers. Each value is either
an empty list or a list node containing an integer and a value for the rest of
the list. For example, the list `[1, 2, 3]` would be represented by the following
value:
```scala mdoc
val list123 = MyList.Node(1, MyList.Node(2, MyList.Node(3, MyList.Empty)))
```
The natural way to write a function over such a list is by pattern matching, with
the additional wrinkle that we may recursively use the function to process the
rest of the list (since it is a smaller list, we can use
[structural induction](../logic/recursion.md#structural-induction) to
prove properties of such a function). Here is a function to add up the numbers
in a list:
```scala mdoc
def sumList(nums: MyList): Int = {
  import MyList.*

  nums match
    case Empty => 0
    case Node(n, rest) => n + sumList(rest)
}
sumList(list123);
```

Scala has a list type built in to the language, with a large number of supporting functions in the standard library.
The type `List[A]` is a list of elements of type `A`;
the empty list is written `Nil`, and the list node with value `x` at the head of the list and `rest` for the tail is written `x :: rest`.
The `::` is called the **cons** operator, and you can either write a list as `1 :: 2 :: 3 :: Nil`, or you can use the constructor form `List(1, 2, 3)`.

The type `MyTree[A, B]` is a parameterized type. It represents binary trees that
are either leaves containing a value of type `A`, or tree nodes that contain two
subtrees and a value of type `B`. For example, here is a tree with integers in the
leaves and string labels on the interior nodes; it is meant to represent the
arithmetic expression `1 + 2 * 3`:
```scala mdoc
val tree123 = MyTree.Node(MyTree.Leaf(1), "+", MyTree.Node(MyTree.Leaf(2), "*", MyTree.Leaf(3)))
```
Here is a function defined by pattern matching over trees that evaluates such an
expression:
```scala mdoc
def eval(t: MyTree[Int, String]): Int = {
  import MyTree.*

  t match
    case Leaf(n) => n
    case Node(left, "+", right) => eval(left) + eval(right)
    case Node(left, "*", right) => eval(left) * eval(right)
}
eval(tree123)
```
We get a warning (not shown by mdoc) that the pattern match is not exhaustive, because we
don't provide cases for all of the possible operator strings. We will look at
better solutions for this eventually.

## Exercises

1. Write Scala functions that compute the inclusive and exclusive OR
   operations. That is, write Boolean functions `or(x, y)` and `xor(x, y)` that
   will return `true` if one of `x` or `y` is `true`; in the inclusive case,
   `or(true, true)` is also `true`, while for the exclusive case,
   `xor(true, true)` is `false`. Use pattern matching for one, and `if`
   expressions for the other (but do not use the built-in logical operators such
   as `||`).
   <details>
    <summary>Answer</summary>

    ```scala
     def or(x: Boolean, y: Boolean): Boolean = {
       (x, y) match
         case (true, _) => true
         case (_, true) => true
         case (_, _) => false
     } 
   
     def xor(x: Boolean, y: Boolean): Boolean = {
       if x then
         if y then false else true
       else y
     }
    ```
   </details>

2. Add a `Triangle` variant to the `Shape` type above, to represent a right triangle. The constructor should
   take two doubles: the base and the height. Extend the `area` function to
   handle triangles, and then define a `perimeter` function for shapes.
   <details>
    <summary>Answer</summary>

     ```scala
     enum Shape:
       case Rectangle(width: Double, height: Double)
       case Circle(radius: Double)
       case Triangle(base: Double, height: Double)
     import Shape.*

     def area(shape: Shape): Double = {
       shape match
         case Rectangle(width, height) => width * height
         case Circle(radius) => math.Pi * radius * radius
         case Triangle(base, height) => base * height / 2
     }

     def perimeter(shape: Shape): Double = {
       shape match
         case Rectangle(width, height) => 2 * (width + height)
         case Circle(radius) => 2 * math.Pi * radius
         case Triangle(base, height) => base + height + math.hypot(base, height)
     }
     ```
   </details>

3. Define a function that takes a `MyTree[Int, String]` value and counts the number
   of leaves. That is, the function call
   `numLeaves(MyTree.Node(MyTree.Leaf(27), "+", MyTree.Node(MyTree.Leaf(3), "*", MyTree.Leaf(5))))`
   should return 3. _Hint:_ Define it using a pattern match.

    <details>
      <summary>Answer</summary>

    ```scala
    def numLeaves(t: MyTree[Int, String]): Int = {
      import MyTree.*

      t match
        case Leaf(_) => 1
        case Node(left, _, right) => numLeaves(left) + numLeaves(right)
    }
    ```
    </details>
