/* global window, document, $cweb */
import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';
import { withoutNulls } from '../../../helpers';

class SoftEdgeWidgetAction extends React.Component {
  componentDidMount() {
    this.initSoftEdgeScript();
  }

  /**
   * Append the SoftEdge to the DOM and add event listener for when it loads.
   */
  initSoftEdgeScript = () => {
    const script = document.createElement('script');
    script.src = '//www.congressweb.com/cweb/js/jquery.congressweb.iframe.js';
    document.head.append(script);
    script.addEventListener('load', this.loadSoftEdgeWidget);
  };

  /**
   * Call the SoftEdge method once the SoftEdge script has finished loading and appended to the page.
   */
  loadSoftEdgeWidget = () => {
    const softEdgeId = this.props.softEdgeId;
    const user = this.props.user;
    let url = `//www.congressweb.com/dosomething/${softEdgeId}?acceptAuthor=true&memberId=${
      this.props.userId}&dosomething_action_id=${actionId}`;

    const prepopulatedFields = withoutNulls({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      mobile: user.mobile,
      address: user.addrStreet1,
      city: user.addrCity,
      state: user.addrState,
      zip: user.addrZip,
    });

    Object.keys(prepopulatedFields).forEach(key => {
      url += `&${key}=${prepopulatedFields[key]}`;
    });

    window.$cweb(() => {
      $cweb(`#congressweb-action-${softEdgeId}`).congressweb({
        url,
        responsive: true,
      });
    });
  };

  render() {
    return (
      <Card className="bordered rounded" title={this.props.title}>
        <div id={`congressweb-action-${this.props.softEdgeId}`} />
      </Card>
    );
  }
}

SoftEdgeWidgetAction.propTypes = {
  softEdgeId: PropTypes.number.isRequired,
  actionId: PropTypes.number.isRequired,
  title: PropTypes.string,
  user: PropTypes.object,
  userId: PropTypes.string.isRequired,
};

SoftEdgeWidgetAction.defaultProps = {
  title: null,
  user: {},
};

export default SoftEdgeWidgetAction;
