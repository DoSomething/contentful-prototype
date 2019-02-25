import React from 'react';
import PropTypes from 'prop-types';

import { getBlock } from '../../../helpers/api';
import ContentfulEntry from '../../ContentfulEntry';
import Card from '../Card/Card';
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
    const request = getBlock(this.props.id);

    request
      .then(response => {
        this.setState({
          entryData: response,
        });
      })
      .catch(error => {
        this.setState({
          hasError: true,
        });
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
