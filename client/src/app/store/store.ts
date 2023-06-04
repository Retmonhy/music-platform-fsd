import { configureStore } from "@reduxjs/toolkit";
import { Context, HYDRATE, createWrapper } from "next-redux-wrapper";
import { Store, combineReducers } from "redux";
import thunk from "redux-thunk";

import { playerReducer } from "@entities/player";
import { trackReducer } from "@entities/track";

const rootReducer = combineReducers({
  player: playerReducer,
  track: trackReducer,
});

const reducer = (state: RootState, action) => {
  if (action.type === HYDRATE) {
    const nextState: RootState = {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    };
    //isHidrated показывает надо ли заполнять ту часть стора в которой он есть или нет.
    //решает проблему с мержем сторов с сервера и клиента.
    //есть вариант разеления сторов, но пока не понятно как использовать
    // if (state.account.isHidrated) nextState.account = state.account;
    if (state.player.isHidrated) nextState.player = state.player;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};
const makeStore = (context: Context) => configureStore<RootState>({ reducer, middleware: [thunk] });

export const wrapper = createWrapper<Store<RootState>>(makeStore, {});
const store = makeStore(null);
export { store };

type RootState = ReturnType<typeof rootReducer>;
