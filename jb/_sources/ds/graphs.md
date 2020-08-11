# Graphs

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
```reason demo
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
```reason demo
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

### ReasonML Implementation of Depth-First Traversal

To write the depth-first traversal as a pure functional program, we do not want to store the extra information (visited and finished lists, and the categorization of the edges) in mutable data structures.
Instead, we will pass around a ReasonML **record** containing the state.
The syntax for records is very much like that in JavaScript: it consists of a comma-separated set of fields of the form `label: value` inside a pair of curly brackets.
To access the field `x` of record `r` we use `r.x`.
To create a new record as a copy of `r`, with field `x` updated to `v`, we write `{...r, x: v}`.

```reason edit
type state('n) = {
  visited: list('n),
  finished: list('n),
  tree: list(('n, 'n)),
  forward: list(('n, 'n)),
  back: list(('n, 'n))
};

type dfsResult('n) = Cycle(('n, 'n)) | TopoOrder(list('n));

let depthFirst = ((nodes, adjList)) => {
  let chooseUnvisited = visited => {
    let unvisited = List.filter(node => !(List.mem(node, visited)), nodes);
    switch (unvisited) {
    | [] => None
    | [head, ..._] => Some(head)
    }
  };

  let rec dfs = (node, state) => {
    let neighbors = adjList(node);
    let state' = List.fold_left((s, n) => {
        if (List.mem(n, s.finished)) {
          {...s, forward: [(node, n), ...s.forward]}
        } else if (List.mem(n, s.visited)) {
          {...s, back: [(node, n), ...s.back]}
        } else {
          let s' = dfs(n, s);
          {...s', tree: [(node, n), ...s'.tree]}
        }
      }, {...state, visited: [node, ...state.visited]}, neighbors);
    {...state', finished: [node, ...state'.finished]}
  };

  let rec run = state => {
    switch (chooseUnvisited(state.visited)) {
    | None => {
        let t = (nodes, state.tree);
        switch (state.back) {
        | [] => (TopoOrder(state.finished), t)
        | [e, ..._] => (Cycle(e), t)
        }
      }
    | Some(node) => run(dfs(node, state))
    }
  };

  let initialState = {
    visited: [],
    finished: [],
    tree: [],
    forward: [],
    back: []
  };

  run(initialState)
};

depthFirst(adjlist_of_pairs(demo));
depthFirst(adjlist_of_pairs(demo2));
```

The returned value from `depthFirst` is a pair of a `dfsResult` and a `graphPairs`.
The `dfsResult` is either `Cycle(e)`, where `e` is a back edge (pair of nodes) causing a cycle, or `TopoOrder(nodes)`, where `nodes` is a list of the graph nodes in topological order.
The `graphPairs` value is the subgraph consisting of just the tree nodes.

Instead of using the recursive helper function `dfs`, which performs a single depth-first exploration starting from a given node, we may perform all of the exploration in the (tail-recursive) helper function `run` by using an explicit stack to keep track of the current path from the starting node. Each entry in the stack can be one of three values: `Visit(n)` says that the current task is to visit node `n`; `Finish(n)` says that the current task is to finish node `n` (note that this is pushed on the stack underneath all of the edges out of `n`, so it will only be done after all of the neighbors are processed); and `Edge(n1, n2)` says that the current task is to consider the edge from `n1` to `n2`. The `run` helper function can now be seen as a loop that continually removes a task from the stack and then updates the stack and the state to perform that task:
```reason edit
type dfsStackItem('n) = Visit('n) | Finish('n) | Edge('n, 'n);

let depthFirst2 = ((nodes, adjList)) => {
  let chooseUnvisited = visited => {
    let unvisited = List.filter(node => !(List.mem(node, visited)), nodes);
    switch (unvisited) {
    | [] => None
    | [head, ..._] => Some(head)
    }
  };

  let rec run = (stack, state) => {
    if (Stack.is_empty(stack)) {
      switch (chooseUnvisited(state.visited)) {
      | None => {
          let t = (nodes, state.tree);
          switch (state.back) {
          | [] => (TopoOrder(state.finished), t)
          | [e, ..._] => (Cycle(e), t)
          }
        }
      | Some(node) => {
          Stack.push(Visit(node), stack);
          run(stack, state)
        }
      }
    } else {
      switch (Stack.pop(stack)) {
      | Visit(n) => {
          Stack.push(Finish(n), stack);
          let neighbors = adjList(n);
          List.iter(n2 => Stack.push(Edge(n, n2), stack), neighbors);
          run(stack, {...state, visited: [n, ...state.visited]})
        }
      | Finish(n) => {
          run(stack, {...state, finished: [n, ...state.finished]})
        }
      | Edge(n1, n2) => {
          if (List.mem(n2, state.finished)) {
            run(stack, {...state, forward: [(n1, n2), ...state.forward]})
          } else if (List.mem(n2, state.visited)) {
            run(stack, {...state, back: [(n1, n2), ...state.back]})
          } else {
            Stack.push(Visit(n2), stack);
            run(stack, {...state, tree: [(n1, n2), ...state.tree]})
          }
        }
      }
    }
  };

  let initialState = {
    visited: [],
    finished: [],
    tree: [],
    forward: [],
    back: []
  };

  run(Stack.create(), initialState)
};

depthFirst2(adjlist_of_pairs(demo));
depthFirst2(adjlist_of_pairs(demo2));
```

### Breath-First Traversal

The big payoff of rewriting the depth-first traversal to use an explicit stack is that we can now explain breadth-first traversal (and level order traversal of a tree) quite simply: instead of a stack, use a queue!
The idea is that the queue is maintaining a list of edges yet to be processed. When the algorithm starts, we push all of the edges of the initial node onto the queue and process them in order.
As we handle each edge, if its target node has not yet been visited, then we push all of its outgoing edges onto the queue, _but they will have to wait until all of the current edges are processed_.
In this way, we visit all of the immediate neighbors first, and then we continue with their neighbors, followed by their neighbors' neighbors, _etc_., until the entire graph is traversed.

Breadth-first traversal is desirable when the graph might be large and we want to stop searching when we find the closest match, or if we only want to process items within a given distance (for example, it is used in game-playing strategies to look ahead up to a certain number of moves). Several famous algorithms can also be viewed as variants of breadth-first traversal.

#### Dijkstra's Algorithm

Consider a labeled graph where each edge has an associated (non-negative) distance or cost.
Instead of using a queue to store the edges under consideration, we will use a **priority queue** (perhaps implemented as a binary heap). By assigning a priority based on the total length of the path from the starting node (including the edge under consideration), Dijkstra's algorithm will greedily build a **shortest-path tree** with the starting node as the root. This is an effective way to answer questions like "what is the shortest travel time from $A$ to $B$?" or "what is the closest node to $A$ with a given property?"

#### Prim's Algorithm

If we have an _undirected_ graph and perform Dijkstra's algorithm with the priority of an edge being just the cost of that edge alone, then instead of a shortest-path tree we get a **minimum spanning tree**.
This is the smallest subset of edges that connects all of the nodes, with the least possible total cost of the edges.

(TODO examples will have to wait until the tree rendering can do labels&hellip;)

## Exercises

1. Give the list of pairs, adjacency list, and adjacency matrix representations for the following _undirected_ graph:
```reason hidden
let ex1 = (["A", "B", "C", "D"], [("A", "B"), ("B", "A"), ("A", "C"), ("C", "A"), ("B", "C"), ("C", "B"), ("A", "D"), ("D", "A")]);
draw(renderLayout(layoutGrid(ex1, 2, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```

[[spoiler | Answer]]
| ```reason hidden
| print_string("Pairs\n");
| showPairs(ex1, s => s);
| print_string("Adjacency List:\n");
| showAdjList(adjlist_of_pairs(ex1), s => s);
| print_string("Adjacency Matrix:\n");
| showAdjMatrix(adjmatrix_of_pairs(ex1), s => s);
| ```

2. Consider the adjacency matrix representation of a graph. What can you say about the matrix if the graph is undirected? What if the graph has loops on all of the nodes?

[[spoiler | Answer]]
| An undirected graph will have a _symmetric_ adjacency matrix: the entry in row $i$, column $j$ is the same as the entry in row $j$, column $i$ (symmetric about the diagonal).
| A graph with all of the self-loops will have 1's along the diagonal (and a simple graph, with no loops, will have 0's on the diagonal).

3. (Based on a problem from Aho &amp; Ullman) Consider the following directed graph:
```reason hidden
let ex3 = (["a", "b", "c", "d", "e", "f"], [("a", "b"), ("a", "d"), ("b", "c"), ("b", "f"), ("c", "d"), ("d", "e"), ("e", "b"), ("e", "f"), ("f", "a")]);
draw(renderLayout(layoutCircle(ex3, 40.), s => s, defaultStyleNode, defaultStyleEdge));
```

   * Give two different depth-first traversal trees starting at node $a$. For each, also label the graph to show the forward and back edges, and the finishing number.

[[spoiler | Answer]]
| Using depth-first traversal (others are possible):
| ```reason hidden
| let finishedNode = n => img => fill(Color("white"),
|   img +++ translate(12., 6., withFont(0.4, Serif, Regular, Normal, fill(color("black"), text(string_of_int(n))))));
| let ns1 = node => switch (node) {
| | "a" => finishedNode(6)
| | "b" => finishedNode(5)
| | "c" => finishedNode(4)
| | "d" => finishedNode(3)
| | "e" => finishedNode(2)
| | "f" => finishedNode(1)
| | _ => defaultStyleNode(node)
| };
| let es1 = (n1, n2) => switch (n1, n2) {
| | ("a", "b") | ("b", "c") | ("c", "d") | ("d", "e") | ("e", "f") => treeEdge
| | ("f", "a") | ("e", "b") => backEdge
| | ("b", "f") | ("a", "d") => forwardEdge
| | _ => defaultStyleEdge(n1, n2)
| };
| draw(renderLayout(layoutCircle(ex3, 40.), s => s, ns1, es1));
| let ns2 = node => switch (node) {
| | "a" => finishedNode(6)
| | "b" => finishedNode(3)
| | "c" => finishedNode(1)
| | "d" => finishedNode(5)
| | "e" => finishedNode(4)
| | "f" => finishedNode(2)
| | _ => defaultStyleNode(node)
| };
| let es2 = (n1, n2) => switch (n1, n2) {
| | ("a", "d") | ("d", "e") | ("e", "b") | ("b", "c") | ("b", "f") => treeEdge
| | ("c", "d") | ("f", "a") => backEdge
| | ("e", "f") | ("a", "b") => forwardEdge
| | _ => defaultStyleEdge(n1, n2)
| };
| draw(renderLayout(layoutCircle(ex3, 40.), s => s, ns2, es2));
| ```

   * Find the distance (length of the shortest path) from $a$ to each of the other nodes.

[[spoiler | Answer]]
| Using breadth-first traversal:
| ```reason hidden
| let ns3 = node => switch (node) {
| | "a" => finishedNode(0)
| | "b" => finishedNode(1)
| | "c" => finishedNode(2)
| | "d" => finishedNode(1)
| | "e" => finishedNode(2)
| | "f" => finishedNode(2)
| | _ => defaultStyleNode(node)
| };
| let es3 = (n1, n2) => switch (n1, n2) {
| | ("a", "b") | ("a", "d") | ("b", "c") | ("b", "f") | ("d", "e") => treeEdge
| | _ => defaultStyleEdge(n1, n2)
| };
| draw(renderLayout(layoutCircle(ex3, 40.), s => s, ns3, es3));
| ```


4. What would go wrong in Dijkstra's algorithm if we allowed edges with a negative cost? Give an example where it fails to find the shortest path.

[[spoiler | Answer]]
| With negative cost edges the greedy approach to building the shortest-path tree is not guaranteed to find the shortest paths.
| Suppose there is an edge from $A$ to $B$ with cost 2, and an edge from $A$ to $C$ with cost 3: Dijkstra's algorithm will say that the shortest path from $A$ to $B$ has cost 2, without even looking at node $C$.
| However, if there is an edge from $C$ to $B$ with cost $-2$, then the better route would be to go $A\rightarrow C\rightarrow B$, with total cost 1.
|
| Even worse, if there were a cycle in the graph with a total negative cost (such as $A$ to $B$ with cost 1, but $B$ to $A$ with cost $-2$), then any path touching that cycle could be extended to follow the cycle any number of times, leading to an arbitrarily low (large negative) cost! For such a graph, the notion of "shortest path" is undefined.
