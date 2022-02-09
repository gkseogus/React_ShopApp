import { Reducer } from "redux";
import { InventoryActionTypes, InventoryState } from "./types";

export const initialState: InventoryState = {
  data: [],
  errors: undefined,
  loading: false
};

// reducer : dispatch안 action의 type을 확인하고
// 그에 맞는 동작을 한다. 
const reducer: Reducer<InventoryState> = (state = initialState, action) => {
  switch (action.type) {
    case InventoryActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true }; // ...state = 초기 상태의 카피본  (업데이트 하기 전)
    }
    case InventoryActionTypes.FETCH_SUCCESS: {
      console.log("action payload", action.payload);
      // 단지 store의 상태만 수정
      // 업데이트된 store의 state를 mapStateToProp가 가져간다.
      return { ...state, loading: false, data: action.payload };
    }
    case InventoryActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload };
    }
    default: {
      return state;
    } 
  }
};

export { reducer as InventoryReducer };
