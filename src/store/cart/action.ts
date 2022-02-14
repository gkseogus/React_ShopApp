import { CartActionTypes } from "./types";
import { Inventory } from "../inventory/types";
import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { ApplicationState } from "../index";

export type AppThunk = ThunkAction<
  void,
  ApplicationState,
  null,
  Action<string>
>;

export const fetchCartRequest: AppThunk = () => {
  return (dispatch: Dispatch, state: ApplicationState): Action => {
    try {
      return dispatch({
        type: CartActionTypes.FETCH_CART_SUCCESS,
        payload: state.cart 
      });
    } catch (e) {
      return dispatch({
        type: CartActionTypes.FETCH_CART_ERROR
      });
    }
  };
};

type NewType = ThunkAction<void, ApplicationState, Inventory, Action<string>>;

// 장바구니 제품 추가 함수
export const addToCart: ActionCreator<NewType> = item => {
  return (dispatch: Dispatch): Action => {
    // console.log('eewew',item)
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

// 모든 장바구니 제품 제거 함수
export const removeAllToCart: ActionCreator<NewType> = cartItems => {
  return (dispatch: Dispatch): Action => {
    // console.log(cartItems) -> 모든 아이템을 배열로 받음
      return dispatch({
        type: CartActionTypes.REMOVEALL_FROM_CART, 
        payload: cartItems // 아이템 데이터를 전송, 이 데이터를 바탕으로 수정 요청
      });
  };
};

// 개별 장바구니 제품 제거 함수 (addToCart와 동일하게 데이터 객체를 하나 씩 받음)
export const removeItem: ActionCreator<NewType> = cartItem => {
  return (dispatch: Dispatch): Action => {
    // console.log('removeItemCartItem',cartItem) -> 개별 아이템을 객체로 받음
      return dispatch({
        type: CartActionTypes.REMOVE_FROM_ITEM, 
        payload: cartItem
      });
  };
}
