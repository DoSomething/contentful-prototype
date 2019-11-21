import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../../utilities/Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';

import './affiliate-scholarship-block.scss';

const AffiliateScholarshipBlock = ({
  affiliateLogo,
  affiliateTitle,
  className,
  scholarshipAmount,
  scholarshipDeadline,
}) => (
  <Card
    className={classNames(
      'rounded bordered p-3 affiliate-scholarship-block',
      className,
    )}
  >
    {affiliateLogo ? (
      <img
        className="affiliate-logo"
        src={affiliateLogo.url}
        alt={affiliateLogo.description || 'Affiliate logo'}
      />
    ) : null}

    <p className="mt-2 pb-3">
      <strong>
        Welcome to DoSomething.org
        {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
      </strong>{' '}
      Ready to earn scholarships for doing good? Just follow the simple
      instructions below for the chance to win. Let’s Do This!
    </p>

    <div className="scholarship-information">
      {scholarshipAmount ? (
        <div className="scholarship-information__amount">
          <p className="font-bold">AMOUNT</p>
          <p className="scholarship-amount font-league-gothic mt-0">
            ${scholarshipAmount.toLocaleString()}
          </p>
        </div>
      ) : null}

      <div className="scholarship-information__details">
        {scholarshipDeadline ? (
          <div className="scholarship-deadline">
            <p className="font-bold">DEADLINE</p>
            <p className="mt-2">{getHumanFriendlyDate(scholarshipDeadline)}</p>
          </div>
        ) : null}

        <div className="scholarship-requirements">
          <p className="font-bold">REQUIREMENTS</p>
          <ul className="mt-2 list -compacted">
            <li>Under 26 years old</li>
            <li>No minimum GPA</li>
            <li>No essay</li>
          </ul>
        </div>
      </div>
    </div>
  </Card>
);

AffiliateScholarshipBlock.propTypes = {
  affiliateTitle: PropTypes.string,
  affiliateLogo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  className: PropTypes.string,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipDeadline: PropTypes.string.isRequired,
};

AffiliateScholarshipBlock.defaultProps = {
  affiliateTitle: null,
  affiliateLogo: null,
  className: null,
};

export default AffiliateScholarshipBlock;
