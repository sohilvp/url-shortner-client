import { configureStore } from "@reduxjs/toolkit";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userSlice, { UserState } from "../redux/userSlice";
import urlSlice from "../redux/urlSlice";

const userPersistConfig: PersistConfig<UserState> = {
  key: "root",
  storage,
};

const persistUserReducer = persistReducer(userPersistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistUserReducer,
    url: urlSlice,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
  devTools: false,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
