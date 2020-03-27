import React from 'react';
import tw from 'twin.macro';
import Media from 'react-media';
import { css } from '@emotion/core';

import { tailwind } from '../../../../helpers';
import VolunteerCreditsTableRow from './VolunteerCreditsTableRow';

// @TODO: Replace this stubbed data with volunteer credit post results from GraphQL.
const IMAGE_URLS = [
  'https://images.ctfassets.net/81iqaqpfd8fy/2dbyLUKxyUiuOe06i2W4uE/7ebdb15c6aa34e6c94f415ec01f6d482/GAS_2018_Header_1_Landscape.jpg',
  'https://images.ctfassets.net/81iqaqpfd8fy/62BX09Cjx2qIVRT7BblL4r/5d3e08c03a07032733092a6bd70da734/Covid19_Campaign_Header.jpg',
  'https://images.ctfassets.net/81iqaqpfd8fy/4C6g2AjsYToIJgb9TKc2FT/df0a983b1eca3f49ff83fc20273b98c5/2020-canvasser.png',
];

const campaigns = [
  {
    showcaseTitle: 'Give Más, Get Más',
    showcaseDescription:
      'Share a card to help a friend make their dream a reality.',
    showcaseImage: {
      url: IMAGE_URLS[0],
    },
  },
  {
    showcaseTitle: 'COVID-19 & SOCIAL DISTANCING',
    showcaseDescription:
      'Share your tips on how you’re practicing social distancing during the Covid-19 outbreak.',
    showcaseImage: {
      url: IMAGE_URLS[1],
    },
  },
  {
    showcaseTitle: 'Are you ready to vote?',
    showcaseDescription: "Take a quiz to see if you're ready to vote.",
    showcaseImage: {
      url: IMAGE_URLS[2],
    },
  },
];

const TableHeader = tw.th`bg-blurple-500 font-bold p-4 pr-6 text-left text-white`;

const VolunteerCreditsTable = () => (
  <table className="border border-solid border-gray-200 border-collapse w-full">
    <thead>
      <tr>
        <TableHeader>Campaign Info</TableHeader>
        <Media
          query={`(min-width: ${tailwind('screens.md')})`}
          render={() => (
            <React.Fragment>
              <TableHeader>Action Type</TableHeader>
              <TableHeader>Date Completed</TableHeader>
              <TableHeader>Volunteer Hours</TableHeader>
              <TableHeader>Certificate</TableHeader>
            </React.Fragment>
          )}
        />
      </tr>
    </thead>

    <tbody>
      {campaigns.map(campaign => (
        <tr
          key={campaign.showcaseTitle}
          css={css`
            :not(:first-of-type) {
              border-top: 2px solid ${tailwind('colors.gray.200')};
            }
          `}
        >
          <VolunteerCreditsTableRow campaignWebsite={campaign} />
        </tr>
      ))}
    </tbody>
  </table>
);

export default VolunteerCreditsTable;
