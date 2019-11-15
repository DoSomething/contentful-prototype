import React from 'react';
import PropTypes from 'prop-types';

import checkmark from './checkmark.svg';
import rejectedIcon from './rejectedIcon.svg';
import pendingIcon from './pendingIcon.svg';

import './voter-reg.scss';

const VoterRegStatusBlock = ({ status }) => {
  if (status === 'PENDING') {
    return (
      <div className="voter-reg -yellow display-flex flex-align-center">
        <img className="post-badge icon-clock" src={pendingIcon} alt="hello" />
        <div className="ml-3">Your voter reg status is pending!</div>
      </div>
    );
  }

  if (
    status === 'CONFIRMED' ||
    status === 'REGISTER_FORM' ||
    status === 'REGISTER_OVR'
  ) {
    return (
      <div className="voter-reg -green display-flex flex-align-center">
        <img className="post-badge icon-check" src={checkmark} alt="hello" />
        <div className="ml-3">Your voter reg status is confirmed! Woo!</div>
      </div>
    );
  }

  return (
    <div className="voter-reg -red display-flex flex-align-center">
      <img className="post-badge icon-x" src={rejectedIcon} alt="hello" />
      <div className="ml-3">
        We don&#39;t have your voter registration. Register here!
      </div>
    </div>
  );
};

VoterRegStatusBlock.propTypes = {
  status: PropTypes.string.isRequired,
};

export default VoterRegStatusBlock;
