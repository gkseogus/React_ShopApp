import React, { useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ProductItem from "../ProductItem";
import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { fetchRequest } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

// Container, ProductListItems컴포넌트를 하나 만들어 div 박스를 꾸민다.
// css를 미리 입혀놓은 컴포넌트
// 홈페이지 전체 옵션 ( background: green )
const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: auto;
  background: green;
`;

// 소파 글씨 옵션 ( color: yellow ) 
const ProductListItems = styled.div` 
  display: flex;
  flex-wrap: wrap;
  color: yellow;
`;

// 인터페이스 정의
interface PropsFromState {
  loading: boolean;
  data: Inventory[];
  errors?: string;
}

  
interface propsFromDispatch {
  fetchRequest: () => any;
} 

type AllProps = PropsFromState & propsFromDispatch;

const HomePage: React.FC<AllProps> = ({data,fetchRequest}) => {
   // store의 inventory 값이 업데이트 되면 data도 업데이트된다.
   console.log('homePageData:',data);
  // useEffect(()=>{}) : HomePage컴포넌트가 mount, 재렌더링 될때 useEffect안의 코드를 실행시키는 hook
  useEffect(() => { 
    console.log('useEffect Check');
    fetchRequest();
  }, [fetchRequest]);
  
  return (
    <Container>
      <ProductListItems>
        {/* state */}
        {
        data.map(item => {
          // 이때 item은 data의 각 요소를 의미
          // data는 타입만 정의된 배열 객체, map은 함수이기에 return이 필요하다.          
          // 1. map 함수로 배열인 data의 각 요소를 return 값으로 바꿔준다.
          // 2. 그 값들을 참조하는 배열은 새로운 배열로 된다. (item)
          // ex) data[item] -> newData[return값] , 새로운 배열이기 때문에 data의 인터페이스를 따를 필요가 없다.
          // 이때 리턴값은 productItem의 item이며 각 이미지,브랜드,이름, 버튼을 리턴해준다.
          return <ProductItem item={item} />; // 실질적으로 사이트에 출력되는 컴포넌트 
        })
        }
      </ProductListItems>
    </Container>
  );
};

// mapStateToProps: store로부터 state(inventory)를 가져와 컴포넌트의 props로 보내게 해준다.
// store state(inventory)가 변경될 때 실행된다.
// 변경되면 inventory state를 HomePage 컴포넌트로 가져온다.
// 여기서 homePage 컴포넌트로 전달되는 props는 loading,errors,data
// connect로 연결해서 사용하지 않으려면 select 사용하자-> selecter에 공부
const mapStateToProps = ({ inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data
});

// mapDispatchToProps: dispatch를 props로 보낼 수 있다.
// 여기서 homePage 컴포넌트로 전달되는 props는 fetchRequest()
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchRequest: () => {
      dispatch(fetchRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
