import React from 'react';
import PropTypes from 'prop-types';
import { closeModal } from '../../actions';
import RenderModalInBody from './RenderModalInBody';

// TODO: Way of dynamically doing this.
import AffirmationContainer from '../../containers/AffirmationContainer';
import CompetitionContainer from '../../containers/CompetitionContainer';

import './modal.scss';

const MODAL_ID = 'modal';

const Modal = (props) => {
  const { shouldShowModal, competitionStep } = props;

  const onBackgroundClick = (event) => {
    if (event.target.id === MODAL_ID) props.closeModal();
  };

  /* eslint-disable jsx-a11y/no-static-element-interactions */
  return (
    <RenderModalInBody shouldShowModal={shouldShowModal}>
      <div id={MODAL_ID} className="modal" onClick={onBackgroundClick}>
        <div className="modal__container">
          <div className="modal__slide">
            <AffirmationContainer />
          </div>
          <div className="modal__slide">
            <CompetitionContainer
              content={competitionStep.content}
              photo={competitionStep.photos[0]}
              byline={competitionStep.additionalContent}
            />
          </div>
          <div className="modal__exit" onClick={props.closeModal}>&times;</div>
        </div>
      </div>
    </RenderModalInBody>
  );
};

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
  }).isRequired,
};

Modal.defaultProps = {
  competitionStep: {
    photo: null,
  },
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
