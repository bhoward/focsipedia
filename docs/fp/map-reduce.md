---
id: map-reduce
title: Map and Reduce on Lists
---

Two of the most fundamental operations on lists are `map` and `reduce`.
In an extended form,[^1] they are the basis of one of the big success stories of functional programming: Google's [MapReduce](http://static.googleusercontent.com/media/research.google.com/es/us/archive/mapreduce-osdi04.pdf) framework.
The idea is fairly simple: given a huge amount of data (say, the result of crawling the web) stored across a large distributed cluster of servers, many jobs can be broken into two steps:

* **Map**: apply some function uniformly across all of the pieces of data, running in parallel on all of the machines in the cluster;
* **Reduce**: collect up the results of the map phase into some sort of summary by applying a function that combines several results into one; this can first be done locally on each machine, and then spread to combine results from larger and larger groups of machines until the entire cluster has been summarized.

[^1]: Google's MapReduce is actually expressed in terms of collections of values paired with _keys_ that are used to distribute and collect related data; the simplification here is that we are essentially giving every value the same key, so the summary produced by `reduce` will be a single item.

For example, the map operation might extract keywords from web pages, while the reduce operation might produce a table counting the occurrences of each keyword.
Engineers at Google recognized that many of their tasks fit this model, and they could save a huge amount of effort by writing a framework to do all of the distributed processing, with associated optimizations and error handling, just once; all that needed to be supplied for any given use of the framework was two (pure) functions: the function to be mapped and the function to perform the reduction.

Here is what the `map` and `reduce`[^2] operations look like on lists:
```scala mdoc
def map[A, B](f: A => B, data: List[A]): List[B] = {
  data match
    case Nil => Nil
    case head :: tail => f(head) :: map(f, tail)
}

def reduce[A, B](g: (B, A) => B, init: B, data: List[A]): B = {
  data match
    case Nil => init
    case head :: tail => reduce(g, g(init, head), tail)
}

map((n: Int) => 2 * n, List(1, 2, 3))
reduce((a: Int, b: Int) => a + b, 0, List(1, 2, 3))
```

Given functions `f` and `g` and a list `xs = List(x1, x2, ..., xn)`:
* the action of `map(f, xs)` is to produce `List(f(x1), f(x2), ..., f(xn))`, and
* the action of `reduce(g, init, xs)` is to produce `g(...g(g(init, x1), x2)..., xn)`.
If we think of `g` as a binary operator, this is `init g x1 g x2 ... g xn`.

The code shows two simple examples of using `map` and `reduce`.
The first maps the function `n => 2 * n` over `List(1, 2, 3)`, which returns a list where each element has been doubled.
The second reduces `List(1, 2, 3)` by starting with an initial result of 0.
The reduction function is `(a, b) => a + b`, which says to take the previous result (`a`) and add the next item from the list (`b`).
At the end of the reduction, the result is the sum of all the numbers in the list.

[^2]: This version of reduce is also known as a **left fold** because it repeatedly folds up the list into a result, working from left to right.

## Helper Functions

Sometimes a direct recursive solution to a problem doesn't quite work.
For example, suppose we want to convert a list of words into a single string with commas between each word.
If we try to do this as a reduce operation, the result is close but not correct:
```scala mdoc
reduce((s: String, w: String) => s + ", " + w, "", List("hello", "world"))
```
The problem is that the initial task is not quite the same as the smaller subtask that is left after we handle one element of the list.
Every word _except_ the first needs to be preceded by a comma.[^3]
One way to fix this is to split the task into an initial function that handles the special cases to get things going, plus a helper function (often called `aux` and defined locally in the body of the main function) that does the recursive work.
Here is a solution to the "comma-separated string" problem using a helper function:
```scala mdoc
def stringOfList(words: List[String]): String = {
  def aux(words: List[String]): String = {
    words match
      case Nil => ""
      case head :: tail => ", " + head + aux(tail)
  }

  words match
    case Nil => ""
    case head :: tail => head + aux(tail)
}

stringOfList(List("hello", "world"))
```

Note that the `aux` function here could have just been an application of `reduce` as initially tried above (because we actually _do_ want a comma in front of each word at this point), but we are writing it as its own function to show the pattern.

[^3]: Equivalently, every word except the _last_ needs to be followed by a comma; this observation suggests that another solution is to handle single-word lists as separate base case.

## Accumulators

Helper functions are frequently seen in combination with another technique known as an **accumulator**.
Since a pure functional program is not allowed to modify the values of variables as a computation proceeds, if we want to build up a result over a succession of function calls we can do so by passing along an extra variable containing the result so far. For example, here is another version of the `sum` function from the [introduction](intro.md):
```scala mdoc
def sum(f: Int => Int, a: Int, b: Int): Int = {
  def aux(i: Int, accum: Int): Int = {
    if i > b then accum
    else aux(i + 1, accum + f(i))
  }

  aux(a, 0)
}

sum(i => i * i * i, 3, 5)
```

When the recursion terminates, it is common to just return the value of the accumulator (or to compute a result based on its final value).
Each time the recursion continues, the extra accumulator parameter is passed an updated value of the current result.

As another example, consider a function to reverse the order of the elements of a list.
Doing this directly by recursion is difficult, because we would need to take the head element and somehow put it at the far end of the recursively reversed tail of the list; it is inefficient to access the last position in a list, because we only have direct access to the first position (the head) and we would need to traverse and copy the entire list to add something at the other end.
However, if we use an accumulator to collect up the reversed list from left to right, the process is easy:
```scala mdoc
def reverse[A](data: List[A]): List[A] = {
  def aux(rest: List[A], accum: List[A]): List[A] = {
    rest match
      case Nil => accum
      case head :: tail => aux(tail, head :: accum)
  }

  aux(data, Nil)
}

reverse(List("This", "is", "a", "test"))
```

We can often find recursive approaches to problems that are _almost_ correct, except the input or the output needs to be reversed.
Now that we have an efficient `reverse` function, that runs in time proportional to the length of the list, we can solve these problems.
For example, here is a function that can efficiently append two lists, using an accumulator (note that it uses the same helper function as in `reverse`![^4]):
```scala mdoc
def append[A](data1: List[A], data2: List[A]): List[A] = {
  def aux(rest: List[A], accum: List[A]): List[A] = {
    rest match
      case Nil => accum
      case head :: tail => aux(tail, head :: accum)
  }

  aux(reverse(data1), data2)
}

append(List(3, 1, 4, 1, 5), List(9, 2, 6, 5))
```

[^4]: The `aux` function here is sometimes called `reverse_append`, since when applied to lists `data1` and `data2` it produces `append(reverse(data1), data2)`. The Scala library provides it as a method on the List class called `reverse_:::` (and `append` itself is the operator `:::`).

## Tail Recursion

(This section assumes that you know a little bit about how function calls are implemented, by pushing a return address, parameter values, and space for local storage onto a call stack.
When a function returns, it goes back to the saved address&mdash;typically the next instruction after the function call&mdash;and pops the parameters and locals, including the return value, off of the stack.)

Each of the examples above of using accumulators has an interesting property: the recursive call to the helper function is in what is called **tail position**.
That is, the value of the function in the recursive case is just the result of the recursive call&mdash;there is no other operation that needs to be performed after returning from a call to `aux`.

If a function can be written in this **tail recursive** style, then the compiler is able to perform an important optimization: instead of generating a new function call for each recursive invocation, it can just compile a jump back to the top of the function with new values for the local parameters.
When the function finally returns (typically in a base case, such as where the examples above return the value of the accumulator), rather than having to return through a potentially long sequence of function calls saved on the call stack, it just returns directly to the original caller of the function.
This has two significant benefits: since function calls tend to be expensive in terms of machine operations, it saves some time; more importantly, it also avoids building up a large number of saved calls on the stack.
Since the function call stack is frequently limited in size, this optimization can allow a recursive function to call itself thousands or even millions of times without worrying about stack overflow.

In this special case, the code generated for a recursive function will be essentially the same as would have been generated for a loop in an imperative language, so we can regain all of the speed potential of a language like C or Java while still having the flexibility and algebraic reasoning style provided by working with pure functions.
As an example, compare the `sum` function written in Scala with equivalent Java code:
```scala mdoc:reset
def sum(f: Int => Int, a: Int, b: Int): Int = {
  @scala.annotation.tailrec
  def aux(i: Int, accum: Int): Int = {
    if i > b then accum
    else aux(i + 1, accum + f(i))
  }

  aux(a, 0)
}

sum(i => i, 1, 10000)
```

```java
public int sum(Function<Integer, Integer> f, int a, int b) {
  int i = a;
  int accum = 0;
  while (i <= b) {
    accum += f.apply(i);
    i++;
  }
  return accum;
}
```
These will generate essentially the same machine code, but note that in the case of Java we need to be careful about the order in which the varaibles are changed: if I had swapped the order of the statements in the loop it would not have been correct.
In the Scala version, we may think of the index variable (`i`) and the accumulator as both being updated simultaneously when it "jumps back to the top of the loop" (when it makes the tail-recursive call), so the code is easier to reason about and modify.

The `aux` function in this example is preceded by the annotation `@scala.annotation.tailrec`&mdash;this is a notice to the compiler that we expect it to perform the tail-call optimization, and it should give us an error if the function is not in fact tail-recursive.

## Exercises

1. Use a combination of `map` and `reduce` to define a function that will compute the length of a vector, given as a list of doubles.
The length of the vector $List(x_1, x_2, \ldots, x_n)$ is $\sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}$.
The square root function in Scala is `math.sqrt`. For example, `length(List(3.0, 4.0, 12.0))` should be `13.0`.
<details>
  <summary>Answer</summary>

  ```scala
  def length(vec: List[Double]): Double = {
    math.sqrt(reduce((x: Double, y: Double) => x + y, 0.0, map((x: Double) => x * x, vec)))
  }
  ```
</details>

2. Define a version of `reduce` that folds up the result _from the right_.
That is, `reduceRight(g, init, xs)` should compute `g(x1, g(x2, ...g(xn, init)...))`.
<details>
  <summary>Answer</summary>

  ```scala
  def reduceRight[A, B](g: (A, B) => B, init: B, xs: List[A]): B = {
    xs match
      case Nil => init
      case head :: tail => g(head, reduceRight(g, init, tail))
  }
  ```
  Note that this function is not tail-recursive, while the left-to-right `reduce` is. See if you can write a tail-recursive version (_Hint: use `reverse`_).
</details>

3. Given the function `cons` such that `cons(head, tail)` is `head :: tail`, what is the result of `reduceRight(cons, Nil, xs)`? What is the result of `reduce(snoc, Nil, xs)`, where `snoc(tail, head)` is the same as `cons(head, tail)`?
<details>
  <summary>Answer</summary>

  `reduceRight(cons, Nil, xs)` is just `xs`, while `reduce(snoc, Nil, xs)` is `reverse(xs)`.
</details>
