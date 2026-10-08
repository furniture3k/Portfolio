/**
 * template.tsx remounts on every navigation in Next.js App Router, so the
 * CSS entrance (and every load-in animation inside the page) replays per route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
