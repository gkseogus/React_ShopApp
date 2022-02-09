import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";

const history = createBrowserHistory(); 
const initialState: any = {};
const store = configureStore(history, initialState);

// ReactDom.render를 통해 App 컴포넌트를 렌더링 해준다.
ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);

serviceWorker.unregister();
