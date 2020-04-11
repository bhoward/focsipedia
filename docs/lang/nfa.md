---
id: nfa
title: Nondeterministic Finite-State Automata
---

(Content adapted from Critchlow &amp; Eck)

As mentioned briefly above, there is an alternative school of though as to what
properties should be required of a finite-state automaton's transition function.
Recall our motivating example of a C++ compiler and a legal `if` statement. 
In our description, we had the compiler in an "expecting a `)`" state; on
seeing a `)`, the compiler moved into an "expecting a `{` or a legal
statement" state. An alternative way to view this would be to say that the
compiler, on seeing a `)`, could move into one of two different states: it could
move to an "expecting a `{`" state _or_ move to an "expecting a legal
statement" state. Thus, from a single state, on input `)`, the compiler has
multiple moves. This alternative interpretation is not
allowed by the DFA model.

A second point on which one 
might question the DFA model is the fact that input must be consumed for the
machine to change state.
Think of the syntax for C++ function declarations. The return type of a
function need not be specified (the default is taken to be `int`). The
start state of the compiler when parsing a function declaration might be 
"expecting a return type"; then with no
input consumed, the compiler can move to the state "expecting a legal function 
name". To model this, it might seem reasonable to allow transitions that do 
not require
the consumption of input (such transitions are called
**$\varepsilon$-transitions**). Again, this is not supported by the DFA abstraction.
There is, therefore, a second class of finite-state automata that people
study, the class of nondeterministic finite-state automata. 

A \nw{nondeterministic finite-state automaton (NFA)} is the same as a 
deterministic
finite-state automaton except that the transition function is no longer a
function that maps a state-input pair to a state; rather, it maps a state-input
pair or a state-$\varepsilon$ pair to a {\bf set} of states. No longer do we have 
$\delta(q,a) = q'$, meaning that the machine
must change to state $q'$ if it is in state $q$ and consumes an $a$. Rather,
we have $\partial(q,a) = \{q_1, q_2, \ldots, q_n\}$, meaning that if the
machine is in state $q$ and consumes an $a$, it might move directly to any one
of the states $q_1, \ldots, q_n$. Note that the set of next states
$\partial(q,a)$ is defined for every state $q$ and every input symbol $a$,
but for some $q$'s and $a$'s it could be empty, or contain just one state (there
don't {\bf have} to be multiple next states). The function $\partial$ must
also specify whether it is possible for the machine to make any moves 
without input being consumed, i.e.\ $\partial(q, \varepsilonsilon)$ must be
specified for every state $q$. Again, it is quite possible that 
$\partial(q, \varepsilonsilon)$ may be empty for some states $q$: there need not be
$\varepsilon$-transitions out of $q$.

\smallskip

\begin{definition}
Formally,
a nondeterministic finite-state automaton $M$ is specified by 5 components:
$M=(Q, \Sigma, q_0, \partial, F)$ where
\begin{itemize} 
\item $Q$, $\Sigma$, $q_0 $ and $F$ are as in the definition of DFAs;
\item $\partial$ is a transition function that takes 
$<$state, input symbol$>$ pairs and maps each one to a set of states. To say
$\partial(q,a) = \{q_1, q_2, \ldots , q_n\}$ means that
if the machine is in state $q$ and the input symbol $a$ is consumed, then the
machine may move directly into any one of states $q_1, q_2, \ldots , q_n$. 
The function $\partial$ must also be defined for every $<$state,$\varepsilon$$>$ pair.
To say
$\partial(q,\varepsilon) = \{q_1, q_2, \ldots , q_n\}$ means that there are direct
$\varepsilon$-transitions from state $q$ to each of $q_1, q_2, \ldots , q_n$.


The formal description of the function $\partial$ is $\partial : Q \times
(\Sigma \cup \{\varepsilon\}) \rightarrow \POW(Q)$.
\end{itemize}
\end{definition}


The function $\partial$ describes how the machine functions on zero or one 
input symbol. 
As with DFAs, we will often want to refer to the behavior of the machine on a
string of inputs, and so we use the notation $\pstar(q,w)$ as shorthand
for "the set of states in which
the machine might be if it starts in state $q$ and consumes input string $w$". 
As with DFAs, $\pstar(q,w)$ is
determined by the specification of $\partial$. Note that for every state $q$,
$\pstar(q, \varepsilon)$ contains at least $q$, and may contain additional states if
there are (sequences of) $\varepsilon$-transitions out of $q$. 

We do have to think a bit carefully about what it means for an NFA to accept a
string $w$. Suppose $\pstar(q_0,w)$ contains both accepting and non-accepting
states, i.e.\ the machine could end in an accepting state after consuming $w$,
but it might also end in a non-accepting state. Should we consider the machine
to accept $w$, or should we require every state in $\pstar(q_0,w)$ to be
accepting before we admit $w$ to the ranks of the accepted? Think of the C++
compiler again: provided that an {\em if} statement fits one of the legal
syntax specifications, the compiler will accept it. So we take as the
definition of acceptance by an NFA: A string $w$ is accepted by an NFA provided
that at least one of the states in $\pstar(q_0, w)$ is an accepting state. 
That is, if there is some sequence of steps of the machine that consumes $w$
and leaves the machine in an accepting state, then the machine accepts $w$.
Formally:

\smallskip

\begin{definition}
Let $M= (Q, \Sigma, q_0, \partial, F)$ be a nondeterministic finite-state
automaton. The string $\winss$ is \nw{accepted} 
by $M$ iff $\pstar(q_0,w)$ contains at least one state $q_F \in F$.

The \nw{language accepted by $M$}, denoted $L(M)$, is the set of all strings 
$\winss$ that are
accepted by $M$: $L(M) = \{ w \in \Sigma^* \ | \ \pstar(q_0, w) \cap F \not= 
\emptyset\}$.
\end{definition}

\smallskip


\begin{example}\label{asome} The NFA shown below accepts all strings of $a$'s 
and $b$'s in which the second-to-last symbol is $a$.

\fsafig{8}

\end{example} 

It should be fairly clear that every language that is accepted by a DFA is also
accepted by an NFA. Pictorially, a DFA looks exactly like an NFA (an NFA that
doesn't happen to have any $\varepsilon$-transitions or multiple same-label
transitions from any state), though there is slightly more going on behind
the scenes. Formally, given the DFA $M=(Q, \Sigma, q_0, \delta, F)$, you can
build an NFA $M'=(Q, \Sigma, q_0, \partial, F)$ where 4 of the 5 components
are the same and where every transition $\delta(q,a) = q'$ has been replaced by
$\partial(q,a) = \{q'\}$. 

But is the reverse true? Can any NFA-recognized language be recognized by a DFA?
Look, for example, at the language in Example~\ref{asome}. Can you come up with
a DFA that accepts this language? Try it. It's pretty difficult to do. But
does that mean that there really is {\bf no} DFA that accepts the language, or
only that we haven't been clever enough to find one?

It turns out that the limitation is in fact in our cleverness, and not in the
power of DFAs.

\begin{theorem}
Every language that is accepted by an NFA is accepted by a DFA.
\end{theorem}
\begin{proof} Suppose we are given an NFA $N = (P, \Sigma, p_0, \partial, F_p)$, and we want to
build a DFA $D=(Q, \Sigma, q_0, \delta, F_q)$ that accepts the same language.
The idea is to make the states in $D$ correspond to {\em subsets}
of $N$'s states, and
then to set up $D$'s transition function $\delta$ so that for any string $w$, 
$\dstar(q_0, w)$ corresponds to $\pstar(p_0,w)$; i.e.\ the {\bf single} state that
$w$ gets you to in $D$ corresponds to the {\bf set} of states that $w$ could get
you to in $N$. 
If any of those states is accepting in $N$, $w$ would
be accepted by $N$, and so the corresponding state in $D$ would be made accepting
as well.

So how do we make this work? The first thing to do is to deal with a start state
$q_0$ for $D$. If we're going to make this state correspond to a subset of $N$'s
states, what subset should it be? Well, remember (1) that in any DFA,
$\dstar(q_0, \varepsilon) = q_0$; and (2) we want to make $\dstar(q_0, w)$ correspond
to $\pstar(p_0,w)$ for every $w$. Putting these two limitations together tells
us that we should make $q_0$ correspond to $\pstar(p_0, \varepsilon)$. So $q_0$
corresponds to the subset of all of $N$'s states that can be reached with no
input.

Now we progressively set up $D$'s transition function $\delta$ by repeatedly
doing the following:

-- find a state $q$ that has been added to $D$ but whose out-transitions have not
yet been added. (Note that $q_0$ initially fits this description.) Remember
that the state $q$ corresponds to some subset $\{p_1, \ldots , p_n\}$ of $N$'s
states.

-- for each input symbol $a$, look at all $N$'s states that can be reached from
any one of $p_1, \ldots , p_n$ by consuming $a$ (perhaps making some
$\varepsilon$-transitions as well). That is, look at $\pstar(p_1,a) \cup \ldots \cup
\pstar(p_n,a)$. If there is not already a DFA state $q'$ that corresponds to
this subset of $N$'s states, then add one, and add the transition 
$\delta(q, a)= q'$ to $D$'s transitions.

The above process must halt eventually, as there are only a finite
number of states $n$ in the NFA, and therefore there can be at most $2^n$ states in the
DFA, as that is the number of subsets of the NFA's states. The final states of
the new DFA are those where at least one of the associated NFA states is an
accepting state of the NFA. 

Can we now argue that $L(D) = L(N)$? We can, if we can argue that
$\dstar(q_0,w)$ corresponds to $\pstar(p_0,w)$ for all $\winss$: if this
latter property holds, then $w \in L(D)$ iff $\dstar(q_0,w)$ is accepting, which
we made be so iff $\pstar(p_0,w)$ contains an accepting state of $N$, which
happens iff $N$ accepts $w$ i.e.\ iff $w \in L(N)$.

So can we argue that $\dstar(q_0,w)$ does in fact correspond to $\pstar(p_0,w)$
for all $w$? We can, using induction on the length of $w$.

First, a preliminary observation. Suppose $w=xa$, i.e.\ $w$ is the string $x$
followed by the single symbol $a$. How are $\pstar(p_0,x)$ and $\pstar(p_0,w)$
related? Well, recall that $\pstar(p_0,x)$ is the set of all states that $N$ can
reach when it starts in $p_0$ and consumes $x$: 
$\pstar(p_0,x) = \{p_1, \ldots, p_n\}$ for some states
$p_1, \ldots, p_n$. Now, $w$ is just $x$ with an additional $a$, so where might
$N$ end up if it starts in $p_0$ and consumes $w$? We know that $x$ gets $N$ to
$p_1$ or $\ldots$ or $p_n$, so $xa$ gets $N$ to any state that can be reached
from $p_1$ with an $a$ (and maybe some $\varepsilon$-transitions), and to any state
that can be reached from $p_2$ with an $a$ (and maybe some $\varepsilon$-transitions),
etc. Thus, our relationship between $\pstar(p_0,x)$ and $\pstar(p_0,w)$ is that
if $\pstar(p_0,x) = \{p_1, \ldots, p_n\}$, then $\pstar(p_0,w) = \pstar(p_1,a)
\cup \ldots \cup \pstar(p_n,a)$. With this observation in hand, let's proceed to
our proof by induction.

We want to prove that $\dstar(q_0,w)$ corresponds to $\pstar(p_0,w)$ for all
$\winss$. We use induction on the length of $w$.
\begin{enumerate}
\item Base case: Suppose $w$ has length 0. The only string $w$ with length 0 is
$\varepsilon$, so we want to show that 
$\dstar(q_0,\varepsilon)$ corresponds to $\pstar(p_0,\varepsilon)$. Well, 
$\dstar(q_0, \varepsilon) = q_0$, since in a DFA, $\dstar(q, \varepsilon) = q$ for any
state~$q$. We explicitly made $q_0$ correspond to 
$\pstar(p_0,\varepsilon)$, and so the property holds for $w$ with length 0.
\item Inductive case: Assume that the desired property holds for some number $n$,
i.e.\ that $\dstar(q_0,x)$ corresponds to $\pstar(p_0,x)$ for all $x$ with
length $n$. Look at an arbitrary string $w$ with length $n+1$. 
We want to show that $\dstar(q_0,w)$ corresponds to $\pstar(p_0,w)$.
Well, the string $w$
must look like $xa$ for some string $x$ (whose length is $n$) and some symbol
$a$. By our inductive hypothesis, we know
$\dstar(q_0,x)$ corresponds to $\pstar(p_0,x)$. We know $\pstar(p_0,x)$ is a
set of $N$'s states, say 
$\pstar(p_0,x) = \{p_1, \ldots, p_n\}$.

At this point, our subsequent reasoning might be a bit clearer if we give
explicit names
to $\dstar(q_0,w)$ (the state $D$
reaches on input $w$) and $\dstar(q_0,x)$ (the state $D$
reaches on input $x$). Call $\dstar(q_0, w)$ \ $q_w$, and call
$\dstar(q_0,x)$ \ $q_x$. We know, because $w=xa$, there must be an 
$a$-transition from $q_x$ to $q_w$. Look at how we added transitions to
$\delta$: the fact that there is an $a$-transition from $q_x$ to $q_w$ means that
$q_w$ corresponds to the set $\pstar(p_1,a)
\cup \ldots \cup \pstar(p_n,a)$ of $N$'s states. By our preliminary observation,
$\pstar(p_1,a)
\cup \ldots \cup \pstar(p_n,a)$ is just $\pstar(p_0,w)$. So $q_w$ (or
$\dstar(q_0,w)$) corresponds to $\pstar(p_0,w)$, which is what we wanted to
prove. Since $w$ was an arbitrary string of length $n+1$, we have shown that 
the property holds for $n+1$.
\end{enumerate}

Altogether, we have shown by induction that $\dstar(q_0,w)$ corresponds to
$\pstar(p_0,w)$ for all
$\winss$. As indicated at the very beginning of this proof, that is enough to
prove that $L(D)= L(N)$. So for any NFA $N$, we can find a DFA $D$ that accepts
the same language.
\end{proof}

\bigskip

\begin{example}\label{nfatodfaex}
Consider the NFA shown below.

\fsafig{9}

We start by looking at $\pstar(p_0, \varepsilon)$, and then add transitions and
states as described above.
\begin{itemize}
\item
$\pstar(p_0, \varepsilon) = \{p_0\}$ so $q_0 = \{p_0\}$.

\item
$\delta(q_0,a)$ will be $\pstar(p_0,a)$, which is $\{p_0\}$, 
so $\delta(q_0,a) = q_0$.

\item
$\delta(q_0,b)$ will be $\pstar(p_0,b)$, which is $\{p_0, p_1\}$,
so we need to add a new state
$q_1 = \{p_0, p_1\}$ to the DFA; and add $\delta(q_0,b) = q_1$ to the DFA's
transition function.

\item
$\delta(q_1,a)$ will be $\pstar(p_0,a)$ unioned with $\pstar(p_1,a)$ since
$q_1 = \{p_0, p_1\}$. Since $\pstar(p_0,a) \cup \pstar(p_1,a) = \{p_0\} \cup
\{p_2\} = \{p_0,p_2\}$, we need to add a new state $q_2 = \{p_0, p_2\}$ to the
DFA, and a transition $\delta(q_1,a) = q_2$.

\item 
$\delta(q_1,b)$ will be $\pstar(p_0,b)$ unioned with $\pstar(p_1,b)$, which
gives $\{p_0, p_1\} \cup \{p_2\}$, which again gives us a new state $q_3$ to add to
the DFA, together with the transition $\delta(q_1,b) = q_3$.
\end{itemize}

At this point, our partially-constructed DFA looks as shown below:

\fsafig{10}

The construction continues as long as there are new states being added, and new
transitions from those states that have to be computed.
The final DFA is shown below.

\fsafig{11}

\end{example}


\begin{exercises}
\problem What language does the NFA in Example~\ref{nfatodfaex} accept?
\problem Give a DFA that accepts the language accepted by the 
following NFA.

\fsafig{3ex}

\problem Give a DFA that accepts the language accepted by the following NFA.
(Be sure to note that, for example, it is possible to reach both $q_1$ and
$q_3$ from $q_0$ on consumption of an $a$, because of the 
$\varepsilon$-transition.)

\fsafig{4ex}


\end{exercises}
