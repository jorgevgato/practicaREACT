import type { Advert } from "../pages/adverts/types";
import type { Actions } from "./action";

export type State = {
  auth: boolean;
  adverts: Advert[];
  tags: string[];
};

const defaultState: State = {
  auth: false,
  adverts: [],
  tags: [],
};

/* export function reducer(state = defaultState, action: Actions): State {
  switch (action.type) {
    case "auth/login":
      return { ...state, auth: true };
    case "auth/logout":
      return { ...state, auth: false };
    case "adverts/loaded":
      return { ...state, adverts: action.payload };
    case "adverts/created":
      return { ...state, adverts: [...state.adverts, action.payload] };
    default:
      return state;
  }
} */

export function auth(
  state = defaultState.auth,
  action: Actions,
): State["auth"] {
  switch (action.type) {
    case "auth/login":
      return true;
    case "auth/logout":
      return false;
    default:
      return state;
  }
}

export function adverts(
  state = defaultState.adverts,
  action: Actions,
): State["adverts"] {
  switch (action.type) {
    case "adverts/loaded":
      return action.payload;
    case "adverts/created":
      return [...state, action.payload];
    default:
      return state;
  }
}

/* export function reducer(state = defaultState, action: Actions): State {
  return {
    auth: auth(state.auth, action),
    adverts: adverts(state.adverts, action)
  }
} */

/* export const reducer = combineReducers({
  auth,
  adverts
}) */

export function detail(state: Advert | null = null, action: Actions) {
  switch (action.type) {
    case "detail/loaded":
      return action.payload;
    default:
      return state;
  }
}

export function tags(state = defaultState.tags, action: Actions) {
  switch (action.type) {
    case "tags/loaded":
      return action.payload;
    default:
      return state;
  }
}
