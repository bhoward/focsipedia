---
id: recursion
title: Recursion and Induction
author: Brian Howard
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Read about <a href={useBaseUrl('docs/logic/recursion')}>Recursion</a>,
and look at <a href={useBaseUrl('docs/logic/recursion#exercises')}>exercises 3, 4, 7, 8, and 10</a> (to discuss in class).

<!--truncate-->
Here is the proof that I started last Friday in class, and didn't complete:

> **Theorem:**  
$\exists x\forall yP(x, y)\vdash\forall y\exists xP(x, y)$

> **Proof:**
$$ \begin{array}{ll}
\ell_1: \exists x\forall yP(x, y) & \text{premise}\\
\ell_2: \text{fresh}\ x_0, \forall yP(x_0, y)\Rightarrow\{\\
\quad\ell_3: \text{fresh}\ y_0\Rightarrow\{\\
\quad\quad\ell_4: P(x_0, y_0) & \forall E\ \ell_2, y_0\\
\quad\quad\ell_5: \exists xP(x, y_0) & \exists I\ \ell_4, x_0\\
\quad\}\\
\quad\ell_6: \forall y\exists xP(x, y) & \forall I\ \ell_3\\
\}\\
\ell_7: \forall y\exists xP(x, y) & \exists E\ \ell_1, \ell_2
\end{array} $$
>
In words, since we start by assuming an existential, we can suppose ($\ell_2$) that $x_0$ is the (fresh) name of an $x$
that makes $\forall yP(x_0, y)$ true. Now, to prove a universal quantifier, we need to introduce _another_ fresh variable,
$y_0$; if we can show $\exists xP(x, y_0)$ without any other conditions on $y_0$, then we can reach our desired conclusion.
But since we know (within the subproof starting at $\ell_2$) that $P(x_0, y)$ holds for all $y$, we might as well choose
$y$ to be $y_0$, at $\ell_4$. Now we have some particular $x_0$ and $y_0$ making $P$ true, so we can conclude $\exists xP(x, y_0)$
at $\ell_5$. This finishes what we needed for the $\forall I$ step at $\ell_6$, and the proof concludes with the application of
$\exists E$ that we set up at the beginning.