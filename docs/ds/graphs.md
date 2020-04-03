---
id: graphs
title: Graphs
---

## Graph Terminology

A **graph** is a general data structure for showing connections among a set of objects.
The objects are called **nodes** or **vertices**, and we will usually label them with a unique number or string.
The connections are called **edges**; an edge connects two nodes.
Depending on the application, there may be additional conditions or properties of edges:

* In an **undirected** graph, an edge linking $x$ to $y$ is also a link from $y$ to $x$.
* In a **directed** graph, we distinguish an edge from $x$ to $y$ (we refer to $x$ as the **source** and $y$ as the **target**) from an edge going the other way, from $y$ to $x$.
* In a **simple** graph, there must be at most one edge connecting any pair of nodes, and there are no **loops** (edges from a node to itself).
* To emphasize that multiple edges are allowed between nodes we may refer to a **multigraph**; to emphasize that loops are allowed we may refer to a **loop graph**. A multigraph with loops is sometimes called a **pseudograph**, although we will generally just refer to all of these variants as graphs and only make distinctions where needed.
* An edge may be **labeled** with a number or string; we do not generally require edge labels to be unique.
* If there is an edge from $x$ to $y$, then we say that $y$ is **adjacent** to $x$.

## Graph Representations

One representation of an unlabeled graph is simply as a set of ordered pairs of nodes.
This corresponds to the usual notion of a **relation** as a set of pairs (sometimes called, perhaps confusingly, the "graph" of the relation).

Another representation is as a function (often given in the form of a table) from nodes to a set of neighbors (_i.e._, the adjacent nodes).
The set of neighbors of each node is often presented as a list, which leads to the term **adjacency list** for this presentation.

A third representation is as an **adjacency matrix**.
If the nodes are numbered 1 through $N$, then the adjacency matrix is the two-dimensional array where the entry in row $i$, column $j$ will be 1 (or 'true') if there is an edge from $i$ to $j$ and 0 ('false') if not.
This representation is often extended to labeled graphs where the labels are **weights**: the entry for $(i,j)$ gives the weight (or distance, or cost, &hellip;) of the edge between $i$ and $j$.
Depending on the application, it may be preferable to use an infinite weight to represent absent edges, rather than 0 (since a weight of 0 might be interpreted as saying there is no cost to go from $i$ to $j$).

Here is some ReasonML code defining types for these representations, plus some conversion functions. In each case, the type is parameterized by a node type `'n`; for some of the conversion functions, we will also pass in a list of the nodes (because there is no generic way to do this for an arbitrary type `'n`, and if `'n` is `int` or `string` we only want to use a subset of the possible values anyway).
```reason edit
type graphPairs('n) = list(('n, 'n));
type graphAdjList('n) = 'n => list('n);
type graphAdjMatrix('n) = ('n, 'n) => bool;

let adjlist_of_pairs = pairs => {
  node => List.map(p => snd(p), List.filter(p => fst(p) == node, pairs))
};

let adjmatrix_of_pairs = pairs => {
  p => List.exists(q => p == q, pairs)
};

let pairs_of_adjlist = (alist, nodes) => {
  List.flatten(List.map(node => List.map(adj => (node, adj), alist(node)), nodes))
};

let adjmatrix_of_adjlist = alist => {
  p => List.exists(node => snd(p) == node, alist(fst(p)))
};

let pairs_of_adjmatrix = (amat, nodes) => {
  List.flatten(List.map(i => List.flatten(List.map(j => if (amat((i, j))) [(i, j)] else [], nodes)), nodes))
};

let adjlist_of_adjmatrix = (amat, nodes) => {
  i => List.filter(j => amat((i, j)), nodes)
};

let demoPairs = [(1, 1), (1, 2), (1, 3), (1, 4), (2, 2), (2, 4), (3, 3), (4, 4)];
let demoAdjList = adjlist_of_pairs(demoPairs);
let demoAdjMatrix =adjmatrix_of_pairs(demoPairs);

let rec print_list = (nums, showNode) => {
  switch (nums) {
  | [] => print_newline()
  | [head, ...tail] => {
      print_string(showNode(head) ++ ", ");
      print_list(tail, showNode)
    }
  }
};

let showAdjList = (alist, nodes, showNode) => {
  List.iter(node => {
      print_string(showNode(node) ++ ": ");
      print_list(alist(node), showNode)
    }, nodes)
};

let showAdjMatrix = (amat, nodes, showNode) => {
  List.iter(i => {
      print_string(showNode(i) ++ ":");
      List.iter(j => {
          if (amat((i, j))) {
            print_string(" 1")
          } else {
            print_string(" 0")
          }
        }, nodes);
      print_newline()
    }, nodes)
};

print_string("Adjacency List:\n");
showAdjList(demoAdjList, [1, 2, 3, 4], string_of_int);
print_string("Adjacency Matrix:\n");
showAdjMatrix(demoAdjMatrix, [1, 2, 3, 4], string_of_int);
```