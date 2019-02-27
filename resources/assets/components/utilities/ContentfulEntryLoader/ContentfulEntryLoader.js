import React from 'react';
import PropTypes from 'prop-types';

import Card from '../Card/Card';
import { report } from '../../../helpers';
import { getBlock } from '../../../helpers/api';
import ContentfulEntry from '../../ContentfulEntry';
import TextContent from '../TextContent/TextContent';

class ContentfulEntryLoader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      entryData: null,
      hasError: null,
    };
  }

  componentDidMount() {
    getBlock(this.props.id)
      .then(entryData => this.setState({ entryData }))
      .catch(error => {
        this.setState({ hasError: true });

        report(error);
      });
  }

  render() {
    if (this.state.hasError) {
      return (
        // @TODO: repurpose NotFound component to be customizeable; using basic Card component for now.
        <Card className="rounded bordered">
          <TextContent className="padded">
            Sorry! The specified content was not found.
          </TextContent>
        </Card>
      );
    }

    if (!this.state.entryData) {
      return <div className="spinner -centered" />;
    }

    return <ContentfulEntry json={this.state.entryData} />;
  }
}

ContentfulEntryLoader.propTypes = {
  id: PropTypes.string.isRequired,
};

export default ContentfulEntryLoader;
