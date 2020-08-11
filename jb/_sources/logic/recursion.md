# Recursion and Induction

(Content adapted from Critchlow & Eck)

In computer programming, there is a technique called [**recursion**](./recursion)
that is closely related to induction. In a computer program, a
**subroutine** is a named sequence of instructions for performing
a certain task. When that task needs to be performed in a program,
the subroutine can be **called** by name.
A typical way to organize a program is to break down a large task
into smaller, simpler subtasks by calling subroutines to perform
each of the subtasks. A subroutine can perform its task by
calling other subroutines to perform subtasks of the overall task.
A subroutine can also call itself. That is, in the process of
performing some large task, a subroutine can call itself to perform
a subtask. This is known as recursion, and a subroutine that does
this is said to be a **recursive subroutine**. Recursion is
appropriate when a large task can be broken into subtasks where
some or all of the subtasks are smaller, simpler versions of the
main task.

Like induction, recursion is often considered to be a "hard"
topic by students, and some professors perpetuate this by
referring to it as a "trick," and implying that some sort of
magic is needed for it to work. However, if you are comfortable
with solving problems by breaking them into smaller pieces, then
recursion (and induction) can be viewed as an obvious extension
of this approach where some of the pieces break into smaller but
similar pieces. As long as you understand how to break up that
kind of piece further, the only task left is to show that you can
handle the smallest possible pieces.

## Factorial

A simple example of a recursive subroutine is a function that
computes $n!$ for a non-negative integer $n$. $n!$, which is read "$n$ factorial,"
is defined as follows:

$$ \begin{array}{l}
0! = 1\\
n! = \prod_{i=1}^n\,i\text{\qquad for $n>0$}
\end{array} $$

For example, $5!=1\cdot2\cdot3\cdot4\cdot5=120$. Note that for $n>1$,

$$ \begin{array}{l}
n! = \prod_{i=1}^n\,i = \left(\prod_{i=1}^{n-1}\,i\right)\cdot n = \big((n-1)!\big)\cdot n
\end{array} $$

It is also true that $n!=\big((n-1)!\big)\cdot n$ when $n=1$. This observation
makes it possible to write a recursive function to compute $n!$.

Here is how we might write it in Java:
```java
/**
 * Compute n!.
 * Precondition: n >= 0
 */
int factorial(int n) {
   int answer;
   if (n == 0) {
      answer = 1;
   } else {
      answer = factorial(n - 1) * n;
   } 
   return answer;
}
```

Here is an equivalent program in ReasonML:[^We will learn more about ReasonML
later, but here are two quick observations. A function value is created with
the syntax `x => {...}`, where `x` is the parameter name that allows us to
access the function argument in the body `{...}`. We assign this function value
to the name `factorial` with the `let` statement; by saying `let rec`, we allow
the right-hand side of the statement to refer to `factorial` even though we are
just in the process of defining it.]
```reason edit
let rec factorial = n => {
  if (n == 0) {
    1
  } else {
    factorial(n - 1) * n
  }
};

print_int(factorial(5));
```

In order to compute _factorial_($n$) for $n>0$, this function
first computes _factorial_($n-1$) by calling itself recursively.
The answer from that computation is then multiplied by $n$ to give the
value of $n!$. The recursion has a base case, namely the case when
$n=0$. For the base case, the answer is computed directly rather
than by using recursion. The base case prevents the recursion from
continuing forever, in an infinite chain of recursive calls.

Now, as it happens, recursion is not the best way to compute $n!$.
It can be computed more efficiently using a loop. Furthermore,
except for small values of $n$, the value of $n!$ is outside the
range of numbers that can be represented as 32-bit _ints_.
However, ignoring these problems, the _factorial_ function
provides a nice first example of the interplay between recursion and
induction. We can use induction to prove that _factorial_($n$)
does indeed compute $n!$ for $n\ge 0$. (In the proof, we pretend that
the data type _int_ is not limited to 32 bits. In reality,
the function only gives the correct answer when the answer can be
represented as a 32-bit binary number.)

> **Theorem:**
Assume that the data type _int_ can represent arbitrarily large
integers. Under this assumption, the _factorial_ function
defined above correctly computes $n!$ for any natural number $n$.

> **Proof:** 
Let $P(n)$ be the statement "_factorial_($n$) correctly computes $n!$."
We use induction to prove that $P(n)$ is true for all natural numbers $n$.
>
**Base case:** In the case $n=0$, the _if_ statement in the function
assigns the value 1 to the answer. Since 1 is the correct value of
$0!$, _factorial_(0) correctly computes $0!$.
>
**Inductive case:** Let $k$ be an arbitrary natural number, and assume that
$P(k)$ is true. From this assumption, we must show that $P(k+1)$ is true.
The assumption is that _factorial_($k$) correctly computes $k!$,
and we want to show that _factorial_($k+1$) correctly computes
$(k+1)!$.
>
When the function computes _factorial_($k+1$), the value of
the parameter $n$ is $k+1$.
Since $k+1>0$, the _if_ statement in the function computes the
value of _factorial_($k+1$) by applying the computation
_factorial_$(k)*(k+1)$. We know, by the induction hypothesis,
that the value computed by _factorial_($k$) is $k!$.
It follows that the value computed by _factorial_($k+1$)
is $(k!)\cdot(k+1)$. As we observed above, for any $k+1>0$,
$(k!)\cdot(k+1)=(k+1)!$. We see that _factorial_($k+1$)
correctly computes $(k+1)!$. This completes the induction.

In this proof, we see that the base case of the induction corresponds
to the base case of the recursion, while the inductive case corresponds
to a recursive subroutine call. A recursive subroutine call,
like the inductive case of an induction, reduces a problem to
a "simpler" or "smaller" problem, which is closer to the base
case.

## Towers of Hanoi

Another standard example of recursion is the Towers of Hanoi problem.
Let $n$ be a positive integer. Imagine a set of $n$ disks of decreasing
size, piled up in order of size, with the largest disk on the bottom
and the smallest disk on top. The problem is to move this tower of
disks to a second pile, following certain rules: Only one disk
can be moved at a time, and a disk can only be placed on top of
another disk if the disk on top is smaller. While the disks are
being moved from the first pile to the second pile, disks can be
kept in a third, spare pile.  All the disks must at all times be
in one of the three piles, except for a disk being moved. For example,
if there are two disks,
the problem can be solved by the following sequence of moves:

1. Move disk 1 from pile 1 to pile 3
2. Move disk 2 from pile 1 to pile 2
3. Move disk 1 from pile 3 to pile 2

A simple recursive subroutine can be used to write out the list
of moves to solve the problem for any value of $n$. The recursion is
based on the observation that for $n>1$, the problem can be
solved as follows: Move $n-1$ disks from pile number 1 to pile number 3
(using pile number 2 as a spare). Then move the largest disk, disk number $n$,
from pile number 1 to pile number 2. Finally, move the $n-1$ disks from
pile number 3 to pile number 2, putting them on top of the $n^{th}$ disk
(using pile number 1 as a spare). In both cases, the problem of
moving $n-1$ disks is a smaller version of the original problem and
so can be done by recursion. Here is the subroutine, written in Java:
```java
/**
 * List the moves for moving n disks from pile number A
 * to pile number B, using pile number C as a spare.
 * Precondition: n > 0
 */
void Hanoi(int n, int A, int B, int C) {
   if (n == 1) {
      System.out.println("Move disk 1 from pile " + A + " to pile " + B);
   } else {
      Hanoi(n - 1, A, C, B);
      System.out.println("Move disk " + n + " from pile " + A + " to pile " + B);
      Hanoi(n - 1, C, B, A);
   }
}
```

Again, here is equivalent code in ReasonML:[^Just about the only difference here
from the Java, apart from the syntax for defining a function and the use of the
`printf` function for output, is that ReasonML requires variables to start with
lower-case letters. Since functions are also stored in variables, this also applies
to function names.]
```reason edit
let rec hanoi = (n, a, b, c) => {
  if (n == 1) {
    Printf.printf("Move disk %d from pile %d to pile %d\n", n, a, b);
  } else {
    hanoi(n - 1, a, c, b);
    Printf.printf("Move disk %d from pile %d to pile %d\n", n, a, b);
    hanoi(n - 1, c, b, a);
  }
};

hanoi(2, 1, 2, 3);
```

We can use induction to prove that this subroutine does in
fact solve the Towers of Hanoi problem.

> **Theorem:** 
The sequence of moves printed by the _Hanoi_ subroutine as given above
correctly solves the Towers of Hanoi problem for any integer $n\ge1$.

> **Proof:** 
We prove by induction that whenever $n$ is a positive integer and
$A$, $B$, and $C$ are the numbers 1, 2, and 3 in some order, 
the subroutine call _Hanoi_($n,A,B,C$)
prints a sequence of moves that will move $n$ disks from pile $A$ to
pile $B$, following all the rules of the Towers of Hanoi problem.
>
**Base case:** In the base case, $n=1$,
the subroutine call _Hanoi_($1,A,B,C$) prints out the single
step "Move disk 1 from pile A to pile B," and this move does solve
the problem for 1 disk.
>
**Inductive case:** Let $k$ be an arbitrary positive integer, and suppose that
_Hanoi_($k,A,B,C$) correctly solves the problem 
of moving the $k$ disks from pile $A$ to pile $B$ using pile $C$ as the spare,
whenever $A$, $B$, and $C$ are the numbers 1, 
2, and 3 in some order. We need to show that 
_Hanoi_($k+1,A,B,C$) correctly solves the problem for
$k+1$ disks. Since $k+1>1$, _Hanoi_($k+1,A,B,C$) begins by
calling _Hanoi_($k,A,C,B$). By the induction hypothesis,
this correctly moves $k$ disks from pile $A$ to pile $C$. Disk number
$k+1$ is not moved during this process.
At that point, pile $C$ contains the $k$ smallest disks and
pile $A$ still contains the $(k+1)^{st}$ disk, which has not
yet been moved. So the next move printed by the subroutine,
"Move disk $(k+1)$ from pile A to pile B," is legal because pile $B$ is empty.
Finally, the subroutine calls _Hanoi_($k,C,B,A$),
which, by the induction hypothesis, correctly moves the $k$ smallest disks from 
pile $C$ to pile $B$, putting
them on top of the $(k+1)^{\text{st}}$ disk, which does not move during this process.
At that point, all $(k+1)$
disks are on pile $B$, so the problem for
$k+1$ disks has been correctly solved.

## Binary Trees

Recursion is often used with linked data structures, which are
data structures that are constructed by linking several objects
of the same type together with pointers. (If you don't already
know about objects and pointers, you will not be able to follow
the rest of this section.) For an example, we'll look at
the data structure known as a **binary tree**.
A binary tree consists of nodes linked together in a tree-like
structure. The nodes can contain any type of data, but we will
consider binary trees in which each node contains an integer.
A binary tree can be empty, or it can consist of a node (called
the **root** of the tree) and two smaller binary trees (called the
**left subtree** and the **right subtree** of the tree).
You can already see the recursive structure: A tree can contain
smaller trees. In Java, the nodes of a tree can be represented
by objects belonging to the class
```java
class BinaryTreeNode {
   int item;   // An integer value stored in the node.
   BinaryTreeNode left;   // Pointer to left subtree.
   BinaryTreeNode right;  // Pointer to right subtree.
}
```
An empty tree is represented by a pointer that has the special
value **null**. If _root_ is
a pointer to the root node of a tree, then _root.left_
is a pointer to the left subtree and _root.right_ is a
pointer to the right subtree. Of course, both _root.left_
and _root.right_ can be _null_ if the corresponding
subtree is empty. Similarly, _root.item_ is a name
for the integer in the root node.

Here is the corresponding definition of a binary tree in ReasonML:
```reason demo
type tree('a) =
  | Empty
  | Node(tree('a), int, tree('a))
```
Instead of _null_, we use an explicit constructor value for empty
trees, `Empty`. To construct a tree node from subtrees `left` and
`right`, with integer value `item`, we use the constructor
`Node(left, item, right)`. We will see below how to extract these
fields from the node.

Let's say that we want a function that will find the
sum of all the integers in all the nodes of a binary tree.
We can do this with a simple recursive function. The base
case of the recursion is an empty tree. Since there are no
integers in an empty tree, the sum of the integers in an
empty tree is zero. For a non-empty tree, we can use recursion
to find the sums of the integers in the left and right subtrees,
and then add those sums to the integer in the root node of the
tree. In Java, this can be expressed as follows:
```java
/**
 * Find the sum of all the integers in the tree that has
 * the given root.
 */
int TreeSum(BinaryTreeNode root) {
   int answer;
   if (root == null) {  // The tree is empty.
      answer = 0;
   } else {
      answer = TreeSum(root.left);
      answer = answer + TreeSum(root.right);
      answer = answer + root.item;
   }
   return answer;
}
```

Here is the corresponding function in ReasonML. We are using the
**pattern matching** switch statement to decide whether we have an
empty tree or not, and to extract the _left_, _item_, and _right_
fields if the tree is not empty:
```reason edit
let rec treeSum = root => {
  switch (root) {
  | Empty => 0
  | Node(left, item, right) =>
      treeSum(left) + item + treeSum(right)
  }
};

let example = Node(Node(Empty, 1, Empty), 2, Node(Empty, 3, Empty));
print_int(treeSum(example));
```

We can use the second ("strong") form of the principle of mathematical induction
to prove that this function is correct.

> **Theorem:** 
The function _TreeSum_, defined above, correctly
computes the sum of all the integers in a binary tree.

> **Proof:** 
We use induction on the number of nodes in the tree.
Let $P(n)$ be the statement "_TreeSum_
correctly computes the sum of the nodes in any binary tree
that contains exactly $n$ nodes." We show that $P(n)$ is true
for every natural number $n$.
>
**Base case:** Consider the case $n=0$. A tree with zero nodes is empty,
and an empty tree is represented by a _null_ pointer.
In this case, the _if_ statement in the definition of
_TreeSum_ assigns the value 0 to the answer, and this is
the correct sum for an empty tree. So, $P(0)$ is true.
>
**Induction case:** Let $k$ be an arbitrary natural number, with $k>0$.
Suppose we already
know $P(x)$ for each natural number $x$ with $0\le x < k$. That is,
_TreeSum_ correctly computes the sum of all the integers in
any tree that has fewer than $k$ nodes. We must show that it follows
that $P(k)$ is true, that is, that _TreeSum_ works for 
a tree with $k$ nodes. Suppose that _root_ is a pointer
to the root node of a tree that has a total of $k$ nodes.
Since the root node counts as a node, that leaves a total of
$k-1$ nodes for the left and right subtrees, so each subtree
must contain fewer than $k$ nodes. By the induction hypothesis,
we know that _TreeSum_(_root.left_) correctly
computes the sum of all the integers in the left subtree, and
_TreeSum_(_root.right_) correctly computes the
sum of all the integers in the right subtree. The sum of all
the integers in the tree is _root.item_ plus the
sums of the integers in the subtrees, and this is the value
computed by _TreeSum_. So, _TreeSum_ does
work for a tree with $k$ nodes. This completes the induction.

Note how closely the structure of the inductive proof follows the 
structure of the recursive function. In particular, the
second principle of mathematical induction is very natural here, since
the size of subtree could be anything up to one less than
the size of the complete tree. It would be very difficult
to use the first principle of induction in a proof about
binary trees.

## Structural Induction

Instead of using strong mathematical induction, it is often more
straightforward to use a principle known as **structural induction**.
Suppose that our domain of discourse consists of some entities that
are considered "primitive", and others that are constructed from
smaller entities (the binary trees described above are a classic
example: a tree is either an empty tree or a node containing an
integer and two subtrees). Then we may prove statements of the form
$\forall xP(x)$ over this domain by showing two cases:

* **Base case**: $P(x)$ holds whenever $x$ is a primitive entity.

* **Induction case:** Whenever $P(x_1)$, &hellip;, $P(x_k)$ holds for
some smaller entities $x_1$, &hellip;, $x_k$, then it also holds for
an entity $x$ constructed from them.

Here is the proof about the _TreeSum_ function again, expressed as a
structural induction over trees:

> **Theorem:** 
The function _TreeSum_, defined above, correctly
computes the sum of all the integers in a binary tree.

> **Proof:** 
We use structural induction on the construction of a tree.
Let $P(t)$ be the statement "_TreeSum_
correctly computes the sum of the nodes in the binary tree
$t$." We show that $P(t)$ is true
for every binary tree $t$.
>
**Base case:** If $t$ is an empty tree, then the definition of
_TreeSum_ returns the value 0, which is the correct sum for an
empty tree. So, $P(t)$ is true.
>
**Induction case:** Suppose we already know that $P(u)$ and $P(v)$ hold for some
trees $u$ and $v$. That is, _TreeSum_ correctly computes the sum of all the
integers in $u$ and $v$. We must show that it follows that $P(t)$ is true, where
$t$ is the tree constructed from subtrees $u$ (left) and $v$ (right), plus an
integer _item_. The value computed by _TreeSum_($t$) will be _TreeSum_($u$) +
_item_ + _TreeSum_($v$). By the induction hypothesis, we know that
_TreeSum_($u$) correctly computes the sum of all the integers in the left
subtree, and _TreeSum_($v$) correctly computes the sum of all the integers in
the right subtree. The sum of all the integers in the tree is _item_ plus the
sums of the integers in the subtrees, so, _TreeSum_ also works for the tree $t$.

## Recursive Definitions

Recursion occurs in programming when a subroutine is defined&mdash;partially,
at least&mdash;in terms of itself. But recursion also occurs outside of
programming. A **recursive definition** is a definition that includes
a reference to the term that is being defined. A recursive definition
defines something at least partially in terms of itself. As in the
case of recursive subroutines, mathematical induction can often be used
to prove facts about things that are defined recursively.

As already noted, there is a recursive definition for $n!$, for $n$ in $\N$. We
can define $0!=1$ and $n!=n\cdot(n-1)!$ for $n>0$. Other sequences of
numbers can also be defined recursively. For example, the famous
**Fibonacci sequence** is the sequence of numbers $f_0$, $f_1$, $f_2$, &hellip;,
defined recursively by
$$ \begin{array}{l}
    f_0 = 0\\
    f_1 = 1\\
    f_n = f_{n-1}+f_{n-2} \qquad \text{for $n>1$}
\end{array} $$

Using this definition, we compute that
$$ \begin{array}{l}
    f_2 = f_1 + f_0 = 0 + 1 = 1\\
    f_3 = f_2 + f_1 = 1 + 1 = 2\\
    f_4 = f_3 + f_2 = 2 + 1 = 3\\
    f_5 = f_4 + f_3 = 3 + 2 = 5\\
    f_6 = f_5 + f_4 = 5 + 3 = 8\\
    f_7 = f_6 + f_5 = 8 + 5 = 13
\end{array} $$

and so on. Based on this definition, we can use induction to
prove facts about the Fibonacci sequence. We can prove,
for example, that $f_n$ grows exponentially with $n$, even without
finding an exact formula for $f_n$:

> **Theorem:** 
The Fibonacci sequence, $f_0$, $f_1$, $f_2$, &hellip;,
satisfies $f_n > \big(\frac{3}{2}\big)^{n-1}$, for $n\ge6$.

> **Proof:** 
We prove this by induction on $n$. For $n=6$, we have that 
$f_n=8$ while $1.5^{n-1}=1.5^5$, which is about $7.6$.
So $f_n > 1.5^{n-1}$ for $n=6$.
Similarly, for $n=7$, we have $f_n=13$ and
$1.5^{n-1}=1.5^6$, which is about 11.4.
So $f_n > 1.5^{n-1}$ for $n=7$.
>
Now suppose that $k$ is an arbitrary integer with $k>7$.
Suppose that we already know that $f_n>1.5^{n-1}$ for
$n=k-1$ and for $n=k-2$. We want to show that the inequality
then holds for $n=k$ as well. But
$$ \begin{array}{rll}
   f_k &= f_{k-1}+f_{k-2}\\
       &> 1.5^{(k-1)-1}+1.5^{(k-2)-1} & \text{(by the induction hypothesis)}\\
       &= 1.5^{k-2}+1.5^{k-3}\\
       &= (1.5)\cdot(1.5^{k-3}) + (1.5^{k-3})\\
       &= (2.5)\cdot(1.5^{k-3})\\
       &> (1.5^2)\cdot(1.5^{k-3}) & \text{(since $1.5^2=2.25$)}\\
       &= 1.5^{k-1}
\end{array} $$
> This string of equalities and inequalities shows that $f_k>1.5^{k-1}$.
This completes the induction and proves the theorem.


## Exercises

1. The _Hanoi_ subroutine given in this section does
not just solve the Towers of Hanoi problem. It solves the
problem using the minimum possible number of moves. Use induction
to prove this fact.

2. Use induction to prove that the _Hanoi_ subroutine
uses $2^n-1$ moves to solve the Towers of Hanoi problem for $n$ disks.
(There is a story that goes along with the Towers of Hanoi problem.
It is said that on the day the world was created, a group of monks in Hanoi
were set the task of solving the problem for 64 disks. They can
move just one disk each day. On the day the problem is solved, 
the world will end. However, we shouldn't worry too much,
since $2^{64}-1$ days is a very long time&mdash;about 50 million billion years.)

3. Consider the following recursive function:
```java
/** Compute x raised to the power n.
 * Precondition: n >= 0.
 */
int power(int x, int n) {
   int answer;
   if (n == 0) {
      answer = 1;
   } else if (n % 2 == 0) {
      answer = power(x * x, n / 2);
   } else {
      answer = x * power(x * x, (n - 1) / 2);
   }
   return answer;
}
```
Show that for any integer $x$ and any non-negative integer $n$,
the function _power_($x$,$n$) correctly computes the value
of $x^n$. (Assume that the _int_ data type can represent
arbitrarily large integers.) Note that the test
"`if (n % 2 == 0)`" tests whether $n$ is evenly divisible by 2.
That is, the test is true if $n$ is an even number. (This function is
actually a very efficient way to compute $x^n$.)

4. Write the _power_ function from the previous problem in ReasonML, and
check that it works on several examples. _Hint:_ The code will be almost
the same as the Java, except for the different function syntax and not
using the temporary variable _answer_ (see examples above). The remainder
operator is named _mod_ instead of %, so the test for $n$ being even will
be `if (n mod 2 == 0)`.

```reason fix
let rec power = (x, n) => {
  /* TODO */
};

print_int(power(2, 6)); print_newline();
print_int(power(3, 5)); print_newline();
print_int(power(10, 4)); print_newline();
/* try other examples here */
```

5. A **leaf node** in a binary tree is a node in which 
both the left and the right subtrees are empty. Prove that
the following recursive function correctly counts the number
of leaves in a binary tree:
```java
/**
 * Counts the number of leaf nodes in the tree with the
 * specified root.
 */
int LeafCount( BinaryTreeNode root ) {
   int count;
   if (root == null) {
      count = 0;
   } else if (root.left == null && root.right == null) {
      count = 1;
   } else {
      count = LeafCount(root.left);
      count = count + LeafCount(root.right);
   }
   return count;
}
```

6. Complete this ReasonML version of the _LeafCount_ function
from the previous problem. Note that we may use patterns such
as `Node(Empty, _, Empty)` in the switch statement to match
nodes where the subtrees are both `Empty` (and the `_` indicates
that we don't care what the value of the _item_ field is).

```reason fix
let rec leafCount = t => {
  switch (t) {
  | Empty => /* TODO */
  | Node(Empty, _, Empty) => /* TODO */
  | Node(left, _, right) => /* TODO */
  }
}
```

7. A **binary search tree** satisfies the
following property: If _node_ is a pointer to any
node in the tree, then all the integers in the left subtree
of _node_ are less than _node.item_ and
all the integers in the right subtree of _node_ are
greater than or equal to _node.item_. Prove that the
following recursive subroutine prints all the integers in
a binary sort tree in non-decreasing order:
```java
/**
 * Prints the integers in the tree with the given root node
 * in non-decreasing order.
 * Precondition: root is a pointer to the root node of a
 * binary search tree.
 */
void SortPrint(BinaryTreeNode root) {
   if (root == null) {
      // There is nothing to print.
   } else {
      SortPrint(root.left);
      System.out.println(root.item);
      SortPrint(root.right);
   }
}
```

8. Complete this ReasonML version of the _SortPrint_ function from
the previous problem.
```reason fix
let rec sortPrint = root => {
  switch (root) {
  | Empty => /* There is nothing to print */
  | Node(left, item, right) =>
      /* TODO */
  }
}
```

9. Prove that the Fibonacci sequence, $f_0$, $f_1$, $f_2$, &hellip;,
satisfies $f_n<2^n$ for all natural numbers $n$.

9. Suppose that $a_1$, $a_2$, $a_3$, &hellip;, is a sequence of
numbers which is defined recursively by $a_1=1$ and
$a_n=2a_{n-1}+2^{n-1}$ for $n>1$. Prove that
$a_n=n2^{n-1}$ for every positive integer $n$.
