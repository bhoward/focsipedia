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

Here is some ReasonML code defining types for these representations, plus some conversion functions. In each case, the type is parameterized by a node type `'n`, and the representation type is a pair where the first element is the list of nodes (because there is no generic way to get this list for an arbitrary type `'n`, and if `'n` is `int` or `string` we only want to use a subset of the possible values anyway). The code uses a number of standard functions on lists such as `List.map` and `List.filter`; for details, see the [library documentation](https://reasonml.github.io/api/List.html).
```reason edit
type graphPairs('n) = (list('n), list(('n, 'n)));
type graphAdjList('n) = (list('n), 'n => list('n));
type graphAdjMatrix('n) = (list('n), ('n, 'n) => bool);

let adjlist_of_pairs = ((nodes, pairs)) => {
  (nodes,
    node => List.map(p => snd(p), List.filter(p => fst(p) == node, pairs))
  )
};

let adjmatrix_of_pairs = ((nodes, pairs)) => {
  (nodes,
    p => List.exists(q => p == q, pairs)
  )
};

let pairs_of_adjlist = ((nodes, alist)) => {
  (nodes,
    List.flatten(List.map(node => List.map(adj => (node, adj), alist(node)), nodes))
  )
};

let adjmatrix_of_adjlist = ((nodes, alist)) => {
  (nodes,
    p => List.exists(node => snd(p) == node, alist(fst(p)))
  )
};

let pairs_of_adjmatrix = ((nodes, amat)) => {
  (nodes,
    List.flatten(List.map(i => List.flatten(List.map(j => if (amat((i, j))) [(i, j)] else [], nodes)), nodes))
  )
};

let adjlist_of_adjmatrix = ((nodes, amat)) => {
  (nodes,
    i => List.filter(j => amat((i, j)), nodes)
  )
};

let rec print_list = (items, string_of_item) => {
  switch (items) {
  | [] => print_newline()
  | [last] => print_string(string_of_item(last) ++ "\n")
  | [head, ...tail] => {
      print_string(string_of_item(head) ++ ", ");
      print_list(tail, string_of_item)
    }
  }
};

let string_of_pair = (p, string_of_item) => {
  "(" ++ string_of_item(fst(p)) ++ "," ++ string_of_item(snd(p)) ++ ")"
};

let showPairs = ((nodes, pairs), string_of_node) => {
  print_list(pairs, p => string_of_pair(p, string_of_node))
};

let showAdjList = ((nodes, alist), string_of_node) => {
  List.iter(node => {
      print_string(string_of_node(node) ++ ": ");
      print_list(alist(node), string_of_node)
    }, nodes)
};

let showAdjMatrix = ((nodes, amat), string_of_node) => {
  List.iter(i => {
      print_string(string_of_node(i) ++ ":");
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

print_string("Example 1\n");
let nodes1 = [1, 2, 3, 4];
let demoPairs1 = (nodes1, [(1, 1), (1, 2), (1, 3), (1, 4), (2, 2), (2, 4), (3, 3), (4, 4)]);
let demoAdjList1 = adjlist_of_pairs(demoPairs1);
let demoAdjMatrix1 =adjmatrix_of_pairs(demoPairs1);

print_string("Pairs\n");
showPairs(demoPairs1, string_of_int);
print_string("Adjacency List:\n");
showAdjList(demoAdjList1, string_of_int);
print_string("Adjacency Matrix:\n");
showAdjMatrix(demoAdjMatrix1, string_of_int);

print_string("\nExample 2\n");
type t2 = A | B | C | D;
let nodes2 = [A, B, C, D];
let string_of_t2 = x => {
  switch (x) {
  | A => "A"
  | B => "B"
  | C => "C"
  | D => "D"
  }
};
let demoAdjList2 = (nodes2, node => {
  switch (node) {
  | A => [B, D]
  | B => [A, C]
  | C => [B]
  | D => [A]
  }
});
let demoPairs2 = pairs_of_adjlist(demoAdjList2);
let demoAdjMatrix2 = adjmatrix_of_adjlist(demoAdjList2);

print_string("Pairs\n");
showPairs(demoPairs2, string_of_t2);
print_string("Adjacency List:\n");
showAdjList(demoAdjList2, string_of_t2);
print_string("Adjacency Matrix:\n");
showAdjMatrix(demoAdjMatrix2, string_of_t2);

print_string("\nExample 3\n");
let nodes3 = ["red", "green", "yellow"];
let demoAdjMatrix3 = (nodes3, ((i, j)) => {
  switch ((i, j)) {
  | ("red", "green") => true
  | ("green", "yellow") => true
  | ("yellow", "red") => true
  | _ => false
  }
});
let demoPairs3 = pairs_of_adjmatrix(demoAdjMatrix3);
let demoAdjList3 = adjlist_of_adjmatrix(demoAdjMatrix3);

print_string("Pairs\n");
showPairs(demoPairs3, s => s);
print_string("Adjacency List:\n");
showAdjList(demoAdjList3, s => s);
print_string("Adjacency Matrix:\n");
showAdjMatrix(demoAdjMatrix3, s => s);
```

Here is a collection of functions to render a graph (represented as pairs) with DPoodle:
```reason edit
type graphLayout('n) = (list(('n, (float, float))), list(('n, 'n)));

let layoutCircle = ((nodes, pairs), radius)=> {
  let a = 360. /. float_of_int(List.length(nodes));
  let locs = List.mapi((i, node) => (node, polar(radius, a *. float_of_int(i))), nodes);
  (locs, pairs)
};

let renderLayout = ((locs, pairs), string_of_node) => {
  let nodeRadius = 10.;
  let arrowLength = 5.;
  let arrowAngle = radians(30.);
  let loopOut = radians(240.);
  let loopIn = radians(300.);
  let nodes = List.map(((node, p)) => {
      translateP(p,
        stroke(Color("none"), fill(Color("black"), text(string_of_node(node))))
        +++ stroke(Color("black"), fill(Color("white"), circle(nodeRadius))))
    }, locs);
  let edges = List.map(((n1, n2)) => {
      if (n1 == n2) {
        let p = List.assoc(n1, locs);
        let (x, y) = p;
        let p1 = (x +. nodeRadius *. cos(loopOut), y +. nodeRadius *. sin(loopOut));
        let p2 = (x +. nodeRadius *. cos(loopIn), y +. nodeRadius *. sin(loopIn));
        let c1 = (x +. 3. *. nodeRadius *. cos(loopOut), y +. 3. *. nodeRadius *. sin(loopOut));
        let c2 = (x +. 3. *. nodeRadius *. cos(loopIn), y +. 3. *. nodeRadius *. sin(loopIn));
        let (x2, y2) = p2;
        let p3 = (x2 +. arrowLength *. cos(loopIn +. arrowAngle), y2 +. arrowLength *. sin(loopIn +. arrowAngle));
        let p4 = (x2 +. arrowLength *. cos(loopIn -. arrowAngle), y2 +. arrowLength *. sin(loopIn -. arrowAngle));
        stroke(Color("black"), openPath([moveP(p1), curveP(c1, c2, p2), moveP(p2), lineP(p3), moveP(p2), lineP(p4)]))
      } else {
        let p1 = List.assoc(n1, locs);
        let p2 = List.assoc(n2, locs);
        let (x1, y1) = p1;
        let (x2, y2) = p2;
        let dx = x2 -. x1;
        let dy = y2 -. y1;
        let a = atan2(dy, dx);
        let p3 = (x2 -. nodeRadius *. cos(a), y2 -. nodeRadius *. sin(a));
        let (x3, y3) = p3;
        let p4 = (x3 -. arrowLength *. cos(a +. arrowAngle), y3 -. arrowLength *. sin(a +. arrowAngle));
        let p5 = (x3 -. arrowLength *. cos(a -. arrowAngle), y3 -. arrowLength *. sin(a -. arrowAngle));
        stroke(Color("black"), openPath([moveP(p1), lineP(p2), moveP(p3), lineP(p4), moveP(p3), lineP(p5)]))
      }
    }, pairs);
  let nodeImage = List.fold_left((+++), empty, nodes);
  let edgeImage = List.fold_left((+++), empty, edges);
  nodeImage +++ edgeImage
};

draw(renderLayout(layoutCircle(demoPairs1, 50.), string_of_int));
draw(renderLayout(layoutCircle(demoPairs2, 50.), string_of_t2));
draw(renderLayout(layoutCircle(demoPairs3, 50.), s => s));
/* TODO add custom style functions to nodes and edges */
```