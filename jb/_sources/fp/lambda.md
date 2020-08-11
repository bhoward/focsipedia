# Lambda Calculus

The section on [computability](../lang/computability) mentioned the **Church-Turing Thesis** that Turing machines
fully capture our notion of what may be computed.[^The thesis was explicitly named in 1952 by Church's student Stephen Kleene, also known for introducing
the star operator of regular expressions.] Part of the original justification for this belief is that Alan Turing
showed in 1936 that his machine model was equivalent in power to another model of computation being developed at around the
same time by Alonzo Church. This model is now known as the **lambda calculus**, and it forms the core of the theory of
functional programming.

As already mentioned in the [introductory section](intro/#fn-3) on functional programming, the symbol lambda ($\lambda$) is used to
indicate an anonymous function defined by an expression. For example, $\lambda x(x + 1)$ is the function that takes any argument $x$ and
returns that argument plus one; in ReasonML, this would be written `x => { x + 1 }`.
The fundamental operation in $\lambda$-calculus is known as **beta ($\beta$) reduction**. Given an expression
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
data types and operations with lambda terms. The development is based on the Church encoding as presented in the [Wikipedia article on the lambda calculus](https://en.wikipedia.org/wiki/Lambda_calculus); other encodings are possible.

## Church Numerals and Arithmetic

We may encode the natural numbers as follows:
$$
\begin{aligned}
   0&\equiv\lambda f.\lambda x.\; x\\
   1&\equiv\lambda f.\lambda x.\; f(x)\\
   2&\equiv\lambda f.\lambda x.\; f(f(x))\\
   &\ldots\\
   n&\equiv\lambda f.\lambda x.\; f^{(n)}(x)
\end{aligned}
$$

That is, the encoding of $n$ is a function that takes a function $f$ and a value $x$ and iteratively applies $f$ to $x$ a total of $n$ times.
The successor function, $\lambda y.\;y+1$, is then given by $\textrm{SUCC}\equiv\lambda y.\lambda f.\lambda x.\;f(y f x)$. Using this, we may define
addition by noticing that adding $y$ to $z$ is the same as taking the successor of $z$, $y$ times:
$$
\begin{aligned}
   \textrm{PLUS}&\equiv\lambda y.\lambda z.\;y\;\textrm{SUCC}\;z
\end{aligned}
$$

Similarly, since multiplication is repeated addition, we may define
$$
\begin{aligned}
   \textrm{MULT}&\equiv\lambda y.\lambda z.\;y\;(\textrm{PLUS}\;z)\;0
\end{aligned}
$$

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

If we had a function PRED that computed the "predecessor" ($\lambda x.\;x - 1$, except the predecessor of zero is zero because we are limiting our
arithmetic to the natural numbers for the moment), then we could similarly define subtraction as the iteration of PRED:
$$
\begin{aligned}
   \textrm{SUB}&\equiv\lambda y.\lambda z.\;z\;\textrm{PRED}\;y
\end{aligned}
$$
Note that $\textrm{SUB}\;m\;n$ is zero whenever $m\leq n$; this is often called the "modified minus" or **monus** operation.
The function PRED itself will be defined below.

## Booleans and Conditionals

Fundamentally, the role of a Boolean value is to make a distinction: true or false, yes or no, do this or else do that.
The encoding of a Boolean will therefore take two arguments, $a$ and $b$, and select one of them:[^Interestingly, the encoding
for FALSE is the same (up to $\alpha$-equivalence) as the encoding of zero&mdash;apparently C made the right choice in equating
zero and false!]
$$
\begin{aligned}
\textrm{TRUE}&\equiv\lambda a.\lambda b.\;a\\
\textrm{FALSE}&\equiv\lambda a.\lambda b.\;b
\end{aligned}
$$
Given these encodings, we may then define Boolean operations and the conditional as follows:
$$
\begin{aligned}
\textrm{AND}&\equiv\lambda p.\lambda q.\;p\;q\;p\\
\textrm{OR}&\equiv\lambda p.\lambda q.\;p\;p\;q\\
\textrm{NOT}&\equiv\lambda p.\;p\;\textrm{FALSE}\;\textrm{TRUE}\\
\textrm{IF}&\equiv\lambda p.\;p
\end{aligned}
$$
You should convince yourself that these operations are correct, by evaluating each possible combination:
$\textrm{AND}\;\textrm{FALSE}\;\textrm{FALSE}$, &hellip;.
Note that IF is trivial, since $\textrm{IF}\;p\;a\;b$ is the same as just applying $p\;a\;b$; essentially, the meaning of a Boolean
_is_ the conditional, just as the meaning of a natural number _is_ the ability to iterate a particular number of times.

The most basic operation on natural numbers that returns a Boolean is the predicate ISZERO, which takes a number and returns TRUE
if it is zero and FALSE otherwise. This is easy to implement as the $n$-fold iteration of the constant FALSE function, starting from the initial
value TRUE:
$$
\begin{aligned}
\textrm{ISZERO}&\equiv\lambda n.\;n\;(\lambda x.\;\textrm{FALSE})\;\textrm{TRUE}
\end{aligned}
$$
If $n$ is zero, then we just get TRUE. If $n$ is non-zero, then the constant FALSE function will be applied at least once, making the result FALSE.

Building on this, we get less-than-or-equal-to and equality predicates by using subtraction:
$$
\begin{aligned}
\textrm{LEQ}&\equiv\lambda m.\lambda n.\;\textrm{ISZERO}\;(\textrm{SUB}\;m\;n)\\
\textrm{EQ}&\equiv\lambda m.\lambda n.\;\textrm{AND}\;(\textrm{LEQ}\;m\;n)\;(\textrm{LEQ}\;n\;m)
\end{aligned}
$$

This encoding of Booleans is actually found in some pure object-oriented languages, such as Smalltalk.
The idea is that, if everything is an object, then the natural way to do anything is to call a method on an object.
The TRUE and FALSE objects have methods that ask them to choose one of two things; the method in TRUE is implemented to
return the first thing, while the implementation in FALSE returns the second. Here is what this might look like
implemented in Java:
```java
import java.util.function.Supplier;

public interface Boolean {
	public <T> T ifThenElse(Supplier<T> ifTrue, Supplier<T> ifFalse);

	public void ifThenElse(Runnable ifTrue, Runnable ifFalse);
}

public class True implements Boolean {
	public <T> T ifThenElse(Supplier<T> ifTrue, Supplier<T> ifFalse) {
		return ifTrue.get();
	}

	public void ifThenElse(Runnable ifTrue, Runnable ifFalse) {
		ifTrue.run();
	}
}

public class False implements Boolean {
	public <T> T ifThenElse(Supplier<T> ifTrue, Supplier<T> ifFalse) {
		return ifFalse.get();
	}

	public void ifThenElse(Runnable ifTrue, Runnable ifFalse) {
		ifFalse.run();
	}
}

public class Demo {
	public static void main(String[] args) {
		Boolean b1 = new True();
		Boolean b2 = new False();
		int result = b1.ifThenElse(() -> 42, () -> 37 / 0);
		b2.ifThenElse(() -> System.out.println("Boo!"), () -> System.out.println("The answer is " + result));
	}
}
```
The `Supplier<T>` and `Runnable` types are used because we want to pass in **thunks** to the `ifThenElse` method.
A thunk is an anonymous function that takes no arguments; it is used to delay the execution of a block of code
until we are ready to `get()` its value or `run()` it. This is needed in Java (and in almost all common programming
languages except Haskell and Scala) because otherwise `ifThenElse` would evaluate both of its arguments before performing
the method call; in the example, without using thunks, the call to `b1.ifThenElse` would result in a division by zero
exception, and the call to `b2.ifThenElse` would print `Boo!` as well as the correct answer.[^Side effects!]

## Pairs and Lists

Inspired by the object-oriented view of the Boolean encoding, one way to represent a pair of values is to construct a
function holding both values and expecting a "selector" that can retrieve either one of them on demand. Since the selector
is just a function that chooses which of the two elements to retrieve, it can be a Boolean. This leads to the following
encoding:
$$
\begin{aligned}
\textrm{PAIR}&\equiv\lambda a.\lambda b.\lambda s.\;s\;a\;b\\
\textrm{FIRST}&\equiv\lambda p.\;p\;\textrm{TRUE}\\
\textrm{SECOND}&\equiv\lambda p.\;p\;\textrm{FALSE}
\end{aligned}
$$
You should check that if $p\equiv\textrm{PAIR}\;1\;2$, then $\textrm{FIRST}\;p$ reduces to 1, while $\textrm{SECOND}\;p$ reduces to 2.

Using pairs, we may build up lists with the following two helpers:
$$
\begin{aligned}
\textrm{NIL}&\equiv\lambda s.\;\textrm{TRUE}\\
\textrm{ISNIL}&\equiv\lambda p.\;p\;(\lambda a.\lambda b.\;\textrm{FALSE})
\end{aligned}
$$
The list $[1, 2, 3]$ is encoded as $\textrm{PAIR}\;1\;(\textrm{PAIR}\;2\;(\textrm{PAIR}\;3\;\textrm{NIL}))$.
Given a list $\ell$, $\textrm{ISNIL}\;\ell$ returns TRUE if the list is empty and FALSE otherwise.
If $\ell$ is non-empty, then $\textrm{FIRST}\;\ell$ extracts its head and $\textrm{SECOND}\;\ell$ its tail.

We may also use pairs to construct the promised function PRED.[^This version of the predecessor function was discovered by Stephen Kleene,
reportedly while visiting the dentist.] Consider the function
$F\equiv\lambda p.\;\textrm{PAIR}\;(\textrm{SECOND}\;p)\;(\textrm{SUCC}\;(\textrm{SECOND}\;p))$.
Then $F\;(\textrm{PAIR}\;m\;n)=\textrm{PAIR}(n, n+1)$. If you iterate $F$ a non-zero number $n$ times and apply it to $\textrm{PAIR}\;0\;0$, then the
result will be $\textrm{PAIR}\;(n-1)\;n$ (prove this by induction on $n$). Therefore, we may define PRED as:
$$
\begin{aligned}
\textrm{PRED}&\equiv\lambda n.\;\textrm{FIRST}\;(n\;F\;(\textrm{PAIR}\;0\;0))
\end{aligned}
$$
This has the disadvantage that computing the predecessor of $n$ takes $O(n)$ time, but no one said the Church encodings were efficient.

## Recursion

Consider the recursive definition of the factorial function in ReasonML:

```reason edit
let rec fact = n => {
  if (n == 0) {
    1
  } else {
    n * fact(n - 1)
  }
};
```

The body of the function needs to have access to the definition of `fact` itself; this is the point of the `rec` qualifier with `let`.
If we could provide the definition of `fact` as another argument to the function, then we could express factorial with the following
"template":

```reason edit
let fact_template = f => n => {
  if (n == 0) {
    1
  } else {
    n * f(n - 1)
  }
};
```

This template describes how we could define `fact` if we already had the `fact` function: `fact = fact_template(fact)`.
To break out of the circularity of this definition, what we really need is a way to solve the equation `f = fact_template(f)` for `f`; such a
solution is known as a **fixed point** of `fact_template`.[^Another way to view this is that each application of `fact_template` takes an imperfect
approximation to factorial and produces a better approximation. Finding the fixed point is just taking the limit of this series of approximations.]
A remarkable fact about the lambda calculus is that there is a term that will find such a fixed point:
$$
\begin{aligned}
\textrm{FIX}&\equiv\lambda f.\;(\lambda x.\;f\;(x\;x))\;(\lambda x.\;f\;(x\;x))
\end{aligned}
$$
Observe what happens when we reduce $\textrm{FIX}\;g$:
$$
\begin{aligned}
\textrm{FIX}\;g&=(\lambda x.\;g\;(x\;x))\;(\lambda x.\;g\;(x\;x))\\
&=g((\lambda x.\;g\;(x\;x))\;(\lambda x.\;g\;(x\;x)))
\end{aligned}
$$
That is, $\textrm{FIX}\;g=g(\textrm{FIX}\;g)$, so $f=\textrm{FIX}\;g$ is a solution to the equation $f=g(f)$!

Using FIX, we may define the factorial function (and by this point you should be convinced that we may define any pure function that we could have
written in ReasonML) as follows:
$$
\begin{aligned}
\textrm{FACT}&\equiv\textrm{FIX}\;(\lambda f.\lambda n.\;\textrm{IF}\;(\textrm{ISZERO}\;n)\;1\;(\textrm{MULT}\;n\;(f\;(\textrm{PRED}\;n))))
\end{aligned}
$$
