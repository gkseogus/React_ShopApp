import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ProductItem from "../ProductItem";
import { ApplicationState } from "../../store";
import { Inventory } from "../../store/inventory/types";
import { fetchRequest } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

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
  //  console.log('homePageData:',data);
  useEffect(() => { 
    console.log('useEffect Check');
    fetchRequest();
  }, [fetchRequest]);
  
  // newData가 false면 상품을 안 보여줌
  const [newData, setNewData] = useState(true);

  // form에 받는 문자타입을 하나의 상태로 보관
  const [searchKeyword, setSearchKeyword] = useState('') 

  const resultData = () => {
    setNewData(true)
  }

  const removeData = () => {
    setNewData(false)
  }

  // form이 실행됨과 동시에 초기화면으로 돌아오는 것(새로고침과 유사)을 막음
  const handleSubmit = (event:any) => {
    event.preventDefault();
  }

  return (
    <Container>
      <ProductListItems>
        <form onSubmit={handleSubmit}>
          {/* 타이핑이 되는 문자에 따라 setSearchKeyword로 통해 searchKeyword 값을 e.target.value로 갱신 */}
          <input value={searchKeyword}  onChange={e => setSearchKeyword(e.target.value)} type='inputText' name='inputText'  />
          <button onClick={resultData}>전체 상품출력</button>
          <button onClick={removeData}>전체 상품삭제</button>
        {
          // input에서 타이핑할때마다 searchKeyword의 값이 바뀌고 이 값을 기준으로 data에서 filter해준다.
          // toLowerCase: 데이터에 대소문자가 섞여 있기에 문자열 모두 소문자로 변환
             // 갱신된 searchKeyword 값안에 대문자가 있으면 소문자로 변경
          // includes를 통해 검색 대상인 값에 검색할 값이 있는지 확인
             // item.name.toLowerCase() -> 검색 대상인 값 
             // searchKeyword.toLowerCase() -> 검색할 값
          data.filter(item => item.name.toLowerCase().includes(searchKeyword.toLowerCase())).map(item => {
          if(newData === true){
              return <ProductItem item={item} />; // 실질적으로 사이트에 출력되는 컴포넌트 
          }
          return newData
        })
        } 
        </form>
      </ProductListItems>
    </Container>
  );
};


const mapStateToProps = ({ inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data
});


const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchRequest: () => {
      dispatch(fetchRequest());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
