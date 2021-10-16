---
id: overview
title: Overview of Functional Programming
---

There is a more extensive [introduction to FP](intro) later, but this section provides an early introduction to some of the concepts and tools that we will be using throughout the course.
The language we will be using is called [ReasonML](../reason), and there is an interpreter for it that can be embedded in any page of FoCSipedia.
When you see a block of code like this:
```reason edit
let answer = 6 * 7;
```
you can edit the code and press the Execute button (or hit CTRL-Enter) to run the modified code and see the output.

## Expressions and the Substitution Model

One of the core principles of functional programming is that programs are made up of **expressions** that may be evaluated.
They are composed of constants, variables, operators, and function calls, as in most languages, plus compound forms such as [blocks](#blocks-and-local-values) and `if` statements.
Unlike most languages you are likely to have worked with, there are no assignment statements&mdash;the only way to store a value in a variable is to put it there when the variable is created.
When you write `let answer = 6 * 7`, the variable `answer` is created and assigned the value of the expression `6 * 7`, which is `42`.
From then on, whenever you refer to that variable you will get the same value.

The **Substitution Model** arises from this fact about variables: since the value of an expression cannot change, you are free to "substitute equals for equals," just as in algebra.
If you see the expression `answer + 1`, you know that this is the same as `(6 * 7) + 1`.
This seemingly simple observation is the basis of many of the powerful techniques that are enabled by functional programming; you will learn more about this later, but just one application is in optimizing code to be run in parallel on a multi-processor machine&mdash;if you know that the substitution model holds, then the compiler has great freedom to rearrange when and where values are computed to maximize the use of the available processors.
In a language without the substitution model, where the value of a variable depends on the last time it was changed in an assignment statement, it is much harder to do this kind of optimization.

See if you can predict the output of the following code before you hit the Execute button:
```reason edit noexec
let a = 2;
let b = a + 1;
let c = if (a < b) { a * b } else { a * a + b };
let d = if (a > b) { a * b } else { a * a + b };
let e = c * d;
print_int(e);
```

## Blocks and Local Values

The syntax of ReasonML is intentionally designed to be familiar to programmers who are used to C-like languages (C, C++, Java, JavaScript, and many others).
As seen in the `if` statements above, curly braces may be used to surround subexpressions (such as `{ a * b }`).
Since everything is an expression, we could also have used parentheses around the subexpressions as usual.
However, inside curly braces we have an extra option: before getting to the expression itself, we may have a series of **local value definitions**.
For example:
```reason edit
let result = {
  let local1 = "Hello";
  let local2 = "World";
  local1 ++ " " ++ local2
};
print_string(result);
```
The expression in curly braces is called a **block**.
The value of the expression (which is then bound as the value of `result`) is the value of the last expression, `local1 ++ " " ++ local2` (note that `++` is the string concatenation operator in ReasonML).
Before it evaluates that expression, however, it first evaluates each of the `let` statements (in order), temporarily binding those values to the given local variables.
In the example, `local1` and `local2` are each bound to their corresponding string values, and then the final expression is evaluated relative to those variable bindings.

The names of variables within a block are completely invisible outside their block.
After the block is finished, it is as if those local bindings never took place.
This allows us to use local reasoning about the value of an expression, without having to know what might have happened in other blocks (which might have coincidentally used the same variable names).

Predict the result bound to the outer `x` in this code:
```reason edit noexec
let x = {
  let x = 3;
  x + x
} * {
  let x = 4;
  x + x
};
```

## Pure Functions and Arguments

So far, we have only talked about expressions and variables.
The heart of functional programming, of course, is the **function**.
In ReasonML, functions are just another type of value, along with integers, strings, _etc._
We write the function value that takes arguments `a`, `b`, `c` and returns the expression `e` using the syntax `(a, b, c) => e`.
This value is what is known as an **anonymous function**; to give it a name, we bind it to a variable, just like any other value:
```reason edit
let area = (width, height) => { width * height };
print_int(area(6, 7));
```
It is very common for the body to be a block expression, so we will always enclose it in curly braces for consistency.
In the second line of this example, after assigning the function value to `area`, we are able to use `area` as the name of a function just like the built-in functions (such as `print_int`).
Note that when ReasonML reports the bindings that result from this code, it says that `area` has the **type** `(int, int) => int`&mdash;we will talk more about [types](types) later, but for now you can just think of it as giving a picture of a typical use of the function: when applied to two `int` arguments, it returns an `int` result.

Since functions are just another kind of value, they may themselves be passed as arguments to functions, or returned as results; we will explore these **higher-order** functions later.

Since expressions are evaluated according to the substitution model, where we do not have to worry about a variable changing its value between the time is was declared (**bound**) and used, we know several very useful facts about functions:
* Functions in ReasonML are **pure**: the output only depends on the inputs, so calling a function twice with the same arguments will always produce the same result.
Furthermore, we know that calling a function will not have any **side-effects**&mdash;that is, it will not cause the bindings of any other variables to change.[^1]
If a program uses only pure functions, then the compiler is free to optimize code in various ways: it may rearrange when functions are called; it may combine multiple calls with the same arguments into one, or split a single call into several; and if it detects that the result of a function call is not needed, it may omit the call entirely.
None of these optimizations are guaranteed to preserve program behavior if a function is not known to be pure, which is the case in most non-functional languages.
* When an argument is passed to a function, the value (such as `6`) is bound to the parameter name (such as `width`) using the same mechanism as binding local variables in a block.
Therefore, the function call in the example above could be rewritten as
```reason edit
print_int({
  let width = 6;
  let height = 7;
  width * height
});
```

[^1]: Technically, some ReasonML functions _do_ have a side-effect, if they call input/output functions such as `print_int`.
That is, you can tell the difference between calling such a function once, twice, or not at all, by looking at the output that is printed to the console.
We will consider this sort of side-effect to be benign, however, and we will generally use such functions only in very controlled places in a program, or only when tracing or debugging code.

## Exercises