import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

import AccountRoute from './AccountRoute';
import AccountNavigation from './AccountNavigation';
import { featureFlag } from '../../../../helpers/env';
import ScrollConcierge from '../../../ScrollConcierge';
import SiteFooter from '../../../utilities/SiteFooter/SiteFooter';
import SiteNavigation from '../../../SiteNavigation/SiteNavigation';

const Account = props => (
  <>
    <ScrollConcierge />

    <SiteNavigation />

    <main>
      <article className="account-page">
        {!featureFlag('account_landing_page') ? (
          <header className="base-12-grid bg-gray-100 py-3 md:py-6">
            <div className="grid-wide pt-12">
              <h1 className="font-league-gothic font-normal text-4xl md:text-5xl uppercase">
                Welcome, {props.user.firstName}!
              </h1>
            </div>
          </header>
        ) : null}

        {!featureFlag('account_landing_page') ? (
          <AccountNavigation {...props} />
        ) : null}

        <div
          className={classNames('base-12-grid py-3 md:py-6', {
            'bg-white': !featureFlag('account_landing_page'),
          })}
        >
          {/* Account landing page breadcrumb link: */}
          {featureFlag('account_landing_page') ? (
            <div className="grid-wide-2/3 pb-1">
              <Link
                to="/us/account"
                className="font-bold no-underline hover:no-underline"
              >
                My Account
              </Link>{' '}
              <span className="font-bold">/</span>
            </div>
          ) : null}

          <AccountRoute {...props} />
        </div>
      </article>
    </main>

    <SiteFooter />
  </>
);

Account.propTypes = {
  user: PropTypes.shape({
    firstName: PropTypes.string,
  }).isRequired,
};

export default Account;
