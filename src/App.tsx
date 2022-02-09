import React from "react";
import "./App.css";

// context를 사용해 모든 리액트 컴포넌트에게 테마 속성을 전달
import { ThemeProvider } from "@chakra-ui/core"; 

import customTheme from "./theme";
import { Provider } from "react-redux";
import { ApplicationState } from "./store";
import { Store } from "redux";
import { History } from "history";
import { ConnectedRouter } from "connected-react-router";
import Routes from "./routes";

interface MainProps {
  store: Store<ApplicationState>; // 현재 상태를 store에 저장
  history: History; // 현재까지 이동한 url 경로들이 담겨있다.
}

// Provider: 리액트 앱에 store 연동
// ConnectedRouter: 리덕스에서 history 객체를 동기화
// styled components를 사용하기 위해 themeprovider 컴포넌트를 사용한다.
// App은 index에서 props로 store, history를 받는다.
const App: React.FC<MainProps> = ({ store, history }) => {
  return (
    <Provider store={store}> 
      <ThemeProvider theme={customTheme}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
