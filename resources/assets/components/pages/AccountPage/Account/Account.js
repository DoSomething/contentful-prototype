import { get } from 'lodash';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import AccountRoute from './AccountRoute';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../../../SiteNavigation/SiteNavigation';
import {
  trackAnalyticsEvent,
  EVENT_CATEGORIES,
} from '../../../../helpers/analytics';

const Account = props => {
  const location = useLocation();

  useEffect(() => {
    if (get(location, 'state.scrollToTop')) {
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <>
      <SiteNavigation />

      <main>
        <article className="account-page base-12-grid py-3 md:py-6">
          {/* Account landing page breadcrumb link: */}
          <div className="grid-wide-2/3 pb-1">
            <Link
              to="/us/account"
              className="font-bold no-underline hover:no-underline"
              onClick={() =>
                trackAnalyticsEvent('clicked_breadcrumb_link_my_account', {
                  action: 'link_clicked',
                  category: EVENT_CATEGORIES.navigation,
                  label: 'breadcrumb_my_account',
                  context: {
                    url: `${window.location.origin}/us/account`,
                  },
                })
              }
            >
              My Account
            </Link>{' '}
            <span className="font-bold">/</span>
          </div>

          <AccountRoute {...props} />
        </article>
      </main>

      <SiteFooter />
    </>
  );
};

Account.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Account;
