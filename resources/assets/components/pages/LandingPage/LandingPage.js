/* eslint-disable react/no-array-index-key */

import React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import CampaignBannerContainer from '../../CampaignBanner/CampaignBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';

// @TODO: Implement this as a custom (rich text) renderer per https://git.io/JfGlf.
const landingPageHeadingOneStyle = css`
  h1 {
    ${tw`mb-6 text-4xl`}

    span {
      border-bottom: 5px solid ${tailwind('colors.yellow.500')};
    }
  }
`;

const LandingPage = ({ content }) => (
  <>
    <CampaignBannerContainer />

    {content ? (
      <div
        data-testid="landing-page-content"
        className="bg-white base-12-grid py-6"
      >
        <div
          className="col-span-4 md:col-span-6 lg:col-start-2 lg:col-span-8 xl:col-start-2 xl:col-span-7 leading-normal text-base"
          css={landingPageHeadingOneStyle}
        >
          <TextContent>{content}</TextContent>
        </div>
      </div>
    ) : null}

    <CampaignInfoBarContainer />
  </>
);

LandingPage.propTypes = {
  content: PropTypes.object,
};

LandingPage.defaultProps = {
  content: null,
};

export default LandingPage;
