import { InventoryActionTypes } from "./types";

import { ActionCreator, Action, Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";

import { ApplicationState } from "../index";
import inventory from "../../mockdata";

export type AppThunk = ActionCreator<
  ThunkAction<
   void, 
   ApplicationState, 
   null, Action<string>
  >
>;

// mockdata를 받아와 reducer에게 데이터를 전송
export const fetchRequest: AppThunk = () => {
  return (dispatch: Dispatch): Action => {
    try {
      // 각 두개의 dispatch에 action을 담아 전송
      return dispatch({ // 리듀서에게 inventory 데이터 전송
        type: InventoryActionTypes.FETCH_SUCCESS,
        payload: inventory // inventory 데이터를 전송 ( mockdata )
      });
    } catch (e) { 
      return dispatch({
        type: InventoryActionTypes.FETCH_ERROR // 에러이면...
      });
    }
  };
};
