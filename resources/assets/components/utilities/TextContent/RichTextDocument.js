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
const RichTextDocument = ({
  children,
  className = null,
  classNameByEntry,
  classNameByEntryDefault,
  customProps,
  styles,
}) => (
  <div className={classnames('richtext', className)}>
    {parseRichTextDocument(
      children,
      classNameByEntry,
      classNameByEntryDefault,
      styles,
      customProps,
    )}
  </div>
);

RichTextDocument.propTypes = {
  children: PropTypes.object.isRequired,
  className: PropTypes.string,
  classNameByEntry: PropTypes.object,
  classNameByEntryDefault: PropTypes.string,
  customProps: PropTypes.object,
  styles: PropTypes.shape({
    textColor: PropTypes.string,
    hyperlinkColor: PropTypes.string,
    fontSize: PropTypes.string,
  }),
};

RichTextDocument.defaultProps = {
  className: null,
  classNameByEntry: {},
  classNameByEntryDefault: null,
  customProps: {},
  styles: {},
};

export default RichTextDocument;
