import { useRouter } from 'next/router';
import React, { FC, ReactNode, useEffect } from 'react';

import { useAccountSelector } from '@entities/viewer';

import { H1 } from '@shared/components';

import { LeftSideMenu } from './components';

interface IAccountLayoutProps {
  children: ReactNode;
}
export const AccountLayout: FC<IAccountLayoutProps> = ({ children }) => {
  const router = useRouter();
  const { isAuth } = useAccountSelector();
  useEffect(() => {
    if (!isAuth) {
      router.push('/account/login');
    }
  }, []);
  return (
    <>
      <H1>Мой профиль</H1>
      <div>
        <LeftSideMenu />
        {children}
      </div>
    </>
  );
};
