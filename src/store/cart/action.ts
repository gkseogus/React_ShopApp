import { CartActionTypes } from "./types";
import { Inventory } from "../inventory/types";
import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";

// action은 중앙 장소에 저장된 state에 무슨 동작을 할지
// 적어 놓는 객체이다. type이 필수로 필요하다.


// export: JS에서 함수, 객체, 원시 값을 내보낼 때 사용
// 내보낸 값은 다른 프로그램에서 import 문으로 가져가 사용 가능
export type AppThunk = ThunkAction<
  void,
  ApplicationState,
  null,
  Action<string>
>;

// dispatch : action을 프로퍼티로 받아 store의 reducer을 호출한다.
// 리듀서를 호출할 때 디스패치는 현재의 state의 값과 액션의 값을 전달한다.
export const fetchCartRequest: AppThunk = () => {
  return (dispatch: Dispatch, state: ApplicationState): Action => {
    try {

      // 각 두개의 dispatch에 action을 담아 전송
      return dispatch({
        type: CartActionTypes.FETCH_CART_SUCCESS, // 성공적인 응답이면
        payload: state.cart // cart 상태 데이터를 전송
      });
    } catch (e) {
      return dispatch({
        type: CartActionTypes.FETCH_CART_ERROR // 에러이면...
      });
    }
  };
};

type NewType = ThunkAction<void, ApplicationState, Inventory, Action<string>>;

export const addToCart: ActionCreator<NewType> = item => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: CartActionTypes.ADD_TO_CART, // 장바구니 제품 추가
        payload: item // 아이템 데이터를 전송, 이 데이터를 바탕으로 수정 요청
      });
    } catch (e) {
      return dispatch({
        type: CartActionTypes.ADD_TO_CART_FAILURE, // add 실패시
        payload: null // null 값 데이터를 전송
      });
    }
  };
};
