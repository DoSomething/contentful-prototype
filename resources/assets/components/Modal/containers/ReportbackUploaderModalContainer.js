import { connect } from 'react-redux';
import ReportbackUploaderModal from '../configurations/ReportbackUploaderModal';
import { closeModal } from '../../../actions/modal';

const actionCreators = {
  closeModal,
};

export default connect(null, actionCreators)(ReportbackUploaderModal);
