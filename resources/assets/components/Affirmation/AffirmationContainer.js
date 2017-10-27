import { connect } from 'react-redux';
import Affirmation from './Affirmation';

const mapStateToProps = state => ({
  content: state.campaign.affirmation.fields,
});

export default connect(mapStateToProps)(Affirmation);
