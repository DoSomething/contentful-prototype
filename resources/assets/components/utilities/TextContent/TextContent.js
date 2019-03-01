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
 * @param  {Object} options.styles
 * @return {Object}
 */
const Markdown = ({ className = null, children, styles }) =>
  has(children, 'nodeType') ? (
    <RichTextDocument className={classnames(className)} styles={styles}>
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
  styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

Markdown.defaultProps = {
  className: null,
  styles: {},
};

export default Markdown;
