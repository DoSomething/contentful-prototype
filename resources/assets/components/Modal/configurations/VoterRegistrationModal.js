import React from 'react';
import PropTypes from 'prop-types';

import { set } from '../../../helpers/storage';
import { ModalControls } from '../../Modal';
import VoterRegistrationActionContainer from '../../actions/VoterRegistrationAction';

class VoterRegistrationModal extends React.Component {
  componentWillUnmount() {
    // @see: ModalLauncher.js
    set(`${this.props.northstarId}_dismissed_voter_reg_modal`, 'timestamp', Date.now());
  }

  render() {
    const content = 'Register to vote and encourage friends to do the same. YOU have the power to elect the officials who will create the future YOU want to see. Get loud in 2018.';
    const link = 'https://dosomething.turbovote.org/?r=user:{northstarId},campaignID:{campaignId},campaignRunID:{campaignRunId},source:{source}';

    return (
      <ModalControls className="modal__slide" onClose={this.props.closeModal}>
        <VoterRegistrationActionContainer content={content} link={link} contentfulId="static-voter-reg-modal" />
      </ModalControls>
    );
  }
}

VoterRegistrationModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  northstarId: PropTypes.string.isRequired,
};

export default VoterRegistrationModal;
