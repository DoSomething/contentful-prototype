import React from 'react';
import PropTypes from 'prop-types';

import { Figure } from '../../Figure';
// to do: figure out how to not have to import each image
import signupBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import signupBadgeGray from './SignupBadgeGray.jpg'; // with import
import onePostBadgeGray from './PostsBadgeGray.jpg'; // with import
import onePostBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import twoPostBadgeGray from './PostsBadgeGray.jpg'; // with import
import twoPostBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import threePostBadgeGray from './PostsBadgeGray.jpg'; // with import
import threePostBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import breakdownBadgeGray from './PostsBadgeGray.jpg'; // with import
import breakdownBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import oneStaffFaveBadgeGray from './PostsBadgeGray.jpg'; // with import
import oneStaffFaveBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import twoStaffFaveBadgeGray from './PostsBadgeGray.jpg'; // with import
import twoStaffFaveBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import threeStaffFaveBadgeGray from './PostsBadgeGray.jpg'; // with import
import threeStaffFaveBadgeEarned from './SignupBadgeEarned.jpg'; // with import
import voterBadgeGray from './PostsBadgeGray.jpg'; // with import
import voterBadgeEarned from './SignupBadgeEarned.jpg'; // with import

class Badge extends React.Component {
  constructor(props) {
    super(props);

    this.getBadgeImage = this.getBadgeImage.bind(this);
  }

  getBadgeImage() {
    if (this.props.name === 'signupBadge') {
      if (this.props.earned) {
        return signupBadgeEarned;
      }
      return signupBadgeGray;
    }
    if (this.props.name === 'onePostBadge') {
      if (this.props.earned) {
        return onePostBadgeEarned;
      }
      return onePostBadgeGray;
    }
    if (this.props.name === 'twoPostBadge') {
      if (this.props.earned) {
        return twoPostBadgeEarned;
      }
      return twoPostBadgeGray;
    }
    if (this.props.name === 'threePostBadge') {
      if (this.props.earned) {
        return threePostBadgeEarned;
      }
      return threePostBadgeGray;
    }
    if (this.props.name === 'signupBadge') {
      if (this.props.earned) {
        return signupBadgeEarned;
      }
      return signupBadgeGray;
    }
    if (this.props.name === 'breakdownBadge') {
      if (this.props.earned) {
        return breakdownBadgeEarned;
      }
      return breakdownBadgeGray;
    }
    if (this.props.name === 'oneStaffFaveBadge') {
      if (this.props.earned) {
        return oneStaffFaveBadgeEarned;
      }
      return oneStaffFaveBadgeGray;
    }
    if (this.props.name === 'twoStaffFaveBadge') {
      if (this.props.earned) {
        return twoStaffFaveBadgeEarned;
      }
      return twoStaffFaveBadgeGray;
    }
    if (this.props.name === 'threeStaffFaveBadge') {
      if (this.props.earned) {
        return threeStaffFaveBadgeEarned;
      }
      return threeStaffFaveBadgeGray;
    }
    if (this.props.name === 'voterBadge') {
      if (this.props.earned) {
        return voterBadgeEarned;
      }
      return voterBadgeGray;
    }
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
