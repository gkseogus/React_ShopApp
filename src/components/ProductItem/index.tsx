import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../../store/cart/action';
import { deleteItem } from '../../store/inventory/action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';

const ProductContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 15px;
  cursor: pointer;
  flex: 0 0 25%;
  background: white;
`;

const ProductFigure = styled.figure`
  width: 230px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

const ProductHeader = styled.h1`
  height: 76px;
  background: bisque;
  border-radius: 10px;
`;

const ProductDescriptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
`;

const ProductBrandText = styled.text`
  background: bisque;
  border-radius: 10px;
`;

const AddToCart = styled.button`
  padding: 10px;
  background-color: black;
  color: white;
  border-radius: 10px;
`;

const ProductDelete = styled.button`
  padding: 5px;
  background-color: black;
  color: #ffffff;
  border-radius: 5px;
`;

interface PropsFromComponent {
  item: any; // Inventory;
  addToCart: (item: any) => any;
}

type Props = PropsFromComponent;

const ProductItem: React.FC<Props> = ({ item, addToCart }) => {
  const dispatch = useDispatch();

  // Cart Item 추가 함수
  const AddItemToCart = (item: any) => {
    addToCart(item);
  };

  // Item delet 함수
  const deleteData = async () => {
    try {
      const res = await fetch(
        `https://api.apispreadsheets.com/data/F73K7GKP3Yawx76T/?query=deletefromF73K7GKP3Yawx76Twherename='${item.name}'`
        );
      console.log('parsing is json (delete)', res);
      dispatch(deleteItem(item));
    } catch (err) {
      console.log('error:', err);
    }
  };

  return (
    <ProductContainer>
      <ProductDelete onClick={() => deleteData()}>x</ProductDelete>
      <ProductFigure>
        <ProductImage src={item.image} />
      </ProductFigure>
      <ProductHeader>{item.name}</ProductHeader>
      <ProductDescriptionDiv>
        <ProductBrandText>{item.brand}</ProductBrandText>
        <AddToCart onClick={() => AddItemToCart(item)}>Add To Cart</AddToCart>
      </ProductDescriptionDiv>
    </ProductContainer>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addToCart: (item: any) => {dispatch(addToCart(item));
    }
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(ProductItem));
