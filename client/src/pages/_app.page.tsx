import { AppProps } from 'next/app';
import dynamic from 'next/dynamic';
import React, { createContext } from 'react';

import { WithStoreProvider, withProviders } from '@app';
// import { debouncedFetchPl } from './account/playlists.page';
import '@app/styles/Global.scss';
import '@app/styles/global.css';

import { MainLayout } from '@widgets/main-layout';
import { usePlaylistModal } from '@widgets/playlist';

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
        <Wrapper Component={Component} pageProps={pageProps} />
      </IsSsrMobileContext.Provider>
    </WithStoreProvider>
  );
};
export default withProviders(WrappedApp);

const DynamicPlaylistModal = dynamic(() => import('@widgets/playlist'), { loading: () => <p>Loading...</p> });
//тут работает redux и хук будет реагировать на изменения стейта
const Wrapper = ({ Component, pageProps }) => {
  const playlistModal = usePlaylistModal();
  return (
    <MainLayout>
      <Component {...pageProps} />
      {playlistModal.isVisible ? <DynamicPlaylistModal isVisible={playlistModal.isVisible} /> : null}
    </MainLayout>
  );
};
