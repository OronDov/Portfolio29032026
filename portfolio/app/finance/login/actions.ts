'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function financeLoginAction(
  _prevState: { error?: string },
  formData: FormData
): Promise<{ error?: string }> {
  const password        = formData.get('password') as string | null;
  const correctPassword = process.env.FINANCE_PASSWORD;

  if (!correctPassword) {
    return { error: 'FINANCE_PASSWORD env variable not set.' };
  }

  if (!password || password !== correctPassword) {
    return { error: 'סיסמה שגויה. נסה שוב.' };
  }

  cookies().set('finance_auth', 'true', {
    httpOnly: true,
    secure:   process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge:   60 * 60 * 24 * 7, // 7 days
    path:     '/',
  });

  redirect('/finance');
}

export async function financeLogoutAction(): Promise<void> {
  'use server';
  cookies().delete('finance_auth');
  redirect('/finance/login');
}
