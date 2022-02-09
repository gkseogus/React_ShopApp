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

  
//(질문1) 왜 같은 인터페이스 안에 넣지 않았을까?
// ㄴ 사용자에 따라 타입 지정 취향이 다르기 때문 -> 코드 가독성 문제도 포함
// fetchRequest 메소드는 any 타입으로 정의해라
interface propsFromDispatch {
  fetchRequest: () => any;
} 

// AllProps는 인터페이스(두개)를 갖음
type AllProps = PropsFromState & propsFromDispatch;

// React.FC를 사용함으로서 Props의 타입을 제네릭으로 넣어서 사용한다.
const HomePage: React.FC<AllProps> = ({
  data,
  // props를 useEffect()에 추가함으로써 useEffect()가 실행될때 마다 
  // ㄴ fetchRequest()라는 액션이 발동
  fetchRequest
 }) => {
   // store의 inventory 값이 업데이트 되면 data도 업데이트된다.
   console.log('homePageData:',data);
  // 컴포넌트들은 생성(mount), 업데이트(재렌더링), 삭제가 가능하다. -> 모든 컴포넌트는 생명주기 메서드를 가진다.
  // mount: 컴포넌트가 DOM 상에 삽입, 재렌더링: props, stae가 변경되면 발생
  // useEffect(()=>{}) : HomePage컴포넌트가 mount, 재렌더링 될때 useEffect안의 코드를 실행시키는 hook이며
  // 기존에는 componentDidMount(),componentDidUpdate(), componentWillUnmount() 를 사용했다. 
  // 기존의 방식은 너무 코드가 길어지기에 모든 기능을 갖춘 useEffect를 사용
  useEffect(() => { 
    // fetchRequest() 가 호출되면 inventory/action을 실행
    // 컴포넌트가 사라질때 코드를 실행하려면 return 을 적으면 됨
    console.log('useEffect Check');
    fetchRequest();
    // 의존성 배열이 존재하지 않으면 
    // 페이지가 렌더링 될 때마다 데이터를 불러온다.
    // 첫번째 전달받은 props 값이 업데이트 되서
    // HomePage 컴포넌트가 리렌더링 되어서 useEffect는 사용됨
    // ㄴ 기본적으로 모든 컴포넌트는 shouldComponentUpdate()가 존재
    // ㄴ state가 변경되어 shouldComponentUpdate()가 실행될 경우 리렌더링이 된다. 
  });
  
  return (
    // 상위 div 박스: Container
    // 하위 div 박스: ProductListItems
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
          console.log('itemCheck',item);
          // 이때 리턴값은 productItem의 item이며 각 이미지,브랜드,이름, 버튼을 리턴해준다.
          return <ProductItem item={item} />; // 실질적으로 사이트에 출력되는 컴포넌트 
        })
        }
      </ProductListItems>
    </Container>
  );
};

// -map- 함수 예시
// const number = [1,2,3,4,5];
// const plusNumber = number.map(plus => plus+5);
// console.log(plusNumber); // [ 6, 7, 8, 9, 10 ]



// mapStateToProps: store로부터 state(inventory)를 가져와 컴포넌트의 props로 보내게 해준다.
// store state(inventory)가 변경될 때 실행된다.
// 변경되면 inventory state를 HomePage 컴포넌트로 가져온다.
// 여기서 homePage 컴포넌트로 전달되는 props는 loading,errors,data
// connect로 연결해서 사용하지 않으려면 select 사용하자
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

// connect : React 구성 요소를 store에 연결(인자값: mapStateToProps, mapDispatchToProps)
// ㄴ 특정 함수 또는 값을 props로 받아온다.
// HomePage : 연동해야 할 컴포넌트
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
