import { Reducer } from "redux";
import { CartActionTypes, cartState } from "./types";

// redux는 항상 초기상태를 정의한다.
export const initialState: cartState = {
  data: {
    id: [], // 장바구니에 추가된 data를 배열로 받는다.
    items: [] 
  },
  errors: undefined,
  loading: false
};

const reducer: Reducer<cartState> = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.FETCH_CART_REQUEST: { 
      return { ...state, loading: true };
    }
    case CartActionTypes.FETCH_CART_SUCCESS: { 
      return { ...state, loading: false, data: action.payload };
    }
    case CartActionTypes.FETCH_CART_ERROR: { 
      return { ...state, loading: false, errors: action.payload };
    }
    case CartActionTypes.ADD_TO_CART: { // 장바구니에 제품 추가
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          // data의 id도 같이 배열로 받음
          // item만 배열로 받아 store에 저장한다
          id: [...state.data.items, action.payload],
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
          id: state.data.id.filter(id => id === action.payload.id[1]),
          items: state.data.id.filter(item => item === action.payload.id)
        }
      };
    }
    // 삭제코드 예시
    // case REMOVE_FROM_CART:
    //   const selectedCartItem = state.items[action.pid];
    //   const currentQty = selectedCartItem.quantity;
    //   let updatedCartItems;
    //   if (currentQty > 1) {
    //     // 수량을 줄임. 삭제하지 않음.
    //     const updatedCartItem = new CartItem(
    //       currentQty - 1,
    //       selectedCartItem.productPrice,
    //       selectedCartItem.productTitle,
    //       selectedCartItem.sum - selectedCartItem.productPrice
    //     );
    //     updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
    //   } else {
    //     // 삭제함.
    //     updatedCartItems = { ...state.items };
    //     delete updatedCartItems[action.pid];
    //   }

    default: {
      return state;
    }
  }
};

export { reducer as cartReducer };
