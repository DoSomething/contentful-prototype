import React from 'react';
import tw from 'twin.macro';
import Head from 'next/head';
import Link from 'next/link';

import { withApollo } from '../resources/assets/withApollo';
import GeneralPage from '../resources/assets/components/utilities/GeneralPage';
import ArticleHeader from '../resources/assets/components/utilities/ArticleHeader';

// Some little layout helper(s):
const Section = tw.div`my-6`;

const Homepage = () => {
  return (
    <GeneralPage>
      <Head>
        <title>Next.js Prototype</title>
      </Head>
      <ArticleHeader title="Next.js Prototype" />
      <Section>
        <p>
          Welcome to our <a href="http://nextjs.org">Next.js</a> prototype!
        </p>
        <ul css={tw`list-disc`}>
          <li>
            <Link href="us/join?user_id=5543dfd6469c64ec7d8b46b3&campaign_id=9052">
              <a>Referral page</a>
            </Link>{' '}
            (on-demand server-rendered)
          </li>
          <li>
            <Link href="us/facts/11-facts-about-animal-testing">
              <a>11 Facts Page</a>
            </Link>{' '}
            (static server-rendered)
          </li>
        </ul>
      </Section>
    </GeneralPage>
  );
};

export default withApollo({ ssr: true })(Homepage);
