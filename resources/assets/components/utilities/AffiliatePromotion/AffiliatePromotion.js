import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import './affiliate-promotion.scss';

const AffiliatePromotion = ({ className = null, imgUrl, text, title }) => (
  <div className={classnames('affiliate-promotion', className)}>
    <p className={classnames('__copy', text.className)}>{text.value}</p>
    <div className="__image">
      <img src={imgUrl} alt={title} />
    </div>
  </div>
);

AffiliatePromotion.propTypes = {
  className: PropTypes.string,
  imgUrl: PropTypes.string.isRequired,
  text: PropTypes.shape({
    value: PropTypes.string,
    className: PropTypes.string,
  }),
  title: PropTypes.string,
};

AffiliatePromotion.defaultProps = {
  className: null,
  text: {
    value: 'Powered by',
    className: null,
  },
  title: 'Campaign Sponsor Logo',
};

export default AffiliatePromotion;
