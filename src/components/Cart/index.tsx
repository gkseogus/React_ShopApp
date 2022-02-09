import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { removeToCart } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
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

const RemoveCart = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
`;


// cart 소파이름 옵션 ( color: purple; )
const CartListItemName = styled.p`
`;

// cart 소파가격 옵션 ( color: purple; )
const CartListItemPrice = styled.p`
`;

interface propsFromState {
  cartItems: Cart;
  removeToCart: (cartItems: any) => any;
}

type AllProps = propsFromState;

const CartComponent: React.FC<AllProps> = ({ cartItems, removeToCart }) => {
  // console.log("cartItems", cartItems);
  const RemoveItemToCart = (cartItems: any) => {
    removeToCart(cartItems);
  };

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
              <RemoveCart onClick={() => RemoveItemToCart(cartItems)}>Remove To item</RemoveCart>
            </CartListItemDiv>
          );
        })}
      </CartListsDiv>
    </CartContainer>
  );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
  cartItems: cart.data
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    removeToCart: (cartItems: any) => dispatch(removeToCart(cartItems))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartComponent);
