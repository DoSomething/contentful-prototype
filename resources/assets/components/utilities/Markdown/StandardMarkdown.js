/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { parseStandardMarkdown } from '../../../helpers/text';

/**
 * Return Markup for provided Markdown.
 * @see  https://reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 *
 * @param  {String} options.className
 * @param  {String|Array} options.children
 * @return {Object}
 */
const StandardMarkdown = ({ className = null, children }) => (
  <div
    className={classnames('markdown', 'with-lists', className)}
    dangerouslySetInnerHTML={{ __html: parseStandardMarkdown(children) }}
  />
);

StandardMarkdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  className: PropTypes.string,
};

StandardMarkdown.defaultProps = {
  className: null,
};

export default StandardMarkdown;
