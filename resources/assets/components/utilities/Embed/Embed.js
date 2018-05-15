/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import { truncate } from 'lodash';
import classnames from 'classnames';
import { Phoenix } from '@dosomething/gateway';

import linkIcon from './linkIcon.svg';
import { isExternal, withoutTokens } from '../../../helpers';
import LazyImage from '../LazyImage';
import PlaceholderText from '../PlaceholderText/PlaceholderText';

import './embed.scss';

class Embed extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: null };
    this.phoenix = new Phoenix();
  }

  componentDidMount() {
    this.phoenix
      .get('next/embed', { url: withoutTokens(this.props.url) })
      .then(data => this.setState({ data }));
  }

  render() {
    const { url, badged, className } = this.props;
    const { data } = this.state;

    const code = data ? data.code : null;
    const image = data ? data.image : null;

    // If an <iframe> code snippet is provided, use that.
    // Otherwise, fill in our "embed card".
    const embed = code ? (
      <div className="media-video" dangerouslySetInnerHTML={{ __html: code }} />
    ) : (
      <a
        href={url}
        className="embed__linker"
        target={isExternal(url) ? '_blank' : '_self'}
        rel="noopener noreferrer"
      >
        <div className="embed">
          <LazyImage className="embed__image" src={image} asBackground />
          <div className="embed__content padded">
            <div className="margin-vertical-md margin-right-md">
              <h3 className="line-break">
                {data ? (
                  truncate(data.title, { length: 60 })
                ) : (
                  <PlaceholderText size="medium" />
                )}
              </h3>
              <p className="color-gray">
                {data ? (
                  truncate(data.description, { length: 240 })
                ) : (
                  <PlaceholderText size="large" />
                )}
              </p>
              <p className="footnote font-bold caps-lock">
                {data ? data.provider.name : <PlaceholderText size="small" />}
              </p>
            </div>
          </div>
          {badged ? (
            <div className="button embed__badge flex-center-xy">
              <img src={linkIcon} alt="link" />
            </div>
          ) : null}
        </div>
      </a>
    );

    return (
      <div className={classnames('bordered', 'rounded', 'bg-white', className)}>
        {embed}
      </div>
    );
  }
}

Embed.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string.isRequired,
  badged: PropTypes.bool,
};

Embed.defaultProps = {
  className: null,
  badged: false,
};

export default Embed;
