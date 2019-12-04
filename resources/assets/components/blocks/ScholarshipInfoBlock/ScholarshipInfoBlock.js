import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import TextContent from '../../utilities/TextContent/TextContent';
import { getHumanFriendlyDate } from '../../../helpers';
import ScholarshipMoneyHand from '../../../images/scholarships.svg';
// import PurpleWaveBackground from '../../utilities/CtaPopover/cta-popover-bg.svg'
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
    <div className="w-1/2 p-6">
      <div className="__image">
        <DoSomethingLogo />
        {affiliateSponsors.length ? (
          <img
            src={affiliateSponsors[0].fields.logo.url}
            alt={affiliateSponsors[0].fields.logo.title}
          />
        ) : null}
      </div>
      <p className="pt-6 pb-3">
        <strong className="text-lg">
          Welcome to DoSomething.org
          {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
        </strong>{' '}
        <TextContent>{scholarshipDescription}</TextContent>
      </p>
      <div className="bg-gray-100 flex">
        <img
          className="w-1/4"
          src={ScholarshipMoneyHand}
          alt="scholarships money hand icon"
        />
        <p className="w-3/4 p-4 text-xs">
          Since 1993, DoSomething.org has given out more than <b>$5,000,000</b>{' '}
          in scholarships. Check out stories from some of our{' '}
          <a
            href="https://www.dosomething.org/us/articles/scholarship-winners"
            rel="noopener noreferrer"
            target="_blank"
            className="underline text-black font-normal"
          >
            past winners
          </a>
          .
        </p>
      </div>
    </div>
    <div className="w-1/2 p-6 text-base">
      {scholarshipAmount && scholarshipCallToAction ? (
        <>
          <div className="font-bold uppercase text-purple-600">
            {scholarshipCallToAction}
          </div>
          <p className="font-league-gothic text-5xl pb-2">
            ${scholarshipAmount.toLocaleString()}
          </p>
        </>
      ) : null}
      {scholarshipDeadline ? (
        <>
          <div className="font-bold uppercase text-gray-400">Deadline</div>
          <p className="pb-2">{getHumanFriendlyDate(scholarshipDeadline)}</p>
        </>
      ) : null}
      {actionType ? (
        <>
          <dt className="font-bold uppercase text-gray-400">Action Type</dt>
          <dd className="pb-2">{actionType}</dd>
        </>
      ) : null}
      <>
        <dt className="font-bold uppercase text-gray-400">Requirements</dt>
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
