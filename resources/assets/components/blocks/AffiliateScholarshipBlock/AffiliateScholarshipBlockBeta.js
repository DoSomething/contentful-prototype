import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../../utilities/Card/Card';

import './affiliate-scholarship-block.scss';

const AffiliateScholarshipBlockBeta = ({
  actionType,
  affiliateLogo,
  affiliateTitle,
  className,
  scholarshipAmount,
  scholarshipDeadline,
}) => (
  <Card
    className={classNames('rounded bordered padded campaign-info', className)}
  >
    {affiliateLogo ? (
      <img
        className="affiliate-logo"
        src={affiliateLogo.url}
        alt={affiliateLogo.description || 'Affiliate logo'}
      />
    ) : null}
    <p className="pt-8 pb-4">
      <strong>
        Welcome to DoSomething.org
        {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
      </strong>{' '}
      Ready to earn scholarships for doing good? Just follow the simple
      instructions below for the chance to win. Let’s Do This!
    </p>
    <dl className="clearfix campaign-info__scholarship-beta">
      {scholarshipAmount ? (
        <>
          <dt className="campaign-info__scholarship-beta">Win A Scholarship</dt>
          <dd className="campaign-info__scholarship">
            ${scholarshipAmount.toLocaleString()}
          </dd>
        </>
      ) : null}
      {scholarshipDeadline ? (
        <>
          <dt className="campaign-info__scholarship-beta">Deadline</dt>
          <dd className="campaign-info__scholarship-beta-info">
            {format(scholarshipDeadline, 'MMMM do, YYYY', {
              awareOfUnicodeTokens: true,
            })}
          </dd>
        </>
      ) : null}
      {actionType ? (
        <>
          <dt className="campaign-info__scholarship-beta">Action Type</dt>
          <dd className="campaign-info__scholarship-beta-info">{actionType}</dd>
        </>
      ) : null}
      <>
        <dt className="campaign-info__scholarship-beta">Requirements</dt>
        <dd className="campaign-info__scholarship-beta-info">
          <ul className="margin-top-sm list -compacted">
            <li>Under 26 years old</li>
            <li>No minimum GPA</li>
            <li>No essay</li>
          </ul>
        </dd>
      </>
    </dl>
  </Card>
);

AffiliateScholarshipBlockBeta.propTypes = {
  actionType: PropTypes.string,
  affiliateTitle: PropTypes.string,
  affiliateLogo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    description: PropTypes.string,
  }),
  className: PropTypes.string,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipDeadline: PropTypes.string.isRequired,
};

AffiliateScholarshipBlockBeta.defaultProps = {
  actionType: null,
  affiliateTitle: null,
  affiliateLogo: null,
  className: null,
};

export default AffiliateScholarshipBlockBeta;
