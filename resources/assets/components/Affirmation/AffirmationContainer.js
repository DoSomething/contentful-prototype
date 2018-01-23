import { connect } from 'react-redux';
import Affirmation from './Affirmation';
import { closeModal } from '../../actions/modal';

const mapStateToProps = state => ({
  content: state.campaign.affirmation,
});

const actionCreators = {
  closeModal,
};

export default connect(mapStateToProps, actionCreators)(Affirmation);
