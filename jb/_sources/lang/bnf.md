# Backus-Naur Form

(Content adapted from Critchlow &amp; Eck)

Context-free grammars are used to describe some aspects of
the syntax of programming languages. However, a notation
that is often used for grammars in the context of programming languages
is somewhat different from the notation introduced in the
preceding section. The notation that is used is called
**Backus-Naur Form** or BNF. It is named after computer
scientists John Backus and Peter Naur, who developed the
notation. Actually, several variations of BNF exist.
I will discuss one of them here. BNF can be used to describe
the syntax of natural languages, as well as programming languages,
and some of the examples in this section will deal with the
syntax of English.

Like context-free grammars, BNF grammars make use of production rules, non-terminals,
and terminals. The non-terminals are usually given meaningful,
multi-character names. Here, I will follow a common practice
of enclosing non-terminals in angle brackets, so that they can
be easily distinguished. For example, $\langle\textit{noun}\rangle$ and $\langle\textit{sentence}\rangle$
could be non-terminals in a BNF grammar for English, while
$\langle\textit{program}\rangle$ and $\langle\textit{if-statement}\rangle$ might be used in a BNF grammar
for a programming language. Note that a BNF non-terminal
usually represents a meaningful **syntactic category**,
that is, a certain type of building block in the syntax of
the language that is being described, such as an adverb,
a prepositional phrase, or a variable declaration statement.
The terminals of a BNF grammar are the things that actually
appear in the language that is being described. In the case
of natural language, the terminals are individual words.

In BNF production rules, I will use the symbol "::="
in place of the "$\longrightarrow$" that is used in context-free grammars.
BNF production rules are more powerful than the production rules in
context-free grammars. That is, one BNF rule might be equivalent to 
several context-free grammar rules. As for context-free grammars,
the left-hand side of a BNF production rule is a single 
non-terminal symbol. The right hand side can include terminals
and non-terminals, and can also use the following notations,
which should remind you of notations used in regular expressions:

   * A vertical bar, $|$, indicates a choice of
 alternatives. For example,
$$
\langle\textit{digit}\rangle\ ::=\ 0 \;|\; 1 \;|\; 2
   \;|\; 3 \;|\; 4 \;|\; 5 \;|\; 6 \;|\; 7
   \;|\; 8 \;|\; 9
$$
indicates that the non-terminal $\langle\textit{digit}\rangle$ can be replaced
by any one of the terminal symbols 0, 1, \dots, 9.

   * Items enclosed in brackets are optional. For example,
$$
\langle\textit{declaration}\rangle\ ::=\ \langle\textit{type}\rangle\ \langle\textit{variable}\rangle
\ [\ =\ \langle\textit{expression}\rangle\ ]\ ;
$$
says that $\langle\textit{declaration}\rangle$ can be replaced either
by "$\langle\textit{type}\rangle\ \langle\textit{variable}\rangle\ ;$" or by "$\langle\textit{type}\rangle\ \langle\textit{variable}\rangle\ =\ \langle\textit{expression}\rangle\ ;$".
(The symbols "=" and ";" are terminal symbols in this rule.)

   * Items enclosed between "$[$" and "$]\ldots$"
can be repeated zero or more times. (This has the same effect
as a "$*$"in a regular expression.) For example,
$$
\langle\textit{integer}\rangle\ ::=\ \langle\textit{digit}\rangle\ [\ \langle\textit{digit}\rangle\ ]\ldots
$$
says that an $\langle\textit{integer}\rangle$ consists of a $\langle\textit{digit}\rangle$ followed
optionally by any number of additional $\langle\textit{digit}\rangle$'s. That is,
the non-terminal $\langle\textit{integer}\rangle$ can be replaced by $\langle\textit{digit}\rangle$ or
by $\langle\textit{digit}\rangle\ \langle\textit{digit}\rangle$ or by $\langle\textit{digit}\rangle\ \langle\textit{digit}\rangle\ \langle\textit{digit}\rangle$, and so on.

   * Parentheses can be used as usual, for grouping. 

All these notations can be expressed in a context-free grammar
by introducing additional production rules. For example, the
BNF rule "$\langle\textit{sign}\rangle\ ::=\ +\;|\;-$" is equivalent
to the two rules, "$\langle\textit{sign}\rangle\ ::=\ +$"
and "$\langle\textit{sign}\rangle\ ::=\ -$". A rule that contains an
optional item can also be replaced by two rules. For example,
$$
\langle\textit{declaration}\rangle\ ::=\ \langle\textit{type}\rangle\ \langle\textit{variable}\rangle
\ [\ =\ \langle\textit{expression}\rangle\ ]\ ;
$$
can be replaced by the two rules
$$
\begin{aligned}
   &\langle\textit{declaration}\rangle\ ::=\ \langle\textit{type}\rangle\ \langle\textit{variable}\rangle\ ;\\
   &\langle\textit{declaration}\rangle\ ::=\ \langle\textit{type}\rangle\ \langle\textit{variable}\rangle
     \ =\ \langle\textit{expression}\rangle\ ;
\end{aligned}
$$
In context-free grammars, repetition can be expressed by
using a recursive rule such as "$S\longrightarrow aS$", in which the
same non-terminal symbol appears both on the left-hand side and on the right-hand
side of the rule. BNF-style notation using "$[$" and "$]\ldots$" can
be eliminated by replacing it with a new non-terminal symbol and adding
a recursive rule to allow that symbol to repeat zero or more times.
For example, the production rule
$$
\langle\textit{integer}\rangle\ ::=\ \langle\textit{digit}\rangle\ [\ \langle\textit{digit}\rangle\ ]\ldots
$$
can be replaced by three rules using a new non-terminal symbol
$\langle\textit{digit-list}\rangle$ to represent a string of zero or more $\langle\textit{digit}\rangle$'s:
$$
\begin{aligned}
&\langle\textit{integer}\rangle\ ::=\ \langle\textit{digit}\rangle\ \langle\textit{digit-list}\rangle\\
&\langle\textit{digit-list}\rangle\ ::=\ \langle\textit{digit}\rangle\ \langle\textit{digit-list}\rangle\\
&\langle\textit{digit-list}\rangle\ ::=\ \varepsilon
\end{aligned}
$$

As an example of a complete BNF grammar, let's look at a BNF grammar for a very small
subset of English. The start symbol for the grammar
is $\langle\textit{sentence}\rangle$, and the terminal symbols are English words.
All the sentences that can be produced from this grammar
are syntactically correct English sentences, although you wouldn't
encounter many of them in conversation. Here is the grammar:
$$
\begin{aligned}
&\langle\textit{sentence}\rangle\ ::=\ \langle\textit{simple-sentence}\rangle\ [\ \textrm{and}\ \langle\textit{simple-sentence}\rangle\ ]\ldots\\
&\langle\textit{simple-sentence}\rangle\ ::=\ \langle\textit{noun-part}\rangle\ \langle\textit{verb-part}\rangle\\
&\langle\textit{noun-part}\rangle\ ::=\ \langle\textit{article}\rangle\ \langle\textit{noun}\rangle\ [\ \textrm{who}\ \langle\textit{verb-part}\rangle\ ]\ldots\\
&\langle\textit{verb-part}\rangle\ ::=\ \langle\textit{intransitive-verb}\rangle \;|\; (\ \langle\textit{transitive-verb}\rangle\ \langle\textit{noun-part}\rangle\ )\\
&\langle\textit{article}\rangle\ ::=\ \textrm{the} \;|\; \textrm{a}\\
&\langle\textit{noun}\rangle\ ::=\ \textrm{man} \;|\; \textrm{woman} \;|\; \textrm{dog} \;|\; \textrm{cat} \;|\; \textrm{computer}\\
&\langle\textit{intransitive-verb}\rangle\ ::=\ \textrm{runs} \;|\; \textrm{jumps} \;|\; \textrm{hides}\\
&\langle\textit{transitive-verb}\rangle\ ::=\ \textrm{knows} \;|\; \textrm{loves} \;|\; \textrm{chases} \;|\; \textrm{owns}
\end{aligned}
$$
This grammar can generate sentences such as "A dog chases the cat and
the cat hides" and "The man loves a woman who runs."
The second sentence, for example, is generated by the derivation
$$
\begin{aligned}
 \langle\textit{sentence}\rangle\ &\Longrightarrow\ \langle\textit{simple-sentence}\rangle\\
  &\Longrightarrow\ \langle\textit{noun-part}\rangle\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \langle\textit{article}\rangle\ \langle\textit{noun}\rangle\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \langle\textit{noun}\rangle\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \langle\textit{transitive-verb}\rangle\ \langle\textit{noun-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \textrm{loves}\ \langle\textit{noun-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \textrm{loves}\ \langle\textit{article}\rangle
    \ \langle\textit{noun}\rangle\ \textrm{who}\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \textrm{loves}\ \textrm{a}
    \ \langle\textit{noun}\rangle\ \textrm{who}\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \textrm{loves}\ \textrm{a}
    \ \textrm{woman}\ \textrm{who}\ \langle\textit{verb-part}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \textrm{loves}\ \textrm{a}
    \ \textrm{woman}\ \textrm{who}\ \langle\textit{intransitive-verb}\rangle\\
  &\Longrightarrow\ \textrm{the}\ \textrm{man}\ \textrm{loves}\ \textrm{a}
    \ \textrm{woman}\ \textrm{who}\ \textrm{runs}
\end{aligned}
$$

BNF is most often used to specify the syntax of programming languages.
Most programming languages are not, in fact, context-free languages, and
BNF is not capable of expressing all aspects of their syntax.
For example, BNF cannot express the fact that a variable must
be declared before it is used or the fact that the number of
actual parameters in a subroutine call statement must match the number
of formal parameters in the declaration of the subroutine.
So BNF is used to express the context-free aspects of the syntax
of a programming language, and other restrictions on the syntax&mdash;such
as the rule about declaring a variable before it is used&mdash;are expressed
using informal English descriptions.

When BNF is applied to programming languages, the terminal symbols
are generally "tokens," which are the minimal meaningful units in
a program. For example, the pair of symbols `<=` constitute a
single token, as does a string such as `"Hello World"`.
Every number is represented by a single token. (The actual value
of the number is stored as a so-called "attribute" of the token,
but the value plays no role in the context-free syntax of the
language.) I will use the
symbol $\textbf{number}$ to represent a numerical token.
Similarly, every variable name, subroutine name, or other identifier
in the program is represented by the same token, which I will denote
as $\textbf{ident}$. One final complication: Some symbols
used in programs, such as "]" and "(", are also used with
a special meaning in BNF grammars. When such a symbol occurs as
a terminal symbol, I will enclose it in double quotes. For
example, in the BNF production rule
$$
\langle\textit{array-reference}\rangle\ ::=\ \textbf{ident}\ ``["\ \langle\textit{expression}\rangle\ ``]"
$$
the "[" and "]" are terminal symbols in the language
that is being described, rather than the BNF notation for an
optional item. With this notation, here is part of a BNF
grammar that describes statements in the Java programming
language:
$$
\begin{aligned}
&\langle\textit{statement}\rangle\ ::=\ \langle\textit{block-statement}\rangle \;|\; \langle\textit{if-statement}\rangle
         \;|\; \langle\textit{while-statement}\rangle\\
&\hspace{1.5 in} \;|\; \langle\textit{assignment-statement}\rangle \;|\; \langle\textit{null-statement}\rangle\\
&\langle\textit{block-statement}\rangle\ ::=\ \{\ [\ \langle\textit{statement}\rangle\ ]\dots\ \}\\
&\langle\textit{if-statement}\rangle\ ::=\ \textrm{if}\ ``("\ \langle\textit{condition}\rangle\ ``)"\ \langle\textit{statement}\rangle\ [\ \textrm{else}\ \langle\textit{statement}\rangle\ ]\\
&\langle\textit{while-statement}\rangle\ ::=\ \textrm{while}\ ``("\ \langle\textit{condition}\rangle\ ``)"\ \langle\textit{statement}\rangle\\
&\langle\textit{assignment-statement}\rangle\ ::=\ \langle\textit{variable}\rangle\ =\ \langle\textit{expression}\rangle\ ;\\
&\langle\textit{null-statement}\rangle\ ::=\ \varepsilon
\end{aligned}
$$
The non-terminals $\langle\textit{condition}\rangle$, $\langle\textit{variable}\rangle$, and 
$\langle\textit{expression}\rangle$ would, of course, have to be defined by other
production rules in the grammar. Here is a set of rules that
define simple expressions, made up of numbers, identifiers,
parentheses and the arithmetic operators $+$, $-$, $*$ and $/$:
$$
\begin{aligned}
&\langle\textit{expression}\rangle\ ::=\ \langle\textit{term}\rangle\ [\ [\ + \;|\; -\ ]\ \langle\textit{term}\rangle\ ]\ldots\\
&\langle\textit{term}\rangle\ ::=\ \langle\textit{factor}\rangle\ [\ [\ * \;|\; /\ ]\ \langle\textit{factor}\rangle\ ]\ldots\\
&\langle\textit{factor}\rangle\ ::=\ \textbf{ident} \;|\; \textbf{number} \;|\; ``("\ \langle\textit{expression}\rangle\ ``)"
\end{aligned}
$$
The first rule says that an $\langle\textit{expression}\rangle$ is a sequence of
one or more $\langle\textit{term}\rangle$'s, separated by plus or minus signs.
The second rule defines a $\langle\textit{term}\rangle$ to be a sequence of one or more
$\langle\textit{factor}\rangle$'s, separated by multiplication or division operators.
The last rule says that a $\langle\textit{factor}\rangle$ can be either an identifier
or a number or an $\langle\textit{expression}\rangle$ enclosed in parentheses.
This small BNF grammar can generate expressions 
such as "$3*5$" and "$x*(x+1) - 3/(z+2*(3-x)) + 7$".
The latter expression is made up of three terms: $x*(x+1)$,
$3/(z+2*(3-x))$, and $7$. The first of these terms is made
up of two factors, $x$ and $(x+1)$. The factor $(x+1)$ consists
of the expression $x+1$ inside a pair of parentheses.

The nice thing about this grammar is that the precedence rules
for the operators are implicit in the grammar. For example, according
to the grammar, the expression $3+5*7$ is seen as $\langle\textit{term}\rangle\ +\ \langle\textit{term}\rangle$
where the first term is $3$ and the second term is $5*7$.
The $5*7$ occurs as a group, which must be evaluated before the
result is added to $3$. Parentheses can change the order of
evaluation. For example, $(3+5)*7$ is generated by the grammar
as a single $\langle\textit{term}\rangle$ of the form $\langle\textit{factor}\rangle\ *\ \langle\textit{factor}\rangle$.
The first $\langle\textit{factor}\rangle$ is $(3+5)$. When $(3+5)*7$ is evaluated,
the value of $(3+5)$ is computed first and then multiplied
by $7$. This is an example of how a grammar that describes
the syntax of a language can also reflect its meaning.

Although this section has not introduced any really new ideas
or theoretical results, I hope it has demonstrated how 
context-free grammars can be applied in practice. 

## Exercises

1. One of the examples in this section was a grammar for
a subset of English. Give five more examples of sentences that
can be generated from that grammar. Your examples should, collectively,
use all the rules of the grammar.

2. Rewrite the example BNF grammar for a subset of English as
a context-free grammar.

3. Write a single BNF production rule that is equivalent to
the following context-free grammar:
$$
\begin{aligned}
 S &\longrightarrow aSa\\
 S &\longrightarrow bB\\
 B &\longrightarrow bB\\
 B &\longrightarrow \varepsilon
\end{aligned}
$$

4. Write a BNF production rule that specifies the syntax of
real numbers, as they appear in programming languages such as Java and C. 
Real numbers can include a sign, a decimal point and an exponential part.
Some examples are: `17.3`, `.73`, `23.1e67`, `-1.34E-12`, `+0.2`, and `100E+100`.

5. Variable references in the Java programming language can be 
rather complicated. Some examples include:
`x`, `list.next`, `A[7]`, `a.b.c`, `S[i+1].grid[r][c].red`, &hellip;.
Write a BNF production rule for Java variables.
You can use the token $\textbf{ident}$ and the non-terminal
$\langle\textit{expression}\rangle$ in your rule.

6. Use BNF to express the syntax of the `try ... catch` statement in the
Java programming language.

7. Give a BNF grammar for compound propositions made up
of propositional variables, parentheses, and the logical operators
$\land$, $\lor$, and $\lnot$. Use the non-terminal symbol $\langle\textit{pv}\rangle$ to represent
a propositional variable. You do not have to give a definition of
$\langle\textit{pv}\rangle$.
