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
   console.log('homePageData:',data);
  useEffect(() => { 
    console.log('useEffect Check');
    fetchRequest();
  }, [fetchRequest]);
  
  // newData가 false면 상품을 안 보여줌
  const [newData, setnewData] = useState(true);

  const resultData = () => {
    setnewData(true)
  }

  const removeData = () => {
    setnewData(false)
  }
  const handleSubmit = (event:any) => {
    event.preventDefault();
  }

  return (
    <Container>
      <ProductListItems>
        <form onSubmit={handleSubmit}>
          <input type='inputText' name='inputText'  />
          <button onClick={resultData}>전체 상품출력</button>
          <button onClick={removeData}>전체 상품삭제</button>
        {
          data.map(item => {
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
