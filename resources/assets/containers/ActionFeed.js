import React from 'react';
import { connect } from 'react-redux'
import { toggleTodo } from '../actions'
import Feed from '../components/Feed'

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    reportbacks: state.reportbacks,
    submission: state.submission,
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
)(Feed);

export default ActivityFeed;
