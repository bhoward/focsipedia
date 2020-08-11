# Logic Circuits

(Content adapted from Critchlow & Eck)

## Gates

Computers have a reputation&mdash;not always deserved&mdash;for being "logical."
But fundamentally, deep down, they are made of logic in a very real
sense. The building blocks of computers are **logic gates**,
which are electronic components that compute the values of simple
propositions such as $p\land q$ and $\lnot p$. (Each gate is in turn
built of even smaller electronic components called transistors; we will
explore this briefly below.)

A wire in a computer can be in one of two states, which we can
think of as being _on_ and _off_. These two states 
can be naturally associated with the Boolean values $\mathbb{T}$ and $\mathbb{F}$.
When a computer computes, the multitude of wires inside it are
turned on and off in patterns that are determined by certain rules.
The rules involved can be most naturally expressed in terms of logic.
A simple rule might be, "turn wire $C$ on whenever wire $A$ is on
and wire $B$ is on." This rule can be implemented in hardware as
an **AND gate**. An AND gate is an electronic 
component with two input wires and one output wire, whose job is
to turn its output on when both of its inputs are on and to turn
its output off in any other case. If we associate "on" with
$\mathbb{T}$ and "off" with $\mathbb{F}$, and if we give the names $A$ and $B$ to
the inputs of the gate, then the gate computes the value of the
logical expression $A\land B$. In effect, $A$ is a proposition
with the meaning "the first input is on," and $B$ is a proposition
with the meaning "the second input is on." The AND gate
functions to ensure that the output is described by the 
proposition $A \land B$. That is, the output is on if and only if
the first input is on and the second input is on.

An **OR gate** is an electronic component with two inputs and one output which
turns its output on if either (or both) of its inputs is on. If the inputs are
given names $A$ and $B$, then the OR gate computes the logical value of
$A\lor B$. A **NOT gate** has one input and one output, and it turns its output
off when the input is on and on when the input is off. If the input is named $A$,
then the NOT gate computes the value of $\lnot A$.

Other types of logic gates are, of course, possible. Gates could be made to
compute $A\rightarrow B$ or $A\oplus B$, for example. However, any computation
that can be performed by logic gates can be done using only AND, OR, and NOT
gates, as we will see below. (In practice, however, NAND gates and NOR gates,
which compute the values of $\lnot(A\land B)$ and $\lnot(A\lor B)$ respectively,
are often used because they are easier to build from transistors than AND and OR
gates.)

The three types of logic gates are represented by standard symbols, as shown in
{numref}`fig1-3`. Since the inputs and outputs of logic gates are just wires
carrying on/off signals, logic gates can be wired together by connecting outputs
from some gates to inputs of other gates. The result is a **logic circuit**. The
figure also shows an example circuit that computes the value of the logical
expression $(\lnot A)\land(B\lor\lnot(A\land C))$. The input wires to each logic
gate are on the left, with the output wire on the right. Note that when wires
cross each other in a diagram such as this, the wires don't actually intersect
unless there is a black circle at the point where they cross.

```{figure} ../img/fig1-3.png
:name: fig1-3

AND, OR, and NOT gates, plus an example logic circuit
```

The logic circuit in {numref}`fig1-3` has three inputs, labeled
$A$, $B$, and $C$. The circuit computes the value of the
compound proposition $(\lnot A)\land(B\lor\lnot(A\land C))$.
That is, when $A$ represents the proposition "the input wire
labeled $A$ is on," and similarly for $B$ and $C$, then
the output of the circuit is on if and only if the
value of the compound proposition $(\lnot A)\land(B\lor\lnot(A\land C))$
is true.

Here is a simulator in which you can experiment with this circuit:
<iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/demo-3ff02919-c180-490a-9845-991f64ae18e2" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>

````{admonition} Constructing Gates from Transistors

It is useful to have some idea of how digital logic gates are built out of
lower-level electronic devices such as transistors. For our purposes, a
**transistor** is a voltage-controlled switch: when the controlling voltage is high,
the switch is closed (that is, it conducts electricity); when the controlling voltage
is low, the switch is open (breaking the connection). {numref}`NMOSgates`
shows n-type metal-oxide-semiconductor (**NMOS**) implementations of
NOT, NOR, and NAND gates; we will study these
instead of the more common complementary MOS (CMOS) gates, because they are
slightly simpler---CMOS has the practical advantage of using significantly
less power, at the cost of doubling the number of transistors, but the basic
principles are very similar.

```{figure} ../img/NMOSgates.png
:name: NMOSgates

NMOS implementations of NOT, NOR, and NAND gates
```

The NOT gate consists of a single transistor in the lower half:
the **gate** on the left is connected to the input signal, $a$; the **source**
at the bottom is connected to ground (0), and the **drain** at the top is connected
to the output, $\overline{a}=\lnot a$, and a **pull-up resistor** (the jagged line) whose
other end is at the high voltage level (1). When $a=0$ and the switch is open (so the
transistor effectively has infinite resistance), the output will be pulled high
(so $\overline{a}=1$). When $a=1$ and the switch is closed, the lower resistance
through the transistor will pull the output low (so $\overline{a}=0$).

The NOR gate uses two transistors in parallel: if either $a$ or $b$ is
high, then the output ($a\downarrow b=\lnot(a\lor b)$) will be pulled low.
Conversely, the NAND gate
uses two transistors in series: both have to be closed (so $a=b=1$) for the
output ($a\uparrow b=\lnot(a\land b)$) to be pulled to 0. {numref}`NandNor` shows the conventional
circuit symbols for NAND and NOR gates (note that the circle
on the output indicates negation, just like on the NOT gate; the
unnegated version of NOT, drawn as a simple triangle, is known as a
**buffer**, because it copies its input to its output unchanged, after a short delay).

```{figure} ../img/NandNor.png
:name: NandNor

The standard symbols for the NAND and NOR gates
```

Those three gates are the simplest to implement with transistors. As we saw in the
Propositional Logic {ref}`props-exercises`, all other Boolean operators can be constructed from NAND alone, or NOR alone. For example, an AND gate is
a NAND followed by a NOT, so it can be built out of three transistors;[^fn1]
an OR gate also takes three, using a NOR and a NOT. In [Circuit Simplification](simplify)
we will see another way to construct circuits using only NAND gates.
````

[^fn1]: A NOT gate may be thought of as
a degenerate, single-input version of either NAND or NOR, which requires only a single transistor in NMOS.


## Building a Circuit from a Proposition

Given any compound proposition made from the operators
$\land$, $\lor$, and $\lnot$, it is possible to build a logic
circuit that computes the value of that proposition. The
proposition itself is a blueprint for the circuit. As noted
in {ref}`functional-completeness-of-and-or-not`, every logical operator that we have 
encountered can be expressed in terms of $\land$, $\lor$, and $\lnot$,
so in fact every compound proposition that we know how to write
can be computed by a logic circuit. 

Given a proposition constructed
from $\land$, $\lor$, and $\lnot$ operators, it is
easy to build a circuit to compute it. First, identify the main
operator in the proposition&mdash;the one whose value will be
computed _last_. Consider $(A\lor B)\land\lnot(A\land B)$.
This circuit has two input values, $A$ and $B$, which are represented
by wires coming into the circuit. The circuit has an output wire
that represents the computed value of the proposition.
The main operator in $(A\lor B)\land\lnot(A\land B)$,
is the first $\land$, which computes the
value of the expression as a whole by combining the values
of the subexpressions $A\lor B$ and $\lnot(A\land B)$. This $\land$
operator corresponds to an AND gate in the circuit that
computes the final output of the circuit.

Once the main operator has been identified and represented as
a logic gate, you just have to build circuits to compute the
input or inputs to that operator. In {numref}`fig1-4`,
the inputs to the main AND gate come from two subcircuits.
One subcircuit computes the value of $A\lor B$ and the other
computes the value of $\lnot(A\land B)$. Building each subcircuit
is a separate problem, but smaller than the problem you started
with. Eventually, you'll come to a gate whose input comes directly
from one of the input wires&mdash;$A$ or $B$ in this case&mdash;instead of
from a subcircuit.

```{figure} ../img/fig1-4.png
:name: fig1-4

Stages in the construction of an example logic circuit
```

## Circuits as Expression Trees

A combinational circuit is one in which the output is entirely determined by the
inputs&mdash;it is a pure function, with no dependence on state or time (apart
from the initial time it takes the circuit to compute the output; we will
discuss this more in the [next section](simplify.md)). As such, its behavior is completely
determined by a truth table; as we have seen, this means that it corresponds to
a logical expression built up from the inputs and our basic operators.

When implementing a Boolean expression as a digital circuit, it is conventional
to use a two-dimensional graphical representation of the circuit. This is partly
because the circuit will eventually be laid out on a physical circuit board or
semiconductor chip, and the relative locations of the gates and their
interconnections will be important (although we will not go to this level of
detail), but also because it can be easier to examine some of the properties and
behavior of a circuit in a graphical form.

Another way to get this graphical representation is to use an **expression
tree**, which is a variation of the parse trees studied later in the course. For
example, we may picture the expression $s=(a\lor b)\land\lnot(a\land b)$ as the
following:

```{figure} ../img/exprtree.png
:name: exprtree

Expression tree for s=(a OR b) AND NOT (a AND b)
```

Of course, we are usually interested in circuits that may have multiple outputs, so we may use a forest of expression trees. The next figure shows a forest for the same expression as above, along with the additional output $c$ given by $a\land b$:

```{figure} ../img/exprforest.png
:name: exprforest

Expression forest for s=(a OR b) AND NOT (a AND b) and c=a AND b
```

Upon doing this, we might notice that the subtree for $a\land b$ is duplicated. It would be nice to share common parts of the circuit, thus giving us an expression DAG (**directed acyclic graph**) instead of a tree or forest. One way to do this is shown next:

```{figure} ../img/exprdag.png
:name: exprdag

Expression DAG for s=(a OR b) AND NOT (a AND b) and c=a AND b
```

We could also share the inputs rather than repeating them, as shown next; this is still a DAG:

```{figure} ../img/exprdagshared.png
:name: exprdagshared

Expression DAG for s=(a OR b) AND NOT (a AND b) and c=a AND b, with shared inputs
```

Finally, instead of using the words AND, OR, and NOT, we will use the corresponding circuit symbols; we also draw the DAG "on its side," so that the flow from inputs to outputs is left-to-right. The final result is a circuit diagram such as this:

```{figure} ../img/HalfAdder.png
:name: HalfAdder

Circuit diagram for s=(a OR b) AND NOT (a AND b) and c=a AND b
```

It is important to realize, though, that this is just another presentation of the logical expressions we started with. Any set of Boolean expressions may be drawn this way, and any circuit where all of the information flows from left to right may be read as a set of expressions.

In addition to visualizing the layout of gates in a digital circuit, a circuit diagram may be used to "trace" its operation on particular inputs. For example, the diagram below shows our example circuit annotated with 0/1 logic values on each wire, to trace its behavior when both inputs $a$ and $b$ are 1. Since the logic values flow from left to right, the output of each successive gate may be determined from its inputs. By tracing each combination of inputs, we may construct a truth table corresponding to the circuit; the result is

| $a$ | $b$ | $c$ | $s$ |
| :-: | :-: | :-: | :-: |
| 0 | 0 | 0 | 0 |
| 0 | 1 | 0 | 1 |
| 1 | 0 | 0 | 1 |
| 1 | 1 | 1 | 0 |

```{figure} ../img/HalfAdder11.png
:name: HalfAdder11

Annotated diagram for s=(a OR b) AND NOT (a AND b) and c=a AND b when a=1 and b=1
```

## Extracting a Proposition from a Combinational Circuit

So, every compound proposition is computed by a logic circuit
with one output wire. Is the reverse true? That is, given
a logic circuit with one output, is there a proposition that
expresses the value of the output in terms of the values of
the inputs? Not quite. When you wire together some logic
gates to make a circuit, there is nothing to stop you from
introducing feedback loops. A feedback loop occurs when
the output from a gate is connected&mdash;possibly through one
or more intermediate gates&mdash;back to an input of the same gate.
Here is an example of a circuit with
a feedback loop:

```{figure} ../img/fig1-5.png
:name: fig1-5

Stages in the construction of an example logic circuit
```

The feedback loop includes the AND gate and the OR gate on the right. This
circuit does not compute the value of a compound proposition. This circuit does,
however, play an important role in computer memories, since it can be used to
store a logical value.

Feedback loops cannot be described by compound propositions,
basically because there is no place to start, no input to
associate with a propositional variable. But feedback
loops are really the only thing that can go wrong when trying
to describe a circuit with propositional logic. A logic circuit
that does not contain any feedback loops is called a
**combinational logic circuit**, because the output is determined
solely by the combination of values on the inputs.[^By contrast, a
circuit with a feedback loop is called a **sequential logic circuit**,
because the behavior of the circuit depends on the exact sequence of
when input signals change.] Every combinational
logic circuit with just one output computes the value of
some compound proposition. The propositional variables in
the compound proposition are just names associated with
the input wires of the circuit. (Of course, if the circuit has
more than one output, you can simply use a different proposition
for each output.)

The key to understanding why this is true
is to note that each wire in the circuit&mdash;not just the final
output wire&mdash;represents the value of some proposition. 
Furthermore, once you know which proposition is represented by
each input wire to a gate, it's obvious what proposition is
represented by the output: You just combine the input propositions
with the appropriate $\land$, $\lor$, or $\lnot$ operator, depending
on what type of gate it is. To find
the proposition associated with the final output, you just have to
start from the inputs and move through the circuit, labeling the
output wire of each gate with the proposition that it represents.
This figure illustrates the process:

```{figure} ../img/fig1-6.png
:name: fig1-6

Finding the proposition whose value is computed by a
combinational logic circuit.
```

Each wire in the circuit is labeled with the proposition that it represents. The
numbering of the labels shows one of the orders in which they can be associated
with the wires. The circuit as a whole computes the value of
$\lnot(A\land B)\land(B\lor\lnot C)$.

## Disjunctive Normal Form

So, compound propositions correspond naturally with combinational
logic circuits. But we have still not quite settled the question
of just how powerful these circuits and propositions are.
We've looked at a number of logical operators and noted that they
can all be expressed in terms of $\land$, $\lor$, and $\lnot$.
But might there be other operators that cannot be so expressed?
Equivalently, might there be other types of logic gates&mdash;possibly
with some large number of inputs&mdash;whose
computations cannot be duplicated with AND, OR, and
NOT gates? Any logical operator or logic gate computes
a value for each possible combination of logical values of its inputs.
We could always make a truth table showing the output for each 
possible combination of inputs. As it turns out, given _any_ such
truth table, it is possible to find a proposition, containing only
the $\land$, $\lor$, and $\lnot$ operators, whose value for each combination
of inputs is given precisely by that table.

To see why this is true, it is useful to introduce a particular type
of compound proposition. Define a **simple term** to be either
a propositional variable or the negation of a propositional variable.
A conjunction of simple terms would then consist of one or more
simple terms put together with $\land$ operators. (A "conjunction of
one simple term" is just a single simple term by itself. This might
not make grammatical sense, but it's the way mathematicians think.)
Some examples of conjunctions of simple terms would be
$p\land q$, $p$, $\lnot q$, and $p\land\lnot r\land \lnot w\land s\land t$.
Finally, we can take one or more such conjunctions and join them
into a "disjunction of conjunctions of simple terms." This is the
type of compound proposition we need. We can avoid some redundancy
by assuming that no propositional variable occurs more than once
in a single conjunction (since $p\land p$ can be replaced by $p$,
and if $p$ and $\lnot p$ both occur in a conjunction, then the value
of the conjuction is false, and it can be eliminated.) We can also
assume that the same conjunction does not occur twice in the
disjunction.

> A compound proposition is said to be in **disjunctive normal form**,
or DNF, if it is a disjunction of conjunctions of simple terms,
and if, furthermore, each propositional variable occurs at most once
in each conjunction and each conjunction occurs at most once in the
disjunction.

Using $p$, $q$, $r$, $s$, $A$, and $B$ as propositional variables,
here are a few examples of propositions that are in disjunctive
normal form:

$$
\begin{array}{c}
(p\land q\land r)\lor(p\land\lnot q\land r\land s)\lor(\lnot p\land\lnot q)\\
(p\land \lnot q)\\
(A\land \lnot B)\lor(\lnot A\land B)\\
p\lor(\lnot p\land q)\lor(\lnot p\land\lnot q\land r)\lor(\lnot p\land\lnot q\land\lnot r\land w)\\
\end{array}
$$

Propositions in DNF are just what we need to deal with input/output
tables of the type that we have been discussing. Any such table
can be computed by a proposition in disjunctive normal form.
It follows that it is possible to build a circuit\index{logic circuit!for an input/output table} to compute that 
table using only AND, OR, and NOT gates.

> **Theorem: DNF**
>
> Consider a table that lists a logical output value for every
combination of values of several propositional variables.
Assume that at least one of the output values is true.
Then there is a proposition containing those variables such that
the value of the proposition for each possible combination of
the values of the variables is precisely the value specified
in the table. It is possible to choose the proposition to
be in disjunctive normal form.

> **Proof:**
>
> Consider any row in the table for which the output value is $\mathbb{T}$.
Form a conjunction of simple terms as follows: For each variable, $p$,
whose value is $\mathbb{T}$ in that row, include $p$ itself in the conjunction;
for each variable, $q$, whose value is $\mathbb{F}$ in the row, include
$\lnot q$ in the conjunction. The value of this conjunction is
$\mathbb{T}$ for the combination of variable values given in that row
of the table, since each of the simple terms in the conjuction is true
for that combination of variables. Furthermore, for any _other_
possible combination of variable values, the value of the conjunction
will be $\mathbb{F}$, since at least one of the simple terms in the 
conjunction will be false.
> 
> Take the disjunction of all such conjunctions constructed in this
way, for each row in the table where the output value is true.
This disjunction has the value $\mathbb{T}$ if and only if one of
the conjunctions that make it up has the value $\mathbb{T}$&mdash;and that is
precisely when the output value specified by the table is $\mathbb{T}$.
So, this disjunction of conjunctions satisfies the requirements of
the theorem.


As an example, consider the table below.
This table specifies a desired output value for each possible
combination of values for the propositional variables $p$,
$q$, and $r$. Look at the second row of the table, where
the output value is true. According to the proof of the theorem,
this row corresponds to the conjunction $(\lnot p\land\lnot q\land r)$.
This conjunction is true when $p$ is false, $q$ is false,
and $r$ is true; in all other cases it is false, since in any other
case at least one of the terms $\lnot p$, $\lnot q$, or $r$ is
false. The other two rows where the output is true give
two more conjunctions. The three conjunctions are combined
to produce the DNF proposition $(\lnot p\land\lnot q\land r) \lor
(\lnot p\land q\land r) \lor (p\land q\land r)$. This proposition
computes all the output values specified in the table.
Using this proposition as a blueprint, we get a logic circuit
whose outputs match those given in the table.

| $p$ | $q$ | $r$ | output | conjunction |
| :-: | :-: | :-: | :----: | :---------: |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | |
| $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $(\lnot p\land\lnot q\land r)$ |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | |
| $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $(\lnot p\land q\land r)$ |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | $\mathbb{F}$ | |
| $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{T}$ | $\mathbb{F}$ | |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{F}$ | $\mathbb{F}$ | |
| $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $\mathbb{T}$ | $p\land q\land r$ |

## Equivalent Circuits

Now, given any combinational logic circuit, there are many
other circuits that have the same input/output behavior. 
When two circuits have the same input/output table,
the compound propositions associated with
the two circuits are logically equivalent. To put this another
way, propositions that are logically equivalent produce circuits
that have the same input/output behavior. As a practical matter,
we will usually prefer the circuit that is simpler. The
correspondence between circuits and propositions allows us
to apply [Boolean algebra](boolean.md)
to the simplification of circuits.

For example, consider the DNF proposition corresponding to the
table above. In $(\lnot p\land\lnot q\land r) \lor
(\lnot p\land q\land r) \lor (p\land q\land r)$, we can factor $(q\land r)$
from the last two terms, giving $(\lnot p\land\lnot q\land r) \lor
((\lnot p\lor p) \land (q\land r))$. Since $\lnot p\lor p\equiv\mathbb{T}$,
and $\mathbb{T}\land Q\equiv Q$ for any proposition $Q$,
this can be simplified to $(\lnot p\land\lnot q\land r) \lor (q\land r)$.
Again, we can apply the distributive law to this to factor
out an $r$, giving $((\lnot p\land \lnot q)\lor q)\land r)$.
This compound proposition is logically equivalent to the one we
started with, but implementing it in a circuit
requires only five logic gates, instead of the
ten required by the original proposition.[^fn2]

[^fn2]: No, I didn't
count wrong. There are eleven logical operators in the original
expression, but you can get by with ten gates in the circuit:
Use a single NOT gate to compute $\lnot p$, and connect
the output of that gate to two different AND gates.
Reusing the output of a logic gate is an obvious way to simplify
circuits that does not correspond to any operation on propositions.

If you start with a circuit instead of a proposition, it is
often possible to find the associated proposition, simplify it
using Boolean algebra, and use the simplified proposition to
build an equivalent circuit that is simpler than the original.

## Binary Arithmetic

All this explains nicely the relationship between logic
and circuits, but it doesn't explain why logic circuits
should be used in computers in the first place. Part of
the explanation is found in the fact that computers use binary
numbers. A binary number is a string of zeros and ones.
Binary numbers are easy to represent in an electronic device
like a computer: Each position in the number corresponds to
a wire. When the wire is on, it represents one; when the
wire is off, it represents zero. When we are thinking in terms
of logic, the same states of the wire represent true and false,
but either representation is just an interpretation of the
reality, which is a wire that is on or off. The question is
whether the interpretation is fruitful.

Once wires are thought of as representing zeros and ones,
we can build circuits to do computations with binary numbers.
Which computations? Any that we want! If we know
what the answer should be for each combination of inputs,
then by the DNF Theorem we can build a circuit to compute
that answer. Of course, the procedure described in that 
theorem is only practical for small circuits, but small
circuits can be used as building blocks to make all the
calculating circuits in a computer.

For example, let's look at binary addition. To add two ordinary,
decimal numbers, you line them up one on top of the other,
and add the digits in each column. In each column, there might
also be a carry from the previous column. To add up a
column, you only need to remember a small number of rules,
such as $7+6+1=14$ and $3+5+0=8$. For binary addition, it's
even easier, since the only digits are 0 and 1. There are
only eight rules:

$$ \begin{array}{cc}
0+0+0=00 & 1+0+0=01\\
0+0+1=01 & 1+0+1=10\\
0+1+0=01 & 1+1+0=10\\
0+1+1=10 & 1+1+1=11\\
\end{array} $$

Here, I've written each sum using two digits. In a multi-column
addition, one of these digits is carried over to the next column.
Here, we have a calculation that has three inputs and two outputs.
We can make an input/output table for each of the two outputs. The
table is shown below. We know that the outputs in this table
can be implemented as combinational circuits, so we know that
circuits can add binary numbers. To add multi-digit binary numbers,
we just need one copy of the basic addition circuit for each column
in the sum.

| $A$ | $B$ | $C$ | carry output | sum output |
| :-: | :-: | :-: | :----------: | :--------: |
| 0 | 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 0 | 1 |
| 0 | 1 | 0 | 0 | 1 |
| 0 | 1 | 1 | 1 | 0 |
| 1 | 0 | 0 | 0 | 1 |
| 1 | 0 | 1 | 1 | 0 |
| 1 | 1 | 0 | 1 | 0 |
| 1 | 1 | 1 | 1 | 1 |


## Exercises

1. Using only AND, OR, and NOT gates,
draw circuits that compute the value of each of the propositions
$A\rightarrow B$, $A\leftrightarrow B$, and $A\oplus B$.

1. For each of the following propositions, find a combinational
logic circuit that computes that proposition:
   * $A\land (B\lor \lnot C)$
   * $(p\land q)\land\lnot(p\land\lnot q)$
   * $(p\lor q\lor r)\land (\lnot p\lor \lnot q\lor \lnot r)$
   * $\lnot(A\land (B\lor C)) \lor (B\land \lnot A)$

1. Find the compound proposition computed by each of the
following circuits:

```{image} ../img/fig-1-label.png
:name: fig-1-label
```

4. This section describes a method for finding the compound
proposition computed by any combinational logic circuit. This method
fails if you try to apply it to a circuit that contains a feedback loop.
What goes wrong? Give an example.

1. Show that every compound proposition which is not a contradiction
is equivalent to a proposition in disjunctive normal form. (Note: We can
eliminate the restriction that the compound proposition is not a
contradiction by agreeing that "$\mathbb{F}$" counts as a proposition in
disjunctive normal form. $\mathbb{F}$ is logically equivalent to any contradiction.)

1. A proposition in **conjunctive normal form** (CNF) is a conjunction of
   disjunctions of simple terms (with the proviso, as in the definition of DNF,
   that a single item also counts as a disjunction). Show that every compound
   proposition which is not a tautology is logically equivalent to a compound
   proposition in conjunctive normal form. (Hint: What happens if you take the
   negation of a DNF proposition and apply De Morgan's Laws?)

1. Use the laws of Boolean algebra to simplify each of the
following circuits:

```{image} ../img/fig-1-simplify.png
:name: fig-1-simplify
```

8. Design circuits to implement the input/output tables
for addition, as given in [the section above](#binary-arithmetic). Try to
make your circuits as simple as possible. (The circuits that are
used in real computers for this purpose are more simplified than
the ones you will probably come up with, but the general approach
of using logic to design computer circuits is valid.)
