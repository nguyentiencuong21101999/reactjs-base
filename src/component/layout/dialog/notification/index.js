/**
 * Created By Nguyen Cong Thanh on 07/25/2020 16:37.
 *
 * Copyright svtech 2020.
 */

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import NotificationComponent from './component'

const mapStateToProps = (allReducer) => {
    return {
        allReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NotificationComponent))