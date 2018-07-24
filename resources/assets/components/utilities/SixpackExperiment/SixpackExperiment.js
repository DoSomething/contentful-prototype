import React from 'react';
import PropTypes from 'prop-types';
import { snakeCase } from 'lodash';

import { participateBeta } from '../../../helpers/experiments';
import ContentfulEntry from '../../ContentfulEntry';

// async function somethingElse() {
//   const something = await new Promise((resolve, reject) => {
//     resolve('boomshakalacka!');
//   });

//   return something;
// }

class SixpackExperiment extends React.Component {
  async componentDidMount() {
    console.log('🤮');
  }

  render() {
    const { alternatives } = this.props;

    somethingElse().then(response => {
      console.log(response);
    });

    return <ContentfulEntry json={alternatives[1]} />;
  }
}

// const SixpackExperiment = props => {
//   const { alternatives, campaignId, title } = props;

//   const alternativeOptions = alternatives.map(item =>
//     snakeCase(item.fields.title),
//   );

//   console.log('😝');
//   console.log(alternativeOptions);

//   const selectedAlternative = participateBeta(
//     snakeCase(title),
//     alternativeOptions,
//   );

//   console.log('🔥');
//   console.log(alternatives);

//   selectedAlternative.then(response => {
//     console.log('🤔');
//     console.log(response);
//     console.log(alternativeOptions.indexOf(response));

//     const selectedAlternativeJson = alternatives[1];

//     return <ContentfulEntry json={selectedAlternativeJson} />;
//   });
// };

SixpackExperiment.propType = {
  title: PropTypes.string.isRequired,
};

export default SixpackExperiment;
