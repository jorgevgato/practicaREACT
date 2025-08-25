import { combineReducers, createStore } from "redux";
import * as reducers from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";
import { useDispatch, useSelector } from "react-redux";

const rootReducer = combineReducers(reducers);

export default function configureStore(
  preloadedState: Partial<reducers.State>,
) {
  const store = createStore(
    rootReducer,
    preloadedState as never,
    /* // @ts-expect-error: import devtools extension
    window.REDUX_DEVTOOLS_EXTENSION &&
      // @ts-expect-error: import devtools extension
      window.REDUX_DEVTOOLS_EXTENSION(), */
    composeWithDevTools(),
  );
  return store;
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof configureStore>;
export type AppDispatch = AppStore["dispatch"];
/* export type AppGetState = AppStore["getState"]; */

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
