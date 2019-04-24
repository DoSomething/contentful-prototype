import React from 'react';
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import { contentfulImageUrl } from '../../../helpers';

import './affiliate-scholarship-block.scss';

const AffiliateScholarshipBlock = ({
  affiliateLogo,
  affiliateTitle,
  scholarshipAmount,
  scholarshipDeadline,
}) =>
  affiliateLogo &&
  affiliateTitle &&
  scholarshipAmount &&
  scholarshipDeadline ? (
    <Card className="rounded bordered padded affiliate-scholarship-block">
      <img
        src={contentfulImageUrl(affiliateLogo, '100')}
        alt="Affiliate logo"
      />

      <p className="margin-top-sm padding-bottom-md">
        <strong>
          Welcome to DoSomething.org via {affiliateTitle.toUpperCase()}!
        </strong>{' '}
        Ready to earn scholarships for doing good? Just follow the simple
        instructions below for the chance to win. Let’s Do This!
      </p>

      <div className="scholarship-details">
        <div className="section-1">
          <p className="font-bold">AMOUNT</p>
          <p className="scholarship-amount league-gothic margin-top-none">
            ${scholarshipAmount.toLocaleString()}
          </p>
        </div>

        <div className="section-2">
          <div className="section-2a">
            <p className="font-bold">DEADLINE</p>
            <p className="margin-top-sm">
              {format(scholarshipDeadline, 'MMMM do, YYYY', {
                awareOfUnicodeTokens: true,
              })}
            </p>
          </div>

          <div className="section-2b">
            <p className="font-bold">REQUIREMENTS</p>
            <ul className="margin-top-sm">
              <li>&#8226; 13-25 years old</li>
              <li>&#8226; No minimum GPA</li>
              <li>&#8226; No essay</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  ) : null;

AffiliateScholarshipBlock.propTypes = {
  affiliateTitle: PropTypes.string.isRequired,
  affiliateLogo: PropTypes.string.isRequired,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipDeadline: PropTypes.string.isRequired,
};

export default AffiliateScholarshipBlock;
