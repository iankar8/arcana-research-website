import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Use Cases | Arcana Advisors",
  description: "AI implementation use cases for fraud detection, AML monitoring, KYC, compliance, and credit underwriting in banking.",
};

export default function UseCasesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
