
## 2024-10-12 - Prevent Re-renders in Lists
**Learning:** Defining objects inline for mapped components inside a component that updates state frequently (like controlled inputs) causes severe re-render cascading.
**Action:** Always extract static props (arrays, objects, functions) outside the component body or memoize them to preserve stable references.
