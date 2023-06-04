import { ReactNode, createContext } from "react";

export const IsSsrMobileContext = createContext(false);
export const WithIsSSRMobileContext = (component: () => ReactNode, pageProps: any) => {
  return <IsSsrMobileContext.Provider value={pageProps?.pageProps?.isSsrMobile}>{component()}</IsSsrMobileContext.Provider>;
};
