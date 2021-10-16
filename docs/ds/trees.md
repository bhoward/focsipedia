---
id: trees
title: Trees
---

## Binary Trees

A **binary tree** is a data structure that is either empty or it consists of a root node with three pieces of data: a value (often a number or a string), and two subtrees, one on the left and one on the right.
This can be expressed with the following recursive data type in ReasonML:
```reason edit
type tree('a) = EmptyTree | TreeNode(tree('a), 'a, tree('a));

let leaf = a => { TreeNode(EmptyTree, a, EmptyTree) };
let demo = TreeNode(leaf(1), 2, TreeNode(leaf(3), 4, leaf(5)));
```
We use a type variable `'a` as a parameter to specify the type of values in the tree.
The function `leaf` is a convenience, so that we can write `leaf(1)` for the tree with just the value 1 and two empty children instead of `TreeNode(EmptyTree, 1, EmptyTree)`.
Note the similarity to a list of type `list('a)`, which is either an empty list or a list node with a head value (of type `'a`) and a sublist of the rest of the elements (the tail).

The natural way to write a function that takes a binary tree is to use (surprise) Pattern Matching, which corresponds to doing structural induction over the construction of the tree.
For example, suppose we want to know how many nodes a tree has:
```reason edit
let rec size = t => {
  switch (t) {
  | EmptyTree => 0
  | TreeNode(left, _, right) => size(left) + 1 + size(right)
  }
};

size(EmptyTree);
size(leaf("hello"));
size(demo);
```

If we have a list with integer values, we might want to get the total of all the values in the tree:
```reason edit
let rec total = t => {
  switch (t) {
  | EmptyTree => 0
  | TreeNode(left, value, right) => total(left) + value + total(right)
  }
};

total(EmptyTree);
total(demo);
```
Note that type inference is able to figure out that the argument must be a `tree(int)` in this case, because we are using integer addition on the values.

A useful function on trees will be to have a visualization of the tree.
Here is a simple rendering of a tree with DPoodle (the second argument, `show`, is a function from `'a` to `string`, so that we can visualize trees with any type of value; note that the size of the box around the value will need to be changed if the strings are more than one character):
```reason edit
let rec showTree = (t, show) => {
  switch (t) {
  | EmptyTree => solid(Color("black"), circle(2.))
  | TreeNode(lt, value, rt) => {
      let showLeft = showTree(lt, show);
      let showRight = showTree(rt, show);
      let leftShift = right(showLeft) +. 10.;
      let rightShift = left(showRight) -. 10.;
      let leftLine = openPath([moveXY(0., 0.), lineXY(leftShift, -30.)]);
      let rightLine = openPath([moveXY(0., 0.), lineXY(rightShift, -30.)]);
      let leftImage = focus(TR, showLeft +++ focus(BL, leftLine));
      let rightImage = focus(TL, showRight +++ focus(BR, rightLine));
      let valueImage = stroke(Color("none"), fill(Color("black"), text(show(value))))
        +++ stroke(Color("black"), fill(Color("white"), square(20.)));
      valueImage +++ leftImage +++ rightImage
    }
  }
};

draw(showTree(demo, string_of_int));
```

### Traversals

Processing a binary tree is often expressed as a **traversal**.
There are several common tree traversals:

* **Preorder**: To process a non-empty tree, first process the value in its root node, then process the left child followed by the right child.
* **Inorder**: To process a non-empty tree, first process the left child, then the value in the root node, and finally the right child.
* **Postorder**: To process a non-empty tree, first process the left child, then the right child, and finish with the value in the root node.
* **Level order**: Process the value in the root node, then process the values in its children from left to right, then process its children's children from left to right, and so on, until there are no more nodes.

The first three traversals have very easy recursive implementations. For example, here is the preorder traversal, which takes a `tree('a)` and a function `process: 'a => unit`:
```reason edit
let rec preOrder = (t, process) => {
  switch (t) {
  | EmptyTree => ()
  | TreeNode(left, value, right) => {
      process(value);
      preOrder(left, process);
      preOrder(right, process)
    }
  }
};

preOrder(demo, print_int);
```
We will have to wait a bit to see how to do the level order traversal.

To see an interesting connection between traversals and programming languages, we will consider a variation on binary trees called **expression trees**.

### Expression Trees

An expression tree represents the structure of an expression.
This could be an arithmetic expression, such as $(a+b)\cdot c$, or a boolean expression such as $(p\lor q)\land r$; it also generalizes to expressions in a programming language, such as `if (a < b) c else d` in ReasonML.
For now we will limit our consideration to expressions with boolean operators and integer operands, which can be described by the following recursive type:
```reason edit
type expr = Const(int) | BinOp(expr, string, expr);

let sample = BinOp(BinOp(Const(1), "+", Const(2)), "*", Const(3));
```

Now we may define functions that perform preorder, inorder, and postorder traversals of expression trees to produce string representations of an expression:
```reason edit
let rec prefix = e => {
  switch (e) {
  | Const(n) => string_of_int(n)
  | BinOp(left, op, right) => Printf.sprintf("%s(%s, %s)", op, prefix(left), prefix(right))
  }
};

let rec infix = e => {
  switch (e) {
  | Const(n) => string_of_int(n)
  | BinOp(left, op, right) => Printf.sprintf("(%s %s %s)", infix(left), op, infix(right))
  }
};

let rec postfix = e => {
  switch (e) {
  | Const(n) => string_of_int(n)
  | BinOp(left, op, right) => Printf.sprintf("%s %s %s", postfix(left), postfix(right), op)
  }
};

prefix(sample);
infix(sample);
postfix(sample);
```

The preorder traversal of an expression tree gives the **prefix** form of the expression, where the operator comes in front of both of its operands.
With the extra parentheses and commas added above, you can see that this is our familiar function call notation: `+(1, 2)` is just the application of the addition function to the arguments `1` and `2`.

The inorder traversal of an expression tree gives the **infix** form of the expression, where the operator takes its usual position between its operands.
The extra parentheses are essential here, to avoid the ambiguity of whether `1 + 2 * 3` is an addition of `1` and `2 * 3`, or whether it is a multiplication of `1 + 2` by `3`.
In practical use we get around this by adopting conventions of **precedence**, saying for example that multiplication takes precedence over addition, so that `1 + 2 * 3` has an addition operator at the root.
In the sample expression tree, however, the multiplication is at the root, so we have to insert at least one pair of parentheses to get the correct expression: `(1 + 2) * 3`.

The postorder traversal of an expression tree gives the **postfix** form of the expression, which may not be as familiar.
Back in the Dark Ages[^1] of computing, Hewlett-Packard made a series of powerful calculators that became very popular, particularly with engineers.
At the time, calculators were not able to handle arbitrarily complex infix expressions (many of them didn't even have parentheses&hellip;), and HP's solution was elegant: use postfix instead of infix!
They referred to this as Reverse Polish Notation (RPN) in honor of the logician Jan Łukasiewicz (1878&ndash;1956), who invented postfix in the 1920's as a way to write logical expressions without parentheses.

[^1]: The 1970's. See https://www.hpmuseum.org/rpn.htm for more details on RPN.

The key to interpreting a postfix expression is to imagine maintaining a **stack** of values as you read from left to right. 
When you see a number, _push_ that value onto the stack.
When you see an operator, since it must be following its two operands, _pop_ two values from the stack, perform the operation, and _push_ the result back on the stack.
For the sample above, `1 2 + 3 *`, you can check that the resulting value on the stack at the end of the expression is the expected `9`.

More recent uses of postfix expressions and stack-based evaluation are the PostScript page description language used by many printers (which also forms the basis of the PDF document format), and the Java Virtual Machine code produced by the Java compiler.

## Exercises