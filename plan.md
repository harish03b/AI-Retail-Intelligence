1. **Move `<Dialog>` and `<Snackbar>` outside the `.map()` loop in `DocumentsPage.tsx`:**
   - In `DocumentsPage.tsx`, the `Dialog` and `Snackbar` components are placed inside the `filteredDocuments.map()` loop.
   - This causes duplicate invisible elements in the DOM for every document in the list, increasing DOM size and unnecessary re-renders.
   - I will extract both the `Dialog` and `Snackbar` blocks and place them at the root level of the component (outside the `Grid container`), just before the closing `</Box>`.
2. **Add a comment explaining the performance optimization:**
   - I will add a comment block starting with `// ⚡ Bolt: Performance optimization` explaining What, Why, Impact, and Measurement.
3. **Verify the change using pre-commit steps:**
   - Run linter and type checks to ensure there are no syntax errors.
4. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**
5. **Submit the PR:**
   - Create a PR with the title "⚡ Bolt: [performance improvement]" and provide the necessary What, Why, Impact, and Measurement details.
