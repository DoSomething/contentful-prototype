import React from 'react';
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import Portal from '../components/Portal'

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    reportbacks: state.reportbacks,
    submissions: state.submissions,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    // ...
  }
};

const ActivityFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Portal);

export default ActivityFeed;
