import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import ProductItem from '../ProductItem';
import { ApplicationState } from '../../store';
import { Inventory, InventoryCreate } from '../../store/inventory/types';
import { createItem } from '../../store/inventory/action';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import CreateItem from '../CreateItem';

const Container = styled.div`
  width: 100%;
  max-width: 1170px;
  margin: auto;
  background: white;
`;

const ProductListItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  color: black;
`;

interface PropsFromState {
  loading: boolean;
  data: Inventory[];
  errors?: string;
}

interface PropsFromDispatch {
  createItem: (data: InventoryCreate) => void;
}

type AllProps = PropsFromState & PropsFromDispatch;

const HomePage: React.FC<AllProps> = ({ data, createItem }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [newData, setNewData] = useState(true);

  const resultData = () => {
    setNewData(true);
  };

  const removeData = () => {
    setNewData(false);
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
  };

  return (
    <Container>
      <ProductListItems>
        <form onSubmit={handleSubmit}>
          {/* 타이핑이 되는 문자에 따라 setSearchKeyword로 통해 searchKeyword 값을 e.target.value로 갱신 */}
          <input
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            type="inputText"
            name="inputText"
          />
          <button onClick={resultData}>전체 상품출력</button>
          <button onClick={removeData}>전체 상품삭제</button>
        </form>
        <CreateItem onCreate={createItem} />
        {
          // item.name.toLowerCase() -> 검색 대상인 값
          // searchKeyword.toLowerCase() -> 검색할 값
          data
            .filter((item: any) =>
              item.name
                .toString()
                .toLowerCase()
                .includes(searchKeyword.toLowerCase())
            )
            .map((item, index) => {
              if (newData === true) {
                return <ProductItem key={index} item={item} />; 
              }
              return newData;
            })
        }
      </ProductListItems>
    </Container>
  );
};

const mapStateToProps = ({ inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    createItem: (data: any) => {
      dispatch(createItem(data));
    },
  };
};

export default React.memo(connect(mapStateToProps, mapDispatchToProps)(HomePage));
