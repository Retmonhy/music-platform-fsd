import { Provider } from "react-redux";
//так как fsd еще пилят под NextJs, то приходится пока идти против правил и импортить из верхнего слоя в нижний
// eslint-disable-next-line boundaries/element-types
import { store } from "../store";

export const WithStoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
