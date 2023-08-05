import { AppProps } from 'next/app';
import React, { createContext } from 'react';

import { WithStoreProvider, withProviders } from '@app';
// import { debouncedFetchPl } from './account/playlists.page';
import '@app/styles/Global.scss';
import '@app/styles/global.css';

import { MainLayout } from '@widgets/main-layout';

export const IsSsrMobileContext = createContext(false);

interface CustomPageProps {
  isSsrMobile: boolean;
}
const WrappedApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps<CustomPageProps>) => {
  // const { store, props } = wrapper.useWrappedStore(pageProps); //это строчка создавала дополнительный инстанс стора
  //так как WrappedApp вызывается при рендере кадой страницы, то наверное будет вызыватьсяэтот юзЭффект всегда

  // const dispatch = useAppDispatch();
  // const { _account } = useAction();
  // useEffect(() => {
  // 	if (localStorage && localStorage.getItem(StorageKeys.accessToken)) {
  // 		dispatch(_account.checkAuth())
  // 			.then(() => {
  // 				// debouncedFetchPl();
  // 			})
  // 			.catch(() => {
  // 				localStorage.removeItem(StorageKeys.accessToken);
  // 			});
  // 	}
  // }, []);
  return (
    <WithStoreProvider>
      <IsSsrMobileContext.Provider value={pageProps.isSsrMobile}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </IsSsrMobileContext.Provider>
    </WithStoreProvider>
  );
};
export default withProviders(WrappedApp);
