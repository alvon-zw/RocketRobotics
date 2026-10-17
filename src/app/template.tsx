export default function Template({ children }: { children: React.ReactNode }) {
  // A template remounts on every navigation, so this replays the entrance animation.
  return <div className="animate-fade-up">{children}</div>;
}
