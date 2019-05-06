import React from 'react';
import PropTypes from 'prop-types';
import { get, snakeCase } from 'lodash';

import { sixpack } from '../../../helpers';
import ContentfulEntry from '../../ContentfulEntry';
import Placeholder from '../../utilities/Placeholder';
import Empty from '../../utilities/Empty';

class SixpackExperiment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlternative: null,
    };

    this.experimentName = snakeCase(this.props.title);
  }

  componentDidMount() {
    const {
      alternatives,
      control,
      convertableActions,
      kpi,
      trafficFraction,
    } = this.props;

    const controlAlternative = control || <Empty testName="No Alternative" />;
    const alternativeOptions = [controlAlternative, ...alternatives];

    // Get names of  all test alternatives
    const alternativeOptionNames = alternativeOptions.map((item, index) => {
      let testAlternativeName = `Test Alternative ${index + 1}`;

      testAlternativeName =
        this.getTestAlternativeName(item) || testAlternativeName;

      return snakeCase(testAlternativeName);
    });

    const selectedAlternative = sixpack().participate(
      this.experimentName,
      alternativeOptionNames,
      {
        convertableActions,
        kpi,
        trafficFraction,
      },
    );

    selectedAlternative
      .then(response => {
        this.setState({
          selectedAlternative:
            alternativeOptions[alternativeOptionNames.indexOf(response)],
        });
      })
      .catch(() => {
        // @TODO: Log this error somewhere so we know if a Sixpack Experiment
        // is having issues.
        this.setState({
          selectedAlternative: alternativeOptions[0],
        });
      });
  }

  componentWillUnmount() {
    sixpack().removeExperiment(this.experimentName);
  }

  /**
   * Get the name for the provided test alternative.
   *
   * @param  {Object} alternative
   * @return {String}
   */
  getTestAlternativeName = alternative => {
    let testAlternativeName;

    if (React.isValidElement(alternative)) {
      testAlternativeName = get(alternative.props, 'testName', null);
    } else {
      // @TODO: probably want to use internalTitle but not all entities expose that.
      // Defaults to title field, but we should aim to start exposing internalTitle on entities!
      testAlternativeName =
        get(alternative, 'fields.internalTitle') ||
        get(alternative, 'fields.title') ||
        null;
    }

    return testAlternativeName;
  };

  render() {
    const selectedAlternative = this.state.selectedAlternative;

    if (!selectedAlternative) {
      return <Placeholder />;
    }

    return React.isValidElement(selectedAlternative) ? (
      selectedAlternative
    ) : (
      <ContentfulEntry json={selectedAlternative} />
    );
  }
}

SixpackExperiment.propTypes = {
  alternatives: PropTypes.arrayOf(PropTypes.object).isRequired,
  control: PropTypes.object,
  convertableActions: PropTypes.arrayOf(PropTypes.string).isRequired,
  kpi: PropTypes.string,
  title: PropTypes.string.isRequired,
  trafficFraction: PropTypes.number,
};

SixpackExperiment.defaultProps = {
  control: null,
  kpi: null,
  trafficFraction: 1,
};

export default SixpackExperiment;
