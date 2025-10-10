import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Intelligence Briefing | Arcana Advisors",
  description: "Weekly AI intelligence briefs and monthly deep dives for banking executives. Stay informed without the noise. $1,000/month.",
};

export default function IntelligenceBriefingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
