---
id: lists
title: Sorting Lists
---

We have already seen [how to work with lists in a functional language](../fp/map-reduce.md).
The focus here will be on functional approaches to sorting lists; for simplicity we will work with lists of integers, although the techniques extend to any type with a total ordering relation.

## Insertion Sort

One of the simplest methods for sorting a list is based on the `insert` function, which adds one element in the correct position within an already sorted list.
Suppose that `nums` is a (possibly empty) list of numbers, arranged in non-decreasing order, and we wish to insert the number `n`.
If `nums` is empty, then the result will just be the list `[n]`; otherwise, split the list into a `head` element (which must be the smallest) and a `tail` list.
If `n` is no larger than `head`, then `n` will be the smallest number overall, and we may insert it in front of `head`.
On the other hand, if `n` is larger than `head`, then `head` is still the smallest and must come first, while `n` must be inserted somewhere in the `tail`.
However, inserting `n` into the `tail` is the same problem we started with (insert a number into a sorted list), except the list is smaller&mdash;this is exactly the setup we need to make a recursive call to finish the job.

In code, here is the procedure we just described:
```reason edit
/* Precondition: nums is sorted in non-decreasing order */
let rec insert = (nums, n) => {
  switch (nums) {
  | [] => [n]
  | [head, ...tail] =>
    if (n <= head) {
      [n, ...nums]
    } else {
      [head, ...insert(tail, n)]
    }
  }
};

insert([], 42);
insert([63], 42);
insert([17, 63], 42);
insert([17, 39], 42);
```

Once we have the `insert` function, it is easy to build a sorting function based on it.
If we want to sort an empty list, then we are done.
Otherwise, we have a non-empty list that may be split (using pattern matching) into a head and a tail.
Recursively sorting the tail will give us a sorted list, and then we just need to insert the head into it:
```reason edit
let rec insertion_sort = nums => {
  switch (nums) {
  | [] => []
  | [head, ...tail] => insert(insertion_sort(tail), head)
  }
};

insertion_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
Although this is simple, the call to `insertion_sort` is not a tail-recursive call&mdash;that is, the recursive call is not the last thing done, because it still needs to call `insert` after the recursion finishes.
That can cause problems when the list is large, because each recursive call needs to be saved on the function-call stack and we run the danger of overflowing the stack.

Another approach is to traverse the list from left to right, building up a sorted list by inserting each successive element (thus the sorted list is an **accumulator**&mdash;an extra argument that collects the result as the calculation proceeds; this is a common trick when making a function tail-recursive).
Because the last action of the `aux` function in the recursive case is to call itself, this solution is properly tail-recursive[^1]
and the ReasonML compiler will be able to produce code that doesn't overflow the stack no matter how many numbers we are sorting.[^2]
```reason edit
let insertion_sort_left = nums => {
  let rec aux = (sorted, nums) => {
    switch (nums) {
    | [] => sorted
    | [head, ...tail] => aux(insert(sorted, head), tail)
    }
  };
  aux([], nums)
};

insertion_sort_left([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
Note that the helper function here (`aux`) is essentially the same as the `reduce` function we saw in the [MapReduce](../fp/map-reduce.md) section.
The ReasonML standard library provides the `reduce` function under the name `List.fold_left`, so we can also define insertion sort as:
```reason edit
let insertion_sort_left2 = nums => {
  List.fold_left(insert, [], nums)
};

insertion_sort_left2([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
Using currying, we can simplify this to `let insertion_sort_left2 = List.fold_left(insert, [])`.

[^1]: Well, it would be if we also modified the `insert` function itself to be tail-recursive; this is left as an exercise.

[^2]: In fact, when the compiler sees a tail-recursive call, it can essentially turn the recursive call into a loop back up to the top of the function, without needing to push a new function call on the stack. It is able to do this because it knows there is nothing left to do in the original call, so there is no need to return to where we left off.

## Selection Sort

Instead of having to go through the list to find the correct insertion point each time we want to add a number to the sorted list, we might try to do more work "up front" and choose the numbers to be added in the correct order.
This is the idea behind **selection sort**: given a non-empty list of numbers, if we can separate the smallest number from the rest, then that number will definitely be the head of the resulting sorted list and we will never have to adjust its position during the rest of the sorting operation.
So, our first goal is to write a `select` function that takes a non-empty list and splits it into the smallest element plus a list of all of the other elements.

We may approach this using recursion: to find the smallest element in the list, first find the smallest element in the tail of the list (if any), then compare it against the head and keep the smaller of the two.
The result should be a pair of the smallest element plus a list of all of the other elements.
This leads to the following code:
```reason edit
/* Precondition: nums is non-empty */
let rec select = nums => {
  switch (nums) {
  | [n] => (n, [])
  | [head, ...tail] => {
      /* We know that tail is non-empty */
      let (small, rest) = select(tail);
      if (head <= small) {
        (head, tail)
      } else {
        (small, [head, ...rest])
      }
    }
  }
};

select([42]);
select([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
Note that it only makes sense to call `select` on a non-empty list, so we must make sure that we satisfy that precondition when making the recursive call.
ReasonML warns us that we are not handling all of the cases with our patterns, but we may ignore the warning here.

The `select` function is not tail-recursive, so again we might look for an alternate way to compute it using an accumulator and a helper function.
Think of the usual process of searching a list for the smallest element: choose the first element as our initial guess, and then examine each of the rest of the numbers, refining our guess whenever we find a smaller element.
If our accumulator is the pair consisting of the smallest element seen so far (our current guess), plus a list of all of the other numbers examined, then we can view the selection process as a left-to-right reduction:
```reason edit
/* Precondition: nums is non-empty */
let select_left = nums => {
  let rec aux = (nums, accum) => {
    switch (nums) {
    | [] => accum
    | [head, ...tail] => {
        let (small, rest) = accum;
        if (head < small) {
          aux(tail, (head, [small, ...rest]))
        } else {
          aux(tail, (small, [head, ...rest]))
        }
      }
    }
  };
  
  switch (nums) {
  | [head, ...tail] => aux(tail, (head, []))
  }
};

select_left([42]);
select_left([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```

Once we have a selection function, the selection sort is easy to write recursively:
```reason edit
let rec selection_sort = nums => {
  switch (nums) {
  | [] => []
  | _ => {
      let (small, rest) = select(nums);
      [small, ...selection_sort(rest)]
    }
  }
};

selection_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
One of the exercises asks you to find a way to write this using tail-recursion.

## Running Time of Insertion and Selection Sort

The `insert` and `select` functions each make a pass through all of the elements in their list argument, at least in the worst case (insertion will stop early if it finds the correct position, but selection needs to examine the entire list).
When doing an insertion sort, the `insert` function is called on successively longer lists, so its running time will be proportional to the sum $1+2+\ldots+N$, where $N$ is the size of the list to be sorted. We have seen that this sum is $\frac{N(N+1)}{2}$, which is quadratic in $N$ (_i.e._, we say that it is $O(N^2)$). Similarly, when doing a selection sort, the `select` function is initially called on a list of size $N$, and then on successively smaller lists: $N+(N-1)+\ldots+2+1$, which is the same sum in reverse.

Therefore, the worst-case running time of both sorting algorithms is $O(N^2)$, and they are known as **quadratic sorts**. The average case for insertion sort might seem to be better, because on average the insertion process will only have to traverse half of the list to find the correct insertion point (as long as the input is random).
However, that gives us a running time proportional to $\frac{1}{4}N^2$, which is still quadratic.
For lists with millions of items, a quadratic sort will perform trillions of operations, which might be too long to wait (even at a billion operations per second, that could easily take on the order of an hour).
So, we might wonder if there is a faster approach to such a fundamental operation as sorting.

## Merge Sort

Instead of inserting one element at a time into a sorted list, the strategy for merge sort is to insert an entire sorted collection of items in a single operation.
Since the items are in order, we know that after finding the correct insertion position for one item we can start looking from there for the next item's position, without having to start back at the beginning.
If we are merging two sorted lists, each of size $N$, then the total time taken will be $O(N)$ instead of the $O(N^2)$ required to insert $N$ items one at a time.
Of course, we still need to sort each of the lists being merged, but since these are each only half the size of the total collection of elements we can treat that as a smaller problem to be solved recursively.

First, here is a recursive `merge` function:
```reason edit
/* Precondition: nums1 and nums2 are both sorted in increasing order */
let rec merge = (nums1, nums2) => {
  switch (nums1, nums2) {
  | ([], _) => nums2
  | (_, []) => nums1
  | ([head1, ...tail1], [head2, ...tail2]) =>
    if (head1 <= head2) {
      [head1, ...merge(tail1, nums2)]
    } else {
      [head2, ...merge(nums1, tail2)]
    }
  }
};

merge([2, 3, 5, 7], [1, 2, 4, 8]);
```
In words, if either list is empty, then the result is the other list. Otherwise, look at the heads of each list; the resulting merged list will start with the smaller of the two heads, followed by a merge of the tail following the smaller head with the entire other list.
(As a challenge, see if you can write a tail-recursive version of `merge`; as a hint, you might want to make use of the `reverse` function discussed in the section on [accumulators](../fp/map-reduce.md#accumulators)).

The first part of the merge sort algorithm is to split the input list into two halves (provided there is more than one element), then recursively sort the halves to prepare for merging.
One way to split a list into halves is to calculate the size of the list, then count off the first half of them into one list and the rest into another (an exercise below asks you to implement this).
However, because we do not care about the order of the incoming data, a more efficient approach is to walk through the list, alternately putting elements into one or the other of the halves (which are built up in an accumulator containing a pair of lists):
```reason edit
let split = nums => {
  let rec aux = (nums, (left, right)) => {
    switch (nums) {
    | [] => (left, right)
    | [head, ...tail] => aux(tail, (right, [head, ...left]))
    }
  }
  aux(nums, ([], []))
};

split([]);
split([1]);
split([1, 2]);
split([1, 2, 3]);
split([1, 2, 3, 4]);
```

Putting the pieces together then, we get the following `merge_sort` function:
```reason edit
let rec merge_sort = nums => {
  let (left, right) = split(nums);
  switch (left) { /* base case if left is empty */
  | [] => nums
  | _ => merge(merge_sort(left), merge_sort(right))
  }
};

merge_sort([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
Note that `merge_sort` makes two recursive calls to itself, so there is no easy way to make it entirely tail-recursive.
This is not a problem, though, because we know that the number of times that a list of $N$ elements can be split in two before hitting the base case is just $\log_2 N$;
even if $N$ is one million, this is only around 20, so the stack will never get very deep with recursive calls to `merge_sort`.

This observation allows us to compute the expected running time of merge sort: splitting and merging $N$ items can be done in $O(N)$ time, and there will be $O(\log N)$ levels of recursion (at the second level, there will be two lists of size $\frac{N}{2}$ to split and merge, at the third there will be four lists of size $\frac{N}{4}$, _etc._, but that is still $O(N)$ overall at each level), so the total expected running time is $O(N\log N)$, which is considerably better than $O(N^2)$.
By comparison, when $N$ is around a million, $N\log N$ is only twenty million, while $N^2$ is a trillion.

## Quicksort

We saw with insertion and selection sort that we could either do the hard word _after_ the recursion, when we insert into an already-sorted sublist, or _before_ the recursion, when we select and remove the smallest element.
The merge sort algorithm feels more like insertion sort, because the hard work, the merging, is done after the recursion that sorts the halves.
This should suggest that we look for an algorithm that will fill in the missing spot in this grid:

| Subproblem Size | Easy Split, Hard Join | Hard Split, Easy Join |
| :-: | :-: | :-: |
| $N-1$ | Insertion Sort | Selection Sort |
| $\frac{N}{2}$ | Merge Sort | ? |

As you should know from the title of this section, the missing algorithm is Quicksort.
The idea is that we will look at the values while splitting the list in two, in such a way that it will be trivial to join the parts back together after they are recursively sorted.
This implies that all of the elements in the first part need to be less than the elements in the second part.
The easiest way to ensure this is to choose a **pivot** element: elements less than the pivot go in the first part, and elements greater than the pivot go in the second part.
Elements that are equal to the pivot may go in either part.
A simple (and not very good&hellip;) choice for the pivot is the first element of the list; after using it to partition the rest of the list into two parts, we recursively sort those parts and then append them back together with the pivot element in between.

We may use the standard library function `List.filter` to do the partitioning:
```reason edit
let partition = (pivot, nums) => {
  (List.filter(n => n < pivot, nums), List.filter(n => n >= pivot, nums))
};

partition(3, [1, 4, 1, 5, 9, 2, 6, 5]);
```

Now the quicksort function is very easy (making use of the ReasonML list append operator, `@`):
```reason edit
let rec quicksort = nums => {
  switch (nums) {
  | [] => []
  | [pivot, ...rest] => {
      let (first, second) = partition(pivot, rest);
      quicksort(first) @ [pivot] @ quicksort(second)
    }
  }
};

quicksort([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```

The analysis of Quicksort is somewhat more difficult that the other sorts, however, because we do not know the sizes of the two parts that `partition` will give us.
If the pivot is chosen at random, then we expect it to fall somewhere in the middle of the list, so the two parts will be roughly equal in size, and we get an $O(N\log N)$ running time just as for merge sort.
However, if we consistently choose a pivot that is either very small or very large (for example, if the list was already sorted, and we choose the head element, then the pivot will always be the smallest value!), then one of the parts will only have a few items while the other contains almost all of them.
In this worst case, the behavior of Quicksort approaches selection sort (which can be seen as the limiting case where we deliberately pivot on the smallest element), and it will run in $O(N^2)$ time.
It is possible to show that, with a better way to choose the pivot, the quadratic worst case becomes very unlikely, and Quicksort will almost always run in $O(N\log N)$ time, but we will not do this here.

## Exercises

1. Explain what will happen to the running time of each of the above sorting algorithms if the input is already sorted.
<details>
  <summary>Answer</summary>

  `insertion_sort` will run in $O(N)$ time, because each insertion will put its new element at the head of the result.
  `insertion_sort_left` will run in $O(N^2)$ time, because each insertion will have to put its new element all the way at the end of the result.
  Selection sort does not depend on the order of the input, because it has to examine the entire list to find the smallest on each pass.
  Merge sort will always run in $O(N\log N)$ time, because the best case for a merge operation is when everything in one list is smaller than everything in the other, and that only cuts the time by a factor of 2.
  Quicksort with the pivot taken as the head of the list exhibits its worst-case behavior, $O(N^2)$, as shown above.
</details>

2. Give an example of an input list that will cause the simple recursive version of `insertion_sort` to exhibit its worst-case running time. That is, every insertion should need to traverse the entire list to find the correct insertion point.
<details>
  <summary>Answer</summary>

  Any list sorted in reverse order will do.
</details>

3. Rewrite the `select_left` function as an application of `List.fold_left` to an appropriate reduction function. When `select_left(nums)` is called on a non-empty list `nums`, the initial value passed into the reduction should be the pair `(head, [])`, representing the initial guess that the head of `nums` is the smallest number, with an empty list of other numbers examined so far.
<details>
  <summary>Answer</summary>

  ```reason
  let select_left2 = nums => {
    let aux = ((small, rest), n) => {
      if (n < small) {
        (n, [small, ...rest])
      } else {
        (small, [n, ...rest])
      }
    };
    switch (nums) {
    | [head, ...tail] => List.fold_left(aux, (head, []), tail)
    }
  };
  ```
</details>

4. Find a way to write the selection sort algorithm using only tail-recursive functions. *Hint: Instead of selecting the smallest element, modify `select_left` to separate out the largest element, then write a sorting function that accumulates the sorted list from back to front.*
<details>
  <summary>Answer</summary>

  ```reason
  /* Precondition: nums is non-empty */
  let select_max_left = nums => {
    let rec aux = (nums, accum) => {
      switch (nums) {
      | [] => accum
      | [head, ...tail] => {
          let (large, rest) = accum;
          if (head > large) {
            aux(tail, (head, [large, ...rest]))
          } else {
            aux(tail, (large, [head, ...rest]))
          }
        }
      }
    };
    
    switch (nums) {
    | [head, ...tail] => aux(tail, (head, []))
    }
  };
  
  let ssort = nums => {
    let rec aux = (nums, sorted) => {
    	switch (nums) {
      | [] => sorted
      | _ => {
        	let (large, rest) = select_max_left(nums);
  				aux(rest, [large, ...sorted])
  		  }
    	}
  	};
    aux(nums, [])
  };
  ```
</details>

5. Find a way to implement the `insert` function using only tail-recursive functions.
*Hint: First write a tail-recursive function `reverse_append(a, b)` that appends the reverse of list `a` to the front of list `b`, then
use a helper function to insert a number into a sorted list by collecting the front half of the list (the elements less than the number)
in an accumulator; when the correct position is found for the number, use `reverse_append` to move the accumulated elements back onto the front of the result.*
<details>
  <summary>Answer</summary>

  ```reason
  let rec reverse_append = (a, b) => {
    switch (a) {
    | [] => b
    | [head, ...tail] => reverse_append(tail, [head, ...b])
    }
  };

  /* Precondition: nums is sorted in non-decreasing order */
  let insert_TR = (nums, n) => {
    let rec aux = (sorted, acc) => {
    	switch (sorted) {
      | [] => reverse_append([n, ...acc], [])
      | [head, ...tail] => if (n <= head) {
          reverse_append(acc, [n, ...sorted])
        } else {
          aux(tail, [head, ...acc])
        }
      }
    };
    aux(nums, [])
  };
  ```
</details>

1. Implement the merge sort `split` function by first computing the size of the list, then passing half that size to a function that takes a number, n, and a list and returns a pair with the first n elements of the list as the first component, and the rest of the list as the other component.
<details>
  <summary>Answer</summary>

  ```reason
  let split = nums => {
    let rec size = nums => {
      switch (nums) {
      | [] => 0
      | [_, ...tail] => 1 + size(tail)
      }
    };
    let rec aux = (n, nums) => {
      switch (n, nums) {
      | (0, _) => ([], nums)
      | (_, []) => ([], [])
      | (_, [head, ...tail]) => {
          let (left, right) = aux(n - 1, tail);
          ([head, ...left], right)
        }
      }
    };
    let n = size(nums) / 2;
    aux(n, nums)
  };
  ```
</details>

7. The `partition` implementation for Quicksort shown above makes two passes over the list, once for each call to `List.filter`. Write a version of `partition` that does the job in just one pass, accumulating a pair of the two parts as it traverses the list.
<details>
  <summary>Answer</summary>

  ```reason
  let partition = (pivot, nums) => {
    List.fold_left(
      ((first, second), n) =>
        if (n < pivot) {
          ([n, ...first], second)
        } else {
          (first, [n, ...second])
        },
      ([], []),
      nums
    )
  };
  ```
</details>
