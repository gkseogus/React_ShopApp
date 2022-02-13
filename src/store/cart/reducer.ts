import { Reducer } from "redux";
import { CartActionTypes, cartState } from "./types";

// redux는 항상 초기상태를 정의한다.
export const initialState: cartState = {
  data: {
    items: []
  },
  errors: undefined,
  loading: false,
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
          // item만 배열로 받아 store에 저장한다
          items: [...state.data.items, action.payload]
        }
      };
    }

    // 모든 장바구니의 제품 제거
    case CartActionTypes.REMOVEALL_FROM_CART: {
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          items: []
        }
      };
    }

    // 개별 장바구니의 제품 제거 
    // id로 filter하면 같은 id끼리는 모두 삭제 -> items을 구분할때는 id를 사용하고
    // filter를 사용할 때는 items의 index로 구분하자
    case CartActionTypes.REMOVE_FROM_ITEM: {
      // console.log('ttt',action.payload.id)
      return {
        errors: state.errors,
        loading: state.loading,
        data: {
          ...state.data,
          // findIndex를 통해 items의 id와 payload의 id가 같으면 그 요소의 인덱스 값을 반환 
          // ㄴ 즉 사용자가 클릭한 payload의 id와 store안의 여러 item중 같은 id가 있는지 확인하고 해당하는 인덱스를 반환
          // k : inventory, i : number -> k란 값이 없으면 에러 발생
          // i(store에 있던 item의 index)가 findIndex로 얻은 payload의 인덱스 값과 다르면 filter 작동 x 
          // ㄴ 같으면 그 값만 배열의 요소에서 삭제  
          items: state.data.items.filter((k, i) => i !== state.data.items.findIndex(v => v.id === action.payload.id))
        }
      }
    }

    default: {
      return state;
    }
  }
};


export { reducer as cartReducer };
