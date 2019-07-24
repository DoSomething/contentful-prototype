import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './affiliate-promotion.scss';

const AffiliatePromotion = ({
  className = null,
  imgUrl,
  text,
  textClassName,
  title,
}) => (
  <div className={classnames('affiliate-promotion', className)}>
    <p className={classnames('__copy', textClassName)}>{text}</p>
    <div className="__image">
      <img src={imgUrl} alt={title} />
    </div>
  </div>
);

AffiliatePromotion.propTypes = {
  className: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.string,
  textClassName: PropTypes.string,
  title: PropTypes.string,
};

AffiliatePromotion.defaultProps = {
  className: null,
  text: 'Powered by',
  textClassName: null,
  title: 'Campaign Sponsor Logo',
};

export default AffiliatePromotion;
