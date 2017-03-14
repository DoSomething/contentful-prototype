import React from 'react';
import { connect } from 'react-redux';
import {
  clickedViewMore,
  clickedSignUp,
  checkForSignup,
  setCurrentlySignedUp,
} from '../actions';
import CampaignFeed from '../components/CampaignFeed';

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    reportbacks: state.reportbacks,
    submissions: state.submissions,
    blocks: state.blocks,
    user: state.user,
    signups: state.signups,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    clickedViewMore: () => {
      dispatch(clickedViewMore());
    },

    clickedSignUp: (campaignId) => {
      dispatch(clickedSignUp(campaignId));
    },

    checkForSignup: (campaignId) => {
      dispatch(checkForSignup(campaignId));
    },

    setCurrentlySignedUp: (status) => {
      dispatch(setCurrentlySignedUp(status));
    },
  }
};

const Activity = connect(
  mapStateToProps,
  mapDispatchToProps
)(CampaignFeed);

export default Activity;
