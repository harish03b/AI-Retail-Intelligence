
## 2024-10-12 - Prevent Re-renders in Lists
**Learning:** Defining objects inline for mapped components inside a component that updates state frequently (like controlled inputs) causes severe re-render cascading.
**Action:** Always extract static props (arrays, objects, functions) outside the component body or memoize them to preserve stable references.
## 2023-10-24 - ReactMarkdown Inline Components Unmount/Remount Bottleneck
**Learning:** Defining custom React components inline within the `components` prop of `ReactMarkdown` inside a list `map` causes React to unmount and remount the entire message DOM on every re-render (e.g., every keystroke in the chat input). This is because the inline arrow functions create new component types on every render pass, which is a severe performance bottleneck in chat interfaces.
**Action:** Always extract custom components for `ReactMarkdown` outside of the parent component or memoize them using `useMemo`. Similarly, array props like `remarkPlugins={[remarkGfm]}` should be extracted outside the component.
