import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { addToCart } from '../../store/cart/action';
import { deleteItem } from '../../store/inventory/action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import axios from 'axios';
import { useDispatch } from 'react-redux';

// 컨텐츠 박스들의 스타일( background: red; )
const ProductContainer = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  padding: 10px;
  margin: 15px;
  cursor: pointer;
  flex: 0 0 25%;
  background: red;
`;

// 컨텐츠 박스안의 사진박스의 스타일( height: 1100px; )
const ProductFigure = styled.figure`
  width: 230px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// 컨텐츠 박스안의 사진박스의 사진 스타일( height: 10%;)
const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`;

// 소파이름 박스 스타일 ( color: pink; )
const ProductHeader = styled.h1`
  height: 76px;
  background: pink;
`;

// Add To cart 버튼과 jason Bourne 텍스트를 포함하는 박스 스타일 ( background: white; )
const ProductDescriptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  background: white;
`;

// jason bourne 박스 스타일( background: black; )
const ProductBrandText = styled.text`
  background: black;
`;

// Add To cart 버튼 스타일 (  background: blue )
const AddToCart = styled.button`
  padding: 10px;
  background-color: blue;
  color: #ffffff;
  border-radius: 10px;
`;

// x 버튼 스타일
const ProductDelete = styled.button`
  padding: 5px;
  background-color: black;
  color: #ffffff;
  border-radius: 5px;
`;

interface propsFromComponent {
  item: any; // Inventory;
  addToCart: (item: any) => any;
}

type Props = propsFromComponent;

const ProductItem: React.FC<Props> = ({ item, addToCart }) => {
  // Cart Item 추가 함수
  const AddItemToCart = (item: any) => {
    addToCart(item);
  };

  // Redux 저장소에서 함수에 대한 참조를 반환
  const dispatch = useDispatch();

  // Item delet 함수
  const deleteData = async () => {
    try {
      const res = await axios.get(
        // deletefrom 을 사용해 해당 아이템 삭제
        `https://api.apispreadsheets.com/data/GKuNvTIfiVrTemcP/?query=deletefrom2Qd5MDqxG1IKMAwcwherename="${item.name}"`);
      console.log('parsing is json (delete)', res);
      // useDispatch로 deleteItem을 액션에서 실행
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
    },
    deleteItem: (item: any) => {dispatch(deleteItem(item));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductItem);
