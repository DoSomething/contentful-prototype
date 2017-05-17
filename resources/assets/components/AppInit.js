import { connect } from 'react-redux';
import { appInit } from '../actions';

const mapStateToProps = () => ({});
const actionCreators = { appInit };

const AppInit = (props) => {
  props.appInit();
  return null;
};

export default connect(mapStateToProps, actionCreators)(AppInit);
