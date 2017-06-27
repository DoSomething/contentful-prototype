import React from 'react';
import PropTypes from 'prop-types';
import Portal from 'react-portal';
import { closeModal } from '../../actions';
import './modal.scss';

import AffirmationContainer from '../../containers/AffirmationContainer';
import CompetitionContainer from '../../containers/CompetitionContainer';

class Modal extends React.Component {
  constructor() {
    super();

    this.handleOverlayClick = this.handleOverlayClick.bind(this);
  }

  handleOverlayClick(event) {
    if (event.target !== this.node) {
      return;
    }

    this.props.closeModal();
  }

  render() {
    const { shouldShowModal, competitionStep } = this.props;

    // @TODO: These should be injected from outside this component.
    const children = [
      <AffirmationContainer key="affirmation" />,
    ];
    if (competitionStep) {
      children.push(
        <CompetitionContainer
          key="competition"
          content={competitionStep.content}
          photo={competitionStep.photos[0]}
          byline={competitionStep.additionalContent}
        />,
      );
    }

    return (
      <Portal closeOnEsc isOpened={shouldShowModal}>
        <div className="modal" role="presentation" ref={node => this.node = node} onClick={this.handleOverlayClick}>
          <div className="modal__container">
            { children.map(child => <div key={child.key} className="modal__slide">{child}</div>) }
            <button className="modal__exit" onClick={this.props.closeModal}>×</button>
          </div>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  shouldShowModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  competitionStep: PropTypes.shape({
    content: PropTypes.string.isRequired,
    photo: PropTypes.string,
    additionalContent: PropTypes.shape({
      author: PropTypes.string.isRequired,
      jobTitle: PropTypes.string.isRequired,
      avatar: PropTypes.string.isRequired,
    }).isRequired,
  }),
};

Modal.defaultProps = {
  competitionStep: null,
};


Modal.mapStateToProps = state => ({
  shouldShowModal: state.modal.shouldShowModal,
  competitionStep: state.campaign.actionSteps.find(step => (
    step.customType && step.customType[0] === 'competition'
  )),
});

Modal.actionCreators = {
  closeModal,
};

export default Modal;
