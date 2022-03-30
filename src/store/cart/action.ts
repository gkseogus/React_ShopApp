import { ADD_TO_CART, ADD_TO_CART_FAILURE, FETCH_CART_ERROR, FETCH_CART_SUCCESS, REMOVEALL_FROM_CART, REMOVE_FROM_ITEM } from "./types";
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

type NewType = ThunkAction<void, ApplicationState, Inventory, Action<string>>;

export const fetchCartRequest: AppThunk = () => {
  return (dispatch: Dispatch, state: ApplicationState): Action => {
    try {
      return dispatch({
        type: FETCH_CART_SUCCESS,
        payload: state.cart 
      });
    } catch (e) {
      return dispatch({
        type: FETCH_CART_ERROR
      });
    }
  };
};

// 장바구니 제품 추가 함수
export const addToCart: ActionCreator<NewType> = item => {
  return (dispatch: Dispatch): Action => {
    try {
      return dispatch({
        type: ADD_TO_CART, 
        payload: item 
      });
    } catch (e) {
      return dispatch({
        type: ADD_TO_CART_FAILURE, 
        payload: null 
      });
    }
  };
};

// 모든 장바구니 제품 제거 함수
export const removeAllToCart: ActionCreator<NewType> = cartItems => {
  return (dispatch: Dispatch): Action => {
      return dispatch({
        type: REMOVEALL_FROM_CART, 
        payload: cartItems 
      });
  };
};

// 개별 장바구니 제품 제거 함수 (addToCart와 동일하게 데이터 객체를 하나 씩 받음)
export const removeItem: ActionCreator<NewType> = cartItem => {
  return (dispatch: Dispatch): Action => {
      return dispatch({
        type: REMOVE_FROM_ITEM, 
        payload: cartItem
      });
  };
}
