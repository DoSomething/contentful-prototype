import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import FormItem from './FormItem';
import { env } from '../../../../helpers/env';
import VoterRegStatusBlock from '../VoterReg/VoterRegStatusBlock';
import {
  EVENT_CATEGORIES,
  getPageContext,
  getUtmContext,
  trackAnalyticsEvent,
} from '../../../../helpers/analytics';

const Profile = props => (
  <React.Fragment>
    <div className="grid-wide">
      <h1 className="text-xl">Account</h1>
      <p className="text-gray-600">
        Update your personal information and manage your account.
      </p>
    </div>
    <div className="grid-wide-2/3 my-6">
      <h2 className="text-lg">Profile Info</h2>
      <FormItem
        title="Name"
        value={`${props.user.firstName} ${props.user.lastName}`}
      />
      {props.user.birthdate ? (
        <FormItem title="Birthday" value={props.user.birthdate} />
      ) : null}
      <FormItem
        title="Password"
        value="&#9679; &#9679; &#9679; &#9679; &#9679; &#9679;"
      />
      <FormItem title="Email" value={props.user.email} />
      {props.user.mobile ? (
        <FormItem title="Phone Number" value={props.user.mobile} />
      ) : null}
      <div className="mt-6">
        <a
          href={`${env('NORTHSTAR_URL')}/users/${props.user.id}/edit`}
          target="_blank"
          rel="noopener noreferrer"
          className="button"
        >
          Edit Profile
        </a>
      </div>
    </div>
    <div className="grid-wide-1/3 my-6">
      <h2 className="text-lg">Registration Status</h2>
      <div className="my-3">
        <VoterRegStatusBlock userId={props.user.id} />
      </div>
      <h2 className="text-lg">Data and Privacy</h2>
      <ul className="mt-3">
        <li>
          <Link
            to="/us/account/delete"
            className="text-gray-600 font-normal underline"
          >
            Delete my account
          </Link>
        </li>
      </ul>

      <h2 className="text-lg">Administration</h2>
      <ul className="mt-3">
        <li>
          <a
            href="/deauthorize"
            className="text-gray-600 font-normal underline"
            onClick={() =>
              trackAnalyticsEvent('clicked_nav_link_log_out', {
                action: 'link_clicked',
                // @TODO: we should rename the category to "authentication"
                category: EVENT_CATEGORIES.navigation,
                label: 'log_out',
                context: {
                  ...getPageContext(),
                  ...getUtmContext(),
                },
              })
            }
          >
            Log Out
          </a>
        </li>
      </ul>
    </div>
  </React.Fragment>
);

Profile.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
    mobile: PropTypes.string,
    birthdate: PropTypes.string,
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Profile;
