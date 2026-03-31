import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FinanceDashboard from './_components/FinanceDashboard';
import { financeLogoutAction } from './login/actions';

export const metadata = {
  title: 'Finance · Oron Dov',
  robots: { index: false, follow: false },
};

export default function FinancePage() {
  const cookieStore   = cookies();
  const isAuth        = cookieStore.get('finance_auth')?.value === 'true';

  if (!isAuth) redirect('/finance/login');

  return <FinanceDashboard logoutAction={financeLogoutAction} />;
}
