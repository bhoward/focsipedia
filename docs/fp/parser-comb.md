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
    if (String.length(input.text) <= input.index) {
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

open Parser;
let ident = chr('x') <|> chr('y') <|> chr('z');
let op = chr('+') <|> chr('-') <|> chr('*') <|> chr('/');
let expr = ident <*> rep(op <*> ident);
Result.get(parseAll(Input.fromString("x + y * z"), expr));
test(expr, "x + y * z");
```

