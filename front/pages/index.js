import React, { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_POSTS_FAILURE, LOAD_POSTS_REQUEST } from '../reducers/post';

const Home = () => {
    const dispatch = useDispatch();
    const { me } = useSelector( state => state.user);
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector( state => state.post);

    useEffect(() => {
        dispatch({
            type: LOAD_POSTS_REQUEST,
        });
    },[])

    useEffect(() => {
        function onScroll (){
            //console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight)

            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if (hasMorePosts && !loadPostsLoading){
                    dispatch({
                        type:LOAD_POSTS_REQUEST,
                    })
                }
            }
        }
        window.addEventListener('scroll',onScroll);
        return () => {
            window.removeEventListener('scroll',onScroll);
        }
    },[hasMorePosts])


    return (
        <AppLayout>
            { me && <PostForm /> }
            { mainPosts.map((post) => <PostCard key={post.key} post={post} />)}
        </AppLayout>
    );
};

export default Home;

