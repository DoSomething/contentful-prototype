import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { PuckWaypoint } from '@dosomething/puck-client';

import PostForm from '../PostForm';
import Card from '../../utilities/Card/Card';
import Embed from '../../utilities/Embed/Embed';
import Modal from '../../utilities/Modal/Modal';
import Button from '../../utilities/Button/Button';
import ContentfulEntry from '../../ContentfulEntry';
import { formatPostPayload } from '../../../helpers/forms';
import { trackAnalyticsEvent } from '../../../helpers/analytics';
import { SOCIAL_SHARE_TYPE } from '../../../constants/post-types';
import TextContent from '../../utilities/TextContent/TextContent';
import {
  dynamicString,
  loadFacebookSDK,
  showFacebookShareDialog,
  showTwitterSharePrompt,
  withoutNulls,
} from '../../../helpers';
import Badge from '../../pages/AccountPage/Badge';
import Query from '../../Query';

export const ShareBlockFragment = gql`
  fragment ShareBlockFragment on ShareBlock {
    actionId
    title
    socialPlatform
    content
    link
    hideEmbed
    affirmationBlock {
      id
    }
    affirmation
    additionalContent
  }
`;

const BADGE_QUERY = gql`
  query AccountQuery($userId: String!) {
    user(id: $userId) {
      hasBadgesFlag: hasFeatureFlag(feature: "badges")
    }
  }
`;

const POST_COUNT_BADGE = gql`
  query PostsCountQuery($userId: String!) {
    postsCount(userId: $userId, limit: 4)
  }
`;

class ShareAction extends PostForm {
  state = { showModal: false };

  componentDidMount() {
    // If this is a Facebook share action, make sure we load SDK.
    if (this.props.socialPlatform === 'facebook') {
      loadFacebookSDK();
    }
  }

  storeSharePost = async puckId => {
    const action = get(this.props.additionalContent, 'action', 'default');

    const { actionId, pageId, campaignId, link } = this.props;

    const formFields = withoutNulls({
      action, // @TODO: deprecate
      type: SOCIAL_SHARE_TYPE,
      id: pageId, // @TODO: rename property to pageId? Other actions use the blockId?
      action_id: actionId,
      school_id: await this.getUserActionSchoolId(),
      details: {
        url: link,
        platform: 'facebook',
        campaign_id: campaignId,
        puck_id: puckId,
      },
    });

    // Send request to store the social share post.
    this.props.storeCampaignPost(campaignId, {
      action, // @TODO: deprecate
      actionId,
      blockId: this.props.id,
      body: formatPostPayload(formFields),
      pageId,
      type: SOCIAL_SHARE_TYPE,
    });
  };

  /**
   * Component helper method for tracking analytics events.
   *
   * @param  {String} service
   * @param  {String} target
   * @param  {String} verb
   * @param  {Object} data
   * @return {Void}
   */
  trackEvent = (service, target, verb, data = {}) => {
    trackAnalyticsEvent({
      context: {
        ...data,
        blockId: this.props.id,
        campaignId: this.props.campaignId,
        pageId: this.props.pageId,
      },
      metadata: {
        adjective: service,
        category: 'campaign_action',
        label: service,
        noun: 'share_action',
        target,
        verb,
      },
    });
  };

  handleFacebookClick = url => {
    const { link, userId } = this.props;

    let trackingData = { url: link };

    this.trackEvent('facebook', 'button', 'clicked', trackingData);

    showFacebookShareDialog(url)
      .then(() => {
        // Send share post to Rogue for authenticated users
        if (this.props.isAuthenticated && this.props.campaignId) {
          const puckId = `phoenix_${userId}_${Date.now()}`;

          trackingData = { ...trackingData, puck_id: puckId };

          return this.storeSharePost(puckId);
        }
        return Promise.resolve();
      })
      .then(() => {
        this.trackEvent('facebook', 'action', 'completed', trackingData);

        this.setState({ showModal: true });
      })
      .catch(() => {
        this.trackEvent('facebook', 'action', 'cancelled', trackingData);
      });
  };

  handleTwitterClick = url => {
    this.trackEvent('twitter', 'button', 'clicked', {
      url: this.props.link,
    });

    showTwitterSharePrompt(url, '', () => this.setState({ showModal: true }));
  };

  render() {
    const {
      id,
      affirmation, // @TODO: Rename me to 'affirmationText'?
      affirmationBlock,
      content,
      hideEmbed,
      campaignId,
      link,
      socialPlatform,
      title,
      userId,
    } = this.props;

    const isFacebook = socialPlatform === 'facebook';
    const handleShareClick = isFacebook
      ? this.handleFacebookClick
      : this.handleTwitterClick;

    const href = dynamicString(link, {
      userId,
      northstarId: userId, // @TODO: Remove!
      campaignId,
      campaignRunId: 0,
      source: 'web',
    });

    return (
      <React.Fragment>
        <div className="share-action">
          <PuckWaypoint
            name="share_action-top"
            waypointData={{ blockId: id }}
          />
          <Card title={title} className="rounded bordered">
            {content ? (
              <TextContent className="p-3">{content}</TextContent>
            ) : null}
            {hideEmbed ? null : (
              <div className="p-3">
                <Embed url={link} />
              </div>
            )}
            <Button attached onClick={() => handleShareClick(href)}>
              Share on {isFacebook ? 'Facebook' : 'Twitter'}
            </Button>
          </Card>
          <PuckWaypoint
            name="share_action-bottom"
            waypointData={{ blockId: id }}
          />
        </div>
        {this.state.showModal ? (
          <Modal onClose={() => this.setState({ showModal: false })}>
            {affirmationBlock ? (
              <ContentfulEntry json={affirmationBlock} />
            ) : (
              // @TODO: Refactor this with PostCreatedModal.
              <Card
                title="Thanks for sharing!"
                className="modal__slide bordered rounded"
              >
                <Query
                  query={BADGE_QUERY}
                  variables={{ userId: this.props.userId }}
                  hideSpinner
                >
                  {badgeData =>
                    badgeData.user.hasBadgesFlag ? (
                      <Query
                        query={POST_COUNT_BADGE}
                        variables={{ userId: this.props.userId }}
                        hideSpinner
                      >
                        {postData => {
                          if (postData.postsCount === 1) {
                            return (
                              <Badge
                                earned
                                className="badge p-3"
                                size="medium"
                                name="onePostBadge"
                              >
                                <h4>1 Action</h4>
                                <p>
                                  Ohhh HECK yes! You just earned a new badge for
                                  completing your first campaign.
                                  Congratulations!
                                </p>
                                <a href="/us/account/profile/badges">
                                  View all my badges
                                </a>
                              </Badge>
                            );
                          }
                          if (postData.postsCount === 2) {
                            return (
                              <Badge
                                earned
                                className="badge p-3"
                                size="medium"
                                name="twoPostsBadge"
                              >
                                <h4>2 Actions</h4>
                                <p>
                                  Ohhh HECK yes! You just earned a new badge for
                                  completing your second campaign.
                                  Congratulations!
                                </p>
                                <a href="/us/account/profile/badges">
                                  View all my badges
                                </a>
                              </Badge>
                            );
                          }
                          if (postData.postsCount === 3) {
                            return (
                              <Badge
                                earned
                                className="badge p-3"
                                size="medium"
                                name="threePostsBadge"
                              >
                                <h4>3 Actions</h4>
                                <p>
                                  Ohhh HECK yes! You just earned a new badge for
                                  completing your third campaign.
                                  Congratulations!
                                </p>
                                <a href="/us/account/profile/badges">
                                  View all my badges
                                </a>
                              </Badge>
                            );
                          }

                          return null;
                        }}
                      </Query>
                    ) : null
                  }
                </Query>

                <TextContent className="p-3">{affirmation}</TextContent>
              </Card>
            )}
          </Modal>
        ) : null}
      </React.Fragment>
    );
  }
}

ShareAction.propTypes = {
  actionId: PropTypes.number,
  additionalContent: PropTypes.shape({
    action: PropTypes.string,
  }),
  affirmation: PropTypes.string,
  affirmationBlock: PropTypes.object, // eslint-disable-line
  campaignId: PropTypes.string.isRequired,
  pageId: PropTypes.string.isRequired,
  content: PropTypes.string,
  hideEmbed: PropTypes.bool,
  id: PropTypes.string.isRequired, // @TODO: rename property to blockId
  isAuthenticated: PropTypes.bool.isRequired,
  link: PropTypes.string.isRequired,
  socialPlatform: PropTypes.oneOf(['twitter', 'facebook']).isRequired,
  storeCampaignPost: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.string,
};

ShareAction.defaultProps = {
  actionId: null,
  additionalContent: null,
  affirmation: 'Thanks for rallying your friends on Facebook!',
  content: null,
  hideEmbed: false,
  userId: null,
};

export default ShareAction;
