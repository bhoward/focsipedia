---
id: computability
title: Computability
---

(Content adapted from Critchlow &amp; Eck)

At this point, it would be useful to look at increasingly complex
Turing machines, which compute increasingly complex functions and languages.
Although Turing machines are very simple devices, it turns out that
they can perform very sophisticated computations. In fact, any
computation that can be carried out by a modern digital computer&mdash;even
one with an unlimited amount of memory&mdash;can be carried out by
a Turing machine. Although it is not something that can be 
proved, it is widely believed that anything that can reasonably
be called "computation" can be done by a Turing machine. This
claim is known as the **Church-Turing Thesis**.

We do not have time to look at enough examples to convince you that
Turing machines are as powerful as computers, but the proof reduces
to the fact that computers are actually fairly simple in their basic
operation. Everything that a computer does comes down to copying
data from one place to another, making simple comparisons between
two pieces of data, and performing some basic arithmetic operations.
It's possible for Turing machines to do all these things. In fact,
it's possible to build a Turing machine to simulate the step-by-step
operation of a given computer. Doing so proves that the Turing machine
can do any computation that the computer could do, although it will,
of course, work much, much more slowly.

## Extended Turing Machines

We can, however, look briefly at some other models of computation
and see how they compare with Turing machines. For example, there
are various ways in which we might try to increase the power of
a Turing machine. For example, consider a **two-tape Turing machine**
that has two tapes, with a read/write head on each tape. In each step
of its computation, a two-tape Turing machine reads the symbols under
its read/write heads on both tapes.
Based on these symbols and on its current state, it
can write a new symbol onto each tape, independently
move the read/write head on each tape one cell to the left or
right, and change state.

It might seem that with two tapes available, two-tape Turing machines
might be able to do computations that are impossible for ordinary
one-tape machines. In fact, though, this is not the case. The reason,
again, is simulation: Given any two-tape Turing machine, it is possible
to build a one-tape Turing machine that simulates the step-by-step
computation of the two-tape machine. Let $M$ be a two-tape Turing
machine. To simulate $M$ with a one-tape machine, $K$, we must store
the contents of both of $M$'s tapes on one tape, and we must keep
track of the positions of both of $M$'s read/write heads.
Let @ and \$ be symbols that are not in the alphabet of $M$. 
The @ will be used to mark the position of a read/write head, and
the \$ will be used to delimit the parts of $K$'s tape that
represent the two tapes of $M$. For example, suppose that one
of $M$'s tapes contains the symbols "abb##cca" with the
read/write head on the first b, and that the other tape contains
"01#111#001" with the read/write head on the final 1. This
configuration would be represented on $K$'s tape as
"\$a@bb##cca\$01#111#00@1\$". To simulate one
step of $M$'s computation, $K$ must scan its entire tape, looking for
the @'s and noting the symbol to the right of each @. Based on
this information, $K$ can update its tape and its own state to
reflect $M$'s new configuration after one step of computation.
Obviously, $K$ will take more steps than $M$ and it will operate
much more slowly, but this argument makes it clear that one-tape
Turing machines can do anything that can be done by two-tape
machines.

We needn't stop there. We can imagine $n$-tape Turing machines, for
$n>2$. We might allow a Turing machine to have multiple read/write
heads that move independently on each tape. We could even allow
two or three-dimensional tapes. None of this makes any difference 
as far as computational power goes, since each type of Turing machine
can simulate any of the other types.[^1]

[^1]: We can also define 
**non-deterministic Turing machines** that can have several possible
actions at each step. Non-deterministic Turing machines cannot be
used to compute functions, since a function can have only one possible
output for any given input. However, they can be used to accept
languages. We say that a non-deterministic Turing machine accepts
a language $L$ is it is _possible_ for the machine to halt
on input $w$ if and only if $w\in L$. The class of languages 
accepted by non-deterministic Turing machines is the same as the
class of languages accepted by deterministic Turing machines.
So, non-determinism does not add any computational power.

## Recursively Enumerable Languages

We have used Turing machines to define Turing-acceptable languages
and Turing-decidable languages. The definitions seem to depend
very much on the peculiarities of Turing machines. But the same
classes of languages can be defined in other ways. For example,
we could use programs running on an idealized computer, with an
unlimited amount of memory, to accept or decide languages. Or we
could use $n$-tape Turing machines. The
resulting classes of languages would be exactly the same as the
Turing-acceptable and Turing-decidable languages.

We could look at other ways of specifying languages "computationally."
One of the most natural is to imagine a Turing machine or computer
program that runs forever and outputs an infinite list of strings
over some alphabet $\Sigma$. In the case of Turing machines, it's
convenient to think of a two-tape Turing machine that lists the strings
on its second tape. The strings in the list form a language
over $\Sigma$. A language that can be listed in this way is
said to be **recursively enumerable**. 
Note that we make no
assumption that the strings must be listed in any particular order,
and we allow the same string to appear in the output any number of
times. Clearly, a recursively enumerable language is "computable"
in some sense. Perhaps we have found a new type of computable language.
But no&mdash;it turns out that we have just found another way of
describing the Turing-acceptable languages. The following theorem
makes this fact official and adds one more way of describing
the same class of languages:

> **Theorem:** Let $\Sigma$ be an alphabet and let $L$ be a language over $\Sigma$.
Then the following are equivalent:
>   * There is a Turing machine that accepts $L$.
>   * There is a two-tape Turing machine that runs forever, making 
a list of strings on its second tape, such that a string $w$ is in 
the list if and only if $w\in L$.
>   * There is a Turing-computable function $f\colon\{a\}^*\to\Sigma^*$
such that $L$ is the range of the function $f$.

While I will not give a complete, formal proof of this theorem, it's not
too hard to see why it is true. Consider a language that satisfies the third
property. We can use the fact that $L$ is the range of a Turing-computable function, $f$,
to build a two-tape Turing machine that lists $L$. The machine will
consider each of the strings $a^n$, for $n\in \N$, in turn, and it will compute
$f(a^n)$ for each $n$. Once the value of $f(a^n)$ has been computed, it can be copied
onto the machine's second tape, and the machine can move on to do the same
with $a^{n+1}$. This machine writes all the elements of $L$ 
(the range of $f$) onto its second tape,
so $L$ satisfies the second property. Conversely, suppose that
there is a two-tape Turing machine, $M$, that lists $L$. Define a function
$g\colon\{a\}^*\to\Sigma^*$ such that for $n\in\N$, $g(a^n)$ is the $(n+1)^{th}$ item in the
list produced by $M$. Then the range of $g$ is $L$, and $g$ is Turing-computable
since it can be computed as follows: On input $a^n$, simulate the computation
of $M$ until it has produced $n+1$ strings, then halt, giving the $(n+1)^{th}$
string as output. This shows that the second property implies the third property, so these
properties are in fact equivalent.

We can also check that the second property is equivalent to the first. 
Suppose that $L$ satisfies the second property. Consider
a two-tape Turing machine, $T$, that lists the elements of $L$. We must build
a Turing machine, $M$, which accepts $L$. We do this
as follows: Given an input $w\in\Sigma^*$,
$M$ will simulate the computation of $T$. Every time the simulated $T$ produces a string
in the list, $M$ compares that string to $w$. If they are the same, $M$ halts.
If $w\in L$, eventually it will be produced by $T$, so $M$ will eventually halt.
If $w\not\in L$, then it will never turn up in the list produced by $T$, so
$M$ will never halt. Thus, $M$ accepts the language $L$. This shows that the second
property implies the first one. 

The fact that the first property implies the second is somewhat harder to see.
First, we note that it is possible for a Turing
machine to generate every possible string in $\Sigma^*$, one-by-one,
in some definite order (such
as order of increasing length, with something like alphabetical order
for strings of the same length). Now, suppose that $L$ is Turing-acceptable
and that $M$ is a Turing machine that accepts $L$. We need a two-tape
Turing machine, $T$ that makes a list of all the elements of $L$.
Unfortunately, the following idea does _not_ work: Generate each
of the elements in $\Sigma^*$ in turn, and see whether $M$ accepts it.
If so, then add it to the list on the second tape. It looks like we have a machine that
lists all the elements of $L$. The problem is that the only way for $T$ to
"see whether $M$ accepts" a string is to simulate the computation of $M$.
Unfortunately, as soon as we try this for any string $w$ that is not in $L$,
the computation never ends! $T$ will get stuck in the simulation and will
never even move on to the next string. To avoid this problem, $T$ must simulate
multiple computations of $M$ at the same time. $T$ can keep track of
these computations in different regions of its first tape (separated by \$'s).
Let the list of all strings in $\Sigma^*$ be $x_1$, $x_2$, $x_3$, &hellip;. Then $T$ should
operate as follows:

   * 1: Set up the simulation of $M$ on input $x_1$, and simulate one 
     step of the computation for $x_1$

   * 2: Set up the simulation of $M$ on input $x_2$, and simulate one 
     step of the computation for $x_1$ and one step of the computation for $x_2$.

   * 3: Set up the simulation of $M$ on input $x_3$, and simulate one 
     step of each of the computations, for $x_1$, $x_2$, and $x_3$.

   * &hellip;

   * n: Set up the simulation of $M$ on input $x_n$, and simulate one 
     step of each of the computations, for $x_1$, $x_2$, \dots, $x_n$.

and so on. Each time one of the computations halts, $T$ should
write the corresponding $x_i$ onto its second tape. Over the course of
time, $T$ simulates the computation of $M$ for each input $w\in\Sigma^*$
for an arbitrary number of steps. If $w\in L$, the simulated computation for $w$ will
eventually end and it will appear on $T$'s second tape. On the other hand,
if $w\not\in L$, then the simulated computation will never end, so $w$ will
not appear in the list. So we see that $T$ does in fact make a list of all
the elements, and only the elements of $L$. This completes an outline of
the proof of the theorem.

## General Grammars

Next, we compare Turing machines to a completely different method
of specifying languages: general grammars. Suppose $G=(V,\Sigma,P,S)$ is a general
grammar and that $L$ is the language
generated by $G$. Then there is a Turing machine, $M$, that accepts
the same language, $L$. The alphabet for $M$ will be $V\cup\Sigma\cup\{\$,\#\}$,
where \$ is a symbol that is not in $V\cup\Sigma$. (We also assume that # is not in $V\cup\Sigma$.)
Suppose that $M$ is started with input $w$, where $w\in\Sigma^*$.
We have to design $M$ so that it will halt if and only if $w\in L$.
The idea is to have $M$ find each string that can be derived
from the start symbol $S$. The strings will be written to $M$'s tape
and separated by \$'s. $M$ can begin by writing the start symbol,
$S$, on its tape, separated from $w$ by a \$. Then it repeats
the following process indefinitely: For each string on the tape
and for each production rule, $x\longrightarrow y$, of $G$, search the
string for occurrences of $x$. When one is found, add a \$ to the
end of the tape and copy the string to the end of the tape, replacing
the occurrence of $x$ by $y$. The new string represents the results
of applying the production rule $x\longrightarrow y$ to the string.
Each time $M$ produces a new string, it compares
that string to $w$. If they are equal, then $M$ halts. If $w$ is
in fact in $L$, then eventually $M$ will produce the string $w$ and
will halt. Conversely, if $w$ is not in $L$, then $M$ will go on producing
strings forever without ever finding $w$, so $M$ will never halt.
This shows that, in fact, the language $L$ is accepted by $M$.

Conversely, suppose that $L$ is a language over an alphabet $\Sigma$,
and that $L$ is Turing-acceptable. Then it is possible to find a grammar
$G$ that generates $L$. To do this, it's convenient to use the
fact that, as discussed above, there is a Turing-computable function
$f\colon \{a\}^*\to\Sigma$ such that $L$ is the range of $f$.
Let $M=(Q,\Lambda,q_0,\delta)$ be a Turing machine that computes
the function $f$. We can build a grammar, $G$, that imitates the computations
performed by $M$. The idea is that most of the production rules of $G$ will
imitate steps in the computation of $M$. Some additional rules are added
to get things started, to clean up, and to otherwise bridge the
conceptual gap between grammars and Turing machines.

The terminal symbols of $G$ will be the symbols from the alphabet, $\Sigma$. 
For the non-terminal symbols,
we use: the states of $M$, every member of $\Lambda$ that is not
in $\Sigma$, two special symbols $<$ and $>$, and two additional
symbols $S$ and $A$. (We can assume that all
these symbols are distinct.) $S$ will be the start symbol of $G$.
As for production rules, we begin with the following three rules:
$$
\begin{aligned}
  S&\longrightarrow <q_0A>\\
  A&\longrightarrow aA\\
  A&\longrightarrow\varepsilon
\end{aligned}
$$
These rules make it possible to produce any string of the form
$<q_0a^n>$. This is the only role that $S$ and $A$ play
in the grammar. Once we've gotten rid of $S$ and $A$, strings
of the remaining terminal and non-terminal symbols represent
configurations of the Turing machine $M$. The string will contain
exactly one of the states of $M$ (which is, remember, one of the
non-terminal symbols of $G$). This tells us which state $M$ is
in. The position of the state-symbol tells us where
$M$ is positioned on the tape: the state-symbol is located
in the string to the left of the symbol on which $M$ is positioned.
And the special symbols $<$ and $>$ just represent
the beginning and the end of a portion of the tape of $M$.
So, the initial string $<q_0a^n>$ represents
a configuration in which $M$ is in its start state, and
is positioned on the first $a$ in a string of $n$ $a$'s.
This is the starting configuration of $M$ when it is run
with input $a^n$.

Now, we need some production
rules that will allow the grammar to simulate the computations
performed by $M$. For each state $q_i$ and each symbol $\sigma\in\Lambda$,
we need a production rule that imitates the transition rule $\delta(q_i,\sigma)
=(\tau,d,q_j)$. If $d=R$, that is if the machine moves to the right,
then all we need is the rule
$$
\begin{aligned}
  q_i\sigma&\longrightarrow \tau q_j
\end{aligned}
$$
This represents that fact that $M$ converts the $\sigma$ to a $\tau$,
moves to the right, and changes to state $q_j$. If $d=L$, that is
if the machine moves to the left, then we will need several rules&mdash;one rule for
each $\lambda\in\Lambda$, namely
$$
\begin{aligned}
  \lambda q_i\sigma&\longrightarrow q_j\lambda\tau
\end{aligned}
$$
This rule says that $M$ changes the $\sigma$ to a $\tau$, moves left,
and changes to state $q_j$. The $\lambda$ doesn't affect the
application of the rule, but is necessary to represent the fact
that $M$ moves left.

Each application of one of these rules represents one step in
the computation of $M$. There is one remaining requirement for correctly
simulating $M$. Since $M$'s tape contains an infinite number of cells
and we are only representing a finite portion of that tape, we need a way
to add and remove #'s at the ends of the string. We can use the
following four rules to do this:
$$
\begin{aligned}
  <&\longrightarrow <\#\\
  <\#&\longrightarrow <\\
  >&\longrightarrow \#>\\
  \#>&\longrightarrow >
\end{aligned}
$$
These rules allow blank symbols to appear at the ends of the string
when they are needed to continue the computation, and to disappear
from the ends of the string whenever we like.

Now, suppose that $w$ is some element of $L$. Then $w=f(a^n)$ for some $n\in\N$.
We know that on input $a^n$, $M$ halts with output $w$. If we
translate the computation of $M$ into the corresponding sequence
of production rules in $G$,
we see that for the grammar $G$, $<q_0a^n>\Longrightarrow^*<hw>$, where $h$ is the halt state of $M$.
Since we already know that $S\Longrightarrow^*<q_0a^n>$,
for every $n\in\N$, we see that in fact $S\Longrightarrow^*<hw>$ for each $w\in L$. We almost have it! We
want to show that $S\Longrightarrow^*w$.
If we can just
get rid of the $<$, the $h$, and the $>$, we will have that
$<hw>\Longrightarrow^*w$ and we can then deduce that
$S\Longrightarrow^*w$ for each $w\in L$, as desired. We can do this by adding 
just a few more rules to $G$. We want to let the $h$ eliminate the $<$,
move through the $w$, and then eliminate the $>$ along with itself.
We need the rules
$$
\begin{aligned}
  <h&\longrightarrow h\\
  h>&\longrightarrow \varepsilon
\end{aligned}
$$
and, for each $\sigma\in\Sigma$,
$$
\begin{aligned}
  h\sigma&\longrightarrow \sigma h
\end{aligned}
$$
We have constructed $G$ so that it generates every string in $L$.
It is not difficult to see that the strings in $L$ are in fact the
only strings that are generated by $G$. That is, $L$ is precisely
$L(G)$.

We have now shown, somewhat informally, that a language
$L$ is Turing-acceptable if and only if there is a grammar $G$
that generates $L$. Even though Turing machines and grammars
are very different things, they are equivalent in terms of
their ability to describe languages. We state this as a theorem:

> **Theorem:** A language $L$ is Turing acceptable (equivalently, recursively enumerable)
if and only if there is a general grammar that generates $L$.

## Turing Decidability

In this section, we have been talking mostly about recursively enumerable
languages (also known as the Turing-acceptable languages). What
about the Turing-decidable languages? 
We already know that if a language $L$ is Turing-decidable,
then it is Turing-acceptable. The converse is not true (although
we won't be able to prove this until the next section). However, suppose
that $L$ is a language over the alphabet $\Sigma$ and that both
$L$ and its complement, $\overline{L}=\Sigma^*\smallsetminus L$, are Turing-acceptable.
Then $L$ is Turing-decidable.

For suppose that $M$ is a Turing machine that accepts the language
$L$ and that $M'$ is a Turing machine that accepts $\overline{L}$.
We must show that $L$ is Turing-decidable. That is,
we have to build a Turing machine $T$ that decides $L$. For each
$w\in\Sigma^*$, when $T$ is run with input $w$, it should halt with
output 1 if $w\in L$ and with output $0$ if $w\not\in L$. To do this,
$T$ will simulate the computation of both $M$ and $M'$ on input $w$.
(It will simulate one step in the computation of $M$, then one step
in the computation of $M'$, then one step of $M$, then one step of $M'$,
and so on.) If and when the simulated computation of $M$ halts, then
$T$ will halt with output 1; since $M$ accepts $L$, this will happen if and
only if $w\in L$. If and when the simulated computation of $M'$ halts, then
$T$ will halt with output 0; since $M$ accepts $L$, this will happen if and
only if $w\not\in L$. So, for any $w\in\Sigma^*$, $T$ halts with the
desired output. This means that $T$ does in fact decide the language $L$.

It is easy to prove the converse, and the proof is left as an exercise. So
we see that a language is Turing-decidable if and only if both it and
its complement are Turing-acceptable. Since Turing-acceptability can
be defined using other forms of computation besides Turing machines,
so can Turing-decidability. For example, a language is Turing-decidable
if and only if both it and its complement can be generated by general grammars.
We introduced the term "recursively enumerable"
as a synonym for Turing-acceptable, to get away from the association with a
particular form of computation. Similarly, we define the term "recursive"
as a synonym for Turing-decidable. That is, a language $L$
is said to be **recursive** if and only if it
is Turing-decidable. We then have the theorem:

> **Theorem:** Let $\Sigma$ be an alphabet and let $L$ be a language over $\Sigma$.
Then $L$ is recursive if and only if both $L$ and its
complement, $\Sigma^*\smallsetminus L$, are recursively enumerable.

## Exercises

1. The language $L=\{a^m\;|\; m>0\}$ is the range of the function
$f(a^n)=a^{n+1}$. Design a Turing machine that computes this function,
and find the grammar that generates the language $L$ by
imitating the computation of that machine.

2. Complete the proof of the above theorem by proving
the following: If $L$ is a recursive language over an
alphabet $\Sigma$, then both
$L$ and $\Sigma^*\smallsetminus L$ are recursively enumerable.

3. Show that a language $L$ over an alphabet $\Sigma$
is recursive if and only if there are grammars $G$
and $H$ such that the language generated by $G$ is $L$ and the
language generated by $H$ is $\Sigma^*\smallsetminus L$.

4. This section discusses recursive languages and recursively
enumerable languages. How could one define recursive subsets of
$\N$ and recursively enumerable subsets of $\N$?

5. Give an informal argument to show that a subset $X\subseteq\N$ is
recursive if and only if there is a computer program
that prints out the elements of $X$ _in increasing order_.
