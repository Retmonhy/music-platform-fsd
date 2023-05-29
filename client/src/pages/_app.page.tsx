import React, { createContext, useEffect } from "react";
import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store, { wrapper } from "@shared/store";
import { MainLayout } from "../widgets";
// import { debouncedFetchPl } from './account/playlists.page';
import "../app/styles/Global.scss";
import "../app/styles/global.css";

export const IsSsrMobileContext = createContext(false);
const WrappedApp: React.FC<AppProps> = ({ Component, ...pageProps }) => {
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
    //ts-ignore
    <IsSsrMobileContext.Provider value={pageProps.pageProps.isSsrMobile}>
      <Provider store={store}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </Provider>
    </IsSsrMobileContext.Provider>
  );
};
export default wrapper.withRedux(WrappedApp);
