import React from 'react';
import PropTypes from 'prop-types';

import { isTimestampValid, env, query } from '../../../helpers';
import { get as getStorage, set as setStorage } from '../../../helpers/storage';

class FeatureLauncher extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showFeature: false };
  }

  componentDidMount() {
    const { countdown, type } = this.props;

    // If the query params indicate to store the feature modal to be hidden, store it.
    if (query(`hide_${type}`) === '1') {
      setStorage(`hide_${type}`, 'boolean', true);
    }

    if (this.shouldSeeFeature()) {
      this.timer = setTimeout(() => {
        this.setState({ showFeature: true });
      }, countdown * 1000);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  shouldSeeFeature = () => {
    const { type } = this.props;

    let shouldNotSee = getStorage(`hide_${type}`, 'boolean');
    // Support for legacy nps survey 'hide feature' storage format.
    if (type === 'nps_survey' && !shouldNotSee) {
      shouldNotSee = getStorage('finished_survey', 'boolean');
    }

    // Check if the survey was dismissed over 30 days ago.
    const dismissalTime = getStorage(`dismissed_${type}`, 'timestamp');
    const isDismissed = isTimestampValid(dismissalTime, 30 * 1440 * 60 * 1000);

    return (
      env(`${type.toUpperCase()}_ENABLED`) && !shouldNotSee && !isDismissed
    );
  };

  handleClose = () => {
    // Mark this feature as "dismissed" in local storage & hide the feature.
    setStorage(`dismissed_${this.props.type}`, 'timestamp', Date.now());
    this.setState({ showFeature: false });
  };

  render() {
    return this.state.showFeature ? this.props.render(this.handleClose) : null;
  }
}

FeatureLauncher.propTypes = {
  type: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
  countdown: PropTypes.number.isRequired,
};

export default FeatureLauncher;
