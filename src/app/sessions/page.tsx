import DashboardShell from "@/components/dashboard/DashboardShell";
import { SessionsSection } from "@/components/dashboard/PracticeSections";

export default function SessionsPage() {
  return (
    <DashboardShell>
      <SessionsSection />
    </DashboardShell>
  );
}
