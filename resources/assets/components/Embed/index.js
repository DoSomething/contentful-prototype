/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import classnames from 'classnames';
import { Phoenix } from '@dosomething/gateway';

import { Figure } from '../Figure';
import linkIcon from './linkIcon.svg';
import { isExternal } from '../../helpers';

import './embed.scss';

class Embed extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.phoenix = new Phoenix();
  }

  componentDidMount() {
    this.phoenix
      .get('next/embed', { url: this.props.url })
      .then(json => this.setState(json));
  }

  render() {
    let embed = <div className="spinner" />;

    // If an <iframe> code snippet is provided, use that. Otherwise, build preview card.
    if (this.state.code) {
      const embedHtml = { __html: this.state.code };
      embed = (
        <div className="media-video" dangerouslySetInnerHTML={embedHtml} />
      );
    } else if (this.state.title && this.state.url) {
      const target = isExternal(this.state.url) ? '_blank' : '_self';
      embed = (
        <a href={this.state.url} target={target} rel="noopener noreferrer">
          <Figure
            className="padded margin-bottom-none"
            image={this.state.image || this.state.provider.icon}
            alt={this.state.provider.name}
            alignment="left-collapse"
            size="large"
          >
            <h3>{this.state.title}</h3>
            {this.state.description ? <p>{this.state.description}</p> : null}
            <p className="footnote">{this.state.provider.name}</p>
          </Figure>
        </a>
      );
    } else if (this.state.requestFailed) {
      embed = (
        <a href={this.props.url}>
          <Figure
            className="padded margin-bottom-none bordered rounded"
            image={linkIcon}
            alt="link icon"
            alignment="left-collapse"
            size="small"
          >
            <h3>{truncate(this.props.url, { length: 50 })}</h3>
            <p className="footnote">(Click or share this link)</p>
          </Figure>
        </a>
      );
    }

    return (
      <div className={classnames('embed', this.props.className)}>
        <div
          className={classnames('wrapper', {
            'flex-center-xy': !this.state.title,
            bordered: this.state.title,
            rounded: this.state.title,
          })}
        >
          {embed}
        </div>
      </div>
    );
  }
}

Embed.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
};

Embed.defaultProps = {
  className: null,
};

export default Embed;
