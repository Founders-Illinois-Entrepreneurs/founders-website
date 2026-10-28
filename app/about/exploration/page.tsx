import type { Metadata } from "next";
import TeamInitiativesPage from "@/components/TeamInitiativesPage";

export const metadata: Metadata = { title: "Exploration team", description: "What the Founders Exploration team does and the initiatives it's running." };

export default function AboutExplorationPage() {
  return <TeamInitiativesPage id="exploration" />;
}
