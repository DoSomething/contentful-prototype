/* global window */

import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';

import { assertTestPasses } from '../../helpers/experiments';

class Experiment extends React.Component {
  componentWillMount() {
    const { name } = this.props;

    if (assertTestPasses(name, this.props.app)) {
      this.props.participateInExperiment(name);
    }
  }

  render() {
    const env = window.ENV || {};

    // Return default control component if Sixpack is not enabled.
    if (!env.SIXPACK_ENABLED) {
      return this.props.children[0];
    }

    const experiments = this.props.experiments;

    // Return default control component if conditions not met to execute experiment.
    if (
      Object.keys(experiments).length === 0 ||
      !experiments[this.props.name]
    ) {
      return this.props.children[0];
    }

    const componentAlternative = this.props.children.filter(component => {
      const alternative = get(component.props, 'alternative', false);

      if (alternative === experiments[this.props.name]) {
        return true;
      }

      return false;
    });

    // Render the designated alternative otherwise default to the control just in case.
    return componentAlternative
      ? componentAlternative[0]
      : this.props.children[0];
  }
}

export default Experiment;

Experiment.propTypes = {
  app: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.node.isRequired,
  experiments: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
    .isRequired,
  name: PropTypes.string.isRequired,
  participateInExperiment: PropTypes.func.isRequired,
};
