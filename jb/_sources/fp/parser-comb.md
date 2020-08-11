# Recursive Descent and Parser Combinators

It is particularly easy to turn an LL(1) grammar into an efficient parser
using the technique of **recursive descent parsing**. For each non-terminal in
the grammar, we write a function that recognizes strings produced from that
non-terminal. If there are multiple productions for the non-terminal, we use
the next available character to decide which one to use. To parse the right-hand
side of the chosen production rule, we have to recognize a sequence of terminals
and non-terminals in order. To recognize a terminal, we just check that the current
character from the input matches the expected symbol. To recognize a non-terminal,
we call the associated function for that non-terminal.

Therefore, our parser will be a set of mutually recursive functions, one for each
non-terminal. To parse a word in the language, we call the function corresponding
to the starting non-terminal; if that function returns without error, then we have
successfully matched a word. In addition to recognizing a string of characters, it
is common for each recursive descent parsing function to return a data structure
(the parse tree, or a close relative known as an **abstract syntax tree**) representing
the input that was parsed.

Here is code for a recursive descent parser in Java, corresponding to the following
grammar (expressed here in [Backus-Naur form](../lang/bnf); it is very similar
to the example $G_2$ discussed in the [parsing](../lang/parsing) section):
$$
\begin{aligned}
\langle\textit{Expr}\rangle\ &::=\ \langle\textit{Term}\rangle\ [\ (\ +\ |\ -\ )\ \langle\textit{Term}\rangle\ ]\ldots\\
\langle\textit{Term}\rangle\ &::=\ \langle\textit{Factor}\rangle\ [\ (\ *\ |\ /\ )\ \langle\textit{Factor}\rangle\ ]\ldots\\
\langle\textit{Factor}\rangle\ &::=\ \textrm{ident}\ |\ \textrm{num}\ |\ \textrm{``(''}\ \langle\textit{Expr}\rangle\ \textrm{``)''}
\end{aligned}
$$

```java
/**
 * Represents an expression node in an abstract syntax tree.
 */
public interface Expr {
	// instance methods appropriate to the application should be declared here

	/**
	 * Parse an expression (sum/difference of one or more terms).
	 * 
	 * @param input
	 * @return
	 */
	public static Expr parse(Input input) {
		Expr e = parseTerm(input);
		while (input.peek() == '+' || input.peek() == '-') {
			BinOp op = BinOp.parse(input);
			Expr e2 = Expr.parseTerm(input);
			e = new BinOpExpr(e, op, e2);
		}
		return e;
	}

	/**
	 * Parse a term (product/quotient of one or more factors).
	 * 
	 * @param input
	 * @return
	 */
	public static Expr parseTerm(Input input) {
		Expr e = parseFactor(input);
		while (input.peek() == '*' || input.peek() == '/') {
			BinOp op = BinOp.parse(input);
			Expr e2 = Expr.parseFactor(input);
			e = new BinOpExpr(e, op, e2);
		}
		return e;
	}

	/**
	 * Parse a factor (identifier, number, or parenthesized expression). Throws a
	 * RuntimeException if a factor is not available.
	 * 
	 * @param input
	 * @return
	 */
	public static Expr parseFactor(Input input) {
		if (Character.isLetter(input.peek())) {
			String id = input.readIdent();
			return new IdentExpr(id);
		} else if (Character.isDigit(input.peek())) {
			int n = input.readInt();
			return new NumExpr(n);
		} else if (input.peek() == '(') {
			input.skip();
			Expr e = parse(input);
			input.match(')');
			return e;
		} else {
			throw new RuntimeException("expected a factor");
		}
	}
}

public class BinOpExpr implements Expr {
	private Expr left, right;
	private BinOp op;

	public BinOpExpr(Expr left, BinOp op, Expr right) {
		this.left = left;
		this.op = op;
		this.right = right;
	}

	public String toString() {
		return "BinOp(" + left + ", " + op + ", " + right + ")";
	}
}

public class IdentExpr implements Expr {
	private String id;

	public IdentExpr(String id) {
		this.id = id;
	}

	public String toString() {
		return "Ident(" + id + ")";
	}
}

public class NumExpr implements Expr {
	private int n;

	public NumExpr(int n) {
		this.n = n;
	}

	public String toString() {
		return "Num(" + n + ")";
	}
}

/**
 * Represents the binary operators available in the abstract syntax for
 * expressions.
 */
public enum BinOp {
	PLUS, MINUS, TIMES, DIVIDE;

	/**
	 * Parse a binary operator from the given Input. Should only be called when the
	 * current character may start an operator.
	 * 
	 * @param input
	 * @return
	 */
	static BinOp parse(Input input) {
		switch (input.peek()) {
		case '+':
			input.skip();
			return PLUS;
		case '-':
			input.skip();
			return MINUS;
		case '*':
			input.skip();
			return TIMES;
		case '/':
			input.skip();
			return DIVIDE;
		default:
			return null; // shouldn't happen
		}
	}
}

/**
 * Wrapper around a Reader that provides useful abstractions for recursive
 * descent parsing.
 */
public class Input {
	private java.io.Reader source;
	private char next;
	private boolean atEnd;

	public Input(java.io.Reader source) {
		this.source = source;
		skip();
	}

	/**
	 * @return current available character
	 */
	public char peek() {
		return next;
	}

	/**
	 * @return true if no more characters available
	 */
	public boolean atEnd() {
		return atEnd;
	}

	/**
	 * Read the next available character, skipping over whitespace
	 */
	public void skip() {
		readNext();
		skipWhitespace();
	}

	/**
	 * If the current character is c, skip to the next. Throw a RuntimeException if
	 * the character does not match.
	 * 
	 * @param c
	 */
	public void match(char c) {
		if (next == c) {
			skip();
		} else {
			throw new RuntimeException("expected " + c + " but found " + next);
		}
	}

	/**
	 * Read an identifier (letter followed by zero or more letters or digits). This
	 * should only be called when the current character is a letter.
	 * 
	 * @return the identifier
	 */
	public String readIdent() {
		StringBuilder builder = new StringBuilder();
		builder.append(next);
		readNext();
		while (!atEnd && Character.isLetterOrDigit(next)) {
			builder.append(next);
			readNext();
		}
		skipWhitespace();
		return builder.toString();
	}

	/**
	 * Read an integer (digit followed by zero or more additional digits). This
	 * should only be called when the current character is a digit.
	 * 
	 * @return the number
	 */
	public int readInt() {
		int result = next - '0';
		readNext();
		while (!atEnd && Character.isDigit(next)) {
			result = result * 10 + next - '0';
			readNext();
		}
		skipWhitespace();
		return result;
	}

	private void readNext() {
		try {
			int c = source.read();
			if (c != -1) {
				next = (char) c;
				atEnd = false;
			} else {
				next = '\0';
				atEnd = true;
			}
		} catch (java.io.IOException e) {
			next = '\0';
			atEnd = true;
		}
	}

	private void skipWhitespace() {
		while (!atEnd && Character.isWhitespace(next)) {
			readNext();
		}
	}
}

public class Demo {
	public static void main(String[] args) {
		String sample = "  3*abc + (x1 - x0) * r2d2/42 \n";
		Input input = new Input(new StringReader(sample));
		Expr e = Expr.parse(input);
		if (input.atEnd()) {
			System.out.println("Found " + e);
		} else {
			System.out.println("unscanned input after parsing " + e);
		}
	}
}
```

## Parser Combinators

Instead of giving a direct translation of the Java version into ReasonML, it is
common in functional languages to use what are known as **parser combinators**
to write recursive descent parsers. A parser is viewed as a function from input
to the pair of a result plus the remaining input (since in a functional language
we do not want to use side-effects to update the "current character" available from
an input source). A parser combinator is then a function that can combine one or
more of these parsing functions into a composite parser.

For example, given parsers `p1` and `p2`, the combinator `<|>` produces the parser
`p1 <|> p2` which attempts to parse according to `p1`; if it fails, then it attempts
to use `p2` instead. This corresponds to the $|$ (choice) operator in BNF (and also
in regular expressions). Some of the other combinators used below are `<*>`, which
corresponds to sequencing one parser after another, and `rep`, which repeats a
parser zero or more times (like the Kleene star).

Here is code for parser combinators in ReasonML, based on
[bs-little-parser](https://github.com/henoc/bs-little-parser):
```reason edit
module Input = {
  type t = {text: string, index: int, whitespace: string};

  let fromString = s => {text: s, index: 0, whitespace: " \t\n"};

  let skipWhitespace = input => {
    let whitespace = input.whitespace;
    let spaceChars = List.init(String.length(whitespace), String.get(whitespace));
    
    let rec aux = input => {
      if (String.length(input.text) <= input.index) {
        input 
      } else if (List.mem(input.text.[input.index], spaceChars)) {
        aux({...input, index: input.index+1})
      } else {
        input
      }
    };
    aux(input)
  };

  let atEnd = input => {
    input.index == String.length(input.text)
  };
};

module Result = {
  type t('a, 'b) = Ok('a) | Error('b);

  let map = (f, result) => {
    switch (result) {
    | Ok(r) => Ok(f(r))
    | Error(s) => Error(s)
    }
  };

  let get = result => {
    switch (result) {
    | Ok(r) => Some(r)
    | _ => None
    }
  };
};

module Parser = {
  type parseResult('a) = Result.t(('a, Input.t), (string, Input.t))
  type t('a) = Input.t => parseResult('a);

  let success = (result, input): parseResult('a) =>
    Result.Ok((result, input));
  
  let failure = (message, input): parseResult('a) =>
    Result.Error((message, input));

  let ( <*> ) = (p: t('a), q: t('b), input) => {
    switch (p(input)) {
    | Result.Ok((result1, input2)) =>
        switch (q(input2)) {
        | Result.Ok((result2, input3)) =>
            success((result1, result2), input3)
        | Result.Error((message, input)) =>
            failure(message, input)
        }
    | Result.Error((message, input)) =>
        failure(message, input)
    }
  };

  let ( <* ) = (p: t('a), q: t('b), input) => {
    switch(p(input)) {
    | Result.Ok((result1, input2)) =>
        switch (q(input2)) {
        | Result.Ok((_, input3)) =>
            success(result1, input3)
        | Result.Error((message, input)) =>
            failure(message, input)
        }
    | Result.Error((message, input)) =>
        failure(message, input)
    }
  };

  let ( *> ) = (p: t('a), q: t('b), input) => {
    switch(p(input)) {
    | Result.Ok((_, input2)) =>
        switch (q(input2)) {
        | Result.Ok((result2, input3)) =>
            success(result2, input3)
        | Result.Error((message, input)) =>
            failure(message, input)
        }
    | Result.Error((message, input)) =>
        failure(message, input)
    }
  };

  let ( <|> ) = (p: t('a), q: t('a), input) => {
    switch (p(input)) {
    | Result.Ok((s, t)) => success(s, t)
    | _ => q(input)
    }
  };

  let rep = (p: t('a), input) => {
    let rec aux = (accum, input) => {
      switch (p(input)) {
      | Result.Ok((r, i)) => aux([r, ...accum], i)
      | _ => success(List.rev(accum), input)
      }
    };

    aux([], input);
  };

  let rep1 = (p: t('a)) => p <*> rep(p);

  let opt = (p: t('a), input) => {
    switch (p(input)) {
    | Result.Ok((r, i)) => success(Some(r), i)
    | _ => success(None, input)
    }
  };

  let andPred = (p: t('a), input) => {
    switch (p(input)) {
    | Result.Ok((r, _)) => success(r, input)
    | Result.Error((message, input)) => failure(message, input)
    }
  };

  let notPred = (p: t('a), input) => {
    switch (p(input)) {
    | Result.Ok((_, i)) => failure("notPred failure", i)
    | _ => success((), input)
    }
  };

  let ( >> ) = (p: t('a), f, input) => {
    switch (p(input)) {
    | Result.Ok((r, i)) => f(r, i)
    | Result.Error((message, input)) => failure(message, input)
    }
  };

  let ( ^^ ) = (p: t('a), f, input): parseResult('b) =>
    Result.map(((r, i)) => (f(r), i), p(input));

  let chr = (c, rawInput) => {
    let input = Input.skipWhitespace(rawInput);
    if (Input.atEnd(input)) {
      failure("not enough input", input)
    } else {
      let firstChar = input.text.[input.index];
      if (firstChar == c) {
        success(c, {...input, index: input.index+1})
      } else {
        failure(Printf.sprintf("mismatch: %C found, expected %C", firstChar, c), input)
      }
    }
  };

  let str = (s, rawInput) => {
    let input = Input.skipWhitespace(rawInput);
    let slen = String.length(s);
    if (String.length(input.text) - slen < input.index) {
      failure("not enough input", input)
    } else {
      let substr = String.sub(input.text, input.index, slen);
      if (substr == s) {
        success(s, {...input, index: input.index+slen})
      } else {
        failure(Printf.sprintf("mismatch: %S found, expected %S", substr, s), input)
      }
    }
  };

  let dfa = (init, step, finish, rawInput) => {
    let input = Input.skipWhitespace(rawInput);
    let rec aux = (state, i) => {
      if (Input.atEnd(i)) {
        (state, i)
      } else {
        let nextChar = i.text.[i.index];
        switch (step(state, nextChar)) {
        | Some(nextState) => aux(nextState, {...i, index: i.index+1})
        | None => (state, i)
        }
      }
    };
    let (finalState, input2) = aux(init, input);
    switch (finish(finalState)) {
    | Ok(result) => success(result, input2)
    | Error(message) => failure(message, input2)
    }
  };

  let eoi = (rawInput) => {
    let input = Input.skipWhitespace(rawInput);
    let remain = String.length(input.text) - input.index;
    if (remain == 0) {
      success((), input)
    } else {
      failure(Printf.sprintf("unscanned input at end of parse: %S", String.sub(input.text, input.index, remain)), input)
    }
  };

  let parse = (input, parser: t('a)) => {
    parser(input)
  };

  let parseAll = (input, parser: t('a)) => {
    (parser <* eoi)(input)
  };

  let test = (parser: t('a), s) => {
    switch (parseAll(Input.fromString(s), parser)) {
    | Result.Ok((r, _)) => r
    | Result.Error((m, _)) => failwith(m)
    }
  }
};
```

Here is the parser for arithmetic expressions, corresponding to the Java example above.
Note how the definitions of `expr`, `term`, and `factor` are very close to the original BNF:
```reason edit
open Parser;

type exp =
  | Ident(string)
  | Num(int)
  | BinOp(exp, char, exp);

let isLetter = c => ('A' <= c && c <= 'Z') || ('a' <= c && c <= 'z');
let isDigit = c => ('0' <= c && c <= '9');
let isLetterOrDigit = c => isLetter(c) || isDigit(c);

let ident = dfa(
  "",
  (s, c) => if ((s == "" && isLetter(c)) || (s != "" && isLetterOrDigit(c))) {
      Some(s ++ String.make(1, c))
    } else {
      None
    },
  s => if (s == "") {
      Error("expected identifier")
    } else {
      Ok(Ident(s))
    }
);

let number = dfa(
  "",
  (s, c) => if (isDigit(c)) {
    Some(s ++ String.make(1, c))
  } else {
    None
  },
  s => if (s == "") {
    Error("expected number")
  } else {
    Ok(Num(int_of_string(s)))
  }
);

let addop = chr('+') <|> chr('-');
let mulop = chr('*') <|> chr('/');

let rec expr = input => (
  (term <*> rep(addop <*> term))
  ^^ ((t, ts)) => List.fold_left((l, (op, r)) => BinOp(l, op, r), t, ts)
)(input)
and term = input => (
  (factor <*> rep(mulop <*> factor))
  ^^ ((f, fs)) => List.fold_left((l, (op, r)) => BinOp(l, op, r), f, fs)
)(input)
and factor = input => (
  ident
  <|> number
  <|> (chr('(') *> expr <* chr(')'))
)(input);

let sample = "  3*abc + (x1 - x0) * r2d2/42 \n";
Result.get(parseAll(Input.fromString(sample), expr));
test(expr, sample);
```
