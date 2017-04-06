import React from 'react';
import { FlexCell } from '../Flex';
import Highlight from '../Highlight';
import { Figure } from '../Figure';
import { Wrapper } from '../Wrapper';
import ShareContainer from '../../containers/ShareContainer';
import { EMPTY_IMAGE } from '../../helpers';
import './affirmation.scss';

const Affirmation = (props) => {
  if (! props.showAffirmation) return null;

  return (
    <FlexCell width="full">
      <div className="affirmation">
        <Wrapper width="feed">
          <div className="affirmation__section affirmation__section-heading">
            <Highlight>{ props.header }</Highlight>
          </div>
          <div className="affirmation__section affirmation__section-quote">
            <Figure image={props.photo} alt={props.author} alignment="left">
              <p>{ props.quote }</p>
              <span>- { props.author }</span>
            </Figure>
          </div>
          <div className="affirmation__section affirmation__section-share">
            <div className="affirmation__block">
              <h3>{ props.ctaHeader }</h3>
              <p>{ props.ctaDescription }</p>
            </div>
            <div className="affirmation__block">
              <ShareContainer variant="blue" parentSource="affirmation" />
            </div>
          </div>
        </Wrapper>
        <a className="affirmation__exit" href="#" onClick={props.hideAffirmation}>&times;</a>
      </div>
    </FlexCell>
  );
}

//TODO: Replace these default strings with content from Contentful
Affirmation.defaultProps = {
  header: 'THANKS SO MUCH!',
  quote: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`,
  author: 'Puppet Sloth, 29',
  photo: EMPTY_IMAGE,
  ctaHeader: 'Rally your friends',
  ctaDescription: 'Every share can make a difference.',
};

export default Affirmation;
