---
id: styleGuide
title: Style Guide
sidebar_label: Style Guide
---

You can write content using [GitHub-flavored Markdown syntax](https://github.github.com/gfm/).

## Markdown Syntax

To serve as an example page when styling markdown based Docusaurus sites.

## Headers

# H1 - Create the best documentation

## H2 - Create the best documentation

### H3 - Create the best documentation

#### H4 - Create the best documentation

##### H5 - Create the best documentation

###### H6 - Create the best documentation

```
# H1 - Create the best documentation

## H2 - Create the best documentation

### H3 - Create the best documentation

#### H4 - Create the best documentation

##### H5 - Create the best documentation

###### H6 - Create the best documentation
```

---

## Emphasis

Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~

```
Emphasis, aka italics, with *asterisks* or _underscores_.

Strong emphasis, aka bold, with **asterisks** or __underscores__.

Combined emphasis with **asterisks and _underscores_**.

Strikethrough uses two tildes. ~~Scratch this.~~
```

---

## Lists

1. First ordered list item
1. Another item
   * Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
   1. Ordered sub-list
1. And another item.

   You can have properly indented paragraphs within list items.
   Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

   To have a line break without a paragraph, you will need to use two trailing spaces.  
   Note that this line is separate, but within the same paragraph.  
   (This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

1. Unordered list can use
   * asterisks
   - Or minuses
   + Or pluses

```
1. First ordered list item
1. Another item
···* Unordered sub-list.
1. Actual numbers don't matter, just that it's a number
···1. Ordered sub-list
1. And another item.

···You can have properly indented paragraphs within list items.
···Notice the blank line above, and the leading spaces (at least one, but we'll use three here to also align the raw Markdown).

···To have a line break without a paragraph, you will need to use two trailing spaces.··
···Note that this line is separate, but within the same paragraph.··
···(This is contrary to the typical GFM line break behaviour, where trailing spaces are not required.)

1. Unordered list can use
···* asterisks
···- Or minuses
···+ Or pluses
```

---

## Links

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs will automatically get turned into links. http://www.example.com for example.

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com

```
[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs will automatically get turned into links. http://www.example.com for example.

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org
[1]: http://slashdot.org
[link text itself]: http://www.reddit.com
```

---

## Images

Here's our logo (hover to see the title text):

Inline-style: ![alt text](/img/SmartFoxLogoSmall.png 'Smart fox')

Reference-style: ![alt text][logo]

HTML-style (allows scaling): <img src="https://bhoward.github.io/focsipedia/img/SmartFoxLogoSmall.png" width="10%" title="Smart fox" />

[logo]: https://bhoward.github.io/focsipedia/img/SmartFoxLogoSmall.png 'Smart fox'

```
Here's our logo (hover to see the title text):

Inline-style: ![alt text](/img/SmartFoxLogoSmall.png 'Smart fox')

Reference-style: ![alt text][logo]

HTML-style (allows scaling): <img src="https://bhoward.github.io/focsipedia/img/SmartFoxLogoSmall.png" width="10%" title="Smart fox" />

[logo]: https://bhoward.github.io/focsipedia/img/SmartFoxLogoSmall.png 'Smart fox'
```
---

## Code

```js
var s = 'JavaScript syntax highlighting';
alert(s);
```

```java
String s = "Java syntax highlighting";
System.out.println(s);
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

<pre>
Use a &lt;pre&gt; tag if you want tags to be <b>rendered</b>.
</pre>

```js
function highlightMe() {
  // highlight-next-line
  console.log('This line is highlighted!');

  // highlight-start
  for (let i = 0; i < 10; i++) {
    console.log('This range of lines is highlighted');
  }
  // highlight-end
}
```

```js showLineNumbers
function demo() {
  console.log('Optionally showing line numbers');
}
```

```scala
/* This is a sample of Scala code */
val a = 6
val b = a * 7
```

```scala mdoc
/* This is the same sample, but executed by mdoc */
val a = 6
val b = a * 7
```

```scala mdoc:silent
/* With the silent modifier, the code is executed but output is not shown */
val c = "Hello"
```

```scala mdoc:invisible
/* With the invisible modifier, the code is executed but nothing is shown */
val d = " World"
```

```scala mdoc
/* Results from previous blocks on the page are available */
println(c + d)
```

---
Source for the above code blocks (surrounded with _four_ backticks):

````
```js
var s = 'JavaScript syntax highlighting';
alert(s);
```

```java
String s = "Java syntax highlighting";
System.out.println(s);
```

```
No language indicated, so no syntax highlighting.
But let's throw in a <b>tag</b>.
```

<pre>
Use a &lt;pre&gt; tag if you want tags to be <b>rendered</b>.
</pre>

```js
function highlightMe() {
  // highlight-next-line
  console.log('This line is highlighted!');

  // highlight-start
  for (let i = 0; i < 10; i++) {
    console.log('This range of lines is highlighted');
  }
  // highlight-end
}
```

```js showLineNumbers
function demo() {
  console.log('Optionally showing line numbers');
}
```

```scala
/* This is a sample of Scala code */
val a = 6
val b = a * 7
```

```scala mdoc
/* This is the same sample, but executed by mdoc */
val a = 6
val b = a * 7
```

```scala mdoc:silent
/* With the silent modifier, the code is executed but output is not shown */
val c = "Hello"
```

```scala mdoc:invisible
/* With the invisible modifier, the code is executed but nothing is shown */
val d = " World"
```

```scala mdoc
/* Results from previous blocks on the page are available */
println(c + d)
```
````
---

## Math

Write inline math equations by wrapping LaTeX equations between $:

Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.

For equation block or display mode, use line breaks and $$:

$$
I = \int_0^{2\pi} \sin(x)\,dx
$$

```
Write inline math equations by wrapping LaTeX equations between $:

Let $f\colon[a,b]\to\R$ be Riemann integrable. Let $F\colon[a,b]\to\R$ be
$F(x)=\int_{a}^{x} f(t)\,dt$. Then $F$ is continuous, and at all $x$ such that
$f$ is continuous at $x$, $F$ is differentiable at $x$ with $F'(x)=f(x)$.

For equation block or display mode, use line breaks and $$:

$$
I = \int_0^{2\pi} \sin(x)\,dx
$$
```

---

## Diagrams

[Mermaid](https://mermaid.js.org/intro/):

```mermaid
graph TD;
  A(($$a$$));
  B((b));
  C((c));
  D(($$\bullet$$));
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

```mermaid
stateDiagram-v2
  direction LR
  s0 : 0
  s1 : 1
  s2 : 2
  [*] --> s0
  s0 --> s0: 0
  s0 --> s1: 1
  s1 --> s2: 0
  s1 --> s0: 1
  s2 --> s1: 0
  s2 --> s2: 1
```

[Graphviz](https://www.graphviz.org/doc/info/lang.html):

```dot
digraph G { Hello -> World }
```

````
[Mermaid](https://mermaid.js.org/intro/):

```mermaid
graph TD;
  A(($$a$$));
  B((b));
  C((c));
  D(($$\bullet$$));
  A-->B;
  A-->C;
  B-->D;
  C-->D;
```

```mermaid
stateDiagram-v2
  direction LR
  s0 : 0
  s1 : 1
  s2 : 2
  [*] --> s0
  s0 --> s0: 0
  s0 --> s1: 1
  s1 --> s2: 0
  s1 --> s0: 1
  s2 --> s1: 0
  s2 --> s2: 1
```

[Graphviz](https://www.graphviz.org/doc/info/lang.html):

```dot
digraph G { Hello -> World }
```
````

---

## Tables

Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
_Still_ | `renders` | **nicely**
1 | 2 | 3

```
Colons can be used to align columns.

| Tables        |      Are      |   Cool |
| ------------- | :-----------: | -----: |
| col 3 is      | right-aligned | \$1600 |
| col 2 is      |   centered    |   \$12 |
| zebra stripes |   are neat    |    \$1 |

There must be at least 3 dashes separating each header cell. The outer pipes (|) are optional, and you don't need to make the raw Markdown line up prettily. You can also use inline Markdown.

Markdown | Less | Pretty
--- | --- | ---
_Still_ | `renders` | **nicely**
1 | 2 | 3
```

---

## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps.
Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone.
Oh, you can _put_ **Markdown** into a blockquote.

```
## Blockquotes

> Blockquotes are very handy in email to emulate reply text.
This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps.
Oh boy let's keep writing to make sure this is long enough to actually wrap for everyone.
Oh, you can _put_ **Markdown** into a blockquote.
```

---

## Inline HTML

<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>

```
<dl>
  <dt>Definition list</dt>
  <dd>Is something people use sometimes.</dd>

  <dt>Markdown in HTML</dt>
  <dd>Does *not* work **very** well. Use HTML <em>tags</em>.</dd>
</dl>
```

---

## Line Breaks

Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...  
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.

```
Here's a line for us to start with.

This line is separated from the one above by two newlines, so it will be a _separate paragraph_.

This line is also a separate paragraph, but...··
This line is only separated by a single newline, so it's a separate line in the _same paragraph_.
```
---

## Warnings, etc.

:::warning
This is a warning message. Other options include caution, note, important, and tip.
:::

:::tip Custom Title
You can include a custom title on your callout messages.
:::

```
:::warning
This is a warning message. Other options include caution, note, important, and tip.
:::

:::tip Custom Title
You can include a custom title on your callout messages.
:::
```

## Footnotes

Use brackets and a caret around the footnote marker.[^1]
The footnote marker should be a number in the proper sequence.[^2]

[^1]: Define the footnote separately, just like reference links.
[^2]: This may be a bug/misfeature in the markdown processor.

```
Use brackets and a caret around the footnote marker.[^1]
The footnote marker should be a number in the proper sequence.[^2]

[^1]: Define the footnote separately, just like reference links.
[^2]: This may be a bug/misfeature in the markdown processor.
```