import React, { Component } from 'react';
import { GoogleLogin,GoogleLogout } from 'react-google-login';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    position: absolute;
    top: 0px; left: 50%;
`

  
// OAuth 클라이언트 id
const clientId = "468304921430-6juo28nrclm5l6jtieca5koopgkt01r6.apps.googleusercontent.com"
class Googlebutton extends Component {

    constructor(props: any) {
        super(props);
        this.state = {
            id: '',
            name: '',
            provider: '',
        }
    }
    // Google Login
    responseGoogle = (res: any) => {
        window.localStorage.setItem("user_id", res.googleId);
        window.localStorage.setItem("user_email", res.Ju.sf);
        window.localStorage.setItem("user_name", res.Ju.zv);

        console.log("login state:", window.localStorage)
        console.log('response', res)
        console.log("user google id:",res.googleId)
        console.log("user name:",res.Ju.sf)
        console.log("user email:",res.Ju.zv)
    }

    // Login Fail
    responseFail = (err: void) => {
        console.error('error', err);
    }

    // localStorage의 데이터 삭제
    logout = () => {
        window.localStorage.removeItem("user_id");
        window.localStorage.removeItem("user_email");
        window.localStorage.removeItem("user_name");
                
        console.log("logout state:", window.localStorage)
    }

    render() {
        return (
            <Container>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Sign in with google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                /> 
                <GoogleLogout
                    clientId={clientId}
                    buttonText="Logout"
                    onLogoutSuccess={this.logout}
                />
            </Container>
        );
    }
}

export default Googlebutton;