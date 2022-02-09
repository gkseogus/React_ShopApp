import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Inventory } from "../../store/inventory/types";
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

// item는 Inventory 타입으로 정의해라
interface propsFromComponent {
  item: Inventory;
}

interface propsFromDispatch1 {
  addToCart: (item: any) => any;
}

// Props는 인터페이스(두개)를 갖음
type Props = propsFromComponent & propsFromDispatch1;

const ProductItem: React.FC<Props> = ({ item, addToCart }) => {
  const AddItemToCart = (item: any) => {
    addToCart(item);
  };

  return (
    <ProductContainer>
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

const mapStateToProps = ( ) => ({});

// 컴포넌트에서 store에 state 수정 요청
// dispatch내장함수를 통해 리듀서에게 action을 발생시키라고 명령
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    // addToCart 데이터를 바탕으로 수정요청
    // 여기서 액션은 addToCart(item)
    addToCart: (item: any) => dispatch(addToCart(item))
  };
};

// connect : React 구성 요소를 Redux 저장소에 연결
// 이때 해당하는 컴포넌트를 Redux랑 연결시켜준다.
// 이러한 이유는 리덕스 store에는 데이터가 보관되어있고
// 이 데이터에 접근하거나 컴포넌트 수정을 요청할 때 사용한다.
// ProductItem : 연동해야 할 컴포넌트
export default connect(mapStateToProps,mapDispatchToProps)(ProductItem);
