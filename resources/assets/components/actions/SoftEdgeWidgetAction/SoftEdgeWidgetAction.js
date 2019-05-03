/* global window, document, $cweb */

import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';

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
    let url = '//www.congressweb.com/dosomething/' + softEdgeId;

    console.log('🍎', this.props);

    // + '?acceptAuthor=true&firstName=Chloe';

    window.$cweb(() => {
      $cweb(`#congressweb-action-${softEdgeId}`).congressweb({
        url: `${url}`,
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
  title: PropTypes.string.isRequired,
  softEdgeId: PropTypes.number.isRequired,
};

SoftEdgeWidgetAction.defaultProps = {
  title: null,
  softEdgeId: null,
};

export default SoftEdgeWidgetAction;
