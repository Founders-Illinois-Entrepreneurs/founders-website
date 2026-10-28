import type { Metadata } from "next";
import TeamInitiativesPage from "@/components/TeamInitiativesPage";

export const metadata: Metadata = { title: "Events team", description: "What the Founders Events team does and the initiatives it's running." };

export default function AboutEventsPage() {
  return <TeamInitiativesPage id="events" />;
}
