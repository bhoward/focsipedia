---
id: regexpapp
title: Applications of Regular Expressions
---

(Content adapted from Critchlow &amp; Eck)

A common operation when editing text is to search for a
given string of characters, sometimes with the purpose of
replacing it with another string.  Many "search and replace" facilities have the option of using regular expressions
instead of simple strings of characters.  A regular expression describes
a language, that is, a _set_ of strings.  We can think of a regular
expression as a **pattern** that matches certain strings, namely all
the strings in the language described by the regular expression.
When a regular expression is used in a search operation, the
goal is to find a string that matches the expression.  This type
of **pattern matching** is very useful.

The ability to do pattern matching with regular expressions is provided
in many text editors, including _jedit_ and _kwrite_.
Programming languages often come with libraries for working with
regular expressions.  Java (as of version 1.4) provides regular
expression handling though a package named `java.util.regexp`.
C++ typically provides a header file named `regexp.h` for
the same purpose.  In all these applications, many new notations are added to the syntax to make it
more convenient to use.  The syntax can vary from one implementation
to another, but most implementations include the capabilities
discussed in this section.

In applications of regular expressions, the alphabet usually includes
all the characters on the keyboard.  This leads to a problem, because
regular expressions actually use two types of symbols:  symbols that
are members of the alphabet and special symbols such as `*` and `)` that
are used to construct expressions.  These special symbols, which
are not part of the language being described but are used in the
description, are called **meta-characters**.  The problem is,
when the alphabet includes all the available characters, what do we
do about meta-characters?  If the language that we are describing 
uses the `*` character, for example, how can we represent the
Kleene star operation?

The solution is to use a so-called "escape character," which is
usually the backslash, `\`.  We agree, for example, that the notation
`\*` refers to the symbol `*` that is a member of
the alphabet, while `*` by itself is the meta-character
that represents the Kleene star operation.  Similarly,
`(` and `)` are the meta-characters that are used
for grouping, while the corresponding characters in the language
are written as `\(` and `\)`.  For example,
a regular expression that matches the string `a*b` repeated
any number of times would be written: `(a\*b)*`.
The backslash is also used to represent certain non-printing
characters.  For example, a tab is represented as `\t`
and a new line character is `\n`.

We introduce two new common operations on regular expressions and two
new meta-characters to represent them.
The first operation is represented by the meta-character `+`:
If `r` is a regular expression, then `r+` represents the
occurrence of `r` one or more times.  The second operation
is represented by `?`: The notation `r?` represents an occurrence of `r` 
zero or one times.  That is to say, `r?` represents an optional 
occurrence of `r`.  Note that these operations are introduced
for convenience only and do not represent any real increase
in the power.  In fact, `r+` is exactly equivalent to
`rr*`, and `r?` is equivalent to `(r|ε)` 
(except that in applications there is generally no equivalent to `ε`).

To make it easier to deal with the large number of characters in the
alphabet, **character classes** are introduced.  A character class
consists of a list of characters enclosed between brackets, `[` and
`]`.  (The brackets are meta-characters.)  A character class
matches a single character, which can be any of the characters in
the list.  For example, `[0123456789]` matches any one of
the digits 0 through 9.  The same thing could be expressed
as `(0|1|2|3|4|5|6|7|8|9)`, so once again
we have added only convenience, not new representational power.
For even more convenience, a hyphen can be included in a character
class to indicate a range of characters.  This means that
`[0123456789]` could also be written as `[0-9]`
and that the regular expression `[a-z]` will match any
single lowercase letter.  A character class can include multiple
ranges, so that `[a-zA-Z]` will match any letter, lower- or
uppercase.  The period (`.`) is a meta-character that will
match any single character, except (in most implementations)
for an end-of-line.
These notations can, of course, be used in more complex
regular expressions.  For example, `[A-Z][a-zA-Z]*`
will match any capitalized word, and `\(.*\)` matches
any string of characters enclosed in parentheses.

In most implementations, the meta-character `^` can be used in
a regular expression to match the beginning of a line of text, so that
the expression `^[a-zA-Z]+` will only match a word that
occurs at the start of a line.  Similarly, `$` is used
as a meta-character to match the end of a line.  Some implementations
also have a way of matching beginnings and ends of words.
Typically, `\b` will match such "word boundaries."
Using this notation, 
the pattern `\band\b` will match the string "and"
when it occurs as a word, but will not match the a-n-d
in the word "random."  We are going a bit beyond
basic regular expressions here: Previously, we only thought of
a regular expression as something that either will match
or will not match a given string in its entirety.   When
we use a regular expression for a search operation, however,
we want to find a _substring_ of a given string that
matches the expression.  The notations `^`,
`$` and `\b` put restrictions
on _where_ the matching substring can be located in the string.

When regular expressions are used in search-and-replace operations,
a regular expression is used for the search pattern.  A search is
made in a (typically long) string for a substring that matches the pattern,
and then the substring is replaced by a specified replacement
pattern.  The replacement pattern is not used for matching
and is not a regular expression.  However, it can be more than
just a simple string.  It's possible to include parts of the
substring that is being replaced in the replacement string.
The notations `\0`, `\1`, &hellip;, `\9`
are used for this purpose.  The first of these, `\0`,
stands for the entire substring that is being replaced.
The others are only available when parentheses are used in
the search pattern.  The notation `\1` stands for
"the part of the substring that matched the part of the
search pattern beginning with the first `(` in the
pattern and ending with the matching `)`."  Similarly,
`\2` represents whatever matched the part of the
search pattern between the second pair of parentheses, and so on.

Suppose, for example, that you would like to search for
a name in the form _last-name, first-name_ and
replace it with the same name in the form _first-name last-name_.
For example, "Reeves, Keanu" should be converted to "Keanu Reeves".
Assuming that names contain only letters,
this could be done using the search pattern `([A-Za-z]+), ([A-Za-z]+)`
and the replacement pattern `\2 \1`.  When the match is
made, the first `([A-Za-z]+)` will match "Reeves",[^1] 
so that in the replacement pattern, `\1` represents the
substring "Reeves". Similarly, `\2` will represent
"Keanu".  Note that the parentheses
are included in the search pattern _only_ to specify what parts
of the string are represented by `\1` and `\2`.
In practice, you might use `^([A-Za-z]+), ([A-Za-z])$`
as the search pattern to constrain it so that it will only 
match a complete line of text.  By using a "global" search-and-replace,
you could convert an entire file of names from one format to the other
in a single operation.

[^1]: Anyone who tells you the comma always belongs inside the quotation marks has never
had to punctuate a sentence like this&hellip;.

Regular expressions are a powerful and useful technique that
should be part of any computer scientist's toolbox.  This section
has given you a taste of what they can do, but you should check
out the specific capabilities of the regular expression implementation
in the tools and programming languages that you use.

## Exercises

1. The backslash is itself a meta-character.  Suppose that
you want to match a string that contains a backslash
character.  How do you suppose you would represent the backslash in
the regular expression?
<details>
  <summary>Answer</summary>

  Escape it with a backslash: `\\`.
</details>

2. Using the notation introduced in this section,
write a regular expression that could be used to match
each of the following:

   * Any sequence of letters (upper- or lowercase) that includes the letter Z (in uppercase).
   <details>
    <summary>Answer</summary>

     `[A-Za-z]*Z[A-Za-z]*`
   </details>

   * Any ten-digit telephone number written in the form `(xxx)xxx-xxxx`.
   <details>
    <summary>Answer</summary>

     `\([0-9][0-9][0-9]\)[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]`
   </details>

   * Any ten-digit telephone number _either_ in the form `(xxx)xxx-xxxx` or `xxx-xxx-xxxx`.
   <details>
    <summary>Answer</summary>

     `(\([0-9][0-9][0-9]\)|[0-9][0-9][0-9]-)[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]`
   </details>

   * A non-negative real number with an optional decimal part.  The expression should match numbers such as 17, 183.9999, 182., 0, 0.001, and 21333.2.
   <details>
    <summary>Answer</summary>

     `[0-9]+(.[0-9]*)`
   </details>

   * A complete line of  text that contains only letters.
   <details>
    <summary>Answer</summary>

     `^[A-Za-z]*$`
   </details>

   * A C++ style one-line comment consisting of `//` and all the following characters up to the end-of-line.
   <details>
    <summary>Answer</summary>

     `//.*$`
   </details>

3. Give a search pattern and a replace pattern that could
be used to perform the following conversions:

   * Convert a string that is enclosed in a pair of double quotes to the same string with the double quotes replaced by single quotes.
   <details>
    <summary>Answer</summary>

     Replace `"(.*)"` with `'\1'`.
   </details>

   * Convert ten-digit telephone numbers in the format `xxx-xxx-xxxx` to the format `(xxx)xxx-xxxx`.
   <details>
    <summary>Answer</summary>

     Replace `([0-9][0-9][0-9])-([0-9][0-9][0-9]-[0-9][0-9][0-9][0-9])` with `\(\1\)\2`.
   </details>

   * Convert C++ one-line comments, consisting of characters between `//` and end-of-line, to C style comments enclosed between `/*` and `*/`.
   <details>
    <summary>Answer</summary>

     Replace `//(.*)$` with `/\*\1/\*`.
   </details>

   * Convert any number of consecutive spaces and tabs to a single space.
   <details>
    <summary>Answer</summary>

     Replace `[ \t]+` with ` `.
   </details>

4. In some implementations of "regular expressions," the
notations `\1`, `\2`, and so on can occur
in a _search_ pattern.  For example, consider the search pattern
`^([a-zA-Z]).*\1$`.  Here, `\1` represents
a recurrence of the same substring that matched `[a-zA-Z]`,
the part of the pattern between the first pair of parentheses.
The entire pattern, therefore, will match a line of text that
begins and ends with the same letter.  Using this notation,
write a pattern that matches all strings in the language
$L=\{a^nba^n\,|\,n\ge0\}$.  (Later in this chapter, we will
see that $L$ is _not_ a regular language, so allowing the
use of `\1` in a "regular expression" means that it's
not really a regular expression at all!  This notation can add
a real increase in expressive power to the patterns that contain it.)
<details>
  <summary>Answer</summary>

  `(a*)b\1`
</details>
