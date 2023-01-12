import React from 'react';
import PropTypes from 'prop-types';
import 'antd/dist/antd.css';

import wrapper from '../store/configureStore.js';

const App = ({Component}) => {
    return (
        <Component />
    );
};

App.prototype = {
    Component: PropTypes.elementType.isRequired,
}
export default wrapper.withRedux(App);
