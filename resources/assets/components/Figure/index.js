import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { modifiers } from '../../helpers';
import LazyImage from '../utilities/LazyImage';

import './figure.scss';

export const BaseFigure = ({
  alignment,
  verticalAlignment,
  media,
  size,
  className,
  children,
}) => (
  <article
    className={classnames(
      'figure',
      className,
      modifiers(alignment, verticalAlignment, size),
    )}
  >
    <div className="figure__media">{media}</div>
    <div className="figure__body">{children}</div>
  </article>
);

BaseFigure.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  alignment: PropTypes.oneOf([
    'left',
    'right',
    'left-collapse',
    'right-collapse',
  ]),
  verticalAlignment: PropTypes.oneOf(['center']),
  size: PropTypes.oneOf(['small', 'medium', 'large', 'one-third']),
  media: PropTypes.node,
};

BaseFigure.defaultProps = {
  className: null,
  alignment: null,
  children: null,
  verticalAlignment: null,
  size: null,
  media: null,
};

export const Figure = props => {
  const media = (
    <LazyImage
      className={props.imageClassName}
      alt={props.alt}
      src={props.image}
    />
  );

  return <BaseFigure {...props} media={media} />;
};

Figure.propTypes = {
  imageClassName: PropTypes.string,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string.isRequired,
};

Figure.defaultProps = {
  imageClassName: null,
  image: null,
};

export default Figure;
