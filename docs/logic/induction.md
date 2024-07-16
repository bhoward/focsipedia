---
id: induction
title: Mathematical Induction
---

(Content adapted from Critchlow & Eck)

When we want to prove quantified statements such as $\forall xP(x)$, we can only
get so far with the natural deduction rules seen in the previous section. For
most results we will need to know more about the structure of the domain of discourse.

The structure of the natural numbers&mdash;0, 1, 2, 3, and on to infinity&mdash;makes 
possible a powerful proof technique known as **induction** or **mathematical induction**.
The idea behind induction is simple. Let $P$ be a one-place predicate
whose domain of discourse includes the natural numbers. Suppose that
we can prove that $P(0)$ is true. Suppose that we can also prove
the statements $P(0)\rightarrow P(1)$, $P(1)\rightarrow P(2)$, $P(2)\rightarrow P(3)$,
and so on. The principal of mathematical induction is the observation
that we can then conclude that $P(n)$ is true for _all_ natural
numbers $n$.
This should be clear. Since $P(0)$ and $P(0)\rightarrow P(1)$ are true,
we can apply the rule of _modus ponens_ to conclude that $P(1)$
is true. Then, since $P(1)$ and $P(1)\rightarrow P(2)$ are true, we can
conclude by _modus ponens_ that $P(2)$ is true. From $P(2)$
and $P(2)\rightarrow P(3)$, we conclude that $P(3)$ is true. For any
given $n$ in the set $\N$, we can continue this chain of deduction for $n$ steps
to prove that $P(n)$ is true.

When applying induction, we don't actually prove each of the
implications $P(0)\rightarrow P(1)$, $P(1)\rightarrow P(2)$, and so on, individually.
That would require an infinite amount of work. The whole point of
induction is to avoid any infinitely long process. Instead, we
prove $\forall k\,(P(k)\rightarrow P(k+1))$ (where the domain of discourse for the
predicate $P$ is $\N$).
The statement $\forall k\,(P(k)\rightarrow P(k+1))$ summarizes all the
infinitely many implications in a single statement. Stated formally,
the principle of
mathematical induction says that if we can prove the statement
$P(0)\land \big(\forall k\,(P(k)\rightarrow P(k+1)\big)$, then we 
can deduce that $\forall n\,P(n)$ (again, with $\N$ as the domain
of discourse).

It should be intuitively clear that the principle of induction
is valid. It follows from the fact that the list 0, 1, 2, 3, &hellip;,
if extended long enough, will eventually include any given
natural number. If we start from $P(0)$ and take enough steps
of the form $P(k)\rightarrow P(k+1)$, we can get $P(n)$ for any given natural number $n$.
However, whenever we deal with infinity, we are courting the possibility
of paradox. We can prove the principle of induction rigorously, but for now
we just state it as a theorem:

> **Theorem: Mathematical Induction**  
Let $P$ be a one-place predicate whose domain of discourse includes
the natural numbers. Suppose that $P(0)\land \big(\forall k\in\N\,(P(k)\rightarrow P(k+1))\big)$.
Then $P(n)$ is true for all natural numbers $n$. (That is, 
the statement $\forall n\,P(n)$ is true, where the domain of discourse for $P$ is
the set of natural numbers.)

Mathematical induction can be applied in many situations:
you can prove things about strings of characters by doing induction on the
length of the string, things about graphs by doing induction on the
number of nodes in the graph, things about grammars by doing induction on
the number of productions in the grammar, and so on. An extension known as
**structural induction** will allow us to prove things about data structures
such as lists and trees. We'll
be looking at applications of induction for the rest of this chapter,
and throughout the remainder of the text.
Although proofs by induction can be very different from one
another, they all follow just a few basic structures. A proof based
on the preceding theorem always has two parts. First, $P(0)$
is proved. This is called the **base case** of the induction.
Then the statement $\forall k\,(P(k)\rightarrow P(k+1))$ is proved.
This statement can be proved by letting $k$ be an arbitrary
element of $\N$ and proving $P(k)\rightarrow P(k+1)$. This in turn can
be proved by assuming that $P(k)$ is true and proving that
the truth of $P(k+1)$ follows from that assumption. This case is called
the **inductive case**, and $P(k)$ is called the **inductive hypothesis** or
the **induction hypothesis**.
Note that the base case is just as important
as the inductive case. By itself, the truth of the statement $\forall k\,(P(k)\rightarrow P(k+1))$
says nothing at all about the truth of any of the individual statements $P(n)$.
The chain of implications $P(0)\rightarrow P(1)$, $P(1)\rightarrow P(2)$, &hellip;, 
$P(n-1)\rightarrow P(n)$ says nothing about $P(n)$ unless the chain is
anchored at the other end by the truth of $P(0)$. Let's look
at a few examples.

> **Theorem:**
The number $2^{2n}-1$ is divisible by 3 for all natural numbers $n$.

> **Proof:**
Here, $P(n)$ is the statement that $2^{2n}-1$ is divisible by 3.
>
**Base case:** When $n=0$, $2^{2n}-1 = 2^0-1=1-1=0$ and $0$ is divisible by 3 
(since $0=3\cdot 0$.) Therefore the statement holds when $n=0$.
>
**Inductive case:** We want to show that if the statement is true for $n=k$ 
(where $k$ is an arbitrary natural number),
then it is true for $n=k+1$ also. That is, we must prove the implication
$P(k) \rightarrow P(k+1)$. So we assume $P(k)$, that is, we assume that $2^{2k}-1$ is
divisible by 3. This means that $2^{2k} -1 = 3m$ for some integer $m$.
We want to prove $P(k+1)$, that is, that $2^{2(k+1)}-1$ is also divisible by 3:
>
$$
\begin{array}{rll}
   2^{2(k+1)}-1 &= 2^{2k+2}-1 &\\
                       &= 2^{2k}\cdot2^2 - 1 &\text{properties of exponents}\\
                       &= 4\cdot 2^{2k} -1 \\
                       &= 4\cdot 2^{2k} -4 + 4 -1 \\
                       &= 4(2^{2k} -1) + 3 &\text{algebra} \\
                       &= 4(3m) + 3 & \text{the inductive hypothesis}\\
                       &= 3(4m+1) & \text{algebra}
\end{array}
$$
>
and from the last line we see that $2^{2k+1}$ is in fact divisible by 3. (The
third step&mdash;subtracting and adding 4&mdash;was done to enable us to use our inductive
hypothesis.)
>
Altogether, we have proved that $P(0)$ holds and that, for all $k$, $P(k) \rightarrow
P(k+1)$ is true. Therefore, by the principle of induction, $P(n)$ is true for
all $n$ in $\N$, i.e. $2^{2n}-1$ is divisible by 3 for all $n$ in $\N$.

The principal of mathematical induction gives a method for proving $P(n)$ for
all $n$ in the set $\N$. It should be clear that if $M$ is any natural number, a similar method can
be used to show that $P(n)$ is true for all natural numbers
$n$ that satisfy $n\ge M$. Just start the induction with a base
case of $n=M$ instead of with a base case of $n=0$. I leave the
proof of this extension of the principle of induction as an exercise.
We can use the extended principle of induction to prove a result
that was first mentioned in the section on [truth tables](props.md#truth-tables). 

> **Theorem:**
Suppose that a compound proposition contains exactly $n$ propositional
variables, where $n\ge 1$. Then there are exactly $2^n$ different ways
of assigning truth values to the $n$ variables.

> **Proof:**
Let $P(n)$ be the statement "There are exactly $2^n$ different ways
of assigning truth values to $n$ propositional variables." We will
use induction to prove the $P(n)$ is true for all $n\ge1$.
>
**Base case:** First, we prove the statement $P(1)$. If there is exactly
one variable, then there are exactly two ways of assigning a truth
value to that variable. Namely, the variable can be either _true
or _false_. Since $2=2^1$, $P(1)$ is true.
>
**Inductive case:** Suppose that $P(k)$ is already known to be true.
We want to prove that, under this assumption, $P(k+1)$ is also true.
Suppose that $p_1$, $p_2$, &hellip;, $p_{k+1}$ are $k+1$ propositional
variables. Since we are assuming that $P(k)$ is true, we know
that there are $2^k$ ways of assigning truth values to
$p_1$, $p_2$, &hellip;, $p_k$. But each assignment of truth values
to $p_1$, $p_2$, &hellip;, $p_k$ can be extended to the complete
list $p_1$, $p_2$, &hellip;, $p_k$, $p_{k+1}$ in two ways. Namely,
$p_{k+1}$ can be assigned the value _true_ or the value
_false_. It follows that there are $2\cdot 2^k$ ways of
assigning truth values to $p_1$, $p_2$, &hellip;, $p_{k+1}$.
Since $2\cdot2^k=2^{k+1}$, this finishes the proof.

The sum of an arbitrary number of terms is written using the
symbol $\sum$. (This symbol is the Greek letter sigma, which is 
equivalent to the Latin letter S and stands for "sum.") Thus, we
have

$$
\begin{array}{l}
   \displaystyle\sum_{i=1}^5 i^2 = 1^2+2^2+3^2+4^2+5^2\\
   \displaystyle\sum_{k=3}^7 a_k = a_3+a_4+a_5+a_6+a_7\\
   \displaystyle\sum_{n=0}^N \frac{1}{n+1} = \frac{1}{0+1}+\frac{1}{1+1}+\frac{1}{2+1}+\cdots+\frac{1}{N+1}\\
\end{array}
$$

This notation for a sum, using the $\sum$ operator, is called
**summation notation**. A similar notation for products uses the
symbol $\prod$. (This is the Greek letter pi, which is equivalent
to the Latin letter P and stands for "product.") For example,
$$
\begin{array}{l}
   \displaystyle\prod_{k=2}^5 (3k+2) = (3\cdot 2+2)(3\cdot 3+2)(3\cdot 4+2)(3\cdot 5+2)\\
   \displaystyle\prod_{i=1}^n \frac{1}{i} = \frac{1}{1}\cdot \frac{1}{2}\cdots \frac{1}{n}
\end{array}
$$

Induction can be used to prove many formulas that use these notations.
Here are two examples:

> **Theorem:**
$\displaystyle \sum_{i=1}^n\, i=\frac{n(n+1)}{2}$ for any integer $n$ greater than zero.

> **Proof:**
Let $P(n)$ be the statement $\displaystyle \sum_{i=1}^n\,i=\frac{n(n+1)}{2}$.
We use induction to show that $P(n)$ is true for all $n\geq 1$.
>
**Base case:** Consider the case $n=1$. $P(1)$ is the statement
that $\displaystyle \sum_{i=1}^1\,i=\frac{1(1+1)}{2}$.
Since $\displaystyle \sum_{i=1}^1\,i=1$ and $\displaystyle\frac{1(1+1)}{2}=1$,
$P(1)$ is true.
>
**Inductive case:** Let $k>1$ be arbitrary, and assume that $P(k)$ is true.
We want to show that $P(k+1)$ is true. $P(k+1)$ is the statement
$\displaystyle \sum_{i=1}^{k+1}\,i=\frac{(k+1)(k+2)}{2}$. But
>
$$
\begin{array}{rll}
   \sum_{i=1}^{k+1}\,i &= \left(\sum_{i=1}^k\,i\right)+(k+1) &\\
                       &= \frac{k(k+1)}{2}+(k+1) &\text{(inductive hypothesis)}\\
                       &= \frac{k(k+1)}{2}+\frac{2(k+1)}{2}\\
                       &= \frac{k(k+1)+2(k+1)}{2}\\
                       &= \frac{(k+2)(k+1)}{2}\\
                       &= \frac{(k+1)(k+2)}{2}
\end{array}
$$
>
which is what we wanted to show. This computation completes the induction.

> **Theorem:**
$\displaystyle \sum_{i=1}^n\,i2^{i-1}=(n-1)\cdot2^n+1$ for any natural number $n>0$.

> **Proof:**
Let $P(n)$ be the statement $\displaystyle \sum_{i=1}^n\,i2^{i-1}=(n-1)\cdot2^n+1$.
We use induction to show that $P(n)$ is true for all $n>0$
>
**Base case:** Consider the case $n=1$. $P(1)$ is the statement
that $\displaystyle \sum_{i=1}^1\,i2^{i-1}=(1-1)\cdot2^1+1$.
Since each side of this equation is equal to one, this is true.
>
**Inductive case:** Let $k>1$ be arbitrary, and assume that $P(k)$ is
true. We want to show that $P(k+1)$ is true. $P(k+1)$ is the
statement $\displaystyle \sum_{i=1}^{k+1}\,i2^{i-1}=((k+1)-1)\cdot2^{k+1}+1$.
But, we can compute that
>
$$
\begin{array}{rll}
   \sum_{i=1}^{k+1}\,i2^{i-1} &= \left(\sum_{i=1}^k\,i2^{i-1}\right)+(k+1)2^{(k+1)-1}\\
                              &= \left((k-1)\cdot2^k+1\right)+(k+1)2^k &\text{(inductive hypothesis)}\\
                              &= \big((k-1)+(k+1)\big)2^k+1\\
                              &= (k\cdot2)\cdot2^k+1\\
                              &= k2^{k+1}+1
\end{array}
$$
>
which is what we wanted to show. This completes the induction.

For example, these theorems show that $\displaystyle\sum_{i=1}^{100}i=1+2+3+4+\cdots+100=\frac{100(100+1)}{2}= 5050$
and that $1\cdot2^0+2\cdot2^1+3\cdot2^2+4\cdot2^3+5\cdot2^4=(5-1)2^5+1=129$,
as well as infinitely many other such sums.

## Strong Mathematical Induction

There is a second form of the principle of mathematical induction
which is useful in some cases. To apply the first form of induction,
we assume $P(k)$ for an arbitrary natural number $k$ and show
that $P(k+1)$ follows from that assumption. In the second form of
induction, the assumption is that $P(x)$ holds for all $x$ between 0 and
$k$ inclusive, and we show that $P(k+1)$ follows from this. This gives
us a lot more to work with when deducing $P(k+1)$. We will need this 
second form of induction in the next two sections.

> **Theorem: Strong Mathematical Induction**  
Let $P$ be a one-place predicate whose domain of discourse includes
the natural numbers. Suppose that $P(0)$ is true and that
>
$$
(P(0)\land P(1)\land\cdots\land P(k))\rightarrow P(k+1)
$$
>
is true for each natural number $k\geq 0$. 
Then $P(n)$ is true for every natural number $n$.

For example, we can use this theorem to prove that every integer greater
than one can be written as a product of prime numbers (where a
number that is itself prime is considered to be a product of
one prime number). The proof illustrates an important point about
applications of this theorem: When proving $P(k+1)$, you don't necessarily
have to _use_ the assumptions that $P(0)$, $P(1)$, &hellip;, and $P(k)$
are true. If $P(k+1)$ is proved by _any_ means&mdash;possibly including the
assumptions&mdash;then the statement $(P(0)\land P(1)\land\cdots\land P(k))\rightarrow P(k+1)$
has been shown to be true. It follows from this observation that
several numbers, not just zero, can be "base cases" in
the sense that $P(x+1)$ can be proved independently of $P(0)$ through 
$P(x)$. In this sense, 0, 1, and every prime number are base cases
in the following theorem.

> **Theorem:**
Every natural number greater than one can be written as a product of
prime numbers.

> **Proof:**
Let $P(n)$ be the statement "if $n>1$, then $n$ can be written as a 
product of prime numbers." We will prove that $P(n)$ is true for all
$n$ by applying the strong principle of induction.
>
Note that $P(0)$ and $P(1)$ are both automatically true, since $n=0$ and $n=1$
do not satisfy the condition that $n>1$, and $P(2)$ is true
since 2 is the product of the single prime number 2. Suppose that $k$ is an arbitrary
natural number with $k>1$, and suppose that $P(0)$, $P(1)$, &hellip;, $P(k)$
are already known to be true; we want to show that $P(k+1)$ is true. 
In the case where $k+1$ is a prime number,
then $k+1$ is a product of one prime number, so $P(k+1)$ is true.
>
Consider the case where $k+1$ is not prime. Then, according to the
definition of prime number, it is possible to write $k+1=ab$ where
$a$ and $b$ are numbers in the range from 2 to $k$ inclusive. Since
$P(0)$ through $P(k)$ are known to be true, $a$ and $b$ can
each be written as a product of prime numbers. Since $k+1=ab$,
$k+1$ can also be written as a product of prime numbers. We have
shown that $P(k+1)$ follows from $P(0)\land P(1)\land\cdots\land P(k)$,
and this completes the induction.

## Exercises

1. Use induction to prove that $n^3 + 3n^2 + 2n$ is divisible by 3
for all natural numbers $n$.
<details>
  <summary>Answer</summary>

  The base case, when $n=0$, is the claim that $0^3 + 3\cdot0^2 + 2\cdot0$ is divisible by 3.
  Evaluating the expression gives 0, which is $3\cdot0$, so the claim is true.

  For the inductive case, suppose that $n^3 + 3n^2 + 2n$ is divisible by 3
  for some $n\ge 0$; that is, there is some $k$ such that $n^3 + 3n^2 + 2n = 3k$.
  Using that induction hypothesis, we need to show that
  $(n+1)^3 + 3(n+1)^2 + 2(n+1)$ is also divisible by 3. Expanding this
  expression gives $n^3 + 3n^2 + 3n + 1 + 3n^2 + 6n + 3 + 2n + 2$.
  With the induction hypothesis, this can be rewritten as
  $3k + 3n^2 + 3n + 1 + 6n + 3 + 2$, or $3k + 3n^2 + 9n + 6$. This may be factored as
  $3(k + n^2 + 3n +2)$, showing that it too is divisible by 3.

  Thus we have shown that it is true for $n=0$, and if it holds for any $n$ then it also
  holds for $n+1$; by mathematical induction, therefore, it holds for all natural numbers.
</details>

2. Use induction to prove that
$$
  \sum_{i=0}^{n}r^i=(1-r^{n+1})/(1-r)
$$
for any natural number $n$ and for any real number $r$ such that $r\not=1$.

1. Use induction to prove that for any natural number $n$,
$$
  \sum_{i=0}^{n}\frac{1}{2^i}=2-\frac{1}{2^{n}}
$$
In addition to proving this by induction, show that it follows
as a corollary of Exercise 2.

4. Use induction to prove that for any natural number $n$,
$$
  \sum_{i=0}^{n}2^i=2^{n+1}-1
$$
In addition to proving this by induction, show that it follows
as a corollary of Exercise 2.
<details>
  <summary>Answer</summary>

  Base case ($n=0$): $\sum_{i=0}^0 2^i=2^0=1=2^{0+1}-1$.

  Inductive case: suppose true for some $n\ge 0$. Then
  $\sum_{i=0}^{n+1}2^i=2^{n+1}+\sum_{i=0}^n 2^i=2^{n+1}+2^{n+1}-1$, by the
  induction hypothesis. Now, $2^{n+1}+2^{n+1}=2\cdot 2^{n+1}=2^{n+2}$, so
  our summation equals $2^{(n+1)+1}-1$, showing that the formula also holds for $n+1$.
  Therefore it holds for all natural numbers $n$.

  We may also use Exercise 2, taking $r=2$. The formula for the sum is then
  $$
    \sum_{i=0}^n 2^i=\frac{1-2^{n+1}}{1-2}=\frac{1-2^{n+1}}{-1}=2^{n+1}-1
  $$
</details>

5. Use induction to prove that for any positive integer $n$,
$$
  \sum_{i=1}^ni^2=\frac{n(n+1)(2n+1)}{6}
$$

6. Use induction to prove that for any positive integer $n$,
$$
  \sum_{i=1}^n(2i-1)=n^2
$$

7. Evaluate the following sums, using results proved in this
section and in the previous exercises:
   * $1+3+5+7+9+11+13+15+17+19$
   * $\displaystyle 1+\frac{1}{3}+\frac{1}{3^2}+\frac{1}{3^3}+\frac{1}{3^4}+\frac{1}{3^5}+\frac{1}{3^6}$
   * $50+51+52+53+\cdots+99+100$
   * $1+4+9+16+25+36+49+81+100$
   * $\displaystyle \frac{1}{2^2}+\frac{1}{2^3}+\cdots+\frac{1}{2^{99}}$

8. Write each of the sums in the preceding problem using
summation notation.

9. Use induction to prove the following generalized distributive
laws for propositional logic: For any natural number $n>1$ and any
propositions $q$, $p_1$, $p_2$, &hellip;, $p_n$,
   * $q\land(p_1\lor p_2\lor\cdots\lor p_n)=(q\land p_1)\lor(q\land p_2)\lor\cdots\lor(q\land p_n)$
   * $q\lor(p_1\land p_2\land\cdots\land p_n)=(q\lor p_1)\land(q\lor p_2)\land\cdots\land(q\lor p_n)$

