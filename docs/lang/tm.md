---
id: tm
title: General Grammars and Turing Machines
---

(Content adapted from Critchlow &amp; Eck)

## General Grammars

At the beginning of this chapter the general idea of a grammar as a set of
rewriting or production rules was introduced. For most of the chapter, however,
we have restricted our attention to context-free grammars, in which production
rules must be of the form $A\longrightarrow x$ where $A$ is a non-terminal symbol.
In this section, we will consider general grammars, that is, grammars in which
there is no such restriction on the form of production rules. For a general
grammar, a production rule has the form $u\longrightarrow x$, where $u$ is string
that can contain both terminal and non-terminal symbols. For convenience, we
will assume that $u$ contains at least one non-terminal symbol, although
even this restriction could be lifted without changing the class of languages
that can be generated by grammars. Note that a context-free grammar is, in fact,
an example of a general grammar, since production rules in a general grammar
are allowed to be of the form $A\longrightarrow x$. They just don't have to be of
this form. I will use the unmodified term **grammar** to
refer to general grammars.[^1] The definition of grammar is identical to the
definition of context-free grammar, except for the form of the production rules:

> A **grammar** is a 4-tuple $(V,\Sigma,P,S)$,
where:
>   * $V$ is a finite set of symbols. The elements of $V$
are the non-terminal symbols of the grammar.
>   * $\Sigma$ is a finite set of symbols such that $V\cap\Sigma=\emptyset$.
The elements of $\Sigma$ are the terminal symbols of the grammar.
>   * $P$ is a set of production rules. Each rule is of the
form $u\longrightarrow x$ where $u$ and $x$ are strings in $(V\cup \Sigma)^*$
and $u$ contains at least one symbol from $V$.
>   * $S\in V$. $S$ is the start symbol of the grammar.

[^1]: There is another special type of grammar that
is intermediate between context-free grammars and general grammars. In a
so-called **context-sensitive grammar**, every production rule is of the form
$u\longrightarrow x$ where $|x|\ge|u|$. We will not cover context-sensitive grammars in
this text.

Suppose $G$ is a grammar. Just as in the context-free case,
the language generated by $G$ is denoted by $L(G)$ and is defined
as $L(G)=\{x\in\Sigma^*\;|\; S \Longrightarrow_G^* x\}$. That is, a string
$x$ is in $L(G)$ if and only if $x$ is a string of terminal symbols
and there is a derivation that produces $x$ from the start symbol,
$S$, in one or more steps.

The natural question is whether there are languages that can be generated
by general grammars but that cannot be generated by context-free languages.
A simple example of a language that is not context-free is $\{a^nb^nc^n\;|\; n\in \N\}$.
This language can be generated by a general grammar that first generates a string
of the form $XABCABC\cdots ABC$, where there are $n$ groups of $ABC$ for some $n\geq 0$.
Then we use general grammar rules that allow $A$'s, $B$'s, and $C$'s to switch places,
until the string looks like $XAA\cdots ABB\cdots BCC\cdots C$. Finally, another set of
rules essentially traverse the string from left to right, changing the non-terminals $A$,
$B$, and $C$ into the corresponding terminals $a$, $b$, and $c$.
Here is a grammar that does this:
$$
\begin{aligned}
 S&\longrightarrow SABC\\
 S&\longrightarrow X\\
 BA&\longrightarrow AB\\
 CA&\longrightarrow AC\\
 CB&\longrightarrow BC\\
 XA&\longrightarrow aX\\
 X&\longrightarrow Y\\
 YB&\longrightarrow bY\\
 Y&\longrightarrow Z\\
 ZC&\longrightarrow cZ\\
 Z&\longrightarrow \varepsilon
\end{aligned}
$$
Here, the first two rules produce one of the strings $X$, $XABC$, $XABCABC$,
$XABCABCABC$, and so on. The next three rules allow $A$'s to move to the
left and $C$'s to move to the right, producing a string of the form $XA^nB^nC^n$,
for some $n\in\N$. The rule $XA\longrightarrow aX$ allows the
$X$ to move through the $A$'s from left to right, converting $A$'s
to $a$'s as it goes. After converting the $A$'s, the $X$ can be
transformed into a $Y$. The $Y$ will then move through the $B$'s, converting
them to $b$'s. Then, the $Y$ is transformed into a $Z$, which is responsible
for converting $C$'s to $c$'s. Finally, an application of the
rule $Z\longrightarrow\varepsilon$ removes the $Z$, leaving the string $a^nb^nc^n$.

Note that if the rule $X\longrightarrow Y$ is applied before all the $A$'s have
been converted to $a$'s, then there is no way for the remaining $A$'s
to be converted to $a$'s or otherwise removed from the string. This means
that the derivation has entered a dead end, which can never produce a string
that consists of terminal symbols only. The only derivations that can produce
strings in the language generated by the grammar are derivations in which the
$X$ moves past all the $A$'s, converting them all to $a$'s. At this
point in the derivation, the string is of the form $a^nXu$ where $u$ is a string
consisting entirely of $B$'s and $C$'s. Now the
rule $X\longrightarrow Y$ can be applied, producing the string $a^nYu$. Then, if a string
of terminal symbols is ever to be produced, the $Y$ must move past all the $B$'s,
producing the string $a^nb^nYC^n$. You can see that the use of three separate
non-terminals, $X$, $Y$, and $Z$, is essential for forcing the symbols in
$a^nb^nc^n$ into the correct order.

## Turing Machines

We saw hints in the previous section that
"computation" is a more general concept than we might have thought.
General grammars, which at first encounter don't seem to have much
to do with algorithms or computing, turn out to be able to do things
that are similar to the tasks carried out by computer programs.
In this section, we will see that general grammars are precisely
equivalent to computer programs in terms of their computational
power, and that both are equivalent to a particularly simple model
of computation known as a **Turing machine**. We shall also see
that there are limits to what can be done by computing.

Historically, the theoretical study of computing began before computers
existed. One of the early models of computation was developed in the
1930s by the British mathematician, Alan Turing, who was interested in
studying the theoretical abilities and limitations of computation.
His model for computation is a very simple abstract computing machine
which has come to be known as a **Turing machine**. While Turing
machines are not applicable in the same way that regular expressions,
finite-state automata, and grammars are applicable, their use as a
fundamental model for computation means that every computer scientist
should be familiar with them, at least in a general way.

A Turing machine is really not much more complicated than a finite-state 
automaton or a pushdown automaton.[^2]
Like a FSA, a Turing machine has a finite number of 
possible states, and it changes from state to state as it computes.
However, a Turing machine also has an infinitely long **tape**
that it can use for input and output. The tape extends to infinity in
both directions. The tape is divided into **cells**, which
are in one-to-one correspondence with the
integers, $\Z$. Each cell can either be blank or it can hold a symbol from
a specified alphabet. The Turing machine can move back and forth
along this tape, reading and writing symbols and changing state.
It can read only one cell at a time, and possibly write a new
value in that cell. After doing this, it can change state and
it can move by one cell either to the left or to the right.
This is how the Turing machine computes. To use a Turing machine,
you would write some input on its tape, start the machine, and let
it compute until it halts. Whatever is written on the tape at that
time is the output of the computation.

[^2]: In fact, Turing machines can
be shown to be equivalent in their computational power
to pushdown automata with two independent stacks.

Although the tape is infinite, only a finite number
of cells can be non-blank at any given time. 
If you don't like the idea
of an infinite tape, you can think of a finite tape that can be
extended to an arbitrarily large size as the Turing machine computes:
If the Turing machine gets to either end of the tape, it will pause and
wait politely until you add a new section of tape. In other words,
it's not important that the Turing machine have an infinite amount of
memory, only that it can use as much memory as it needs for a given
computation, up to any arbitrarily large size. In this way, a Turing
machine is like a computer that can ask you to buy it a new disk drive
whenever it needs more storage space to continue a computation.[^3]

[^3]: The tape of a Turing machine can be used to store arbitrarily large amounts of
information in a straightforward way. Although we can imagine using
an arbitrary amount of memory with a computer, it's not so easy. Computers
aren't set up to keep track of unlimited amounts of data. If you think 
about how it might be done, you probably won't come with anything better
than an infinite tape. (The problem is that computers use integer-valued
addresses to keep track of data locations. If a limit is put on
the number of bits in an address, then only a fixed, finite amount
of data can be addressed. If no limit is put on the number of bits
in an address, then we are right back to the problem of storing an
arbitrarily large piece of data&mdash;just to represent an address!)

A given Turing machine has a fixed, finite set of states. One of
these states is designated as the **start
state**. This is the state in which the Turing machine begins a computation.
Another special state is the **halt
state**. The Turing machine's computation ends when it enters its
halt state. It is possible that a computation might never end because
the machine never enters the halt state. This is analogous to an 
infinite loop in a computer program.

At each step in its computation,
the Turing machine reads the contents of the tape cell where it is located.
Depending on its state and the symbol that it reads, the machine
writes a symbol (possibly the same symbol) to the cell, moves one cell
either to the left or to the right, and (possibly) changes its state.
The output symbol, direction of motion, and new state are determined
by the current state and the input symbol. Note that either the input
symbol, the output symbol, or both, can be blank. 
A Turing machine has a fixed set of **rules**
that tell it how to compute. Each rule
specifies the output symbol, direction of motion, and new state for
some combination of current state and input symbol. The machine has
a rule for every possible combination of current state and input symbol,
except that there are no rules for what happens if the current state
is the halt state. Of course, once the machine enters the halt state,
its computation is complete and the machine simply stops.

I will use the character # to represent a blank in a way
that makes it visible. I will always use $h$ to represent the halt
state. I will indicate the directions, left and right, with
$L$ and $R$, so that $\{L,R\}$ is the set of possible directions of
motion. With these conventions, we can give the formal definition of
a Turing machine as follows:

> A **Turing machine** is a 4-tuple $(Q,\Lambda,q_0,\delta)$,
where:
>   * $Q$ is a finite set of states, including the halt state, $h$.
>   * $\Lambda$ is an alphabet which includes the blank symbol, #.
>   * $q_0\in Q$ is the start state.
>   * $\delta\colon (Q\smallsetminus\{h\})\times\Lambda \to \Lambda\times 
\{L,R\}\times Q$ is the transition function. The fact that
$\delta(q,\sigma)=(\tau,d,r)$ means that when the Turing machine is
in state $q$ and reads the symbol $\sigma$, it writes the symbol
$\tau$, moves one cell in the direction $d$, and enters state $r$.

Even though this is the formal definition, it's easier to work with
a transition diagram representation of Turing machines. The transition
diagram for a Turing machine is similar to the transition diagram for
a DFA. However, there are no "accepting" states (only a halt state).
Furthermore, there must be a way to specify the output symbol and
the direction of motion for each step of the computation.
We do this by labeling arrows with notations of the
form $(\sigma,\tau,L)$ and $(\sigma,\tau,R)$, where
$\sigma$ and $\tau$ are symbols in the Turing machine's alphabet.
For example,

![Turing Machine transition](/img/turing1.png)

indicates that when the machine is in state $q_0$ and
reads an $a$, it writes a $b$, moves left, and enters state $h$.

Here, for example, is a transition diagram for a simple Turing machine
that moves to the right, changing $a$'s to $b$'s and _vice
versa_, until it finds a $c$. It leaves blanks (#'s) unchanged.
When and if the machine encounters a $c$, it moves to the left
and halts:

![Turing Machine example](/img/turing2.png)

To simplify the diagrams, I will leave out any transitions that are
not relevant to the computation that I want the machine to perform.
You can assume that the action for any omitted transition is
to write the same symbol that was read, move right, and halt.

For another example, shown below is a transition diagram for a Turing machine
that makes a copy of a string of $a$'s and $b$'s. To use this machine,
you would write a string of $a$'s and $b$'s on its tape, place
the machine on the first character of the string, and start the
machine in its start state, $q_0$. When the machine halts, there will be
two copies of the string on the tape, separated by a blank.
The machine will be positioned on the first character of the leftmost
copy of the string. Note that this machine uses $c$'s and
$d$'s in addition to $a$'s and $b$'s. While it is copying the
input string, it temporarily changes the $a$'s and $b$'s that it
has copied to $c$'s and $d$'s, respectively. In this way it can 
keep track of which characters it has already copied. After the
string has been copied, the machine changes the $c$'s and $d$'s
back to $a$'s and $b$'s before halting.

![Turing Machine example](/img/turing3.png)

In this machine, state $q_0$ checks whether the next character
is an $a$, a $b$, or a # (indicating the end of the string).
States $q_1$ and $q_2$ add an $a$ to the end of the new string,
and states $q_3$ and $q_4$ do the same thing with a $b$.
States $q_5$ and $q_6$ return the machine to the next character
in the input string. When the end of the input string is reached,
state $q_7$ will move the machine back to the start of the input
string, changing $c$'s and $d$'s back to $a$'s and $b$'s as it goes.
Finally, when the machine hits the # that precedes the input string,
it moves to the right and halts. This leave it back at the first
character of the input string. It would be a good idea to work through
the execution of this machine for a few sample input strings.
You should also check that it works even for an input string of
length zero.

---

Our primary interest in Turing machines is as language processors.
Suppose that $w$ is a string over an alphabet $\Sigma$. We will assume
that $\Sigma$ does not contain the blank symbol. We can use $w$ as
input to a Turing machine $M=(Q,\Lambda,q_0,\delta)$ provided that
$\Sigma\subseteq\Lambda$. To use $w$ as input for $M$, we will write
$w$ on $M$'s tape and assume that the remainder of the tape is blank.
We place the machine on the cell containing the first character
of the string, except that if $w=\varepsilon$ then we simply place the
machine on a completely blank tape. Then we start the machine in its 
initial state, $q_0$, and see what computation it performs.
We refer to this setup as "running $M$ with input $w$."

When $M$ is run with input $w$, it is possible that it will just keep
running forever without halting. In that case, it doesn't make
sense to ask about the output of the computation. Suppose however
that $M$ does halt on input $w$. Suppose, furthermore, that when
$M$ halts, its tape is blank except for a string $x$ of non-blank
symbols, and that the machine is located on the first character
of $x$. In this case, we will say that "$M$ halts with output $x$."
In addition, if $M$ halts with an entirely blank tape, we say that
"$M$ halts with output $\varepsilon$."
Note that when we run $M$ with input $w$, one of three things can happen:
(1) $M$ might halt with some string as output; (1) $M$ might fail to halt; 
or (3) $M$ might halt in some configuration that doesn't
count as outputting any string.

The fact that a Turing machine can produce an output value allows us
for the first time to deal with computation of _functions_.
A function $f\colon A\to B$ takes an input value in the set $A$
and produces an output value in the set $B$. If the sets are sets
of strings, we can now ask whether the values of the function can
be computed by a Turing machine. That is, is there a Turing machine $M$
such that, given any string $w$ in the domain of $f$ as input,
$M$ will compute as its output the string $f(w)$. If this is
that case, then we say that $f$ is a Turing-computable function.

> Suppose
that $\Sigma$ and $\Gamma$ are alphabets that do not contain # and that
$f$ is a function from $\Sigma^*$ to $\Gamma^*$. We say that
$f$ is **Turing-computable** if there is a Turing machine
$M=(Q,\Lambda,q_0,\delta)$ such that $\Sigma\subseteq\Lambda$ and $\Gamma\subseteq\Lambda$
and for each string $w\in\Sigma^*$, when $M$ is run with input $w$,
it halts with output $f(w)$. In this case, we say that $M$
**computes** the function $f$.

For example, let $\Sigma=\{a\}$ and define $f\colon\Sigma^*\to\Sigma^*$
by $f(a^n)=a^{2n}$, for $n\in\N$. Then $f$ is Turing-computable
since it is computed by this Turing machine:

![Turing Machine example](/img/turing4.png)

We can also use Turing machines to define "computable languages."
There are actually two different notions of Turing-computability
for languages. One is based on the idea of Turing-computability
for functions. Suppose that $\Sigma$ is an alphabet and that
$L\subseteq\Sigma^*$. The **characteristic function** of $L$
is the function $\chi_L\colon\Sigma^*\to\{0,1\}$ defined
by the fact that $\chi_L(w)=1$ if $w\in L$ and $\chi_L(w)=0$
if $w\not\in L$. Note that given the function $\chi_L$,
$L$ can be obtained as the set $L=\{w\in\Sigma^*\;|\; \chi_L(w)=1\}$.
Given a language $L$, we can ask whether the corresponding function
$\chi_L$ is Turing-computable. If so, then we can use a Turing
machine to decide whether or not a given string $w$ is in $L$.
Just run the machine with input $w$. It will halt with output $\chi_L(w)$.
(That is, it will halt and when it does so, the tape will be blank except for
a 0 or a 1, and the machine will be positioned on the 0 or 1.)
If the machine halts with output 1, then $w\in L$. If the machine halts with
output 0, then $w\not\in L$.

> Let $\Sigma$ be an alphabet that does not contain # and let $L$ be a language over $\Sigma$.
We say that $L$ is **Turing-decidable** if there is a Turing machine
$M=(Q,\Lambda,q_0,\delta)$ such that $\Sigma\subseteq\Lambda$, $\{0,1\}\subseteq\Lambda$,
and for each $w\in\Sigma^*$, when $M$ is run with input $w$, it halts
with output $\chi_L(w)$. (That is, it halts with output 0 or 1, and
the output is 0 if $w\not\in L$ and is 1 if $w\in L$.) In this case,
we say that $M$ **decides** the language $L$.

The second notion of computability for languages is based on the
interesting fact that it is possible for a Turing machine to run
forever, without ever halting.
Whenever we run a Turing machine $M$ with input $w$,
we can ask the question, will $M$ ever halt or will it run forever? If $M$
halts on input $w$, we will say that $M$ "accepts" $w$. We can then
look at all the strings over a given alphabet that are accepted by
a given Turing machine. This leads to the notion of Turing-acceptable
languages.

> Let $\Sigma$ be an alphabet that does not contain #, and let $L$ be a language over $\Sigma$.
We say that $L$ is **Turing-acceptable** if there is a Turing machine
$M=(Q,\Lambda,q_0,\delta)$ such that $\Sigma\subseteq\Lambda$, and
for each $w\in\Sigma^*$, $M$ halts on input $w$ if and only if $w\in L$.
In this case, we say that $M$ **accepts** the language $L$.

It should be clear that any Turing-decidable language is Turing-acceptable.
In fact, if $L$ is a language over an alphabet $\Sigma$,
and if $M$ is a Turing machine that
decides $L$, then it is easy to modify $M$ to produce a Turing machine
that accepts $L$. At the point where $M$ enters the halt state with
output 0, the new machine should enter a new state in which it simply
moves to the right forever, without ever halting. Given an input
$w\in\Sigma^*$, the modified machine will halt if and only if $M$
halts with output 1, that is, if and only if $w\in L$.

## Exercises

1. Let $\Sigma=\{a\}$. Draw a transition diagram for a Turing
machine that computes the function $f\colon\Sigma^*\to\Sigma^*$ where
$f(a^n)=a^{3n}$, for $n\in\N$. Draw a transition diagram for a Turing
machine that computes the function $f\colon\Sigma^*\to\Sigma^*$ where
$f(a^n)=a^{3n+1}$, for $n\in\N$.

2. Let $\Sigma=\{a,b\}$.
Draw a transition diagram for a Turing machine that
computes the function $f\colon\Sigma^*\to\Sigma^*$ where
$f(w)=w^R$.

3. Suppose that $\Sigma$, $\Gamma$, and $\Xi$ are alphabets and that
$f\colon\Sigma^*\to\Gamma^*$ and $g\colon\Gamma^*\to\Xi^*$ are 
Turing-computable functions. Show that $g\circ f$ is Turing-computable.

4. We have defined computability for functions $f\colon\Sigma^*\to\Gamma^*$,
where $\Sigma$ and $\Gamma$ are alphabets. How could Turing machines
be used to define computable functions from $\N$ to $\N\,$?
(Hint: Consider the alphabet $\Sigma=\{a\}$.)

5. Let $\Sigma$ be an alphabet and let $L$ be a language over $\Sigma$.
Show that $L$ is Turing-decidable if and only if its complement,
$\overline{L}$, is Turing-decidable.

6. Draw a transition diagram for a Turing machine which
decides the language $\{a^nb^n\;|\; n\in\N\}$. (Hint: Change the
$a$'s and $b$'s to \$'s in pairs.) Explain in general terms how to
make a Turing machine that decides the language $\{a^nb^nc^n\;|\; n\in\N\}$.

7. Draw a transition diagram for a Turing machine which
decides the language $\{a^nb^m\;|\; n>0$ and $m$ is a multiple of $n\}$.
(Hint: Erase $n$ $b$'s at a time.)

8. Based on your answer to the previous problem and the copying
machine presented in this section, describe in
general terms how you would build a Turing machine to decide the
language $\{a^p\;|\; p$ is a prime number$\}$.

9. Let $g\colon \{a\}^*\to\{0,1\}^*$ be the function such that
for each $n\in\N$, $g(a^n)$ is the representation of $n$ as a binary
number. Draw a transition diagram for a Turing machine that computes $g$.