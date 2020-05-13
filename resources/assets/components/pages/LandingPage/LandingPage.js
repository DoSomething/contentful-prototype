/* eslint-disable react/no-array-index-key */

import React from 'react';
import tw from 'twin.macro';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { tailwind } from '../../../helpers';
import TextContent from '../../utilities/TextContent/TextContent';
import LedeBannerContainer from '../../LedeBanner/LedeBannerContainer';
import CampaignInfoBarContainer from '../../CampaignInfoBar/CampaignInfoBarContainer';

const LandingPage = props => {
  const { content } = props;

  // @TODO: Implement this as a custom (rich text) renderer per https://git.io/JfGlf.
  const landingPageHeadingOneStyle = css`
    h1 {
      ${tw`mb-6 text-4xl`}

      span {
        border-bottom: 5px solid ${tailwind('colors.yellow.500')};
      }
    }
  `;

  return (
    <>
      <LedeBannerContainer />

      {content ? (
        <div className="bg-white">
          <div className="md:w-3/4 mx-auto py-6 px-3 pitch-landing-page">
            <div className="campaign-page__content clearfix">
              <div className="primary" css={landingPageHeadingOneStyle}>
                <TextContent>{content}</TextContent>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <CampaignInfoBarContainer />
    </>
  );
};

LandingPage.propTypes = {
  content: PropTypes.object,
};

LandingPage.defaultProps = {
  content: null,
};

export default LandingPage;
