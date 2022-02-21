import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import { History } from "history";

import { InventoryReducer } from "./inventory/reducer";
import { InventoryState } from "./inventory/types";

import { cartReducer } from "./cart/reducer";
import { cartState } from "./cart/types";
import { RouterState } from "connected-react-router";

// ApplicationState: store의 상태
export interface ApplicationState {
  cart: cartState;
  // 리듀서의 inventory 상태가 여기에 저장 -> app 보면  store에 사용하고있음
  inventory: InventoryState;
  router: RouterState;
}

export const createRootReducer = (history: History) =>
  // combineReducers : 각각의 리듀서를 하나로 합쳐 하나의 리듀서로 관리 
  combineReducers({
    cart: cartReducer,
    inventory: InventoryReducer,
    router: connectRouter(history)
  });
