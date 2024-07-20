---
id: overview
title: Overview of Functional Programming
---

There is a more extensive [introduction to FP](intro.md) later, but this section provides an early introduction to some of the concepts and tools that we will be using throughout the course.
The language we will be using is called [Scala](../scala.md).
Here is an example of Scala code:
```scala mdoc
val answer = 6 * 7
```
The [mdoc](https://scalameta.org/mdoc/) tool used in creating FoCSipedia automatically runs Scala code and inserts the results in comments.

## Expressions and the Substitution Model

One of the core principles of functional programming is that programs are made up of **expressions** that may be evaluated.
They are composed of constants, variables, operators, and function calls, as in most languages, plus compound forms such as [blocks](#blocks-and-local-values) and `if` statements.
Unlike most languages you are likely to have worked with, there are no assignment statements to change the values of variables&mdash;the only way to store a value in a variable is to put it there when the variable is created.[^1]
When you write `val answer = 6 * 7`, the variable `answer` is created and assigned the value of the expression `6 * 7`, which is `42`.
From then on, whenever you refer to that variable you will get the same value.

[^1]: This is not quite true. In Scala, a variable declared with `var` instead of `val` may be modified by later assignments, just as in Java, but for the most part we will not use this feature.

The **Substitution Model** arises from this fact about variables: since the value of an expression cannot change, you are free to "substitute equals for equals," just as in algebra.
If you see the expression `answer + 1`, you know that this is the same as `(6 * 7) + 1`.
This seemingly simple observation is the basis of many of the powerful techniques that are enabled by functional programming; you will learn more about this later, but just one application is in optimizing code to be run in parallel on a multi-processor machine&mdash;if you know that the substitution model holds, then the compiler has great freedom to rearrange when and where values are computed to maximize the use of the available processors.
In a language without the substitution model, where the value of a variable depends on the last time it was changed in an assignment statement, it is much harder to do this kind of optimization.

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
val result =
  val local1 = "Hello"
  val local2 = "World"
  local1 ++ " " ++ local2
println(result)
```

The nested lines are called a **block**.
Within a block, we may have a series of **local value definitions**.
The value of the expression (which is then bound as the value of `result`) is the value of the last expression in the block, `local1 ++ " " ++ local2` (note that `++` is the string concatenation operator in Scala).
Before it evaluates that expression, however, it first evaluates each of the `val` statements (in order), temporarily binding those values to the given local variables.
In the example, `local1` and `local2` are each bound to their corresponding string values, and then the final expression is evaluated relative to those variable bindings.

The names of variables within a block are completely invisible outside their block.
After the block is finished, it is as if those local bindings never took place.
This allows us to use local reasoning about the value of an expression, without having to know what might have happened in other blocks (which might have coincidentally used the same variable names).

```scala mdoc:fail
println(local1)
```

The syntax of Scala is intentionally designed to be familiar to programmers who are used to languages like C, C++, Java, JavaScript, and Python.
Although Scala 3 encourages grouping blocks of code by indentation level, it also allows the use of braces if you are more comfortable with them:

```scala mdoc:reset
val result = {
  val local1 = "Hello"
  val local2 = "World"
  local1 ++ " " ++ local2
}
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

```scala mdoc
val x = {
  val x = 3
  x + x
} * {
  val x = 4
  x + x
}
```
</details>

## Pure Functions and Parameters

So far, we have only talked about expressions and variables.
The heart of functional programming, of course, is the **function**.
In Scala, functions are just another type of value, along with integers, strings, _etc._
We write the function value that takes **parameters** `a`, `b`, `c` and returns the expression `e` using the syntax `(a, b, c) => e`.
This value is what is known as an **anonymous function**; to give it a name, we may bind it to a variable, just like any other value:
```scala mdoc
val area = (width: Int, height: Int) => width * height
println(area(6, 7))
```
Note that each parameter specifies both an **identifier** and a **type**.
We will have more to say about [types](types.md) later, but for now observe that common types such as `Int`, `Double`, and `String` are available (just like in Java, except the first letter is capitalized).

In the second line of this example, after assigning the function value to `area`, we are able to use `area` as the name of a function just like the built-in functions (such as `println`).

When Scala reports the bindings that result from this code, it says that `area` has the type `Function2[Int, Int, Int]`&mdash;this reflects the fact that a function value is actually an object of a class implementing a particular **trait** (which is analogous to a Java interface).
This function type may also be written `(Int, Int) => Int`, which you can think of as giving a picture of a typical use of the function: when applied to two `Int` arguments, it returns an `Int` result.

Because functions are just another kind of value, they may themselves be passed as arguments to functions, or returned as results; we will explore these **higher-order** functions later.

Since expressions are evaluated according to the substitution model, where we do not have to worry about a variable changing its value between the time is was declared (**bound**) and used, we know several very useful facts about functions:
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

[^2]: Technically, some Scala functions _may_ have a side-effect, if they call input/output functions such as `println`.
That is, you can tell the difference between calling such a function once, twice, or not at all, by looking at the output that is printed to the console.
We will consider this sort of side-effect to be benign, however, and we will generally use such functions only in very controlled places in a program, or only when tracing or debugging code.
Of course, this also assumes that we are avoiding the use of reassignment to a variable declared with `var` instead of `val`.

## Exercises

TBD