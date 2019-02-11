/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { createMarkup } from '../../../helpers/markdown';

import './markdown.scss';

/**
 * Render Markdown as Markup prepared for a React Component
 * @see  https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 *
 * @param  {String} props.className
 * @param  {String|Array|Object} props.children
 * @return {Object}
 */
const Markdown = ({ className = null, children }) => (
  <div
    className={classnames('markdown', 'with-lists', className)}
    dangerouslySetInnerHTML={{ __html: createMarkup(children) }}
  />
);

Markdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  className: null,
};

export default Markdown;
