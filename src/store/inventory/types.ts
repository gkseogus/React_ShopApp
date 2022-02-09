export interface Inventory {
  id: string;
  name: string;
  price: string;
  image: string;
  description: string;
  brand?: string;
  currentInventory: number;
}

// 전송 가능한 액션 유형
export enum InventoryActionTypes {
  FETCH_REQUEST = "@@inventory/FETCH_REQUEST", // 요청
  FETCH_SUCCESS = "@@inventory/FETCH_SUCCESS", // 성공적인 응답
  FETCH_ERROR = "@@inventory/FETCH_ERROR" // 에러
}

export interface InventoryState {
  readonly loading: boolean;
  readonly data: Inventory[];
  readonly errors?: string;
}
