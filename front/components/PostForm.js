import React, {useCallback, useMemo, useState, useRef, useEffect} from "react";
import {Form, Input, Button} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { addPostRequestAction } from "../reducers/post";
import useInput from "../hooks/useInput";

const PostForm = () => {
    const dispatch = useDispatch();
    const {addPostLoading, addPostDone, imagePaths} = useSelector(state => state.post);
    const { me } = useSelector(state => state.user);
    const [text,onChangeText, setText] = useInput('');
   
    useEffect(() => {
        if (addPostDone){
            setText('');
        }
    }, [addPostDone]) 

    const onSubmit = useCallback(()=>{
        const data = {
                content: text,
                userId : me.id,
                nickname: me.nickname,

        };
        dispatch(addPostRequestAction(data));
    },[text, me]);

    const imageInput = useRef();
    const onClickImgeUpload = useCallback(()=> {
        imageInput.current.click();
    },[imageInput.current]);

    return (
        <Form style = {{ margin : '10px 0 20px'}} encType = 'multipart/form-data' onFinish = {onSubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140}
                placeholder="무슨일을 기록할까요?"
            />
            <div>
                <input type="file" multiple hidden ref = {imageInput}/>
                <Button onClick={onClickImgeUpload}>이미지 업로드</Button>
                <Button type="primary" style={{float: 'right'}} htmlType = 'submit' loading = {addPostLoading}>날리기</Button>
            </div>
        </Form>
    );
};

export default PostForm;
