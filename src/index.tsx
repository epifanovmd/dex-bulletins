import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { HashRouter } from "react-router-dom";
import { createStore } from "redux";
import { applyMiddleware } from "redux";
import thunk from "redux-thunk";

import "bootstrap/dist/css/bootstrap.min.css";
import "font-awesome/css/font-awesome.min.css";

import App from "./component/App";
import reducer from "./reducers";
import AddBulletin from "./component/AddBulletin";
import UpdateBulletin from "./component/UpdateBulletin";

const store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter hashType="noslash">
      <div>
        <Route exact={true} path="/" component={App} />
        <Route exact={true} path="/addbulletin" component={AddBulletin} />
        <Route exact={true} path="/updtaebulletin" component={UpdateBulletin} />
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
