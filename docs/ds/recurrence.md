---
id: recurrence
title: Running Time and Recurrences
---

## Basics of Big-Oh Notation

We will assume that you are already somewhat familiar with the concept of the big-oh notation for describing the growth of functions, but here is a quick review.
Recall that, when comparing growth rates of functions, say $f(N)$ and $g(N)$, we only care about the long-run behavior (_i.e._, for large enough values of $N$), and we ignore constant scaling factors.
That is, we consider $2N^2$ and $200N^2$ to have the same growth rate (both are $O(N^2)$), and both grow faster than $1000000N$ (which is only $O(N)$), even though $2N^2$ is less than $1000000N$ for all $N$ less than $500000$.
The reasoning is that the time (or some other resource, such as memory or disk space) used for small values of $N$ might be an inessential overhead or "startup" cost of one program over another, and even a constant scaling factor might be insignificant when running on different hardware.
The big-oh definition of growth rate thus allows us to compare the overall scaling behavior of algorithms without needing to know implementation details.
It allows us to answer questions such as "if I need to process ten times the number of transactions, how much longer will it take?" or "if we double the amount of memory available, how much more input could we handle?"

The formal definition of a function[^1] $f$ having another function $g$ as an upper-bound in terms of growth rate, which we express by saying that $f=O(g)$, is:

$$
\exists N_0, k \left(\forall N\geq N_0(f(N)\leq k\cdot g(N))\right)
$$

That is, there is some constant factor $k$ such that $f(N)$ is never more than $k$ times $g(N)$, whenever $N$ is at least as large as $N_0$. Notice that we are only saying that $g$ is *an* upper-bound of $f$; there is nothing to stop us from making a very weak statement such as $3N=O(2^N)$, even though $3N$ is actually linear in $N$.

[^1]: For this section, all functions are assumed to be from the natural numbers to the positive reals, so that we do not have to worry about negative values.

Although the definition allows us to compare any two functions $f$ and $g$, we will usually take $g$ to be one of the following common "representative" functions, ordered by increasing growth rate:

| Function $g(N)$ | Common name for $O(g)$ |
| :-------------: | :--------------------: |
| $1$             | Constant               |
| $\log N$        | Logarithmic            |
| $N$             | Linear                 |
| $N\log N$       | Quasilinear            |
| $N^2$           | Quadratic              |
| $N^3$           | Cubic                  |
| $2^N$           | Exponential            |
| $N!$            | Factorial              |

A **constant** growth rate means that the function does not depend on its input; a program that runs in constant time will do the same work for ten items as for ten million.
A **logarithmic** growth rate is often almost as good, at least for practical purposes: for example, $\log_2 1000N\approx 10+\log_2 N$, so growing the size of the input by a factor of a thousand might only add ten "steps" to the operation; even billions of input items may only require a few dozen steps.
This example uses logarithms base two, which matches common algorithms where problems are broken up into smaller problems of half the size, but in fact the base of the logarithm does not matter for big-oh, because $\log_a N=O(\log_b N)$ for any constants $a$ and $b$ greater than one (more precisely, $\log_a N=(\log_a b)(\log_b N)$, so the constant factor is $k=\log_a b$).
Therefore, we will usually omit the base of the logarithm when talking about growth rates.

A **linear** growth rate is often the best that can be expected of a program that actually has to look at all of its input, since the act of just reading $N$ items must take time at least proportional to $N$. **Quasilinear** growth is again almost as good for most practical purposes; going from *twenty* million operations to process a million items, to *thirty* billion operations to process a billion items, is not much of a penalty.

A **quadratic** (or **cubic**, or higher polynomial) growth rate starts to become a problem.
Every time the input grows by a factor of one thousand, the running time of a quadratic algorithm will grow by a factor of one million.
While it might be practical to take millions of steps to process thousands of inputs, it will probably be unacceptable to require trillions of steps when the input size is in the millions.

Beyond that, **exponential** and **factorial** growth rates are completely infeasible for all but the smallest input sizes.
Since $2^{30}$ is around one billion, a modern processor should be able to handle thirty input items, but for each additional item the running time will double; at forty items it will already take a trillion steps.
Should your exponential algorithm be presented with one hundred items, $2^{100}\approx 1.27\times 10^{30}$, so it will take more time to complete than the current age of the universe, even if your computer can perform a trillion operations per second.
With factorial growth, $30!\approx 2.65\times 10^{32}$, so even *thirty* items is infeasible.

We will occasional use some related notations:

* If $f$ is an upper bound of $g$, we will write $f=\Omega(g)$ ("big-omega"); this is the same as saying $g=O(f)$.

* If both $f=O(g)$ and $f=\Omega(g)$, then we will write $f=\Theta(g)$ ("big-theta"); this says that $g$ is a "tight" bound, and $f$ has essentially the same growth rate as $g$.

* To express that $f$ grows strictly slower than $g$, we will write $f=o(g)$ ("little-oh"). One way to define this is when the limit of $f$ over $g$ approaches zero as $N$ goes to infinity:

$$
\lim_{N\rightarrow\infty} \frac{f(N)}{g(N)}=0.
$$

We will not spend more time here on techniques to work with big-oh notation, other than to observe the very common case where $f$ is a sum of terms (such as a polynomial): $f(N) = c_1f_1(N) + c_2f_2(N) + \cdots + c_nf_n(N)$. If we can determine $k$ such that $f_k$ has the fastest growth rate of all of the $f_i$ (that is, $f_i = o(f_k)$ for all $i\ne k$), then we may conclude that $f=O(f_k)$. For example, if we know that $f(N) = 3N^2 + 6N\log N + 8N + 17$, then we may ignore all of the terms except the first and say that $f=O(N^2)$.

## Work and Span

As mentioned above, we may use big-oh estimates of function growth to evaluate more than just the running time of an algorithm.
We may also be interested in predicting how much memory will be needed, or disk space, or the probability of some combination of events.

In the field of **parallel programming**, we can generalize the calculation of running times to predict the benefit from splitting a computation across multiple processors.
For this, we will need to estimate two related quantities:

* The **work** done by an algorithm is the total number of operations to be performed. It is frequently denoted $T_1$, because it is the time required if you only have one processor available. This is the usual **sequential** running time.

* The **span** of an algorithm is the length of the longest "chain of dependencies" in the calculation&mdash;that is, it counts the number of steps where the result of each is needed before the next can be performed. It is frequently denoted $T_\infty$, because it is also the time required in the ideal case of achieving perfect parallelism across an unlimited number of processors. We have already seen an example of the span when we considered the [delay of a combinational circuit](../logic/simplify).

A result known as **Brent's Theorem** now allows us to compute bounds on $T_p$, the time to run the algorithm on $p\geq 1$ processors:

$$
\frac{T_1}{p}\leq T_p\leq\frac{T_1}{p} + T_\infty.
$$

## Recurrences for loops and recursive functions

If we have a program that takes some input and computes a result, we may calculate an estimate of the running time of that program.
We will proceed by performing a **structural induction** on the program code; we will not be doing this formally, but the idea is that our base cases will be the simple statements, such as performing arithmetic and binding values to variables&mdash;these will be assumed to take constant time.
The inductive cases will be the compound statements, such as conditionals (`if`), loops (`for` and `while`), and function calls&mdash;the times for these will be calculated from the times of their components.

Here is an example in pseudocode:
```
function a(n):
  var s = 0                // a1
  for i = 1 to n:          // a2
    s := s + i             // a3
  return s                 // a4

function b(n):
  if n = 0:                // b1
    return 0               // b2
  else:                    // b3
    return n + b(n - 1)    // b4

main:
  var n = input            // m1
  while n > 0:             // m2
    if a(n) != b(n):       // m3
      print "Mismatch"     // m4
    n := n - 1             // m5
  print "Done"             // m6
```

The `main` program here reads one number (n) of input, and then loops that many times, counting down toward zero, checking whether the `a` and `b` functions (which each take one argument and return the sum from 1 to that number) agree.
For this program, we will be interested in the running time as a function of the input value; for other programs, the interesting parameter might be the *number* of inputs instead (for example, when sorting or searching).

We will start by calculating the running time of function `a`.
The lines labeled `a1`, `a3`, and `a4` are each simple statements that we will assume take $O(1)$ time.
The loop in line `a2` tells us to repeat line `a3` a total of $n$ times; since `a3` is $O(1)$, the entire loop will be $O(n)$.
Note that we are ignoring any overhead from initializing, continuing, or terminating the loop&mdash;at most, they will add another $O(1)$ amount to each time through the loop, plus an additional $O(1)$ at the beginning and end, but $O(2n+2)$, or whatever, is still $O(n)$.
Adding up all of the time for the body of `a` gives a total running time $T_a(n) = O(n)$.

Turning to function `b`, the line `b2` is clearly an $O(1)$ operation, but line `b4` includes a function call.
If we express the time for function `b` as $T_b(n)$, then we should say that the time for line `b4` is $T_b(n-1) + O(1)$.
Although we don't have a closed-form expression for $T_b$ yet, we will assume that it is Somebody Else's Problem to figure out $T_b(n-1)$, and rely on their answer to be able to evaluate the larger problem of calculating $T_b(n)$.

For the conditional (lines `b1` and `b3`), we start with the time to evaluate the condition&mdash;checking whether $n$ is zero can be done in constant time.
Since we are interested in an upper bound on the running time, we can then consider the two branches and take their *maximum*.
The true branch is $O(1)$, while the false branch is $T_b(n-1) + O(1)$, so we will use the latter as our estimate.
Folding in the time for the test gives an overall running time of $T_b(n-1) + O(1)$.

That now gives us a running time for `b` given by the **recurrence** $T_b(n) = T_b(n-1) + O(1)$.
A recurrence is really just a recursive function, although rather than evaluating it for a particular $n$ we will be more interested in solving the equation to find a **closed-form** expression for $T_b$.
For completeness, we should also give a base case for the recurrence: $T_b(0) = O(1)$, because if we know that the input is 0 then we can improve our estimate of the time for the `if` statement (we know that it will use the true branch).
We will often be sloppy and omit mentioning the base case in the common situation that it only contributes a constant amount of work.
We will discuss several approaches to solving recurrences below, but in this simple example it should be obvious that $T_b(n) = O(n)$.

Finally, looking at the `main` program, lines `m1`, `m4`, `m5`, and `m6` are all $O(1)$.
For the conditional at line `m3`, the true branch is $O(1)$ and the false branch is missing; if the program works correctly,
we actually expect it to always choose the false branch, but that doesn't mean that the statement takes zero time!
Remember that we also have to account for the time to evaluate the condition&mdash;in this case, that involves making two function calls, each of which take $O(n)$ time, so the entire `if` statement is also $O(n)$.

This leaves us with the `while` loop at `m2`.
It's body is $O(n) + O(1) = O(n)$, but notice that the value of $n$ is changing each time through the loop.
We may express the running time of the loop with another recurrence: $T_w(n) = O(n) + T_w(n-1)$.
That is, the time to do the `while` loop for a given value of $n$ is $O(n)$ for the body, plus an additional $T_w(n-1)$ for the remaining times through the loop.[^2]
To perform this calculation, we will temporarily replace the $O(n)$ estimate with the exact value $n$; expanding out the recurrence then gives us the result $T_w(n) = O(n + (n-1) + \cdots + 2 + 1)$.
Since the sum of the numbers from 1 to $n$ is $\frac{1}{2}n(n+1)$, this gives us $T_w(n) = O(n^2)$.

Therefore, the total running time of the program is quadratic in its input.

[^2]: Technically we should also add an $O(1)$ term for the overhead of checking the loop condition and branching back or out of the loop, but since that is dominated by the $O(n)$ term it may be ignored.

## Examples of common cases

## Master Theorem?

## Exercises
