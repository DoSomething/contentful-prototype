import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Card from '../../utilities/Card/Card';

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
      'rounded bordered padded affiliate-scholarship-block',
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
    <p className="margin-top-sm padding-bottom-md">
      <strong>
        Welcome to DoSomething.org
        {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
      </strong>{' '}
      Ready to earn scholarships for doing good? Just follow the simple
      instructions below for the chance to win. Let’s Do This!
    </p>
    <dl className="clearfix">
      {scholarshipAmount ? (
        <>
          <dt className="font-bold">Win A Scholarship</dt>
          <dd className="scholarship-amount league-gothic margin-top-none">
            ${scholarshipAmount.toLocaleString()}
          </dd>
        </>
      ) : null}
      {scholarshipDeadline ? (
        <>
          <dt className="font-bold">Deadline</dt>
          <dd className="margin-top-sm">
            {format(scholarshipDeadline, 'MMMM do, YYYY', {
              awareOfUnicodeTokens: true,
            })}
          </dd>
        </>
      ) : null}
      <>
        <dt className="font-bold">Requirements</dt>
        <ul className="margin-top-sm list -compacted">
          <li>Under 26 years old</li>
          <li>No minimum GPA</li>
          <li>No essay</li>
        </ul>
      </>
    </dl>
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
