import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import { getHumanFriendlyDate } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import ScholarshipMoneyHand from '../../../images/scholarships.svg';
import DoSomethingLogo from '../../utilities/DoSomethingLogo/DoSomethingLogo';

import './scholarshipInfoBlock.scss';

const Header = ({ content, textColor }) => (
  <div className={`font-bold uppercase ${textColor}`}>{content}</div>
);

Header.propTypes = {
  content: PropTypes.string.isRequired,
  textColor: PropTypes.string,
};

Header.defaultProps = {
  textColor: 'text-gray-600',
};

const ScholarshipInfoBlock = ({
  affiliateSponsors,
  actionType,
  affiliateTitle,
  children,
  scholarshipAmount,
  scholarshipCallToAction,
  scholarshipDeadline,
  scholarshipDescription,
}) => (
  <Card className="flex flex-col-reverse md:flex-row">
    <div className="md:w-1/2 p-6 mx-2 md:mx-4">
      <div className="h-16">
        <div className="float-left mr-4">
          <DoSomethingLogo className="h-16" />
        </div>
        {affiliateSponsors.length ? (
          <>
            <div className="h-full pt-2 float-left text-4xl text-black leading-none">
              &times;
            </div>
            <div className="__image ml-4 float-left">
              <img
                className="h-16"
                src={affiliateSponsors[0].fields.logo.url}
                alt={affiliateSponsors[0].fields.logo.title}
              />
            </div>
          </>
        ) : null}
      </div>
      <div className="pt-6 pb-8">
        <strong className="text-lg">
          Welcome
          {affiliateTitle
            ? ` from ${affiliateTitle.toUpperCase()}`
            : ' to DoSomething.org!'}
          !
        </strong>{' '}
        {scholarshipDescription ? (
          <TextContent>{scholarshipDescription}</TextContent>
        ) : (
          <p>
            Ready to earn scholarships for doing good? Just follow the simple
            instructions for the chance to win. Let’s Do This!
          </p>
        )}
      </div>
      <div className="bg-gray-100 flex">
        <div
          className="bg-no-repeat bg-cover bg-center w-1/4 lg:w-1/6"
          style={{ backgroundImage: `url(${ScholarshipMoneyHand})` }}
        />
        <p className="w-3/4 lg:w-5/6 px-4 py-2 text-xs sm:text-base md:text-xs lg:text-sm">
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
      {children}
    </div>
    <div className="md:w-1/2 p-6 text-base scholarship-info-block">
      <div className="bg-white mx-2 my-6 md:mx-6 md:my-10 p-6 rounded">
        {scholarshipAmount ? (
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
            <ul className="mt-2 list-disc list-inside">
              <li>Under 26 years old</li>
              <li>No minimum GPA</li>
              <li>No essay</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </Card>
);

ScholarshipInfoBlock.propTypes = {
  actionType: PropTypes.string,
  affiliateSponsors: PropTypes.arrayOf(PropTypes.object),
  affiliateTitle: PropTypes.string,
  children: PropTypes.object,
  scholarshipAmount: PropTypes.number.isRequired,
  scholarshipCallToAction: PropTypes.string,
  scholarshipDeadline: PropTypes.string.isRequired,
  scholarshipDescription: PropTypes.object,
};

ScholarshipInfoBlock.defaultProps = {
  actionType: null,
  affiliateSponsors: [],
  affiliateTitle: null,
  children: null,
  scholarshipCallToAction: 'Win A Scholarship',
  scholarshipDescription: null,
};
export default ScholarshipInfoBlock;
