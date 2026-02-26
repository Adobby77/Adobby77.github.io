---
layout: page
title: Global Rigidity and Embedding Problem
description: Distance Geometry
img: assets/img/Distance_rigidity.jpg
importance: 1
category: work
---

This is my undergraduate research project in department of mathematical science at GIST.

I am currently breaking the problem down to the undergraduate level and developing a plan to approach it step by step.


# Problem Formulation: Global Rigidity and Embeddability of Formations

The following two problems are my main interest for this problems.


## Problem 1: Global Rigidity

Provide necessary and sufficient conditions on \( (G,d) \) such that it is globally rigid in:

1. \( \mathbb{R}^n \), and/or  
2. a given manifold \( \mathcal{M} \).

In particular:

- Characterize global rigidity in terms of graph-theoretic and geometric conditions.
- Clarify the dependence on the dimension \( n \).
- Distinguish between:
  - **generic global rigidity**, and  
  - global rigidity for specific edge length assignments.



## Problem 2: Embeddability and Minimal Dimension

Given a formation \( (G,d) \), determine:

### (A) Embeddability

What are the necessary and sufficient conditions for the existence of a framework

$$p : V \to \mathbb{R}^n$$

(or more generally \( p : V \to \mathcal{M} \)) satisfying the prescribed distances?

Equivalently, characterize when the distance constraints are realizable in \( \mathbb{R}^n \).



### (B) Minimal Embedding Dimension

Define the **minimal embedding dimension**

$$n_{\min}(G,d) = \min \{ n \mid (G,d) \text{ admits a realization in } \mathbb{R}^n \}.$$

Questions:

1. Does a general characterization of \( n_{\min}(G,d) \) exist?
2. Can it be computed algorithmically?
3. How does it relate to:
   - the rank of an associated Gram matrix,
   - Euclidean distance matrix (EDM) theory,
   - graph-theoretic properties of \( G \)?



## Illustrative Examples

### Example 1: Complete graph \( K_4 \) with unit edge lengths

- No realization exists in \( \mathbb{R}^2 \).
- A realization exists in \( \mathbb{R}^3 \) as a regular tetrahedron.
- Thus, \( n_{\min} = 3 \).

### Example 2: Graph \( K_4 - e \) (one edge removed), unit edge lengths

- A realization exists in \( \mathbb{R}^3 \).
- However, the framework is not rigid: it admits a continuous flex (hinge motion).
- Therefore, embeddability does not imply rigidity, and rigidity does not imply global rigidity.



## Control-Theoretic Motivation

In formation control and network localization problems, one is often interested in **uniqueness of realization (up to isometry)**. Therefore, both:

- existence of embeddings, and  
- global rigidity (uniqueness),

must be considered simultaneously.


## Summary of Core Research Questions

1. What are necessary and sufficient conditions for global rigidity of a formation in \( \mathbb{R}^n \) or on a manifold?
2. What are necessary and sufficient conditions for embeddability?
3. How can one determine the minimal embedding dimension?
4. Are there constructive or algorithmic procedures to compute it?
5. How are global rigidity and minimal embedding dimension related in control-theoretic applications?
