/** @jsx jsx */

import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css, jsx } from '@emotion/core';

import Share from '../Share/Share';

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

  // We use CSS Grid for this component's layout:
  const dashboardGrid = css`
    display: grid;
    grid-template-columns: 4fr;

    @media (min-width: 600px) {
      grid-template-columns: 2fr 2fr;
    }

    @media (min-width: 960px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  `;

  const shareGridElement = css`
    @media (min-width: 600px) {
      grid-column: span 2;
    }
  `;

  return (
    <div className="bg-white text-black p-3" css={dashboardGrid}>
      <div className="text-center lg:text-left px-3 py-3">
        {firstValue ? (
          <strong className="font-league-gothic font-normal text-4xl leading-none">
            {firstValue}
          </strong>
        ) : null}
        <p className="text-gray-500 font-semibold uppercase">
          {firstDescription}
        </p>
      </div>

      <div className="text-center lg:text-left px-3 py-3 border-solid border-gray-500 md:border-l">
        {secondValue ? (
          <strong className="font-league-gothic font-normal text-4xl leading-none">
            {secondValue}
          </strong>
        ) : null}
        <p className="text-gray-500 font-semibold uppercase">
          {secondDescription}
        </p>
      </div>

      <div
        css={shareGridElement}
        className="md:flex text-left px-3 py-3 border-solid border-gray-500 border-t mt-3 lg:mt-0 lg:border-t-0 lg:border-l"
      >
        <div className="md:flex-1 pr-3 mt-3 md:mt-0">
          {shareHeader ? <h3 className="text-black">{shareHeader}</h3> : null}
          <p>{shareCopy}</p>
        </div>

        <div className="md:flex-1 mt-3 md:mt-0">
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
