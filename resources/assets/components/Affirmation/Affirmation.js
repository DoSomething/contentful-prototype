import PropTypes from 'prop-types';
import React from 'react';
import { FlexCell } from '../Flex';
import Highlight from '../Highlight';
import { Figure } from '../Figure';
import Wrapper from '../Wrapper';
import { hideAffirmation } from '../../actions';
import ShareContainer from '../../containers/ShareContainer';
import './affirmation.scss';

const Affirmation = (props) => {
  const { content, shouldShowAffirmation } = props;
  if (! shouldShowAffirmation) return null;

  return (
    <FlexCell width="full">
      <div className="affirmation inverted">
        <Wrapper width="feed">
          <div className="affirmation__section affirmation__section-heading">
            <Highlight>{ content.header }</Highlight>
          </div>
          <div className="affirmation__section affirmation__section-quote">
            <Figure image={content.photo} alt={content.author} alignment="left">
              <p>{ content.quote }</p>
              <span>- { content.author }</span>
            </Figure>
          </div>
          <div className="affirmation__section affirmation__section-share">
            <div className="affirmation__block">
              <h3>{ content.callToActionHeader }</h3>
              <p>{ content.callToActionDescription }</p>
            </div>
            <div className="affirmation__block">
              <ShareContainer variant="blue" parentSource="affirmation" />
            </div>
          </div>
        </Wrapper>
        <button className="affirmation__exit" onClick={props.hideAffirmation}>&times;</button>
      </div>
    </FlexCell>
  );
};

Affirmation.propTypes = {
  content: PropTypes.shape({
    header: PropTypes.string,
    photo: PropTypes.string,
    author: PropTypes.string,
    quote: PropTypes.string,
    callToActionHeader: PropTypes.string,
    callToActionDescription: PropTypes.string,
  }),
  shouldShowAffirmation: PropTypes.bool.isRequired,
  hideAffirmation: PropTypes.func.isRequired,
};

// @TODO: Only have this in place because not all campaigns have Affirmation content yet.
// So delete this later when its safe.
Affirmation.defaultProps = {
  content: {
    header: '',
    photo: '',
    author: '',
    quote: '',
    callToActionHeader: '',
    callToActionDescription: '',
  },
};

Affirmation.mapStateToProps = state => ({
  shouldShowAffirmation: state.signups.shouldShowAffirmation,
  content: state.campaign.affirmation,
});

Affirmation.actionCreators = {
  hideAffirmation,
};

export default Affirmation;
