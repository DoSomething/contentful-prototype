import React from 'react';
import PropTypes from 'prop-types';

import { ModalControls } from '../../Modal';
import VoterRegistrationActionContainer from '../../Actions/VoterRegistrationAction';

const VoterRegistrationModal = (props) => {
  const content = 'Register to vote and encourage friends to do the same. YOU have the power to elect the officials who will create the future YOU want to see. Get loud in 2018.';
  const link = 'https://dosomething.turbovote.org/?r=user:{northstarId},campaignID:{campaignId},campaignRunID:{campaignRunId},source:{source}';

  return (
    <div className="modal__slide">
      <ModalControls onClose={props.closeModal}>
        <VoterRegistrationActionContainer content={content} link={link} />
      </ModalControls>
    </div>
  );
};

VoterRegistrationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default VoterRegistrationModal;
