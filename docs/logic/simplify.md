---
id: simplify
title: Circuit Simplification
---

As noted above, a physical circuit does have some dependence on time, since each device in the circuit requires a non-zero time to respond to a change in its inputs. A more precise model needs to take these delays into account---a circuit is modeled by a Boolean expression \emph{plus} a set of delay factors (other cost measures may also be important: power consumption, heat production, area occupied, \textit{etc.}, but we will focus on the delay issue here). We will make the simplifying assumption that all gates have the same delay time, so we will measure the total delay of a circuit in terms of the number of gate delays required before the output values accurately reflect a change to the input values.

Given a combinational circuit, we may compute the delay, also known as the \nw{span}, by finding the number of gates on the longest path (the \nw{critical path}) from an input to an output. For example, the circuit in Figure~\ref{F-labellc} has a span of three gate delays, with the critical path passing either through the \textsc{and}, \textsc{not}, \textsc{and} sequence along the top, or through the \textsc{not}, \textsc{or}, \textsc{and} along the bottom. Note that this is a conservative estimate of the delay required, although for certain inputs the output may become stable sooner---for example, if the $B$ input changes from 0 to 1
while $A$ is 0, then after one gate delay the output of the \textsc{or} will become 1; since the output of the upper \textsc{not} was already 1 in this case (why?), the final output will settle at 1 after only two gate delays. However, other combinations of inputs may well take the entire three gate delays to correctly determine the value of the output.

One approach to reducing the delay of a circuit is to use the disjunctive normal form, also known as the \nw{sum-of-products} (see Definition~\ref{D-DNF}). Since an expression in DNF is the \textsc{or} of a collection of terms which are the \textsc{and} of some number of simple terms, and a simple term is either an input or a negated input, the corresponding circuit can be constructed in three layers:
\begin{center}
\includegraphics[width=!,height=!,scale=0.75]{graphics/DNFlayers.png}
\end{center}

An interesting property of the sum-of-products representation falls out of the De Morgan laws. Since $(a\AND b)\OR(c\AND d)=\NOT(\NOT(a\AND b)\AND\NOT(c\AND d))=(a\uparrow b)\uparrow(c\uparrow d)$, the two layers of \textsc{and} and \textsc{or} gates may be replaced entirely with \textsc{nand} gates to get an equivalent circuit!
\begin{center}
\includegraphics[width=!,height=!,scale=0.75]{graphics/DNFlayersNand.png}
\end{center}

Unfortunately, this does not mean that any Boolean expression can be computed by a circuit with only three gate delays. One problem comes when we need \textsc{and} and \textsc{or} gates (or \textsc{nand} gates) with more than two inputs---in general, with $n$ input variables, there may be \textsc{and} gates that need $n$ inputs, and there could be on the order of $2^n$ gates in the \textsc{and} level, requiring an \textsc{or} gate with that many input lines. We will see in the next section how to build gates with a larger number of inputs out of gates with just two inputs.

Another problem with DNF comes if we use the full DNF expression extracted from a truth table.
If we use Theorem~\ref{T-DNF} to produce an expression from the truth table for the implication $p\rightarrow q$, we will get $(\NOT p\AND\NOT q)\OR(\NOT p\AND q)\OR(p\AND q)$. We may use Boolean algebra identities to find an equivalent DNF expression, $\NOT p\OR q$ (which only needs two gate delays, since the \textsc{and} layer disappears). There are general techniques for finding simpler DNF expressions such as this; we will look at a straightforward technique called a \textit{Karnaugh map}, although for computer implementation the related Quine-McCluskey algorithm is better (and for large numbers of input variables a heuristic approach is necessary).

A Karnaugh map is a way of visualizing entries in a truth table so that adjacent entries only differ on the value of one input variable. For example, the entry for $\NOT p\AND q$ will be next to the entry for $p\AND q$. If adjacent entries each contain 1, meaning that those terms would participate in the full DNF expression, then they may be replaced by a single term with just the variables that are the same: in the example, this corresponds to the simplification $(\NOT p\AND q)\OR(p\AND q)=(\NOT p\OR p)\AND q=\T\AND q=q$.

For two input variables, a Karnaugh map is a $2\times 2$ array:
\[ \begin{array}{r|cc}
& \NOT{q} & q\\ \hline
\NOT{p} & x_{00} & x_{01}\\
p & x_{10} & x_{11}
\end{array} \]
This is just a compact rearrangement of the truth table:
\[ \begin{array}{cc|c}
p & q & x\\ \hline
0 & 0 & x_{00}\\
0 & 1 & x_{01}\\
1 & 0 & x_{10}\\
1 & 1 & x_{11}
\end{array} \]
However, note that the adjacent cell condition is true: horizontally adjacent cells only differ on $q$, while vertically adjacent cells only differ on $p$.

Once we have laid out the Karnaugh map, a simplified expression may be read off by finding a way to cover all of the 1's in the map with ``implicants.'' An implicant is a rectangle whose side lengths are a power of 2; it corresponds to finding a collection of adjacent cells in the map (all of which contain 1) that all agree on some of the input literals and that collectively include all combinations (negated or not) of the other input variables. The resulting term for an implicant is just the product of the common literals among all the cells covered by the implicant.

On a $2\times 2$ map, the only implicants are individual cells ($1\times 1$), a row ($1\times 2$), a column ($2\times 1$), or the entire map ($2\times 2$). The cells correspond to terms such as $p\AND\NOT{q}$, the rows are either $\NOT{p}$ or $p$, the columns are either $\NOT{q}$ or $q$, and the entire map is $1$ (the empty product). To get the simplest expression, we want to take the fewest number of the largest possible implicants that between them cover all of the 1's in the map. Implicants may overlap, as long as all of (and only) the 1's are covered by at least one implicant.

Here is the example again. First the truth table for $p\rightarrow q$:
\[ \begin{array}{cc|c}
p & q & x\\ \hline
0 & 0 & 1\\
0 & 1 & 1\\
1 & 0 & 0\\
1 & 1 & 1
\end{array} \]
As a Karnaugh map, this is:
\[ \begin{array}{r|cc}
& \NOT{q} & q\\ \hline
\NOT{p} & 1 & 1\\
p & 0 & 1
\end{array} \]
The best way to cover this map with implicants is to take the first row and the second column. That gives the simplified terms $\NOT{p}$ and $q$, so the final simplified expression is $\NOT{p}\OR q$. Here is the map with the implicants outlined:
\[ \begin{array}{r|cc}
& \NOT{q} & q\\ \hline
\NOT{p} & \tikzmark{left1}1 & \tikzmark{left2}1\tikzmark{right1}\\
p & 0 & 1\tikzmark{right2}
\end{array}
\DrawBox[blue]{left1}{right1}
\DrawBox[red]{left2}{right2} \]

A Karnaugh map can also work with three or four input variables, producing either a $2\times 4$ or a $4\times 4$ array. The same procedure applies, with three complications:
\begin{enumerate}
\item To satisfy the adjacent cell condition, successive rows or columns must change only one variable at a time: for example, the rows might be labelled in order $\NOT{p}\AND\NOT{q}$, $\NOT{p}\AND q$, $p\AND q$, and $p\NOT{q}$;
\item Implicants may be 1, 2, or 4 rows tall by 1, 2, or 4 columns wide; and
\item Implicants may ``wrap around'' from one side of the map to the other.
\end{enumerate}
For example, on a $4\times 4$ map, one possible implicant is the middle two rows; another is the leftmost and rightmost columns (wrapping horizontally); a third is the $2\times 2$ block consisting of the middle two elements of the top row and the middle two elements of the bottom row (wrapping vertically); a final example is the last two elements of the third row. See Figure~\ref{fig:KarnaughImplicants} for these examples.

\begin{figure}
Middle two rows ($q$):
\[ \begin{array}{r|cccc}
& \NOT{r}\AND\NOT{s} & \NOT{r}\AND s & r\AND s & r\AND\NOT{s}\\ \hline
\NOT{p}\AND\NOT{q} & & & & \\
\NOT{p}\AND q & \tikzmark{left1}1 & 1 & 1 & 1\\
p\AND q & 1 & 1 & 1 & 1\tikzmark{right1}\\
p\AND\NOT{q} & & & &
\end{array}
\DrawBox[blue]{left1}{right1} \]

Leftmost and rightmost columns ($\NOT{s}$):
\[ \begin{array}{r|cccc}
& \NOT{r}\AND\NOT{s} & \NOT{r}\AND s & r\AND s & r\AND\NOT{s}\\ \hline
\NOT{p}\AND\NOT{q} & \tikzmark{left1}1 & & & \tikzmark{left2}1\\
\NOT{p}\AND q & 1 & & & 1\\
p\AND q & 1 & & & 1\\
p\AND\NOT{q} & 1\tikzmark{right1} & & & 1\tikzmark{right2}
\end{array}
\DrawBoxW[blue]{left1}{right1}
\DrawBoxE[blue]{left2}{right2} \]

Middle elements of top and bottom rows ($\NOT{q}s$):
\[ \begin{array}{r|cccc}
& \NOT{r}\AND\NOT{s} & \NOT{r}\AND s & r\AND s & r\AND\NOT{s}\\ \hline
\NOT{p}\AND\NOT{q} & & \tikzmark{left1}1 & 1\tikzmark{right1} & \\
\NOT{p}\AND q & & & &\\
p\AND q & & & &\\
p\AND\NOT{q} & & \tikzmark{left2}1 & 1\tikzmark{right2} &
\end{array}
\DrawBoxN[blue]{left1}{right1}
\DrawBoxS[blue]{left2}{right2} \]

Last two elements of the third row ($pqr$):
\[ \begin{array}{r|cccc}
& \NOT{r}\AND\NOT{s} & \NOT{r}\AND s & r\AND s & r\AND\NOT{s}\\ \hline
\NOT{p}\AND\NOT{q} & & & & \\
\NOT{p}\AND q & & & &\\
p\AND q & & & \tikzmark{left1}1 & 1\tikzmark{right1}\\
p\AND\NOT{q} & & & &
\end{array}
\DrawBox[blue]{left1}{right1} \]
\caption{Some examples of Karnaugh map implicants}
\label{fig:KarnaughImplicants}
\end{figure}

A Karnaugh map also allows us to find simple circuits in the case that some combinations of inputs will never occur, so that we do not care what the output is in those rows of the truth table. By entering a \nw{don't care} value, such as X, in the map, we have the freedom to either ignore or include those cells when covering the map with implicants; by including a cell with an X along with a group of 1's, we might be able to construct a larger (and hence simpler) implicant.

For example, suppose we have the following truth table for a four-variable Boolean expression (this represents the inputs that are binary numbers less than ten and divisible by three):
\[ \begin{array}{cccc|c}
p & q & r & s & x\\ \hline
0 & 0 & 0 & 0 & 1\\
0 & 0 & 0 & 1 & 0\\
0 & 0 & 1 & 0 & 0\\
0 & 0 & 1 & 1 & 1\\
0 & 1 & 0 & 0 & 0\\
0 & 1 & 0 & 1 & 0\\
0 & 1 & 1 & 0 & 1\\
0 & 1 & 1 & 1 & 0\\
1 & 0 & 0 & 0 & 0\\
1 & 0 & 0 & 1 & 1\\
1 & 0 & 1 & 0 & X\\
1 & 0 & 1 & 1 & X\\
1 & 1 & 0 & 0 & X\\
1 & 1 & 0 & 1 & X\\
1 & 1 & 1 & 0 & X\\
1 & 1 & 1 & 1 & X
\end{array} \]
As a Karnaugh map, this is:
\[ \begin{array}{r|cccc}
& \NOT{r}\AND\NOT{s} & \NOT{r}\AND s & r\AND s & r\AND\NOT{s}\\ \hline
\NOT{p}\AND\NOT{q} & 1 & 0 & 1 & 0\\
\NOT{p}\AND q & 0 & 0 & 0 & 1\\
p\AND q & X & X & X & X\\
p\AND\NOT{q} & 0 & 1 & X & X
\end{array} \]
The 1's, plus some of the X's, may be covered by four implicants: $\NOT{p}\AND\NOT{q}\AND\NOT{r}\AND\NOT{s}$, $\NOT{q}\AND r\AND s$, $q\AND r\AND\NOT{s}$, and $p\AND s$. Note that the second implicant wraps around from the third cell on the top row to the third cell (with an X, which is also covered by the $p\AND s$ implicant) on the bottom row; if it were just the 1 on the top row, then the term would be $\NOT{p}\AND\NOT{q}\AND r\AND s$, which is not as simple. Here are the cells that end up being covered:
\[ \begin{array}{r|cccc}
& \NOT{r}\AND\NOT{s} & \NOT{r}\AND s & r\AND s & r\AND\NOT{s}\\ \hline
\NOT{p}\AND\NOT{q} & \tikzmark{left1}1\tikzmark{right1} & 0 & \tikzmark{left2a}1\tikzmark{right2a} & 0\\
\NOT{p}\AND q & 0 & 0 & 0 & \tikzmark{left3}1\\
p\AND q & X & \tikzmark{left4}X & X & X\tikzmark{right3}\\
p\AND\NOT{q} & 0 & 1 & \tikzmark{left2b}X\tikzmark{right2b}\tikzmark{right4} & X
\end{array}
\DrawBox[blue]{left1}{right1}
\DrawBoxN[red,rounded corners=3pt]{left2a}{right2a}
\DrawBoxS[red,rounded corners=3pt]{left2b}{right2b}
\DrawBox[green]{left3}{right3}
\DrawBox[purple]{left4}{right4} \]
Therefore, the simplified expression is $(\NOT{p}\AND\NOT{q}\AND\NOT{r}\AND\NOT{s})\OR(\NOT{q}\AND r\AND s)\OR(q\AND r\AND\NOT{s})\OR(p\AND s)$. This may be computed by the following circuit:
\begin{center}
\includegraphics[width=!,height=!,scale=0.75]{graphics/KarnaughExample.png}
\end{center}
In the next section, we will see how to implement this with a total delay of 5, using only two-input \textsc{and} and \textsc{or} gates.

The final difficulty with building low-delay circuits from DNF expressions is that, even with the simplification provided by something like a Karnaugh map, many Boolean functions lead to an exponential blowup when expressed in DNF. In the worst case, an expression with $n$ input variables may require $O(2^n)$ terms in a sum-of-product representation---consider the case of a Karnaugh map where the 1's are in a checkerboard arrangement, so that none are adjacent. When $n$ is large enough, it might not even be practical to consider the truth table at all; for example, a circuit that can add two 32-bit numbers requires 64 input lines, which would lead to a truth table with $2^{64}\approx 10^{19}$ entries. The next section will also discuss approaches to this kind of problem.

\begin{exercises}
\problem For each of the following Boolean expressions, compute the total delay of the direct translation of the expression into a circuit.
\ppart $\NOT{(\NOT{p}\OR q)}\OR(\NOT{\NOT{q}}\OR\NOT{p})$
\ppart $(\NOT(\NOT{r}\AND p)\OR\NOT{q})\AND(\NOT(\NOT{r}\AND q)\OR\NOT{p})$
\ppart $(((p\OR q)\AND(q\OR r))\AND(r\OR s))\AND(((p\OR r)\AND(q\OR s))\AND(p\OR s))$

\problem For each of the expressions in the previous problem, use a Karnaugh map to find an equivalent sum-of-products expression, and draw the resulting circuit.

\problem Suppose we want to build a counter that cycles through the numbers 0, 1, 2, 3, 4, and back to 0. One element of this counter will be a circuit that takes the current number, expressed in binary, and outputs the next number. Here is the truth table for this function, with three inputs ($a$, $b$, and $c$) and three outputs ($x$, $y$, and $z$):
\[ \begin{array}{ccc|ccc}
a & b & c & x & y & z\\ \hline
0 & 0 & 0 & 0 & 0 & 1\\
0 & 0 & 1 & 0 & 1 & 0\\
0 & 1 & 0 & 0 & 1 & 1\\
0 & 1 & 1 & 1 & 0 & 0\\
1 & 0 & 0 & 0 & 0 & 0\\
1 & 0 & 1 & X & X & X\\
1 & 1 & 0 & X & X & X\\
1 & 1 & 1 & X & X & X\\
\end{array} \]
Since the counter should never reach numbers 5, 6, or 7, we do not care about the output when $abc$ is 101, 110, or 111. Use Karnaugh maps to find a simple circuit for this function.

\problem\label{ex:BCD}In binary-coded decimal (BCD), four bits are used to represent the numbers 0 (0000) through 9 (1001); the other six bit patterns (1010 through 1111) are unused. BCD is often used in circuits where decimal numbers need to be displayed; a common device for doing so is the \nw{seven-segment display}. Using only seven elements (for example, light-emitting diodes), we may form a reasonable approximation of all the digits 0--9: \textifsym{0123456789}. Construct a truth table with four inputs and seven outputs showing how to produce these characters from input in BCD (be sure to include a diagram indicating which output column corresponds to which display element). Use Karnaugh maps to design a relatively simple circuit that implements a seven-segment decoder.

\problem Exercise~\ref{ex:CNF} of Section~\ref{S-logic-3} examines conjunctive normal form (CNF), the dual of DNF. Explore what kind of circuits result from CNF, and how to extract a simplified CNF expression from a Karnaugh map \textit{(Hint: look at blocks of 0's.)}.

\end{exercises}
