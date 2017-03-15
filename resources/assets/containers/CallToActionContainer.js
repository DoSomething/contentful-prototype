import { connect } from 'react-redux';
import CallToActionBlock from '../components/CallToActionBlock';
import {
  clickedSignUp,
} from '../actions';

const mapStateToProps = (state) => {
  return {
    campaign: state.campaign,
    signups: state.signups,
    user: state.user,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickedSignUp: (campaignId) => {
      dispatch(clickedSignUp(campaignId));
    },
  }
}

const CallToActionContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CallToActionBlock);

export default CallToActionContainer;
