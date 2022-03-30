import { Reducer } from 'redux';
import {
  Inventory,
  FETCH_ERROR,
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

const reducer: Reducer<InventoryState> = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCESS: {
      console.log('action payload', action.payload);
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
