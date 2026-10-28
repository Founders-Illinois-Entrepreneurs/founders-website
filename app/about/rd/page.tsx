import type { Metadata } from "next";
import TeamInitiativesPage from "@/components/TeamInitiativesPage";

export const metadata: Metadata = { title: "R&D team", description: "What the Founders R&D team does and the initiatives it's running." };

export default function AboutRDPage() {
  return <TeamInitiativesPage id="rd" />;
}
