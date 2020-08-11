# Languages

(Content adapted from Critchlow &amp; Eck)

With the set of mathematical tools from the first two chapters, we
are now ready to study **languages** and **formal language theory**.
Our intent is to examine the question of how, and which, languages
can be mechanically generated and recognized; and, ultimately, to see
what this tells us about what computers can and can't do.

In formal language theory, an **alphabet** is a finite, non-empty 
set. The elements of the set are called **symbols**. A finite 
sequence of symbols $a_1a_2\ldots a_n$
from an alphabet is called a **string** over that alphabet. 

---
**Example:** $\Sigma = \{0,1\}$ is an alphabet, and `011`, 
`1010`, and `1` are all strings over $\Sigma$.

---

Note that strings really are _sequences_ of symbols, which 
implies that 
order matters. Thus `011`, `101`, and `110` are all 
different strings, though they are made up of the same symbols.
The strings $x=a_1a_2\ldots a_m$ and $y=b_1b_2\ldots b_n$ are **equal** only
if $m=n$ (_i.e._, the strings contain the same number of symbols) and 
$a_i=b_i$ for all
$1 \leq i \leq n$.

## String Operations

Just as there are operations defined on numbers, truth values, sets,
and other mathematical entities, there are operations defined on
strings. Some important operations are:

   * _length_: the **length** of a string $x$ is the number of symbols
in it. The notation for the length of $x$ is $|x|$. Note that
this is consistent with other uses of $|\ |$, all of which 
involve some notion of size: $|number|$ measures how big a number
is (in terms of its distance from 0); $|set|$ measures the size
of a set (in terms of the number of elements).

   We will occasionally refer to a _length-n string_. This is a
slightly awkward, but concise, shorthand for "a string whose length
is $n$".

   * _concatenation_: the **concatenation** of two strings $x=a_1
a_2\ldots a_m$ and $y=b_1b_2\ldots b_n$ is the sequence of symbols
$a_1\ldots a_mb_1\ldots b_n$. Sometimes $\cdot$ is used to denote
concatenation, but it is far more usual to see the concatenation of 
$x$ and $y$ denoted by $xy$ than by $x\cdot y$. You can easily
convince yourself that concatenation is associative (_i.e._, $(xy)z =
x(yz)$ for all strings $x,y$ and $z$). Concatenation is not
commutative (_i.e._, it is not always true that $xy = yx$:
for example, if $x=a$ and $y=b$ then $xy=ab$ while $yx=ba$ and, as
discussed above, these strings are not equal).

   * _reversal_: the **reverse** of a string $x=a_1a_2\ldots a_n$ is
the string $x^R = a_na_{n-1}\ldots a_2a_1$.

---
**Example:** Let $\Sigma = \{a,b\}$, $x=a$, $y=abaa$, and $z=bab$.
Then $|x| = 1$, $|y| = 4$, and $|z|=3$. Also, $xx = aa$, $xy =
aabaa$, $xz = abab$, and $zx = baba$. Finally, $x^R = a$,
$y^R = aaba$, and $z^R=bab$.

---

By the way, the previous example illustrates a naming convention standard
throughout language theory texts: if a letter is
intended to represent a single symbol in an alphabet, the convention
is to use a letter from the beginning of the English alphabet ($a$,
$b$, $c$, $d$); if a letter is intended to represent a string, the 
convention is to use a letter from the end of the English alphabet
($u$, $v$, _etc_.).

## Empty String

In set theory, we have a special symbol to designate the set that 
contains no elements. Similarly, language theory has a special 
symbol $\varepsilon$ which is used to represent the **empty string**, the
string with no 
symbols in it. (Some texts use the symbol $\lambda$ instead.)
It is worth noting that $|\varepsilon| = 0$, that $\varepsilon^R = \varepsilon$,
and that $\varepsilon \cdot x = x \cdot \varepsilon = x$ for all strings $x$.
(This last fact may appear a bit confusing. Remember that $\varepsilon$
is not a symbol in a string with length 1, but rather the name given
to the string made up of 0 symbols. Pasting those 0 symbols onto the
front or back of a string $x$ still produces $x$.) 

The set of all strings over an alphabet $\Sigma$ is denoted $\Sigma^*$.
(In language theory, the symbol $^*$ is typically used to denote "zero
or more", so $\Sigma^*$ is the set of strings made up of zero or 
more symbols from $\Sigma$.) Note that while an alphabet 
$\Sigma$ is by 
definition a _finite_ set of symbols, and strings are by
definition _finite_ sequences of those symbols, the set $\Sigma^*$
is _always infinite_ (as long as $\Sigma$ is not empty). Why is this? Suppose $\Sigma$ contains $n$
elements. Then there is one string over $\Sigma$ with 0 symbols,
$n$ strings with 1 symbol, $n^2$ strings with 2 symbols (since there
are $n$ choices for the first symbol and $n$ choices for the second),
$n^3$ strings with 3 symbols, _etc_.

---
**Example:** If $\Sigma = \{1\}$, then $\Sigma^* = \{\varepsilon,
1, 11, 111, \ldots\}$. If $\Sigma = \{a,b\}$, then $\Sigma^* = \{
\varepsilon, a, b, aa, ab, ba, bb, aaa, aab, \ldots\}$.

---

We now come to the definition of a **language** in the formal language
theoretical sense.

> A language over an alphabet $\Sigma$ is a subset
of $\Sigma^*$. Thus, a language over $\Sigma$ is an element of
${\mathscr P}(\Sigma^*)$, the power set of $\Sigma^*$.

In other words, any set of strings (over alphabet $\Sigma$) constitutes a
language (over alphabet $\Sigma$).

---
**Example:** Let $\Sigma = \{0,1\}$. Then the following are all
languages over $\Sigma$:

   * $L_1 = \{011, 1010, 111\}$

   * $L_2 = \{0, 10, 110, 1110, 11110, \ldots\}$

   * $L_3 = \{x \in \Sigma^* \ | \ n_0(x) = n_1(x) \}$, where the notation 
$n_0(x)$ stands for the number of 0's in the string $x$, and similarly for $n_1(x)$.

   * $L_4 = \{x \ | x\textrm{ represents a multiple of 5 in binary}\}$

---

Note that languages can be either finite or infinite.
Because $\Sigma^*$ is infinite, it clearly has an
infinite number of subsets, and so there are an infinite number of languages
over $\Sigma$.

A programming language, such as Java or ReasonML, may be viewed as a formal language:
if $\Sigma$ is the set of all ASCII (or, more generally, Unicode) characters, then
the set of all valid programs in a particular programming language is a language over
$\Sigma$. We will see later how to formally specify such languages, but one step is
often to describe smaller languages, such as the set of all keywords in the language
(for Java, it is the 51-element set $\{$`abstract`, `assert`, `boolean`, &hellip;, `while`, `_`$\}$),
or the set of valid identifiers (in Java, a valid identifier starts with a letter, `$`, or `_`, and
continues with zero or more letters, digits, `$`, or `_`[^Technically there are a few more classes
of characters that are allowed in Java identifiers, such as other currency symbols and
"letter numbers", and the categories of "letters" and "digits" themselves contain thousands of
choices in Unicode.], except it may not be a keyword or reserved word such as `true`, `false`, or `null`).

Languages are sets and therefore, as for any sets, it makes sense to talk about
the union, intersection, and complement of languages. (When taking the complement
of a language over an alphabet $\Sigma$, we always consider the univeral set
to be $\Sigma^*$, the set of all strings over $\Sigma$.)
Because languages are
sets of strings, there are additional operations that can be defined on
languages, operations that would be meaningless on more general sets. For
example, the idea of concatenation can be extended from strings to languages.

For two sets of strings $S$ and $T$, we define the **concatenation** of $S$ and
$T$ (denoted $S\cdot T$ 
or just $ST$) to
be the set $ST = \{ st \ | \ s \in S \land t \in T \}$. For example, if $S =
\{ab, aab\}$ and $T=\{\varepsilon, 110, 1010\}$, then 
$ST = \{ab, ab110, ab1010, aab, aab110, aab1010\}$. 
Note in particular that $ab \in ST$, because $ab \in S$, $\varepsilon \in T$, and
$ab \cdot \varepsilon = ab$.
Because 
concatenation of sets is defined in terms of the
concatenation of the
strings that the sets contain, concatenation of sets is associative
and not commutative. (This can easily be verified.) 

When a set $S$
is concatenated with itself, the notation $SS$ is usually scrapped
in favour of $S^2$; if $S^2$ is concatenated with $S$, we write
$S^3$ for the resulting set, _etc_. So $S^2$ is the set of all strings formed by
concatenating two (possibly different, possibly identical) strings from $S$,
$S^3$ is the set of strings formed by concatenating three strings from $S$,
_etc_. Extending this notation, we take $S^1$ to be the set of strings formed
from one string in $S$ (_i.e._, $S^1$ is $S$ itself), and $S^0$ to be the set of
strings formed from zero strings in $S$ (_i.e._, $S^0 = \{\varepsilon\}$). If we take
the union $S^0 \cup S^1 \cup S^2 \cup \ldots$, then the resulting set is the set of
all strings formed by concatenating zero or more strings from $S$, and is
denoted $S^*$. The set $S^*$ is called the **Kleene closure**[^Kleene is pronounced KLAY-nee; the operation is named after the mathematician Stephen Kleene.] of $S$, and
the $^*$ operator is called the **Kleene star** operator.

---
**Example:** Let $S = \{01, ba\}$. Then

   * $S^0 = \{\varepsilon\}$

   * $S^1 = \{01, ba\}$

   * $S^2 = \{0101, 01ba, ba01, baba\}$

   * $S^3 = \{010101, 0101ba, 01ba01, 01baba, ba0101, ba01ba, baba01, bababa\}$

_etc_., so $S^* =\{\varepsilon,01,ba,0101,01ba,ba01,baba,010101,0101ba,\ldots\}.$

---

Note that this is the second time we have seen the notation $\textit{something}^*$. We
have previously seen that for an alphabet $\Sigma$, $\Sigma^*$ is defined to be 
the set of all
strings over $\Sigma$. If you think of $\Sigma$ as being a set of length-1
strings, and take its Kleene closure, the result is once again the set of all
strings over $\Sigma$, and so the two notions of $^*$ coincide.

---
**Example:** Let $\Sigma = \{a,b\}$. Then

   * $\Sigma^0 = \{\varepsilon\}$

   * $\Sigma^1 = \{a,b\}$

   * $\Sigma^2 = \{aa, ab, ba, bb\}$

   * $\Sigma^3 = \{aaa, aab, aba, abb, baa, bab, bba, bbb\}$

_etc_., so $\Sigma^* =\{\varepsilon,a,b,aa,ab,ba,bb,aaa,aab,aba,abb,baa,bab,\ldots\}.$

---

## Exercises

1. Let $S = \{\varepsilon, ab, abab\}$ and $T = \{aa, aba, abba, abbba,
\ldots\}$. Find the following:
   * $S^2$
   * $S^3$
   * $S^*$
   * $ST$
   * $TS$

2. The **reverse** of a language $L$ is defined to be 
$L^R = \{ x^R \ | \ x \in L\}$. Find $S^R$ and $T^R$ for the $S$ and $T$ in the
preceding problem.

3. Give an example of a language $L$ such that $L=L^*$.
