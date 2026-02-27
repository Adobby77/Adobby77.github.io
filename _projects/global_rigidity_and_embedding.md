---
layout: page
title: Global Rigidity and Embedding Problem
description: Distance Geometry
img: assets/img/double_banana.png
importance: 1
category: work
---

This is my undergraduate research project in department of mathematical science at GIST.

I am currently breaking the problem down to the undergraduate level and developing a plan to approach it step by step.


<br>

##### Problem 1: Combinatorial Characterization of Global Rigidity

Provide necessary and sufficient combinatorial conditions on a framework $(G,p)$ such that it is globally rigid in $\mathbb{R}^d$ (or, generally, on a given manifold $\mathcal{M}$).


<br>

##### Problem 2: Embeddability and Minimal Dimension

**Q1.** Provide necessary and sufficient combinatorial conditions on a framework $(G,p)$ such that it is embeddable in $\mathbb{R}^d$ (or, generally, on a given manifold $\mathcal{M}$).

**Q2.** Determine the minimal dimension $d$ such that the framework is embeddable in $\mathbb{R}^d$.


<br>

##### Illustrative Examples

**Example 1:** Complete graph $K_4$ with unit edge lengths

- No realization exists(not embeddable) in $\mathbb{R}^2$.
- A realization exists(embeddable) in $\mathbb{R}^3$ as a regular tetrahedron.
- Thus, $n_{\min} = 3$.

**Example 2:** Graph $K_4 - e$ (one edge removed), unit edge lengths

- A realization exists(embeddable) in $\mathbb{R}^3$.



<br>

##### Control-Theoretic Motivation

In formation control and network localization problems, one is often interested in **uniqueness of realization (up to isometry)**. Therefore, both:

- existence of embeddings, and  
- global rigidity (uniqueness),

must be considered simultaneously.


<br>

##### Summary of Core Research Questions

1. What are necessary and sufficient conditions for global rigidity of a framework in $\mathbb{R}^d$ or on a manifold?
2. What are necessary and sufficient conditions for embeddability?
3. How can one determine the minimal embedding dimension?
4. Are there constructive or algorithmic procedures to compute it?
5. How are global rigidity and minimal embedding dimension related in control-theoretic applications?


---


For more information about the related theory, please refer to the [Rigidity Theory]({% post_url 2026-01-10-Rigidity %}) post.
