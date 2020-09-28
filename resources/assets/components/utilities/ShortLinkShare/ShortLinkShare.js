/* global document */

import React from 'react';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';

import Embed from '../Embed/Embed';
import LinkIcon from './link-icon.svg';
import { postRequest } from '../../../helpers/api';
import SocialShareTray from '../SocialShareTray/SocialShareTray';
import {
  appendToQuery,
  dynamicString,
  env,
  withoutTokens,
} from '../../../helpers';
import {
  EVENT_CATEGORIES,
  trackAnalyticsEvent,
} from '../../../helpers/analytics';

import './short-link-share.scss';

class ShortLinkShare extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      longUrl: this.getLongUrl(),
      shortUrl: null,
    };

    this.linkInput = React.createRef();

    /**
     * Debounce the API request to shorten our long URL.
     * @see https://gist.github.com/simonw/c29de00c20fde731243cbac8568a3d7f
     */
    this.getShortUrl = debounce(this.getShortUrl, 300);
  }

  componentDidMount() {
    this.getShortUrl(this.state.longUrl);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.longUrl !== prevState.longUrl) {
      this.getShortUrl(this.state.longUrl);
    }
  }

  onChange() {
    this.props.onChange(this.state.shortUrl);
  }

  /**
   * Replaces any userId tokens, and appends query string if given.
   *
   * @param {Object} query
   * @return {String}
   */
  getLongUrl(query) {
    const result = dynamicString(this.props.link, {
      userId: this.props.userId,
    });

    return query ? appendToQuery(query, result).href : result;
  }

  /**
   * Executes API request to shorten given longUrl, and saves result to state.shortUrl.
   *
   * @param {String} longUrl
   */
  getShortUrl(longUrl) {
    this.setState({ loading: true });

    postRequest(
      env('BERTLY_URL'),
      { url: withoutTokens(longUrl) },
      this.props.token,
    )
      .then(apiResponse => {
        this.setState({ loading: false, shortUrl: apiResponse.url_short });
        this.onChange();
      })
      .catch(() => {
        this.setState({
          loading: false,
          // Fallback to the long URL if API request fails.
          shortUrl: longUrl,
        });
        this.onChange();
      });
  }

  handleCopyLinkClick = () => {
    this.linkInput.current.select();

    document.execCommand('copy');

    trackAnalyticsEvent('clicked_copy_to_clipboard', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'copy_to_clipboard',
      context: {
        campaignId: this.props.campaignId,
        pageId: this.props.pageId,
        url: this.props.link,
      },
    });
  };

  render() {
    const { link, queryOptions } = this.props;

    const { loading, longUrl, shortUrl } = this.state;

    return (
      <div className="short-link-share">
        {queryOptions ? (
          React.cloneElement(queryOptions, {
            onChange: queryStr =>
              this.setState({
                longUrl: this.getLongUrl(queryStr),
              }),
          })
        ) : (
          <div className="p-3">
            <Embed url={longUrl} />
          </div>
        )}

        <div className="p-3 link-area">
          <div className="link-bar">
            <input
              readOnly
              type="text"
              ref={this.linkInput}
              className="text-field link"
              value={loading ? 'Loading...' : shortUrl}
              disabled={loading}
            />

            <button
              type="button"
              className="text-field link-copy-button py-2"
              onClick={this.handleCopyLinkClick}
              disabled={loading}
            >
              <img className="mr-1" src={LinkIcon} alt="link" />

              <p className="text-sm font-bold text-white">Copy link</p>
            </button>
          </div>
        </div>

        <SocialShareTray
          shareLink={shortUrl}
          trackLink={link}
          title={queryOptions ? null : 'Share on Social Media'}
        />
      </div>
    );
  }
}

ShortLinkShare.propTypes = {
  campaignId: PropTypes.string,
  link: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  pageId: PropTypes.string,
  /**
   * This prop expects a React component to allow user customization of link prop's query string.
   * @see /resources/assets/components/pages/VoterRegistrationDrivePage/Alpha/AlphaPage
   */
  queryOptions: PropTypes.element,
  token: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
};

ShortLinkShare.defaultProps = {
  campaignId: null,
  onChange: () => {},
  pageId: null,
  queryOptions: null,
};

export default ShortLinkShare;
