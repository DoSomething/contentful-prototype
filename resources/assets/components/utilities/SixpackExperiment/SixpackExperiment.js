import React from 'react';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { get, snakeCase } from 'lodash';

import Empty from '../Empty';
import Placeholder from '../Placeholder';
import { sixpack } from '../../../helpers';
import ContentfulEntryLoader from '../ContentfulEntryLoader/ContentfulEntryLoader';

export const SixpackExperimentBlockFragment = gql`
  fragment SixpackExperimentBlockFragment on SixpackExperimentBlock {
    internalTitle
    convertableActions
    control {
      id
    }
    alternatives {
      id
      internalTitle
    }
    trafficFraction
    kpi
  }
`;

class SixpackExperiment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlternative: null,
    };

    this.experimentName = snakeCase(this.props.internalTitle);
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

    // Get names of all test alternatives
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
   * @return {String|Null}
   */
  getTestAlternativeName = alternative => {
    let testAlternativeName;

    if (React.isValidElement(alternative)) {
      testAlternativeName = get(alternative.props, 'testName', null);
    } else {
      // The PHP Content API doesn't reliably return `internalTitle` for blocks.
      // @TODO: We can remove this check after #169216496.
      testAlternativeName =
        alternative.internalTitle ||
        get(alternative, 'fields.internalTitle') ||
        get(alternative, 'fields.title');
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
      <ContentfulEntryLoader id={selectedAlternative.id} />
    );
  }
}

SixpackExperiment.propTypes = {
  alternatives: PropTypes.arrayOf(PropTypes.object).isRequired,
  control: PropTypes.object,
  convertableActions: PropTypes.arrayOf(PropTypes.string).isRequired,
  kpi: PropTypes.string,
  internalTitle: PropTypes.string.isRequired,
  trafficFraction: PropTypes.number,
};

SixpackExperiment.defaultProps = {
  control: null,
  kpi: null,
  trafficFraction: 1,
};

export default SixpackExperiment;
