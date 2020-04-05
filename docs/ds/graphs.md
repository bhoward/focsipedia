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

let layoutGrid = ((nodes, pairs), columns, spacing) => {
  let shift = float_of_int(columns - 1) *. spacing /. 2.;
  let locs = List.mapi((i, node) => {
      let row = i / columns;
      let col = i mod columns;
      (node, (float_of_int(col) *. spacing -. shift, float_of_int(row) *. spacing))
    }, nodes);
  (locs, pairs)
};

let renderLayout = ((locs, pairs), string_of_node, styleNode, styleEdge) => {
  let nodeRadius = 10.;
  let arrowLength = 5.;
  let arrowAngle = radians(30.);
  let loopOut = radians(240.);
  let loopIn = radians(300.);
  let nodes = List.map(((node, p)) => {
      translateP(p,
        styleNode(node, stroke(Color("none"), fill(Color("black"), text(string_of_node(node))))
        +++ circle(nodeRadius)))
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
        setBounds(x -. nodeRadius, x +. nodeRadius, y -. 2. *. nodeRadius, y +. nodeRadius,
          styleEdge(n1, n2, openPath([moveP(p1), curveP(c1, c2, p2), moveP(p2), lineP(p3), moveP(p2), lineP(p4)])))
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
        styleEdge(n1, n2, openPath([moveP(p1), lineP(p2), moveP(p3), lineP(p4), moveP(p3), lineP(p5)]))
      }
    }, pairs);
  let nodeImage = List.fold_left((+++), empty, nodes);
  let edgeImage = List.fold_left((+++), empty, edges);
  nodeImage +++ edgeImage
};

let defaultStyleNode = (node, img) => {
  stroke(Color("black"), fill(Color("white"), img))
};

let defaultStyleEdge = (n1, n2, img) => {
  stroke(Color("black"), img)
};

let customStyleNode = (node, img) => {
  let fillColor = Color(node);
  withFont(0.4, Sans, Regular, Normal, stroke(Color("black"), fill(fillColor, img)))
};

draw(renderLayout(layoutCircle(demoPairs1, 50.), string_of_int, defaultStyleNode, defaultStyleEdge));
draw(renderLayout(layoutGrid(demoPairs2, 3, 50.), string_of_t2, defaultStyleNode, defaultStyleEdge));
draw(renderLayout(layoutCircle(demoPairs3, 50.), s => s, customStyleNode, defaultStyleEdge));
```

## Graph Traversals

We will consider two main ways of traversing a graph here.
In addition to visiting all of the nodes in the graph, each approach will allow us to answer some extra questions about the structure of the graph.
The **depth-first traversal** is analogous to the pre-, in-, and postorder traversals of a tree, in the sense that we will (recursively) visit all of the nodes reachable from one neighbor before backing up and trying another neighbor.
The **breadth-first traversal** by contrast is analogous to the level order traversal of a tree, where we will visit all of the immediate neighbors before continuing on to visit _their_ neighbors, and so on.
Just as with level order traversal, the breadth-first traversal does not have as natural a recursive implementation as depth-first, although we will see that both can be expressed with very similar code by making use of an explicit data structure to control the traversal.
Graph traversals in general are more complicated than tree traversals, because we have to worry about **sharing** of descendants of a node (there may be multiple paths to reach the same node) as well as **cycles** in the graph (there may be paths that loop back on themselves). 
Indeed, one definition of a tree is that it is a graph with a distinguished node, called the root, such that there is a unique path from the root to any other node.

### Depth-First Traversal

To perform a depth-first traversal, we will need to keep track of two additional pieces of information about the nodes.
The first is a set of **visited** nodes; whenever we first arrive at a node, we add it to this set.
The other is the **finishing list**; whenever we have finished examining all of a node's neighbors, we will add it to the head of the finishing list.
When working with a graphical representation, we will color in a node when it is first visited, and then write a number (the **finishing number**) next to the node when it is finished showing its position from the end of the finishing list.
This information corresponds to performing actions according to _preorder_ (visiting) and _postorder_ (finishing) traversal of a tree.[^There is no analogue to _inorder_, because we don't impose any order on the neighbors of a node, so there is no equivalent of having finished the left child and being about to start the right child.]

Here is the basic algorithm for depth-first traversal starting from a node $n$:
* Mark $n$ as visited
* While there is an adjacent unvisited node, $p$
   * Perform a depth-first traversal starting from $p$
* When all nodes adjacent to $n$ are visited, add $n$ to the head of the finishing list.

To traverse all of the nodes in a graph, first choose an arbitrary node and perform a depth-first traversal starting from that node. When that node is finished, if there are any remaining unvisited nodes then choose one and repeat.

Clearly this procedure will eventually visit all of the nodes exactly once.
By keeping track of a little more information, it can also answer some interesting questions about a graph.
As we are traversing the graph, we will put each edge into one of three categories:
* **Tree Edge**: an edge that we follow to get to an adjacent unvisited node
* **Back Edge**: an edge that we do not follow because it leads to a visited, _but not yet finished_, node
* **Forward Edge**: an edge that we do not follow because it leads to an already finished node[^Some authors distinguish between proper forward edges, where there is a path of tree edges leading from the current node to the already finished node, and **cross edges**, where there is not such a path, but we will not need that distinction.]

Here then is the augmented algorithm for depth-first traversal from $n$:
* Mark $n$ as visited
* For each edge $e$ coming out of $n$ and going to a node $p$:
   * If $p$ is unvisited, perform a depth-first traversal from $p$ and mark $e$ as a tree edge
   * If $p$ is visited but not yet finished, mark $e$ as a back edge
   * If $p$ is finished, mark $e$ as a forward edge
* Add $n$ to the finishing list.

The tree edges form what is known as the **depth-first search tree**, with the root at the node where we started the traversal.
More generally, since we get a separate tree each time we restart the traversal, the result of visiting all of the nodes in a graph will in general be a **depth-first search forest** (since a **forest** is just a set of trees).

If we ever find a back edge in traversing a graph, then the graph has a cycle.
Suppose that there is a back edge from $n$ to $p$. Since $p$ is visited but not yet finished, there must be a sequence of tree edges leading from $p$ to $n$ (the current path we are exploring).
That path plus the back edge will form a cycle.
Conversely, if a graph has a cycle, then we will find at least one back edge, because there will be some point in the traversal where we close the loop back to a node on the current path (which will necessarily be visited but not yet finished).

On the other hand, if we find no back edges, then the graph is **acyclic**.
Directed acyclic graphs (often called **dags**) share many of the advantages of trees; indeed, we have already encountered them as combinational circuits, which we viewed as a generalization of boolean expression trees (with shared subterms).
They are also useful to model dependencies, for example showing which tasks must be completed before others (such as prerequisite courses in a college catalog).

Given an acyclic graph, we may "linearize" the nodes by choosing an order in which to list them that respects the dependencies among them (for example, an order in which to take a sequence of classes where all the prerequisites are taken before the courses that depend on them).
This is a generalization of sorting, where the edges in the graph reflect only a "partial" ordering among the items; it is known as **topological sorting**, and the result is a **topological ordering** of the nodes.
The perhaps surprising fact about the finishing list is that, if there were no cycles, then it gives a topological ordering!
The reason is that we can finish a node only after all of the nodes that can be reached from it are finished, so when we put it at the front of the finishing list it will be followed by all of the nodes that depend on it.

As an example of depth-first traversal, consider the following graph:
```reason hidden
let demo = (["A", "B", "C", "D", "E", "F"],
  [("A", "B"), ("A", "C"), ("B", "C"), ("B", "D"), ("D", "A"), ("E", "C"), ("E", "F"), ("F", "D"), ("F", "F")]);
draw(renderLayout(layoutCircle(demo, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```

Start by marking $A$ visited:
```reason hidden
let visitedNode = fill(Color("yellow"));
let finishedNode = n => img => fill(Color("cyan"),
  img +++ translate(8., 12., withFont(0.4, Serif, Regular, Normal, fill(color("black"), text(string_of_int(n))))));
let treeEdge = strokeWidth(3.0);
let backEdge = img => stroke(Color("red"), strokeWidth(2.0, img));
let forwardEdge = img => stroke(Color("green"), strokeWidth(2.0, img));
let ns = node => switch (node) {
| "A" => visitedNode
| _ => defaultStyleNode(node)
};
let es = defaultStyleEdge;
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Follow the (tree) edge to $B$:
```reason hidden
let ns = node => switch (node) {
| "A" | "B" => visitedNode
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") => treeEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Follow the (tree) edge from $B$ to $C$:
```reason hidden
let ns = node => switch (node) {
| "A" | "B" | "C" => visitedNode
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") => treeEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Node $C$ has no neighbors at all, so mark it finished:
```reason hidden
let ns = node => switch (node) {
| "A" | "B" => visitedNode
| "C" => finishedNode(1)
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") => treeEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Back at node $B$, follow the (tree) edge to $D$:
```reason hidden
let ns = node => switch (node) {
| "A" | "B" | "D" => visitedNode
| "C" => finishedNode(1)
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") => treeEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

The only edge out of $D$ goes to $A$, which is visited but not yet finished, so mark it as a back edge and mark $D$ finished:
```reason hidden
let ns = node => switch (node) {
| "A" | "B" => visitedNode
| "C" => finishedNode(1)
| "D" => finishedNode(2)
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") => treeEdge
| ("D", "A") => backEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Now node $B$ is also finished, so back up to node $A$ and consider its remaining outward edge.
It goes to node $C$, which is already finished, so mark it as a forward edge and mark $A$ finished as well:
```reason hidden
let ns = node => switch (node) {
| "A" => finishedNode(4)
| "B" => finishedNode(3)
| "C" => finishedNode(1)
| "D" => finishedNode(2)
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") => treeEdge
| ("D", "A") => backEdge
| ("A", "C") => forwardEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

We still have nodes $E$ and $F$ unvisited. Arbitrarily restart the traversal at $E$, and first consider the edge to $C$. Since $C$ is already finished, this is another forward edge:
```reason hidden
let ns = node => switch (node) {
| "A" => finishedNode(4)
| "B" => finishedNode(3)
| "C" => finishedNode(1)
| "D" => finishedNode(2)
| "E" => visitedNode
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") => treeEdge
| ("D", "A") => backEdge
| ("A", "C") | ("E", "C") => forwardEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Now follow the tree edge from $E$ to $F$, and find the edge from $F$ to $D$ is a forward edge:
```reason hidden
let ns = node => switch (node) {
| "A" => finishedNode(4)
| "B" => finishedNode(3)
| "C" => finishedNode(1)
| "D" => finishedNode(2)
| "E" | "F" => visitedNode
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") | ("E", "F") => treeEdge
| ("D", "A") => backEdge
| ("A", "C") | ("E", "C") | ("F", "D") => forwardEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Finally, the edge from $F$ to itself is a back edge, after which $F$ and then $E$ are finished:
```reason hidden
let ns = node => switch (node) {
| "A" => finishedNode(4)
| "B" => finishedNode(3)
| "C" => finishedNode(1)
| "D" => finishedNode(2)
| "E" => finishedNode(6)
| "F" => finishedNode(5)
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") | ("E", "F") => treeEdge
| ("D", "A") | ("F", "F") => backEdge
| ("A", "C") | ("E", "C") | ("F", "D") => forwardEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo, 40.), s => s, ns, es));
```

Since there were back edges, the graph has at least one cycle. In fact, there are two: $A\rightarrow B\rightarrow D\rightarrow A$, and $F\rightarrow F$. In general, there may not be an exact match between the number of back edges and the number of cycles, because several cycles may share a single back edge.

For another example, here is the same graph with the edges $D\rightarrow A$ and $F\rightarrow F$ removed:
```reason hidden
let demo2 = (["A", "B", "C", "D", "E", "F"],
  [("A", "B"), ("A", "C"), ("B", "C"), ("B", "D"), ("E", "C"), ("E", "F"), ("F", "D")]);
draw(renderLayout(layoutCircle(demo2, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```
We leave the details of tracing through the traversal as an exercise, but here is the final marked graph:
```reason hidden
let ns = node => switch (node) {
| "A" => finishedNode(4)
| "B" => finishedNode(3)
| "C" => finishedNode(1)
| "D" => finishedNode(2)
| "E" => finishedNode(6)
| "F" => finishedNode(5)
| _ => defaultStyleNode(node)
};
let es = (n1, n2) => switch (n1, n2) {
| ("A", "B") | ("B", "C") | ("B", "D") | ("E", "F") => treeEdge
| ("A", "C") | ("E", "C") | ("F", "D") => forwardEdge
| _ => defaultStyleEdge(n1, n2)
};
draw(renderLayout(layoutCircle(demo2, 40.), s => s, ns, es));
```
The finishing list is $E$, $F$, $A$, $B$, $D$, $C$ in this case. Since there were no back edges, this is a topological ordering of the nodes in the graph. Here is the graph with the nodes reordered:
```reason hidden
let demo3 = (["E", "F", "A", "B", "D", "C"],
  [("A", "B"), ("A", "C"), ("B", "C"), ("B", "D"), ("E", "C"), ("E", "F"), ("F", "D")]);
draw(renderLayout(layoutGrid(demo3, 6, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```
Observe that all of the arrows go from left to right. (**TODO** This diagram will look better when the rendering function can use curved arrows to avoid overlap&hellip;.)

Note that other markings are possible, depending on the choices made (which nodes to start at, and the order in which to visit the edges out of each node). As another exercise, perform another traversal of this graph that produces a different marked-up result. Can you find a different topological ordering?

### Breath-First Traversal

TODO