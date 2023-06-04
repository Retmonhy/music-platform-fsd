import { compose } from "@reduxjs/toolkit";
//так как fsd еще пилят под NextJs, то приходится пока идти против правил и импортить из верхнего слоя в нижний
// eslint-disable-next-line boundaries/element-types
import { wrapper } from "../store";

export const withProviders = compose(wrapper.withRedux);
export { WithIsSSRMobileContext } from "./withIsSSRMobileContext";
export { WithStoreProvider } from "./withStore";
