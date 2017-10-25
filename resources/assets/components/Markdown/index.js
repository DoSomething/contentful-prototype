import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { markdown, contentfulImageUrl } from '../../helpers';

import './markdown.scss';

const pattern = /\/\/images\.contentful\.com.+\.(jpg|png)/g;
const contentfulImageFormat = url => (contentfulImageUrl(url, '1000'));
const formatImageUrls = string => (string.replace(pattern, contentfulImageFormat));

const Markdown = ({ className = null, children }) => (
  <div className={classnames('markdown', 'with-lists', className)} dangerouslySetInnerHTML={markdown(formatImageUrls(children))} /> // eslint-disable-line react/no-danger
);

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  className: null,
};

export default Markdown;
