import React from 'react';
import PropTypes from 'prop-types';

import ShareLink from './ShareLink';
import ReferralsList from './ReferralsList/ReferralsList';
import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';

const AlphaPage = ({ userId }) => (
  <div
    className="base-12-grid clear-both py-3 md:py-6"
    data-test="alpha-voter-registration-drive-page"
  >
    <ReferralsList referrerUserId={userId} />
    <ShareLink referrerUserId={userId} />
    <ContentBlock
      title="FAQs"
      content="What are some tips for sharing?"
      className="grid-wide"
    />
  </div>
);

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
