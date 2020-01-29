---
id: circuits
title: Logic Circuits
---
import useBaseUrl from '@docusaurus/useBaseUrl';

# Logic Circuits

(Content adapted from Critchlow & Eck)

Computers have a reputation&mdash;not always deserved&mdash;for being "logical."
But fundamentally, deep down, they are made of logic in a very real
sense.  The building blocks of computers are **logic gates**,
which are electronic components that compute the values of simple
propositions such as $p\land q$ and $\lnot p$.  (Each gate is in turn
built of even smaller electronic components called transistors,
but this needn't concern us here.)

A wire in a computer can be in one of two states, which we can
think of as being _on_ and _off_.  These two states 
can be naturally associated with the Boolean values $\T$ and $\F$.
When a computer computes, the multitude of wires inside it are
turned on and off in patterns that are determined by certain rules.
The rules involved can be most naturally expressed in terms of logic.
A simple rule might be, "turn wire $C$ on whenever wire $A$ is on
and wire $B$ is on."  This rule can be implemented in hardware as
an **AND gate**.  An AND gate is an electronic 
component with two input wires and one output wire, whose job is
to turn its output on when both of its inputs are on and to turn
its output off in any other case.  If we associate "on" with
$\T$ and "off" with $\F$, and if we give the names $A$ and $B$ to
the inputs of the gate, then the gate computes the value of the
logical expression $A\land B$.  In effect, $A$ is a proposition
with the meaning "the first input is on," and $B$ is a proposition
with the meaning "the second input is on."  The AND gate
functions to ensure that the output is described by the 
proposition $A \land B$.  That is, the output is on if and only if
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
the figure below. Since the inputs and outputs of logic gates are just wires
carrying on/off signals, logic gates can be wired together by connecting outputs
from some gates to inputs of other gates. The result is a **logic circuit**. The
figure also shows an example circuit that computes the value of the logical
expression $(\lnot A)\land(B\lor\lnot(A\land C))$. The input wires to each logic
gate are on the left, with the output wire on the right. Note that when wires
cross each other in a diagram such as this, the wires don't actually intersect
unless there is a black circle at the point where they cross.

<img src={useBaseUrl('img/fig1-3.png')}
alt="AND, OR, and NOT gates, plus an example logic circuit" style={{'max-width': '80%', height: 'auto', 'margin-left': 'auto', 'margin-right': 'auto', display: 'block'}} />


The logic circuit in the figure has three inputs, labeled
$A$, $B$, and $C$.  The circuit computes the value of the
compound proposition $(\lnot A)\land(B\lor\lnot(A\land C))$.
That is, when $A$ represents the proposition "the input wire
labeled $A$ is on," and similarly for $B$ and $C$, then
the output of the circuit is on if and only if the
value of the compound proposition $(\lnot A)\land(B\lor\lnot(A\land C))$
is true.

Given any compound proposition made from the operators
$\land$, $\lor$, and $\lnot$, it is possible to build a logic
circuit that computes the value of that proposition.  The
proposition itself is a blueprint for the circuit.  As noted
in the [Propositional Logic](props#functional-completeness-of-and-or-not)
section, every logical operator that we have 
encountered can be expressed in terms of $\land$, $\lor$, and $\lnot$,
so in fact every compound proposition that we know how to write
can be computed by a logic circuit. 

Given a proposition constructed
from $\land$, $\lor$, and $\lnot$ operators, it is
easy to build a circuit to compute it.  First, identify the main
operator in the proposition&mdash;the one whose value will be
computed _last_.  Consider $(A\lor B)\land\lnot(A\land B)$.
This circuit has two input values, $A$ and $B$, which are represented
by wires coming into the circuit.  The circuit has an output wire
that represents the computed value of the proposition.
The main operator in $(A\lor B)\land\lnot(A\land B)$,
is the first $\land$, which computes the
value of the expression as a whole by combining the values
of the subexpressions $A\lor B$ and $\lnot(A\land B)$.  This $\land$
operator corresponds to an AND gate in the circuit that
computes the final output of the circuit.

Once the main operator has been identified and represented as
a logic gate, you just have to build circuits to compute the
input or inputs to that operator.  In the  example,
the inputs to the main AND gate come from two subcircuits.
One subcircuit computes the value of $A\lor B$ and the other
computes the value of $\lnot(A\land B)$.  Building each subcircuit
is a separate problem, but smaller than the problem you started
with.  Eventually, you'll come to a gate whose input comes directly
from one of the input wires&mdash;$A$ or $B$ in this case&mdash;instead of
from a subcircuit.


\fig
   {F-buildlc}
   {Stages in the construction of a circuit that computes
    the compound proposition $(A\lor B)\land\lnot(A\land B)$.}
   {\scaledeps{4truein}{fig-1-4}}
   
\medbreak
   
So, every compound proposition is computed by a logic circuit
with one output wire.  Is the reverse true?  That is, given
a logic circuit with one output, is there a proposition that
expresses the value of the output in terms of the values of
the inputs?  Not quite.  When you wire together some logic
gates to make a circuit, there is nothing to stop you from
introducing feedback\index{feedback in circuits} loops.  A feedback loop occurs when
the output from a gate is connected&mdash;possibly through one
or more intermediate gates&mdash;back to an input of the same gate.
Figure~\ref{F-feedbacklc} shows an example of a circuit with
a feedback loop.
Feedback loops cannot be described by compound propositions,
basically because there is no place to start, no input to
associate with a propositional variable.  But feedback
loops are the only thing that can go wrong.  A logic circuit
that does not contain any feedback loops is called a
\nw{combinational logic circuit}.  Every combinational
logic circuit with just one output computes the value of
some compound proposition.  The propositional variables in
the compound proposition are just names associated with
the input wires of the circuit.  (Of course, if the circuit has
more than one output, you can simply use a different proposition
for each output.)  

\fig
   {F-feedbacklc}
   {This circuit contains a feedback loop, so it is not a
    combinational logic circuit.  The feedback loop includes
    the AND gate and the OR gate on the right.
    This circuit does not compute the value of a compound proposition.
    This circuit does, however, play an important role in computer
    memories, since it can be used to store a logical value.}
   {\scaledeps{4truein}{fig1-5}}

The key to understanding why this is true
is to note that each wire in the circuit&mdash;not just the final
output wire&mdash;represents the value of some proposition.  
Furthermore, once you know which proposition is represented by
each input wire to a gate, it's obvious what proposition is
represented by the output: You just combine the input propositions
with the appropriate $\land$, $\lor$, or $\lnot$ operator, depending
on what type of gate it is.   To find
the proposition associated with the final output, you just have to
start from the inputs and move through the circuit, labeling the
output wire of each gate with the proposition that it represents.
Figure~\ref{F-labellc} illustrates this process.

\fig
    {F-labellc}
    {Finding the proposition whose value is computed by a
     combinational logic circuit.  Each wire in the circuit is
     labeled with the proposition that it represents.  The
     numbering of the labels shows one of the orders in which they 
     can be associated with the wires.  The circuit as a whole
     computes the value of $\lnot(A\land B)\land(B\lor\lnot C)$.}
    {\scaledeps{4truein}{fig1-6}}

\medbreak
   
So, compound propositions correspond naturally with combinational
logic circuits.  But we have still not quite settled the question
of just how powerful these circuits and propositions are.
We've looked at a number of logical operators and noted that they
can all be expressed in terms of $\land$, $\lor$, and~$\lnot$.
But might there be other operators that cannot be so expressed?
Equivalently, might there be other types of logic gates&mdash;possibly
with some large number of inputs&mdash;whose
computations cannot be duplicated with AND, OR, and
NOT gates?   Any logical operator or logic gate computes
a value for each possible combination of logical values of its inputs.
We could always make a truth table showing the output for each 
possible combination of inputs.  As it turns out, given \emph{any} such
truth table,\index{truth table!and logic circuits} it is possible to find a proposition, containing only
the $\land$, $\lor$, and~$\lnot$ operators, whose value for each combination
of inputs is given precisely by that table.    

To see why this is true, it is useful to introduce a particular type
of compound proposition.  Define a \nw{simple term} to be either
a propositional variable or the negation of a propositional variable.
A conjunction of simple terms would then consist of one or more
simple terms put together with $\land$ operators.  (A "conjunction of
one simple term" is just a single simple term by itself.  This might
not make grammatical sense, but it's the way mathematicians think.)
Some examples of conjunctions of simple terms would be
$p\land q$, $p$, $\lnot q$, and $p\land\lnot r\land \lnot w\land s\land t$.
Finally, we can take one or more such conjunctions and join them
into a "disjunction of conjunctions of simple terms."  This is the
type of compound proposition we need.  We can avoid some redundancy
by assuming that no propositional variable occurs more than once
in a single conjunction (since $p\land p$ can be replaced by $p$,
and if $p$ and $\lnot p$ both occur in a conjunction, then the value
of the conjuction is false, and it can be eliminated.)  We can also
assume that the same conjunction does not occur twice in the
disjunction.
\begin{definition}\label{D-DNF}
A compound proposition is said to be in \nw{disjunctive normal form},
or DNF, if it is a disjunction of conjunctions of simple terms,
and if, furthermore, each propositional variable occurs at most once
in each conjunction and each conjunction occurs at most once in the
disjunction.
\end{definition}
Using $p$, $q$, $r$, $s$, $A$, and $B$ as propositional variables,
here are a few examples of propositions that are in disjunctive
normal form:
\[
\begin{array}{c}
(p\land q\land r)\lor(p\land\lnot q\land r\land s)\lor(\lnot p\land\lnot q)\\
(p\land \lnot q)\\
(A\land \lnot B)\lor(\lnot A\land B)\\
p\lor(\lnot p\land q)\lor(\lnot p\land\lnot q\land r)\lor(\lnot p\land\lnot q\land\lnot r\land w)\\
\end{array}
\]
Propositions in DNF are just what we need to deal with input/output
tables of the type that we have been discussing.  Any such table
can be computed by a proposition in disjunctive normal form.
It follows that it is  possible to build a circuit\index{logic circuit!for an input/output table} to compute that 
table using only AND, OR, and NOT gates.

\begin{theorem}\label{T-DNF}
Consider a table that lists a logical output value for every
combination of values of several propositional variables.
Assume that at least one of the output values is true.
Then there is a proposition containing those variables such that
the value of the proposition for each possible combination of
the values of the variables is precisely the value specified
in the table.  It is possible to choose the proposition to
be in disjunctive normal form.\index{proposition!equivalent to one in DNF}
\end{theorem}
\begin{proof}
Consider any row in the table for which the output value is $\T$.
Form a conjunction of simple terms as follows: For each variable, $p$,
whose value is $\T$ in that row, include $p$ itself in the conjunction;
for each variable, $q$, whose value is $\F$ in the row, include
$\lnot q$ in the conjunction.  The value of this conjunction is
$\T$ for the combination of variable values given in that row
of the table, since each of the terms in the conjuction is true
for that combination of variables.  Furthermore, for any \emph{other}
possible combination of variable values, the value of the conjunction
will be $\F$, since at least one of the simple terms in the 
conjunction will be false.

Take the disjunction of all such conjunctions constructed in this
way, for each row in the table where the output value is true.
This disjunction has the value $\T$ if and only if one of
the conjunctions that make it up has the value~$\T$&mdash;and that is
precisely when the output value specified by the table is~$\T$.
So, this disjunction of conjunctions satisfies the requirements of
the theorem.
\end{proof} 

As an example, consider the table in Figure~\ref{F-inputoutput1}.
This table specifies a desired output value for each possible
combination of values for the propositional variables $p$,
$q$, and $r$.  Look at the second row of the table, where
the output value is true.  According to the proof of the theorem,
this row corresponds to the conjunction $(\lnot p\land\lnot q\land r)$.
This conjunction is true when $p$ is false, $q$ is false,
and $r$ is true; in all other cases it is false, since in any other
case at least one of the terms $\lnot p$, $\lnot q$, or $r$~is
false.  The other two rows where the output is true give
two more conjunctions.  The three conjunctions are combined
to produce the  DNF proposition $(\lnot p\land\lnot q\land r) \lor
(\lnot p\land q\land r) \lor (p\land q\land r)$.  This proposition
computes all the output values specified in the table.
Using this proposition as a blueprint, we get a logic circuit
whose outputs match those given in the table.

\fig
   {F-inputoutput1}
   {An input/output table specifying a desired output for each
    combination of values of the propositional variables $p$,
    $q$, and $r$.  Each row where the output is $\T$ corresponds to
    a conjunction, shown next to that row in the table.  The
    disjunction of these conjunctions is a proposition whose
    output values are precisely those specified by the table.}
   {\begin{tabular}{|c|c|c||c|l}
       \cline{1-4}
       \strut $p$&  $q$&  $r$& output& \\
       \cline{1-4}
       \strut $\F$& $\F$& $\F$& $\F$& \\
       \cline{1-4}
       \strut $\F$& $\F$& $\T$& $\T$& $(\lnot p\land\lnot q\land r)$\\
       \cline{1-4}
       \strut $\F$& $\T$& $\F$& $\F$& \\
       \cline{1-4}
       \strut $\F$& $\T$& $\T$& $\T$& $(\lnot p\land q\land r)$\\
       \cline{1-4}
       \strut $\T$& $\F$& $\F$& $\F$& \\
       \cline{1-4}
       \strut $\T$& $\F$& $\T$& $\F$& \\
       \cline{1-4}
       \strut $\T$& $\T$& $\F$& $\F$& \\
       \cline{1-4}
       \strut $\T$& $\T$& $\T$& $\T$& $p\land q\land r$\\
       \cline{1-4}
    \end{tabular}
   }
   
\medbreak

Now, given any combinational logic circuit, there are many
other circuits that have the same input/output behavior. 
When two circuits have the same input/output table,
the compound propositions associated with
the two circuits are logically equivalent.  To put this another
way, propositions that are logically equivalent produce circuits
that have the same input/output behavior.  As a practical matter,
we will usually prefer the circuit that is simpler.  The
correspondence between circuits and propositions allows us
to apply Boolean algebra\index{Boolean algebra!and logic circuits}
to the simplification of circuits.\index{logic circuit!simplifying}

For example, consider the DNF proposition corresponding to the
table in Figure~\ref{F-inputoutput1}.  In $(\lnot p\land\lnot q\land r) \lor
(\lnot p\land q\land r) \lor (p\land q\land r)$, we can factor $(q\land r)$
from the last two terms, giving $(\lnot p\land\lnot q\land r) \lor
((\lnot p\lor p) \land (q\land r))$.  Since $\lnot p\lor p\equiv\T$,
and $\T\land Q\equiv Q$ for any proposition $Q$,
this can be simplified to $(\lnot p\land\lnot q\land r) \lor (q\land r)$.
Again, we can apply the distributive law to this to factor
out an $r$, giving $((\lnot p\land \lnot q)\lor q)\land r)$.
This compound proposition is logically equivalent to the one we
started with, but implementing it in a circuit
requires only five logic gates, instead of the
ten required by the original proposition.\footnote{No, I didn't
count wrong.  There are eleven logical operators in the original
expression, but you can get by with ten gates in the circuit:
Use a single NOT gate to compute $\lnot p$, and connect
the output of that gate to two different AND gates.
Reusing the output of a logic gate is an obvious way to simplify
circuits that does not correspond to any operation on propositions.}

If you start with a circuit instead of a proposition, it is
often possible to find the associated proposition, simplify it
using Boolean algebra, and use the simplified proposition to
build an equivalent circuit that is simpler than the original.


\medbreak

All this explains nicely the relationship between logic
and circuits, but it doesn't explain why logic circuits
should be used in computers in the first place.  Part of
the explanation is found in the fact that computers use binary
numbers.\index{binary number}  A binary number is a string of zeros and ones.
Binary numbers are easy to represent in an electronic device
like a computer:  Each position in the number corresponds to
a wire. When the wire is on, it represents one; when the
wire is off, it represents zero.  When we are thinking in terms
of logic, the same states of the wire represent true and false,
but either representation is just an interpretation of the
reality, which is a wire that is on or off.  The question is
whether the interpretation is fruitful.

Once wires are thought of as representing zeros and ones,
we can build circuits to do computations with binary numbers.
Which computations?  Any that we want!  If we know
what the answer should be for each combination of inputs,
then by Theorem~\ref{T-DNF} we can build a circuit to compute
that answer.  Of course, the procedure described in that 
theorem is only practical for small circuits, but small
circuits can be used as building blocks to make all the
calculating circuits in a computer.

\fig
   {F-inputoutput2}
   {Input/output tables for the addition of three binary 
    digits, $A$, $B$, and $C$.}
   {\mbox{
      \begin{tabular}{|c|c|c||c|}
         \hline
         \strut $A$& $B$& $C$& output\\
         \hline
         \strut 0& 0& 0& 0 \\
         0& 0& 1& 1 \\
         0& 1& 0& 1 \\
         0& 1& 1& 0 \\
         1& 0& 0& 1 \\
         1& 0& 1& 0 \\
         1& 1& 0& 0 \\
         1& 1& 1& 1 \\
         \hline
      \end{tabular}
    \qquad
      \begin{tabular}{|c|c|c||c|}
         \hline
         \strut $A$& $B$& $C$& output\\
         \hline
         \strut 0& 0& 0& 0 \\
         0& 0& 1& 0 \\
         0& 1& 0& 0 \\
         0& 1& 1& 1 \\
         1& 0& 0& 0 \\
         1& 0& 1& 1 \\
         1& 1& 0& 1 \\
         1& 1& 1& 1 \\
      \hline
      \end{tabular}
    }
   }

For example, let's look at binary addition.\index{addition, binary}  To add two ordinary,
decimal numbers, you line them up one on top of the other,
and add the digits in each column.  In each column, there might
also be a carry from the previous column.  To add up a
column, you only need to remember a small number of rules,
such as $7+6+1=14$ and $3+5+0=8$.  For binary addition, it's
even easier, since the only digits are 0 and~1.  There are
only eight rules:
\begin{align*}
0+0+0&=00 & 1+0+0&=01\\
0+0+1&=01 & 1+0+1&=10\\
0+1+0&=01 & 1+1+0&=10\\
0+1+1&=10 & 1+1+1&=11\\
\end{align*}
Here, I've written each sum using two digits.  In a multi-column
addition, one of these digits is carried over to the next column.
Here, we have a calculation that has three inputs and two outputs.
We can make an input/output table for each of the two outputs.  The
tables are shown in Figure~\ref{F-inputoutput2}.  We know that these
tables can be implemented as combinational circuits, so we know that
circuits can add binary numbers.  To add multi-digit binary numbers,
we just need one copy of the basic addition circuit for each column
in the sum.





\begin{exercises}

\problem Using only AND, OR, and NOT gates,
draw circuits that compute the value of each of the propositions
$A\rightarrow B$, $A\leftrightarrow B$, and $A\oplus B$.

\problem For each of the following propositions, find a combinational
logic circuit that computes that proposition:
\pparts{
       A\land (B\lor \lnot C)      & (p\land q)\land\lnot(p\land\lnot q) \cr
       (p\lor q\lor r)\land (\lnot p\lor \lnot q\lor \lnot r)
                                & \lnot(A\land (B\lor C)) \lor (B\land \lnot A)\cr
}

\problem Find the compound proposition computed by each of the
following circuits:
\medskip

\centerline{\qquad\scaledeps{3.6truein}{fig-1-label}}

\problem This section describes a method for finding the compound
proposition computed by any combinational logic circuit.  This method
fails if you try to apply it to a circuit that contains a feedback loop.
What goes wrong?  Give an example.

\problem Show that every compound proposition which is not a contradiction
is equivalent to a proposition in disjunctive normal form.  (Note: We can
eliminate the restriction that the compound proposition is not a
contradiction by agreeing that "$\F$" counts as a proposition in
disjunctive normal form.  $\F$~is logically equivalent to any contradiction.)

\problem A proposition in \nw{conjunctive normal form} (CNF) is
a conjunction of disjunctions of simple terms (with the proviso, as 
in the definition of DNF that a single item counts as a conjunction
or disjunction).  Show that every 
compound proposition which is not a tautology is logically equivalent
to a compound proposition in conjunctive normal form.  (Hint:
What happens if you take the negation of a DNF proposition and
apply DeMorgan's Laws?)

\problem Use the laws of Boolean algebra to simplify each of the
following circuits:
\medskip

\rightline{\scaledeps{4.2 true in}{fig-1-simplify}}


\problem Design circuits to implement the input/output tables
for addition, as given in Figure~\ref{F-inputoutput2}.  Try to
make your circuits as simple as possible.  (The circuits that are
used in real computers for this purpose are more simplified than
the ones you will probably come up with, but the general approach
of using logic to design computer circuits is valid.)

\end{exercises}
