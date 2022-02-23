import React, { Component } from 'react';
import { GoogleLogin } from 'react-google-login';
import styled from 'styled-components';

// OAuth 클라이언트 id
const clientId = "468304921430-6juo28nrclm5l6jtieca5koopgkt01r6.apps.googleusercontent.com"

const Container = styled.div`
    display: flex;
    flex-flow: column wrap;
    position: absolute;
    top: 0px; left: 50%;
`

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
        console.log('response', res)
    }

    // Login Fail
    responseFail = (err: void) => {
        console.error('error', err);
    }

    render() {
        return (
            <Container>
                <GoogleLogin
                    clientId={clientId}
                    buttonText="Google login"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseFail}
                />
            </Container>
        );
    }
}

export default Googlebutton;