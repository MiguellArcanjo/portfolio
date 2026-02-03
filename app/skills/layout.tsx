import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Habilidades | Portfolio",
  description: "Todas as habilidades e tecnologias que utilizo.",
};

export default function SkillsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
