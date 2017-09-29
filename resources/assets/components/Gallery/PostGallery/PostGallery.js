import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../Card';
import Gallery from '../Gallery';
import ReportbackItemContainer from '../../ReportbackItem';

class PostGallery extends React.Component {
  constructor() {
    super();

    this.renderItem = this.renderItem.bind(this);
  }

  componentDidMount() {
    //
  }

  renderItem(key) {
    const post = this.props.reportbacks.itemEntities[key];

    return (
      <Card className="rounded" key={key}>
        <ReportbackItemContainer id={post.reportback.id} />
      </Card>
    );
  }

  render() {
    const { isFetching, itemEntities } = this.props.reportbacks;

    return isFetching ?
      <div className="spinner -centered" />
      :
      <Gallery type="triad" className="expand-horizontal-md">
        {Object.keys(itemEntities).map(this.renderItem)}
      </Gallery>;
  }
}

PostGallery.propTypes = {
  reportbacks: PropTypes.shape({
    entities: PropTypes.objectOf(PropTypes.object),
    isFetching: PropTypes.bool,
    itemEntities: PropTypes.objectOf(PropTypes.object),
  }).isRequired,
};

export default PostGallery;
