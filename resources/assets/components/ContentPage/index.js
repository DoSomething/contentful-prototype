import React from 'react';
import Block from '../Block';
import Markdown from '../Markdown';
import CallToActionContainer from '../../containers/CallToActionContainer';
import { Flex, FlexCell } from '../Flex';

import './content-page.scss';

const ContentPage = ({ pages, route }) => {
  const page = pages.find(page => page.fields.slug === route.page);

  // @TODO: temporary variables until these CTAs are no longer hardcoded.
  const ctaText1 = 'Help us send letters of support to every mosque in the US.\nJoin hundreds of members members making cards!';
  const ctaText2 = 'Help us send letters of support to every mosque in the United States.';

  return (
    <div className="content-page">
      <div className="primary">
        <article>
          <h2 className="visually-hidden">{page.fields.title}</h2>
          <Markdown>{page.fields.content}</Markdown>
        </article>
      </div>
      <div className="secondary">
        <CallToActionContainer fields={ {title: 'something', content: ctaText1} } />
      </div>

      <CallToActionContainer fields={ {title: ctaText2} } />
    </div>
  );
};

export default ContentPage;
