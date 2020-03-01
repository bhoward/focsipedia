---
id: mapreduce
title: MapReduce
author: Brian Howard
---
import useBaseUrl from '@docusaurus/useBaseUrl';

No reading for today. We will talk about the `map` and `reduce` functions on lists, and how they made Google what it is today.

<!--truncate-->
For reference, here are the definitions of `map` and `reduce` developed in class (this version of `reduce` is often called `foldLeft`):

```reason edit
let rec map = (f, aList) => {
  switch (aList) {
  | [] => []
  | [head, ...tail] => [f(head), ...map(f, tail)]
  }
};

let rec reduce = (g, init, aList) => {
  switch (aList) {
  | [] => init
  | [head, ...tail] => reduce(g, g(init, head), tail)
  }
};

map(n => {2 * n}, [1, 2, 3, 4]);
reduce((+), 0, [1, 2, 3, 4]);
reduce((*), 1, [1, 2, 3, 4]);
reduce((summary, n) => {summary ++ "," ++ string_of_int(n)}, "", [1, 2, 3, 4]);
reduce((+), 0, map(n => {2 * n}, [1, 2, 3, 4]));
```
