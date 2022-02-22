import { Reducer } from 'redux';
import {
  Inventory,
  FETCH_ERROR,
  FETCH_REQUEST,
  FETCH_SUCCESS,
  CREATE_ITEM,
  DELETE_ITEM,
  InventoryState,
} from './types';

export const initialState: InventoryState = {
  data: [],
  errors: undefined,
  loading: false,
};

// reducer : dispatch안 action의 type을 확인하고
// 그에 맞는 동작을 한다.
const reducer: Reducer<InventoryState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REQUEST: {
      return { ...state, loading: true }; // ...state = 초기 상태의 카피본  (업데이트 하기 전)
    }
    case FETCH_SUCCESS: {
      console.log('action payload', action.payload);
      // 단지 store의 상태만 수정
      // 업데이트된 store의 state를 mapStateToProp가 가져간다.
      return { ...state, loading: false, data: action.payload };
    }
    case FETCH_ERROR: {
      console.log('Error')
      return { ...state, loading: false, data: action.payload };
    }
    case CREATE_ITEM: {
      console.log('Create reducer Test',action.payload)
      const newItem: Inventory = {
        ...action.payload,
        id: Math.random().toString(), // id는 임의의 랜덤 문자열
      };
      return { ...state, data: [newItem, ...state.data] };
    }
    case DELETE_ITEM: {
      console.log('Delete reducer Test', action.payload)
      return {
        ...state,
        data: state.data.filter((data) => data.name !== action.payload.name),
        loading: false,
      }
    }
    default: {
      return state;
    }
  }
};

export { reducer as InventoryReducer };
