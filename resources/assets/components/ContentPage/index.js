import React from 'react';
import Block from '../Block';
import Markdown from '../Markdown';
import { Flex, FlexCell } from '../Flex';

const ContentPage = ({ pages, route }) => {
  const page = pages.find(page => page.fields.slug === route.page);

  return (
    <Flex>
      <FlexCell>
        <Block>
          <h2>{page.fields.title}</h2>
          <Markdown>{page.fields.content}</Markdown>
        </Block>
      </FlexCell>
    </Flex>
  );
};

export default ContentPage;
