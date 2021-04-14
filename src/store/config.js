import reducers from "./reducers"
import { createStore,  compose } from "redux";

export default (initialState) => {
    const composeEnhancers =
      ((typeof window) !== "undefined" &&
        (window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
      compose;
    return createStore(reducers, initialState, composeEnhancers());
  };

