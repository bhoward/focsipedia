# Common Circuit Components

Just as a complicated piece of software is never written from scratch entirely
from the most basic program statements, a complicated hardware design is not
approached purely at the gate level. Where a programmer will break the task into
a hierarchy of objects and functions, relying on familiar idioms and existing
code from program libraries to avoid reinventing the wheel, a hardware designer
will use a hierarchy of functional blocks, relying on familiar patterns and
existing libraries of subcircuits.

## Adders

We have already seen one of these common
components&mdash;[one of the sample circuits seen earlier](circuits#circuits-as-expression-trees)
is known as the **half adder**. Here it is again:

<img src={useBaseUrl('img/HalfAdder.png')}
alt="Circuit diagram for s=(a OR b) AND NOT (a AND b) and c=a AND b" className="centered-figure" />

If $a$ and $b$ represent one-bit binary numbers, then $s$ is their one-bit sum
and $c$ is the carry into the next bit. For example, when $a$ and $b$ are both
1, $s$ is 0 and $c$ is 1; in binary, this says $1+1=10$. We may represent this
block in a circuit diagram with an appropriately named box:

<img src={useBaseUrl('img/HalfAdderSymbol.png')}
alt="Symbol for a half adder" className="centered-figure" />

It is called a half adder because, when you are adding multiple columns of bits, it only does half the work: it adds the two bits for a column, but it doesn't add in the carry from the next smaller column. A **full adder** takes three inputs: $a$ and $b$, plus the incoming carry, $c_\textit{\scriptsize in}$. The outputs are $s$, the sum that stays in the column, plus the outgoing carry to the next column, $c_\textit{\scriptsize out}$. We may build a full adder out of two half adders by first adding $a$ to $b$, then adding $c_\textit{\scriptsize in}$; since the highest total in a full adder is three (11), we will never have a carry out of more than one of the half adders, so the resulting $c_\textit{\scriptsize out}$ is just the \textsc{or} of the two half adder carries. Here is the circuit with its block symbol and its truth table:

<img src={useBaseUrl('img/FullAdder.png')}
alt="Circuit diagram for a full adder" className="centered-figure" />

$$ \begin{array}{ccl|rc}
a & b & c_\textit{\scriptsize in} & c_\textit{\scriptsize out} & s\\ \hline
0 & 0 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 1\\
0 & 1 & 0 & 0 & 1\\
0 & 1 & 1 & 1 & 0\\
1 & 0 & 0 & 0 & 1\\
1 & 0 & 1 & 1 & 0\\
1 & 1 & 0 & 1 & 0\\
1 & 1 & 1 & 1 & 1
\end{array} $$

Given a full adder, we may construct multiple-bit adders by **cascading** them,
with the carry from each column feeding into the next. Here, for example, is a
four-bit adder; the inputs are $a_3a_2a_1a_0$ and $b_3b_2b_1b_0$, plus an
incoming carry $c_\textit{\scriptsize in}$ to column 0 (the one's column), and
the outputs are $s_3s_2s_1s_0$, plus a carry from column 3 (the eight's column),
$c_\textit{\scriptsize out}$:

<img src={useBaseUrl('img/4BitAdder.png')}
alt="Circuit diagram for a four-bit adder" className="centered-figure" />

One of the exercises below explores whether this is a good design.

## Enabling Input

A common pattern in logic circuits is to use the AND gate to "enable" (or
disable) some signal. For example, in the half adder, the sum output, $s$, is
true when one of the inputs is true ($a+b$), except it is disabled when there is
a carry (both are true, $a\land b$). For another example, suppose we have a
circuit which is supposed to compute one of two functions, either $f$ or $g$,
depending on a "select" input; the circuit might look like this:

<img src={useBaseUrl('img/ForG.png')}
alt="Circuit diagram selecting the output of one of two subcircuits" className="centered-figure" />

When _select_ is 0, the output is computed by $f$; when it is 1, the output is computed by $g$.

The idea of selecting from two signals may be generalized to using a $k$-bit
input to select from one of up to $2^k$ signals; the result is known as a
**multiplexer** (often abbreviated MUX). For example, with two select lines,
$s_1s_0$, you can choose one of four inputs: $a_{00}$, $a_{01}$, $a_{10}$, or
$a_{11}$. Each input is enabled by an appropriate combination of the select
lines and their complements, then all four possibilities (of which at most one
may be true) are combined with OR. Here is the circuit and its common
symbol:

<img src={useBaseUrl('img/MUX.png')}
alt="Circuit diagram and symbol for a multiplexer" className="centered-figure" />

Note the similarity of the multiplexer circuit to the layers of the
sum-of-products circuit from the [Circuit Simplification](simplify) section. If
we view the input lines $a_{ij}$ as the enabling inputs, then a multiplexer
gives a direct way of implementing a truth table: hard-wire the input lines to 0
or 1 according to the corresponding entries in the truth table, then use the
select lines to choose the desired row to send to the output. For example, if
$a_{01}$ and $a_{10}$ are both tied to 1, while $a_{00}$ and $a_{11}$ are 0,
then the output of the multiplexer will be the exclusive-OR of $s_1$ and $s_0$.

The opposite of a multiplexer is a **demultiplexer** (DEMUX). It takes one input
signal plus $k$ select lines, and delivers the input signal to one of $2^k$
output lines. A special case is known as a **($k$-bit) decoder**: if the input
signal is fixed at 1, then the decoder will send a 1 to exactly one of its
output lines. Alternately, a demultiplexer can be viewed as a decoder with an
"enable" input, where the selected output line will be 1 only if the enabling
input signal is 1. Here is the common symbol for a four-line demultiplexer:

<img src={useBaseUrl('img/DEMUX.png')}
alt="Circuit symbol for a multiplexer" className="centered-figure" />

The implementation of this circuit is left as an exercise.

## Divide-and-Conquer Design

See Sections 13.5&ndash;7 of Aho & Ullman.

## Exercises

1. Compute the total gate delays for a half adder, a full adder, and a four-bit
   cascaded adder as described in this section. The total delay is the maximum
   number of gate delays between any input signal changing and all output
   signals stabilizing to reflect the changed input.

2. Draw the circuit diagram for an implementation of a four-line demultiplexer.

3. A **parity bit generator** is a circuit that takes some number of lines of
   input and produces one output which is 0 if an even number of the inputs are
   1, and 1 if an odd number of the inputs are 1. If the input bits are
   transmitted along with the generated parity bit, then a recipient can check
   whether any single bit was mis-transmitted by ensuring that the total number
   of 1 bits received is even. A two-input parity bit generator is just the
   exclusive-OR circuit, whose common symbol is:

<img src={useBaseUrl('img/XOR.png')}
alt="Circuit symbol for exclusive OR" className="centered-figure" />

Give an implementation of a two-input parity bit generator using only NAND
gates, and then show how to use XOR gates to build an eight-input parity bit
generator.

4. The opposite of a decoder is an **encoder**: given $2^k$ input lines, the
   output will be a $k$-bit binary number representing which input is 1. In case
   more than one input line is 1, the output will give the highest such line
   number; this is known as a "priority encoder." For example, when $k=3$, if
   lines $a_1$, $a_4$, and $a_5$ are all 1, while the rest are 0, then the
   output will be 101 (5 in binary). If no input line is 1, then the output will
   be 000. There is one additional output line, $g$ (the "group" signal) that
   will only be 1 if at least one of the inputs is 1; this allows us to tell the
   difference between no input and only line $a_0$ being 1.

Give a truth table for a four-input ($k=2$) priority encoder, then draw a
circuit diagram that implements it.

5. Show how to construct a $2k$-input parity bit generator given a block that
   implements a $k$-input parity bit generator.

6. Show how to construct a $2k$-input priority encoder given a block that
   implements a $k$-input priority encoder.
