import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { ApplicationState } from "../../store";
import { Cart } from "../../store/cart/types";

const NavContainer = styled.div`
  width: 100%;
  height: 0px;
  /* position: fixed; */
  background: black;
  margin: auto;
`;

const NavHeader = styled.div`
  width: 20%;
  float: left;
  padding: 10px;
  background: black;
`;

const NavCart = styled.div`
  width: 20%;
  float: right;
  padding: 10px;
  cursor: pointer;
  background: black;
`;

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

// 
const LoginBtn = styled.button`
  background: white;
  position: absolute;
  top: 50px;
  rigth: 40px;
`
interface PropsFromState {
  data: Cart;
  loading: boolean;
  errors?: string;
}

type AllProps = PropsFromState;

const Navbar: React.FC<AllProps> = ({ data, children }) => {
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
          <LoginBtn><Link to="/GoogleLogin">로그인/로그아웃</Link></LoginBtn>
        </NavCart>
      </NavContainer>
      {children}
    </div>
  );
};

const mapStateToProps = ({ cart }: ApplicationState) => ({
  data: cart.data,
  loading: cart.loading,
  errors: cart.errors
});

const mapDispatchToProps = () => ({});

export default React.memo(connect(mapStateToProps,mapDispatchToProps)(Navbar));
