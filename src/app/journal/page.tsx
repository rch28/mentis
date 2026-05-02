import DashboardShell from "@/components/dashboard/DashboardShell";
import { JournalSection } from "@/components/dashboard/PracticeSections";

export default function JournalPage() {
  return (
    <DashboardShell>
      <JournalSection />
    </DashboardShell>
  );
}
