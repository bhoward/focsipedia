---
id: state
title: State Machines in Java and ReasonML
---

There are many ways to implement the state machine concept in code. The essence is that
the input is processed one item at a time, in order, with only a fixed amount of
information (the "state") preserved from one item to the next. The iteration over the
items may be performed by a loop or recursion; the state may be maintained explicitly
in variables or hidden in an object, or it may be implicit in the current section of
code being executed; the transition from one state to the next may be controlled by a
series of conditional statements, a data structure representing the transition graph,
or a function which encapsulates the required logic. Here are some examples:

## Strings containing "aeiou"

This is an example from Section 10.2 of [Aho &amp; Ullman](http://infolab.stanford.edu/~ullman/focs.html).
A string of lower-case letters will be accepted if it contains the vowels _a_, _e_, _i_, _o_, and _u_, in that order
(the vowels may occur in other positions as well, as in "sacrilegious").

### State implicit in conditional statements

Here to start is a Java version of Aho &amp; Ullman's Figure 10.2 (the original was in C):
```java
public class ContainsAEIOU {
  private String word;
  private int index;

  private boolean findChar(char c) {
    while (index < word.length() && word.charAt(index) != c) {
      index++;
    }

    if (index < word.length()) {
      // character c found at position index; prepare for next call
      index++;
      return true;
    } else {
      // character not found in rest of word
      return false;
    }
  }

  public boolean test(String word) {
    this.word = word;
    this.index = 0;
    /* state 0 */
    if (findChar('a'))
      /* state 1 */
      if (findChar('e'))
        /* state 2 */
        if (findChar('i'))
          /* state 3 */
          if (findChar('o'))
            /* state 4 */
            if (findChar('u'))
              /* state 5 */
              return true;
    /* error state */
    return false;
  }

  public static void main(String[] args) {
    ContainsAEIOU c = new ContainsAEIOU();
    System.out.println(c.test("abstemious")); // should be true
    System.out.println(c.test("sacrilegious")); // should be true
    System.out.println(c.test("undercoating")); // should be false -- not in order
    System.out.println(c.test("religious")); // should be false -- no a
    System.out.println(c.test("aeiou")); // should be true
  }
}
```

The input is processed in this version by the `while` loop in the `findChar`
method; the variable `index` (which is a class instance variable so that its value
will persist between calls to `findChar`) is used to step through the characters in the word.
The current "state" is reflected in how far the execution has progressed through
the nested `if` statements in `test`; after reading characters for a while in
state 0, it transitions to state 1 when the first _a_ is seen, then to state 2 upon
seeing a following _e_, _etc_. If any of the calls to `findChar` return false, meaning
the end of the string has been reached while looking for one of the vowels, then the
machine enters an error state (_i.e._, it falls through to the `return false` at the end).
If all of the calls to `findChar` succeed, then the
machine reaches state 5 and immediately returns true (without looking at the rest
of the string).

Given the way the `&&` operator is evaluated from left to right, the sequence of `if` and
`return` statements in the `test` method could also be written

```java
return findChar('a') && findChar('e') && findChar('i') && findChar('o') && findChar('u');
```

This is completely equivalent (and likely even generates the same compiled code), although
it might be harder to see which point in the code corresponds to each state.

The Java version is a very imperative approach to the problem, depending as it does on changes
to the variable `index` as it traces through the sequence of method calls and loops. Here is a
more functional equivalent in ReasonML, where indexing into a string is replaced by traversing
through a list of characters, and the `findChar` method returns a pair of a boolean plus the
list of the remaining unsearched characters:

```reason edit
let rec findChar = (chars, c) => {
  switch (chars) {
  | [] => (false, [])
  | [head, ...tail] => if (head == c) {
      (true, tail)
    } else {
      findChar(tail, c)
    }
  }
};

let test = word => {
  /* expand a string to a list of characters */
  let chars = List.init(String.length(word), String.get(word));
  /* state 0 */
  let (foundA, rest) = findChar(chars, 'a');
  if (foundA) {
    /* state 1 */
    let (foundE, rest) = findChar(rest, 'e');
    if (foundE) {
      /* state 2 */
      let (foundI, rest) = findChar(rest, 'i');
      if (foundI) {
        /* state 3 */
        let (foundO, rest) = findChar(rest, 'o');
        if (foundO) {
          /* state 4 */
          let (foundU, rest) = findChar(rest, 'u');
          if (foundU) {
            /* state 5 */
            true
          } else false
        } else false
      } else false
    } else false
  } else false
};

test("abstemious"); /* should be true */
test("sacrilegious"); /* should be true */
test("undercoating"); /* should be false -- not in order */
test("religious"); /* should be false -- no a */
test("aeiou"); /* should be true */
```

### Integer state with transitions in a graph

Here is the same state machine, with the state explicitly represented by an integer
in the range 0 to 5. The transitions are stored in an array of functions: `trans[i]` is the
function, for state `i`, from the current character to the next state. 
Note that this is similar to the adjacency matrix representation of a graph, except here
we are looking up a node (`i`) and an input symbol (`c`) to select an adjacent node, instead
of looking up two nodes to see whether they are adjacent.
Each of the functions in
this case is particularly simple, since at most one edge leads away from each state
to another. See below for other examples using more complicated graphs.

```reason edit
let trans = [|
  (c) => if (c == 'a') 1 else 0, /* state 0 */
  (c) => if (c == 'e') 2 else 1, /* state 1 */
  (c) => if (c == 'i') 3 else 2, /* state 2 */
  (c) => if (c == 'o') 4 else 3, /* state 3 */
  (c) => if (c == 'u') 5 else 4, /* state 4 */
  (c) => 5 /* state 5 */
|];

let test = word => {
  let chars = List.init(String.length(word), String.get(word));
  /* List.fold_left is our reduce function */
	let final_state = List.fold_left((state, c) => trans[state](c), 0, chars);
  final_state == 5 /* returns true if accepting state reached */
}

test("abstemious"); /* should be true */
test("sacrilegious"); /* should be true */
test("undercoating"); /* should be false -- not in order */
test("religious"); /* should be false -- no a */
test("aeiou"); /* should be true */
```

Walking over a list and applying a transition function from the current state and input
item to get the next state is just a direct application of our `reduce` function on
lists; the ReasonML library calls it `List.fold_left`.

### Object-oriented state and transitions

Instead of assigning arbitrary numbers to the states, and collecting all of the
transition information into a global graph data structure, a more object-oriented
approach associates an object with each state. Here is a Java implementation of this idea:

```java
package edu.depauw.csc233;

public class ContainsAEIOU2 {
  private interface State {
    State trans(char c);
    default boolean accept() { return false; }
  }

  private static class InitialState implements State {
    public State trans(char c) {
      if (c == 'a') {
        return new AState();
      } else {
        return this;
      }
    }
  }

  private static class AState implements State {
    public State trans(char c) {
      if (c == 'e') {
        return new AEState();
      } else {
        return this;
      }
    }
  }

  private static class AEState implements State {
    public State trans(char c) {
      if (c == 'i') {
        return new AEIState();
      } else {
        return this;
      }
    }
  }

  private static class AEIState implements State {
    public State trans(char c) {
      if (c == 'o') {
        return new AEIOState();
      } else {
        return this;
      }
    }
  }

  private static class AEIOState implements State {
    public State trans(char c) {
      if (c == 'u') {
        return new AEIOUState();
      } else {
        return this;
      }
    }
  }

  private static class AEIOUState implements State {
    public State trans(char c) {
      return this;
    }

    public boolean accept() {
      return true;
    }
  }

  public static boolean test(String word) {
    State state = new InitialState();
    for (int i = 0; i < word.length(); i++) {
      state = state.trans(word.charAt(i));
    }
    return state.accept();
  }
  
  public static void main(String[] args) {
    System.out.println(test("abstemious")); // should be true
    System.out.println(test("sacrilegious")); // should be true
    System.out.println(test("undercoating")); // should be false -- not in order
    System.out.println(test("religious")); // should be false -- no a
    System.out.println(test("aeiou")); // should be true
  }
}
```

Each of the state classes implements the `State` interface, which bundles both a
transition method, `trans` (it computes the next state for a given input character),
and an `accept` method (it returns true if the state is accepting; the interface
provides a default implementation that returns false). The `test` function now only
needs to know the initial state; it would be written in exactly the same way for
any machine that processes the characters in a string.

### Functional state and transitions

An interesting functional equivalent to the previous object-oriented version
represents each state by a pair of a boolean and a function from characters to states.
Since the `state` type is defined in terms of itself, we need to wrap it up in a
constructor:

```reason demo
type state = State(bool, char => state);
```

Here is the code for our "aeiou" machine:
```reason edit
let rec initialState = State(false, c => if (c == 'a') aState else initialState)
and aState = State(false, c => if (c == 'e') aeState else aState)
and aeState = State(false, c => if (c == 'i') aeiState else aeState)
and aeiState = State(false, c => if (c == 'o') aeioState else aeiState)
and aeioState = State(false, c => if (c == 'u') aeiouState else aeioState)
and aeiouState = State(true, _ => aeiouState);

let test = word => {
  let chars = List.init(String.length(word), String.get(word));
  let State(accept, _) =
    List.fold_left((State(_, trans), c) => trans(c), initialState, chars);
  accept
};

test("abstemious"); /* should be true */
test("sacrilegious"); /* should be true */
test("undercoating"); /* should be false -- not in order */
test("religious"); /* should be false -- no a */
test("aeiou"); /* should be true */
```

## Vending Machine

Suppose we want to model a vending machine which accepts nickels, dimes, and quarters,
and dispenses a piece of candy when 25 cents has been deposited. If more than 25 cents
is put in (for example, three dimes), then after dispensing the candy the remaining
amount is applied toward the next transaction (that is, it doesn't give any change).

This use of a finite state machine is a bit different from what we have seen before, since
there is no notion of an "accepting" state. Instead, we imagine that the machine is
performing a long-running computation (in this case, it runs as long as the vending
machine is in service, potentially for years).
It is customary for this kind of machine to add a notion of "output," so that the
machine can give feedback after each transition instead of just at the end (which may
never come). There are two standard models for doing this:

   * A **Mealy Machine** is a finite state machine where each transition has an associated
   output. We annotate each transition with a label such as $a/x$, meaning that it takes the
   transition if the input is $a$, and as it does so it produces output $x$.

   * A **Moore Machine** is a finite state machine where the output after each transition is
   determined by the new state. Each state has a label such as $A/x$, meaning that when the
   machine transitions to state $A$ it will also produce output $x$.

For both kinds of machines, the output may be $\varepsilon$ if no output is desired at that time.
It is not very difficult to see that Mealy and Moore machines have equivalent power, by showing
how to construct each from the other; the choice is often a matter of convenience. For example,
in constructing a sequential circuit implementation, the Moore machine has the advantage that
the output part of the circuit only needs lines connecting to the current state (the outputs
of the flip-flops), while the Mealy machine may require fewer states (and hence fewer flip-flops)
in some cases.

### Integer state with transitions in a graph

We will adopt a similar solution as for the second version of the vowel problem. This
time, the integer state numbers will be more meaningful: they will be 0, 5, 10, 15,
and 20, representing the amount of money which has been deposited so far. Since these
are not consecutive, the graph will be represented by a function with two inputs instead of an
array of functions. Also, there will be no need for default transitions, since each of the
three possible inputs ('N', 'D', or 'Q', for nickel, dime, and quarter) will cause a
different change of state. One further difference is that each edge in the graph will
give not only a new state but also an indication of whether candy was given out on
the transition (this means that it is a Mealy machine). Finally, there is no accepting state, since the machine will keep
running as long as there is input; in the example below, we will print "Candy!"
whenever it produces a piece of candy.

```reason edit
let vtrans = (amount, input) => {
  switch (amount, input) {
  | (0, 'N') => (5, false)
  | (0, 'D') => (10, false)
  | (0, 'Q') => (0, true)
  | (5, 'N') => (10, false)
  | (5, 'D') => (15, false)
  | (5, 'Q') => (5, true)
  | (10, 'N') => (15, false)
  | (10, 'D') => (20, false)
  | (10, 'Q') => (10, true)
  | (15, 'N') => (20, false)
  | (15, 'D') => (0, true)
  | (15, 'Q') => (15, true)
  | (20, 'N') => (0, true)
  | (20, 'D') => (5, true)
  | (20, 'Q') => (20, true)
  | _ => failwith("Invalid state or input")
  }
}

let vend = coins => {
  let rec aux = (coins, state) => {
    switch (coins) {
    | [] => state
    | [head, ...tail] => {
        let (state', candy) = vtrans(state, head);
        if (candy) print_string("Candy! ");
        aux(tail, state')
      }
    }
  };
  aux(coins, 0)
};

vend(['N', 'N', 'N', 'N', 'Q', 'D', 'N', 'N', 'D']); /* Should print Candy! three times */
```

### Object-oriented approach with encapsulated state

Instead of exposing an explicit state, we can wrap it up inside an object with
(mutable) internal state. Here is a Java version of the vending machine, which also
replaces the discrete transition graph with a calculated transition function:

```java
public class VendingMachine {
  private int price;
  private int balance;
  
  public VendingMachine(int price) {
    this.price = price;
    this.balance = 0;
  }
  
  /**
   * Insert the given amount of money; returns true if an item is vended.
   */
  public boolean deposit(int amount) {
    balance += amount;
    if (balance >= price) {
      balance -= price;
      return true;
    } else {
      return false;
    }
  }

  public static void main(String[] args) {
    VendingMachine machine = new VendingMachine(25);
    String input = "NNNNQDNND"; // Should print Candy! three times
    for (int i = 0; i < input.length(); i++) {
      boolean candy = false;
      switch (input.charAt(i)) {
        case 'N': candy = machine.deposit(5); break;
        case 'D': candy = machine.deposit(10); break;
        case 'Q': candy = machine.deposit(25); break;
        default: throw new RuntimeException("Invalid input");
      }
      if (candy) System.out.println("Candy!");
    }
  }
}
```

## Exercises

1. Sketch the process of constructing a Mealy machine from a Moore machine, and _vice versa_.

2. Give at least two implementations of a state machine that recognizes valid floating-point literals in Java.
You will first need to research the Java language definition to learn what constitutes a valid literal.

3. Give at least two implementations of a state machine (expressed as either a Mealy or Moore machine) that
simulates the operation of a keypad-based lock. There should be ten input buttons, one for each decimal digit,
and two output signals, "lock" and "unlock." If the code 1234 in sequence is ever entered on the keypad, then the unlock
signal should be produced. After any other key press (that is, if the last four digits entered at any point were
not 1234), the output should be "lock".
