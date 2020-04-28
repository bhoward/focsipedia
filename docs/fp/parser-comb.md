---
id: parser-comb
title: Parser Combinators
---

Code based on [bs-little-parser](https://github.com/henoc/bs-little-parser):
```reason edit
module Input = {
  type t = {text: string, index: int, whitespace: string};

  let fromString = s => {text: s, index: 0, whitespace: " \t\n"};

  let skipWhitespace = (input: t) => {
    let whitespace = input.whitespace;
    let spaceChars = List.init(String.length(whitespace), String.get(whitespace));
    
    let rec aux = (input: t) => {
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

  let atEnd = (input: t) => {
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

  let rep1 = p => p <*> rep(p);

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

  let chr = (c, rawInput: Input.t) => {
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

  let str = (s, rawInput: Input.t) => {
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

  let dfa = (init, step, finish, rawInput: Input.t) => {
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

  let eoi = (rawInput: Input.t) => {
    let input = Input.skipWhitespace(rawInput);
    let remain = String.length(input.text) - input.index;
    if (remain == 0) {
      success((), input)
    } else {
      failure(Printf.sprintf("unscanned input at end of parse: %S", String.sub(input.text, input.index, remain)), input)
    }
  };

  let parse = (input: Input.t, parser: t('a)) => {
    parser(input)
  };

  let parseAll = (input: Input.t, parser: t('a)) => {
    (parser <* eoi)(input)
  };

  let test = (parser: t('a), s: string) => {
    switch (parseAll(Input.fromString(s), parser)) {
    | Result.Ok((r, _)) => r
    | Result.Error((m, _)) => failwith(m)
    }
  }
};
```

Here is an example of a parser for arithmetic expressions:
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

let sample = "3*abc + (x1 - x0) * r2d2 / 42";
Result.get(parseAll(Input.fromString(sample), expr));
test(expr, sample);
```
