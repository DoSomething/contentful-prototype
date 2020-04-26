import React from 'react';
import PropTypes from 'prop-types';

import Referrals from './Referrals';
import ShareLink from './ShareLink';
import ContentBlock from '../../../blocks/ContentBlock/ContentBlock';

const AlphaPage = ({ userId }) => (
  <React.Fragment>
    <Referrals referrerUserId={userId} />
    <ShareLink referrerUserId={userId} />
    <ContentBlock
      title="FAQs"
      content="What are some tips for sharing?"
      className="grid-wide"
    />
  </React.Fragment>
);

AlphaPage.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default AlphaPage;
