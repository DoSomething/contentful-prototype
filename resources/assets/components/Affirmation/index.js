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
  header: '🙌 THANKS FOR JOINING! 🙌',
  quote: `You doing this means so much to my community. Thank you so much for doing this simple action. Ramadan is a special time for us and this just makes it even more special.`,
  author: 'Usra, Maryland',
  photo: 'https://static.dosomething.org/img/sincerely-us-member-quote.jpg',
  ctaHeader: 'Rally your friends!',
  ctaDescription: 'To send a card to every mosque in the US, we’ll need their help. Share this campaign now!',
};

export default Affirmation;
