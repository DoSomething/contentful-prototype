import React from 'react';
import { markdown } from "../../helpers";
import './markdown.scss';

const Markdown = ({className = 'markdown', children}) => (
  <div className={className} dangerouslySetInnerHTML={markdown(children)} />
);

Markdown.propTypes = {
  children: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
};

export default Markdown;
