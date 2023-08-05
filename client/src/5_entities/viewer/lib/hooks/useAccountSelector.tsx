import { useTypedSelector } from '@shared/hooks';

export const useAccountSelector = () => useTypedSelector((state) => state.account);
