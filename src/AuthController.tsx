import React, { useCallback, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from './store';
import { fetchRequest } from './store/inventory/action';
import { Inventory } from './store/inventory/types';

interface PropsFromState {
  loading: boolean;
  data: Inventory[];
  errors?: string;
}

interface PropsFromDispatch {
  fetchRequest: (data: Inventory[]) => any;
}

type AllProps = PropsFromState & PropsFromDispatch;

/**
 * 전체적으로 index.html 에 작성되어 있는 코드를 컴포넌트 화 시킴 (https://developers.google.com/sheets/api/quickstart/js)
 * ㄴ redux 스토어에 전달하기 위함 -> 리액트 컴포넌트 내에서 api를 요청해야 된다.
 * @returns
 */
export function AuthController({ fetchRequest }: AllProps) {
  // 구글 로그인 여부 상태 값
  const [isSignedIn, setIsSignedIn] = useState(false);

  // 구글 로그인 상태가 변경되었을 때 호출되는 함수
  const updateSigninStatus = useCallback((isSignedIn: boolean) => {
    // 로그인 여부 상태값 업데이트
    setIsSignedIn(isSignedIn);

    if (isSignedIn) {
      // 로그인 성공시 스프레트 시트를 불러옴
      window.gapi.client.sheets.spreadsheets.values
        .get({
          spreadsheetId: '1nJfe_UGs3KmVkBu9hIDAbi9rA0gnPp4gb8SUjteZplg',
          range: 'A2:G16',
        })
        .then((response: any) => {
          // 불러온 스프레트 시트를 Inventory interface에 맞게 파싱하고 redux store에 전달
          fetchRequest(
            response.result.values.map((row: string[]) => ({
              name: row[0],
              currentInventory: parseInt(row[5]),
              description: row[3],
              image: row[2],
              price: parseInt(row[1]),
              id: row[6],
              brand: row[4],
            }))
          );
        });
    } else {
      // 로그아웃시 redux store에서 값 clear
      fetchRequest([]);
    }
  }, []);

  // AuthController 컴포넌트가 처음 렌더링 될 때 (마운트 될 때) 호출됨.
  useEffect(() => {
    // 구글 auth 모듈 initialize
    window.gapi.load('client:auth2', async () => {
      try {
        await window.gapi.client.init({
          apiKey: API_KEY,
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        });
        // Listen for sign-in state changes.
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(
          window.gapi.auth2.getAuthInstance().isSignedIn.get()
        );
      } catch (error) {
        alert(error);
      }
    });
  }, []);

  // 로그인 여부 상태값에 따라 Authorize / Sign Out 버튼 렌더링
  return (
    <>
      {isSignedIn ? (
        <button id="signout_button" onClick={handleSignoutClick}>
          Sign Out
        </button>
      ) : (
        <button id="authorize_button" onClick={handleAuthClick}>
          Authorize
        </button>
      )}
    </>
  );
}

// javascript 로 로드되어있는 구글 api를 사용하기 위해 타입 정의
declare const window: Window & {
  gapi: any;
};

// Client ID and API key from the Developer Console
var CLIENT_ID =
  '468304921430-6juo28nrclm5l6jtieca5koopgkt01r6.apps.googleusercontent.com';
var API_KEY = 'AIzaSyAZgIPp58hO1P6Fps43ADOHuYrHwS9GITg';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = [
  'https://sheets.googleapis.com/$discovery/rest?version=v4',
];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// Sign in the user upon button click.
function handleAuthClick() {
  window.gapi.auth2.getAuthInstance().signIn();
}

// Sign out the user upon button click.
function handleSignoutClick() {
  window.gapi.auth2.getAuthInstance().signOut();
}

const mapStateToProps = ({ inventory }: ApplicationState) => ({
  loading: inventory.loading,
  errors: inventory.errors,
  data: inventory.data,
});

// 기존 homePage에 있던 상태값 받아오는 코드
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    fetchRequest: (apiData: any) => {
      dispatch(fetchRequest(apiData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthController);
