import React from 'react';
import tw from 'twin.macro';
import { Link } from 'gatsby';

import GeneralPage from '../../resources/assets/components/utilities/GeneralPage';
import ArticleHeader from '../../resources/assets/components/utilities/ArticleHeader';

// Some little layout helper(s):
const Section = tw.div`my-6`;

const Homepage = () => {
  return (
    <GeneralPage>
      <ArticleHeader title="Gatsby.js Prototype" />
      <Section>
        <p>
          Welcome to our <a href="https://www.gatsbyjs.org">Gatsby.js</a>{' '}
          prototype!
        </p>
        <ul css={tw`list-disc`}>
          <li>
            <Link to="us/join/?user_id=5543dfd6469c64ec7d8b46b3&campaign_id=9052">
              Referral page
            </Link>{' '}
            (on-demand server-rendered)
          </li>
        </ul>
      </Section>
    </GeneralPage>
  );
};

export default Homepage;
