/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { markdown, contentfulImageUrl } from '../../../helpers';

import './markdown.scss';

const pattern = /\/\/images\.(ctfassets\.net|contentful\.com).+\.(jpg|png)/g;
const contentfulImageFormat = url => contentfulImageUrl(url, '1000');
const formatImageUrls = string =>
  string.replace(pattern, contentfulImageFormat);

const Markdown = ({ className = null, children }) => {
  // When directly writing content into this component, React may pass it as an
  // array of strings. If so, combine them to get the Markdown source!
  const sourceMarkdown = Array.isArray(children) ? children.join('') : children;
  const html = markdown(formatImageUrls(sourceMarkdown));

  return (
    <div
      className={classnames('markdown', 'with-lists', className)}
      dangerouslySetInnerHTML={html}
    />
  );
};

Markdown.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]).isRequired,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  className: null,
};

export default Markdown;
