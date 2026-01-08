# PlaywrightFramework Automation Reports

Welcome to the **Playwrigt Framework** automation project. Below you can find the latest test results and HTML reports.

---


## HTML Reports

Click the badges below to view the latest reports published via GitHub Pages:

[![Playwright Report](https://img.shields.io/badge/Playwright-Report-blue)](https://madhavi-mogulluri.github.io/Playwright-Framework/playwright-report/index.html)
[![Playwright HTML Reporter](https://img.shields.io/badge/Playwright_HTML-Report-green)](https://madhavi-mogulluri.github.io/Playwright-Framework/playwright-html-report/index.html)
[![Allure Report](https://img.shields.io/badge/Allure-Report-red)](https://madhavi-mogulluri.github.io/Playwright-Framework/allure-report/index.html)

---


      # ========== Create Index Page ==========
      - name: 📝 Create Index Page
        run: |
          CURRENT_DATE=$(date '+%Y-%m-%d %H:%M:%S UTC')
          ENV="${{ github.event.inputs.environment }}"
          BROWSER="${{ github.event.inputs.browser }}"
          cat > github-pages/index.html << EOF
          <!DOCTYPE html>
          <html>
          <head>
            <title>Playwright Manual Run - PlayWrightFramework</title>
            <style>
              body { font-family: Arial, sans-serif; max-width: 900px; margin: 50px auto; padding: 20px; }
              h1 { color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; }
              .info { background: #e8f4fc; padding: 15px; border-radius: 8px; margin: 20px 0; }
              .env-section { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 15px 0; }
              .env-section h3 { margin-top: 0; }
              a { color: #3498db; text-decoration: none; display: inline-block; margin: 5px 10px 5px 0; padding: 8px 16px; background: #ecf0f1; border-radius: 4px; }
              a:hover { background: #3498db; color: white; }
              .dev { border-left: 4px solid #27ae60; }
              .qa { border-left: 4px solid #f39c12; }
              .stage { border-left: 4px solid #9b59b6; }
              .prod { border-left: 4px solid #e74c3c; }
              .timestamp { color: #7f8c8d; font-size: 0.9em; }
            </style>
          </head>
          <body>
            <h1>🎭 Playwright Manual Run Reports</h1>
            <p class="timestamp">Last updated: ${CURRENT_DATE}</p>
            
            <div class="info">
              <strong>🔹 Environment:</strong> ${ENV}<br>
              <strong>🔹 Browser:</strong> ${BROWSER}
            </div>

            <div class="env-section ${ENV}">
              <h3>📊 ${ENV^^} Environment Reports</h3>
              <a href="./${ENV}/playwright-report/index.html">Playwright Report</a>
              <a href="./${ENV}/playwright-html-report/index.html">HTML Report</a>
              <a href="./${ENV}/allure-report/index.html">Allure Report</a>
            </div>
          </body>
          </html>
          EOF

      # ========== Deploy to GitHub Pages ==========
      - name: 🌐 Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_branch: gh-pages
          publish_dir: github-pages
          keep_files: true  # ✅ Keep existing reports from auto pipeline

      # ========== Print Report URLs ==========
      - name: 🔗 Report URLs
        run: |
          ENV="${{ github.event.inputs.environment }}"
          BROWSER="${{ github.event.inputs.browser }}"
          echo "============================================"
          echo "📊 REPORTS PUBLISHED SUCCESSFULLY!"
          echo "============================================"
          echo ""
          echo "🔹 Environment: $ENV"
          echo "🔹 Browser: $BROWSER"
          echo ""
          echo "🏠 Main Dashboard:"
          echo "   https://github.com/Madhavi-Mogulluri/Playwright-Framework/"
          echo ""
          echo "📊 ${ENV^^} Reports:"
          echo "   Playwright: https://madhavi-mogulluri.github.io/Playwright-Framework/${ENV}/playwright-report/index.html"
          echo "   HTML:       https://madhavi-mogulluri.github.io/Playwright-Framework/${ENV}/playwright-html-report/index.html"
          echo "   Allure:     https://madhavi-mogulluri.github.io/Playwright-Framework/k/${ENV}/allure-report/index.html"
          echo ""
          echo "============================================"

## Notes

- Playwright HTML report is generated automatically from `npx playwright test`.  
- Allure report is generated from the `allure-results` folder.  
- Both reports are published to `gh-pages` branch and updated on each workflow run.
