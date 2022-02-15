export interface Inventory {
  id: number;
  name: string;
  price: string;
  image: string;
  description: string;
  brand?: string;
  currentInventory: number;
}

// Omit: 생략, id는 자동 생상할거라서 ID를 뺀값만 생성할때 사용
export type InventoryCreate = Omit<Inventory, "id"> 

// 전송 가능한 액션 유형
export enum InventoryActionTypes {
  FETCH_REQUEST = "@@inventory/FETCH_REQUEST", // 요청
  FETCH_SUCCESS = "@@inventory/FETCH_SUCCESS", // 성공적인 응답
  FETCH_ERROR = "@@inventory/FETCH_ERROR", // 에러
  CREATE_ITEM = "@@inventory/CREATE_ITEM" // item생성
}

export interface InventoryState {
  readonly loading: boolean;
  readonly data: Inventory[];
  readonly errors?: string;
}
