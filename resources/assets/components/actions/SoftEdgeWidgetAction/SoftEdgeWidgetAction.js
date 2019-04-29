import React from 'react';
import PropTypes from 'prop-types';

import Card from '../../utilities/Card/Card';

class SoftEdgeWidgetAction extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.initSoftEdgeScript();
  }

  /**
   * Append the SoftEdge to the DOM and add event listener for when it loads.
   */
  initSoftEdgeScript = () => {
    // Create an item in memory.
    const script = document.createElement('script');

    // Make the source attribute equal to this URL.
    script.src = '//www.congressweb.com/cweb/js/jquery.congressweb.iframe.js';

    // Attach the new script tag to the head of the document.
    document.head.append(script);
    script.addEventListener('load', this.loadSoftEdgeWidget);
  };

  /**
   * Call the SoftEdge method if the congressweb-action-{softEdgeId} object has been added to the window.
   */
  loadSoftEdgeWidget = () => {
    let softEdgeId = this.props.softEdgeId;

    window.$cweb(function() {
      $cweb(`#congressweb-action-${softEdgeId}`).congressweb({
        url: `//www.congressweb.com/dosomething/${softEdgeId}`,
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

export default SoftEdgeWidgetAction;
