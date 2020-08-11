# Sequential Circuits

All of the circuits we have considered so far have been acyclic; this was an essential part of the definition of a combinational circuit.
In general, if a circuit has a cycle, its output behavior might not be well-behaved&mdash;consider the simple example of a NOT gate whose output feeds back to its input, so that if the output went high, it would be forced low after one gate delay, then back high after another delay, _etc_.[^In fact, since a physical device can only be an approximation of a pure logic gate, it is more likely that the output would hover around some intermediate level, neither high nor low.]

In this section, we will explore two ways of adding cycles to circuits in a controlled fashion.
The first, operating on the level of just a few gates, will give us circuit components with memory.
The second, using larger-scale feedback on circuits that include both combinational and memory components, will give us a means of implementing state machines and, ultimately, general-purpose processors.
On the larger scale, the circuits will be what are known as **synchronous**&mdash;that is, a clock signal is used to synchronize the times at which feedback is applied.
At the small scale, we will start with **asynchronous** circuits, where feedback may arrive as soon as the gate delays permit.
While it is possible to design large-scale asynchronous circuits, we will not be considering that here.

Circuits with cycles are known as **sequential logic** circuits, because the output depends on the particular _sequence_ of inputs the device has received in the past; unlike combinational circuits, the output is not solely determined by the current combination of input values but potentially by the entire history of inputs (in other words, it is not purely functional&mdash;its behavior depends on side-effects).
As a result, they can be considerably harder to reason about, and we will need good abstract models, such as state machines.

## Memory Devices
Although the circuit with one NOT gate feeding back on itself is unstable, a cycle of two NOT gates would be fine:

<img src={useBaseUrl('img/NotLatch.png')}
alt="Not Latch" className="centered-figure" />

Whatever the output is at $x$, the output at $y$ will be the opposite.
Each one feeds back and reinforces the other, and the circuit is stable.
Unfortunately, it is not very useful&mdash;there is no way to provide input to _change_ the value $x$.

By replacing the NOT gates with either NAND or NOR gates, we get a circuit known as a latch.
Here is the diagram for a so-called $\overline{SR}$ latch:

<img src={useBaseUrl('img/SRLatch.png')}
alt="SR Latch" className="centered-figure" />

When the inputs $\overline{S}$ (set) and $\overline{R}$ (reset) are both 1, the latch behaves just like the circuit with two NOT gates (because $1\uparrow x=\overline{x}$): whatever the output is at $Q$, the opposite value will be at $\overline{Q}$ (hence its customary label&mdash;it is the negation of $Q$).

When the $\overline{S}$ input is 0, the output $Q$ is forced to 1&mdash;the latch is **set** (the label $\overline{S}$ suggests that it is "active-low": the latch will be set when the input is _false_).
Again, because of the feedback, when $Q$ is 1, $\overline{Q}$ will be 0.
Returning $\overline{S}$ to 1 _will then leave the latch in the set state_.
This is where the sequential nature of the latch shows: its state depends on its past history (in this case, the fact that the set line was most recently active).

When the $\overline{R}$ input is 0, the output $\overline{Q}$ is forced to 1 and correspondingly $Q$ will become 0&mdash;the latch has been **reset**.
Again, returning $\overline{R}$ to 1 will leave it in the reset state, until the set line is next activated.

If both the set and reset lines are active (0), then both output lines will be forced to 1.
This presents two problems: it violates the property that $Q$ and $\overline{Q}$ are complementary, and it sets up a potential race condition if both lines are restored to 1 at the same time.
When the inputs become 1, exactly one of the outputs can be high; however, which one "wins" the race will depend on the precise timing of the transitions from 0 to 1, and potentially also on slight imperfections in the gates (if one of the NAND gates responds slightly faster than the other, for example).
So, don't do that.

The $\overline{SR}$ latch is what is known as a **transparent** latch: the output responds as soon as the input is changed.
To make sequential design easier, we frequently want memory devices that will only respond at certain times.
By adding an extra layer of gates to the input, we can make what is known as a **gated D latch**.
The inputs are $D$ (data) and $E$ (enable):

<img src={useBaseUrl('img/DELatch.png')}
alt="DE Latch" className="centered-figure" />

As long as $E$ is 0 (note that this is now an active-high device), the $\overline{S}$ and $\overline{R}$ inputs to the latch will always be 1, regardless of the $D$ input.
The gated D latch is only enabled when the $E$ input is 1.
When enabled, the latch becomes transparent: if $D$ is 1, then $\overline{S}$ will be 0, and the output $Q$ will be set to 1; if $D$ goes to 0, then $\overline{R}$ will be 0 and the latch will be reset.
There is no combination of inputs for $D$ and $E$ which can make both the set and reset lines active at the same time, so we don't have to worry about that case.

When the enable line returns to 0, the gated D latch will remain in whatever state it last entered.
Here is a truth table for the latch, together with its common symbol when used in a circuit:

| $E$ | $D$ | $Q$ | $\overline{Q}$ |
| :-: | :-: | :-: | :-: |
| 0   | X   | hold | hold |
| 1   | 0   | 0   | 1   |
| 1   | 1   | 1   | 0   |

<img src={useBaseUrl('img/DELatchSymbol.png')}
alt="DE Latch Symbol" className="centered-figure" />

When dealing with a sequential circuit, it is often helpful to look at a **timing diagram**, which shows the levels at various points of the circuit over time (increasing from left to right).
Here is a timing diagram for the gated D latch, which shows that the output is transparent to the $D$ input only when $E$ is high:

<img src={useBaseUrl('img/DELatchTiming.png')}
alt="DE Latch Timing Diagram" className="centered-figure" />

Instead of a latch, it is more common to use a device known as a **flip-flop**.
The distinction from a latch is that a flip-flop will only respond to input for a very brief time; it is what is known as a **clocked** device, since it will only change its state when a clock pulse is received (typically, just as the clock pulse is rising from 0 to 1).
In _synchronous_ logic design, the entire circuit will use a single clock signal, so that each clock pulse advances the state by one step (and the state has time to propagate through all the gate delays before the next pulse).
Here is one design for an edge-triggered D flip-flop:

<img src={useBaseUrl('img/DFlipFlop.png')}
alt="D Flip-Flop" className="centered-figure" />

Just as the gated D latch modified an $\overline{SR}$ latch by adding a layer of two NAND gates, this flip-flop modifies an $\overline{SR}$ latch by adding a layer of two input latches.
In each case, the input layer protects the output latch from entering the illegal state (when both $\overline{S}$ and $\overline{R}$ are low).

The idea is that, as long as the clock (_Clk_) is 0, the set ($\overline{S}$) and reset ($\overline{R}$) lines of the output latch will stay high (inactive).
The line marked $x$ will be whatever $D$ is, and the line marked $y$ will be the opposite, $\overline{D}$.
Although one of the input latches will be in an "illegal" state, the output latch will not be affected.

When the clock goes to 1, the input latches will resolve to consistent states: $\overline{S}$ will be $\overline{x}=\overline{D}$, and $\overline{R}$ will be $\overline{y}=D$.
That is, if $D$ was 0, then the output latch will be reset, while if $D$ was 1 it will be set.
However, once the clock reaches 1, further changes to $D$ will be ignored: if the lower input latch is reset ($\overline{R}$ is 0, meaning $D$ was 0 at the rising edge), then changing $D$ will leave it in the reset state; if instead the lower input latch is set ($\overline{R}$ is 1, meaning $D$ was 1 at the rising edge), then changing $D$ will switch it between the set and illegal states (where $\overline{R}$ is still 1), and the upper input latch will stay in the set state.

When the clock goes back to 0, the output latch will continue to hold whatever state it had (because both of its inputs will be 1 again), until the next time the clock rises.

The only danger with this design is if $D$ is changed at exactly the same time as the rising of the clock signal, because then if one of the input latches was in an illegal state it is possible to have a race condition.
Designers avoid this by arranging for the $D$ input to be stable for at least a brief "setup and hold" time around clock pulses.

Here is a timing diagram for the D flip-flop, and its common circuit signal (the input marked with a triangle indicates that it is a rising-edge-triggered clock):

<img src={useBaseUrl('img/DFlipFlopTiming.png')}
alt="D Flip-Flop Timing Diagram" className="centered-figure" />

<img src={useBaseUrl('img/DFlipFlopSymbol.png')}
alt="D Flip-Flop Symbol" className="centered-figure" />

Rather than a truth table, it is useful to give what are known as a **characteristic table** or an **excitation table** for a flip-flop.
The characteristic table shows how the input ($D$) and current state ($Q$) lead to the next state ($Q'$) after the clock pulse:

| $D$ | $Q$ | $Q'$ |
| :-: | :-: | :-:  |
| 0   | 0   | 0    |
| 0   | 1   | 0    |
| 1   | 0   | 1    |
| 1   | 1   | 1    |

The excitation table presents the same information, but from the viewpoint of "given a current state $Q$ and desired next state $Q'$, what does the input need to be?"

| $Q$ | $Q'$ | $D$ |
| :-: | :-:  | :-: |
| 0   | 0    | 0   |
| 0   | 1    | 1   |
| 1   | 0    | 0   |
| 1   | 1    | 1   |

Here is another implementation of the D flip-flop with a somewhat easier-to-understand circuit (although it uses more gates):

<img src={useBaseUrl('img/D-MS.png')}
alt="D Master-Slave Flip-Flop" className="centered-figure" />

This is known as a **master-slave** design, because it consists of two latches (in this case, they are $SR$ latches, made with NOR gates, so the set/reset actions occur when their inputs are high[^A nice variation of the master-slave design uses an $\overline{SR}$ for one layer and an $SR$ latch for the other, so there is no need to invert the clock between the two halves, but the operation is a little harder to read.]), each of which is enabled for half of the clock cycle.
When the clock is high, the first ("master") latch stores the incoming data signal.
It is transparent during this time, so if the data is changing then so will its state.
When the clock goes low (so this is a **trailing-edge triggered** flip-flop), the slave latch is enabled and it copies whatever was
stored in the master latch at that instant. Although the slave is transparent during its half of the clock cycle, its input will not be changing because the master cannot change while it is disabled.
Therefore, the flip-flop only changes its state at the instant the clock goes from high to low.
There is still a race condition possible (it can be shown that there is no flip-flop design without a race condition), if the $D$ input changes just as the clock goes low.

> The first electronic latch was the Eccles-Jordan trigger circuit.
Patented in 1918, it was built out of two vacuum tubes connected in a feedback loop.
In the early 1940's, Thomas Flowers (1905&ndash;1998) used his experience with telephone switching circuits to build Colossus, one of the code-breaking machines at Bletchley Park.
The Colossus design used the Eccles-Jordan circuit as a storage register; it is considered the first programmable, electronic, digital computer, although its existence was kept secret until the 1970's.

## Exercises

1. Investigate the behavior of a latch built with NOR gates instead of the NAND gates used in the $\overline{SR}$ latch.
Use this new latch to build a gated D latch.

2. There are several other types of flip-flops besides the D.
Perhaps the most general is the JK flip-flop, which has two inputs, traditionally named $J$ and $K$, along with a clock input and the complementary $Q$ and $\overline{Q}$ outputs.
When $J$ and $K$ are both 0 and a clock pulse arrives, the state does not change.
When only $J$ is 1, the new state will be 1; when only $K$ is 1, the new state will be 0 (so $J$ _sets_ and $K$ _resets_ the flip-flop).
Finally, when both $J$ and $K$ are 1, the clock pulse will cause the state to **toggle**&mdash;that is, it will switch to the negation of its previous state.
Here is the characteristic table of the JK flip-flop, using $X$ to indicate "don't care" inputs:

| $J$ | $K$ | $Q$ | $Q'$ |
| :-: | :-: | :-: | :-:  |
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | X | 0 |
| 1 | 0 | X | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

   * Draw a timing diagram that shows the behavior of the JK flip-flop.
   * Give an excitation table for the JK flip-flop.
   * Show how to construct a JK flip-flop using a D flip-flop plus a few extra gates. _(Hint: Combine the $J$ and $K$ inputs with the current outputs $Q$ and $\overline{Q}$ to generate an appropriate $D$ input.)_

3. Random-access memory (RAM) devices can be made from a quantity of flip-flops plus a few extra components such as multiplexers and demultiplexers.
To store $2^k$ individually-addressable bits, you need one D type flip-flop per bit.
The $D$ inputs can all be connected to an incoming data line; if each flip-flop's clock signal is driven by one line of a $k$-bit demultiplexer whose input signal is the AND of the system clock signal and a "write enable" input, then the flip-flop selected by the $k$ address lines will be loaded with the desired data only if a write is enabled at the rise of the clock.
Connecting the outputs of the flip-flops to a multiplexer, whose $k$ select lines are also driven by the $k$-bit address, will cause the contents of the selected bit to be passed to the output of the MUX.
Use this description to draw a 16-bit RAM circuit, then show how to expand it to store four bits at each address.
