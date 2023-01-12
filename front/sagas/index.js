import { all, fork, take, call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import postSaga from './post';
import userSaga from './user';

export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga)
    ])
}

