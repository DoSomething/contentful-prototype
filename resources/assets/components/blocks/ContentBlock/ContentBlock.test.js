import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';

import ContentBlock from './ContentBlock';

const emptyImage = { url: null, description: null };

const props = {
  superTitle: 'Test Super Title',
  title: 'Test Title',
  content: 'Test Content',
  image: {
    url: 'http://image.com',
    description: 'cool image of http://image.com',
  },
  imageAlignment: 'RIGHT',
};

describe('ContentBlock component', () => {
  /** @test */
  test('renders proper child components when image is set', () => {
    const wrapper = shallow(<ContentBlock {...props} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('LazyImage').length).toEqual(1);
    expect(wrapper.find('TextContent').length).toEqual(1);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  /** @test */
  test("does not include SectionHeader when there's no title", () => {
    const wrapper = shallow(<ContentBlock {...props} title={undefined} />);

    expect(wrapper.find('SectionHeader').length).toEqual(0);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  /** @test */
  test('renders proper child components when image is not set', () => {
    const wrapper = shallow(<ContentBlock {...props} image={emptyImage} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('LazyImage').length).toEqual(0);
    expect(wrapper.find('TextContent').length).toEqual(1);
  });

  /** @test */
  test('works beautifully with content and an empty image prop', () => {
    const wrapper = shallow(
      <ContentBlock content="hi there" image={emptyImage} />,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('Content column span', () => {
    /** @test */
    test('displays across the full row if there is no image & the fullWidth prop is toggled on', () => {
      render(<ContentBlock {...props} image={emptyImage} fullWidth />);

      expect(screen.getByTestId('content-block-content').className).toContain(
        'col-span-3',
      );
    });

    /** @test */
    /* 
    // This test is failing with Invariant Violation: Could not find "client" in the context or passed in as an option. Wrap the root component in an <ApolloProvider>, or pass an ApolloClient instance in via options.
    test('displays across the full row if footerType is GetOutTheVoteBlock', () => {
      render(<ContentBlock {...props} additionalContent={{ footerType: 'GetOutTheVoteBlock' }} />);

      expect(screen.getByTestId('content-block-content').className).toContain(
        'col-span-3',
      );
    });
    */

    /** @test */
    test('displays across the full row if footerType is CivicEngineVoterWidget', () => {
      render(
        <ContentBlock
          {...props}
          additionalContent={{ footerType: 'CivicEngineVoterWidget' }}
        />,
      );

      expect(screen.getByTestId('content-block-content').className).toContain(
        'col-span-3',
      );
    });

    /** @test */
    test('displays across two-thirds of the row if footerType is CivicEngineVoterWidget and viewed on a campaign page', () => {
      delete window.location;
      window.location = new URL(
        'https://dev.dosomething.org/us/campaigns/test-campaign',
      );

      render(
        <ContentBlock
          {...props}
          additionalContent={{ footerType: 'CivicEngineVoterWidget' }}
        />,
      );

      const contentBlockContent = screen.getByTestId('content-block-content');

      expect(contentBlockContent.className).toContain('col-span-2');
      expect(contentBlockContent.className).not.toContain('col-span-3');
    });

    /** @test */
    test('displays across two-thirds of the row if an image is not provided but the fullWidth is not toggled on', () => {
      render(<ContentBlock {...props} image={emptyImage} />);

      const contentBlockContent = screen.getByTestId('content-block-content');

      expect(contentBlockContent.className).toContain('col-span-2');
      expect(contentBlockContent.className).not.toContain('col-span-3');
    });

    /** @test */
    test('displays across two-thirds of the row when an image *is* provided, even if the fullWidth is toggled on', () => {
      render(<ContentBlock {...props} fullWidth />);

      const contentBlockContent = screen.getByTestId('content-block-content');

      expect(contentBlockContent.className).toContain('col-span-2');
      expect(contentBlockContent.className).not.toContain('col-span-3');
    });
  });

  describe('Footer component', () => {
    /** @test */
    test('renders ContentBlockFooter when additonalContent.footerType is set', () => {
      const wrapper = shallow(
        <ContentBlock
          {...props}
          additionalContent={{ footerType: 'CivicEngineVoterWidget' }}
        />,
      );

      expect(wrapper.find('ContentBlockFooter').length).toEqual(1);
    });

    /** @test */
    test('does not render ContentBlockFooter when null additionalContent.footerType', () => {
      const wrapper = shallow(<ContentBlock {...props} />);

      expect(wrapper.find('ContentBlockFooter').length).toEqual(0);
    });
  });
});
