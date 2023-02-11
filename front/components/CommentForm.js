import { Form, Input, Button } from 'antd';
import React, { useCallback, useEffect } from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({ post }) => {
  const { me } = useSelector((state) => state.user);
  const { addCommentDone, addCommentLoading } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput('');

  useEffect(() => {
    if (addCommentDone) {
      setCommentText('');
    }
  }, [addCommentDone]);

  const onSubmitComment = useCallback(() => {
    console.log(post.id, commentText);

    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: {
        content: commentText,
        postId: post.id,
        userId: me.id,
        nickname: me.nickname,
      },
    });
  }, [commentText, me]);
  return (
    <Form onFinish={onSubmitComment}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button
          style={{ position: 'absolute', right: 0, bottom: -40 }}
          type="primary"
          loading={addCommentLoading}
          htmlType="submit"
        >
          입력
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
