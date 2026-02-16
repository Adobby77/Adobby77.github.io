---
layout: post
title: Jacobi & Gauss-Seidel Method
date: 2025-09-13 12:00:00 +0900
tags:
- optimization
- numerical-analysis
- linear-algebra
categories: study
---

## 0. Introduction

Jacobi method and Gauss-Seidel method are **classical iterative algorithms to determine the approximate solutions of a large-scale system of linear equations.** They are particularly useful when finding a direct solution by Gaussian elimination is impractical or computationally expensive. They computes the iterative solution from the initial guess until it converges to the exact solution within a desired tolerance.

The fundamental difference between them is the way they utilize information during the process. **The Jacobi method computes a new set of values for the solution vector using only the values from the previous iteration.** In contrast, **the Gauss-Seidel method immediately use the most recently computed values from the current iteration in subsequent calculations within that same step.** While the Jacobi method is more convenient to formulate the problem in a parallel manner, the Gauss-Seidel method converges faster than the Jacobi method.

<div style="height: 0.1em;"></div>

---

## 1. Problem formulation

> [!note] Problem formulation
> 
> **Solve** $Ax=b$
> where $A\in\mathbb{R}^{n\times n}$, $x, b\in\mathbb{R}^n$
> 
> $$A=\begin{bmatrix}
> a_{11} & a_{12} & \cdots & a_{1n} \\
> a_{21} & a_{22} & \cdots & a_{n2}\\
> \vdots & \vdots &  \ddots & \vdots\\
> a_{n1} & a_{n2} & \cdots & a_{nn}
> \end{bmatrix}
> ,\quad
> b=\begin{bmatrix}
> b_1\\
> b_2\\
> \vdots\\
> b_n
> \end{bmatrix}
> \quad\text{and}\quad
> x=\begin{bmatrix}
> x_1\\
> x_2\\
> \vdots\\
> x_n
> \end{bmatrix}$$
> 
> From a different point-of view, solving $Ax=b$ is equivalent to minimizing $\lVert Ax-b \rVert$. 
> We can generalize this algorithm to the general optimization problem.

---

## 2. Algorithms

<div style="height: 0.1em;"></div>

### 2.1. The Jacobi method

Separate $A$ into 3 parts, i.e. $A=D+L+U$ where $D$ is diagonal, $L$ is strictly lower triangular, $U$ is strictly upper triangular parts of $A$.

Then, we have $(D+L+U)x=b$ and hence

> [!algorithm] Jacobi Method
> 
> $$\begin{aligned}
> Dx + (L+U)x = b&  && \text{(given)}\\[2pt]
> Dx = b - (L+U)x&  && \text{(move $(L+U)x$)}\\[2pt]
> x = D^{-1}\!\bigl(b-(L+U)x\bigr)&  && \text{(left-multiply $D^{-1}$)}
> \end{aligned}$$

So, from our initial guess $x^{(0)}$, we can update $x$ using such an iterative algorithm.

$$x^{(k+1)}=D^{-1}(b-(L+U)x^{(k)})$$

The decomposed matrices are

$$D=\begin{bmatrix}
a_{11} & 0 & \cdots & 0 \\
0 & a_{22} & \cdots & 0\\
\vdots & \vdots &  \ddots & \vdots\\
0 &  0& \cdots & a_{nn}
\end{bmatrix},\quad

U=\begin{bmatrix}
0 & a_{12} & \cdots & a_{1n} \\
0 & 0 & \cdots & a_{2n}\\
\vdots & \vdots &  \ddots & \vdots\\
0 &  0 & \cdots & 0
\end{bmatrix},\quad

L=\begin{bmatrix}
0 & 0 & \cdots & 0 \\
a_{21} & 0 & \cdots & 0\\
\vdots & \vdots &  \ddots & \vdots\\
a_{n1} & a_{n2} & \cdots & 0
\end{bmatrix}$$

and hence

$$D^{-1}=\begin{bmatrix}
\frac{1}{a_{11}} & 0 & \cdots & 0 \\
0 & \frac{1}{a_{22}} & \cdots & 0\\
\vdots & \vdots &  \ddots & \vdots\\
0 &  0& \cdots & \frac{1}{a_{nn}}
\end{bmatrix},\quad

L+U=\begin{bmatrix}
0 & a_{12} & \cdots & a_{1n} \\
a_{21} & 0 & \cdots & a_{2n}\\
\vdots & \vdots &  \ddots & \vdots\\
a_{n1} &  a_{n2} & \cdots & 0
\end{bmatrix},\quad$$

Thus, we can rewrite the update equation in terms of elements like:

$$x_i^{(k+1)}=\frac{1}{a_{ii}}\left(b-\sum_{j\neq i}a_{ij}x_j^{(k)}\right), \quad\forall i.$$

<div style="height: 0.1em;"></div>

---

### 2.2. The Gauss-Seidel method

Same to the Jacobi method, separate $A$ into 3 parts, i.e. $A=D+L+U$ where $D$ is diagonal, $L$ is strictly lower triangular, $U$ is strictly upper triangular parts of $A$.

Then, we have $(D+L+U)x=b$ and hence

> [!algorithm] Gauss-Seidel Method
> 
> $$\begin{aligned}
> (D + L)x+Ux = b&  && \text{(given)}\\[2pt]
> (D+L)x = b - Ux&  && \text{(move $Ux$)}\\[2pt]
> x = (D+L)^{-1}(b-Ux)&  && \text{(left-multiply $(D+L)^{-1}$)}
> \end{aligned}$$


So, from our initial guess $x^{(0)}$, we can update $x$ using such an iterative algorithm.

$$x^{(k+1)}=(D+L)^{-1}(b-Ux^{(k)})$$

The decomposed matrices are

$$D+L=\begin{bmatrix}
a_{11} & 0 & \cdots & 0 \\
a_{21} & a_{22} & \cdots & 0\\
\vdots & \vdots &  \ddots & \vdots\\
a_{n1} &  a_{n2} & \cdots & a_{nn}
\end{bmatrix},\quad

U=\begin{bmatrix}
0 & a_{12} & \cdots & a_{1n} \\
0 & 0 & \cdots & a_{2n}\\
\vdots & \vdots &  \ddots & \vdots\\
0 & 0 & \cdots & 0
\end{bmatrix}$$

and hence the element-based formula is

$$x_i^{(k+1)}=\frac{1}{a_{ii}}\left(b_i-\sum_{j=1}^{i-1}a_{ij}x_j^{(k+1)}-\sum_{j=i+1}^na_{ij}x_j^{(k)}\right)$$

---

As we can see, both algorithms require **central factors** and hence not applicable to the fully deectralized optimization problems.

<div style="height: 0.1em;"></div>

## 3. Convergence

### 3.1. Preliminaries

##### Def 3.1) Spectral radius

> For a square matrix $A\in\mathbb{C}^{n\times n}$, the spectral radius of $A$ is the maximum value of the absolute values of its eigenvalues and denoted by $\rho(A)$.
> 
> $$\rho(A)=\max\{|\lambda_1|,\cdots,|\lambda_n|\}$$

<div style="height: 0.1em;"></div>

##### Lem 3.2) Relationship between Norm and Spectral Radius

> For any matrix $T\in\mathbb{C}^{n \times n}$ and any $\epsilon > 0$, there exists a subordinate matrix norm $\lnm\cdot\rnm$ such that: 
> 
> $$\left\lVert T\right\rVert \le \rho(T) + \epsilon$$

<div style="height: 0.1em;"></div>

##### Def 3.3) Diagonally Dominant matrix
> A square matrix $A\in\mathbb{C}^{n\times n}$ is said to be diagonally dominant if for every row of matrix, the magnitude of the diagonal entry in a row is greater than or equal to the sum of magnitudes of all the off-diagonal entries in that row.
> 
> $$|a_{ii}|\geq\sum_{j\neq i}|a_{ij}|, \quad\forall i$$

<div style="height: 0.1em;"></div>

##### Thm 3.4) Gershgorin's Circle Theorem

> Let A be a square matrix $A\in\mathbb{C}^{n\times n}$ with entries $a_{ij}$. For $i=1,\cdots,n$, let $R_i$ be the sum of the absolute values of the off-diagoonal entries in the $i^\textrm{th}$ row, i.e. $R_i=\sum_{j\neq i}|a_{ij}|$.
> Then, **a closed disc centered at $a_{ii}$ with radius $R_i$ in the complex plane is called a Gershgorin disc**, which is denoted by $D(a_{ii},R_i)\subset\mathbb{C}$ .
> 
> Then, **every eigenvalue of $A$ lies within at least one of the Gershgorin discs $D(a_{ii}, R_i)$.**
> In other words, **every eigenvalue of $A$ is in the union of the Gershgorin discs, i.e. $\lambda(A)\in\bigcup_iD(a_ii,R_i)$.**

<div style="height: 0.1em;"></div>

**Proof.** Let $\lambda$ be the eigenvalue of $A$ and $x$ be the eigenvector corresponds to $\lambda$, i.e. $Ax=\lambda x$.

Let $x_{j^*}$ be the element whose magnitude is the largest among the elements of $x$, i.e. 

$$|x_{i}|=\max_{j}|x_j|$$

Since $x\neq 0,\; \left\vert x\_i\right\vert>0$.

Now, from the equation $Ax=\lambda x$, observe the $i^{\textrm{th}}$ row only.

$$\lambda x_i=\sum_{j}a_{ij}\frac{x_j}{x_i}$$

and hence

$$\lambda-a_{ii}=\sum_{j\neq i}a_{ij}\frac{x_j}{x_i}$$

Take absolute value

$$|\lambda-a_{ii}|=\left|\sum_{j\neq i}a_{ij}\frac{x_j}{x_i}\right|$$

By triangle inequality, 

$$\left|\sum_{j\neq i}a_{ij}\frac{x_j}{x_i}\right|=\sum_{j\neq i}\left|a_{ij}\frac{x_j}{x_i}\right|$$

and from the fact that $\left\vert x\_i\right\vert\geq\left\vert x\_j\right\vert$ ,

$$\sum_{j\neq i}\left|a_{ij}\frac{x_j}{x_i}\right|=\sum_{j\neq i}\left|a_{ij}\right|\left|\frac{x_j}{x_i}\right|\leq\sum_{j\neq i}\left|a_{ij}\right|=R_i$$

Thus, we can conclude that $\left\vert\lambda-a_{ii}\right\vert\leq R\_i$ and hence, proved.<span style="float: right;">$\square$</span>

<div style="height: 0.1em;"></div>

##### Cor 3.5) Nonsingularity of Strict Diagonally dominant matrix

> A strictly diagonally dominant matrix (or an irreducibly diagonally dominant matrix is nonsingular.

<div style="height: 0.1em;"></div>

### 3.2. Convergence Theorems

Both iterative methods are said to converge when $\lnm x^{(k+1)}-x^{(k)}\rnm<\varepsilon$ for any $\varepsilon>0$.
There are some conditions to guarantee the theoretical convergence of Jacobi method.

##### Thm 3.6) Convergence for strictly diagonally dominant matrix

> For a system of linear equations $Ax=b$, both the Jacobi and the Gauss-Seidel method converges to the unique solution if $A$ is strictly diagoally dominant. (Sufficient condition)

<div style="height: 0.1em;"></div>

**Proof for the Jacobi method** Since $A$ is strictly diagonally dominant, $A$ is nonsingular and hence invertible. This implies there exists an exact solution $x^*=A^{-1}b$.

From the element-based Jacobi method,

$$x_i^{(k+1)}=\frac{1}{a_{ii}}\left(b_i-\sum_{j\neq i}a_{ij}x_j^{(k)}\right), \quad\forall i,$$

we can denote the exact solution by dropping the iteration index $k$.

$$x_i^*=\frac{1}{a_{ii}}\left(b_i-\sum_{j\neq i}a_{ij}x_j^*\right), \quad\forall i,$$

**Claim: Error Converges to 0**

In this setting, we can define an error at iteration $k$ by taking an absolute value of the difference between the value at iteration $k$ and the exact solution.

$$e_i^{(k+1)}=x_i^{(k+1)}-x_i^*=\frac{1}{a_{ii}}\sum_{j\neq i}a_{ij}\left(x_j^{(k)}-x_j^*\right)=\frac{1}{a_{ii}}\sum_{j\neq i}a_{ij}e_j^{(k)}$$

Taking absolute value and apply the triangle inequality.

$$\left\vert e_i^{(k+1)}\right\vert=\left\vert\frac{1}{a_{ii}}\sum_{j\neq i}a_{ij}e_j^{(k)}\right\vert\leq\left\vert\frac{1}{a_{ii}}\right\vert\sum_{j\neq i}\left\vert a_{ij}e_j^{(k)}\right\vert=\sum_{j\neq i}\left\vert\frac{a_{ij}}{a_{ii}}\right\vert\left\vert e_j^{(k)}\right\vert$$

Since $A$ is strictly diagonally dominant, $C\_i=\sum_{j\neq i}\left\vert\frac{a\_{ij}}{a\_{ii}}\right\vert<1$ and hence we have

$$\left|e_i^{(k+1)}\right|\leq C_i\left|e_j^{(k)}\right|$$

Then, by the definition of $l_\infty$ norm, 

$$\left\lVert e^{(k+1)}\right\rVert_\infty \leq C\left\lVert e^{(k)}\right\rVert_\infty\quad\text{where}\quad C<1$$

Thus, we can conclude that the error converges to zero.<span style="float: right;">$\square$</span>

---
**Proof for the Gauss-Seidel method** The proof for the Gauss-Seidel method utilizes same idea to that of the Jacobi method.

Since $A$ is strictly diagonally dominant, $A$ is nonsingular and hence invertible. This implies there exists an exact solution $x^*=A^{-1}b$.

From the element-based Gauss-Seidel method,

$$x_i^{(k+1)}=\frac{1}{a_{ii}}\left(b_i-\sum_{j=1}^{i-1}a_{ij}x_j^{(k+1)}-\sum_{j=i+1}^{n}a_{ij}x_j^{(k)}\right), \quad\forall i,$$
we can denote the exact solution by dropping the iteration index $k$.

$$x_i^*=\frac{1}{a_{ii}}\left(b_i-\sum_{j=1}^{i-1}a_{ij}x_j^*-\sum_{j=i+1}^{n}a_{ij}x_j^*\right), \quad\forall i,$$

**Claim: Error Converges to 0**

In this setting, we can define an error at iteration $k$ by taking a difference between the value at iteration $k$ and the exact solution, $e_i^{(k)} = x_i^{(k)}-x_i^*$. Subtracting the second equation from the first yields the error propagation formula:

$$e_i^{(k+1)}=x_i^{(k+1)}-x_i^*=-\frac{1}{a_{ii}}\left(\sum_{j=1}^{i-1}a_{ij}e_j^{(k+1)}+\sum_{j=i+1}^{n}a_{ij}e_j^{(k)}\right)$$

Taking the absolute value and applying the triangle inequality, we get:

$$\left|e_i^{(k+1)}\right|\leq\frac{1}{\left|a_{ii}\right|}\left(\sum_{j=1}^{i-1}\left|a_{ij}\right|\left|e_j^{(k+1)}\right|+\sum_{j=i+1}^{n}\left|a_{ij}\right|\left|e_j^{(k)}\right|\right)$$

Let $\left\vert e^{(k+1)}\right\vert\_\infty = \max\_i\left\vert e\_i^{(k+1)}\right\vert = \left\vert e\_p^{(k+1)}\right\vert$ for some index $p$. For this specific component $p$, the inequality becomes:

$$\|e^{(k+1)}\|_\infty \leq \frac{1}{|a_{pp}|} \left( \left(\sum_{j=1}^{p-1}|a_{pj}|\right) \|e^{(k+1)}\|_\infty + \left(\sum_{j=p+1}^{n}|a_{pj}|\right) \|e^{(k)}\|_\infty \right)$$

We can now solve for $\|e^{(k+1)}\|_\infty$:

$$\|e^{(k+1)}\|_\infty \left( 1 - \frac{\sum_{j=1}^{p-1}|a_{pj}|}{|a_{pp}|} \right) \le \left( \frac{\sum_{j=p+1}^{n}|a_{pj}|}{|a_{pp}|} \right) \|e^{(k)}\|_\infty$$

$$\|e^{(k+1)}\|_\infty \le \left( \frac{\sum_{j=p+1}^{n}|a_{pj}|}{|a_{pp}| - \sum_{j=1}^{p-1}|a_{pj}|} \right) \|e^{(k)}\|_\infty$$

Since $A$ is strictly diagonally dominant, we know that $\left\vert a\_{pp}\right\vert > \sum\_{j \neq p}\left\vert a\_{pj}\right\vert = \sum\_{j=1}^{p-1}\left\vert a\_{pj}\right\vert + \sum\_{j=p+1}^{n}\left\vert a_{pj}\right\vert$. 

This implies $\left\vert a\_{pp}\right\vert - \sum\_{j=1}^{p-1}\left\vert a\_{pj}\right\vert > \sum_{j=p+1}^{n}\left\vert a\_{pj}\right\vert$. Let us define the constant as $C\_p = \frac{\sum_{j=p+1}^{n}\left\vert a\_{pj}\right\vert}{\left\vert a\_{pp}\right\vert - \sum\_{j=1}^{p-1}\left\vert a\_{pj}\right\vert}$, it follows that $C\_p < 1$.

Then, by the definition of $l_\infty$ norm,

$$\left\lVert e^{(k+1)}\right\rVert_\infty \leq C\left\lVert e^{(k)}\right\rVert_\infty\quad\text{where}\quad C=\max_p C_p < 1$$

Thus, we can conclude that the error converges to zero.<span style="float: right;">$\square$</span>

---

##### Thm 3.7) Convergence of general itermative method
> An iterative method of the form $x^{(k+1)} = Tx^{(k)} + c$ converges to the unique solution of $x=Tx+c$ for any initial guess vector $x^{(0)}$ if and only if the spectral radius $\rho(T)$ of the iteration matrix $T$ is less than 1. 
> 
> $$\rho(T) < 1 $$
> 
> In this setting, $T_J=D^{-1}(L+U)$ and $T_G=(D+L)^{-1}U$ for the Jacobi and Gauss-Seidel methods, respectively.

<div style="height: 0.1em;"></div>

**Proof.** The error vector $e^{(k)} = x^{(k)} - x^*$ follows the recurrence $e^{(k+1)} = T e^{(k)}$, which implies $e^{(k)} = T^k e^{(0)}$. The method converges if and only if $\lim_{k \to \infty} e^{(k)} = 0$ for any initial error $e^{(0)}$. This is equivalent to the condition that $\lim_{k \to \infty} T^k = 0$ (the zero matrix). 

**(Necessity: $\lim_{k \to \infty} T^k = 0 \implies \rho(T) < 1$)** Let $\lambda$ be any eigenvalue of $T$ with a corresponding eigenvector $v \neq 0$. By definition, $Tv = \lambda v$.

Applying $T$ repeatedly, we get $T^k v = \lambda^k v$. Taking the limit as $k \to \infty$, and using our assumption that $T^k \to 0$: 

$$\lim_{k \to \infty} \left(T^k v\right) = \left(\lim_{k \to \infty} T^k\right) v = 0 \cdot v = 0$$

This means we must have $\lim_{k \to \infty} (\lambda^k v) = 0$. Since $v$ is a non-zero vector, the scalar sequence $\lambda^k$ must converge to 0. This is only possible if $\left\vert\lambda\right\vert < 1$. Since this must hold for every eigenvalue of $T$, it must hold for the one with the largest magnitude. Thus, $\rho(T) < 1$.

**(Sufficiency: $\rho(T) < 1 \implies \lim_{k \to \infty} T^k = 0$)**
This direction of the proof relies on a lemma of the relationship between norm and spectral radius.

By our assumption, $\rho(T) < 1$. We can choose an $\epsilon > 0$ that is small enough such that $\rho(T) + \epsilon < 1$. For instance, we can choose $\epsilon = (1 - \rho(T))/2$. 

According to the lemma, there exists a matrix norm for which $\left\lVert T\right\rVert \le \rho(T) + \epsilon = C$, where $C$ is a constant less than 1. 

Using the submultiplicative property of matrix norms $\left\lVert A^k\right\rVert \le \left\lVert A\right\rVert^k$, we have: 

$$\left\lVert T^k\right\rVert \le \left\lVert T\right\rVert^k \le C^k$$

As $k \to \infty$, since $C < 1$, we have $C^k \to 0$.
This implies that $\lim_{k \to \infty} \left\lVert T^k\right\rVert = 0$. If the norm of a matrix converges to zero, the matrix itself must converge to the zero matrix. Therefore, $\lim_{k \to \infty} T^k = 0$.<span style="float: right;">$\square$</span>

<div style="height: 0.1em;"></div>

---

##### Thm 3.8) Convergence of the Gauss-Seidel method
> If $A^\mathsf{T}=A\succeq0$, then the Gauss-Seidel iterates converge to $x^*=A^{-1}b$ for any initial guess $x^{(0)}$.

<div style="height: 0.1em;"></div>

---

##### Thm 3.9) Stein–Rosenberg theorem (Convergence rate)
> Let $A=(a_{ij})\in\mathbb{R}^{n\times n}$ and let $\rho(T)$ be the spectral radius of a matrix $T$. Let $T_J, T_G$ be the matrix splitting for the Jacobi method and the Gauss-Seidel method, respectively.
> If $a_{ij} \leq 0$, for $i \neq j$ and $a_{ii} > 0$, for $i = 1,2,\ldots,n$, then one and only one of the following statements holds (four statements are mutually exclusive):
> 
> i) $0 \leq \rho(T_G) < \rho(T_J) < 1$  
> ii) $1 < \rho(T_J) < \rho(T_G)$  
> iii) $\rho(T_J) = \rho(T_G) = 0$  
> iv) $\rho(T_J) = \rho(T_G) = 1$

<div style="height: 0.1em;"></div>

---

## 4. Variants

### 4.1. Method of Successive over-relaxation (SOR)

The method of successive over-relaxation is a variant of the Gauss-Seidel method for solving a system of linear equations for faster convergence by introducing a relaxation factor.

#### 4.1.1. Algorithm

As with the Gauss-Seidal method, separate $A$ into 3 parts, i.e. $A=D+L+U$ where $D$ is diagonal, $L$ is strictly lower triangular, $U$ is strictly upper triangular parts of $A$.

Then, we have $(D+L+U)x=b$ and multiply the relaxation factor $\omega>1$ both sides. 
$$
\omega\cdot(D+L+U)x=wb
$$
By moving terms properly, we have 

> [!algorithm] SOR
> 
> $$\begin{align}
> & (D+\omega L)x = \omega b-[\omega U+(\omega-1)D]x\\
> & x=(D+\omega L)^{-1}\left(\omega b-[\omega U+(\omega -1)D]x\right)
> \end{align}$$

Thus, the iterative update can be expressed by:

$$x^{(k+1)}=(D+\omega L)^{-1}\left(\omega b-[\omega U+(\omega -1)D]x^{(k)}\right)$$

and its element-based expression is

$$x_i^{(k+1)} 
= (1 - \omega)x_i^{(k)} 
+ \frac{\omega}{a_{ii}} \left( 
    b_i 
    - \sum_{j < i} a_{ij} x_j^{(k+1)} 
    - \sum_{j > i} a_{ij} x_j^{(k)} 
\right), 
\quad i = 1,2,\ldots,n.$$


and it can be also directly expressed by

$$x^{(k+1)} 
= (1 - \omega)x^{(k)} + \omega D^{-1} \left(b-Lx^{(k+1)}-Ux^{(k)}\right).$$

this expression is more convenient because it doesn't requires the computation of $(D+\omega L)^{-1}$.

If $A$ is symmetric, i.e. $L=U^\mathsf{T}$, such a method is called the Symmetric Successive over-relaxation (SSOR).

<div style="height: 0.1em;"></div>

#### 4.1.2. Convergence

##### Thm 4.1) Kahan
> If $a_{ii} \neq 0$ for $i = 1, \ldots, n$, then the SOR iteration matrix $T_\omega$ satisfies  
> 
> $$\rho(T_\omega) \geq |\omega - 1|$$
> Consequently, the SOR iterates converge for every $x^{(0)}$ only if $0 < \omega < 2$.

<div style="height: 0.1em;"></div>

##### Thm 4.2) Ostrowski–Reich
> If $A^\mathsf{T}=A\succeq0$ and $0 < \omega < 2$, then the SOR iterates converge to $A^{-1}b$ for every $x^{(0)}$.

<div style="height: 0.1em;"></div>

##### Thm 4.3) Determining the relaxation factor
> If $A$ is symmetric positive-definite and tridiagonal, then  
> 
> $$\rho(T_{G}) = \rho(T_J)^2 < 1,$$
> 
> and the $\omega$ that minimizes $\rho(T_\omega)$ is  
> 
> $$\omega = \frac{2}{1 + \sqrt{1 - \rho(T_J)^2}}$$
>
> For this $\omega$, $\rho(T_\omega) = \omega - 1$.


---

## 5. Applications

### 5.1. 2D Laplace's equation for steady-state analysis

The problem of calculating the steady-state temperature distribution or electrostatic potential on a 2D plane is described by Laplace's equation:

$$\nabla^2 u = \frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} = 0$$

Approximating this with the finite difference method, the second partial derivative term at each grid point $(i,j)$ is expressed as 

$$\begin{align}
\frac{\partial^2 u}{\partial x^2} \approx \frac{u_{i+1,j} - 2u_{i,j} + u_{i-1,j}}{h^2}\\
\frac{\partial^2 u}{\partial y^2} \approx \frac{u_{i,j+1} - 2u_{i,j} + u_{i,j-1}}{h^2}
\end{align}$$

and thus the entire equation is transformed into a simple algebraic equation by substituting them into the original PDE. 

$$4u_{i,j} - u_{i-1,j} - u_{i+1,j} - u_{i,j-1} - u_{i,j+1} = 0$$

By setting up this equation for every interior grid point, a large, diagonally dominant matrix is formed where the diagonal element of each row is 4 and the off-diagonal elements are -1 or 0. It can be solved using the Gauss-Seidel method. 

$$u_{i,j}^{(k+1)} = \frac{1}{4} \Big( u_{i-1,j}^{(k+1)} + u_{i,j-1}^{(k+1)} + u_{i+1,j}^{(k)} + u_{i,j-1}^{(k)} \Big)$$

### 5.2. Time-dependent 1D Heat Equation

1D heat equation which describes time-dependent phenomena is

$$\frac{\partial u}{\partial t} = \alpha \frac{\partial^2 u}{\partial x^2}$$

Using an implicit method for a stable solution means the time derivative is approximated as 

$$\frac{\partial u}{\partial t}\approx\frac{u_i^{n+1} - u_i^n}{\Delta t}$$

and the spatial derivative is approximated using the values at the next time step $(n+1)$ as 

$$\frac{\partial^2 u}{\partial x^2}\approx\frac{u_{i+1}^{n+1} - 2u_i^{n+1} + u_{i-1}^{n+1}}{h^2}$$

By substituting them into the original equation and rearrange it for the unknown $u_i^{n+1}$ at the next time step yields a tridiagonal matrix system, we have 

$$-ru_{i-1}^{n+1} + (1+2r)u_i^{n+1} - ru_{i+1}^{n+1} = u_i^n$$

where $r = \alpha \Delta t / h^2$. It can also be solved at each time step using the Gauss-Seidel method.
