## 2023-10-24 - ReactMarkdown Inline Components Unmount/Remount Bottleneck
**Learning:** Defining custom React components inline within the `components` prop of `ReactMarkdown` inside a list `map` causes React to unmount and remount the entire message DOM on every re-render (e.g., every keystroke in the chat input). This is because the inline arrow functions create new component types on every render pass, which is a severe performance bottleneck in chat interfaces.
**Action:** Always extract custom components for `ReactMarkdown` outside of the parent component or memoize them using `useMemo`. Similarly, array props like `remarkPlugins={[remarkGfm]}` should be extracted outside the component.

## 2024-05-18 - [Global React Query StaleTime Causes Staleness Bugs]
**Learning:** Setting a global `staleTime` (e.g. 5 minutes) in React Query to reduce network requests introduces massive data freshness bugs across the app, acting as an unintended architectural change.
**Action:** Never change global `staleTime` in React Query defaultOptions without explicit instruction. Optimize on a per-query level instead or stick to safe component memoization.
