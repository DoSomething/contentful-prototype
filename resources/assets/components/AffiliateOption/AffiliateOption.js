import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import Markdown from '../utilities/Markdown/Markdown';

import './affiliateOption.scss';

class AffiliateOption extends React.Component {
  constructor(props) {
    super(props);

    this.state = { expanded: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    return (
      <div className="form-wrapper affiliate-option">
        <label className="option -checkbox" htmlFor="affiliate_opt_in">
          <input
            type="checkbox"
            id="opt_in"
            name="affiliate_opt_in"
            value={this.props.affiliateMessagingOptOut}
            defaultChecked={!this.props.affiliateMessagingOptOut}
            className="form-checkbox"
            onClick={this.props.clickedOptOut}
          />
          <span className="option__indicator" />
          {this.props.affiliateOptionLabel}
        </label>
        <div className="footnote">
          <button onClick={this.handleClick}>
            {this.props.moreInformationLabel}
          </button>
          <div
            className={classnames('footnote-details', {
              'is-expanded': this.state.expanded,
            })}
          >
            <Markdown>{this.props.moreInformationMessage}</Markdown>
          </div>
        </div>
      </div>
    );
  }
}

AffiliateOption.propTypes = {
  clickedOptOut: PropTypes.func.isRequired,
  affiliateMessagingOptOut: PropTypes.bool.isRequired,
  affiliateOptionLabel: PropTypes.string.isRequired,
  moreInformationLabel: PropTypes.string.isRequired,
  moreInformationMessage: PropTypes.string.isRequired,
};

export default AffiliateOption;
