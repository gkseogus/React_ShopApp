import React from "react";
import { Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./components/HomePage";
import Cart from "./components/Cart";

// Route : 사용자경로에 따라 다른 화면을 보여주는 라우팅 기능을 가진 컴포넌트
// 이때 라우터는 props를 통해 react-router-dom안의 history 객체를 전달받게 된다.

// Swich로 통해 브라우저의 현재 URL과 매칭 되는 첫 번째 <Route>자식 엘리먼트를 렌더링 한다. 
// 이때 RouterContext를 참조해 path props 정보를 하나씩 비교한다. -> RouterContext: 라우터 상태에 대한 구성 요소 트리
// 라우터에 path가 없다면 해당 컴포넌트가 무조건적으로 렌더링 되기에 이를 막기 위해 switch를 사용
// ㄴ 예제에서는 path값이 다 존재하기에 switch를 안 써도 된다. 
const Routes: React.SFC = () => (
  <div>
    <Switch>
      {/* 첫 번째 route */}
      <Route
        // 라우트는 현재 url정보들을 context로 구성한다.
        // 이때 context는 history(location), match 객체를 가진다. 
        exact
        path="/" // match 객체는 history 정보를 바탕으로 현재 URL과 루트 URL("/")과 비교한다.
                 // 서로의 URL이 맞으면 해당 컴포넌트를 렌더링한다. 
        render={() => ( 
          <Navbar>
            <HomePage/> 
          </Navbar>
        )}
      />
      {/* 두 번째 route */}
      <Route
        path="/cart" 
        render={() => ( 
          <Navbar>
            <Cart />
          </Navbar>
        )}
      />
    </Switch>
  </div>
);

export default Routes;
