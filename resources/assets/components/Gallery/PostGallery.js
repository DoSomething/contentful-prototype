import React from 'react';
import PropTypes from 'prop-types';

import Gallery from './Gallery';
import ReportbackItemContainer from '../../containers/ReportbackItemContainer';

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
      <ReportbackItemContainer key={key} id={post.reportback.id} />
    );
  }

  render() {
    const { isFetching, itemEntities } = this.props.reportbacks;

    return isFetching
      ? <div className="spinner -centered" />
      : <Gallery type="triad">
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
