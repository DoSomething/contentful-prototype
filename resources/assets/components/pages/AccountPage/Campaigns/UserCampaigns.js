import React from 'react';
import { get } from 'lodash';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { Switch, Route, Redirect } from 'react-router-dom';

import Query from '../../../Query';
import { getUserId } from '../../../../helpers/auth';
import { tailwind } from '../../../../helpers/display';
import { groupUserCampaignSignups } from '../../../../helpers/campaign';
import SectionHeader from '../../../utilities/SectionHeader/SectionHeader';
import NavigationLink from '../../../utilities/NavigationLink/NavigationLink';
import CampaignCard, {
  campaignCardFragment,
} from '../../../utilities/CampaignCard/CampaignCard';

const USER_CAMPAIGNS_QUERY = gql`
  query UserCampaignsQuery($userId: String!) {
    paginatedSignups(userId: $userId, first: 100) {
      edges {
        node {
          id
          createdAt
          campaign {
            id
            endDate
            campaignWebsite {
              ...CampaignCard
            }
            actions {
              id
              scholarshipEntry
              reportback
            }
          }
          posts {
            id
            status
            createdAt
            actionDetails {
              id
              scholarshipEntry
              reportback
            }
          }
        }
      }
    }
  }

  ${campaignCardFragment}
`;

const UserCampaignsGallery = ({ signups }) => (
  <div className="grid-wide py-3">
    <ul className="gap-8 grid grid-cols-1 md:grid-cols-2 xxl:grid-cols-3">
      {signups.map(signup => (
        <li key={signup.id}>
          <CampaignCard campaign={signup.campaign.campaignWebsite} />
        </li>
      ))}
    </ul>
  </div>
);

UserCampaignsGallery.propTypes = {
  signups: PropTypes.arrayOf(PropTypes.object),
};

UserCampaignsGallery.defaultProps = {
  signups: [],
};

const UserCampaigns = () => (
  <>
    <div className="grid-wide pb-3">
      <SectionHeader title="Campaigns" />
    </div>

    <div className="grid-wide">
      <Query query={USER_CAMPAIGNS_QUERY} variables={{ userId: getUserId() }}>
        {({ paginatedSignups }) => {
          const groupedSignups = groupUserCampaignSignups(
            paginatedSignups.edges.map(edge => edge.node),
          );

          return (
            <>
              <nav
                className="base-12-grid page-navigation pt-3 md:pt-6 -no-fade"
                css={css`
                  border-bottom-width: 2px;
                  // offset some assigned styles for the .page-navigation class:
                  background-color: ${tailwind('colors.gray.100')};
                  border-top: 0;
                  padding-left: 0;
                  padding-right: 0;
                `}
              >
                <div
                  className="grid-wide md:col-start-1 nav-items -mx-3"
                  style={{ float: 'none' }}
                >
                  <NavigationLink to="/us/account/campaigns/incomplete">
                    Incomplete ({get(groupedSignups, 'incomplete', []).length})
                  </NavigationLink>

                  <NavigationLink to="/us/account/campaigns/complete">
                    Complete ({get(groupedSignups, 'complete', []).length})
                  </NavigationLink>

                  {groupedSignups.expired ? (
                    <NavigationLink to="/us/account/campaigns/expired">
                      Expired ({groupedSignups.expired.length})
                    </NavigationLink>
                  ) : null}
                </div>
              </nav>

              <Switch>
                <Route
                  path="/us/account/campaigns/incomplete"
                  render={() => (
                    <UserCampaignsGallery signups={groupedSignups.incomplete} />
                  )}
                />

                <Route
                  exact
                  path="/us/account/campaigns"
                  render={() => (
                    <Redirect to="/us/account/campaigns/incomplete" />
                  )}
                />

                <Route
                  path="/us/account/campaigns/complete"
                  render={() => (
                    <UserCampaignsGallery
                      // Sort signups by most recently submitted post.
                      signups={get(groupedSignups, 'complete', []).sort(
                        (signupA, signupB) =>
                          Date.parse(signupB.posts[0]) -
                          Date.parse(signupA.posts[0]),
                      )}
                    />
                  )}
                />

                {groupedSignups.expired ? (
                  <Route
                    path="/us/account/campaigns/expired"
                    render={() => (
                      <UserCampaignsGallery signups={groupedSignups.expired} />
                    )}
                  />
                ) : null}
              </Switch>
            </>
          );
        }}
      </Query>
    </div>
  </>
);

export default UserCampaigns;
