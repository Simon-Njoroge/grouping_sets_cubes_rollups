import './style.css';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="doc-container">
    <h1>📊 PostgreSQL GROUPING SETS, ROLLUP & CUBE Explained</h1>
    <p>
      These are advanced SQL features that help you generate summaries, subtotals, and grand totals
      from your data — often used in analytical queries, dashboards, and reports.
    </p>

    <section>
      <h2>🔹 What is GROUPING SETS?</h2>
      <p>
        <strong>GROUPING SETS</strong> allow you to define multiple <code>GROUP BY</code> groupings in one query.
        It's like combining several <code>GROUP BY</code> queries using <code>UNION ALL</code>, but it's more efficient.
      </p>
      <p>
        For instance, if you want totals per region, per product category, and a grand total, you can write:
      </p>
      <pre><code class="sql" id="code-grouping-sets">
SELECT 
  region, 
  product_category, 
  SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY GROUPING SETS (
  (region, product_category), 
  (region), 
  (product_category), 
  ()
);
      </code></pre>
      <button class="copy-btn" data-target="code-grouping-sets">📋 Copy Example</button>
    </section>

    <section>
      <h2>🔸 What is ROLLUP?</h2>
      <p>
        <strong>ROLLUP</strong> generates subtotals that move from the most detailed level to the least.
        It’s perfect for hierarchical data, like drilling down from <em>Year → Quarter → Month</em>.
      </p>
      <p>
        For example, to get total sales by region and product, then by region, then a grand total:
      </p>
      <pre><code class="sql" id="code-rollup">
SELECT 
  region, 
  product_category, 
  SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY ROLLUP (region, product_category);
      </code></pre>
      <button class="copy-btn" data-target="code-rollup">📋 Copy Example</button>
      <p>This query returns:</p>
      <ul>
        <li>Totals for each region and product</li>
        <li>Subtotals for each region</li>
        <li>Grand total of all sales</li>
      </ul>
    </section>

    <section>
      <h2>🔸 What is CUBE?</h2>
      <p>
        <strong>CUBE</strong> creates all possible combinations of the columns, including subtotals for each dimension
        and the grand total. It’s great for multidimensional analysis, like pivot tables.
      </p>
      <pre><code class="sql" id="code-cube">
SELECT 
  region, 
  product_category, 
  SUM(sales_amount) AS total_sales
FROM sales_data
GROUP BY CUBE (region, product_category);
      </code></pre>
      <button class="copy-btn" data-target="code-cube">📋 Copy Example</button>
      <p>It includes:</p>
      <ul>
        <li>Each (region, product_category) pair</li>
        <li>Subtotals for each region</li>
        <li>Subtotals for each product_category</li>
        <li>Grand total for all data</li>
      </ul>
    </section>

    <section>
      <h2>🧠 Understanding GROUPING()</h2>
      <p>
        The <code>GROUPING()</code> function tells if a column was aggregated to a subtotal or grand total.
      </p>
      <ul>
        <li><code>0</code> means the column is included in the grouping</li>
        <li><code>1</code> means it's rolled up (NULL)</li>
      </ul>
      <pre><code class="sql" id="code-grouping-fn">
SELECT 
  region,
  product_category,
  SUM(sales_amount) AS total_sales,
  GROUPING(region) AS region_grouped,
  GROUPING(product_category) AS category_grouped
FROM sales_data
GROUP BY CUBE (region, product_category);
      </code></pre>
      <button class="copy-btn" data-target="code-grouping-fn">📋 Copy Example</button>
    </section>

    <section class="tips">
      <h2>✨ Pro Tips</h2>
      <ul>
        <li>Use <code>ORDER BY GROUPING(...)</code> to clearly sort subtotals and totals</li>
        <li>You can combine these with <code>HAVING</code> and <code>WHERE</code> clauses for filtering</li>
        <li>These are powerful for OLAP (Online Analytical Processing) and business intelligence reporting</li>
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
