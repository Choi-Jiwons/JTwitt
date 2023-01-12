import React from 'react';
import AppLayout from '../components/AppLayout';
import NicknameEditForm from '../components/NicknameEditForm';
import FollowerList from '../components/FollowerList';
import { useSelector } from 'react-redux';

const profile = () => {
   const { me } = useSelector(state => state.user);
    return (
        <>
            <AppLayout>
                <NicknameEditForm />
                <FollowerList header = "팔로잉 목록" data = {me.Followings}/>
                <FollowerList header = "팔로워 목록" data = {me.Followers}/>
            </AppLayout>
        </>
    );
};

export default profile;