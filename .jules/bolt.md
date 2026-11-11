## 2023-10-24 - ReactMarkdown Inline Components Unmount/Remount Bottleneck
**Learning:** Defining custom React components inline within the `components` prop of `ReactMarkdown` inside a list `map` causes React to unmount and remount the entire message DOM on every re-render (e.g., every keystroke in the chat input). This is because the inline arrow functions create new component types on every render pass, which is a severe performance bottleneck in chat interfaces.
**Action:** Always extract custom components for `ReactMarkdown` outside of the parent component or memoize them using `useMemo`. Similarly, array props like `remarkPlugins={[remarkGfm]}` should be extracted outside the component.

## 2026-10-16 - React Query Default Stale Time
**Learning:** By default, React Query refetches data on window focus and component mounts, which can cause unnecessary backend load for data that rarely changes.
**Action:** Set a global default staleTime in main.tsx or specific queries to reduce redundant network requests, but keep it conservative (e.g. 1 minute) to avoid stale data unless explicitly configured longer for certain endpoints.

## 2023-11-11 - [DOM Bloat from Overlay Components]
**Learning:** Placing singleton overlay components (`Dialog` and `Snackbar`) inside a React list `.map()` creates duplicate hidden elements in the DOM, causing severe DOM bloat and unnecessary rendering overhead for each item in the list.
**Action:** Always move unrendered overlay components (like Dialog or Snackbar) outside the list iteration loop and use component-level state variables to manage them.
