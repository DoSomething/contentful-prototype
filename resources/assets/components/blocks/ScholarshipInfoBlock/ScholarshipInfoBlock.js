import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import TextContent from '../../utilities/TextContent/TextContent';
import { getHumanFriendlyDate } from '../../../helpers';
import ScholarshipMoneyHand from '../../../images/scholarships.svg';
import DoSomethingLogo from '../../utilities/DoSomethingLogo/DoSomethingLogo';

const ScholarshipInfoBlock = ({
  affiliateSponsors,
  actionType,
  affiliateTitle,
  scholarshipAmount,
  scholarshipCallToAction,
  scholarshipDeadline,
  scholarshipDescription,
}) => (
  <Card className="flex">
    <div className="w-1/2">
      {affiliateSponsors.length ? (
        <div className="__image">
          <DoSomethingLogo />
          <img
            src={affiliateSponsors[0].fields.logo.url}
            alt={affiliateSponsors[0].fields.logo.title}
          />
        </div>
      ) : null}
      <p className="pt-6 pb-3">
        <strong>
          Welcome to DoSomething.org
          {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
        </strong>{' '}
        <TextContent>{scholarshipDescription}</TextContent>
      </p>
      <div>
        <img src={ScholarshipMoneyHand} alt="scholarships money hand icon" />
        <p>
          Since 1993, DoSomething.org has given out more than <b>$5,000,000</b>{' '}
          in scholarships. Check out stories from some of our{' '}
          <a
            href="https://www.dosomething.org/us/articles/scholarship-winners"
            rel="noopener noreferrer"
            target="_blank"
          >
            past winners
          </a>
          .
        </p>
      </div>
    </div>
    <div className="w-1/2">
      {scholarshipAmount && scholarshipCallToAction ? (
        <>
          <div>{scholarshipCallToAction}</div>
          <p>${scholarshipAmount.toLocaleString()}</p>
        </>
      ) : null}
      {scholarshipDeadline ? (
        <>
          <div>Deadline</div>
          <p>{getHumanFriendlyDate(scholarshipDeadline)}</p>
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
    </div>
  </Card>
);

ScholarshipInfoBlock.propTypes = {
  actionType: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateTitle: PropTypes.string,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipCallToAction: PropTypes.string,
  scholarshipDeadline: PropTypes.string.isRequired,
  scholarshipDescription: PropTypes.object,
};

ScholarshipInfoBlock.defaultProps = {
  actionType: null,
  affiliateSponsors: [],
  affiliateTitle: null,
  scholarshipCallToAction: null,
  scholarshipDescription: null,
};
export default ScholarshipInfoBlock;
