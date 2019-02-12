import React from 'react';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RichTextDocument from './RichTextDocument';
import StandardMarkdown from './StandardMarkdown';

import './markdown.scss';

/**
 * Render Markdown as Markup prepared for a React Component
 *
 * @TODO: rename component to <TextContent>
 * @param  {String} options.className
 * @param  {String|Array|Object} options.children
 * @return {Object}
 */
const Markdown = ({ className = null, children }) =>
  has(children, 'nodeType') ? (
    <RichTextDocument className={classnames(className)}>
      {children}
    </RichTextDocument>
  ) : (
    <StandardMarkdown className={classnames(className)}>
      {children}
    </StandardMarkdown>
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
