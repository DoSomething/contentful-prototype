import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';

import ContentfulEntry from '../../ContentfulEntry';
import Placeholder from '../../utilities/Placeholder';
import { participateBeta } from '../../../helpers/experiments';

class SixpackExperiment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedAlternative: null,
    };
  }

  componentDidMount() {
    const { alternatives, campaignId, title } = this.props;

    const alternativeOptions = alternatives.map(item =>
      snakeCase(item.fields.title),
    );

    const selectedAlternative = participateBeta(
      snakeCase(title),
      alternativeOptions,
    );

    selectedAlternative.then(response => {
      console.log(response);
      // console.log(alternatives[alternativeOptions.indexOf(response)]);

      this.setState({
        selectedAlternative: alternatives[alternativeOptions.indexOf(response)],
      });
    });
  }

  render() {
    return this.state.selectedAlternative ? (
      <ContentfulEntry json={this.state.selectedAlternative} />
    ) : (
      <Placeholder />
    );
  }
}

SixpackExperiment.propType = {
  title: PropTypes.string.isRequired,
};

export default SixpackExperiment;
