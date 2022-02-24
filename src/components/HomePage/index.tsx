import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import ProductItem from "../ProductItem";
import { ApplicationState } from "../../store";
import { Inventory, InventoryCreate } from "../../store/inventory/types";
import { fetchRequest, createItem } from "../../store/inventory/action";
import { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";
import CreateItem from './CreateItem';

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


interface PropsFromDispatch {
  fetchRequest: (data: InventoryCreate) => any;
  createItem: (data: InventoryCreate) => void;
}

type AllProps = PropsFromState & PropsFromDispatch;

const HomePage: React.FC<AllProps> = ({ data, fetchRequest, createItem }) => {
  //  console.log('homePageData:',data);
  // form에 받는 문자타입을 하나의 상태로 보관
  const [searchKeyword, setSearchKeyword] = useState('')

  // newData가 false면 상품을 안 보여줌
  const [newData, setNewData] = useState(true);

  const resultData = () => {
    setNewData(true)
  }

  const removeData = () => {
    setNewData(false)
  }

  const handleSubmit = async (event: any) => {
    // form이 실행됨과 동시에 초기화면으로 돌아오는 것(새로고침과 유사)을 막음
    event.preventDefault();
  }

  const getData = async () => {
    try {
      // fetch로 해당 API를 호출하고 응답 데이터를 받아옴(비동기 요청)
      // default로 GET 메소드를 사용
      // await를 통해 비동기 작업의 결과값을 얻을 때까지 기다려준다. -> 동기식
      const res: Response = await fetch(
        // "https://sheets.googleapis.com/v4/spreadsheets/1nJfe_UGs3KmVkBu9hIDAbi9rA0gnPp4gb8SUjteZplg/values/A2%3AG16?majorDimension=ROWS&valueRenderOption=FORMULA&key=AIzaSyAZgIPp58hO1P6Fps43ADOHuYrHwS9GITg"
        'https://api.apispreadsheets.com/data/IH9wmldYiWEcOIY8/'
      );
      // API를 호출한 후 응답 객체를 받으며 .json() 메서드로 파싱한 json값을 리턴
      const apiData = await res.json();
      console.log(apiData);
      console.log('parsing is json (get)', apiData.data);
      // 받아온 apiData의 data를 fetchRequest에 보냄
      fetchRequest(apiData.data)
    } catch (err) {
      console.log('error:', err);
    }
  }

  // 의존성배열
  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <ProductListItems>
        <form onSubmit={handleSubmit}>
          {/* 타이핑이 되는 문자에 따라 setSearchKeyword로 통해 searchKeyword 값을 e.target.value로 갱신 */}
          <input value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} type='inputText' name='inputText' />
          <button onClick={resultData}>전체 상품출력</button>
          <button onClick={removeData}>전체 상품삭제</button>
        </form>
        <CreateItem onCreate={createItem} />
        {
          // item.name.toLowerCase() -> 검색 대상인 값 
          // searchKeyword.toLowerCase() -> 검색할 값
          data.filter((item: any) => item.name.toString().toLowerCase().includes(searchKeyword.toLowerCase())).map((item, index) => {
            if (newData === true) {
              return <ProductItem key={index} item={item} />; // 실질적으로 사이트에 출력되는 컴포넌트 
            }
            return newData
          })
        }
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
    fetchRequest: (apiData: any) => {
      dispatch(fetchRequest(apiData));
    },
    createItem: (data: any) => {
      dispatch(createItem(data));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
