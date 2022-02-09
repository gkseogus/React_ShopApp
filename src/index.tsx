import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createBrowserHistory } from "history";
import configureStore from "./configureStore";

// createBrowserHistory()로 history(location),match를 props로 전달한다.
// history는 react-router-dom을 이용해 history스택 안에 페이지의 기록을 보관한다.
const history = createBrowserHistory(); 

// 초기 상태 정의
const initialState: any = {};
// 만들어진 store에 초기값을 넣음
const store = configureStore(history, initialState);

// ReactDom.render를 통해 App 컴포넌트를 렌더링 해준다.
ReactDOM.render(
  <App store={store} history={history} />,
  // getElementById를 통해 root id 값을 같는 index.html의 element객체를 반환
  document.getElementById("root")
);

serviceWorker.unregister();
