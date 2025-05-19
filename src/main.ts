import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="doc-container">
    <h1>📊 PostgreSQL GROUPING SETS, CUBE & ROLLUP</h1>
    <p>
      These are advanced SQL tools used for summarizing data. They allow you to create subtotals and grand totals
      in a single query — perfect for reports and dashboards.
    </p>

    <section>
      <h2>🔹 What Are GROUPING SETS?</h2>
      <p>
        <strong>GROUPING SETS</strong> let you define multiple <code>GROUP BY</code> combinations in one query.
        It’s like writing many queries with <code>GROUP BY</code> and combining them with <code>UNION ALL</code>,
        but more efficient!
      </p>
      <pre><code class="sql" id="code-grouping-sets">
SELECT department, role, COUNT(*)
FROM employees
GROUP BY GROUPING SETS (
  (department, role),   -- Group by both department and role
  (department),         -- Subtotal by department only
  ()                    -- Grand total (no grouping)
);
      </code></pre>
      <button class="copy-btn" data-target="code-grouping-sets">📋 Copy Example</button>
    </section>

    <section>
      <h2>🔸 What is ROLLUP?</h2>
      <p>
        <strong>ROLLUP</strong> helps create hierarchies of subtotals, from most detailed to least. It’s useful
        when your data has a natural drill-down structure (e.g., departments → roles).
      </p>
      <pre><code class="sql" id="code-rollup">
SELECT department, role, COUNT(*)
FROM employees
GROUP BY ROLLUP (department, role);
      </code></pre>
      <button class="copy-btn" data-target="code-rollup">📋 Copy Example</button>
      <p>It gives you:</p>
      <ul>
        <li>Each (department, role) combination</li>
        <li>Subtotals for each department</li>
        <li>Grand total for all data</li>
      </ul>
    </section>

    <section>
      <h2>🔸 What is CUBE?</h2>
      <p>
        <strong>CUBE</strong> gives all possible subtotal combinations of the listed columns. It’s great for
        multi-dimensional analysis like pivot tables!
      </p>
      <pre><code class="sql" id="code-cube">
SELECT department, role, COUNT(*)
FROM employees
GROUP BY CUBE (department, role);
      </code></pre>
      <button class="copy-btn" data-target="code-cube">📋 Copy Example</button>
      <p>It includes:</p>
      <ul>
        <li>Every (department, role) combo</li>
        <li>Subtotals for each department</li>
        <li>Subtotals for each role</li>
        <li>Grand total for everything</li>
      </ul>
    </section>

    <section>
      <h2>🧠 GROUPING() Function</h2>
      <p>
        The <code>GROUPING()</code> function tells whether a column was aggregated. It returns:
      </p>
      <ul>
        <li><code>0</code> if the column was used in grouping</li>
        <li><code>1</code> if it was rolled up (i.e., NULL)</li>
      </ul>
      <pre><code class="sql" id="code-grouping-fn">
SELECT 
  department,
  role,
  COUNT(*) AS total,
  GROUPING(department) AS dept_grouped,
  GROUPING(role) AS role_grouped
FROM employees
GROUP BY CUBE (department, role);
      </code></pre>
      <button class="copy-btn" data-target="code-grouping-fn">📋 Copy Example</button>
    </section>

    <section>
      <h2>🛠 Practical Example: Sales Report</h2>
      <p>Here’s how you might use <code>GROUPING SETS</code> in a real-world sales report:</p>
      <pre><code class="sql" id="code-practical-example">
-- Sales summary with subtotals and grand total
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
      <button class="copy-btn" data-target="code-practical-example">📋 Copy Example</button>
      <p>This gives:</p>
      <ul>
        <li>Sales per product per region</li>
        <li>Total sales per region</li>
        <li>Total sales per product</li>
        <li>Overall total sales</li>
      </ul>
    </section>

    <section class="tips">
      <h2>✨ Pro Tips</h2>
      <ul>
        <li>You can use <code>WHERE</code>, <code>HAVING</code>, and <code>ORDER BY</code> with these features.</li>
        <li>Use <code>ORDER BY GROUPING(...)</code> to sort totals and subtotals clearly.</li>
        <li>These tools are very useful in OLAP (Online Analytical Processing) and reporting tools.</li>
      </ul>
    </section>
  </div>
`;

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const targetId = (btn as HTMLButtonElement).dataset.target!;
    const code = document.getElementById(targetId)?.textContent?.trim();
    if (code) {
      navigator.clipboard.writeText(code);
      btn.textContent = '✅ Copied!';
      setTimeout(() => (btn.textContent = '📋 Copy Example'), 1500);
    }
  });
});
