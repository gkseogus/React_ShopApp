import React from "react";
import "./App.css";

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
