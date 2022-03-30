import { Inventory } from "../inventory/types";

export interface Cart {
  items: Inventory[];
}


// 전송 가능한 액션 유형{
export const  ADD_TO_CART = "@@cart/ADD_TO_CART" // 장바구니에 제품 추가
export const  ADD_TO_CART_FAILURE = "@@cart/ADD_TO_CART_FAILURE"  // add 실패
export const  REMOVEALL_FROM_CART = "@@cart/REMOVEALL_FROM_CART" // 장바구니의 모든 제품 제거
export const  REMOVE_FROM_ITEM = "@@cart/REMOVE_FROM_ITEM" // 장바구니의 개별 제품 제거
export const  FETCH_CART_REQUEST = "@@cart/FETCH_CART_REQUEST" // 요청
export const  FETCH_CART_SUCCESS = "@@cart/FETCH_CART_SUCCESS" // 성공적인 응답
export const  FETCH_CART_ERROR = "@@cart/FETCH_CART_ERROR" // 에러


export interface cartState {
  readonly loading: boolean;
  readonly data: Cart;
  readonly errors?: string;
}
