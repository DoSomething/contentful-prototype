import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './SponsorPromotion.scss';

const SponsorPromotion = ({ className = null, imgUrl, title }) => (
  <div className={classnames('promotions', className)}>
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
  className: PropTypes.string,
  title: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
};

SponsorPromotion.defaultProps = {
  className: null,
  title: 'Campaign Sponsor Logo',
};

export default SponsorPromotion;
