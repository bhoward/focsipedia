---
id: regexpapp
title: Applications of Regular Expressions
---

(Content adapted from Critchlow &amp; Eck)

\newcommand{\bk}{\char`\\}
\newcommand{\vb}{\char`\|}
\newcommand{\sol}{\char`\^}

A common operation when editing text is to search for a
given string of characters, sometimes with the purpose of
replacing it with another string.  Many ``search and replace''\index{search
and replace} facilities have the option of using regular expressions
instead of simple strings of characters.  A regular expression describes
a language, that is, a \textit{set} of strings.  We can think of a regular
expression as a \nw{pattern} that matches certain strings, namely all
the strings in the language described by the regular expression.
When a regular expression is used in a search operation, the
goal is to find a string that matches the expression.  This type
of \nw{pattern matching} is very useful.\index{regular expressions!and
pattern matching}

The ability to do pattern matching with regular expressions is provided
in many text editors, including \textit{jedit} and \textit{kwrite}.
Programming languages often come with libraries for working with
regular expressions.  Java (as of version 1.4) provides regular
expression handling though a package named \textit{java.util.regexp}.
C++ typically provides a header file named \textit{regexp.h} for
the same purpose.  In all these applications, many new notations are added to the syntax to make it
more convenient to use.  The syntax can vary from one implementation
to another, but most implementations include the capabilities
discussed in this section.

\medskip

In applications of regular expressions, the alphabet usually includes
all the characters on the keyboard.  This leads to a problem, because
regular expressions actually use two types of symbols:  symbols that
are members of the alphabet and special symbols such a ``\texttt{*}'' and ``\texttt{)}'' that
are used to construct expressions.  These special symbols, which
are not part of the language being described but are used in the
description, are called \nw{meta-characters}.  The problem is,
when the alphabet includes all the available characters, what do we
do about meta-characters?  If the language that we are describing 
uses the ``\texttt{*}'' character, for example, how can we represent the
Kleene star operation?

The solution is to use a so-called ``escape character,'' which is
usually the backslash,~\texttt{\bk}.  We agree, for example, that the notation
\texttt{\bk*} refers to the symbol \texttt{*} that is a member of
the alphabet, while \texttt{*} by itself is the meta-character
that represents the Kleene star operation.  Similarly,
\texttt{(} and \texttt{)} are the meta-characters that are used
for grouping, while the corresponding characters in the language
are written as \texttt{\bk(} and \texttt{\bk)}.  For example,
a regular expression that matches the string \texttt{a*b} repeated
any number of times would be written: \texttt{(a\bk*b)*}.
The backslash is also used to represent certain non-printing
characters.  For example, a tab is represented as \texttt{\bk t}
and a new line character is \texttt{\bk n}.

%Outside this section of this book, *****
%we use the symbol + as a meta-character to represent
%a choice between alternatives in a regular expression.  In applications,
%however, the same operation is almost universally expressed using
%the vertical bar symbol~\texttt{\vb}, which computer scientists tend to
%associate with the word ``or.''  In this section, we follow the
%same convention and use \texttt{a\vb b} rather than \texttt{a+b} for 
%the regular expression that matches either \texttt{a} or
%\texttt{b}.  (This means, of course, that if we want to use
%\texttt{\vb} as a normal character rather than a meta-character, we must
%write it as~\texttt{\bk\vb}.  The same remark applies to all the new 
%meta-characters that are introduced below.)

We introduce two new common operations on regular expressions and two
new meta-characters to represent them.
The first operation is represented by the meta-character~\texttt{+}:
If \texttt{r} is a regular expression, then \texttt{r+} represents the
occurrence of \texttt{r} one or more times.  The second operation
is represented by~\texttt{?}: The notation \texttt{r?} represents an occurrence of \texttt{r} 
zero or one times.  That is to say, \texttt{r?} represents an optional 
occurrence of \texttt{r}.  Note that these operations are introduced
for convenience only and do not represent any real increase
in the power.  In fact, \texttt{r+} is exactly equivalent to
\texttt{rr*}, and \texttt{r?} is equivalent to \texttt{(r|$\varep$)} 
(except that in applications there is generally no equivalent to $\varep$).

To make it easier to deal with the large number of characters in the
alphabet, \nw{character classes} are introduced.  A character class
consists of a list of characters enclosed between brackets, \texttt{[} and
\texttt{]}.  (The brackets are meta-characters.)  A character class
matches a single character, which can be any of the characters in
the list.  For example, \texttt{[0123456789]} matches any one of
the digits 0 through 9.  The same thing could be expressed
as \texttt{(0\vb1\vb2\vb3\vb4\vb5\vb6\vb7\vb8\vb9)}, so once again
we have added only convenience, not new representational power.
For even more convenience, a hyphen can be included in a character
class to indicate a range of characters.  This means that
\texttt{[0123456789]} could also be written as \texttt{[0-9]}
and that the regular expression \texttt{[a-z]} will match any
single lowercase letter.  A character class can include multiple
ranges, so that \texttt{[a-zA-Z]} will match any letter, lower- or
uppercase.  The period~(\texttt{.}) is a meta-character that will
match any single character, except (in most implementations)
for an end-of-line.
These notations can, of course, be used in more complex
regular expressions.  For example, \texttt{[A-Z][a-zA-Z]*}
will match any capitalized word, and \texttt{\bk(.*\bk)} matches
any string of characters enclosed in parentheses.

In most implementations, the meta-character \texttt{\sol} can be used in
a regular expression to match the beginning of a line of text, so that
the expression \texttt{\sol [a-zA-Z]+} will only match a word that
occurs at the start of a line.  Similarly, \texttt{\$} is used
as a meta-character to match the end of a line.  Some implementations
also have a way of matching beginnings and ends of words.
Typically, \texttt{\bk b} will match such ``word boundaries.''
Using this notation, 
the pattern \texttt{\bk band\bk b} will match the string ``and''
when it occurs as a word, but will not match the \hbox{a-n-d}
in the word ``random.''  We are going a bit beyond
basic regular expressions here: Previously, we only thought of
a regular expression as something that either will match
or will not match a given string in its entirety.   When
we use a regular expression for a search operation, however,
we want to find a \textit{substring} of a given string that
matches the expression.  The notations \texttt{\sol},
\texttt{\$} and \texttt{\bk b} put a restrictions
on \textit{where} the matching substring can be located in the string.

\medskip

When regular expressions are used in search-and-replace operations,
a regular expression is used for the search pattern.  A search is
made in a (typically long) string for a substring that matches the pattern,
and then the substring is replaced by a specified replacement
pattern.  The replacement pattern is not used for matching
and is not a regular expression.  However, it can be more than
just a simple string.  It's possible to include parts of the
substring that is being replaced in the replacement string.
The notations \texttt{\bk0}, \texttt{\bk1}, \dots, \texttt{\bk9}
are used for this purpose.  The first of these, \texttt{\bk0},
stands for the entire substring that is being replaced.
The others are only available when parentheses are used in
the search pattern.  The notation \texttt{\bk1} stands for
``the part of the substring that matched the part of the
search pattern beginning with the first \texttt{(} in the
pattern and ending with the matching \texttt{)}.''  Similarly,
\texttt{\bk2} represents whatever matched the part of the
search pattern between the second pair of parentheses, and so on.

Suppose, for example, that you would like to search for
a name in the form \textit{last-name,~first-name} and
replace it with the same name in the form \textit{first-name last-name}.
For example, ``Reeves, Keanu'' should be converted to ``Keanu Reeves''.
Assuming that names contain only letters,
this could be done using the search pattern \texttt{([A-Za-z]+),~([A-Za-z]+)}
and the replacement pattern \texttt{\bk2 \bk1}.  When the match is
made, the first \texttt{([A-Za-z]+)} will match ``Reeves,'' 
so that in the replacement pattern, \texttt{\bk1} represents the
substring ``Reeves''. Similarly, \texttt{\bk2} will represent
``Keanu''.  Note that the parentheses
are included in the search pattern \textit{only} to specify what parts
of the string are represented by \texttt{\bk1} and \texttt{\bk2}.
In practice, you might use \texttt{\sol([A-Za-z]+),~([A-Za-z])\$}
as the search pattern to constrain it so that it will only 
match a complete line of text.  By using a ``global'' search-and-replace,
you could convert an entire file of names from one format to the other
in a single operation.

\medskip

Regular expressions are a powerful and useful technique that
should be part of any computer scientist's toolbox.  This section
has given you a taste of what they can do, but you should check
out the specific capabilities of the regular expression implementation
in the tools and programming languages that you use.




\begin{exercises}

\problem The backslash is itself a meta-character.  Suppose that
you want to match a string that contains a backslash
character.  How do you suppose you would represent the backslash in
the regular expression?

\problem Using the notation introduced in this section,
write a regular expression that could be used to match
each of the following:
\ppart Any sequence of letters (upper- or lowercase) that
includes the letter Z (in uppercase).
\ppart Any eleven-digit telephone number written in the form
\texttt{(xxx)xxx-xxxx}.
\ppart Any eleven-digit telephone number \textit{either}
in the form \texttt{(xxx)xxx-xxxx} or \texttt{xxx-xxx-xxxx}.
\ppart A non-negative real number with an optional decimal
part.  The expression should match numbers such as
17, 183.9999, 182., 0, 0.001, and 21333.2.
\ppart A complete line of  text that contains only letters.
\ppart A C++ style one-line comment consisting of \texttt{//} and all the
following characters up to the end-of-line.

\problem Give a search pattern and a replace pattern that could
be used to perform the following conversions:
\ppart Convert a string that is enclosed in a pair of double quotes to
the same string with the double quotes replaced by single quotes.
\ppart Convert seven-digit telephone numbers in the format
\texttt{xxx-xxx-xxxx} to the format \texttt{(xxx)xxx-xxxx}.
\ppart Convert C++ one-line comments, consisting of characters
between \texttt{//} and end-of-line, to C style comments enclosed
between \texttt{/*} and \texttt{*/}$\,$.
\ppart Convert any number of consecutive spaces and tabs to
a single space.

\problem In some implementations of ``regular expressions,'' the
notations \texttt{\bk 1}, \texttt{\bk 2}, and so on can occur
in a search pattern.  For example, consider the search pattern
\texttt{\sol([a-zA-Z]).*\bk1\$}.  Here, \texttt{\bk1} represents
a recurrence of the same substring that matched \texttt{[a-zA-Z]},
the part of the pattern between the first pair of parentheses.
The entire pattern, therefore, will match a line of text that
begins and ends with the same letter.  Using this notation,
write a pattern that matches all strings in the language
$L=\{a^nba^n\,\st\,n\ge0\}$.  (Later in this chapter, we will
see that $L$ is \textit{not} a regular language, so allowing the
use of \texttt{\bk1} in a ``regular expression'' means that it's
not really a regular expression at all!  This notation can add
a real increase in expressive power to the patterns that contain it.)

\end{exercises}
