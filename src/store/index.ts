import { combineReducers, createStore } from "redux";
import * as reducers from "./reducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers(reducers);

export default function configureStore() {
  const store = createStore(
    rootReducer /* preloadedState, */,
    /* // @ts-expect-error: import devtools extension
    window.REDUX_DEVTOOLS_EXTENSION &&
      // @ts-expect-error: import devtools extension
      window.REDUX_DEVTOOLS_EXTENSION(), */
    composeWithDevTools(),
  );
  return store;
}
