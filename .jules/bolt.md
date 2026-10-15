## 2023-10-24 - ReactMarkdown Inline Components Unmount/Remount Bottleneck
**Learning:** Defining custom React components inline within the `components` prop of `ReactMarkdown` inside a list `map` causes React to unmount and remount the entire message DOM on every re-render (e.g., every keystroke in the chat input). This is because the inline arrow functions create new component types on every render pass, which is a severe performance bottleneck in chat interfaces.
**Action:** Always extract custom components for `ReactMarkdown` outside of the parent component or memoize them using `useMemo`. Similarly, array props like `remarkPlugins={[remarkGfm]}` should be extracted outside the component.

## 2024-05-18 - [Reduce Dashboard Backend Queries via React Query StaleTime]
**Learning:** The dashboard components use React Query without a `staleTime`, resulting in the frontend making heavy backend aggregation queries (like Monthly Sales and Category Sales) every time a component mounts (e.g. switching tabs back to Dashboard). The backend doesn't implement caching, leading to unnecessary load on the database.
**Action:** Always verify if a default `staleTime` is set for React Query in `QueryClientProvider`, especially in SPAs where navigation might unnecessarily retrigger expensive API requests.
