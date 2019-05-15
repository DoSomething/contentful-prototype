import React from 'react';
import PropTypes from 'prop-types';

import Share from '../Share/Share';

import './campaign-dashboard.scss';

const CampaignDashboard = props => {
  const {
    firstDescription,
    firstValue,
    secondDescription,
    secondValue,
    shareCopy,
    shareHeader,
  } = props;

  return (
    <div className="dashboard text-black p-4">
      <div className="dashboard__segment px-4">
        {firstValue ? (
          <strong className="font-secondary font-normal text-xxl leading-none">
            {firstValue}
          </strong>
        ) : null}
        <p className="text-gray-500 font-semibold uppercase">
          {firstDescription}
        </p>
      </div>

      <div className="dashboard__segment px-4">
        {secondValue ? (
          <strong className="font-secondary font-normal text-xxl leading-none">
            {secondValue}
          </strong>
        ) : null}
        <p className="text-gray-500 font-semibold uppercase">
          {secondDescription}
        </p>
      </div>

      <div className="dashboard__segment dashboard-share px-4">
        <div className="dashboard-share__content">
          {shareHeader ? <strong>{shareHeader}</strong> : null}
          <p>{shareCopy}</p>
        </div>

        <div className="dashboard-share__button">
          <Share variant="black" parentSource="dashboard" />
        </div>
      </div>
    </div>
  );
};

CampaignDashboard.propTypes = {
  firstDescription: PropTypes.string,
  firstValue: PropTypes.string,
  secondDescription: PropTypes.string,
  secondValue: PropTypes.string,
  shareCopy: PropTypes.string,
  shareHeader: PropTypes.string,
};

CampaignDashboard.defaultProps = {
  firstDescription: null,
  firstValue: null,
  secondDescription: null,
  secondValue: null,
  shareCopy: 'Get your friends involved to increase our impact.',
  shareHeader: null,
};

export default CampaignDashboard;
