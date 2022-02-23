import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { ApplicationState } from "../../store";
// import { Inventory } from "../../store/inventory/types";
import { Cart } from "../../store/cart/types";

// 네비게이션 바 옵션
const NavContainer = styled.div`
  width: 100%;
  height: 0px;
  /* position: fixed; */
  background: #e7e8eb;
  margin: auto;
`;

// Ecart 박스 옵션 ( background: aqua; ) 
const NavHeader = styled.div`
  width: 20%;
  float: left;
  padding: 10px;
  background: aqua;
`;

//cart 박스 옵션 ( background: blue; )
const NavCart = styled.div`
  width: 20%;
  float: right;
  padding: 10px;
  cursor: pointer;
  background: blue;
`;


//  cart 옆 동그라미숫자(span) 옵션  ( background: red; )
const CartSpan = styled.span`
  background-color: #6394f8;
  border-radius: 10px;
  color: white;
  background: red; 
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
`;

interface PropsFromState {
  data: Cart;
  loading: boolean;
  errors?: string;
}

type AllProps = PropsFromState;

// children을 통해 컴포넌트 태그의 자식 컴포넌트 혹은 태그로 들어오는 값을 받을수 있다.
const Navbar: React.FC<AllProps> = ({ 
  data, 
  children }) => {
    // console.log('navBarData',data)
  return (
    <div>
      <NavContainer>
        <NavHeader>
          <Link to="/">ECart</Link>
        </NavHeader>
        <NavCart>
          <Link to="/cart">
            Cart <CartSpan>{data.items.length}</CartSpan>
          </Link>
        </NavCart>
      </NavContainer>
      {children}
      {/* {console.log('navBarchildren:',children)} */}
    </div>
  );
};

// mapStateToProps: store로부터 state(cart)를 가져와 컴포넌트의 props로 보내게 해준다.
// store state(cart)가 변경될 때 실행된다.
// 변경되면 cart state를 Navbar 컴포넌트로 가져온다.
// 여기서 Navbar 컴포넌트로 전달되는 props는 loading,errors,data
const mapStateToProps = ({ cart }: ApplicationState) => ({
  data: cart.data,
  loading: cart.loading,
  errors: cart.errors
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps,mapDispatchToProps)(Navbar);
