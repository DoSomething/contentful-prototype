import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import TextContent from '../../utilities/TextContent/TextContent';
import { getHumanFriendlyDate } from '../../../helpers';
import ScholarshipMoneyHand from '../../../images/scholarships.svg';
import DoSomethingLogo from '../../utilities/DoSomethingLogo/DoSomethingLogo';

import './scholarshipInfoBlock.scss';

const Header = ({ content, textColor }) => (
  <div className={`font-bold uppercase ${textColor}`}>{content}</div>
);

const ScholarshipInfoBlock = ({
  affiliateSponsors,
  actionType,
  affiliateTitle,
  scholarshipAmount,
  scholarshipCallToAction,
  scholarshipDeadline,
  scholarshipDescription,
}) => (
  <Card className="flex flex-col-reverse md:flex-row">
    <div className="w-full md:w-1/2 p-6">
      <div className="h-16">
        <div className="float-left mr-4">
          <DoSomethingLogo className="h-10" />
        </div>
        <div className="float-left text-4xl text-black leading-none">
          &times;
        </div>
        {affiliateSponsors.length ? (
          <div className="__image ml-4 float-left">
            <img
              className="h-10"
              src={affiliateSponsors[0].fields.logo.url}
              alt={affiliateSponsors[0].fields.logo.title}
            />
          </div>
        ) : null}
      </div>
      <div className="pt-6 pb-3">
        <strong className="text-lg">
          Welcome to DoSomething.org
          {affiliateTitle ? ` via ${affiliateTitle.toUpperCase()}` : null}!
        </strong>{' '}
        <TextContent>{scholarshipDescription}</TextContent>
      </div>
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
    <div className="w-full md:w-1/2 p-6 text-base scholarship-info-block">
      <div className="bg-white m-4 p-6 rounded">
        {scholarshipAmount && scholarshipCallToAction ? (
          <div>
            <Header
              content={scholarshipCallToAction}
              textColor="text-purple-600"
            />
            <p className="font-league-gothic text-5xl pb-2">
              ${scholarshipAmount.toLocaleString()}
            </p>
          </div>
        ) : null}
        <div>
          <div className="lg:flex">
            {scholarshipDeadline ? (
              <div className="lg:w-1/2 lg:float-left">
                <Header content="Deadline" />
                <p className="pb-2">
                  {getHumanFriendlyDate(scholarshipDeadline)}
                </p>
              </div>
            ) : null}
            {actionType ? (
              <div className="lg:w-1/2 lg:float-right">
                <Header content="Action Type" />
                <p className="pb-2">{actionType}</p>
              </div>
            ) : null}
          </div>
          <div>
            <Header content="Requirements" />
            <div>
              <ul className="mt-2 list-disc list-inside">
                <li>Under 26 years old</li>
                <li>No minimum GPA</li>
                <li>No essay</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

Header.propTypes = {
  content: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

Header.defaultProps = {
  textColor: 'text-gray-400',
};

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
