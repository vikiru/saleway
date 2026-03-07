import { requireUser } from '@/features/user/actions/auth';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';

export default async function Page() {
  const userId = await requireUser();
  return <DashboardPage userId={userId} />;
}
