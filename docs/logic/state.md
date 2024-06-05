---
id: state
title: State Machines
---

In another section[^1] we learned about Moore machines, a version of finite state automata where there is an output associated with each state.
Using flip-flops, we can build a circuit that implements a Moore machine.
Here is a block diagram for such a circuit (although the connections are shown as single wires, all but the clock may be several bits wide):

![Moore Machine](/img/MooreMachine.png)

[^1]: Not yet written&hellip;.

In addition to the feedback within each flip-flop, there is a larger-scale feedback loop of the current state back to provide input for the next step. The box labelled _Comb. Logic_ is a combinational circuit with two functions: compute an output based on the current state, and compute the next-state control signals based on the input and the current state. The box labelled _State_ is one or more flip-flops; when a clock pulse arrives, it takes the control signals from the combinational logic and advances to the next state&mdash;the **state** of the machine is simply the current states of these flip-flops.

If there are $k$ flip-flops, each of which can be 0 or 1, then the machine can be in $2^k$ different states.
Therefore, if our Moore machine needs $n$ states, we will need at least $\lceil\lg n\rceil$ flip-flops.
One step in designing the circuit for a given machine will be to assign a binary encoding to each state.
For example, if the machine has three states, $A$, $B$, and $C$, then we will need two flip-flops.
The circuit state will be the combination of the flip-flop outputs: $Q_1Q_0$.
Given this, we may arbitrarily choose the encoding $A=00$, $B=01$, and $C=10$ (and the state $11$ will go unused).

Although the diagram shows the combinational logic has both the machine input and the current state available to compute the output, the convention in a Moore machine is that only the state is used to determine the output.
There is a practical reason for this: during a clock cycle, as soon as the current state has propagated through the logic gates, we want the output to be available and stable.
The input signals may not be stable until close to the end of the cycle (just before they are needed to determine the next state), and we would prefer not to see "glitches" in the output while the input might still be changing.

Here is an example of this process.
Consider the following state machine for a mod-3 up/down counter:

![Mod-3 Counter Machine](/img/Mod3CounterMachine.png)

It has one input, which will be read once per clock pulse; call it $a$.
When $a$ is 0, each clock pulse increments the counter through the states $q_0$, $q_1$, $q_2$, and back to $q_0$.
When $a$ is 1, it decrements.
At each state, the output is the corresponding number in binary: 00, 01, and 10.

We will use two D flip-flops, and the obvious encoding of states to bit patterns (which also happens to be the mapping from state to output, so we can just use the current state, 00, 01, or 10, to drive the output directly).All that remains is to design the combinational circuit that computes the $D_1$ and $D_0$ flip-flop control signals based on the input and current state.
For this, we will first fill in a truth table with current state, input, and desired next state values, then use the excitation table for the flip-flops to decide an appropriate signal (for type-D flip-flops, this is particularly easy, since the required $D$ input is just the next state $Q'$):

| $Q_1$ | $Q_2$ | $a$ | $Q_1'$ | $Q_0'$ | $D_1$ | $D_0$ |
| :---: | :---: | :-: | :----: | :----: | :---: | :---: |
| 0     | 0     | 0   | 0      | 1      | 0     | 1     |
| 0     | 0     | 1   | 1      | 0      | 1     | 0     |
| 0     | 1     | 0   | 1      | 0      | 1     | 0     |
| 0     | 1     | 1   | 0      | 0      | 0     | 0     |
| 1     | 0     | 0   | 0      | 0      | 0     | 0     |
| 1     | 0     | 1   | 0      | 1      | 0     | 1     |

Here is the Karnaugh map for $D_1$:

![Mod-3 Counter, D1 Karnaugh Map](/img/KarnaughMod3D1.png)

And here is the map for $D_0$:

![Mod-3 Counter, D0 Karnaugh Map](/img/KarnaughMod3D0.png)

Therefore, simple DNF expressions for the control signals are $D_1=\overline{Q}_1\overline{Q}_0a+Q_0\overline{a}$ and $D_0=\overline{Q}_1\overline{Q}_0\overline{a}+Q_1a$.
The full circuit for the counter is therefore:

![Mod-3 Counter Circuit](/img/Mod3Counter.png)

> With combinational circuits to perform arithmetic and logic operations on data, plus registers to store intermediate results and keep track of program steps, a sequential circuit allows us to model an entire central processing unit.
By connecting the inputs and outputs to external storage and I/O devices, the CPU forms the core of a general-purpose computer; details are left to the reader.

## Exercises

1. Design a BCD accumulator whose input is a three-bit two's complement number representing the value to be added to the total. That is, the state will be a decimal digit 0&ndash;9, represented in binary (0000 through 1001). The output should be the signal lines to drive a seven-segment display (see Exercise 4 of the [Circuit Simplification](simplify.md#exercises) section). If the input is 000, then the state will be unchanged. If the input is +1 (001) through +3 (011), then that number will be added on each clock pulse. If the input is -4 (100) through -1 (111), then the total will go down by that amount on each pulse.

2. Reinterpret the block diagram for a Moore machine to produce a Mealy machine, where an output is associated with each transition.
That is, the output should be determined by the current state _and_ the input.
What might happen to the output if the input changes during a clock cycle?
Compare this behavior to a Moore machine.
