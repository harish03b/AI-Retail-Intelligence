## 2023-10-24 - ReactMarkdown Inline Components Unmount/Remount Bottleneck
**Learning:** Defining custom React components inline within the `components` prop of `ReactMarkdown` inside a list `map` causes React to unmount and remount the entire message DOM on every re-render (e.g., every keystroke in the chat input). This is because the inline arrow functions create new component types on every render pass, which is a severe performance bottleneck in chat interfaces.
**Action:** Always extract custom components for `ReactMarkdown` outside of the parent component or memoize them using `useMemo`. Similarly, array props like `remarkPlugins={[remarkGfm]}` should be extracted outside the component.

## 2026-10-16 - React Query Default Stale Time
**Learning:** By default, React Query refetches data on window focus and component mounts, which can cause unnecessary backend load for data that rarely changes.
**Action:** Set a global default staleTime in main.tsx or specific queries to reduce redundant network requests, but keep it conservative (e.g. 1 minute) to avoid stale data unless explicitly configured longer for certain endpoints.

## 2024-11-08 - Move Modals and Snackbars out of Lists
**Learning:** Placing unrendered Dialog or Snackbar components inside a list `.map()` creates `N` hidden elements in the DOM, causing massive DOM bloating and unnecessary re-renders.
**Action:** Always place global or single-instance overlay components (like Dialogs and Snackbars) outside of any list iteration loop in React.
