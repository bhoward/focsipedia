---
id: natded
title: Functional Programming and Natural Deduction
---

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
$$
\begin{array}{l|l}
\ell_1: p\lor q & \text{premise}\\
\ell_2: p\Rightarrow\{\\
\quad\ell_3: q\lor p & \lor I_2\ \ell_2\\
\}\\
\ell_4: q\Rightarrow\{\\
\quad\ell_5: q\lor p & \lor I_1\ \ell_2\\
\}\\
\ell_6: q\lor p & \lor E\ \ell_1, \ell_2, \ell_4
\end{array}
$$
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
is true), then this function can never be called.[^1]

[^1]: This now accounts for all
of natural deduction except for the double-negation elimination rule, which
we already observed is difficult to justify from a computational viewpoint.
It would allow us to go from knowing that $\lnot A$ is not true to somehow
having a proof that $A$ is true, but there is a long distance from knowing that
a number is not prime, for example, to being able to show that it is composite by giving
its factors&mdash;much of modern cryptography relies on this distance!

## Exercises

1. Based on the `curry` and `uncurry` functions, give a natural deduction proof
   of the arguments $(p\land q)\rightarrow r\vdash p\rightarrow(q\rightarrow r)$
   and its converse $p\rightarrow(q\rightarrow r)\vdash(p\land q)\rightarrow r$.

2. We have observed that modus ponens, the $\rightarrow$ elimination rule,
   corresponds to function application. What operation on functions corresponds
   to the Law of Syllogism ($p\rightarrow q,q\rightarrow r\vdash p\rightarrow
   r$)?
   <details>
     <summary>Answer</summary>

     An operation that takes functions $f:p\rightarrow q$ and $g:q\rightarrow r$
     is the composition $\textit{compose}(g, f):p\rightarrow r$.
   </details>

3. Prove the logical equivalence $(p\lor q)\rightarrow r\equiv(p\rightarrow
   r)\land(q\rightarrow r)$. Give the analogous ReasonML functions that show the
   1-1 correspondence between the types `disj('a, 'b) => 'c` and
   `('a => 'c, 'b => 'c)`.
   <details>
     <summary>Answer</summary>

     ```reason
     let forward = f => {
       (a => f(Left(a)), b => f(Right(b)))
     };
   
     let reverse = p => {
       let (a_to_c, b_to_c) = p;
       a_or_b => {
         switch (a_or_b) {
         | Left(a) => a_to_c(a)
         | Right(b) => b_to_c(b)
         }
       }
     };
     ```
   </details>
