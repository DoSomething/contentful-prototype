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
    className={classNames(
      'rounded bordered p-3 affiliate-scholarship-block beta',
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
    <p className="pt-6 pb-3">
      <strong>
        Welcome to DoSomething.org
        {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
      </strong>{' '}
      Ready to earn scholarships for doing good? Just follow the simple
      instructions for the chance to win. Let’s Do This!
    </p>
    <dl className="clearfix">
      {scholarshipAmount ? (
        <>
          <dt>Win A Scholarship</dt>
          <dd className="scholarship-beta">
            ${scholarshipAmount.toLocaleString()}
          </dd>
        </>
      ) : null}
      {scholarshipDeadline ? (
        <>
          <dt>Deadline</dt>
          <dd>
            {format(scholarshipDeadline, 'MMMM do, YYYY', {
              awareOfUnicodeTokens: true,
            })}
          </dd>
        </>
      ) : null}
      {actionType ? (
        <>
          <dt>Action Type</dt>
          <dd>{actionType}</dd>
        </>
      ) : null}
      <>
        <dt>Requirements</dt>
        <dd>
          <ul className="mt-2 list -compacted">
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
