---
id: lambda
title: Lambda Calculus
---

The section on [computability](../lang/computability) mentioned the **Church-Turing Thesis** that Turing machines
fully capture our notion of what may be computed.[^The thesis was explicitly named in 1952 by Church's student Stephen Kleene, also known for introducing
the star operator of regular expressions.] Part of the original justification for this belief is that Alan Turing
showed in 1936 that his machine model was equivalent in power to another model of computation being developed at around the
same time by Alonzo Church. This model is now known as the **lambda calculus**, and it forms the core of the theory of
functional programming.

As already mentioned in the [introductory section](intro/#fn-3) on functional programming, the symbol lambda ($\lambda$) is used to
indicate an anonymous function defined by an expression. For example, $\lambda x(x + 1)$ is the function that takes any argument $x$ and
returns that argument plus one. The fundamental operation in $\lambda$-calculus is known as **beta ($\beta$) reduction**. Given an expression
that contains a $\lambda$ function applied to an argument, $\beta$ reduction allows the application to be replaced by the body of the function
with the argument substituted for the variable.[^There is also a notion of **alpha ($\alpha$) equivalence**, which allows us to uniformly rename the bound
parameter throughout a function, so that $\lambda x(x + 1)$ is the same function as $\lambda y(y + 1)$. This is important for precise theoretical work, but
we will be able to ignore the issue.]

For example, $(\lambda x(x+1))(41)$ may be reduced to the expression $41+1$. To avoid an explosion of parentheses, we will often write a lambda function
with a dot after the parameter name, meaning that the body of the function extends as far as possible to the right within the surrounding expression.
We will also often omit the parentheses around the argument in a function application, writing $f\;x$ instead of $f(x)$.
When a term is applied to multiple arguments we will associate the application to the left, so that $M\;N\;P$ is the same as $((M\;N)\;P)$.
With these conventions, the previous example becomes $(\lambda x.\;x+1)\;41$.

Formally, the lambda calculus deals with terms of just three forms:
   * variables ($x$, $y$, &hellip;),
   * applications ($M\; N$, where $M$ and $N$ are arbitrary lambda terms), and
   * abstractions ($\lambda x.\;M$, where $x$ is a variable and $M$ is a lambda term).
Although the example above used additional symbols such as $+$ and $41$, these are not necessary. The remainder of this section will show how to encode common
data types and operations with lambda terms.

## Church Numerals and Arithmetic

We may encode the natural numbers as follows:
   * $0\equiv\lambda f.\lambda x.\; x$
   * $1\equiv\lambda f.\lambda x.\; f(x)$
   * $2\equiv\lambda f.\lambda x.\; f(f(x))$
   * &hellip;
   * $n\equiv\lambda f.\lambda x.\; f^{(n)}(x)$

That is, the encoding of $n$ is a function that takes a function $f$ and a value $x$ and iteratively applies $f$ to $x$ a total of $n$ times.
The successor function, $\lambda y.\;y+1$, is then given by $\textrm{SUCC}\equiv\lambda y.\lambda f.\lambda x.\;f(y f x)$. Using this, we may define
addition by noticing that adding $y$ to $z$ is the same as taking the successor of $z$, $y$ times:
   * $\textrm{PLUS}\equiv\lambda y.\lambda z.\;y\;\textrm{SUCC}\;z$

Similarly, since multiplication is repeated addition, we may define
   * $\textrm{MULT}\equiv\lambda y.\lambda z.\;y\;(\textrm{PLUS}\;z)\;0$

For example,
$$
\begin{aligned}
\textrm{MULT}\;6\;7&=(\lambda y.\lambda z.\;y\;(\textrm{PLUS}\;z)\;0)\;6\;7\\
                   &=(\lambda z.\;6\;(\textrm{PLUS}\;z)\;0)\;7\\
                   &=6\;(\textrm{PLUS}\;7)\;0\\
                   &=(\textrm{PLUS}\;7)^{(6)}(0)\\
                   &=(\textrm{PLUS}\;7)^{(5)}(\textrm{PLUS}\;7\;0)\\
                   &=(\textrm{PLUS}\;7)^{(5)}(7)\\
                   &=(\textrm{PLUS}\;7)^{(4)}(14)\\
                   &=\cdots\\
                   &=\textrm{PLUS}\;7\;35\\
                   &=42.
\end{aligned}
$$

## Booleans and Conditionals

## Pairs and Lists

## Recursion
