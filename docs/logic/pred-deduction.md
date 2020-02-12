---
id: pred-deduction
title: Natural Deduction for Predicate Logic
---
import useBaseUrl from '@docusaurus/useBaseUrl';

Before seeing the natural deduction rules for handling the quantifiers ($\forall$ and $\exists$), 
we will need to be careful about how we handle variables in proofs. We will now have three[^There
is also a fourth use, if we are maintaining a library of previous proofs and applying them by name,
such as "Modus Tollens", to justify steps in later proofs.] different uses of identifiers in our
proofs, representing different entities that we want to be able to refer to by name:

* Propositions ($p$, $q$, &hellip;) and predicates ($P$, $Q$, &hellip;) stand for primitive
statements that may be true or false, perhaps depending on the values of arguments. When we
show that an argument is valid for $p$ and $Q(a)$, for example, we have also shown that the
argument is valid when those propositional and predicate variables are replaced by actual
statements, such as "It is raining" or "$a$ is an even number". As long as we are consistent about
replacing variables with the same statement each time they occur, the resulting argument will have
the same structure and be equally valid. If we are careful, we can even perform substitutions such
as $p$ becomes $q$ and (simultaneously) $q$ becomes $\lnot p$; for example, if we have proven the argument
$p\rightarrow q, \lnot q\vdash\lnot p$ (Modus Tollens), then applying this substitution would
allow us to also use the argument $q\rightarrow\lnot p, \lnot\lnot p\vdash\lnot q$ as a step in
a proof.

* Line labels ($i$, $j$, &hellip;, as well as $\ell_1$, $\ell_2$, &hellip;) allow us to name individual steps and
assumptions in our proofs. I have been following the convention that lines in an actual proof are named
$\ell_1$, $\ell_2$, &hellip;, although they could be given more meaningful names such as _hypothesis_,
_first_case_, or _premise2_. When describing the deduction rules, I have been using labels such as $i$
and $j$ to emphasize that the line being referenced could be anywhere earlier in the proof (as long as
it is not local to a nested subproof).

* Entity variables ($x$, $y$, &hellip;, as well as $a$, $b$, &hellip;)
stand for entities from the domain of discourse. I have been using $a$, $b$, &hellip; to stand for
particular values, such as the number 42 or the student Joe, that might be used in an argument, so
$Q(a)$ could represent the statement "42 is an even number." When the variable is bound by a
quantifier, I generally use $x$ or $y$ instead, to emphasize that the formula is saying something
about the full range of values from the domain of discourse, and we are not free to interpret it as
any particular entity.

Just as we can introduce temporary assumptions into subproofs, that are only available within that
nested block of the proof, we will also introduce temporary entity variables in proofs by writing 
an assumption such as "fresh $x_0$". This means that, within that subproof, the variable $x_0$ will
refer to some entity from the domain of discourse. Unlike the variables ($x$, $y$, &hellip;) bound by
quantifiers, such a fresh variable should be understood as representing a single entity; it can stand
alone in a statement such as $Q(x_0)$. However, unlike the top-level free variables ($a$, $b$, &hellip;),
we do not get to choose a values for a fresh variable, nor is it allowed to escape from its
subproof. That is, no formula outside of the braces is allowed to refer to $x_0$.