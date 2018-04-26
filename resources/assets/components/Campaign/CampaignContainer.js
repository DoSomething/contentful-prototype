import { connect } from 'react-redux';
import { get } from 'lodash';

import Campaign from './Campaign';
import { isSignedUp } from '../../selectors/signup';

const mapStateToProps = (state, props) => {
  const hasLandingPage = state.campaign.landingPage !== null;

  // @TODO: Move these into the pages themselves.
  const { location, match } = props;
  const isQuiz = location.pathname.replace(match.url, '').startsWith('/quiz/');
  const isBlock = location.pathname
    .replace(match.url, '')
    .startsWith('/blocks/');

  const ignoreLandingPage =
    state.admin.shouldShowActionPage || isQuiz || isBlock;
  let shouldShowLandingPage = false;

  if (state.admin.shouldShowLandingPage) {
    shouldShowLandingPage = true;
  } else if (hasLandingPage && !ignoreLandingPage) {
    shouldShowLandingPage = !isSignedUp(state);
  }

  return {
    shouldShowLandingPage,
    featureFlags: get(state.campaign.additionalContent, 'featureFlags'),
  };
};

export default connect(mapStateToProps)(Campaign);
