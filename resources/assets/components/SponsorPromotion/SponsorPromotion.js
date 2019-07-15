import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// import './sponsor-promotion.scss';

const SponsorPromotion = ({ className = null, imgUrl, text, title }) => (
  <div className={classnames('promotions', className)}>
    <div className="promotion promotion--sponsor">
      <div className="wrapper">
        <p className="__copy">{text}</p>
        <div className="__image">
          <img src={imgUrl} alt={title} />
        </div>
      </div>
    </div>
  </div>
);

SponsorPromotion.propTypes = {
  className: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
  title: PropTypes.string,
};

SponsorPromotion.defaultProps = {
  className: null,
  text: 'Powered by',
  title: 'Campaign Sponsor Logo',
};

export default SponsorPromotion;
