import React from 'react';
import { FlexCell } from '../Flex';
import Highlight from '../Highlight';
import ShareContainer from '../../containers/ShareContainer';
import { EMPTY_IMAGE } from '../../helpers';
import './affirmation.scss';

class Affirmation extends React.Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    this.state = {
      open: true,
    }
  }

  onClick() {
    this.setState({ open: false });
  }

  render() {
    if (!this.state.open) return null;

    return (
      <FlexCell width="full">
        <div className="affirmation">
          <div className="affirmation__container">
            <div className="affirmation__section affirmation__section-heading">
              <Highlight>{ this.props.header }</Highlight>
            </div>
            <div className="affirmation__section affirmation__section-quote">
              <article className="figure -left">
                <div className="figure__media">
                  <img alt="kitten overlords" src={this.props.photo} />
                </div>
                <div className="figure__body">
                  <p>{ this.props.quote }</p>
                  <span>- { this.props.author }</span>
                </div>
              </article>
            </div>
            <div className="affirmation__section affirmation__section-share">
              <div className="affirmation__block">
                <h3>{ this.props.ctaHeader }</h3>
                <p>{ this.props.ctaDescription }</p>
              </div>
              <div className="affirmation__block">
                <ShareContainer variant="blue" />
              </div>
            </div>
          </div>
          <a className="affirmation__exit" href="#" onClick={this.onClick}>&times;</a>
        </div>
      </FlexCell>
    );
  }
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
