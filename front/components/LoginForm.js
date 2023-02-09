import { Input, Button, Form } from 'antd';
import Password from 'antd/lib/input/Password';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
    margin-top : 10px;
`
const FormWrapper = styled(Form)`
    padding: 10px;
`

const LoginForm = () => {
    const dispatch = useDispatch();
    const [email, onChangeEmail] = useInput('');
    const [pw, onChangePw] = useInput('');
    const { logInLoading } = useSelector(state => state.user);

    const onSubmitForm = useCallback(() => {
        console.log(email, pw);
        dispatch(loginRequestAction({email,pw}));
    },[email, pw])
    return (
        <FormWrapper onFinish = { onSubmitForm }>
            <div>
                <label htmlFor = 'user-email'>아이디</label>
                <br />
                <Input name = 'user-email' type = "email" value = {email} onChange = {onChangeEmail} required />
            </div>
            <div>
                <label htmlFor = 'user-pw'>비밀번호</label>
                <br/>
                <Input name = 'user-pw'
                type = 'password'
                value = {pw}
                onChange = {onChangePw}
                required />
            </div>
            <ButtonWrapper>
                <Button type = 'primary' htmlType = 'submit' loading = {logInLoading}>로그인</Button>
                <Link href = "/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWrapper>
        </FormWrapper>
    );
};

export default LoginForm;
