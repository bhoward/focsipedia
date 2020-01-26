BuckleScript playground code:

* `bs.js` is the OCaml compiler, created following the instructions at [Contributing to the BS Playground](https://github.com/BuckleScript/bucklescript/blob/7.0.1/CONTRIBUTING.md#contributing-to-the-bs-playground-bundle).

* `stdlib.js` is a bundle of the standard library implementation files, taken from the [Try Reason](https://github.com/reasonml/reasonml.github.io/tree/source/website/static/js) playground.

* `refmt.js` is the Reason-OCaml transpiler, as installed by `npm install reason`.

* `eval.js` is the Js_of_OCaml toplevel, exporting functions `execute` and `reset`. See [this issue](https://github.com/ocsigen/js_of_ocaml/issues/629) and [this example](https://github.com/ocsigen/js_of_ocaml/tree/master/toplevel/examples/eval).
