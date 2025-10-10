import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | Arcana Advisors",
  description: "Independent, open-source research on AI adoption in banking. Quarterly reports with peer review and full methodology.",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
