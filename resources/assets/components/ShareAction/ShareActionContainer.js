import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';
import ShareAction from './ShareAction';
import { openModal } from '../../actions/modal';

const actionCreators = {
  openModal,
};

export default connect(null, actionCreators)(PuckConnector(ShareAction));
