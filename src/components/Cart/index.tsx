import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { AnyAction } from "redux";
import { removeAllToCart, removeItem } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";

const CartContainer = styled.div`
  /* height: 100%;
  width: 100%; */ 
  padding: 100px;
  background: red;
`;

const CartHeader = styled.h2``;
const CartHeaderDiv = styled.div`
  height: 100%;
  width: 100%;
  color: blue;
`;

const CartListsDiv = styled.div`
  height: 100%;
  width: 100%;
  background: green;
`;

const CartListItemDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: orange;
`;

const CartListItemImage = styled.img`
  width: 100px;
  height: 100px;
`;

const RemoveALLCart = styled.button`
  padding: 20px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
`;

const RemoveCart = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
`;

const CartListItemName = styled.p`
`;

const CartListItemPrice = styled.p`
`;

interface propsFromState {
  cartItems: Cart;
  removeAllToCart: (cartItems: any) => any;
  removeItem: (cartItem: any) => any;
}

type AllProps = propsFromState;

const CartComponent: React.FC<AllProps> = ({ cartItems, removeAllToCart, removeItem }) => {
  
  // 모든 아이템 삭제 함수
  const RemoveAllItemToCart = (cartItems: any) => {
    removeAllToCart(cartItems);
  };

  // 개별 아이템 삭제 함수 (RemoveCart에서 받은 item === cartItem)
  const RemoveItem = (cartItem: any) => {
    removeItem(cartItem);
  };

  return (
    <CartContainer>
      <CartHeaderDiv>
        <CartHeader>Your Cart</CartHeader>
        <RemoveALLCart onClick={() => RemoveAllItemToCart(cartItems)}>Remove ALL To item</RemoveALLCart>
      </CartHeaderDiv>
      <CartListsDiv>
        {cartItems.items.map(item => {
          return (
            <CartListItemDiv>
              <CartListItemImage src={item.image} />
              <CartListItemName>{item.name}</CartListItemName>
              <CartListItemPrice>{item.price}</CartListItemPrice>
              <RemoveCart onClick={() => RemoveItem(item)}>Remove To item</RemoveCart>
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
    removeAllToCart: (cartItems: any) => dispatch(removeAllToCart(cartItems)),
    removeItem: (cartItem: any) => dispatch(removeItem(cartItem))
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(CartComponent));