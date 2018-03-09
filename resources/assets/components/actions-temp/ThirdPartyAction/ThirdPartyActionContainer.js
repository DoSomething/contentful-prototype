import { connect } from 'react-redux';

import ThirdPartyAction from './ThirdPartyAction';

const mapStateToProps = state => ({
  userId: state.user.id,
});

export default connect(mapStateToProps)(ThirdPartyAction);
