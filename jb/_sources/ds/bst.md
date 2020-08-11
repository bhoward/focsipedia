# Binary Search Trees and Heaps

Let us consider binary trees whose values can be ordered.
For concreteness, we will just take the value type to be `int`, although it could just as well be `string` or `float` or anything else with a comparison operator.

## Binary Search Trees

If we add the restriction to binary trees that all of the values in the left subtree of any node have to be less than (or equal to) the value in the node, and all of the values in the right subtree have to be greater than (or equal to) that value, then we get a **binary search tree**.

Here is our type definition for binary trees again, plus a function that checks whether the binary search tree (BST) condition holds for a given `tree(int)`.
It works by checking that the root value is between `int_min` and `int_max` (which should be trivially true), and then recursively checking that each subtree contains values in an appropriate restriction of that range.
```reason edit
type tree('a) = EmptyTree | TreeNode(tree('a), 'a, tree('a));

let leaf = a => { TreeNode(EmptyTree, a, EmptyTree) };

let checkBST = t => {
  /* check that all values in t are between min and max, inclusive,
   * and that all subtrees satisfy the BST condition
   */
  let rec aux = (t, min, max) => {
    switch (t) {
    | EmptyTree => true
    | TreeNode(left, n, right) => (min <= n) && (n <= max)
        && aux(left, min, n) && aux(right, n, max)
    }
  };

  aux(t, min_int, max_int)
};

let demo = TreeNode(leaf(17), 34, TreeNode(leaf(38), 42, leaf(50)));
checkBST(demo);
```

Here is the `demo` tree rendered with the `showTree` function:

```reason hidden
let rec showTree = (t, show) => {
  switch (t) {
  | EmptyTree => solid(Color("black"), circle(2.))
  | TreeNode(lt, value, rt) => {
      let showLeft = showTree(lt, show);
      let showRight = showTree(rt, show);
      let leftShift = right(showLeft) +. 10.;
      let rightShift = left(showRight) -. 10.;
      let leftLine = openPath([moveXY(0., 0.), lineXY(leftShift, -30.)]);
      let rightLine = openPath([moveXY(0., 0.), lineXY(rightShift, -30.)]);
      let leftImage = focus(TR, showLeft +++ focus(BL, leftLine));
      let rightImage = focus(TL, showRight +++ focus(BR, rightLine));
      let valueImage = stroke(Color("none"), fill(Color("black"), text(show(value))))
        +++ stroke(Color("black"), fill(Color("white"), square(20.)));
      valueImage +++ leftImage +++ rightImage
    }
  }
};
```

```reason edit
draw(showTree(demo, string_of_int));
```

The advantage of a binary search tree is that it provides a fast way to determine whether a given value is in the data structure.
If we just have a list of $N$ elements, then the best we can do is a linear traversal that will take $O(N)$ time.
By sorting the list, we can stop looking for an element as soon as we see something greater than or equal to it; on average this will require looking through only half of the list, but that is still $O(N)$.
If we had a way to access the $i^\textrm{th}$ element of the list in constant ($O(1)$) time, then we could do better on a sorted list by using binary search, but the linked list data structure does not permit quick access to an arbitrary element; you have to traverse the entire list to get to the $i^\textrm{th}$ node.

However, a binary search tree is arranged precisely to allow direct access to each of the elements needed when performing a binary search.
In a well-balanced tree, the root will be (close to) the middle element, where the search starts.
Each time we inspect a node, if we do not find the value we are looking for then we can narrow our search to one of the two subtrees.
The root of the selected subtree should be (close to) the middle element of half of the elements remaining to be searched.
Since we cut the set of values to be searched (the **search space**) roughly in half after each element we examine, we will only need to look at $O(\log N)$ elements to decide whether our given value is present.
Because the logarithm function grows so slowly, this means that even for billions of data items we will only have to look at a few dozen of them![^A nice rule of thumb is that every factor of 1000 adds ten to the number of comparisons in binary search, since $\log_2 1000\approx 10$.]

Binary search is very easy to write by pattern matching on a tree:
```reason edit
let rec search = (t, x) => {
  switch (t) {
  | EmptyTree => false
  | TreeNode(left, n, right) =>
      if (x == n) {
        true
      } else if (x < n) {
        search(left, x)
      } else {
        search(right, x)
      }
  }
};

search(demo, 42);
search(demo, 43);
```

### Worst Case for Binary Search

Of course, the calculations above about running time only apply if the tree is well-balanced.
In the worst case, suppose that the root of the tree had the smallest (or largest) value; then all of the
other values would be concentrated in just one of the subtrees.
If _every_ node had that misfortune, then at each comparison we would only reduce the search space by 1.
That would mean that in the worst case we would have to examine every node in the tree: that would be $O(N)$, and we might as well be using a linked list!

You might think that this case is very unlikely, but consider the following function to build a binary search tree from a given list:
```reason edit
let rec insert = (t, x) => {
  switch (t) {
  | EmptyTree => leaf(x)
  | TreeNode(left, n, right) =>
      if (x < n) {
        TreeNode(insert(left, x), n, right)
      } else {
        TreeNode(left, n, insert(right, x))
      }
  }
};

let rec insertAll = (t, xs) => {
  switch (xs) {
  | [] => t
  | [head, ...tail] => insertAll(insert(t, head), tail)
  }
};

let buildBST = nums => { insertAll(EmptyTree, nums) };
```

Here is what happens if we build a BST from an already sorted list:
```reason edit
let badBST = buildBST([1, 2, 3, 4, 5, 6, 7, 8, 9]);
draw(showTree(badBST, string_of_int));
```
It is not at all unusual to build a binary search tree from a collection that is already sorted, or even close to sorted, so a serious implementation of this data structure will have to do extra work to ensure that it stays balanced.
We will not go into the details here, but good approaches to binary search trees that are guaranteed to be balanced are Red-Black trees or AVL trees.

### Tree Sort

By combining the `buildBST` function with an inorder traversal that collects all of the elements of the tree back into a list, we get another way to sort a list of numbers:
```reason edit
let rec inorderCollect = t => {
  switch (t) {
  | EmptyTree => []
  | TreeNode(left, n, right) => inorderCollect(left) @ [n] @ inorderCollect(right)
  }
};

let treeSort = nums => { inorderCollect(buildBST(nums)) };

treeSort([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
This will have an average case running time of $O(N\log N)$, and if we put some effort into ensuring that the intermediate tree was well-balanced then that would also be the worst-case time.

## Heaps

Another interesting data structure related to the binary search tree is the (binary) heap.
Just as before, we will consider trees with `int` values, but now the ordering condition will be that the root value is less than or equal to _all_ of the rest of the values in the tree; as with the BST condition, this **heap condition** needs to hold recursively for every subtree.

Here is a function to check the heap condition:
```reason edit
let checkHeap = t => {
  let rec aux = (t, min) => {
    switch (t) {
    | EmptyTree => true
    | TreeNode(left, n, right) => (min <= n)
        && aux(left, n) && aux(right, n)
    }
  };

  aux(t, min_int)
};

let heapDemo = TreeNode(leaf(42), 17, TreeNode(leaf(50), 34, leaf(38)));
checkHeap(heapDemo);
draw(showTree(heapDemo, string_of_int));
```

Note that the ordering condition for a heap is somewhat looser than for a BST: there is no restriction on the relative values between the left and right subtrees, only between the root and its descendents.

The heap condition guarantees that the smallest value will always be at the root.
This makes the heap a good implementation of the concept of a **priority queue**.
Like an ordinary queue, values can be added and removed from a priority queue; instead of removing the value that has been in the queue the longest, however, the value removed from a priority queue will be the _smallest_.
(This is technically known as a **minheap**.
Reversing the test in the condition will give a **maxheap**, where the largest value is at the root and the corresponding priority queue always returns the largest remaining element.)

The most important operation on heaps is the `heapMerge`: given two heaps, combine their elements into a single heap. As usual, this is straightforward by pattern matching. In fact, here is a version known as the **skew merge** that has a surprising additional property:
```reason edit
let rec heapMerge = (h1, h2) => {
  switch (h1, h2) {
  | (EmptyTree, _) => h2
  | (_, EmptyTree) => h1
  | (TreeNode(l1, n1, r1), TreeNode(l2, n2, r2)) =>
      if (n1 <= n2) {
        TreeNode(heapMerge(h2, r1), n1, l1)
      } else {
        TreeNode(heapMerge(h1, r2), n2, l2)
      }
  }
};
```
The new smallest element must be either the root of `h1` (`n1`) or `h2` (`n2`). After deciding to put that value at the root of the resulting tree, we have its two children plus the other heap to deal with, but we only have space for two subheaps. By merging the other heap with the right child, but putting the result on the left, the skew merge can be shown to be **self-adjusting**; that is, it will stay balanced enough that, at least over the long run, all operations can be performed in logarithmic time.

Using the `heapMerge` function, we can implement `heapInsert` and `removeMin` easily:
```reason edit
let heapInsert = (h, x) => { heapMerge(h, leaf(x)) };

let removeMin = h => {
  switch (h) {
  | EmptyTree => None
  | TreeNode(left, n, right) => Some((n, heapMerge(left, right)))
  }
};

let Some((min, rest)) = removeMin(heapDemo);
draw(showTree(rest, string_of_int));
```

### Heapsort

Finally, if we start with a list, insert each of the numbers in turn into an initially empty heap, and then repeatedly remove the smallest element from the heap until it is empty, we get another efficient sorting algorithm.
Known as **Heapsort**, it is guaranteed to be $O(N\log N)$, as long as we can ensure the heap is relatively balanced.
```reason edit
let rec heapInsertAll = (h, nums) => {
  switch (nums) {
  | [] => h
  | [head, ...tail] => heapInsertAll(heapInsert(h, head), tail)
  }
};

let buildHeap = nums => { heapInsertAll(EmptyTree, nums) };

let rec removeAll = h => {
  switch (removeMin(h)) {
  | None => []
  | Some((min, rest)) => [min, ...removeAll(rest)]
  }
};

let heapSort = nums => removeAll(buildHeap(nums));

heapSort([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```

## Exercises

1. Consider the following tree:
```reason hidden
let t = TreeNode(TreeNode(TreeNode(leaf(5), 3, leaf(7)), 2, leaf(4)), 1, TreeNode(leaf(9), 6, leaf(8)));
draw(showTree(t, string_of_int));
```
List the values according to the preorder, inorder, postorder, and level order traversals.

[[spoiler | Answer]]
| Preorder: 1, 2, 3, 5, 7, 4, 6, 9, 8
|
| Inorder: 5, 3, 7, 2, 4, 1, 9, 6, 8
|
| Postorder: 5, 7, 3, 4, 2, 9, 8, 6, 1
|
| Level order: 1, 2, 6, 3, 4, 9, 8, 5, 7

2. Show the result of removing the minimum item from the tree in Exercise 1, treating it as a binary heap (you may use either the skew merge function described above or the complete binary tree implementation described in class).

[[spoiler | Answer]]
| Using the skew merge:
| ```reason hidden
| switch (removeMin(t)) {
| | None => ()
| | Some((min, rest)) => {
|     Printf.printf("Minimum value is %d\n", min);
|     draw(showTree(rest, string_of_int));
|   }
| }
| ```
|
| Using the complete tree implementation:
| ```reason hidden
| print_string("Minimum value is 1\n");
| let t2 = TreeNode(TreeNode(TreeNode(leaf(7), 5, EmptyTree), 3, leaf(4)), 2, TreeNode(leaf(9), 6, leaf(8)));
| draw(showTree(t2, string_of_int));
| ```

3. Suppose you tried to use the tree from Exercise 1 as a binary search tree. For which values would the `search` function return `true`?

[[spoiler | Answer]]
| Searching for 1, 6, and 8 would be successful.
| Searching for any of the other numbers would result in the search looking at the wrong subtree at some point.