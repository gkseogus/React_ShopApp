import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";

import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";


// cart 안의 styled.div 박스 설정
const CartContainer = styled.div`
  /* height: 100%;
  width: 100%; */ 
  padding: 100px;
  background: red;
`;

// your Cart  ( color: blue; ) 
const CartHeader = styled.h2``;
const CartHeaderDiv = styled.div`
  height: 100%;
  width: 100%;
  color: blue;
`;


// cart list의 styled.div 박스 설정 (  background: green; )
const CartListsDiv = styled.div`
  height: 100%;
  width: 100%;
  background: green;
`;

// cart list 글씨설정 ( color: orange;)
const CartListItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: orange;
`;

// cart img 옵션 ( height: 1000px )
const CartListItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

// cart 소파이름 옵션 ( color: purple; )
const CartListItemName = styled.p`
`;

// cart 소파가격 옵션 ( color: purple; )
const CartListItemPrice = styled.p`
`;

// cartItems는 Cart 타입으로 정의해라 
interface propsFromState {
  cartItems: Cart;
}

// AllProps는 인터페이스를 갖음
type AllProps = propsFromState;

// cartItems 데이터를 배열 형태로 받아옴
const CartComponent: React.FC<AllProps> = ({ cartItems }) => {
  console.log("cartItems", cartItems);
  return (
    <CartContainer>
      <CartHeaderDiv>
        <CartHeader>Your Cart</CartHeader>
      </CartHeaderDiv>
      <CartListsDiv>
        {cartItems.items.map(item => {
          return (
            <CartListItemDiv>
              <CartListItemImage src={item.image} />
              <CartListItemName>{item.name}</CartListItemName>
              <CartListItemPrice>{item.price}</CartListItemPrice>
            </CartListItemDiv>
          );
        })}
      </CartListsDiv>
    </CartContainer>
  );
};

// cart 란 상태를 저장
const mapStateToProps = ({ cart }: ApplicationState) => ({
  cartItems: cart.data
});

// 데이터를 받아오기만 하므로 액션요청x
const mapDispatchProps = () => {};

// connect : React 구성 요소를 Redux 저장소에 연결
// CartComponent : 연동해야 할 컴포넌트
export default connect(mapStateToProps, mapDispatchProps)(CartComponent);
