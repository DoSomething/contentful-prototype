import React from 'react';
import { find } from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PuckConnector } from '@dosomething/puck-client';

import Quiz from './Quiz';
import NotFound from '../NotFound';
import Enclosure from '../Enclosure';
import { CallToActionContainer } from '../CallToAction';
import DashboardContainer from '../Dashboard/DashboardContainer';
import LedeBannerContainer from '../LedeBanner/LedeBannerContainer';
import TabbedNavigationContainer from '../Navigation/TabbedNavigationContainer';

/**
 * Provide state from the Redux store as props for this component.
 */
const mapStateToProps = (state, ownProps) => {
  const { slug } = ownProps.match.params;

  const quiz = find(state.campaign.quizzes, { fields: { slug } });

  if (! quiz) {
    return { notFound: true };
  }

  const fields = quiz.fields;

  const additionalContent = fields.additionalContent;

  const { callToAction, introduction, questions, resultBlocks, results,
    showLedeBanner, submitButtonText } = additionalContent;

  return {
    callToAction,
    introduction,
    questions,
    results,
    resultBlocks,
    showLedeBanner,
    submitButtonText,
    dashboard: state.campaign.dashboard,
    title: fields.title,
  };
};

const QuizContainer = props => (
  <div>
    { props.showLedeBanner ? <LedeBannerContainer /> : null }

    <div className="main clearfix">

      { props.dashboard && props.showLedeBanner ? <DashboardContainer /> : null }

      { props.showLedeBanner ? <TabbedNavigationContainer /> : null }

      <Enclosure className="default-container margin-top-xlg margin-bottom-lg">
        {
          props.notFound ? (
            <NotFound />
          ) : (
            <Quiz {...props} />
          )
        }
      </Enclosure>

      { props.showLedeBanner ? <CallToActionContainer sticky hideIfSignedUp /> : null }
    </div>
  </div>
);

QuizContainer.propTypes = {
  dashboard: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    fields: PropTypes.object,
  }),
  notFound: PropTypes.bool,
  showLedeBanner: PropTypes.bool,
};

QuizContainer.defaultProps = {
  dashboard: null,
  notFound: false,
  showLedeBanner: false,
};

// Export the container component.
export default connect(mapStateToProps)(PuckConnector(QuizContainer));
