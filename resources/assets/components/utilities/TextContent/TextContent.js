import React from 'react';
import { has } from 'lodash';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import RichTextDocument from './RichTextDocument';
import StandardMarkdown from './StandardMarkdown';

import './text-content.scss';
import './markdown.scss'; // @deprecate

/**
 * Render TextContent as Markup prepared for a React Component.
 *
 * @param  {String} options.className
 * @param  {String|Array|Object} options.children
 * @param  {Object} options.styles
 * @return {Object}
 */
const TextContent = ({
  children,
  className = null,
  classNameByEntry,
  styles,
}) =>
  has(children, 'nodeType') ? (
    <RichTextDocument
      className={classnames('text-content', className)}
      classNameByEntry={classNameByEntry}
      styles={styles}
    >
      {children}
    </RichTextDocument>
  ) : (
    <StandardMarkdown className={classnames('text-content', className)}>
      {children}
    </StandardMarkdown>
  );

TextContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.object,
  ]).isRequired,
  className: PropTypes.string,
  styles: PropTypes.shape({
    textColor: PropTypes.string,
    hyperlinkColor: PropTypes.string,
  }),
};

TextContent.defaultProps = {
  className: null,
  styles: {},
};

export default TextContent;
