import { Reducer } from "redux";
import { cartState } from "./types";
import { ADD_TO_CART, FETCH_CART_REQUEST, FETCH_CART_ERROR, FETCH_CART_SUCCESS, REMOVEALL_FROM_CART, REMOVE_FROM_ITEM } from "./types";
export const initialState: cartState = {
  data: {
    items: []
  },
  errors: undefined,
  loading: false,
};

const reducer: Reducer<cartState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CART_REQUEST: {
      return { ...state, loading: true };
    }
    case FETCH_CART_SUCCESS: {
      return { ...state, loading: false, data: action.payload };
    }
    case FETCH_CART_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    case ADD_TO_CART: { 
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          items: [...state.data.items, action.payload]
        }
      };
    }
    case REMOVEALL_FROM_CART: {
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          items: []
        }
      };
    }
    case REMOVE_FROM_ITEM: {
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          // findIndex를 통해 사용자가 클릭한 payload의 id와 store안의 여러 item중 같은 id가 있는지 확인하고 같으면 
          // action.payload에서 해당하는 첫번째 인덱스를 반환
          // i(store에 있던 item의 index)가 findIndex로 얻은 payload의 인덱스 값과 다르면 filter 작동 x 
             // ㄴ 같으면 그 값만 배열의 요소에서 삭제  
          // filter는 state.data.items의 배열을 판별하고 그때 배열의 요소는 k
          items: state.data.items.filter((_k, i) => i !== state.data.items.findIndex(v => v.id === action.payload.id))
        }
      }
    }

    default: {
      return state;
    }
  }
};


export { reducer as cartReducer };
