declare type RootState = ReturnType<typeof import("./index").store.getState>;
declare type AppDispatch = typeof import("./index").store.dispatch;
declare type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
