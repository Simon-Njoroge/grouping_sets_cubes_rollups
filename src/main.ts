import './style.css'

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="doc-container">
    <h1>📊 PostgreSQL GROUPING SETS, CUBE & ROLLUP</h1>
    
    <p>Advanced SQL aggregation techniques used to generate multi-level summary reports, subtotals, and grand totals in one query.</p>

    <section>
      <h2>🔹 What Are GROUPING SETS?</h2>
      <p>
        <strong>GROUPING SETS</strong> let you specify multiple groupings in a single query. It's like writing multiple GROUP BY queries and combining the results using <code>UNION ALL</code>.
      </p>
      <pre><code class="sql">
SELECT department, role, COUNT(*)
FROM employees
GROUP BY GROUPING SETS (
  (department, role),   -- Detail level
  (department),         -- Subtotal per department
  ()                    -- Grand total
);
      </code></pre>
    </section>

    <section>
      <h2>🔸 What is ROLLUP?</h2>
      <p>
        <strong>ROLLUP</strong> creates subtotals that roll up from the most detailed level to a grand total. It is useful when you want hierarchical aggregates.
      </p>
      <pre><code class="sql">
SELECT department, role, COUNT(*)
FROM employees
GROUP BY ROLLUP (department, role);
      </code></pre>
      <p>This produces:</p>
      <ul>
        <li>Summary per (department, role)</li>
        <li>Subtotal per department</li>
        <li>Grand total</li>
      </ul>
    </section>

    <section>
      <h2>🔸 What is CUBE?</h2>
      <p>
        <strong>CUBE</strong> computes aggregates for all possible combinations of the specified columns. It is ideal for multidimensional reporting (like pivot tables).
      </p>
      <pre><code class="sql">
SELECT department, role, COUNT(*)
FROM employees
GROUP BY CUBE (department, role);
      </code></pre>
      <p>This produces:</p>
      <ul>
        <li>Summary per (department, role)</li>
        <li>Subtotal per department</li>
        <li>Subtotal per role</li>
        <li>Grand total</li>
      </ul>
    </section>

    <section>
      <h2>🧠 GROUPING Function</h2>
      <p>
        Use the <code>GROUPING(column)</code> function to detect if a column was aggregated or rolled up:
      </p>
      <pre><code class="sql">
SELECT 
  department,
  role,
  COUNT(*) AS total,
  GROUPING(department) AS dept_grouped,
  GROUPING(role) AS role_grouped
FROM employees
GROUP BY CUBE (department, role);
      </code></pre>
      <p>Values will be:</p>
      <ul>
        <li><code>0</code>: Column is part of grouping</li>
        <li><code>1</code>: Column is rolled up (NULL value)</li>
      </ul>
    </section>

    <section>
      <h2>🛠 Practical Example</h2>
      <pre><code class="sql">
-- Sales report summary
SELECT 
  region,
  product,
  SUM(sales) AS total_sales
FROM sales_data
GROUP BY GROUPING SETS (
  (region, product),
  (region),
  (product),
  ()
);
      </code></pre>
      <p>This helps generate product sales by region, total sales by product, total sales by region, and overall sales — all in one query!</p>
    </section>

    <section class="tips">
      <h2>✨ Pro Tips</h2>
      <ul>
        <li>GROUPING SETS can be combined with WHERE, HAVING, and ORDER BY clauses.</li>
        <li>Use <code>ORDER BY GROUPING(...)</code> to control sorting of subtotals and totals.</li>
        <li>Helpful in OLAP (Online Analytical Processing) systems.</li>
      </ul>
    </section>
  </div>
`;
