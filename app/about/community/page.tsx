import type { Metadata } from "next";
import TeamInitiativesPage from "@/components/TeamInitiativesPage";

export const metadata: Metadata = { title: "Community team", description: "What the Founders Community team does and the initiatives it's running." };

export default function AboutCommunityPage() {
  return <TeamInitiativesPage id="community" />;
}
