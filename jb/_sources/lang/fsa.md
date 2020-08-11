# Finite-State Automata

(Content adapted from Critchlow &amp; Eck)

We have seen how regular expressions can be used to generate languages
mechanically. How might languages be recognized mechanically? 
The question is of interest because if we can mechanically recognize languages
like $L= \{\textrm{all legal C++ programs that will not go into infinite loops on any
input}\}$, then it would be possible to write über-compilers that can do
semantic error-checking like testing for infinite loops, in addition to the
syntactic error-checking they currently do.

What formalism might we use to model what it means to recognize a language
"mechanically"? We look for inspiration to a language-recognizer with which
we are all familiar, and which we've already in fact mentioned: a compiler.
Consider how a C++ compiler might handle recognizing a legal `if`
statement. Having seen the word `if`, the compiler will be in a _state_
or _phase of its execution_ where it expects to see a `(`; in this state,
any other (non-blank) character will put the compiler in a "failure" state. If the compiler
does in fact see a `(` next, it will then be in an "expecting a boolean
condition" state; if it sees a sequence of symbols that make up a legal boolean
condition, it will then be in an "expecting a `)`" state; and then "expecting
a `{` or a legal statement"; and so on. Thus one can think of the compiler as
being in a series of states; on seeing a new input symbol, it moves on to a new
state; and this sequence of transitions eventually leads to either a "failure"
state (if the `if` statement is not syntactically correct) or a "success"
state (if the `if` statement is legal). We isolate these three
concepts&mdash;states, input-inspired transitions from state to state, and
"accepting" vs "non-accepting" states&mdash;as the key features of a mechanical
language-recognizer, and capture them in a model called a _finite-state
automaton_. (Whether this is a successful distillation of the essence of
mechanical language recognition remains to be seen; the question will be taken
up later in this chapter.)

A **finite-state automaton (FSA)**, then, is a machine which takes, as input, 
a finite
string of symbols from some alphabet $\Sigma$.
There is a finite set of **states** in which the machine can find itself. The
state it is in before consuming any input is called the **start state**.
Some of the states are **accepting**
or **final**. If the machine ends in such a state after completely consuming
an input string, the string is said to be **accepted** by the machine.
The actual functioning of the machine is described by something called a 
**transition function**, which specifies 
what happens if the machine is in a particular state and looking at a
particular input symbol. ("What happens" means "in which state does the
machine end up".)

---
**Example:** Below is a table that describes the transition function of a 
finite-state automaton with states $p$, $q$, and $r$, on inputs $0$ and $1$:

|     |  p  |  q  |  r  |
| :-: | :-: | :-: | :-: |
|  0  |  p  |  q  |  r  |
|  1  |  q  |  r  |  r  |

The table indicates, for example, 
that if the FSA were in state $p$ and consumed a $1$, it would
move to state $q$.

---

FSAs actually come in two flavors depending on what
properties you require of the transition function. We will look first at a class
of FSAs called deterministic finite-state automata (DFAs). In these
machines, the current state of the machine and the current input symbol together
determine exactly which state the machine ends up in: for every $\langle\textrm{current state,
current input symbol}\rangle$ pair, there is exactly one possible next state for the
machine.

> Formally,
a **deterministic finite-state automaton** $M$ is specified by 5 components:
$M=(Q, \Sigma, q_0, \delta, F)$ where
>
>  * $Q$ is a finite set of states; 
   * $\Sigma$ is an alphabet called the _input alphabet_; 
   * $q_0 \in Q$ is a state which is designated as the _start state_; 
   * $F$ is a subset of $Q$; the states in $F$ are states designated as 
_final_ or _accepting_ states; 
   * $\delta$ is a transition function that takes 
$\langle\textrm{state, input symbol}\rangle$ pairs and maps each one to a state: $\delta : Q \times
\Sigma \rightarrow Q$. To say
$\delta(q,a) = q'$ means that
if the machine is in state $q$ and the input symbol $a$ is consumed, then the
machine will move into state $q'$. The function $\delta$ must be a total
function, meaning that $\delta(q,a)$ must be defined for every state $q$ and
every input symbol $a$. (Recall also that, according to the definition of a
function, there can be only one output for any particular input. This means
that for any given $q$ and $a$, $\delta(q,a)$ can have only one value. This is
what makes the finite-state automaton deterministic: given the current state and
input symbol, there is only one possible move the machine can make.)

---
**Example:** The transition function described by the table in the preceding example is that of
a DFA.
If we take $p$ to be the start state and $r$ to be a final state, then the
formal description of the resulting machine is  
$M= (\{p,q,r\}, \{0,1\}, p, \delta, \{r\})$, where $\delta$
is given by

$\hspace{0.5in}\delta(p,0)=p \hspace{1.5in} \delta(p,1)=q$

$\hspace{0.5in}\delta(q,0)=q \hspace{1.5in} \delta(q,1)=r$

$\hspace{0.5in}\delta(r,0)=r \hspace{1.5in} \delta(r,1)=r$

---

The transition function $\delta$ describes only individual steps of the machine
as individual input symbols are consumed. However, we will often want to refer
to
"the
state the automaton will be in if it starts in state $q$ and consumes input
string $w$", where $w$ is a string of input symbols rather than a single symbol.
Following the usual practice of using $^*$ to designate
"0 or more", we define $\delta^*(q,w)$ as a convenient shorthand for 
"the state that the automaton will be in
if it starts in state $q$ and consumes the input string $w$". For any string,
it is easy to see, based on $\delta$, what steps the machine will
make as those symbols are consumed, and what $\delta^*(q,w)$ will be for any $q$
and $w$. Note that if no input is consumed, a DFA makes no move, and so
$\delta^*(q, \varepsilon) = q$ for any state $q$.[^$\delta^*$ can be defined
formally by saying that $\delta^*(q,\varepsilon)=q$ for every state $q$,
and $\delta^*(q,ax)=\delta^*(\delta(q,a),x)$ for any state $q$, $a\in\Sigma$
and $x\in\Sigma^*$. Note that this is a recursive definition.]

---
**Example:**
Let $M$ be the automaton in the preceding example. Then:

$\delta^*(p, 001)=q$, since $\delta(p,0)=p$, $\delta(p,0)=p$, and $\delta(p,1)=q$; 

$\delta^*(p, 01000)= q$;

$\delta^*(p, 1111) = r$;

$\delta^*(q, 0010) = r$.

---

We have divided the states of a DFA into accepting and non-accepting states, with
the idea that some strings will be recognized as "legal" by the automaton, and
some not. Formally:

> Let $M=(Q, \Sigma, q_0, \delta, F)$. A string $w \in \Sigma^*$ is **accepted**
by $M$ iff $\delta^*(q_0, w) \in F$. (Don't get confused by the notation.
Remember, it's just a shorter and neater way of saying
"$w \in \Sigma^*$ is accepted by $M$ if and only if the state that $M$ will end
up in
if it starts in $q_0$ and consumes $w$ is one of the states in $F$.")
>
> The **language accepted by $M$**, denoted $L(M)$, is the set of all strings 
$w \in \Sigma^*$ that are accepted by $M$: 
$L(M) = \{ w \in\Sigma^* \ | \ \delta^*(q_0, w) \in F\}$.

Note that we sometimes use a slightly different phrasing and say that a language
$L$ is accepted by some machine $M$. We don't mean by this that $L$ _and
maybe some other strings_ are accepted by $M$; we mean $L = L(M)$, _i.e._, $L$ is
_exactly_ the set of strings accepted by $M$.

It may not be easy, looking at a formal specification of a DFA, to determine what
language that automaton accepts. Fortunately, the mathematical description of
the automaton $M=(Q, \Sigma, q_0, \delta, F)$ can be neatly and helpfully
captured in a picture called a **transition diagram**.
Consider again the DFA of the two preceding examples. It
can be represented pictorially as:

<img src={useBaseUrl('img/fsa1.png')}
alt="Example DFA" className="centered-figure" />

<!--
```reason hidden
type graphLayout('n) = (list(('n, (float, float))), list(('n, 'n)));

let layoutCircle = ((nodes, pairs), radius)=> {
  let a = 360. /. float_of_int(List.length(nodes));
  let locs = List.mapi((i, node) => (node, polar(radius, a *. float_of_int(i))), nodes);
  (locs, pairs)
};

let layoutGrid = ((nodes, pairs), columns, spacing) => {
  let shift = float_of_int(columns - 1) *. spacing /. 2.;
  let locs = List.mapi((i, node) => {
      let row = i / columns;
      let col = i mod columns;
      (node, (float_of_int(col) *. spacing -. shift, float_of_int(row) *. spacing))
    }, nodes);
  (locs, pairs)
};

let renderLayout = ((locs, pairs), string_of_node, styleNode, styleEdge) => {
  let nodeRadius = 10.;
  let arrowLength = 5.;
  let arrowAngle = radians(30.);
  let loopOut = radians(240.);
  let loopIn = radians(300.);
  let nodes = List.map(((node, p)) => {
      translateP(p,
        styleNode(node, stroke(Color("none"), fill(Color("black"), text(string_of_node(node))))
        +++ circle(nodeRadius)))
    }, locs);
  let edges = List.map(((n1, n2)) => {
      if (n1 == n2) {
        let p = List.assoc(n1, locs);
        let (x, y) = p;
        let p1 = (x +. nodeRadius *. cos(loopOut), y +. nodeRadius *. sin(loopOut));
        let p2 = (x +. nodeRadius *. cos(loopIn), y +. nodeRadius *. sin(loopIn));
        let c1 = (x +. 3. *. nodeRadius *. cos(loopOut), y +. 3. *. nodeRadius *. sin(loopOut));
        let c2 = (x +. 3. *. nodeRadius *. cos(loopIn), y +. 3. *. nodeRadius *. sin(loopIn));
        let (x2, y2) = p2;
        let p3 = (x2 +. arrowLength *. cos(loopIn +. arrowAngle), y2 +. arrowLength *. sin(loopIn +. arrowAngle));
        let p4 = (x2 +. arrowLength *. cos(loopIn -. arrowAngle), y2 +. arrowLength *. sin(loopIn -. arrowAngle));
        setBounds(x -. nodeRadius, x +. nodeRadius, y -. 2.5 *. nodeRadius, y +. nodeRadius,
          styleEdge(n1, n2, openPath([moveP(p1), curveP(c1, c2, p2), moveP(p2), lineP(p3), moveP(p2), lineP(p4)])))
      } else {
        let p1 = List.assoc(n1, locs);
        let p2 = List.assoc(n2, locs);
        let (x1, y1) = p1;
        let (x2, y2) = p2;
        let dx = x2 -. x1;
        let dy = y2 -. y1;
        let a = atan2(dy, dx);
        let p3 = (x2 -. nodeRadius *. cos(a), y2 -. nodeRadius *. sin(a));
        let (x3, y3) = p3;
        let p4 = (x3 -. arrowLength *. cos(a +. arrowAngle), y3 -. arrowLength *. sin(a +. arrowAngle));
        let p5 = (x3 -. arrowLength *. cos(a -. arrowAngle), y3 -. arrowLength *. sin(a -. arrowAngle));
        styleEdge(n1, n2, openPath([moveP(p1), lineP(p2), moveP(p3), lineP(p4), moveP(p3), lineP(p5)]))
      }
    }, pairs);
  let nodeImage = List.fold_left((+++), empty, nodes);
  let edgeImage = List.fold_left((+++), empty, edges);
  nodeImage +++ edgeImage
};

let defaultStyleNode = (node, img) => {
  stroke(Color("black"), fill(Color("white"), img))
};

let defaultStyleEdge = (n1, n2, img) => {
  stroke(Color("black"), img)
};

let acceptNode = (node, img) => {
  stroke(Color("black"), fill(Color("none"), circle(8.)))
    +++ defaultStyleNode(node, img)
}

let labelEdge = (lbl, img) => {
  let (l, r, t, _) = bbox(img);
  let lblimg = translate((l +. r) /. 2., t -. 2.,
    withFont(0.5, Sans, Regular, Normal, stroke(Color("none"), fill(Color("black"), text(lbl)))));
  lblimg +++ img
};

let labelLoop = (lbl, img) => {
  let (l, r, t, _) = bbox(img);
  let lblimg = translate(l -. 6., t -. 2.,
    withFont(0.5, Sans, Regular, Normal, stroke(Color("none"), fill(Color("black"), text(lbl)))));
  lblimg +++ img
};

let sn1 = (node, img) => {
  switch (node) {
  | "Start" => empty
  | "r" => acceptNode(node, img)
  | _ => defaultStyleNode(node, img)
  }
};

let se1 = (n1, n2, img) => {
  switch (n1, n2) {
  | ("p", "p") => labelLoop("0", img)
  | ("p", "q") => labelEdge("1", img)
  | ("q", "q") => labelLoop("0", img)
  | ("q", "r") => labelEdge("1", img)
  | ("r", "r") => labelLoop("0,1  ", img)
  | _ => defaultStyleEdge(n1, n2, img)
  }
};

let m1 = (["Start", "p", "q", "r"], [("Start", "p"), ("p", "p"), ("p", "q"), ("q", "q"), ("q", "r"), ("r", "r")]);

draw(renderLayout(layoutGrid(m1, 4, 50.), s => s, sn1, se1));
```
-->

The arrow on the left indicates that $p$ is the start state; double
circles indicate that a state is accepting. Looking at this picture, it should
be fairly easy to see that the language accepted by the DFA $M$ is 
$L(M) = \{ x \in \{0,1\}^* \ | \ n_1(x) \geq 2\}$.

---
**Example:** Find the language accepted by the DFA shown below (and describe it using a
regular expression!):

<img src={useBaseUrl('img/fsa2.png')}
alt="Example DFA" className="centered-figure" />

The start state of $M$ is accepting, which means $\varepsilon \in L(M)$. If $M$ is
in state $q_0$, a
sequence of two $a$'s or three $b$'s will move $M$ back to $q_0$ and hence
be accepted. So $L(M) = L((aa | bbb)^*)$.

---

The state $q_4$ in the preceding example is often called a _garbage_, _error_, or
_trap_ state: it is a non-accepting state which, once reached by the machine,
cannot be escaped. It is fairly common to omit such states from transition
diagrams. For example, one is likely to see the diagram:

<img src={useBaseUrl('img/fsa3.png')}
alt="Example DFA" className="centered-figure" />

Note that this cannot be a complete DFA, because a DFA is required to have a
transition defined for every state-input pair. The diagram is "short for" the
full diagram:

<img src={useBaseUrl('img/fsa4.png')}
alt="Example DFA" className="centered-figure" />

As well as recognizing what language is accepted by a given DFA, we often want to
do the reverse and come up with a DFA that accepts a given language.
Building DFAs for specified languages is an art, not a science.
There is no algorithm that you can apply to produce a DFA from an English-language
description of the set of strings the DFA should accept. On the other hand, it
is not generally successful, either, to simply write down a half-dozen strings
that are in the language and design a DFA to accept those strings&mdash;invariably
there are strings that are in the language that aren't accepted, and other
strings that aren't in the language that are accepted. So how do you go about
building DFAs that accept all and only the strings they're supposed to accept?
The best advice I can give is to
think about relevant characteristics that determine whether a string is in the
language or not, and to think about what the possible values or "states" of 
those characteristics
are; then build a machine that has a state corresponding to each possible
combination of values of relevant characteristics, and determine how the
consumption of inputs affects those values. I'll illustrate what I mean with a
couple of examples.

---
**Example:** Find a DFA with input alphabet $\Sigma = \{a,b\}$ that accepts the language
$L= \{w \in\Sigma^* \ | \ n_a(w) \textrm{ and } n_b(w) \textrm{ are both even } \}$.

The characteristics that determine whether or not a string $w$ is in $L$ are the
parity of $n_a(w)$ and $n_b(w)$. There are four possible combinations of
"values" for these characteristics: both numbers could be even, both could be
odd, the first could be odd and the second even, or the first could be even and
the second odd. So we build a machine with four states $q_1, q_2, q_3, q_4$
corresponding to the four cases. We want to set up $\delta$ so that the machine
will be in state $q_1$ exactly when it has consumed a string with an even number
of $a$'s and an even number of $b$'s, in state $q_2$ exactly when it has 
consumed a string with an
odd number of $a$'s and an odd number of $b$'s, and so on.

To do this, we first make 
the state $q_1$ into our start state,
because the DFA will be in the start state after consuming the empty string
$\varepsilon$, and $\varepsilon$ has an even number (zero) of both $a$'s and $b$'s. Now we
add transitions by reasoning about how the parity of $a$'s and $b$'s is changed
by additional input. For instance, if the machine is in $q_1$ (meaning an even
number of $a$'s and an even number of $b$'s have been seen) and a further $a$ is
consumed, then we want the machine to move to state $q_3$, since the machine has
now consumed an odd number of $a$'s and still an even number of $b$'s. So we add
the transition $\delta(q_1, a) = q_3$ to the machine. Similarly, if the machine
is in $q_2$ (meaning an odd
number of $a$'s and an odd number of $b$'s have been seen) and a further $b$ is
consumed, then we want the machine to move to state $q_3$ again, since the 
machine has
still consumed an odd number of $a$'s, and now an even number of $b$'s.
So we add
the transition $\delta(q_2, b) = q_3$ to the machine. Similar reasoning produces
a total of eight transitions, one for each state-input pair. Finally, we have to
decide which states should be final states. The only state that corresponds to
the desired criteria for the language $L$ is $q_1$, so we make $q_1$ a final
state. The complete machine is shown below.

<img src={useBaseUrl('img/fsa5.png')}
alt="Example DFA" className="centered-figure" />

---
**Example:** Find a DFA with input alphabet $\Sigma = \{a,b\}$ that accepts the language
$L$ = $\{w\in\Sigma^* \ | \ n_a(w) \textrm{ is divisible by 3 } \}$.

The relevant characteristic here is of course whether or not the number of $a$'s
in a string is divisible by 3, perhaps suggesting a two-state machine. But in
fact, there is more than one way for a number to not be divisible by 3: dividing
the number by 3 could produce a remainder of either 1 or 2 (a remainder of 0
corresponds to the number in fact being divisible by 3). So we build a machine
with three states $q_0$, $q_1$, $q_2$, and add transitions so that the machine
will be in state $q_0$ exactly when the number of $a$'s it has consumed is evenly
divisible by 3, in state $q_1$ exactly when the number of $a$'s it has consumed
is equivalent to $1 \bmod{3}$, and similarly for $q_2$. State $q_0$ will be the
start state, as $\varepsilon$ has 0 $a$'s and 0 is divisible by 3. The completed
machine is shown below. Notice that because the consumption of a $b$ does not
affect the only relevant characteristic, $b$'s do not cause changes of 
state.

<img src={useBaseUrl('img/fsa6.png')}
alt="Example DFA" className="centered-figure" />

---
**Example:** Find a DFA with input alphabet $\Sigma = \{a,b\}$ that accepts the language
$L$ = $\{w\in\Sigma^* \ | w \textrm{ contains three consecutive a's } \}$.

Again, it is not quite so simple as making a two-state machine where the states
correspond to "have seen $aaa$" and "have not seen $aaa$".
Think dynamically: as you move through the
input string, how do you arrive at the goal of having seen three consecutive
$a$'s? You might have seen two consecutive $a$'s and still need a third, or
you might just have seen one $a$ and be looking for two more to come
immediately, or you might just have seen a $b$ and be right back at the
beginning as far as seeing 3 consecutive $a$'s goes. So this time there will be
four states, with the "last symbol was not an $a$" state being the start
state. The complete automaton is shown below.

<img src={useBaseUrl('img/fsa7.png')}
alt="Example DFA" className="centered-figure" />

---

## Exercises

1. Give DFAs that accept the following languages over $\Sigma =\{a,b\}$.
   * $L_1= \{ x \ | \ x \textrm{ contains the substring } aba\}$
   * $L_2= L(a^*b^*)$
   * $L_3= \{ x \ | \ n_a(x)+n_b(x) \textrm{ is even }\}$
   * $L_4= \{ x \ | \ n_a(x) \textrm{ is a multiple of 5 }\}$
   * $L_5= \{ x \ | \ x \textrm{ does not contain the substring } abb\}$
   * $L_6= \{ x \ | \ x \textrm{ has no a's in the even positions} \}$
   * $L_7 = L(aa^* | aba^*b^*)$

2. What languages do the following DFAs accept?

<img src={useBaseUrl('img/fsa1ex.png')}
alt="Example DFA" className="centered-figure" />

<img src={useBaseUrl('img/fsa2ex.png')}
alt="Example DFA" className="centered-figure" />

3. Let $\Sigma=\{0,1\}$. Give a DFA that accepts the language 
$$ L = \{ x \in \Sigma^* \ | \ x \textrm{ is the binary representation of an integer
divisible by 3}\}.$$ 
