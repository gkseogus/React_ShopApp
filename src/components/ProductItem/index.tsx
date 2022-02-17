import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { addToCart } from "../../store/cart/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

// 컨텐츠 박스들의 옵션( background: red; )
const ProductContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 15px;
  cursor: pointer;
  flex: 0 0 25%;
  background: red;
`;

// 컨텐츠 박스안의 사진박스의 옵션( height: 1100px; )
const ProductFigure = styled.figure`
  width: 230px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 컨텐츠 박스안의 사진박스의 사진 옵션( height: 10%;)
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;


// 소파이름 박스 옵션 ( color: pink; )
const ProductHeader = styled.h1`
  height: 76px;
  background: pink;
`;

// Add To cart 버튼과 jason Bourne 텍스트를 포함하는 박스 옵션 ( background: white; )
const ProductDescriptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
`;

// jason bourne 박스 옵션( background: black; )
const ProductBrandText = styled.text`
background: black;
`;

// Add To cart 버튼 옵션 (  background: blue )
const AddToCart = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
`;

interface propsFromComponent {
  item: any; // Inventory;
  addToCart: (item: any) => any;
}

type Props = propsFromComponent;

const ProductItem: React.FC<Props> = ({ item, addToCart }) => {
  const AddItemToCart = (item: any) => {
    addToCart(item);
  };

  return (
    <ProductContainer>
      <ProductFigure>
        <ProductImage src={item.image} /> {/*src={`data/jpeg;base64,${data}`}*/}
      </ProductFigure>
      <ProductHeader>{item.name}</ProductHeader>
      <ProductDescriptionDiv>
        <ProductBrandText>{item.brand}</ProductBrandText>
        <AddToCart onClick={() => AddItemToCart(item)}>Add To Cart</AddToCart>
      </ProductDescriptionDiv>
    </ProductContainer>
  );
};

const mapStateToProps = ( ) => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addToCart: (item: any) => dispatch(addToCart(item))
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);
