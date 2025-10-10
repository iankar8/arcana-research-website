import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services | Arcana Advisors",
  description: "AI implementation services for Risk, Compliance, and Technology teams. Deployed in 6-8 weeks with full audit trails.",
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
