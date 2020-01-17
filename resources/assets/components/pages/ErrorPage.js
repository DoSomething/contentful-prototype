import React from 'react';

import SiteFooter from '../utilities/SiteFooter/SiteFooter';
import SiteNavigationContainer from '../SiteNavigation/SiteNavigationContainer';

const ErrorPage = () => (
  <>
    <SiteNavigationContainer />

    <main role="main" className="py-20">
      <article className="error-page max-w-xl mx-auto text-center px-4 leading-relaxed mb-8">
        <header className="mb-8">
          <h2 className="text-purple-900 text-xl md:text-2xl mb-2">
            Something went wrong.
          </h2>

          <h3 className="text-lg">
            We&apos;ve noted the problem & will get it fixed soon!
          </h3>
        </header>

        <p className="mb-8">
          Try doing the same thing again - it may work the second time! If not,
          we&apos;ve already noted the problem and our tech team will get it
          fixed as soon as possible! You can also find ways to{' '}
          <a href="/us/campaigns?utm_source=500">Take Action</a> and join a
          movement of 5 million young people making an impact in their
          communities.
        </p>

        <p className="text-sm text-gray-800 m-0">
          If you continue to run into problems, contact our{' '}
          <a
            href="https://help.dosomething.org"
            className="font-semibold text-gray-800 hover:text-gray-400 underline"
          >
            support squad
          </a>
          !
        </p>
      </article>
    </main>

    <SiteFooter />
  </>
);

export default ErrorPage;
