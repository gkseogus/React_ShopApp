import { Store, createStore, applyMiddleware } from "redux";
// thunk : 이 미들웨어를 사용하면 액션 객체가 아닌 함수를 디스패치 할 수 있다.
import thunk from "redux-thunk"; 

import { routerMiddleware } from "connected-react-router";

import { History } from "history";

import { ApplicationState, createRootReducer } from "./store";

// 여기서 configureStore는 단지 함수명이다. (모듈로 불러오지 않음)
export default function configureStore(
  // History를 store에 저장하기 위한 변수
  history: History,
  // 컴포넌트들의 각 초기상태를 store에 저장
  initialState: ApplicationState 
): Store<ApplicationState> {
  // createStore을 통해 앱의 전체 상태를 보유하는 redux store을 만든다.
    // createRootReudcer를 통해 각 컴포넌트들에게 다음(next) 상태를 반환한다.
  const store = createStore(
    createRootReducer(history),
    initialState,
    // 리덕스는 액션 -> 미들웨어 -> 리듀서 -> 스토어 순으로 동작
    // applyMiddleware로 리덕스에 기능을 넣어 확장을 시켜준다.
        // thunk 미들웨어를 통해 액션 생성함수를 작성할 수 있게 한다. (fetchRequest())
        // routerMiddleware 미들웨어는 리덕스에서 주소를 변경 및 확인하기 위해 history 객체를 관리
    applyMiddleware(routerMiddleware(history), thunk)
  );
  return store;
}
