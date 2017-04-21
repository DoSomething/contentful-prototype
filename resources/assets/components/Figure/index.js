import React from 'react';
import classnames from 'classnames';
import LazyImage from '../LazyImage';
import { modifiers } from '../../helpers';
import './figure.scss';

export const BaseFigure = ({ alignment, verticalAlignment, media, size, className, children }) => (
  <article className={classnames('figure', className, modifiers(alignment, verticalAlignment, size))}>
    <div className="figure__media">{media}</div>
    <div className="figure__body">{children}</div>
  </article>
);

BaseFigure.propTypes = {
  className: React.PropTypes.string,
  children: React.PropTypes.node,
  alignment: React.PropTypes.oneOf(['left', 'right', 'left-collapse']),
  verticalAlignment: React.PropTypes.oneOf(['center']),
  size: React.PropTypes.oneOf(['small', 'medium', 'large']),
  media: React.PropTypes.node.isRequired,
};

BaseFigure.defaultProps = {
  className: null,
  alignment: null,
  children: null,
  verticalAlignment: null,
  size: null,
};

export const Figure = (props) => {
  const media = <LazyImage className={props.imageClassName} alt={props.alt} src={props.image} />;

  return <BaseFigure {...props} media={media} />;
};

Figure.propTypes = {
  imageClassName: React.PropTypes.string,
  image: React.PropTypes.string,
  alt: React.PropTypes.string.isRequired,
};

Figure.defaultProps = {
  imageClassName: null,
  image: null,
};

export default Figure;
