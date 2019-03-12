import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { parseRichTextDocument } from '../../../helpers/text';

/**
 * Return React Components for provided RichText.
 * @see  https://github.com/contentful/rich-text/tree/master/packages/rich-text-react-renderer
 *
 * @param  {String} options.className
 * @param  {Object} options.children
 * @param  {Object} options.styles
 * @return {Object}
 */
const RichTextDocument = ({ className = null, children, styles }) => (
  <div className={classnames('richtext', className)}>
    {parseRichTextDocument(children, styles)}
  </div>
);

RichTextDocument.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  className: PropTypes.string,
  styles: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

RichTextDocument.defaultProps = {
  className: null,
  styles: {},
};

export default RichTextDocument;
