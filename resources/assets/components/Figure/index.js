import PropTypes from 'prop-types';
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
  className: PropTypes.string,
  children: PropTypes.node,
  alignment: PropTypes.oneOf(['left', 'right', 'left-collapse']),
  verticalAlignment: PropTypes.oneOf(['center']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
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

// Experimental Reportback figure.
// This should eventually be consolidated when Figures are re-worked.
export const ReportbackFigure = (props) => {
  const { alignment, verticalAlignment, size, media, meta, children, className } = props;

  return (
    <article className={classnames('figure -reportback', className, modifiers(alignment, verticalAlignment, size))}>
      <div className="figure__media">{media}</div>
      <div className="figure__body">{children}</div>
      <div className="figure__meta">{meta}</div>
    </article>
  );
};

ReportbackFigure.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  alignment: PropTypes.oneOf(['left', 'right', 'left-collapse']),
  verticalAlignment: PropTypes.oneOf(['center']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  media: PropTypes.node,
  meta: PropTypes.node,
};

ReportbackFigure.defaultProps = {
  className: null,
  alignment: null,
  children: null,
  verticalAlignment: null,
  size: null,
  media: null,
  meta: null,
};

export const Figure = (props) => {
  const media = <LazyImage className={props.imageClassName} alt={props.alt} src={props.image} />;

  return <BaseFigure {...props} media={media} />;
};

Figure.propTypes = {
  imageClassName: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
  ]),
  alt: PropTypes.string.isRequired,
};

Figure.defaultProps = {
  imageClassName: null,
  image: null,
};

export default Figure;
