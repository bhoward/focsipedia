---
id: components
title: Common Circuit Components
---

Just as a complicated piece of software is never written from scratch entirely
from the most basic program statements, a complicated hardware design is not
approached purely at the gate level. Where a programmer will break the task into
a hierarchy of objects and functions, relying on familiar idioms and existing
code from program libraries to avoid reinventing the wheel, a hardware designer
will use a hierarchy of functional blocks, relying on familiar patterns and
existing libraries of subcircuits.

## Adders

We have already seen one of these common
components&mdash;[one of the sample circuits seen earlier](circuits.md#circuits-as-expression-trees)
is known as the **half adder**. Here it is again:

![Circuit diagram for s=(a OR b) AND NOT (a AND b) and c=a AND b](/img/HalfAdder.png)

If $a$ and $b$ represent one-bit binary numbers, then $s$ is their one-bit sum
and $c$ is the carry into the next bit. For example, when $a$ and $b$ are both
1, $s$ is 0 and $c$ is 1; in binary, this says $1+1=10$. We may represent this
block in a circuit diagram with an appropriately named box:

![Symbol for a half adder](/img/HalfAdderSymbol.png)

It is called a half adder because, when you are adding multiple columns of bits, it only does half the work: it adds the two bits for a column, but it doesn't add in the carry from the next smaller column. A **full adder** takes three inputs: $a$ and $b$, plus the incoming carry, $c_\textit{\scriptsize in}$. The outputs are $s$, the sum that stays in the column, plus the outgoing carry to the next column, $c_\textit{\scriptsize out}$. We may build a full adder out of two half adders by first adding $a$ to $b$, then adding $c_\textit{\scriptsize in}$; since the highest total in a full adder is three (11), we will never have a carry out of more than one of the half adders, so the resulting $c_\textit{\scriptsize out}$ is just the OR of the two half adder carries. Here is the circuit with its block symbol and its truth table:

![Circuit diagram for a full adder](/img/FullAdder.png)

$$
\begin{array}{ccl|rc}
a & b & c_\textit{\scriptsize in} & c_\textit{\scriptsize out} & s\\ \hline
0 & 0 & 0 & 0 & 0\\
0 & 0 & 1 & 0 & 1\\
0 & 1 & 0 & 0 & 1\\
0 & 1 & 1 & 1 & 0\\
1 & 0 & 0 & 0 & 1\\
1 & 0 & 1 & 1 & 0\\
1 & 1 & 0 & 1 & 0\\
1 & 1 & 1 & 1 & 1
\end{array}
$$

Given a full adder, we may construct multiple-bit adders by **cascading** them,
with the carry from each column feeding into the next. Here, for example, is a
four-bit adder; the inputs are $a_3a_2a_1a_0$ and $b_3b_2b_1b_0$, plus an
incoming carry $c_\textit{\scriptsize in}$ to column 0 (the one's column), and
the outputs are $s_3s_2s_1s_0$, plus a carry from column 3 (the eight's column),
$c_\textit{\scriptsize out}$:

![Circuit diagram for a four-bit adder](/img/4BitAdder.png)

One of the exercises below explores whether this is a good design.
Here is a collection of CircuitVerse circuits where you can explore these adders:
<iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/adders-bf30825c-95e5-47fe-aa6e-2f77c2cb2fd9" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>

## Enabling Input

A common pattern in logic circuits is to use the AND gate to "enable" (or
disable) some signal. For example, in the half adder, the sum output, $s$, is
true when one of the inputs is true ($a+b$), except it is disabled when there is
a carry (both are true, $a\land b$). For another example, suppose we have a
circuit which is supposed to compute one of two functions, either $f$ or $g$,
depending on a "select" input; the circuit might look like this:

![Circuit diagram selecting the output of one of two subcircuits](/img/ForG.png)

When _select_ is 0, the output is computed by $f$; when it is 1, the output is computed by $g$.

The idea of selecting from two signals may be generalized to using a $k$-bit
input to select from one of up to $2^k$ signals; the result is known as a
**multiplexer** (often abbreviated MUX). For example, with two select lines,
$s_1s_0$, you can choose one of four inputs: $a_{00}$, $a_{01}$, $a_{10}$, or
$a_{11}$. Each input is enabled by an appropriate combination of the select
lines and their complements, then all four possibilities (of which at most one
may be true) are combined with OR. Here is the circuit and its common
symbol:

![Circuit diagram and symbol for a multiplexer](/img/MUX.png)

Note the similarity of the multiplexer circuit to the layers of the
sum-of-products circuit from the [Circuit Simplification](simplify.md) section. If
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

![Circuit symbol for a demultiplexer](/img/DEMUX.png)

The implementation of this circuit is left as an exercise.

### CPU Fragment

As an application of adders, multiplexers, and demultiplexers, here is a fragment of
a simple CPU design:

<iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/cpu-fragment" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>

The four 8-bit inputs on the left represent the incoming values from four machine registers, and
the four 8-bit outputs on the right represent the new value to be stored in one of the registers (the
other three outputs show all zeros and should be ignored). The 9-bit input at the top represents a
machine instruction, which specifies two input registers (the first two pairs of bits) and an output
register (the last pair of bits), along with an operation code (a 3-bit control signal).
The operation code is used to select which operation is performed by the ALU (arithmetic and logic unit) device,
which in this implementation has seven different operations it can perform. For example, when
the opcode is 000, it computes the bitwise-AND of its inputs, while when the opcode is 010 it adds
the inputs. The ALU itself is a combination of an 8-bit adder and some other circuits performing various
logical operations, with some additional enabling circuitry to choose which subcircuit will have its
output selected to be the result of the ALU.

## Divide-and-Conquer Design

See Sections 13.5&ndash;7 of Aho & Ullman.

## Exercises

1. Compute the total gate delays for a half adder, a full adder, and a four-bit
   cascaded adder as described in this section. The total delay is the maximum
   number of gate delays between any input signal changing and all output
   signals stabilizing to reflect the changed input.
   <details>
     <summary>Answer</summary>
   
   For the half adder, it takes only one gate delay for the Carry output to
   stabilize, but three gate delays for the Sum output. Therefore, when two
   half adders are connected into a full adder, it will take six gate delays
   for the outputs to fully stabilize (although the Carry is correct after only
   five delays).
   
   In the cascaded adder, each successive unit adds two gate delays to incorporate
   the Carry coming in and stabilize on the Carry going out; an additional gate delay
   is required before the Sum is finished and stable. Therefore, the total delay
   for the four-bit adder is $5+2+2+3=12$ gate delays, with the longest path going
   from $a_0$ and $b_0$ to $s_3$.
   </details>

2. Draw the circuit diagram for an implementation of a four-line demultiplexer.
   <details>
     <summary>Answer</summary>
   
   <iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/4-demux" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
   </details>

3. A **parity bit generator** is a circuit that takes some number of lines of
   input and produces one output which is 0 if an even number of the inputs are
   1, and 1 if an odd number of the inputs are 1. If the input bits are
   transmitted along with the generated parity bit, then a recipient can check
   whether any single bit was mis-transmitted by ensuring that the total number
   of 1 bits received is even. A two-input parity bit generator is just the
   exclusive-OR circuit, whose common symbol is:

![Circuit symbol for exclusive OR](/img/XOR.png)

Give an implementation of a two-input parity bit generator using only NAND
gates, and then show how to use XOR gates to build an eight-input parity bit
generator.
<details>
  <summary>Answer</summary>

The XOR operation is computed by $p\oplus q=(\lnot p\land q)\lor(p\land\lnot q)$.
Using the NAND operator ($\uparrow$) and De Morgan's laws, this is equivalent to
$(\lnot p\uparrow q)\uparrow(p\uparrow\lnot q)$:
<iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/nand-xor" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>

If we split the inputs to a $2k$-input parity bit generator into two groups (each of
size $k$, although the following argument doesn't depend on the groups having the same
size), then the total number of 1 bits will be the sum of the 1 bits in each group.
The only way for the sum of two numbers to be odd is if one is odd and the other is
even. This means that if we can compute the parity bit for each group, then the overall
parity bit is just the XOR of those two parity bits Therefore, we may construct an
eight-input parity bit generator by cascading XOR gates as follows:
<iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/8-parity" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
</details>

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
<details>
  <summary>Answer</summary>

| $a_3$ | $a_2$ | $a_1$ | $a_0$ | $e_1e_0$ | $g$ |
| :-: | :-: | :-: | :-: | :-: | :-: |
| 0 | 0 | 0 | 0 | 00 | 0 |
| 0 | 0 | 0 | 1 | 00 | 1 |
| 0 | 0 | 1 | 0 | 01 | 1 |
| 0 | 0 | 1 | 1 | 01 | 1 |
| 0 | 1 | 0 | 0 | 10 | 1 |
| 0 | 1 | 0 | 1 | 10 | 1 |
| 0 | 1 | 1 | 0 | 10 | 1 |
| 0 | 1 | 1 | 1 | 10 | 1 |
| 1 | 0 | 0 | 0 | 11 | 1 |
| 1 | 0 | 0 | 1 | 11 | 1 |
| 1 | 0 | 1 | 0 | 11 | 1 |
| 1 | 0 | 1 | 1 | 11 | 1 |
| 1 | 1 | 0 | 0 | 11 | 1 |
| 1 | 1 | 0 | 1 | 11 | 1 |
| 1 | 1 | 1 | 0 | 11 | 1 |
| 1 | 1 | 1 | 1 | 11 | 1 |

Here is a circuit (drawn with the CircuitVerse combinational analysis tool):
<iframe width="600px" height="400px" src="https://circuitverse.org/simulator/embed/4-priority" id="projectPreview" scrolling="no" webkitAllowFullScreen mozAllowFullScreen allowFullScreen></iframe>
</details>

5. Show how to construct a $2k$-input parity bit generator given a block that
   implements a $k$-input parity bit generator.
   <details>
     <summary>Answer</summary>
   
   See the answer to question 3 above.
   </details>

6. Show how to construct a $2k$-input priority encoder given a block that
   implements a $k$-input priority encoder.
   <details>
     <summary>Answer</summary>
   
   If we apply a $k$-input priority encoder to the first $k$ inputs to get a
   group signal $g^0$ and an encoded output $e^0_{k-1}\ldots e^0_1e^0_0$, and
   another to the remaining $k$ inputs to get a group signal $g^1$ and encoded
   output $e^1_{k-1}\ldots e^1_1e^1_0$, then the combined group signal is just
   $g=g^1\lor g^0$. If $g^1$ is true, then there must be a 1 in the second half
   of the inputs, and the binary number for the highest 1 line will be
   $1e^1_{k-1}\ldots e^1_1e^1_0$. However, if $g^1$ is false, then if there is a
   1 it must be in the first half, and the binary number for the highest 1 line
   will be $0e^0_{k-1}\ldots e^0_1e^0_0$. Therefore the overall encoded output is
   given by $e_k=g^1$ and $e_i=(g^1\land e^1_i)\lor(\lnot g^1\land e^0_i)$, for
   $0\le i<k$.
   </details>