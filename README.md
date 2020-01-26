This is a site for building a hyper-linked reference/textbook for the Foundations of
Computation course at DePauw University. Pages may be written in Markdown, with embedded
math using [KaTeX](https://katex.org/) and executable code blocks in either [ReasonML](https://reasonml.github.io/) or [OCaml](https://ocaml.org/).

The site is constructed using [Docusaurus v2](https://v2.docusaurus.io/).

Reason/OCaml playground code (still under development):

* `bs.js` is the OCaml compiler, created following the instructions at [Contributing to the BS Playground](https://github.com/BuckleScript/bucklescript/blob/7.0.1/CONTRIBUTING.md#contributing-to-the-bs-playground-bundle).

* `stdlib.js` is a bundle of the standard library implementation files, taken from the [Try Reason](https://github.com/reasonml/reasonml.github.io/tree/source/website/static/js) playground.

* `refmt.js` is the Reason-OCaml transpiler, as installed by `npm install reason`.

* `eval.js` is the Js_of_OCaml toplevel, exporting functions `execute` and `reset`. See [this issue](https://github.com/ocsigen/js_of_ocaml/issues/629) and [this example](https://github.com/ocsigen/js_of_ocaml/tree/master/toplevel/examples/eval).
