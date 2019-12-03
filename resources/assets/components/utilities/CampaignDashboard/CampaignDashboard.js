import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import Share from '../Share/Share';

import './campaign-dashboard.scss';

export const CampaignDashboardFragment = gql`
  fragment CampaignDashboardFragment on CampaignDashboard {
    firstDescription
    firstValue
    secondDescription
    secondValue
    shareCopy
    shareHeader
  }
`;

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
    <div className="dashboard text-black p-3">
      <div className="dashboard__segment px-3">
        {firstValue ? (
          <strong className="font-league-gothic font-normal text-4xl leading-none">
            {firstValue}
          </strong>
        ) : null}
        <p className="text-gray-500 font-semibold uppercase">
          {firstDescription}
        </p>
      </div>

      <div className="dashboard__segment px-3">
        {secondValue ? (
          <strong className="font-league-gothic font-normal text-4xl leading-none">
            {secondValue}
          </strong>
        ) : null}
        <p className="text-gray-500 font-semibold uppercase">
          {secondDescription}
        </p>
      </div>

      <div className="dashboard__segment dashboard-share px-3">
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
  shareCopy: null,
  shareHeader: null,
};

export default CampaignDashboard;
