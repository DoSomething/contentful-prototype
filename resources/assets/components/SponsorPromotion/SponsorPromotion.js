import React from 'react';
import PropTypes from 'prop-types';

import './SponsorPromotion.scss';

const SponsorPromotion = ({ imgUrl, title }) => (
  <div className="promotions">
    <div className="promotion promotion--sponsor">
      <div className="wrapper">
        <p className="__copy">Powered by</p>
        <div className="__image">
          <img src={imgUrl} alt={title} />
        </div>
      </div>
    </div>
  </div>
);

SponsorPromotion.propTypes = {
  title: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
};

SponsorPromotion.defaultProps = {
  title: 'Campaign Sponsor Logo',
};

export default SponsorPromotion;
