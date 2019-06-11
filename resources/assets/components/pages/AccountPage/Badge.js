import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
import badgeImages from './BadgeImages';

class Badge extends React.Component {
  constructor(props) {
    super(props);

    this.getBadgeImage = this.getBadgeImage.bind(this);
  }

  getBadgeImage() {
    if (this.props.earned) {
      return badgeImages[this.props.name];
    }

    return badgeImages[`${this.props.name}Locked`];
  }

  render() {
    return (
      <div>
        <Figure image={this.getBadgeImage()} alt={this.props.text}>
          {this.props.text}
        </Figure>
      </div>
    );
  }
}

Badge.propTypes = {
  earned: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Badge;
