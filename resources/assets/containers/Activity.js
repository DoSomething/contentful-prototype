import React from 'react';
import { connect } from 'react-redux'
import { createdBlocks, toggleTodo } from '../actions';
import CampaignFeed from '../components/CampaignFeed'

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    reportbacks: state.reportbacks,
    submissions: state.submissions,
    blocks: state.blocks,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createdBlocks: (blocks) => {
      dispatch(createdBlocks(blocks));
    },
  }
};

const Activity = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignFeed);

export default Activity;
