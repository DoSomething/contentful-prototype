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
  test('Renders proper child components when image is set', () => {
    const wrapper = shallow(<ContentBlock {...props} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('LazyImage').length).toEqual(1);
    expect(wrapper.find('TextContent').length).toEqual(1);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  /** @test */
  test("Does not include SectionHeader when there's no title", () => {
    const wrapper = shallow(<ContentBlock {...props} title={undefined} />);

    expect(wrapper.find('SectionHeader').length).toEqual(0);

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  /** @test */
  test('Renders proper child components when image is not set', () => {
    const wrapper = shallow(<ContentBlock {...props} image={emptyImage} />);

    expect(wrapper.find('SectionHeader').length).toEqual(1);
    expect(wrapper.find('LazyImage').length).toEqual(0);
    expect(wrapper.find('TextContent').length).toEqual(1);
  });

  /** @test */
  test('Works beautifully with content and an empty image prop', () => {
    const wrapper = shallow(
      <ContentBlock content="hi there" image={emptyImage} />,
    );

    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  describe('Content column span', () => {
    /** @test */
    test('Displays across the full row if there is no image & the fullWidth prop is toggled on', () => {
      render(<ContentBlock {...props} image={emptyImage} fullWidth />);

      expect(screen.getByTestId('content-block-content').className).toContain(
        'col-span-3',
      );
    });

    /** @test */
    test('Displays across two-thirds of the row if an image is not provided but the fullWidth is not toggled on', () => {
      render(<ContentBlock {...props} image={emptyImage} />);

      const contentBlockContent = screen.getByTestId('content-block-content');
      expect(contentBlockContent.className).toContain('col-span-2');
      expect(contentBlockContent.className).not.toContain('col-span-3');
    });

    /** @test */
    test('Displays across two-thirds of the row when an image *is* provided, even if the fullWidth is toggled on', () => {
      render(<ContentBlock {...props} fullWidth />);

      const contentBlockContent = screen.getByTestId('content-block-content');
      expect(contentBlockContent.className).toContain('col-span-2');
      expect(contentBlockContent.className).not.toContain('col-span-3');
    });
  });

  describe('Footer type', () => {
    /** @test */
    test('Renders ContentBlockFooter when footerType is set', () => {
      const wrapper = shallow(
        <ContentBlock
          {...props}
          additionalContent={{ footerType: 'RequestBallotBlock' }}
        />,
      );

      expect(wrapper.find('ContentBlockFooter').length).toEqual(1);
    });

    /** @test */
    test('Does not render ContentBlockFooter if footerType is not set', () => {
      const wrapper = shallow(<ContentBlock {...props} />);

      expect(wrapper.find('ContentBlockFooter').length).toEqual(0);
    });
  });
});
