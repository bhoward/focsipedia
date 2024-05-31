---
id: cfg
title: Context-Free Grammars
---

(Content adapted from Critchlow &amp; Eck)

Both natural languages, such as English, and the
artificial languages used for programming have a structure
known as grammar or syntax. In order to form legal sentences
or programs, the parts of the language must be fit together
according to certain rules. For natural languages, the
rules are somewhat informal (although high-school English
teachers might have us believe differently). For programming
languages, the rules are absolute, and programs that violate
the rules will be rejected by a compiler.

In this chapter, we will study formal grammars and languages
defined by them. The languages we look at will, for the most part,
be "toy" languages, compared to natural languages or even
to programming languages, but the ideas and techniques are basic
to any study of language. In fact, many of the ideas arose
almost simultaneously in the 1950s in the work of linguists who were
studying natural language and programmers who were looking for
ways to specify the syntax of programming languages.

The grammars in this chapter are **generative grammars**.
A generative grammar is a set of rules that can be used to generate
all the legal strings in a language. We will also consider the closely
related idea of **parsing**. To parse a string means to determine
how that string can be generated according to the rules.

This chapter is a continuation of the preceding chapter.
Like a regular expression, a grammar is a way to specify a possibly
infinite language with a finite amount of information. In fact,
we will see that every regular language can be specified
by a certain simple type of grammar. We will also see that some languages
that can be specified by grammars are not regular.

In its most general form, a grammar is a set of **rewriting
rules**. A rewriting rule specifies that a certain string of symbols can
be substituted for all or part of another string. If $w$ and $u$ are
strings, then $w\longrightarrow u$ is a rewriting rule that specifies that
the string $w$ can be replaced by the string $u$. The symbol "$\longrightarrow$"
is read "can be rewritten as." Rewriting rules are also called
**production rules** or **productions**, and
"$\longrightarrow$" can also be read as "produces." For example,
if we consider strings over the alphabet $\{a,b,c\}$, then
the production rule $aba\longrightarrow cc$ can be applied to the
string $abbabac$ to give the string $abbccc$. The substring $aba$
in the string $abbabac$ has been replaced with $cc$.

In a **context-free grammar**, every rewriting rule has the
form $A\longrightarrow w$, where $A$ is single symbol and $w$ is a string
of zero or more symbols. (The grammar is "context-free" in the
sense that $w$ can be substituted for $A$ wherever $A$ occurs in a string,
regardless of the surrounding context in which $A$ occurs.)
The symbols that occur on the left-hand
sides of production rules in a context-free grammar
are called **non-terminal symbols**.
By convention, the non-terminal symbols are usually uppercase letters.
The strings on the right-hand sides of the production rules can
include non-terminal symbols as well as other symbols, which are
called **terminal symbols**. By convention, the
terminal symbols are usually lowercase letters. Here are some
typical production rules that might occur in context-free grammars:
$$
\begin{aligned}
   &A\longrightarrow aAbB\\
   &S\longrightarrow SS\\
   &C\longrightarrow Acc\\
   &B\longrightarrow b\\
   &A\longrightarrow\varepsilon
\end{aligned}
$$
In the last rule in this list, $\varepsilon$ represents the empty string,
as usual. For example, this rule could be applied to the string
$aBaAcA$ to produce the string $aBacA$. The first occurrence of
the symbol $A$ in $aBaAcA$ has been replaced by the empty string&mdash;which
is just another way of saying that the symbol has been dropped from the string.

In every context-free grammar, one of the non-terminal symbols is
designated as the **start symbol** of the grammar. The start symbol
is often, though not always, denoted by $S$. When the grammar
is used to generate strings in a language, the idea is to start
with a string consisting of nothing but the start symbol. Then
a sequence of production rules is applied. Each application of
a production rule to the string transforms the string to a new
string. If and when this process produces a string that consists
purely of terminal symbols, the process ends. That string of
terminal symbols is one of the strings in the language generated
by the grammar. In fact, the language consists precisely of
all strings of terminal symbols that can be produced in this way.

As a simple example, consider a grammar that has three production
rules: $S\longrightarrow aS$, $S\longrightarrow bS$, and $S\longrightarrow b$.
In this example, $S$ is the only non-terminal symbol, and
the terminal symbols are $a$ and $b$. Starting from the
string $S$, we can apply any of the three rules of the grammar
to produce either $aS$, $bS$, or $b$. Since the string $b$ contains
no non-terminals, we see that $b$ is one of the strings in the language
generated by this grammar. The strings $aS$ and $bS$ are not in
that language, since they contain the non-terminal symbol $S$,
but we can continue to apply production rules to these strings.
From $aS$, for example, we can obtain $aaS$, $abS$, or $ab$.
From $abS$, we go on to obtain $abaS$, $abbS$, or $abb$.
The strings $ab$ and $abb$ are in the language generated by
the grammar. It's not hard to see that any string of $a$'s and
$b$'s that ends with a $b$ can be generated by this grammar,
and that these are the only strings that can be generated.
That is, the language generated by this grammar is the regular
language specified by the regular expression $(a | b)^{*}b$.

It's time to give some formal definitions of the concepts which
we have been discussing.

> A **context-free grammar** is a 4-tuple $(V,\Sigma,P,S)$,
where:
>
>   1. $V$ is a finite set of symbols. The elements of $V$
are the non-terminal symbols of the grammar.
>
>   2. $\Sigma$ is a finite set of symbols such that $V\cap\Sigma=\emptyset$.
The elements of $\Sigma$ are the terminal symbols of the grammar.
>
>   3. $P$ is a set of production rules. Each rule is of the
form $A\longrightarrow w$ where $A$ is one of the symbols in $V$ and
$w$ is a string in the language $(V\cup\Sigma)^*$.
>
>   4. $S\in V$. $S$ is the start symbol of the grammar.

Even though this is the formal definition, grammars are often
specified informally simply by listing the set of production rules.
When this is done it is assumed, unless otherwise specified,
that the non-terminal symbols are just the symbols that occur
on the left-hand sides of production rules of the grammar.
The terminal symbols are all the other symbols that occur on
the right-hand sides of production rules. The start symbol is the
symbol that occurs on the left-hand side of the first production
rule in the list. Thus, the list of production rules
$$
\begin{aligned}
   &T\longrightarrow TT\\
   &T\longrightarrow A\\
   &A\longrightarrow aAa\\
   &A\longrightarrow bB\\
   &B\longrightarrow bB\\
   &B\longrightarrow \varepsilon 
  \end{aligned}
$$
specifies a grammar $G=(V,\Sigma,P,T)$ where $V$ is $\{T,A,B\}$,
$\Sigma$ is $\{a,b\}$, and $T$ is the start symbol. $P$, of course, is a
set containing the six production rules in the list.

Let $G=(V,\Sigma,P,S)$ be a context-free grammar.
Suppose that $x$ and $y$ are strings in the language $(V\cup\Sigma)^*$.
The notation $x\Longrightarrow_G y$ is used to express the fact
that $y$ can be obtained from $x$ by applying one of the production
rules in $P$. To be more exact, we say that $x\Longrightarrow_G y$
if and only if there is a production rule $A\longrightarrow w$ in the grammar
and two strings $u$ and $v$ in the language $(V\cup\Sigma)^*$
such that $x=uAv$ and $y=uwv$. The fact
that $x=uAv$ is just a way of saying that $A$ occurs somewhere in
$x$. When the production rule $A\longrightarrow w$ is applied to
substitute $w$ for $A$ in $uAv$, the result is $uwv$, which is $y$.
Note that either $u$ or $v$ or both can be the empty string.

If a string $y$ can be obtained from a string $x$ by
applying a sequence of zero or more production rules, we
write $x\Longrightarrow_G^* y$. In most cases, the "$G$" in
the notations $\Longrightarrow_G$ and $\Longrightarrow_G^*$ will be omitted,
assuming that the grammar in question is understood.
Note that $\Longrightarrow$ is a relation on the set $(V\cup\Sigma)^*$.
The relation $\Longrightarrow^*$ is the reflexive, transitive closure of that relation.
(This explains the use of "$*$", which is usually used to
denote the transitive, but not necessarily reflexive, closure of a relation. 
In this case, $\Longrightarrow^*$ is reflexive as well as transitive since
$x\;\Longrightarrow^* x$ is true for any string $x$.)
For example, using the grammar that is defined by the above
list of production rules, we have
$$
\begin{aligned}
 aTB&\Longrightarrow aTTB\\
    &\Longrightarrow aTAB\\
    &\Longrightarrow aTAbB\\
    &\Longrightarrow aTbBbB\\
    &\Longrightarrow aTbbB
  \end{aligned}
$$
From this, it follows that $aTB\;\Longrightarrow^* aTbbB$. The relation $\Longrightarrow$
is read "yields" or "produces" while $\Longrightarrow^*$ can be
read "yields in zero or more steps" or "produces in zero or more
steps." The following theorem states some simple facts about
the relations $\Longrightarrow$ and $\Longrightarrow^*$:

> **Theorem:** Let $G$ be the context-free grammar $(V,\Sigma,P,S)$.
Then:
>
>   1. If $x$ and $y$ are strings in $(V\cup\Sigma)^*$ such that $x\Longrightarrow y$, 
then $x\;\Longrightarrow^* y$.
>   2. If $x$, $y$, and $z$ are strings in $(V\cup\Sigma)^*$ such that $x\;\Longrightarrow^* y$
and $y\;\Longrightarrow^* z$, then $x\;\Longrightarrow^* z$.
>   3. If $x$ and $y$ are strings in $(V\cup\Sigma)^*$ such that $x\Longrightarrow y$, 
and if $s$ and $t$ are any strings in $(V\cup\Sigma)^*$, then $sxt\Longrightarrow syt$.
>   4. If $x$ and $y$ are strings in $(V\cup\Sigma)^*$ such that $x\;\Longrightarrow^* y$, 
and if $s$ and $t$ are any strings in $(V\cup\Sigma)^*$, then $sxt\;\Longrightarrow^* syt$.
>
> **Proof:**
Parts 1 and 2 follow from the fact that $\Longrightarrow^*$ is the transitive
closure of $\Longrightarrow$. Part 4 follows easily from Part 3. (I leave this
as an exercise.) To prove Part 3, suppose that $x$, $y$, $s$, and $t$
are strings such that $x\Longrightarrow y$. By definition, this means that
there exist strings $u$ and $v$ and a production rule $A\longrightarrow w$
such that $x=uAv$ and $y=uwv$. But then we also have
$sxt=suAvt$ and $syt=suwvt$. These two equations, along with
the existence of the production rule $A\longrightarrow w$ show, by definition,
that $sxt\Longrightarrow syt$.

We can use $\Longrightarrow^*$ to give a formal definition
of the language generated by a context-free grammar:

> Suppose that $G=(V,\Sigma,P,S)$ is a context-free grammar.
Then the language generated by $G$ is the language $L(G)$ over
the alphabet $\Sigma$ defined by
> $$
> L(G)=\{w\in \Sigma^*\;|\; S\Longrightarrow_G^* w\}
> $$
> That is, $L(G)$ contains any string of terminal symbols that can be 
obtained by starting with the string consisting of the start symbol, $S$, 
and applying a sequence of production rules. 
>
> A language $L$ is said to be a **context-free language** if
there is a context-free grammar $G$ such that $L(G)$ is $L$.
Note that there might be many different context-free grammars
that generate the same context-free language. Two context-free
grammars that generate the same language are said to be
**equivalent**.

Suppose $G$ is a context-free grammar with start symbol $S$
and suppose $w\in L(G)$. By definition, this means that
there is a sequence of one or more applications of production rules
which produces the string $w$ from $S$. This sequence has the
form $S\Longrightarrow x_1\Longrightarrow x_2\Longrightarrow\cdots\Longrightarrow w$. Such a sequence
is called a **derivation** of $w$ (in the grammar $G$). Note
that $w$ might have more than one derivation. That is, it might
be possible to produce $w$ in several different ways.

Consider the language $L=\{a^nb^n\;|\; n\in\N\}$. We already know
that $L$ is not a regular language.[^1] However, it is a context-free
language. That is, there is a context-free grammar such that
$L$ is the language generated by $G$. This gives us our first
theorem about grammars:

> **Theorem:** Let $L$ be the language $L=\{a^nb^n\;|\; n\in\N\}$. Let $G$ be
the context-free grammar $(V,\Sigma,P,S)$ where $V=\{S\}$,
$\Sigma=\{a,b\}$ and $P$ consists of the productions
> $$
>   \begin{aligned}
>     &S\longrightarrow aSb\\
>     &S\longrightarrow \varepsilon
>   \end{aligned}
> $$
> Then $L=L(G)$, so that $L$ is a context-free language. In particular,
there exist context-free languages which are not regular.
>
> **Proof:**
To show that $L=L(G)$, we must show both that $L\subseteq L(G)$
and that $L(G)\subseteq L$. To show that $L\subseteq L(G)$, let $w$
be an arbitrary element of $L$. By definition of $L$,
$w=a^nb^n$ for some $n\in\N$. We show that $w\in L(G)$ by
induction on $n$. In the case where $n=0$, we have $w=\varepsilon$.
Now, $\varepsilon\in L(G)$ since $\varepsilon$ can be produced
from the start symbol $S$ by an application of the rule $S\longrightarrow\varepsilon$,
so our claim is true for $n=0$.
Now, suppose that $k\in\N$ and that we already know that $a^kb^k\in L(G)$.
We must show that $a^{k+1}b^{k+1}\in L(G)$. Since 
$S\;\Longrightarrow^* a^kb^k$, we also have, by the previous theorem, that
$aSb\;\Longrightarrow^* aa^kb^kb$.
That is, $aSb\;\Longrightarrow^* a^{k+1}b^{k+1}$. Combining this with the
production rule $S\longrightarrow aSb$, we see that $S\;\Longrightarrow^* a^{k+1}b^{k+1}$.
This means that $a^{k+1}b^{k+1}\in L(G)$, as we wanted to show.
This completes the proof that $L\subseteq L(G)$.
>
To show that $L(G)\subseteq L$, suppose that $w\in L(G)$. That is,
$S\;\Longrightarrow^* w$. We must show that $w=a^nb^n$ for some $n$.
Since $S\;\Longrightarrow^* w$, there is a derivation
$S\Longrightarrow x_0\Longrightarrow x_1\Longrightarrow\cdots\Longrightarrow x_n$, where $w=x_n$.
We first prove by induction on $n$ that in any derivation
$S\Longrightarrow x_0\Longrightarrow x_1\Longrightarrow\cdots\Longrightarrow x_n$,
we must have either $x_n=a^nb^n$ or $x_n=a^{n+1}Sb^{n+1}$.
Consider the case $n=0$. Suppose $S\Longrightarrow x_0$.
Then, we must have that $S\longrightarrow x_0$ is a rule in the grammar,
so $x_0$ must be either $\varepsilon$ or $aSb$. Since $\varepsilon=a^0b^0$
and $aSb=a^{0+1}Sb^{0+1}$, $x_0$ is of the required form. 
Next, consider the inductive case. Suppose that $k>1$ and we already 
know that in any
derivation $S\Longrightarrow x_0\Longrightarrow x_1\Longrightarrow\cdots\Longrightarrow x_k$,
we must have $x_k=a^kb^k$ or $x=a^{k+1}Sb^{k+1}$. Suppose that
$S\Longrightarrow x_0\Longrightarrow x_1\Longrightarrow\cdots\Longrightarrow x_k\Longrightarrow x_{k+1}$.
We know by induction that $x_k=a^kb^k$ or $x=a^{k+1}Sb^{k+1}$,
but since $x_k\Longrightarrow x_{k+1}$ and $a^kb^k$ contains no non-terminal
symbols, we must have $x_k=a^{k+1}Sb^{k+1}$. Since $x_{k+1}$
is obtained by applying one of the production rules $S\longrightarrow\varepsilon$
or $S\longrightarrow aSb$ to $x_k$, $x_{k+1}$ is either $a^{k+1}\varepsilon b^{k+1}$
or $a^{k+1}aSbb^{k+1}$. That is, $x_{k+1}$ is either $a^{k+1}b^{k+1}$
or $a^{k+2}Sb^{k+2}$, as we wanted to show. This completes the induction.
Turning back to $w$, we see that $w$ must be of the form $a^nb^n$ or
of the form $a^nSb^n$. But since $w\in L(G)$, it can contain no
non-terminal symbols, so $w$ must be of the form $a^nb^n$, as we wanted to show.
This completes the proof that $L(G)\subseteq L$.

[^1]: TODO

I have given a very formal and detailed proof of this theorem, to show how it
can be done and to show how induction plays a role in many proofs about
grammars. However, a more informal proof of the theorem would probably
be acceptable and might even be more convincing. To show that
$L\subseteq L(G)$, we could just note that the derivation
$S\Longrightarrow aSb\Longrightarrow a^2Sb^2\Longrightarrow\cdots\Longrightarrow a^nSb^n\Longrightarrow a^nb^n$
demonstrates that $a^nb^n\in L$. On the other hand, it is clear that every
derivation for this grammar must be of this form, so every string in $L(G)$
is of the form $a^nb^n$.

For another example, consider the language $\{a^nb^m\;|\; n\ge m\ge0\}$.
Let's try to design a grammar that generates this language.
This is similar to the previous example, but now we want to include strings that
contain more $a$'s than $b$'s. The production rule $S\longrightarrow aSb$
always produces the same number of $a$'s and $b$'s. Can we modify
this idea to produce more $a$'s than $b$'s?

One approach would be to produce a string containing just as many
$a$'s as $b$'s, and then to add some extra $a$'s. A rule that can
generate any number of $a$'s is $A\longrightarrow aA$. After
applying the rule $S\longrightarrow aSb$ for a while, we want to move
to a new state in which we apply the rule $A\longrightarrow aA$. We can
get to the new state by applying a rule $S\longrightarrow A$
that changes the $S$ into an $A$. We still need a way to 
finish the process, which means getting rid of all non-terminal
symbols in the string. For this, we can use the rule $A\longrightarrow\varepsilon$.
Putting these rules together, we get the grammar
$$
  \begin{aligned}
      &S\longrightarrow aSb\\
      &S\longrightarrow A\\
      &A\longrightarrow aA\\
      &A\longrightarrow \varepsilon
    \end{aligned}
$$
This grammar does indeed generate the language $\{a^nb^m\;|\; n\ge m\ge 0\}$.
With slight variations on this grammar, we can produce other related
languages. For example, if we replace the rule $A\longrightarrow \varepsilon$
with $A\longrightarrow a$, we get the language $\{a^nb^m\;|\; n> m\ge 0\}$.

There are other ways to generate the language $\{a^nb^m\;|\; n\ge m\ge 0\}$.
For example, the extra non-terminal symbol, $A$, is not really necessary,
if we allow $S$ to sometimes produce a single $a$ without a $b$. This
leads to the grammar
$$
  \begin{aligned}
      &S\longrightarrow aSb\\
      &S\longrightarrow aS\\
      &S\longrightarrow \varepsilon
    \end{aligned}
$$
(But note that the rule $S\longrightarrow Sa$ would not work in place
of $S\longrightarrow aS$, since it would allow the production of
strings in which an $a$ can follow a $b$, and there are no
such strings in the language $\{a^nb^m\;|\; n\ge m\ge 0\}$.)
And here are two more grammars that generate this language:
$$
  \begin{aligned}
      &S\longrightarrow AB\\
      &A\longrightarrow aA\\
      &B\longrightarrow aBb\\
      &A\longrightarrow \varepsilon\\
      &B\longrightarrow \varepsilon
    \end{aligned}
$$
and
$$
  \begin{aligned}
      &S\longrightarrow ASb\\
      &A\longrightarrow aA\\
      &S\longrightarrow\varepsilon\\
      &A\longrightarrow a
    \end{aligned}
$$

---

Consider another variation on the language $\{a^nb^n\;|\; n\in\N\}$,
in which the $a$'s and $b$'s can occur in any order, but the number
of $a$'s is still equal to the number of $b$'s. This language
can be defined as
$L=\{w\in\{a,b\}^*\;|\; n_a(w) = n_b(w)\}$. This language includes
strings such as $abbaab$, $baab$, and $bbbaaa$.

Let's start with the grammar containing the rules $S\longrightarrow aSb$
and $S\longrightarrow\varepsilon$. We can try adding the rule
$S\longrightarrow bSa$. Every string that can be generated using these
three rules is in the language $L$. However, not every string
in $L$ can be generated. A derivation that starts with $S\Longrightarrow aSb$
can only produce strings that begin with $a$ and end with $b$.
A derivation that starts with $S\Longrightarrow bSa$ can only generate strings
that begin with $b$ and end with $a$. There is no way to generate
the strings $baab$ or $abbbabaaba$, which are in the language $L$.
But we shall see that any string in $L$ that begins and
ends with the same letter can be written in the form $xy$ where
$x$ and $y$ are shorter strings in $L$. To produce strings of
this form, we need one more rule, $S\longrightarrow SS$. The complete set of
production rules for the language $L$ is
$$
  \begin{aligned}
    &S\longrightarrow aSb\\
    &S\longrightarrow bSa\\
    &S\longrightarrow SS\\
    &S\longrightarrow \varepsilon
  \end{aligned}
$$
It's easy to see that every string that can be generated using these
rules is in $L$, since each rule introduces the same number of
$a$'s as $b$'s. But we also need to check that every string
$w$ in $L$ can be generated by these rules. This can be done
by induction on the length of $w$, using the second form
of the principle of mathematical induction. In the base case,
$|w|=0$ and $w=\varepsilon$. In this case, $w\in L$ since
$S\Longrightarrow\varepsilon$ in one step.
Suppose $|w|=k$, where $k>0$, and suppose that
we already know that for any $x\in L$ with $|x|<k$, $S\;\Longrightarrow^* x$.
To finish the induction we must show, based on this induction 
hypothesis, that $S\;\Longrightarrow^* w$.

Suppose that the first and last characters of $w$ are
different. Then $w$ is either of the form $axb$ or of the form $bxa$,
for some string $x$. Let's assume that $w$ is of the form $axb$.
(The case where $w$ is of the form $bxa$ is handled in a similar way.)
Since $w$ has the same number of $a$'s and $b$'s
and since $x$ has one fewer $a$ than $w$ and one fewer $b$ than $w$,
$x$ must also have the same number of $a$'s as $b$'s. That is, $x\in L$.
But $|x|=|w|-2<k$, so by the induction hypothesis, $x\in L(G)$.
So we have $S\;\Longrightarrow^* x$. By the theorem above, we
get then $aSb\;\Longrightarrow^* axb$. Combining this with the fact
that $S\Longrightarrow aSb$, we get that $S\;\Longrightarrow^* axb$, that is,
$S\;\Longrightarrow^* w$. This proves that $w\in L(G)$.

Finally, suppose that the first and last characters of $w$ are
the same. Let's say that $w$ begins and ends with $a$. (The case
where $w$ begins and ends with $b$ is handled in a similar way.)
I claim that $w$ can be written in the form $xy$ where $x\in L(G)$
and $y\in L(G)$ and neither $x$ nor $y$ is the empty string.
This will finish the induction, since we will then have by
the induction hypothesis that $S\;\Longrightarrow^* x$
and $S\;\Longrightarrow^* y$, and we can derive $xy$ from $S$ by first
applying the rule $S\longrightarrow SS$ and then using the first
$S$ on the right-hand side to derive $x$ and the second to derive $y$.

It only remains to figure out how to divide $w$ into two strings
$x$ and $y$ which are both in $L(G)$. The technique that is used
is one that is more generally useful. Suppose that $w=c_1c_2\cdots c_k$,
where each $c_i$ is either $a$ or $b$. Consider the sequence of
integers $r_1$, $r_2$, \dots, $r_k$ where for each $i = 1, 2, \dots, k$,
$r_i$ is the number of $a$'s in $c_1c_2\cdots c_i$ minus the
number of $b$'s in $c_1c_2\cdots c_i$. Since $c_1=a$, $r_1=1$.
Since $w\in L$, $r_k=0$. And since $c_k=a$, we must have $r_{k-1}=
r_k-1 = -1$. Furthermore the difference between $r_{i+1}$
and $r_i$ is either $1$ or $-1$, for $i=1,2,\dots,k-1$.

Since $r_1=1$ and $r_{k-1}=-1$ and the value of $r_i$ goes up or down
by 1 when $i$ increases by 1, $r_i$ must be zero for some $i$
between 1 and $k-1$. That is, $r_i$ cannot get from 1 to $-1$ unless
it passes through zero. Let $i$ be a number between 1 and $k-1$ such
that $r_i=0$. Let $x=c_1c_2\cdots c_i$ and let $y=c_{i+1}c_{i+2}\cdots c_k$.
Note that $xy=w$. The fact that $r_i=0$ means that 
the string $c_1c_2\cdots c_i$ has the same number of $a$'s and
$b$'s, so $x\in L(G)$. It follows automatically that $y\in L(G)$
also. Since $i$ is strictly between 1 and $k-1$, neither $x$ nor
$y$ is the empty string. This is all that we needed to show
to finish the proof that $L=L(G)$.

The basic idea of this proof is that if $w$ contains the same 
number of $a$'s as $b$'s, then an $a$ at the beginning
of $w$ must have a "matching" $b$ somewhere in $w$. This
$b$ matches the $a$ in the sense that the corresponding $r_i$ is
zero, and the $b$ marks the end of a string $x$ which contains
the same number of $a$'s as $b$'s. For example, in the
string $aababbabba$, the $a$ at the beginning of the string
is matched by the third $b$, since $aababb$ is the shortest
prefix of $aababbabba$ that has an equal number of $a$'s
and $b$'s.

Closely related to this idea of matching $a$'s and $b$'s is
the idea of **balanced parentheses**. Consider a string
made up of parentheses, such as `(()(()))(())`.
The parentheses in this sample string are balanced because
each left parenthesis has a matching right parenthesis,
and the matching pairs are properly nested. A careful definition
uses the sort of integer sequence introduced in the above
proof. Let $w$ be a string of parentheses. Write
$w=c_1c_2\cdots c_n$, where each $c_i$ is either `(`
or `)`. Define a sequence of integers $r_1$, $r_2$, \dots, $r_n$,
where $r_i$ is the number of left parentheses in $c_1c_2\cdots c_i$
minus the number of right parentheses. We say that the parentheses
in $w$ are balanced if $r_n=0$ and $r_i\ge0$ for all $i=1,2,\dots,n$.
The fact that $r_n=0$ says that $w$ contains the same number of
left parentheses as right parentheses. The fact the $r_i\ge0$
means that the nesting of pairs of parentheses is correct:
You can't have a right parenthesis unless it is balanced by a left
parenthesis in the preceding part of the string. The language
that consists of all balanced strings of parentheses is context-free. 
It is generated by the grammar
$$
  \begin{aligned}
   &S\longrightarrow (\,S\,)\\
   &S\longrightarrow SS\\
   &S\longrightarrow \varepsilon
  \end{aligned}
$$
The proof is similar to the preceding proof about strings of
$a$'s and $b$'s. (It might seem that I've made an awfully big
fuss about matching and balancing. The reason is that this
is one of the few things that we can do with context-free languages
that we can't do with regular languages.)

---

Before leaving this section, we should look at a few more
general results. Since we know that most operations on regular
languages produce languages that are also regular, we can
ask whether a similar result holds for context-free languages.
We will see later that the intersection of two context-free
languages is not necessarily context-free. Also, the
complement of a context-free language is not necessarily
context-free. However, some other operations on context-free
languages do produce context-free languages.

> **Theorem:**
Suppose that $L$ and $M$ are context-free languages.
Then the languages $L\cup M$, $LM$, and $L^*$ are also
context-free.
>
> **Proof:**
I will prove only the first claim of the theorem, that $L\cup M$ is
context-free. In the exercises for this section, you are
asked to construct grammars for $LM$ and $L^*$ (without giving
formal proofs that your answers are correct).
>
Let $G=(V,\Sigma,P,S)$ and $H=(W,\Gamma,Q,T)$ be context-free grammars
such that $L=L(G)$ and $M=L(H)$. We can assume that $W\cap V=\emptyset$,
since otherwise we could simply rename the non-terminal symbols in $W$.
The idea of the proof is that to generate a string in $L\cup M$,
we first decide whether we want a string in $L$ or a string in $M$.
Once that decision is made, to make a string in $L$, we use production
rules from $G$, while to make a string in $M$, we use rules from $H$.
We have to design a grammar, $K$, to represent this process.
>
Let $R$ be a symbol that is not in any of the alphabets $V$, $W$, $\Sigma$,
or $\Gamma$. $R$ will be the start symbol of $K$. The production rules
for $K$ consist of all the production rules from $G$ and $H$ together
with two new rules:
> $$
>   \begin{aligned}
>   &R\longrightarrow S\\
>   &R\longrightarrow T
>   \end{aligned}
> $$
> Formally, $K$ is defined to be the grammar
> $$
>  (V\cup W\cup\{R\},
>       P\cup Q\cup \{R\longrightarrow S, R\longrightarrow T\},
>       \Sigma\cup\Gamma, R)
> $$
>Suppose that $w\in L$. That is $w\in L(G)$, so there is
a derivation $S\Longrightarrow_G^*w$.
Since every rule from $G$ is also a rule in $K$, if follows that
$S\Longrightarrow_K^* w$. Combining this with the fact that $R\Longrightarrow_K S$, we have
that $R\Longrightarrow_K^* w$, and $w\in L(K)$. This shows that $L\subseteq L(K)$.
In an exactly similar way, we can show that $M\subseteq L(K)$.
Thus, $L\cup M\subseteq L(K)$.
>
It remains to show that $L(K)\subseteq L\cup M$. Suppose $w\in L(K)$.
Then there is a derivation $R\Longrightarrow_K^*w$. This derivation must
begin with an application of
one of the rules $R\longrightarrow S$ or $R\longrightarrow T$, since these are the
only rules in which $R$ appears. If the first rule applied in the
derivation is $R\longrightarrow S$, then the remainder of the derivation
shows that $S\Longrightarrow_K^*w$. Starting from $S$, the only rules
that can be applied are rules from $G$, so in fact we have
$S\Longrightarrow_G^*w$. This shows that $w\in L$. Similarly, if
the first rule applied in the derivation $R\Longrightarrow_K^*w$ is 
$R\longrightarrow T$, then $w\in M$. In any case, $w\in L\cup M$.
This proves that $L(K)\subseteq L\cup M$.

Finally, we should clarify the relationship between context-free
languages and regular languages. We have already seen that
there are context-free languages which are not regular.
On the other hand, it turns out that every regular language
is context-free. That is, given any regular language, there
is a context-free grammar that generates that language. This
means that any syntax that can be expressed by a regular expression,
by a DFA, or by an NFA could also be expressed by a context-free
grammar. In fact, we only need a certain restricted type of
context-free grammar to duplicate the power of regular expressions.

> A **right-regular grammar** is a context-free 
grammar in which the right-hand side of every production
rule has one of the following forms: the empty string;
a string consisting of a single non-terminal symbol; or
a string consisting of a single terminal symbol followed
by a single non-terminal symbol.

Examples of the types of production rule that are allowed in
a right-regular grammar are $A\longrightarrow\varepsilon$,
$B\longrightarrow C$, and $D\longrightarrow aE$. The idea of the
proof is that given a right-regular grammar, we can build
a corresponding $NFA$ and _vice-versa_. The
states of the $NFA$ correspond to the non-terminal symbols
of the grammar. The start symbol of the grammar corresponds
to the starting state of the NFA.
A production rule of the form $A\longrightarrow bC$
corresponds to a transition in the NFA from state $A$ to state
$C$ while reading the symbol $b$. A production rule of
the form $A\longrightarrow B$ corresponds to an $\varepsilon$-transition
from state $A$ to state $B$ in the NFA. And a production
rule of the form $A\longrightarrow\varepsilon$ exists in the grammar
if and only if $A$ is a final state in the NFA. With this
correspondence, a derivation of a string $w$ in the grammar
corresponds to an execution path through the NFA as it 
accepts the string $w$. I won't give a complete proof
here. You are welcome to work through the details if you want.
But the important fact is:

> **Theorem:**
A language $L$ is regular if and only if there is a right-regular
grammar $G$ such that $L=L(G)$. In particular, every regular
language is context-free.

## Exercises

1. Show that Part 4 of the theorem about $\Longrightarrow^*$ follows from Part 3.
<details>
  <summary>Answer</summary>

If $x\Longrightarrow^* y$, then there is a sequence of strings $z_0, z_1,\ldots z_n$, for some $n\geq 0$,
such that $x=z_0$, $y=z_n$, and $z_i\Longrightarrow z_{i+1}$ for each $i<n$. By Part 3 of the theorem,
we also know that $sz_it\Longrightarrow sz_{i+1}t$ for each $i<n$, so we may conclude $sxy\Longrightarrow^* syt$.
</details>

2. Give a careful proof that the language $\{a^nb^m\;|\; n\ge m\ge 0\}$
is generated by the context-free grammar
$$
    \begin{aligned}
      &S\longrightarrow aSb\\
      &S\longrightarrow A\\
      &A\longrightarrow aA\\
      &A\longrightarrow \varepsilon
    \end{aligned}
$$

1. Identify the language generated by each of the following
context-free grammars.
   * $$
      \begin{aligned}
      &S\longrightarrow aaSb\\
      &S\longrightarrow \varepsilon
      \end{aligned}
     $$
     <details>
       <summary>Answer</summary>

       $\{a^mb^n\;|\; m=2n\}$
     </details>
   * $$
      \begin{aligned}
      &S\longrightarrow aSb\\
      &S\longrightarrow aaSb\\
      &S\longrightarrow \varepsilon
      \end{aligned}
     $$
     <details>
       <summary>Answer</summary>

       $\{a^mb^n\;|\; n\le m\le 2n\}$
     </details>
   * $$
      \begin{aligned}
      &S\longrightarrow TS\\
      &S\longrightarrow \varepsilon\\
      &T\longrightarrow aTb\\
      &T\longrightarrow \varepsilon
      \end{aligned}
     $$
     <details>
       <summary>Answer</summary>

       $\{a^{n_1}b^{n_1}a^{n_2}b^{n_2}\cdots a^{n_k}b^{n_k}\;|\; k\ge 0\land\forall i(n_i\ge 0)\}$
     </details>
   * $$
      \begin{aligned}
      &S\longrightarrow ABA\\
      &A\longrightarrow aA\\
      &A\longrightarrow a\\
      &B\longrightarrow bB\\
      &B\longrightarrow cB\\
      &B\longrightarrow\varepsilon
      \end{aligned}
     $$
     <details>
       <summary>Answer</summary>

       $aa^*(b\;|\;c)^*aa^*$
     </details>

1. For each of the following languages
find a context-free grammar that generates the language:
   * $\{a^nb^m\;|\; n\ge m > 0\}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aSb\\
   &S\longrightarrow aS\\
   &S\longrightarrow ab
   \end{aligned}
   $$
   </details>
   * $\{a^nb^m\;|\; n, m\in\N \}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aS\\
   &S\longrightarrow Sb\\
   &S\longrightarrow\varepsilon
   \end{aligned}
   $$
   </details>
   * $\{a^nb^m\;|\; n\ge0\land m=n+1\}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aSb\\
   &S\longrightarrow b
   \end{aligned}
   $$
   </details>
   * $\{a^nb^mc^n\;|\; n,m\in\N \}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aSc\\
   &S\longrightarrow T\\
   &T\longrightarrow bT\\
   &T\longrightarrow\varepsilon
   \end{aligned}
   $$
   </details>
   * $\{ a^nb^mc^k \;|\; n=m+k \}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aSc\\
   &S\longrightarrow T\\
   &T\longrightarrow aTb\\
   &T\longrightarrow\varepsilon
   \end{aligned}
   $$
   </details>
   * $\{a^nb^m\;|\; n\not=m\}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aSb\\
   &S\longrightarrow aT\\
   &S\longrightarrow bU\\
   &T\longrightarrow aT\\
   &T\longrightarrow\varepsilon\\
   &U\longrightarrow bU\\
   &U\longrightarrow\varepsilon
   \end{aligned}
   $$
   </details>
   * $\{ a^nb^mc^rd^t\;|\; n+m=r+t \}$
   <details>
     <summary>Answer</summary>
   
   $$
   \begin{aligned}
   &S\longrightarrow aSd\\
   &S\longrightarrow T\\
   &S\longrightarrow U\\
   &T\longrightarrow aTc\\
   &T\longrightarrow V\\
   &U\longrightarrow bUd\\
   &U\longrightarrow V\\
   &V\longrightarrow bVc\\
   &V\longrightarrow\varepsilon
   \end{aligned}
   $$
   </details>
   * $\{ a^nb^mc^k \;|\; n\not=m+k \}$
   <details>
     <summary>Answer</summary>
   
   We must either have $n>m+k$ or $n<m+k$. In the first case, we match the $a$'s with $b$'s and $c$'s by expanding $S$ and $T$,
   and then generate at least one unmatched $a$ by expanding $T$ to $aU$. In the second case, if $n<k$ then when we stop generating
   $a$'s we will force at least one unmatched $c$ by expanding $S$ to $Vc$, and then $V$ can produce additional $c$'s preceded by an
   arbitrary number of $b$'s. Alternately, if $k\le n<m+k$, we will match all of the $a$'s with $c$'s, and some $a$'s with $b$'s, by
   expanding S and T, and then switch to generating at least one unmatched $b$ by expanding $T$ to $bW$.
   $$
   \begin{aligned}
   &S\longrightarrow aSc\\
   &S\longrightarrow T\\
   &S\longrightarrow Vc\\
   &T\longrightarrow aTb\\
   &T\longrightarrow aU\\
   &T\longrightarrow bW\\
   &U\longrightarrow aU\\
   &U\longrightarrow\varepsilon\\
   &V\longrightarrow Vc\\
   &V\longrightarrow W\\
   &W\longrightarrow bW\\
   &W\longrightarrow\varepsilon\\
   \end{aligned}
   $$
   </details>

1. Find a context-free grammar that generates the language
$\{w\in\{a,b\}^*\;|\; n_a(w) > n_b(w)\}$.

1. Find a context-free grammar that generates the language
$\{w\in\{a,b,c\}^*\;|\; n_a(w) = n_b(w)\}$.

1. A **palindrome** is a string that reads the same
backwards and forwards, such as "mom", "radar", or
"aabccbccbaa". That is, $w$ is a palindrome if $w=w^R$.
Let $L=\{w\in\{a,b,c\}^*\;|\; w\textrm{ is a palindrome}\}$.
Show that $L$ is a context-free language by finding a context-free
grammar that generates $L$.
<details>
  <summary>Answer</summary>

$$
\begin{aligned}
&S\longrightarrow aSa\\
&S\longrightarrow bSb\\
&S\longrightarrow cSc\\
&S\longrightarrow a\\
&S\longrightarrow b\\
&S\longrightarrow c\\
&S\longrightarrow\varepsilon
\end{aligned}
$$
</details>

1. Let $\Sigma=\{\,\texttt{(},\,\texttt{)},\,\texttt{[},\,\texttt{]}\,\}$. That is, $\Sigma$
is the alphabet consisting of the four symbols $\texttt{(}$, $\texttt{)}$, $\texttt{[}$, and $\texttt{]}$.
Let $L$ be the language over $\Sigma$ consisting of strings
in which both parentheses and brackets are balanced.
For example, the string $\texttt{([][()()])([])}$ is in $L$
but $\texttt{[(])}$ is not. Find a context-free grammar that generates the
language $L$.
<details>
  <summary>Answer</summary>

$$
\begin{aligned}
&S\longrightarrow \texttt{(}S\texttt{)}S\\
&S\longrightarrow \texttt{[}S\texttt{]}S\\
&S\longrightarrow\varepsilon
\end{aligned}
$$
</details>

1. Suppose that $G$ and $H$ are context-free grammars.
Let $L=L(G)$ and let $M=L(H)$. Explain how to construct
a context-free grammar for the language $LM$. You do not
need to give a formal proof that your grammar is correct.
<details>
  <summary>Answer</summary>

If the start symbols for $G$ and $H$ are $S$ and $T$, respectively,
then the desired grammar will contain all of the rules for $G$ and $H$
combined (with non-terminals renamed to avoid duplicates), plus a new
start symbol $R$ whose only rule is $R\longrightarrow ST$.
</details>

1. Suppose that $G$ is a context-free grammar.
Let $L=L(G)$. Explain how to construct
a context-free grammar for the language $L^*$. You do not
need to give a formal proof that your grammar is correct.
<details>
  <summary>Answer</summary>

If the start symbol for $G$ is $S$, then the desired grammar will have
all of the rules of $G$ plus a new start symbol (call it $R$) with the
rules $R\longrightarrow SR$ and $R\longrightarrow\varepsilon$.
</details>

1. Suppose that $L$ is a context-free language.
Prove that $L^R$ is a context-free language. (Hint:
Given a context-free grammar $G$ for $L$, make a new grammar, $G^R$,
by reversing the right-hand side of each of the production
rules in $G$. That is, $A\longrightarrow w$ is a production rule in
$G$ if and only if $A\longrightarrow w^R$ is a production rule in $G^R$.)

1. Define a **left-regular grammar**
to be a context-free grammar in which the right-hand side of
every production rule is of one of the following forms:
the empty string; a single non-terminal symbol; or a non-terminal
symbol followed by a terminal symbol. Show that a language is
regular if and only if it can be generated by a left-regular
grammar. (Hint: Use the preceding exercise and the theorem
about right-regular grammars.)
