import { connect } from 'react-redux';
import { find } from 'lodash';
import PostReportbackModal from '../configurations/PostReportbackModal';
import { closeModal } from '../../../actions/modal';

const mapStateToProps = (state) => {
  const reportbackUploader = find(
    state.campaign.actionSteps, { type: { sys: { id: 'photoUploaderAction' } } },
  );

  return {
    content: reportbackUploader.fields.affirmationContent,
  };
};

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(PostReportbackModal);
