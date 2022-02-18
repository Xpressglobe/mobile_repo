import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { default as thunk} from "redux-thunk";

import AppReducer from "./reducres";
import AppWithNavigationState from "./navigators/AppNavigator";





const store = createStore(
  AppReducer,
  applyMiddleware(thunk),
);


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    console.disableYellowBox = true;
  }

  render() {
    return (
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
    );
  }
}

export default App;
