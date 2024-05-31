---
id: programming
title: Programming with Sets
---

(Content adapted from Critchlow &amp; Eck)

On a computer, all data are represented, ultimately, as strings
of zeros and ones. At times, computers need to work with
sets. How can sets be represented as strings of zeros and ones?

A set is determined by its elements. Given a set $A$ and an
entity $x$, the fundamental question is, does $x$ belong to $A$
or not? If we know the answer to this question for each possible
$x$, then we know the set. For a given $x$, the answer to the
question, "Is $x$ a member of $A$," is either _yes_ or
_no_. The answer can be encoded by letting 1 stand for
yes and 0 stand for no. The answer, then, is a single
**bit**, that is, a value that can be either zero or one.
To represent the set $A$ as a string of zeros and ones, 
we could use one bit for each possible member of $A$.
If a possible member $x$ is in the set, then the corresponding
bit has the value one. If $x$ is not in the set, then the
corresponding bit has the value zero.

Now, in cases where the number of possible elements of the set
is very large or infinite, it is not practical to represent the
set in this way. It would require too many bits, perhaps an infinite
number. In such cases, some other representation for the set
can be used. However, suppose we are only interested in subsets
of some specified small set. Since this set plays the role of
a universal set, let's call it $U$. To represent a subset of
$U$, we just need one bit for each member of $U$. If the number of members
of $U$ is $n$, then a subset of $U$ is represented by a string
of $n$ zeros and ones. Furthermore, every string of $n$ zeros
and ones determines a subset of $U$, namely that subset
that contains exactly the elements of $U$ that correspond to
ones in the string. A string of $n$ zeros and ones is
called an $n$-bit **binary number**. So, we see that if
$U$ is a set with $n$ elements, then the subsets of $U$ correspond
to $n$-bit binary numbers.

To make things more definite, let $U$ be the set $\{0,1,2,\dots,31\}$.
This set consists of the 32 integers between 0 and 31, inclusive.
Then each subset of $U$ can be represented by a 32-bit binary
number. We use 32 bits because most computer languages can work
directly with 32-bit numbers. For example, the programming
languages Java, C, and C++ have a data type named _int_.
A value of type _int_ is a 32-bit binary number.[^1]
Before we get a definite correspondence between subsets of
$U$ and 32-bit numbers, we have to decide which bit in the number
will correspond to each member of $U$. Following tradition,
we assume that the bits are numbered from right to left. That
is, the rightmost bit corresponds to the element 0 in $U$,
the second bit from the right corresponds to 1, the third bit
from the right to 2, and so on. For example, the 32-bit number

$$1000000000000000000001001110110$$

corresponds to the subset $\{1,2,4,5,6,9,31\}$. Since the leftmost
bit of the number is 1, the number 31 is in the set; since the
next bit is 0, the number 30 is not in the set; and so on.

[^1]: Actually, in 
some versions of C and C++, a value of type _int_ is a 16-bit
number, while in others it is a 64-bit number. A 16-bit
number can be used to represent a subset of
the set $\{0,1,2,\dots,15\}$. The principle, of course, is the same.

From now on,
I will write binary numbers with a subscript of 2 to avoid confusion
with ordinary numbers. Furthermore, I will often leave out leading
zeros. For example, 1101$_2$ is the binary number that would
be written out in full as

$$00000000000000000000000000001101$$

and which corresponds to the set $\{0,2,3\}$. On the other hand
1101 represents the ordinary number one thousand one hundred and one.

Even with this notation, it can be very annoying to write out long
binary numbers&mdash;and almost impossible to read them. So binary numbers
are almost never written out as sequences of zeros and ones in computer
programs. An alternative is to use **hexadecimal
numbers**. Hexadecimal numbers are written using the sixteen
symbols 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, A, B, C, D, E, and F.
These symbols are knows as the hexadecimal digits. Each hexadecimal
digit corresponds to a 4-bit binary number, as shown in 
this table:

| **Hex**. | **Binary** | **Hex**. | **Binary** |
| :-: | :-: | :-: | :-: |
| 0 | $0000_2$ |  8 | $1000_2$ |
| 1 | $0001_2$ |  9 | $1001_2$ |
| 2 | $0010_2$ |  A | $1010_2$ |
| 3 | $0011_2$ |  B | $1011_2$ |
| 4 | $0100_2$ |  C | $1100_2$ |
| 5 | $0101_2$ |  D | $1101_2$ |
| 6 | $0110_2$ |  E | $1110_2$ |
| 7 | $0111_2$ |  F | $1111_2$ |

To represent a longer binary number, several
hexadecimal digits can be strung together. For example,
the hexadecimal number C7 represents the binary number 
11000111$_2$. In Java and many related languages, a hexadecimal
number is written with the prefix "0x". Thus, the hexadecimal
number C7 would appear in the program as 0xC7. I will follow
the same convention here. Any 32-bit binary number can be written
using eight hexadecimal digits (or fewer if leading zeros are omitted).
Thus, subsets of $\{0,1,2,\dots,31\}$ correspond to 
8-digit hexadecimal numbers. For example,
the subset $\{1,2,4,5,6,9,31\}$ corresponds to
0x80000276, which represents the binary number
1000000000000000000001001110110$_2$. Similarly,
0xFF corresponds to $\{0,1,2,3,4,5,6,7\}$ and
0x1101 corresponds to the binary number 0001000100000001$_2$
and to the set $\{0,8,12\}$.

Now, if you have worked with binary numbers or with hexadecimal
numbers, you know that they have another, more common interpretation.
They represent ordinary integers. Just as 342 represents the
integer $3\cdot 10^2 + 4\cdot 10^1 +2\cdot 10^0$, the
binary number 1101$_2$ represents the integer
$1\cdot 2^3 +1\cdot 2^2 +0\cdot 2^1 +1\cdot 2^0$, or 13.
When used in this way, binary numbers are known as 
**base-2 numbers**, just as ordinary numbers
are base-10 numbers. Hexadecimal numbers can be interpreted
as base-16 numbers. For example, 0x3C7 represents the
integer $3\cdot 16^2 + 12\cdot 16^1 + 7\cdot 16^0$, or 874.
So, does 1101$_2$ really represent the integer 13, or does it
represent the set $\{0,2,3\}\,$? The answer is that to a person,
1101$_2$ can represent either. Both are valid interpretations,
and the only real question is which interpretation is useful in
a given circumstance. On the other hand, to the computer,
1101$_2$ doesn't represent _anything_. It's just a string
of bits, and the computer manipulates the bits according to its
program, without regard to their interpretation.

Of course, we still have to answer the question of whether it
is ever useful to interpret strings of bits in a computer as
representing sets.

## Operations on Binary Numbers

If all we could do with sets were to "represent" them, it wouldn't
be very useful. We need to be able to compute with sets. That
is, we need to be able to perform set operations such as 
union and complement.

Many programming languages provide operators that perform set
operations. In Java and related languages, the operators
that perform union, intersection, and complement are written
as $\,|\,$, $\&$, and $\sim$. For example, 
if $x$ and $y$ are 32-bit integers representing two subsets,
$X$ and $Y$, of $\{0,1,2,\dots,31\}$, then
$x\,|\,y$ is a 32-bit integer that represents the set $X\cup Y$.
Similarly, $x\,\&\,y$ represents the set $X\cap Y$, and
$\sim x$ represents the complement,
$\overline{X}$.


The operators $\,|\,$, $\&$, and $\sim$
are called **bitwise logical operators**
because of the way they operate on the individual bits of the numbers
to which they are applied. The languages descended from C have one more bitwise logical
operator: $a\;\hat{}\;b$ takes the exclusive-OR at each
corresponding bit position of $a$ and $b$. Recall that the
exclusive-OR, also written $p\oplus q$, is the variation
of OR that is true when either $p$ or $q$ is true, but not both.
If 0 and 1 are interpreted as the
logical values _false_ and _true_, then the
bitwise logical operators perform the logical operations
$\lor$, $\land$, $\lnot$, and $\oplus$ on individual bits. To see why this
is true, let's look at the computations that these operators
have to perform.

Let $k$ be one of the members of $\{0,1,2,\dots,31\}$. In the
binary numbers $x$, $y$, $x\,|\,y$, $x\,\&\,y$, and $\sim x$,
the number $k$ corresponds to the bit in position $k$. That is,
$k$ is in the set represented by a binary number if and only if the
bit in position $k$ in that binary number is 1.
Considered as sets, $x\,\&\,y$ is the intersection of $x$ and $y$,
so $k$ is a member of the set represented by $x\,\&\,y$ if and only if 
$k$ is a member of both of the sets represented by $x$ and $y$.
That is, bit $k$ is 1 in the binary number $x\,\&\,y$ if and only if bit
$k$ is 1 in $x$ and bit $k$ is 1 in $y$. When we interpret
1 as _true_ and 0 as _false_, we see that
bit $k$ of $x\,\&\,y$ is computed by applying the logical "and"
operator, $\land$, to bit $k$ of $x$ and bit $k$ of $y$.
Similarly, bit $k$ of $x\,|\,y$ is computed by applying the
logical "or" operator, $\lor$, to bit $k$ of $x$ and bit $k$ of $y$.
And bit $k$ of $\sim x$ is computed by applying the
logical "not" operator, $\lnot$, to bit $k$ of $x$. In each
case, the logical operator is applied to each bit position
separately. (Of course, this discussion is just a translation
to the language of bits of the definitions of the set
operations in terms of logical operators: 
$A\cap B=\{x\mid x\in A \land x\in B\}$,
$A\cup B=\{x\mid x\in A \lor x\in B\}$, and
$\overline{A}=\{x\in U\mid \lnot(x\in A)\}$.)

For example, consider the binary numbers 1011010$_2$ and
10111$_2$, which represent the sets $\{1,3,4,6\}$ and
$\{0,1,2,4\}$. Then 1011010$_2$ $\&$ 10111$_2$ is
10010$_2$. This binary number represents the set $\{1,4\}$,
which is the intersection $\{1,3,4,6\}\cap\{0,1,2,4\}$.
It's easier to see what's going on if we write out the
computation in columns, the way you probably first learned to
do addition:

|      |               |      |    |   |    |    |    |    |   |      |
| -:   | -:            | -:   | -  | - | -  | -  | -  | -  | - | :-   |
|      | 1 0 1 1 0 1 0 | $\{$ | 6, |   | 4, | 3, |    | 1  |   | $\}$ |
| $\&$ |     1 0 1 1 1 | $\{$ |    |   | 4, |    | 2, | 1, | 0 | $\}$ |
| $=$  |     1 0 0 1 0 | $\{$ |    |   | 4, |    |    | 1  |   | $\}$ |

Note that in each column in the binary numbers, the bit in the
bottom row is computed as the logical "and" of the two bits
that lie above it in the column. I've written out the sets that
correspond to the binary numbers to show how the bits in the
numbers correspond to the presence or absence of elements in the sets.
Similarly, we can see how the union of two sets is computed as
a bitwise "or" of the corresponding binary numbers.

|        |               |      |    |   |    |    |    |    |   |      |
| -:     | -:            | -:   | -  | - | -  | -  | -  | -  | - | :-   |
|        | 1 0 1 1 0 1 0 | $\{$ | 6, |   | 4, | 3, |    | 1  |   | $\}$ |
| $\mid$ |     1 0 1 1 1 | $\{$ |    |   | 4, |    | 2, | 1, | 0 | $\}$ |
| $=$    | 1 0 1 1 1 1 1 | $\{$ | 6, |   | 4, | 3, | 2, | 1, | 0 | $\}$ |

The complement of a set is computed using a bitwise "not" operation.
Since we are working with 32-bit binary numbers, the complement is
taken with respect to the universal set $\{0,1,2,\dots,31\}$.
So, for example, 

$$\sim 1011010_2 = 11111111111111111111111110100101_2$$

Of course, we can apply the operators $\&$, $\,|\,$, and $\sim$
to numbers written in hexadecimal form, or even in ordinary, base-10
form. When doing such calculations by hand, it is probably best
to first translate the numbers into binary form. For example,

| | |
| -: | :- |
| 0xAB7 & 0x168E | $= 1010\,1011\,0111_2\,\&\,1\,0110\,1000\,1110_2$ |
| | $= 0\,0010\,1000\,0110_2$ |
| | $=$ 0x286 |

## Bit masks

When computing with sets, it is sometimes necessary to work
with individual elements. Typical operations include adding
an element to a set, removing an element from a set, and
testing whether an element is in a set. However, instead of
working with an element itself, it's convenient to work with
the set that contains that element as its only member. For example,
testing whether $5\in A$ is the same as testing whether
$\{5\}\cap A\not=\emptyset$. The set $\{5\}$ is represented by
the binary number 100000$_2$ or by the hexadecimal number 0x20.
Suppose that the set $A$ is represented by the number $x$.
Then, testing whether $5\in A$ is equivalent to testing
whether 0x20 $\&$ $x\not=0$. Similarly, the set
$A\cup\{5\}$, which is obtained by adding 5 to $A$, can
be computed as $x$ $|$ 0x20. The set $A\smallsetminus \{5\}$,
which is the set obtained by removing 5 from $A$ if it occurs in $A$,
is represented by $x\,\&\,\sim$0x20.

The sets $\{0\}$, $\{1\}$, $\{2\}$, $\{3\}$, $\{4\}$, $\{5\}$, $\{6\}$, \dots, $\{31\}$ are
represented by the hexadecimal numbers 0x1, 0x2, 0x4, 0x8, 0x10, 0x20, \dots, 0x80000000. 
In typical computer applications, some of these numbers are given names,
and these names are thought of as names for the possible elements of a set
(although, properly speaking, they are names for sets containing those elements).
Suppose, for example, that $a$, $b$, $c$, and $d$ are names for four of the
numbers from the above list. Then $a\,|\,c$ is the set that contains
the two elements corresponding to the numbers $a$ and $c$. If $x$ is a
set, then $x\,\&\,\sim d$ is the set obtained by removing
$d$ from $x$. And we can test whether $b$ is in $x$ by testing if
$x\,\&\,b\not=0$.

Here is an actual example, which is used in the Macintosh operating system.
Characters can be printed or displayed on the screen in various sizes and
styles. A **font** is a collection of pictures of characters in a particular
size and style. On the Macintosh, a basic font can be modified by 
specifying any of the following style attributes: _bold_,
_italic_, _underline_, _outline_, _shadow_, 
_condense_, and _extend_. The style of a font is a subset
of this set of attributes. A style set can be specified by
or-ing together individual attributes. For example, an underlined, bold, italic
font has style set _underline_ $|$ _bold_ $|$ _italic_.
For a plain font, with none of the style attributes set, the style set
is the empty set, which is represented by the number zero.

The Java programming language uses a similar scheme to specify style
attributes for fonts, but currently there are only two basic
attributes, `Font.BOLD` and `Font.ITALIC`. A more
interesting example in Java is provided by event types. An event in 
Java represents some kind of user action, such as pressing a key on the
keyboard. Events are associated with "components" such as windows,
push buttons, and scroll bars. Components can be set to ignore
a given type of event. We then say that that event type is disabled
for that component. If a component is set to process events of
a given type, then that event type is said to be enabled. Each
component keeps track of the set of event types that are currently
enabled. It will ignore any event whose type is not in that set.
Each event type has an associated constant with a name such
as `AWTEvent.MOUSE_EVENT_MASK`. These constants represent
the possible elements of a set of event types. A set of event types can be
specified by or-ing together a number of such constants. If
$c$ is a component and $x$ is a number representing a set of event
types, then the command "$c$._enableEvents_($x$)" enables the
events in the set $x$ for the component $c$. If $y$ represents
the set of event types that were already enabled for $c$, then the effect
of this command is to replace $y$ with the union, $y\,|\,x$. Another
command, "$c$._disableEvents_($x$)", will disable the
event types in $x$ for the component $c$. It does this by replacing
the current set, $y$, with $y\,\&\,\sim x$.

The bitwise operators are also useful when performing low-level bit manipulation,
such as when writing code that interfaces with hardware devices. A binary number
may be interpreted as a **bit mask**, where each 1 bit selects its bit
position. For example, the mask 01010000$_2$ selects the 64's place and the
16's place. One way to produce such a mask is to use another bit operator: the
**shift** (`<<`). The expression $x\,\texttt{<<}\,k$ results in $x$ being
shifted $k$ bits to the left, with bits of 0 pushed in from the right
(effectively multiplying by $2^k$). Since $64=2^6$ and $16=2^4$, the above mask
may be produced by $1\,\texttt{<<}\,6\;|\;1\,\texttt{<<}\,4$.

Using a mask $\verb|m|$, the following simple operations are possible on a binary number $\verb|x|$:

* $\verb-x | m-$ turns on (sets to 1) all of the selected bits of $\verb|x|$, leaving the rest unchanged;
* $\verb|x & ~m|$ turns off all of the selected bits of $\verb|x|$;
* $\verb|x & m|$ turns off all of the _non_-selected bits of $\verb|x|$;
* $\verb|x ^ m|$ "toggles" (flips between 0 and 1) all of the selected bits of $\verb|x|$;
* $\verb|~x|$ toggles all of the bits of $\verb|x|$.

The following table shows samples of these operations:

$$
\begin{array}{rl}
\verb|x|:         & 01101011_2\\
\verb|m|:         & 01010000_2\\ \hline
\verb-x | m-:     & 01111011_2\\
\verb|x & ~m|:    & 00101011_2\\
\verb|x & m|:     & 01000000_2\\
\verb|x ^ m|:     & 00111011_2\\
\verb|~x|:        & 10010100_2
\end{array}
$$

## Binary numbers in ReasonML

You can try out various operations on binary numbers in the ReasonML code block below.
Here is a table of the corresponding number syntax and operations:

| C++ and Java | ReasonML |
| :- | :- |
| 0x2A | 0x2A |
| 0b101010 | 0b101010 |
| x & y | x land y |
| x $\mid$ y | x lor y |
| x ^ y | x lxor y |
| ~ x | lnot(x) |
| x &lt;&lt; n | x lsl n |
| x >> n | x lsr n |

There is no simple way to print out a number in binary in ReasonML, but you can use
`Printf.sprintf("0x%x", n)` to convert `n` to a hexadecimal string.

```reason edit
0x2A
```

Evaluate the code by pressing the button or hitting Ctrl-Enter.

## Exercises

1. Suppose that the numbers $x$ and $y$ represent the
sets $A$ and $B$. Show that the set $A\smallsetminus B$ is 
represented by $x \,\&\, (\sim y)$.
<details>
  <summary>Answer</summary>

  For each bit in the output, the result will be 1 if the corresponding
  bit in $x$ was 1 while the bit in $y$ was 0. That is, the element
  represented by that bit must be in $A$ and not in $B$, which is
  exactly the condition needed for an element to be in $A\smallsetminus B$.
</details>

2. Write each of the following binary numbers in hexadecimal:

   * 10110110$_2$
   <details>
     <summary>Answer</summary>

     0xB6
   </details>
 
   * 10$_2$
   <details>
     <summary>Answer</summary>
    
     0x2
   </details>

   * 111100001111$_2$
   <details>
     <summary>Answer</summary>
    
     0xF0F
   </details>

   * 101001$_2$
   <details>
     <summary>Answer</summary>

     0x29
   </details>

3. Write each of the following hexadecimal numbers in binary:

   * 0x123
   <details>
     <summary>Answer</summary>
    
     100100011$_2$
   </details>

   * 0xFADE
   <details>
     <summary>Answer</summary>
     
     1111101011011110$_2$
   </details>

   * 0x137F
   <details>
     <summary>Answer</summary>
    
     1001101111111$_2$
   </details>

   * 0xFF11
   <details>
     <summary>Answer</summary>
   
     1111111100010001$_2$
   </details>

4. Give the value of each of the following expressions
as a hexadecimal number:

   * 0x73 $|$ 0x56A
   <details>
     <summary>Answer</summary>
    
     0x57B
   </details>

   * $\sim$ 0x3FF0A2FF
   <details>
     <summary>Answer</summary>
    
     0xC00F5D00
   </details>

   * (0x44 $|$ 0x95) $\&$ 0xE7
   <details>
     <summary>Answer</summary>
    
     0xC5
   </details>

   * 0x5C35A7 $\&$ 0xFF00
   <details>
     <summary>Answer</summary>
    
     0x3500
   </details>

   * 0x5C35A7 $\&$ $\sim$ 0xFF00
   <details>
     <summary>Answer</summary>
    
     0x5C00A7
   </details>

   * $\sim$(0x1234 $\&$ 0x4321) 
   <details>
     <summary>Answer</summary>
    
     0xFFFFFDDF
   </details>

5. Find a calculator (or a calculator program on a computer)
that can work with hexadecimal numbers. Write a short report
explaining how to work with hexadecimal numbers on that calculator.
You should explain, in particular, how the calculator can be used to
do the previous problem.

6. This question assumes that you know how to add binary numbers.
Suppose $x$ and $y$ are binary numbers. Under what circumstances
will the binary numbers $x+y$ and $x\,|\,y$ be the same?
<details>
  <summary>Answer</summary>

  They will be the same if there is no carry from any column to the next.
  This will be true if there is no bit position where both $x$ and $y$
  are 1. Another way of saying this is that $x\,\%\,y=0$.
</details>

7. In addition to hexadecimal numbers, the programming languages
Java, C, and C++ support **octal numbers**. Look up
and report on octal numbers in Java, C, or C++. Explain what octal
numbers are, how they are written, and how they are used.
<details>
  <summary>Answer</summary>
 
  Octal numbers are in base 8, so each digit of octal (0 through 7)
  corresponds to three bits of binary. Octal literals are written with
  a leading zero in many C-like languages, which is why `010 - 1` is 7
  instead of 9 (which can be an obscure source of bugs for people who
  are not aware of this convention).
</details>


8. In the UNIX (or Linux) operating system, every file has an associated
set of permissions, which determine who can use the file and how
it can be used. The set of permissions for a given file is represented
by a nine-bit binary number. This number is sometimes written as an
octal number. Research and report on the UNIX system of permissions.
What set of permissions is represented by the octal number 752?
by the octal number 622? Explain what is done by the UNIX commands
"chmod g+rw filename" and "chmod o-w filename" in terms of sets. 
(Hint: Look at the _man_ page for
the _chmod_ command. To see the page, use the UNIX command
"man chmod". If you don't know what this means, you probably don't
know enough about UNIX to do this exercise.)

9. Java, C, and C++ each have a boolean data type that has the values
_true_ and _false_. The usual logical and, or, and not operators
on boolean values are represented by the operators $\&\&$, $|\,|$, and !.
C and C++ allow integer values to be used in places where boolean values
are expected. In this case, the integer zero represents the boolean
value _false_ while any non-zero integer represents the boolean
value _true_. This means that if $x$ and $y$ are integers,
then both $x\,\&\,y$ and $x\,\&\&\,y$ are valid expressions, and both can
be considered to represent boolean values. Do the expressions
$x\,\&\,y$ and $x\,\&\&\,y$ always represent the same boolean value,
for any integers $x$ and $y$? Do the expressions $x\,|\,y$ and $x\,|\,|\,y$
always represent the same boolean values? Explain your answers.
<details>
  <summary>Answer</summary>
 
  No, they are not always the same. For example, `1 & 2` is 0 (_false_),
  while `1 && 2` is 1 (_true_).
  However, the only way to get 0 (_false_) from either bitwise OR (`|`) or
  logical OR (`||`) is if both operands are 0, so the expressions $x\,|\,y$
  and $x\,|\,|\,y$ will always represent the same boolean values (although
  their integer values may well differ).
</details>

9. Suppose that you, as a programmer, want to write a subroutine
that will open a window on the computer's screen. The window can have
any of the following options: a close box, a zoom box, a resize box, 
a minimize box, a vertical scroll bar, a horizontal scroll bar.
Design a scheme whereby the options for the window can be specified
by a single parameter to the subroutine. The parameter should represent
a set of options. How would you use your subroutine to open
a window that has a close box and both scroll bars and no other options?
Inside your subroutine, how would you determine which options have been
specified for the window?
<details>
  <summary>Answer</summary>
 
  Assign each option a different power of two; for example `CLOSE = 1`,
  `ZOOM = 2`, `RESIZE = 4`, `MINIMIZE = 8`, `VSB = 16`, and `HSB = 32`.
  A particular combination of options may be passed as the bitwise OR
  of these constants: `CLOSE | VSB | HSB`. In the subroutine, masking
  that parameter with each option will give a zero/non-zero value depending
  on whether the option was specified. For example, you should draw a close
  box if `options & CLOSE` is true (non-zero).
</details>

9. Consider the following sequence of operations on two integer variables,
$x$ and $y$ (again, this should work the same in all C-like languages):
```
x = x ^ y;
y = y ^ x;
x = x ^ y;
```
   What is the net effect of this sequence on the values stored in $x$ and $y$?
<details>
  <summary>Answer</summary>
 
  It swaps the values in $x$ and $y$. After the second assignment, $x$ is
  `x ^ y` and $y$ is `y ^ (x ^ y)`, which equals the original $x$. The third
  assignment then stores `(x ^ y) ^ x` (in terms of the original $x$ and $y$)
  into $x$, which equals the original $y$.
</details>

12. Bitwise operations are also useful when working with character data.
In the ASCII character encoding (which is also the first 128 characters of Unicode),
the digits '0' through '9' have codes 48 through 57; the uppercase latin alphabet,
'A' through 'Z', have 65 through 90, and the corresponding lowercase letters have
codes 97 through 122.

   * Convert the endpoints of each of these code ranges to binary.
   <details>
     <summary>Answer</summary>
    
     '0' is 0110000 and '9' is 0111001. In hexadecimal, these are 0x30 and 0x39.
   
     'A' is 1000001 and 'Z' is 1011010. In hexadecimal, these are 0x41 and 0x5A.
   
     'a' is 1100001 and 'z' is 1111010. In hexadecimal, these are 0x61 and 0x7A.
   </details>

   * Give an expression using only integer constants and bitwise operations that will convert the character code $c$ for an ASCII digit into its corresponding integer value. Do not worry about what it will do to non-digits.
   <details>
     <summary>Answer</summary>
    
     We just need to select the lowest four bits: `c & 0xF`
   </details>

   * Give a similar expression that will convert an integer $n$ in the range 0 to 9 into the corresponding ASCII digit code. Do not worry about error cases.
   <details>
     <summary>Answer</summary>
    
     Given a number 0 through 9, we just need to set the 16's and 32's bits to 1: `n | 0x30` (we can also do `n + 48`, or `n + '0'`).
   </details>

   * Give expressions that will take a letter whose ASCII code is $c$ and 
      1. convert it to uppercase,
      2. convert it to lowercase, and
      3. toggle it between upper- and lowercase. Do not worry about error cases.
   <details>
     <summary>Answer</summary>
    
     Converting to upper-case corresponds to turning off (resetting) the 32's bit: `c & ~0x20`, or `c & 0x5F` (since we only care about the bottom seven bits for ASCII).
     Converting to lower-case corresponds to turning on (setting) that bit: `c | 0x20`.
     Toggling the case corresponds to toggling that bit: `c ^ 0x20`.
   </details>
