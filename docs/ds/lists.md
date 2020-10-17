---
id: lists
title: Sorting Lists
---
import useBaseUrl from '@docusaurus/useBaseUrl';

We have already seen [how to work with lists in a functional language](../fp/map-reduce).
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

Another approach is to traverse the list from left to right, building up a sorted list by inserting each successive element (thus the sorted list is an **accumulator**&mdash;an extra argument that collects the result as the calculation proceeds; this is a common trick when making a function tail-recursive). Because the last action of the `aux` function in the recursive case is to call itself, this solution is properly tail-recursive and the ReasonML compiler will be able to produce code that doesn't overflow the stack no matter how many numbers we are sorting.[^In fact, when the compiler sees a tail-recursive call, it can essentially turn the recursive call into a loop back up to the top of the function, without needing to push a new function call on the stack. It is able to do this because it knows there is nothing left to do in the original call, so there is no need to return to where we left off.]
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
Note that the helper function here (`aux`) is essentially the same as the `reduce` function we saw in the [MapReduce](../fp/map-reduce) section.
The ReasonML standard library provides the `reduce` function under the name `List.fold_left`, so we can also define insertion sort as:
```reason edit
let insertion_sort_left2 = nums => {
  List.fold_left(insert, [], nums)
};

insertion_sort_left2([3, 1, 4, 1, 5, 9, 2, 6, 5]);
```
Using currying, we can simplify this to `let insertion_sort_left2 = List.fold_left(insert, [])`.

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

## Quicksort

## Exercises

1. Rewrite the `select_left` function as an application of `List.fold_left` to an appropriate reduction function. When `select_left(nums)` is called on a non-empty list `nums`, the initial value passed into the reduction should be the pair `(head, [])`, representing the initial guess that the head of `nums` is the smallest number, with an empty list of other numbers examined so far.
[[spoiler | Answer]]
| ```reason
| let select_left2 = nums => {
|   let aux = ((small, rest), n) => {
|     if (n < small) {
|       (n, [small, ...rest])
|     } else {
|       (small, [n, ...rest])
|     }
|   };
|   switch (nums) {
|   | [head, ...tail] => List.fold_left(aux, (head, []), tail)
|   }
| };
| ```

2. Find a way to write the selection sort algorithm using only tail-recursive functions. *Hint: Instead of selecting the smallest element, modify `select_left` to separate out the largest element, then write a sorting function that accumulates the sorted list from back to front.*
[[spoiler | Answer]]
| ```reason
| /* Precondition: nums is non-empty */
| let select_max_left = nums => {
|   let rec aux = (nums, accum) => {
|     switch (nums) {
|     | [] => accum
|     | [head, ...tail] => {
|         let (large, rest) = accum;
|         if (head > large) {
|           aux(tail, (head, [large, ...rest]))
|         } else {
|           aux(tail, (large, [head, ...rest]))
|         }
|       }
|     }
|   };
|   
|   switch (nums) {
|   | [head, ...tail] => aux(tail, (head, []))
|   }
| };
| 
| let ssort = nums => {
|   let rec aux = (nums, sorted) => {
|   	switch (nums) {
|     | [] => sorted
|     | _ => {
|       	let (large, rest) = select_max_left(nums);
| 				aux(rest, [large, ...sorted])
| 		  }
|   	}
| 	};
|   aux(nums, [])
| };
| ```

