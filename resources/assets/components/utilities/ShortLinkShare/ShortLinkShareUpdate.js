import React, { useState, useRef, useEffect } from 'react';
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

const ShortLinkShareUpdate = ({
  campaignId,
  link,
  onChange,
  pageId,
  queryOptions,
  token,
  userId,
}) => {
  /**
   * Replaces any userId tokens, and appends query string if given.
   *
   * @param {Object} query
   * @return {String}
   */
  const getLongUrl = query => {
    const result = dynamicString(link, {
      userId,
    });

    return query ? appendToQuery(query, result).href : result;
  };

  const [shortUrl, setShortUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [longUrl, setLongUrl] = useState(getLongUrl());

  // const onChange = () => props.onChange(shortUrl);

  /**
   * Executes API request to shorten given longUrl, and saves result to shortUrl on state.
   *
   * Debounce the API request to shorten our long URL.
   * @see https://gist.github.com/simonw/c29de00c20fde731243cbac8568a3d7f
   *
   * @param {String} fullUrl
   */
  const getShortUrl = debounce(fullUrl => {
    setLoading(true);

    postRequest(env('BERTLY_URL'), { url: withoutTokens(fullUrl) }, token)
      .then(apiResponse => {
        setLoading(false);
        setShortUrl(apiResponse.url_short);
        onChange(shortUrl);
      })
      .catch(() => {
        setLoading(false);
        // Fallback to the long URL if API request fails.
        setShortUrl(fullUrl);
        onChange(shortUrl);
      });
  }, 300);

  const linkInput = useRef();

  const handleCopyLinkClick = () => {
    linkInput.current.select();

    document.execCommand('copy');

    trackAnalyticsEvent('clicked_copy_to_clipboard', {
      action: 'button_clicked',
      category: EVENT_CATEGORIES.campaignAction,
      label: 'copy_to_clipboard',
      context: {
        campaignId,
        pageId,
        url: link,
      },
    });
  };

  useEffect(() => {
    getShortUrl(longUrl);
  }, [longUrl]);

  return (
    <div className="short-link-share">
      {queryOptions ? (
        React.cloneElement(queryOptions, {
          onChange: queryStr => setLongUrl(getLongUrl(queryStr)),
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
            ref={linkInput}
            className="text-field link"
            value={loading ? 'Loading...' : shortUrl}
            disabled={loading}
          />

          <button
            type="button"
            className="text-field link-copy-button py-2"
            onClick={handleCopyLinkClick}
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
};

ShortLinkShareUpdate.propTypes = {
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

ShortLinkShareUpdate.defaultProps = {
  campaignId: null,
  onChange: () => {},
  pageId: null,
  queryOptions: null,
};

export default ShortLinkShareUpdate;
