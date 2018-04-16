import React from 'react';
import PropTypes from 'prop-types';

import { set } from '../../../helpers/storage';
import VoterRegistrationActionContainer from '../../actions/VoterRegistrationAction/VoterRegistrationActionContainer';

class VoterRegistrationModal extends React.Component {
  componentWillUnmount() {
    // @see: ModalLauncher.js
    set(
      `${this.props.userId}_dismissed_voter_reg_modal`,
      'timestamp',
      Date.now(),
    );
  }

  render() {
    const content =
      'Your voice matters! Take 2 mins to register to vote. YOU have the power to elect officials who will create the future YOU want to see. If you’re 18 by Nov 6, 2018, you can register to vote RIGHT. NOW.';
    const link =
      'https://dosomething.turbovote.org/?r=user:{northstarId},campaignID:{campaignId},campaignRunID:{campaignRunId},source:{source}';

    return (
      <VoterRegistrationActionContainer
        content={content}
        link={link}
        contentfulId="static-voter-reg-modal"
      />
    );
  }
}

VoterRegistrationModal.propTypes = {
  userId: PropTypes.string.isRequired,
};

export default VoterRegistrationModal;
