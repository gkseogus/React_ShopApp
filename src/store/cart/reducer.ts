import { Reducer } from "redux";
import { CartActionTypes, cartState } from "./types";

// redux는 항상 초기상태를 정의한다.
export const initialState: cartState = {
  data: {
    id: 0, // 장바구니에 추가된 data는 모두 id:0
    items: [] 
  },
  errors: undefined,
  loading: false
};

// reducer : dispatch안의 action의 type을 확인하고
// 그에 맞는 동작을 한다. 
// 여기서는 state(initialState)를 입력 값으로 받고 action을 참조해 새로운 state 값을 리턴해준다.
const reducer: Reducer<cartState> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_REQUEST: { // 요청중이면 == 로딩
      return { ...state, loading: true };
    }
    case CartActionTypes.FETCH_CART_SUCCESS: { // 성공적인 응답이면 state 상태를 업데이트
      return { ...state, loading: false, data: action.payload };
    }
    case CartActionTypes.FETCH_CART_ERROR: { // 에러났을 시 == 에러 데이터 보냄
      return { ...state, loading: false, errors: action.payload };
    }
    case CartActionTypes.ADD_TO_CART: { // 장바구니에 제품 추가
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          // data의 id는 냅두고
          // item만 배열로 받아 store에 저장한다
          id: state.data.id,
          items: [...state.data.items, action.payload]
        }
      };
    }
    case CartActionTypes.REMOVE_FROM_CART: { // 장바구니의 제품 제거
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          id: state.data.id,
          items: state.data.items.filter(item => item !== action.payload.id)
        }
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as cartReducer };
