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
 * @return {Object}
 */
const RichTextDocument = ({ className = null, children }) => (
  <div className={classnames('markdown rich-text', 'with-lists', className)}>
    {parseRichTextDocument(children)}
  </div>
);

RichTextDocument.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object]).isRequired,
  className: PropTypes.string,
};

RichTextDocument.defaultProps = {
  className: null,
};

export default RichTextDocument;
