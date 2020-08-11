# Map and Reduce on Lists

Two of the most fundamental operations on lists are `map` and `reduce`.
In an extended form,[^Google's MapReduce is actually expressed in terms of collections of values paired with _keys_ that are used to distribute and collect related data; the simplification here is that we are essentially giving every value the same key, so the summary produced by `reduce` will be a single item.] they are the basis of one of the big success stories of functional programming: Google's [MapReduce](http://static.googleusercontent.com/media/research.google.com/es/us/archive/mapreduce-osdi04.pdf) framework.
The idea is fairly simple: given a huge amount of data (say, the result of crawling the web) stored across a large distributed cluster of servers, many jobs can be broken into two steps:

* **Map**: apply some function uniformly across all of the pieces of data, running in parallel on all of the machines in the cluster;
* **Reduce**: collect up the results of the map phase into some sort of summary by applying a function that combines several results into one; this can first be done locally on each machine, and then spread to combine results from larger and larger groups of machines until the entire cluster has been summarized.

For example, the map operation might extract keywords from web pages, while the reduce operation might produce a table counting the occurrences of each keyword.
Engineers at Google recognized that many of their tasks fit this model, and they could save a huge amount of effort by writing a framework to do all of the distributed processing, with associated optimizations and error handling, just once; all that needed to be supplied for any given use of the framework was two (pure) functions: the function to be mapped and the function to perform the reduction.

Here is what the `map` and `reduce`[^This version of reduce is also known as a **left fold** because it repeatedly folds up the list into a result, working from left to right.] operations look like on lists:
```reason edit
let rec map = (f, data) => {
  switch (data) {
  | [] => []
  | [head, ...tail] => [f(head), ...map(f, tail)]
  }
};

let rec reduce = (g, init, data) => {
  switch (data) {
  | [] => init
  | [head, ...tail] => reduce(g, g(init, head), tail)
  }
};

map(n => 2 * n, [1, 2, 3]);
reduce((a, b) => a + b, 0, [1, 2, 3]);
```
Given functions `f` and `g` and a list `xs = [x1, x2, ..., xn]`:
* the action of `map(f, xs)` is to produce `[f(x1), f(x2), ..., f(xn)]`, and
* the action of `reduce(g, init, xs)` is to produce `g(...g(g(init, x1), x2)..., xn)`.

The code shows two simple examples of using `map` and `reduce`.
The first maps the function `n => 2 * n` over the list `[1, 2, 3]`, which returns a list where each element has been doubled.
The second reduces the list `[1, 2, 3]` by starting with an initial result of 0.
The reduction function is `(a, b) => a + b`, which says to take the previous result (`a`) and add the next item from the list (`b`).
At the end of the reduction, the result is the sum of all the numbers in the list.

## Helper Functions

Sometimes a direct recursive solution to a problem doesn't quite work.
For example, suppose we want to convert a list of words into a single string with commas between each word.
If we try to do this as a reduce operation, the result is close but not correct:
```reason edit
reduce((s, w) => s ++ ", " ++ w, "", ["hello", "world"]);
```
The problem is that the initial task is not quite the same as the smaller subtask that is left after we handle one element of the list.
Every word _except_ the first needs to be preceded by a comma.[^Equivalently, every word except the _last_ needs to be followed by a comma; this observation suggests that another solution is to handle single-word lists as separate base case.]
One way to fix this is to split the task into an initial function that handles the special cases to get things going, plus a helper function (often called `aux` and defined locally in the body of the main function) that does the recursive work.
Here is a solution to the "comma-separated string" problem using a helper function:
```reason edit
let string_of_list = words => {
  let rec aux = words => {
    switch (words) {
    | [] => ""
    | [head, ...tail] => ", " ++ head ++ aux(tail)
    }
  };

  switch (words) {
  | [] => ""
  | [head, ...tail] => head ++ aux(tail)
  }
};

string_of_list(["hello", "world"]);
```
Note that the `aux` function here could have just been an application of `reduce` as initially tried above (because we actually _do_ want a comma in front of each word at this point), but we are writing it as its own function to show the pattern.

## Accumulators

TODO

## Tail Recursion

TODO

## Exercises

1. Use a combination of `map` and `reduce` to define a function that will compute the length of a vector, given as a list of floats.
The length of the vector $[x_1, x_2, \ldots, x_n]$ is $\sqrt{x_1^2 + x_2^2 + \cdots + x_n^2}$.
The square root function in ReasonML is `sqrt`. For example, `length([3.0, 4.0, 12.0])` should be `13.0`.

2. Define a version of `reduce` that folds up the result _from the right_.
That is, `reduceRight(g, init, xs)` should compute `g(x1, g(x2, ...g(xn, init)...))`.

3. Given the function `cons` such that `cons(head, tail)` is `[head, ...tail]`, what is the result of `reduceRight(cons, [], xs)`? What is the result of `reduce(cons, [], xs)`?