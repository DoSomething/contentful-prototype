import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';
import { markdown } from '../../helpers';

import './markdown.scss';

const Markdown = ({ className = null, children }) => (
  <div className={classnames('markdown', 'with-lists', className)} dangerouslySetInnerHTML={markdown(children)} /> // eslint-disable-line react/no-danger
);

Markdown.propTypes = {
  children: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Markdown.defaultProps = {
  className: null,
};

export default Markdown;
